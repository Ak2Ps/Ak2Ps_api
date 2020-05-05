
    /* 
    add to router:
    import { Afdeling } from './providers/afdeling';
    private afdeling: Afdeling;
    this.afdeling = new Afdeling();
    this.app.route('/afdeling.php').all((req, res, next) => this.afdeling.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "AFDELING",
key: [
  {
    body:"AFDELING",
    sql:"AFDELING",
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
            sql: "AFDELING as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "AFDELING",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "afdeling",
        sql: "AFDELING like ('%?%')",
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
        row: "AFDELING",
        sql: "ifnull(AFDELING,'') as AFDELING",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        }
    ],},
update: {
    fields: [
        {
        body: "AFDELING",
        sql: "AFDELING = '?'",
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
    
    export class Afdeling extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    