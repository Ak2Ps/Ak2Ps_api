
    /* 
    add to router:
    import { Retouractie } from './providers/retouractie';
    private retouractie: Retouractie;
    this.retouractie = new Retouractie();
    this.app.route('/retouractie.php').all((req, res, next) => this.retouractie.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "RETOURACTIE",
key: [
  {
    body:"REFERENTIE",
    sql:"REFERENTIE",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(ACTIE)",
    where: [
        {
            query: "value",
            sql: "ucase(ACTIE) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "REFERENTIE as ID"
        },
        {
            row: "VALUE",
            sql: "ACTIE AS VALUE"
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
        query: "actie",
        sql: "ACTIE like ('%?%')",
        },
        {
        query: "gebruiker",
        sql: "GEBRUIKER like ('%?%')",
        },
        {
        query: "garantie",
        sql: "GARANTIE like ('%?%')",
        },
        {
        query: "kosten",
        sql: "KOSTEN = ?",
        },
        {
        query: "gereeddatumtijd",
        sql: "GEREEDDATUMTIJD > screendate2date('?')",
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
        }
    ],},
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
        body: "ACTIE",
        sql: "ACTIE = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "GEBRUIKER",
        sql: "GEBRUIKER = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "GARANTIE",
        sql: "GARANTIE = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "KOSTEN",
        sql: "KOSTEN = '?'",
        required: false,
        maxLength: 16,
        default: "",
        },
        {
        body: "GEREEDDATUMTIJD",
        sql: "GEREEDDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "OPMERKING",
        sql: "OPMERKING = '?'",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Retouractie extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    