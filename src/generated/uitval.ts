
    /* 
    add to router:
    import { Uitval } from './providers/uitval';
    private uitval: Uitval;
    this.uitval = new Uitval();
    this.app.route('/uitval.php').all((req, res, next) => this.uitval.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "UITVAL",
key: [
  {
    body:"UITVAL",
    sql:"UITVAL",
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
            sql: "UITVAL as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "UITVAL",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "uitval",
        sql: "UITVAL like ('%?%')",
        },
        {
        query: "naam",
        sql: "NAAM like ('%?%')",
        },
        {
        query: "kleur",
        sql: "KLEUR like ('%?%')",
        },
        {
        query: "uitvalsoort",
        sql: "UITVALSOORT like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "UITVAL",
        sql: "ifnull(UITVAL,'') as UITVAL",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        },
        {
        row: "KLEUR",
        sql: "ifnull(KLEUR,'') as KLEUR",
        },
        {
        row: "UITVALSOORT",
        sql: "ifnull(UITVALSOORT,'') as UITVALSOORT",
        }
    ],},
update: {
    fields: [
        {
        body: "UITVAL",
        sql: "UITVAL = '?'",
        required: false,
        maxLength: 10,
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
        body: "KLEUR",
        sql: "KLEUR = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "UITVALSOORT",
        sql: "UITVALSOORT = '?'",
        required: false,
        maxLength: 50,
        default: "",
        }
    ],},
}
    
    export class Uitval extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    