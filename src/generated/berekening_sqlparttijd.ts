
    /* 
    add to router:
    import { Berekening_sqlparttijd } from './providers/berekening_sqlparttijd';
    private berekening_sqlparttijd: Berekening_sqlparttijd;
    this.berekening_sqlparttijd = new Berekening_sqlparttijd();
    this.app.route('/berekening_sqlparttijd.php').all((req, res, next) => this.berekening_sqlparttijd.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BEREKENING_SQLPARTTIJD",
key: [
  {
    body:"PRODUCTNUMMER",
    sql:"PRODUCTNUMMER",
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
            sql: "PRODUCTNUMMER as ID"
        },
        {
            row: "VALUE",
            sql: " AS VALUE"
        }
    ],
},
query: {
    orderby: "PRODUCTNUMMER",
    where: [
        {
        query: "sqlparttijd",
        sql: "SQLPARTTIJD = ?",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        }
    ],
    fields: [
        {
        row: "SQLPARTTIJD",
        sql: "ifnull(cast(SQLPARTTIJD as CHAR),'') as SQLPARTTIJD",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        }
    ],},
update: {
    fields: [
        {
        body: "SQLPARTTIJD",
        sql: "SQLPARTTIJD = '?'",
        required: false,
        maxLength: 32,
        default: "",
        },
        {
        body: "PRODUCTNUMMER",
        sql: "PRODUCTNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        }
    ],},
}
    
    export class Berekening_sqlparttijd extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    