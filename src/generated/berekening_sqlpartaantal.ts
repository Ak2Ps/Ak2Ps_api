
    /* 
    add to router:
    import { Berekening_sqlpartaantal } from './providers/berekening_sqlpartaantal';
    private berekening_sqlpartaantal: Berekening_sqlpartaantal;
    this.berekening_sqlpartaantal = new Berekening_sqlpartaantal();
    this.app.route('/berekening_sqlpartaantal.php').all((req, res, next) => this.berekening_sqlpartaantal.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BEREKENING_SQLPARTAANTAL",
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
        query: "sqlpartaantal",
        sql: "SQLPARTAANTAL = ?",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        }
    ],
    fields: [
        {
        row: "SQLPARTAANTAL",
        sql: "ifnull(cast(SQLPARTAANTAL as CHAR),'') as SQLPARTAANTAL",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        }
    ],},
update: {
    fields: [
        {
        body: "SQLPARTAANTAL",
        sql: "SQLPARTAANTAL = '?'",
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
    
    export class Berekening_sqlpartaantal extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    