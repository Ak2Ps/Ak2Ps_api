
    /* 
    add to router:
    import { Retouractietype } from './providers/retouractietype';
    private retouractietype: Retouractietype;
    this.retouractietype = new Retouractietype();
    this.app.route('/retouractietype.php').all((req, res, next) => this.retouractietype.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "RETOURACTIETYPE",
key: [
  {
    body:"ACTIE",
    sql:"ACTIE",
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
            sql: "ACTIE as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "ACTIE",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "actie",
        sql: "ACTIE like ('%?%')",
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
        row: "ACTIE",
        sql: "ifnull(ACTIE,'') as ACTIE",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        }
    ],},
update: {
    fields: [
        {
        body: "ACTIE",
        sql: "ACTIE = '?'",
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
    
    export class Retouractietype extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    