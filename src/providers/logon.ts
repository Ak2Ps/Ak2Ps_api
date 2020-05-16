import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import { Guid } from "guid-typescript";

export class Logon {
  constructor() {
    Logger.info("Creating Logon");
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    //
    //
    if (method == "GET") {
      Util.unknownOperation(req, res, next);
      return;
    } else if (method == "PUT") {
      Util.unknownOperation(req, res, next);
      return;
    } else if (method == "POST") {
      let connection = await db.waitConnection();
      let gebruiker = db.fix(req.body.gebruiker);
      let wachtwoord = db.fix(req.body.wachtwoord);
      let result: any = null;
      let sql = `
select '0' as RESULT,NAAM,EMAIL,MENU,TOKEN,'' as DATAURL
from GEBRUIKER
where upper(gebruiker) = upper('${gebruiker}')
and aktief = 1
and ifnull(wachtwoord,'') = '${wachtwoord}';`;
      let rows = await db.waitQuerySilent(connection, sql);
      if (rows.length == 0) {
        result = {
          items: [{ RESULT: "-1", MSG: "Onbekend" }]
        };
        connection.release();
        res.status(200).send(result);
        return;
      }
      result = {
        items: rows
      };
      let token = Guid.create();
      sql = `
update GEBRUIKER set
token = '${token}'
where upper(gebruiker)=upper('${gebruiker}');`;
      rows = await db.waitQuerySilent(connection, sql);
      connection.release();
      res.status(200).send(result);
      return;
    } else if (method == "DELETE") {
      Util.unknownOperation(req, res, next);
      return;
    }
    Util.unknownOperation(req, res, next);
  }
}
