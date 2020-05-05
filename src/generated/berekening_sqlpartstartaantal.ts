
    /* 
    add to router:
    import { Berekening_sqlpartstartaantal } from './providers/berekening_sqlpartstartaantal';
    private berekening_sqlpartstartaantal: Berekening_sqlpartstartaantal;
    this.berekening_sqlpartstartaantal = new Berekening_sqlpartstartaantal();
    this.app.route('/berekening_sqlpartstartaantal.php').all((req, res, next) => this.berekening_sqlpartstartaantal.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BEREKENING_SQLPARTSTARTAANTAL",
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
        query: "sqlpartstartaantal",
        sql: "SQLPARTSTARTAANTAL = ?",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        }
    ],
    fields: [
        {
        row: "SQLPARTSTARTAANTAL",
        sql: "ifnull(cast(SQLPARTSTARTAANTAL as CHAR),'') as SQLPARTSTARTAANTAL",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        }
    ],},
update: {
    fields: [
        {
        body: "SQLPARTSTARTAANTAL",
        sql: "SQLPARTSTARTAANTAL = '?'",
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
    
    export class Berekening_sqlpartstartaantal extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    