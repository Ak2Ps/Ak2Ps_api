import { Crud } from '../crud';
//
import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";

const dict: Dict = {
  table: "PRODUCTLIJN",
  key: [
    {
      body: "PRODUCTLIJN",
      sql: "PRODUCTLIJN",
    }
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "ucase(PRODUCTLIJNNAAM)",
    where: [
      {
        query: "value",
        sql: "ucase(PRODUCTLIJNNAAM) like ucase('%?%')",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "PRODUCTLIJN as ID"
      },
      {
        row: "VALUE",
        sql: "PRODUCTLIJNNAAM AS VALUE"
      }
    ],
  },
  query: {
    orderby: "PRODUCTLIJN",
    where: [
      {
        query: "id",
        sql: "ID = ?",
      },
      {
        query: "productlijn",
        sql: "ucase(PRODUCTLIJN) like ucase('?%')",
      },
      {
        query: "productlijnnaam",
        sql: "ucase(PRODUCTLIJNNAAM) like ucase('?%')",
      },
      {
        query: "productielijn",
        sql: "ucase(PRODUCTIELIJN) like ucase('?%')",
      },
      {
        query: "productielijnnaam",
        sql: "ucase(PRODUCTIELIJNNAAM) like ucase('?%')",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
      },
      {
        row: "PRODUCTLIJN",
        sql: "ifnull(PRODUCTLIJN,'') as PRODUCTLIJN",
      },
      {
        row: "PRODUCTLIJNNAAM",
        sql: "ifnull(PRODUCTLIJNNAAM,'') as PRODUCTLIJNNAAM",
      },
      {
        row: "PRODUCTIELIJN",
        sql: "ifnull(PRODUCTIELIJN,'') as PRODUCTIELIJN",
      },
      {
        row: "PRODUCTIELIJNNAAM",
        sql: "ifnull(PRODUCTIELIJNNAAM,'') as PRODUCTIELIJNNAAM",
      }
    ],
  },
  update: {
    fields: [
      {
        body: "PRODUCTLIJN",
        sql: "PRODUCTLIJN",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "PRODUCTLIJNNAAM",
        sql: "PRODUCTLIJNNAAM",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "PRODUCTIELIJN",
        sql: "PRODUCTIELIJN",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "PRODUCTIELIJNNAAM",
        sql: "PRODUCTIELIJNNAAM",
        required: false,
        maxLength: 50,
        default: "",
      }
    ],
  },
}

export class Productlijn extends Crud {
  constructor() {
    super(
      dict
    )
  }

  protected async doSelectProductielijn(req: Request, res: Response, next: NextFunction, options?: Dict) {
    res.crudConnection = await db.waitConnection();
    let sql = `
      select distinct 
      ifnull(productielijn,'') as id, 
      ifnull(productielijnnaam,'') as value 
      from PRODUCTLIJN
      order by ucase(productielijnnaam)
      `;
    let rows = await db.waitQuery(res.crudConnection, sql);
    res.crudConnection.release();
    res.status(200).send(rows);
    return;
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    //
    Logger.request(req);
    //
    if (action == "select") {
      this.doSelect(req, res, next, this.dict);
    } else if (action == "selectproductielijn") {
      this.doSelectProductielijn(req, res, next, this.dict);
    } else if (method == "GET") {
      this.doQuery(req, res, next, this.dict);
    } else if (method == "PUT" || method == "POST") {
      this.doUpdate(req, res, next, this.dict);
    } else if (method == "DELETE") {
      this.doDelete(req, res, next, this.dict);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }

}

