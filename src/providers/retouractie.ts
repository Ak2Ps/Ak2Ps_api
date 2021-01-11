
import { Crud } from '../crud';
import db from '../db';
import { Request, Response, NextFunction } from "express";

const dict: Dict = {
  table: "RETOURACTIE",
  key: [
    {
      body: "REFERENTIE",
      sql: "REFERENTIE",
    },
    {
      body: "ACTIE",
      sql: "ACTIE",
    },
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "ucase(ACTIE)",
    where: [
      {
        query: "value",
        sql: "ucase(ACTIE) like ucase('%?%')",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "ACTIE as ID"
      },
      {
        row: "VALUE",
        sql: "ACTIE AS VALUE"
      }
    ],
  },
  query: {
    orderby: "REFERENTIE,ACTIE,GEREEDDATUMTIJD",
    where: [
      {
        query: "id",
        sql: "ID = ?",
      },
      {
        query: "referentie",
        sql: "ucase(REFERENTIE) like ucase('?%')",
      },
      {
        query: "actie",
        sql: "ucase(ACTIE) like ucase('?%')",
      },
      {
        query: "gebruiker",
        sql: "ucase(GEBRUIKER) like ucase('?%')",
      },
      {
        query: "garantie",
        sql: "ucase(GARANTIE) like ucase('?%')",
      },
      {
        query: "kosten",
        sql: "KOSTEN = ?",
      },
      {
        query: "opmerking",
        sql: "ucase(OPMERKING) like ucase('?%')",
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
        row: "ACTIE",
        sql: "ifnull(ACTIE,'') as ACTIE",
      },
      {
        row: "GEBRUIKER",
        sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
      },
      {
        row: "GARANTIE",
        sql: "ifnull(GARANTIE,'') as GARANTIE",
      },
      {
        row: "KOSTEN",
        sql: "ifnull(cast(KOSTEN as CHAR),'') as KOSTEN",
      },
      {
        row: "GEREEDDATUMTIJD",
        sql: "date2jsondate(GEREEDDATUMTIJD) as GEREEDDATUMTIJD",
      },
      {
        row: "OPMERKING",
        sql: "ifnull(OPMERKING,'') as OPMERKING",
      },
      {
        row: "GEREED",
        sql: "date2screendate(GEREEDDATUMTIJD) as GEREED",
      },
      {
        row: "ACTIE_DESC",
        sql: "ifnull((select naam from RETOURACTIETYPE where RETOURACTIE.actie = RETOURACTIETYPE.actie),'') as ACTIE_DESC",
      },
      {
        row: "GEBRUIKER_DESC",
        sql: "ifnull((select naam from RETOURGEBRUIKER where RETOURACTIE.gebruiker = RETOURGEBRUIKER.gebruiker),'') as GEBRUIKER_DESC",
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
        body: "GEREED",
        sql: "GEREEDDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "ACTIE_DESC",
        sql: "ACTIE = (select min(actie) from RETOURACTIETYPE where naam = '?')",
        required: false,
        maxLength: 50,
        default: "",
      },
      {
        body: "GEBRUIKER_DESC",
        sql: "GEBRUIKER = (select min(gebruiker) from RETOURGEBRUIKER where naam = '?')",
        required: false,
        maxLength: 255,
        default: "",
      },
    ],
  },
}

export class Retouractie extends Crud {
  constructor() {
    super(
      dict
    )
  }

  private setGereedSql(req: Request, res: Response, next: NextFunction): string {
    let sql = `
update RETOUR set
gereeddatumtijd = 
(select case 
when exists(select 1 from RETOURACTIE where gereeddatumtijd is NULL and referentie = '${db.fix(req.body.REFERENTIE)}')
then null
else
(select max(gereeddatumtijd) from RETOURACTIE where referentie = '${db.fix(req.body.REFERENTIE)}')
end)
where referentie = '${db.fix(req.body.REFERENTIE)}';`;
    return sql;
  }

  protected async doAfterUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let result = true;
    await db.waitQuery(res.crudConnection, this.setGereedSql(req, res, next));
    return (result);
  }

  protected async doAfterDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let result = true;
    await db.waitQuery(res.crudConnection, this.setGereedSql(req, res, next));
    return (result);
  }
}
