
    /* 
    add to router:
    import { Bewerkingsoort } from './providers/bewerkingsoort';
    private bewerkingsoort: Bewerkingsoort;
    this.bewerkingsoort = new Bewerkingsoort();
    this.app.route('/bewerkingsoort.php').all((req, res, next) => this.bewerkingsoort.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BEWERKINGSOORT",
key: [
  {
    body:"BEWERKINGSOORT",
    sql:"BEWERKINGSOORT",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(NAAM)",
    where: [
        {
            query: "value",
            sql: "ucase(NAAM) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "BEWERKINGSOORT as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "BEWERKINGSOORT",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "bewerkingsoort",
        sql: "BEWERKINGSOORT like ('%?%')",
        },
        {
        query: "naam",
        sql: "NAAM like ('%?%')",
        },
        {
        query: "volgorde",
        sql: "VOLGORDE like ('%?%')",
        },
        {
        query: "kleur",
        sql: "KLEUR like ('%?%')",
        },
        {
        query: "voortgang",
        sql: "VOORTGANG like ('%?%')",
        },
        {
        query: "afkorting",
        sql: "AFKORTING like ('%?%')",
        },
        {
        query: "layout",
        sql: "LAYOUT like ('%?%')",
        },
        {
        query: "reparatie",
        sql: "REPARATIE like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "BEWERKINGSOORT",
        sql: "ifnull(BEWERKINGSOORT,'') as BEWERKINGSOORT",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        },
        {
        row: "VOLGORDE",
        sql: "ifnull(VOLGORDE,'') as VOLGORDE",
        },
        {
        row: "KLEUR",
        sql: "ifnull(KLEUR,'') as KLEUR",
        },
        {
        row: "VOORTGANG",
        sql: "ifnull(VOORTGANG,'') as VOORTGANG",
        },
        {
        row: "AFKORTING",
        sql: "ifnull(AFKORTING,'') as AFKORTING",
        },
        {
        row: "LAYOUT",
        sql: "ifnull(LAYOUT,'') as LAYOUT",
        },
        {
        row: "REPARATIE",
        sql: "ifnull(REPARATIE,'') as REPARATIE",
        }
    ],},
update: {
    fields: [
        {
        body: "BEWERKINGSOORT",
        sql: "BEWERKINGSOORT = '?'",
        required: false,
        maxLength: 1,
        default: "",
        },
        {
        body: "NAAM",
        sql: "NAAM = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "VOLGORDE",
        sql: "VOLGORDE = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "KLEUR",
        sql: "KLEUR = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "VOORTGANG",
        sql: "VOORTGANG = '?'",
        required: false,
        maxLength: 1,
        default: "",
        },
        {
        body: "AFKORTING",
        sql: "AFKORTING = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "LAYOUT",
        sql: "LAYOUT = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "REPARATIE",
        sql: "REPARATIE = '?'",
        required: false,
        maxLength: 1,
        default: "",
        }
    ],},
}
    
    export class Bewerkingsoort extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    