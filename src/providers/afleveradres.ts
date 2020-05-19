
import { Crud } from '../crud';
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";

const dict: Dict = {
  table: "RETOURKLANT",
  key: [
    {
      body: "REFERENTIE",
      sql: "REFERENTIE",
    }
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "",
    where: [
    ],
    fields: [
    ],
  },
  query: {
    orderby: "aflevernaam,afleveradres",
    where: [
    ],
    fields: [
    ],
  },
  update: {
    fields: [
    ],
  },
}

export class Afleveradres extends Crud {
  constructor() {
    super(
      dict
    )
  }


  protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
      //
      let aflevernaam = req.query.aflevernaam || '';
      let afleveradres = req.query.afleveradres || '';
      let afleverpostcode = req.query.afleverpostcode || '';
      let afleverwoonplaats = req.query.afleverwoonplaats || '';
      let afleverland = req.query.afleverland || '';
      let afleverdpdnummer = req.query.afleverdpdnummer || '';
      let aflevertelefoon = req.query.aflevertelefoon || '';
      let afleverfax = req.query.afleverfax || '';
      let afleveremail = req.query.afleveremail || '';
      let klantnummer = req.query.klantnummer || '';
      //
      res.crudConnection = await db.waitConnection();


      let where = '';

      let sql = `
select distinct 
aflevernaam, 
afleveradres, 
afleverwoonplaats, 
afleverpostcode, 
afleverland, 
afleverdpdnummer,
aflevertelefoon, 
afleverfax, 
afleveremail 
from RETOURKLANT
where (isnull(aflevernaam)=false
or isnull(afleveradres)=false
or isnull(afleverwoonplaats)=false
or isnull(afleverpostcode)=false
or isnull(afleverland)=false
or isnull(afleverdpdnummer)=false
or isnull(aflevertelefoon)=false
or isnull(afleverfax)=false
or isnull(afleveremail)=false)`;
      if (klantnummer != '') {
        where += ` and klantnummer = '${klantnummer}'`;
      }
      if (aflevernaam != '') {
        where += ` and ucase(aflevernaam) like ucase('${aflevernaam}%')`;
      }
      if (afleveradres != '') {
        where += ` and ucase(afleveradres) like ucase('${afleveradres}%')`;
      }
      if (afleverwoonplaats != '') {
        where += ` and ucase(afleverwoonplaats) like ucase('${afleverwoonplaats}%')`;
      }
      if (afleverpostcode != '') {
        where += ` and ucase(afleverpostcode) like ucase('${afleverpostcode}%')`;
      }
      if (afleverland != '') {
        where += ` and ucase(afleverland) like ucase('${afleverland}%')`;
      }
      if (afleverdpdnummer != '') {
        where += ` and ucase(afleverdpdnummer) like ucase('${afleverdpdnummer}%')`;
      }
      if (aflevertelefoon != '') {
        where += ` and ucase(aflevertelefoon) like ucase('${aflevertelefoon}%')`;
      }
      if (afleverfax != '') {
        where += ` and ucase(afleverfax) like ucase('${afleverfax}%')`;
      }
      if (afleveremail != '') {
        where += ` and ucase(afleveremail) like ucase('${afleveremail}%')`;
      }
      sql += `
${where}
order by aflevernaam,afleveradres`;
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
      Util.unknownOperation(req, res, next);
    } else if (method == "GET") {
      this.doQuery(req, res, next, this.dict);
    } else if (method == "PUT" || method == "POST") {
      Util.unknownOperation(req, res, next);
    } else if (method == "DELETE") {
      Util.unknownOperation(req, res, next);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }
}
