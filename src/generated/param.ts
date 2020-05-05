
    /* 
    add to router:
    import { Param } from './providers/param';
    private param: Param;
    this.param = new Param();
    this.app.route('/param.php').all((req, res, next) => this.param.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PARAM",
key: [
  {
    body:"NAAM",
    sql:"NAAM",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(INHOUD)",
    where: [
        {
            query: "value",
            sql: "ucase(INHOUD) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "NAAM as ID"
        },
        {
            row: "VALUE",
            sql: "INHOUD AS VALUE"
        }
    ],
},
query: {
    orderby: "NAAM",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "naam",
        sql: "NAAM like ('%?%')",
        },
        {
        query: "inhoud",
        sql: "INHOUD like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        },
        {
        row: "INHOUD",
        sql: "ifnull(INHOUD,'') as INHOUD",
        }
    ],},
update: {
    fields: [
        {
        body: "NAAM",
        sql: "NAAM = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "INHOUD",
        sql: "INHOUD = '?'",
        required: false,
        maxLength: 255,
        default: "",
        }
    ],},
}
    
    export class Param extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    