
    /* 
    add to router:
    import { Productflow } from './providers/productflow';
    private productflow: Productflow;
    this.productflow = new Productflow();
    this.app.route('/productflow.php').all((req, res, next) => this.productflow.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PRODUCTFLOW",
key: [
  {
    body:"PRODUCTNUMMER",
    sql:"PRODUCTNUMMER",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(VOLGNUMMER)",
    where: [
        {
            query: "value",
            sql: "ucase(VOLGNUMMER) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "PRODUCTNUMMER as ID"
        },
        {
            row: "VALUE",
            sql: "VOLGNUMMER AS VALUE"
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
        query: "volgnummer",
        sql: "VOLGNUMMER = ?",
        },
        {
        query: "bewerkingsoort",
        sql: "BEWERKINGSOORT like ('%?%')",
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
        row: "VOLGNUMMER",
        sql: "ifnull(cast(VOLGNUMMER as CHAR),'') as VOLGNUMMER",
        },
        {
        row: "BEWERKINGSOORT",
        sql: "ifnull(BEWERKINGSOORT,'') as BEWERKINGSOORT",
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
        body: "VOLGNUMMER",
        sql: "VOLGNUMMER",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "BEWERKINGSOORT",
        sql: "BEWERKINGSOORT = '?'",
        required: false,
        maxLength: 1,
        default: "",
        }
    ],},
}
    
    export class Productflow extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    