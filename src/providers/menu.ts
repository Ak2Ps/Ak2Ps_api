import { Crud } from '../crud';
import db from '../db';
import { Request, Response, NextFunction } from "express";
import { Util } from '../util';
import { Logger } from '../logger';

const dict: Dict = {
  table: "MENU_2015",
  key: [
    {
      body: "MENU",
      sql: "MENU",
    }
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "ucase(MENU)",
    where: [
      {
        query: "value",
        sql: "ucase(MENU) like ucase('%?%')",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "MENU as ID"
      },
      {
        row: "MENU",
        sql: "MENU AS VALUE"
      }
    ],
  },
}

export class Menu extends Crud {
  constructor() {
    super(dict);
  }

  protected async doQuery(req: Request, res: Response, next: NextFunction, options?: any) {
    //
    let sql = `
select 
a.omschrijving as MENU,
b.omschrijving as OPTIE,
b.link as ACTION
from MENUREGEL_2015 a, MENUREGEL_2015 b
where a.submenu = b.menu
and a.menu = '${db.fix(req.query.menu)}'
order by a.volgnummer, b.volgnummer`;
    //
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    res.status(200).send(rows);
    return;
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    //
    if (action == "select") {
      this.doSelect(req, res, next, dict);
    } else if (method == "GET") {
      this.doQuery(req, res, next, dict);
    } else if (method == "PUT") {
      Util.unknownOperation(req, res, next);
    } else if (method == "POST") {
      Util.unknownOperation(req, res, next);
    } else if (method == "DELETE") {
      Util.unknownOperation(req, res, next);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }
}
