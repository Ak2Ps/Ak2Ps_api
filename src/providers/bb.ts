import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import { Mailer } from "../mailer";

export class Bb {
  mailer: Mailer = new Mailer();
  constructor() {
    Logger.info("Creating Bb");
  }

  private getQuery(where: string, orderby: string): string {
    if (!orderby) {
      orderby = "date,id";
    }
    //
    let sql = `
select 
cast(IdMaster as CHAR) as IDMASTER,
cast(Id as CHAR) as ID,
Bb as BB,
Author as AUTHOR,
Email as EMAIL,
date2screendate(date) as DATUM,
cast(Moderated as CHAR) as MODERATED,
Header as HEADER,
Inhoud as INHOUD
from BBMSG`;
    if (where) {
      sql += ` where ${where}`;
    }
    sql += ` order by ${orderby};`;
    //
    return sql;
  }

  private async addMsg(req: Request, res: Response, next: NextFunction) {
    let bb = String(req.query.bb || req.body.bb);
    let datum = String(req.query.datum || req.body.datum);
    let author = String(req.query.author || req.body.author);
    let email = String(req.query.email || req.body.email);
    let header = String(req.query.header || req.body.header);
    let inhoud = String(req.query.inhoud || req.body.inhoud);
    let moderated = String(req.query.moderated || req.body.moderated);
    let connection = await db.waitConnection();
    let result: any = null;
    let sql = '';
    let rows: any;
    //
    // boodschap eventueel mailen
    //
    let bbmod = await Util.waitParam(req, res, next, "BBMOD");
    if (bbmod != '') {
      let to = bbmod;
      let message = decodeURIComponent(inhoud).replace(/<br>/gi,'').replace(/\n/gi,'<br>');
      await this.mailer.send(to, header, message);
    }
    //
    if (bb == "Home") {
      sql = `
delete from BBMSG
where bb='${bb}';`;
      rows = await db.waitQuery(connection, sql);
    }
    sql = `
insert into BBMSG (
bb,date,
author,email,header,
inhoud,
moderated) 
values (
'${bb}',screendate2date('${datum}'),
'${db.fix(author)}',
'${db.fix(email)}',
'${db.fix(header)}',
'${db.fix(db.editorfix(inhoud))}',
'${db.fix(moderated)}'
);`;
    rows = await db.waitQuery(connection, sql);
    connection.release();
    result = {
      items: [
        { msg: "" }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async getMsg(req: Request, res: Response, next: NextFunction) {
    let bb = req.query.bb || req.body.bb;
    let where = "";
    let result: any = "";
    let row: any;
    where = `bb='${bb}'`;
    let connection = await db.waitConnection();
    let sql = this.getQuery(where, "");
    let rows = await db.waitQuery(connection, sql);
    if (rows[0]) {
      row = rows[0];
    } else {
      row.ID = '';
      row.DATUM = '';
      row.AUTHOR = '';
      row.HEADER = '';
      row.INHOUD = '';
      row.MODERATED = '';
    }
    result = {
      items: [
        {
          msg: "",
          id: row.ID,
          datum: row.DATUM,
          author: row.AUTHOR,
          email: row.EMAIL,
          header: row.HEADER,
          inhoud: row.INHOUD,
          moderated: row.MODERATED
        }
      ]
    };
    connection.release();
    res.status(200).send(result);
    return;
  }

  private async getSettings(req: Request, res: Response, next: NextFunction) {
    let msg = "";
    let connection = await db.waitConnection();
    let bbsmtp = await Util.waitParam(req, res, next, "BBSMTP");
    let bbadmin = await Util.waitParam(req, res, next, "BBADMIN");
    let bbmod = await Util.waitParam(req, res, next, "BBMOD");
    connection.release();
    let result = {
      items: [
        {
          MSG: msg,
          BBADMIN: bbadmin,
          BBMOD: bbmod,
          BBSMTP: bbsmtp
        }]
    };
    res.status(200).send(result);
    return;
  }

  private async setSettings(req: Request, res: Response, next: NextFunction) {
    let bbmod = String(req.query.bbmod || req.body.bbmod);
    let bbadmin = String(req.query.bbadmin || req.body.bbadmin);
    let bbsmtp = String(req.query.bbsmtp || req.body.bbsmtp);
    let connection = await db.waitConnection();
    let result: any = null;
    let sql = `
insert into PARAM (naam) select 'BBSMTP' from DUAL where not exists (select 1 from PARAM where naam = 'BBSMTP');
insert into PARAM (naam) select 'BBADMIN' from DUAL where not exists (select 1 from PARAM where naam = 'BBADMIN');
insert into PARAM (naam) select 'BBMOD' from DUAL where not exists (select 1 from PARAM where naam = 'BBMOD');
update PARAM set inhoud = '${db.fix(bbsmtp)}' where naam = 'BBSMTP';
update PARAM set inhoud = '${db.fix(bbadmin)}' where naam = 'BBADMIN';
update PARAM set inhoud = '${db.fix(bbmod)}' where naam = 'BBMOD';
`;
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    result = {
      items: [
        {
          MSG: "",
          BBADMIN: bbadmin,
          BBMOD: bbmod,
          BBSMTP: bbsmtp
        }]
    };
    res.status(200).send(result);
    return;
  }

  private async showBb(req: Request, res: Response, next: NextFunction) {
    //
    let bb = String(req.query.bb || req.body.bb);
    let connection = await db.waitConnection();
    let where = `BB = '${bb}' and IdMaster is null`;
    let orderby = "date desc, id desc";
    let sql = this.getQuery(where, orderby);
    let result = "";
    let rows = await db.waitQuery(connection, sql);
    //
    result += "<br>";
    result += '<div style="margin-left: 8px;border: 1px solid lightgray;width: 60em">';
    rows.forEach((row: any) => {
      result += "<div>";
      if (bb != "Home") {
        result += "<b>" + row.AUTHOR;
        if (row.EMAIL != "") {
          result += '&nbsp;(</b><a href="mailto:' + row.EMAIL + '">' + row.EMAIL + "</a><b>)";
        }
        result += "&nbsp;zegt op &nbsp;" + row.DATUM + ":</b>";
      }
      result += "</div>";
      if (row.HEADER != "") {
        result += '<br><div style="padding-left: 20px;"><b>' + row.HEADER + "</b></div><br>";
      }
      result += '<div style="padding-left: 40px; ">' + decodeURIComponent(row.INHOUD) + "</div>";
      result += "<br>";
      result += "<br><br>";
    });
    result += "</div>";
    result += "<br>";
    connection.release();
    res.status(200).send(result);
    return;
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = Util.getLast(req.query.action);
    //
    Logger.request(req);
    //
    if (action == "getsettings") {
      this.getSettings(req, res, next);
    } else if (action == "setsettings") {
      this.setSettings(req, res, next);
    } else if (action == "showbb") {
      this.showBb(req, res, next);
    } else if (action == "addmsg") {
      this.addMsg(req, res, next);
    } else if (action == "getmsg") {
      this.getMsg(req, res, next);
    } else if (action == "updatemsg") {
      Util.unknownOperation(req, res, next);
    } else if (action == "deletemsg") {
      Util.unknownOperation(req, res, next);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }
}
