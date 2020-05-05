
    /* 
    add to router:
    import { Berekening_sqlpartbewerkingen } from './providers/berekening_sqlpartbewerkingen';
    private berekening_sqlpartbewerkingen: Berekening_sqlpartbewerkingen;
    this.berekening_sqlpartbewerkingen = new Berekening_sqlpartbewerkingen();
    this.app.route('/berekening_sqlpartbewerkingen.php').all((req, res, next) => this.berekening_sqlpartbewerkingen.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BEREKENING_SQLPARTBEWERKINGEN",
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
        query: "sqlpartbewerkingen",
        sql: "SQLPARTBEWERKINGEN = ?",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        }
    ],
    fields: [
        {
        row: "SQLPARTBEWERKINGEN",
        sql: "ifnull(cast(SQLPARTBEWERKINGEN as CHAR),'') as SQLPARTBEWERKINGEN",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        }
    ],},
update: {
    fields: [
        {
        body: "SQLPARTBEWERKINGEN",
        sql: "SQLPARTBEWERKINGEN",
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
    
    export class Berekening_sqlpartbewerkingen extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    