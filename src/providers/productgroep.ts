
import { Crud } from '../crud';

import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import { Onderdeelproductgroep } from "./onderdeelproductgroep"

const dict: Dict = {
  table: "PRODUCTGROEP",
  key: [
    {
      body: "PRODUCTGROEP",
      sql: "PRODUCTGROEP",
    }
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "ucase(PRODUCTGROEP)",
    where: [
      {
        query: "value",
        sql: "ucase(PRODUCTGROEP) like ucase('%?%')",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "PRODUCTGROEP as ID"
      },
      {
        row: "VALUE",
        sql: "PRODUCTGROEP AS VALUE"
      }
    ],
  },
  query: {
    orderby: "PRODUCTGROEP",
    where: [
      {
        query: "id",
        sql: "ID = ?",
      },
      {
        query: "productgroep",
        sql: "ucase(PRODUCTGROEP) like ucase('?%')",
      },
      {
        query: "metonderdelen",
        sql: "ucase(METONDERDELEN) like ucase('?%')",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
      },
      {
        row: "PRODUCTGROEP",
        sql: "ifnull(PRODUCTGROEP,'') as PRODUCTGROEP",
      },
      {
        row: "METONDERDELEN",
        sql: "ifnull(METONDERDELEN,'') as METONDERDELEN",
      },
      {
        row: "AANTAL",
        sql: `
cast(
(select count(*) from PRODUCTGROEPREGEL
where PRODUCTGROEPREGEL.PRODUCTGROEP = PRODUCTGROEP.PRODUCTGROEP) as char) as AANTAL`,
      }
    ],
  },
  update: {
    fields: [
      {
        body: "PRODUCTGROEP",
        sql: "PRODUCTGROEP",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "METONDERDELEN",
        sql: "METONDERDELEN",
        required: false,
        maxLength: 1,
        default: "",
      }
    ],
  },
}

export class Productgroep extends Crud {
  constructor() {
    super(
      dict
    )
  }

  protected async doDelete(req: Request, res: Response, next: NextFunction, options?: any) {
    let id = db.getDataId(req);
    let productgroep = '';
    let msg = "";
    //
    let sql = `
select * from PRODUCTGROEP
where id = '${id}';`;
    //
    res.crudConnection = await db.waitConnection();
    let rows = await db.waitQuery(res.crudConnection, sql);
    if (rows.length <= 0) {
      msg = "Productgroep bestaat niet";
    } else {
      //
      //
      //
      productgroep = rows[0].PRODUCTGROEP;
      //
      // alle regels
      //
      sql = `
delete from PRODUCTGROEPREGEL
where productgroep = '${productgroep}'`;
      await db.waitQuery(res.crudConnection, sql);
      //
      // de kop zelf
      //
      sql = `
delete from PRODUCTGROEP
where productgroep = '${productgroep}'`;
      await db.waitQuery(res.crudConnection, sql);
      res.status(200).send({
        items: [{ msg: msg }]
      });
    }
    //
    // het is niet zo heel erg als hier iets mislukt
    //
    res.crudConnection.release();
    return;
  }

  private async doDelete9(req: Request, res: Response, next: NextFunction, options?: any) {
    let productgroep = db.fix(req.body.productgroep);
    let all = db.fix(req.body.all);
    let msg = "";
    //
    if (!productgroep) {
      msg = "Productgroep verplicht invullen";
      res.status(200).send({
        items: [{ msg: msg }]
      });
      return;
    }
    //
    let sql = `
select * from PRODUCTGROEP
where productgroep = '${productgroep}';`;
    //
    res.crudConnection = await db.waitConnection();
    let rows = await db.waitQuery(res.crudConnection, sql);
    if (rows.length <= 0) {
      msg = "Productgroep bestaat niet";
    } else {
      sql = `
delete from PRODUCTGROEPREGEL
where productgroep = '${productgroep}'`;
      if (all != "all") {
        sql += ` and cast(PRODUCTNUMMER as decimal) > 0`;
      }
      let result = await db.waitQuery(res.crudConnection, sql);
      if (rows[0].METONDERDELEN == "1") {
        await Onderdeelproductgroep.delete(req, res, next, productgroep);
        await Onderdeelproductgroep.add(req, res, next, productgroep, "", 0);
      }
      res.status(200).send({
        items: [{ msg: msg }]
      });
    }
    res.crudConnection.release();
    return;
  }

  private async doInsert9(req: Request, res: Response, next: NextFunction, options?: any) {
    let productgroep = db.fix(req.body.productgroep);
    let all = db.fix(req.body.all);
    let msg = "";
    //
    if (!productgroep) {
      msg = "Productgroep verplicht invullen";
      res.status(200).send({
        items: [{ msg: msg }]
      });
      return;
    }
    //
    let sql = `select * from PRODUCTGROEP
where productgroep = '${productgroep}';`;
    //
    res.crudConnection = await db.waitConnection();
    let rows = await db.waitQuery(res.crudConnection, sql);
    if (rows.length <= 0) {
      msg = "Productgroep bestaat niet";
    } else {
      sql = `
insert into PRODUCTGROEPREGEL (productgroep,productnummer,IsOnderdeel)
select '${productgroep}',productnummer,null from PRODUCT
where not exists (select 1 from PRODUCTGROEPREGEL
where productgroep = '${productgroep}'
and PRODUCTGROEPREGEL.productnummer = PRODUCT.productnummer)`;
      if (all != "all") {
        sql += ` and cast(PRODUCTNUMMER as decimal) > 0`;
      }
      let result = await db.waitQuery(res.crudConnection, sql);
      if (rows[0].METONDERDELEN == "1") {
        await Onderdeelproductgroep.add(req, res, next, productgroep, "", 0);
      }
      res.status(200).send({
        items: [{ msg: msg }]
      });
    }
    res.crudConnection.release();
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
    } else if (method == "GET") {
      this.doQuery(req, res, next, this.dict);
    } else if (method == "PUT" || method == "POST") {
      if (action == "delete9") {
        this.doDelete9(req, res, next, this.dict);
      } else if (action == "insert9") {
        this.doInsert9(req, res, next, this.dict);
      } else {
        this.doUpdate(req, res, next, this.dict);
      }
    } else if (method == "DELETE") {
      this.doDelete(req, res, next, this.dict);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }

}
