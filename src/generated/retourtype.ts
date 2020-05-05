
    /* 
    add to router:
    import { Retourtype } from './providers/retourtype';
    private retourtype: Retourtype;
    this.retourtype = new Retourtype();
    this.app.route('/retourtype.php').all((req, res, next) => this.retourtype.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "RETOURTYPE",
key: [
  {
    body:"RETOURTYPE",
    sql:"RETOURTYPE",
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
            sql: "RETOURTYPE as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "RETOURTYPE",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "retourtype",
        sql: "RETOURTYPE like ('%?%')",
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
        row: "RETOURTYPE",
        sql: "ifnull(RETOURTYPE,'') as RETOURTYPE",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        }
    ],},
update: {
    fields: [
        {
        body: "RETOURTYPE",
        sql: "RETOURTYPE = '?'",
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
    
    export class Retourtype extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    