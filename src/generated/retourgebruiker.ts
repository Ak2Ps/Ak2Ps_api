
    /* 
    add to router:
    import { Retourgebruiker } from './providers/retourgebruiker';
    private retourgebruiker: Retourgebruiker;
    this.retourgebruiker = new Retourgebruiker();
    this.app.route('/retourgebruiker.php').all((req, res, next) => this.retourgebruiker.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "RETOURGEBRUIKER",
key: [
  {
    body:"GEBRUIKER",
    sql:"GEBRUIKER",
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
            sql: "GEBRUIKER as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
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
        row: "GEBRUIKER",
        sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        }
    ],},
update: {
    fields: [
        {
        body: "GEBRUIKER",
        sql: "GEBRUIKER = '?'",
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
    
    export class Retourgebruiker extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    