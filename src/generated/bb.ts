
    /* 
    add to router:
    import { Bb } from './providers/bb';
    private bb: Bb;
    this.bb = new Bb();
    this.app.route('/bb.php').all((req, res, next) => this.bb.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BB",
key: [
  {
    body:"BB",
    sql:"BB",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(OMSCHRIJVING)",
    where: [
        {
            query: "value",
            sql: "ucase(OMSCHRIJVING) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "BB as ID"
        },
        {
            row: "VALUE",
            sql: "OMSCHRIJVING AS VALUE"
        }
    ],
},
query: {
    orderby: "BB",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "bb",
        sql: "BB like ('%?%')",
        },
        {
        query: "omschrijving",
        sql: "OMSCHRIJVING like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "BB",
        sql: "ifnull(BB,'') as BB",
        },
        {
        row: "OMSCHRIJVING",
        sql: "ifnull(OMSCHRIJVING,'') as OMSCHRIJVING",
        }
    ],},
update: {
    fields: [
        {
        body: "BB",
        sql: "BB = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "OMSCHRIJVING",
        sql: "OMSCHRIJVING = '?'",
        required: false,
        maxLength: 255,
        default: "",
        }
    ],},
}
    
    export class Bb extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    