import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import { connect } from "http2";

export class Bb {
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

  private async addMsg(bb: string, datum: string, author: string, email: string, header: string, inhoud: string, moderated: string) {
    let connection = await db.waitConnection();
    let result: any = null;
    let sql = `
delete from BBMSG
where bb='${bb}';`;
    let rows = await db.waitQuery(connection, sql);
    sql = `
insert into BBMSG (
bb,date,
author,email,header,
inhoud,
moderated) 
values (
'${bb}',screendate2date('${datum}'),
'${db.fix(author)}','${db.fix(email)}','${db.fix(header)}',
'${db.fix(db.editorfix(inhoud))}',
'${db.fix(moderated)}'
);`;
    rows = await db.waitQuery(connection, sql);
    connection.release();
    result = { items: [{ msg: "" }] };
    return;
  }

  private async getMsg(bb: string) {
    let where = "";
    let result: any = "";
    where = `bb='${bb}'`;
    let connection = await db.waitConnection();
    let sql = this.getQuery(where, "");
    let rows = await db.waitQuery(connection, sql);
    result = {
      items: [
        {
          msg: "",
          id: rows[0].ID,
          datum: rows[0].DATUM,
          author: rows[0].AUTHOR,
          email: rows[0].EMAIL,
          header: rows[0].HEADER,
          inhoud: rows[0].INHOUD,
          moderated: rows[0].MODERATED
        }
      ]
    };
    connection.release();
    return (result);
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = Util.getLast(req.query.action);
    let bb = req.query.bb;
    //
    Logger.test(`bb: ${method}, ${action}`);
    //
    if (action == "getsettings") {
      let bbmod = "";
      let bbadmin = "";
      let bbsmtp = "";
      let msg = "";
      let connection = await db.waitConnection();
      let sql = `
select 
cast(id as CHAR) as ID,
naam as NAAM,
inhoud as INHOUD
from PARAM
where naam in ('BBSMTP','BBADMIN','BBMOD')`;
      let rows = await db.waitQuery(connection, sql);
      rows.forEach((row: any) => {
        if (row.NAAM == "BBSMTP") {
          bbsmtp = row.INHOUD;
        } else if (row.NAAM == "BBADMIN") {
          bbadmin = row.INHOUD;
        } else if (row.NAAM == "BBMOD") {
          bbmod = row.INHOUD;
        }
      });
      connection.release();
      let result = {
        items: [{ MSG: msg, BBADMIN: bbadmin, BBMOD: bbmod, BBSMTP: bbsmtp }]
      };
      res.status(200).send(result);
      return;
    } else if (action == "setsettings") {
      let bbmod = "";
      if (req.query.bbmod) {
        bbmod = String(req.query.bbmod);
      } else {
        bbmod = String(req.body.bbmod);
      }
      let bbadmin = "";
      if (req.query.bbadmin) {
        bbadmin = String(req.query.bbadmin);
      } else {
        bbadmin = String(req.body.bbadmin);
      }
      let bbsmtp = "";
      if (req.query.bbsmtp) {
        bbsmtp = String(req.query.bbsmtp);
      } else {
        bbsmtp = String(req.body.bbsmtp);
      }
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
        items: [{ MSG: "", BBADMIN: bbadmin, BBMOD: bbmod, BBSMTP: bbsmtp }]
      };
      res.status(200).send(result);
      return;
    } else if (action == "showbb") {
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
    } else if (action == "addmsg") {
      let result = await this.addMsg(String(bb),
        req.query.datum || req.body.datum,
        req.query.author || req.body.author,
        req.query.email || req.body.email,
        req.query.header || req.body.header,
        req.query.inhoud || req.body.inhoud,
        req.query.moderated || req.body.moderated);
      res.status(200).send(result);
      return;
    } else if (action == "getmsg") {
      let result = await this.getMsg(req.query.bb || req.body.bb);
      res.status(200).send(result);
      return;
    } else if (action == "updatemsg") {
      // nvt
      Util.unknownOperation(req, res, next);
      return;
    } else if (action == "deletemsg") {
      // nvt
      Util.unknownOperation(req, res, next);
      return;
    }
    Util.unknownOperation(req, res, next);
    return;
  }
}
