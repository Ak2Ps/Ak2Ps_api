
    /* 
    add to router:
    import { Plansoort } from './providers/plansoort';
    private plansoort: Plansoort;
    this.plansoort = new Plansoort();
    this.app.route('/plansoort.php').all((req, res, next) => this.plansoort.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PLANSOORT",
key: [
  {
    body:"SOORT",
    sql:"SOORT",
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
            sql: "SOORT as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "SOORT",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "soort",
        sql: "SOORT like ('%?%')",
        },
        {
        query: "naam",
        sql: "NAAM like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "SOORT",
        sql: "ifnull(SOORT,'') as SOORT",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        }
    ],},
update: {
    fields: [
        {
        body: "SOORT",
        sql: "SOORT = '?'",
        required: false,
        maxLength: 3,
        default: "",
        },
        {
        body: "NAAM",
        sql: "NAAM = '?'",
        required: false,
        maxLength: 50,
        default: "",
        }
    ],},
}
    
    export class Plansoort extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    