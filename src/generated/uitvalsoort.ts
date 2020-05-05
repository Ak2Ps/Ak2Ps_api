
    /* 
    add to router:
    import { Uitvalsoort } from './providers/uitvalsoort';
    private uitvalsoort: Uitvalsoort;
    this.uitvalsoort = new Uitvalsoort();
    this.app.route('/uitvalsoort.php').all((req, res, next) => this.uitvalsoort.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "UITVALSOORT",
key: [
  {
    body:"",
    sql:"",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase()",
    where: [
        {
            query: "value",
            sql: "ucase() like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: " as ID"
        },
        {
            row: "VALUE",
            sql: " AS VALUE"
        }
    ],
},
query: {
    orderby: "",
    where: [
        {
        query: "value",
        sql: "VALUE like ('%?%')",
        }
    ],
    fields: [
        {
        row: "VALUE",
        sql: "ifnull(VALUE,'') as VALUE",
        }
    ],},
update: {
    fields: [
        {
        body: "VALUE",
        sql: "VALUE = '?'",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Uitvalsoort extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    