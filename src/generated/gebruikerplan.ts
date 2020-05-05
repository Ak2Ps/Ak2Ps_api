
    /* 
    add to router:
    import { Gebruikerplan } from './providers/gebruikerplan';
    private gebruikerplan: Gebruikerplan;
    this.gebruikerplan = new Gebruikerplan();
    this.app.route('/gebruikerplan.php').all((req, res, next) => this.gebruikerplan.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "GEBRUIKERPLAN",
key: [
  {
    body:"GEBRUIKER",
    sql:"GEBRUIKER",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(STARTDATUMTIJD)",
    where: [
        {
            query: "value",
            sql: "ucase(STARTDATUMTIJD) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "GEBRUIKER as ID"
        },
        {
            row: "VALUE",
            sql: "STARTDATUMTIJD AS VALUE"
        }
    ],
},
query: {
    orderby: "GEBRUIKER",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "gebruiker",
        sql: "GEBRUIKER like ('%?%')",
        },
        {
        query: "startdatumtijd",
        sql: "STARTDATUMTIJD > screendate2date('?')",
        },
        {
        query: "einddatumtijd",
        sql: "EINDDATUMTIJD > screendate2date('?')",
        },
        {
        query: "plansoort",
        sql: "PLANSOORT like ('%?%')",
        },
        {
        query: "tijd",
        sql: "TIJD = ?",
        },
        {
        query: "pauze",
        sql: "PAUZE = ?",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "GEBRUIKER",
        sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
        },
        {
        row: "STARTDATUMTIJD",
        sql: "date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD",
        },
        {
        row: "EINDDATUMTIJD",
        sql: "date2jsondate(EINDDATUMTIJD) as EINDDATUMTIJD",
        },
        {
        row: "PLANSOORT",
        sql: "ifnull(PLANSOORT,'') as PLANSOORT",
        },
        {
        row: "TIJD",
        sql: "ifnull(cast(TIJD as CHAR),'') as TIJD",
        },
        {
        row: "PAUZE",
        sql: "ifnull(cast(PAUZE as CHAR),'') as PAUZE",
        }
    ],},
update: {
    fields: [
        {
        body: "GEBRUIKER",
        sql: "GEBRUIKER = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "STARTDATUMTIJD",
        sql: "STARTDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "EINDDATUMTIJD",
        sql: "EINDDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "PLANSOORT",
        sql: "PLANSOORT = '?'",
        required: false,
        maxLength: 3,
        default: "",
        },
        {
        body: "TIJD",
        sql: "TIJD = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "PAUZE",
        sql: "PAUZE = '?'",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Gebruikerplan extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    