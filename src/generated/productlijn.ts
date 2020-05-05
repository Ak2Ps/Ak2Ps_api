
    /* 
    add to router:
    import { Productlijn } from './providers/productlijn';
    private productlijn: Productlijn;
    this.productlijn = new Productlijn();
    this.app.route('/productlijn.php').all((req, res, next) => this.productlijn.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PRODUCTLIJN",
key: [
  {
    body:"PRODUCTLIJN",
    sql:"PRODUCTLIJN",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(PRODUCTLIJNNAAM)",
    where: [
        {
            query: "value",
            sql: "ucase(PRODUCTLIJNNAAM) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "PRODUCTLIJN as ID"
        },
        {
            row: "VALUE",
            sql: "PRODUCTLIJNNAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "PRODUCTLIJN",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "productlijn",
        sql: "PRODUCTLIJN like ('%?%')",
        },
        {
        query: "productlijnnaam",
        sql: "PRODUCTLIJNNAAM like ('%?%')",
        },
        {
        query: "productielijn",
        sql: "PRODUCTIELIJN like ('%?%')",
        },
        {
        query: "productielijnnaam",
        sql: "PRODUCTIELIJNNAAM like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "PRODUCTLIJN",
        sql: "ifnull(PRODUCTLIJN,'') as PRODUCTLIJN",
        },
        {
        row: "PRODUCTLIJNNAAM",
        sql: "ifnull(PRODUCTLIJNNAAM,'') as PRODUCTLIJNNAAM",
        },
        {
        row: "PRODUCTIELIJN",
        sql: "ifnull(PRODUCTIELIJN,'') as PRODUCTIELIJN",
        },
        {
        row: "PRODUCTIELIJNNAAM",
        sql: "ifnull(PRODUCTIELIJNNAAM,'') as PRODUCTIELIJNNAAM",
        }
    ],},
update: {
    fields: [
        {
        body: "PRODUCTLIJN",
        sql: "PRODUCTLIJN = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "PRODUCTLIJNNAAM",
        sql: "PRODUCTLIJNNAAM = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "PRODUCTIELIJN",
        sql: "PRODUCTIELIJN = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "PRODUCTIELIJNNAAM",
        sql: "PRODUCTIELIJNNAAM = '?'",
        required: false,
        maxLength: 50,
        default: "",
        }
    ],},
}
    
    export class Productlijn extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    