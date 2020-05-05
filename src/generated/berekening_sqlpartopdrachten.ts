
    /* 
    add to router:
    import { Berekening_sqlpartopdrachten } from './providers/berekening_sqlpartopdrachten';
    private berekening_sqlpartopdrachten: Berekening_sqlpartopdrachten;
    this.berekening_sqlpartopdrachten = new Berekening_sqlpartopdrachten();
    this.app.route('/berekening_sqlpartopdrachten.php').all((req, res, next) => this.berekening_sqlpartopdrachten.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BEREKENING_SQLPARTOPDRACHTEN",
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
        query: "sqlpartopdrachten",
        sql: "SQLPARTOPDRACHTEN = ?",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        }
    ],
    fields: [
        {
        row: "SQLPARTOPDRACHTEN",
        sql: "ifnull(cast(SQLPARTOPDRACHTEN as CHAR),'') as SQLPARTOPDRACHTEN",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        }
    ],},
update: {
    fields: [
        {
        body: "SQLPARTOPDRACHTEN",
        sql: "SQLPARTOPDRACHTEN",
        required: false,
        maxLength: 21,
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
    
    export class Berekening_sqlpartopdrachten extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    