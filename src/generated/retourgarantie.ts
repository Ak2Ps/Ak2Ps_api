
    /* 
    add to router:
    import { Retourgarantie } from './providers/retourgarantie';
    private retourgarantie: Retourgarantie;
    this.retourgarantie = new Retourgarantie();
    this.app.route('/retourgarantie.php').all((req, res, next) => this.retourgarantie.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "RETOURGARANTIE",
key: [
  {
    body:"GARANTIE",
    sql:"GARANTIE",
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
            sql: "GARANTIE as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "GARANTIE",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "garantie",
        sql: "GARANTIE like ('%?%')",
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
        row: "GARANTIE",
        sql: "ifnull(GARANTIE,'') as GARANTIE",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        }
    ],},
update: {
    fields: [
        {
        body: "GARANTIE",
        sql: "GARANTIE = '?'",
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
    
    export class Retourgarantie extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    