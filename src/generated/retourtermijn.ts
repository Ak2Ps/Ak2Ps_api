
    /* 
    add to router:
    import { Retourtermijn } from './providers/retourtermijn';
    private retourtermijn: Retourtermijn;
    this.retourtermijn = new Retourtermijn();
    this.app.route('/retourtermijn.php').all((req, res, next) => this.retourtermijn.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "RETOURTERMIJN",
key: [
  {
    body:"RETOURTERMIJN",
    sql:"RETOURTERMIJN",
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
            sql: "RETOURTERMIJN as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "RETOURTERMIJN",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "retourtermijn",
        sql: "RETOURTERMIJN like ('%?%')",
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
        row: "RETOURTERMIJN",
        sql: "ifnull(RETOURTERMIJN,'') as RETOURTERMIJN",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        }
    ],},
update: {
    fields: [
        {
        body: "RETOURTERMIJN",
        sql: "RETOURTERMIJN = '?'",
        required: false,
        maxLength: 50,
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
    
    export class Retourtermijn extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    