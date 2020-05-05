
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
    orderby: "ucase(KLANTNUMMER)",
    where: [
      {
        query: "value",
        sql: "ucase(KLANTNUMMER) like '%?%'",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "REFERENTIE as ID"
      },
      {
        row: "VALUE",
        sql: "KLANTNUMMER AS VALUE"
      }
    ],
  },
  query: {
    orderby: "REFERENTIE",
    where: [
      {
        query: "id",
        sql: "ID = ?",
      },
      {
        query: "referentie",
        sql: "REFERENTIE like ('%?%')",
      },
      {
        query: "klantnummer",
        sql: "KLANTNUMMER like ('%?%')",
      },
      {
        query: "naam",
        sql: "NAAM like ('%?%')",
      },
      {
        query: "zoekcode",
        sql: "ZOEKCODE like ('%?%')",
      },
      {
        query: "adres",
        sql: "ADRES like ('%?%')",
      },
      {
        query: "woonplaats",
        sql: "WOONPLAATS like ('%?%')",
      },
      {
        query: "postcode",
        sql: "POSTCODE like ('%?%')",
      },
      {
        query: "land",
        sql: "LAND like ('%?%')",
      },
      {
        query: "telefoon",
        sql: "TELEFOON like ('%?%')",
      },
      {
        query: "fax",
        sql: "FAX like ('%?%')",
      },
      {
        query: "email",
        sql: "EMAIL like ('%?%')",
      },
      {
        query: "aflevernaam",
        sql: "AFLEVERNAAM like ('%?%')",
      },
      {
        query: "afleveradres",
        sql: "AFLEVERADRES like ('%?%')",
      },
      {
        query: "afleverwoonplaats",
        sql: "AFLEVERWOONPLAATS like ('%?%')",
      },
      {
        query: "afleverpostcode",
        sql: "AFLEVERPOSTCODE like ('%?%')",
      },
      {
        query: "afleverland",
        sql: "AFLEVERLAND like ('%?%')",
      },
      {
        query: "afleverdpdnummer",
        sql: "AFLEVERDPDNUMMER like ('%?%')",
      },
      {
        query: "aflevertelefoon",
        sql: "AFLEVERTELEFOON like ('%?%')",
      },
      {
        query: "afleverfax",
        sql: "AFLEVERFAX like ('%?%')",
      },
      {
        query: "afleveremail",
        sql: "AFLEVEREMAIL like ('%?%')",
      },
      {
        query: "contact",
        sql: "CONTACT like ('%?%')",
      },
      {
        query: "opmerking",
        sql: "OPMERKING like ('%?%')",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
      },
      {
        row: "REFERENTIE",
        sql: "ifnull(REFERENTIE,'') as REFERENTIE",
      },
      {
        row: "KLANTNUMMER",
        sql: "ifnull(KLANTNUMMER,'') as KLANTNUMMER",
      },
      {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
      },
      {
        row: "ZOEKCODE",
        sql: "ifnull(ZOEKCODE,'') as ZOEKCODE",
      },
      {
        row: "ADRES",
        sql: "ifnull(ADRES,'') as ADRES",
      },
      {
        row: "WOONPLAATS",
        sql: "ifnull(WOONPLAATS,'') as WOONPLAATS",
      },
      {
        row: "POSTCODE",
        sql: "ifnull(POSTCODE,'') as POSTCODE",
      },
      {
        row: "LAND",
        sql: "ifnull(LAND,'') as LAND",
      },
      {
        row: "TELEFOON",
        sql: "ifnull(TELEFOON,'') as TELEFOON",
      },
      {
        row: "FAX",
        sql: "ifnull(FAX,'') as FAX",
      },
      {
        row: "EMAIL",
        sql: "ifnull(EMAIL,'') as EMAIL",
      },
      {
        row: "AFLEVERNAAM",
        sql: "ifnull(AFLEVERNAAM,'') as AFLEVERNAAM",
      },
      {
        row: "AFLEVERADRES",
        sql: "ifnull(AFLEVERADRES,'') as AFLEVERADRES",
      },
      {
        row: "AFLEVERWOONPLAATS",
        sql: "ifnull(AFLEVERWOONPLAATS,'') as AFLEVERWOONPLAATS",
      },
      {
        row: "AFLEVERPOSTCODE",
        sql: "ifnull(AFLEVERPOSTCODE,'') as AFLEVERPOSTCODE",
      },
      {
        row: "AFLEVERLAND",
        sql: "ifnull(AFLEVERLAND,'') as AFLEVERLAND",
      },
      {
        row: "AFLEVERDPDNUMMER",
        sql: "ifnull(AFLEVERDPDNUMMER,'') as AFLEVERDPDNUMMER",
      },
      {
        row: "AFLEVERTELEFOON",
        sql: "ifnull(AFLEVERTELEFOON,'') as AFLEVERTELEFOON",
      },
      {
        row: "AFLEVERFAX",
        sql: "ifnull(AFLEVERFAX,'') as AFLEVERFAX",
      },
      {
        row: "AFLEVEREMAIL",
        sql: "ifnull(AFLEVEREMAIL,'') as AFLEVEREMAIL",
      },
      {
        row: "CONTACT",
        sql: "ifnull(CONTACT,'') as CONTACT",
      },
      {
        row: "OPMERKING",
        sql: "ifnull(OPMERKING,'') as OPMERKING",
      }
    ],
  },
  update: {
    fields: [
      {
        body: "REFERENTIE",
        sql: "REFERENTIE = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "KLANTNUMMER",
        sql: "KLANTNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "NAAM",
        sql: "NAAM = '?'",
        required: false,
        maxLength: 255,
        default: "",
      },
      {
        body: "ZOEKCODE",
        sql: "ZOEKCODE = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "ADRES",
        sql: "ADRES = '?'",
        required: false,
        maxLength: 255,
        default: "",
      },
      {
        body: "WOONPLAATS",
        sql: "WOONPLAATS = '?'",
        required: false,
        maxLength: 255,
        default: "",
      },
      {
        body: "POSTCODE",
        sql: "POSTCODE = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "LAND",
        sql: "LAND = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "TELEFOON",
        sql: "TELEFOON = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "FAX",
        sql: "FAX = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "EMAIL",
        sql: "EMAIL = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "AFLEVERNAAM",
        sql: "AFLEVERNAAM = '?'",
        required: false,
        maxLength: 255,
        default: "",
      },
      {
        body: "AFLEVERADRES",
        sql: "AFLEVERADRES = '?'",
        required: false,
        maxLength: 255,
        default: "",
      },
      {
        body: "AFLEVERWOONPLAATS",
        sql: "AFLEVERWOONPLAATS = '?'",
        required: false,
        maxLength: 255,
        default: "",
      },
      {
        body: "AFLEVERPOSTCODE",
        sql: "AFLEVERPOSTCODE = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "AFLEVERLAND",
        sql: "AFLEVERLAND = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "AFLEVERDPDNUMMER",
        sql: "AFLEVERDPDNUMMER = '?'",
        required: false,
        maxLength: 255,
        default: "",
      },
      {
        body: "AFLEVERTELEFOON",
        sql: "AFLEVERTELEFOON = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "AFLEVERFAX",
        sql: "AFLEVERFAX = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "AFLEVEREMAIL",
        sql: "AFLEVEREMAIL = '?'",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "CONTACT",
        sql: "CONTACT = '?'",
        required: false,
        maxLength: 255,
        default: "",
      }
    ],
  },
}

export class Retourklant extends Crud {
  constructor() {
    super(
      dict
    )
  }

  private async doInit(req: Request, res: Response, next: NextFunction, options?: any) {
    let sql = `
insert into RETOURKLANT (referentie)
select '${db.fix(req.query.referentie)}' from DUAL
where not exists (select 1 from RETOURKLANT where referentie = '${db.fix(req.query.referentie)}')`;
    //
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    //
    sql = "select";
    sql += this.addSelectFields(req, res, next, this.dict?.query?.fields);
    sql += `\nfrom ${dict.table}`;
    sql += `\nwhere REFERENTIE = '${db.fix(req.query.referentie)}'`;
    rows = await db.waitQuery(connection, sql);
    connection.release();
    res.status(200).send(rows[0]);
    return;
  }

  private async doOvernemen(req: Request, res: Response, next: NextFunction, options?: any) {
    let sql = `
insert into RETOURKLANT (referentie)
select '${db.fix(req.query.referentie)}' from DUAL
where not exists (select 1 from RETOURKLANT where referentie = '${db.fix(req.query.referentie)}')`;
    //
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    //
    sql = `
select
cast(Id as CHAR) as ID
,ifnull(Klantnummer,'') as KLANTNUMMER
,ifnull(Naam,'') as NAAM
,ifnull(Zoekcode,'') as ZOEKCODE
,ifnull(Adres,'') as ADRES
,ifnull(Woonplaats,'') as WOONPLAATS
,ifnull(Postcode,'') as POSTCODE
,ifnull(Telefoon,'') as TELEFOON
,ifnull(Fax,'') as FAX
,ifnull(EMail,'') as EMAIL
,ifnull(Categorie,'') as CATEGORIE
,ifnull(Contact,'') as CONTACT
,ifnull(Land,'') as LAND
,ifnull(cast(Leverdagen as CHAR),'') as LEVERDAGEN
from KLANT
where id = '${db.fix(req.query.klantid)}'`;
    rows = await db.waitQuery(connection, sql);
    connection.release();
    res.status(200).send(rows[0]);
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
    } else if (action == "init") {
      this.doInit(req, res, next, this.dict);
    } else if (action == "overnemen") {
      this.doOvernemen(req, res, next, this.dict);
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
