
    /* 
    add to router:
    import { Productopmerking } from './providers/productopmerking';
    private productopmerking: Productopmerking;
    this.productopmerking = new Productopmerking();
    this.app.route('/productopmerking.php').all((req, res, next) => this.productopmerking.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PRODUCTOPMERKING",
key: [
  {
    body:"PRODUCTNUMMER",
    sql:"PRODUCTNUMMER",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(BRON)",
    where: [
        {
            query: "value",
            sql: "ucase(BRON) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "PRODUCTNUMMER as ID"
        },
        {
            row: "VALUE",
            sql: "BRON AS VALUE"
        }
    ],
},
query: {
    orderby: "PRODUCTNUMMER",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        },
        {
        query: "bron",
        sql: "BRON like ('%?%')",
        },
        {
        query: "opmerking",
        sql: "OPMERKING like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        },
        {
        row: "BRON",
        sql: "ifnull(BRON,'') as BRON",
        },
        {
        row: "OPMERKING",
        sql: "ifnull(OPMERKING,'') as OPMERKING",
        }
    ],},
update: {
    fields: [
        {
        body: "PRODUCTNUMMER",
        sql: "PRODUCTNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "BRON",
        sql: "BRON = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "OPMERKING",
        sql: "OPMERKING = '?'",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Productopmerking extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    