
    /* 
    add to router:
    import { Productgroep } from './providers/productgroep';
    private productgroep: Productgroep;
    this.productgroep = new Productgroep();
    this.app.route('/productgroep.php').all((req, res, next) => this.productgroep.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PRODUCTGROEP",
key: [
  {
    body:"PRODUCTGROEP",
    sql:"PRODUCTGROEP",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(METONDERDELEN)",
    where: [
        {
            query: "value",
            sql: "ucase(METONDERDELEN) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "PRODUCTGROEP as ID"
        },
        {
            row: "VALUE",
            sql: "METONDERDELEN AS VALUE"
        }
    ],
},
query: {
    orderby: "PRODUCTGROEP",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "productgroep",
        sql: "PRODUCTGROEP like ('%?%')",
        },
        {
        query: "metonderdelen",
        sql: "METONDERDELEN like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "PRODUCTGROEP",
        sql: "ifnull(PRODUCTGROEP,'') as PRODUCTGROEP",
        },
        {
        row: "METONDERDELEN",
        sql: "ifnull(METONDERDELEN,'') as METONDERDELEN",
        }
    ],},
update: {
    fields: [
        {
        body: "PRODUCTGROEP",
        sql: "PRODUCTGROEP = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "METONDERDELEN",
        sql: "METONDERDELEN = '?'",
        required: false,
        maxLength: 1,
        default: "",
        }
    ],},
}
    
    export class Productgroep extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    