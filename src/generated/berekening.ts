
    /* 
    add to router:
    import { Berekening } from './providers/berekening';
    private berekening: Berekening;
    this.berekening = new Berekening();
    this.app.route('/berekening.php').all((req, res, next) => this.berekening.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BEREKENING",
key: [
  {
    body:"SQLPARTTIJD",
    sql:"SQLPARTTIJD",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(SQLPARTAANTAL)",
    where: [
        {
            query: "value",
            sql: "ucase(SQLPARTAANTAL) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "SQLPARTTIJD as ID"
        },
        {
            row: "VALUE",
            sql: "SQLPARTAANTAL AS VALUE"
        }
    ],
},
query: {
    orderby: "SQLPARTTIJD",
    where: [
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        },
        {
        query: "sqlparttijd",
        sql: "SQLPARTTIJD = ?",
        },
        {
        query: "sqlpartaantal",
        sql: "SQLPARTAANTAL = ?",
        },
        {
        query: "sqlpartopdrachten",
        sql: "SQLPARTOPDRACHTEN = ?",
        },
        {
        query: "sqlpartbewerkingen",
        sql: "SQLPARTBEWERKINGEN = ?",
        },
        {
        query: "berekening",
        sql: "BEREKENING like ('%?%')",
        },
        {
        query: "gemiddeld",
        sql: "GEMIDDELD = ?",
        },
        {
        query: "nodig",
        sql: "NODIG = ?",
        }
    ],
    fields: [
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        },
        {
        row: "SQLPARTTIJD",
        sql: "ifnull(cast(SQLPARTTIJD as CHAR),'') as SQLPARTTIJD",
        },
        {
        row: "SQLPARTAANTAL",
        sql: "ifnull(cast(SQLPARTAANTAL as CHAR),'') as SQLPARTAANTAL",
        },
        {
        row: "SQLPARTOPDRACHTEN",
        sql: "ifnull(cast(SQLPARTOPDRACHTEN as CHAR),'') as SQLPARTOPDRACHTEN",
        },
        {
        row: "SQLPARTBEWERKINGEN",
        sql: "ifnull(cast(SQLPARTBEWERKINGEN as CHAR),'') as SQLPARTBEWERKINGEN",
        },
        {
        row: "BEREKENING",
        sql: "ifnull(BEREKENING,'') as BEREKENING",
        },
        {
        row: "GEMIDDELD",
        sql: "ifnull(cast(GEMIDDELD as CHAR),'') as GEMIDDELD",
        },
        {
        row: "NODIG",
        sql: "ifnull(cast(NODIG as CHAR),'') as NODIG",
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
        body: "SQLPARTTIJD",
        sql: "SQLPARTTIJD = '?'",
        required: false,
        maxLength: 32,
        default: "",
        },
        {
        body: "SQLPARTAANTAL",
        sql: "SQLPARTAANTAL = '?'",
        required: false,
        maxLength: 32,
        default: "",
        },
        {
        body: "SQLPARTOPDRACHTEN",
        sql: "SQLPARTOPDRACHTEN = '?'",
        required: false,
        maxLength: 32,
        default: "",
        },
        {
        body: "SQLPARTBEWERKINGEN",
        sql: "SQLPARTBEWERKINGEN",
        required: false,
        maxLength: 21,
        default: "",
        },
        {
        body: "BEREKENING",
        sql: "BEREKENING = '?'",
        required: false,
        maxLength: 86,
        default: "",
        },
        {
        body: "GEMIDDELD",
        sql: "GEMIDDELD = '?'",
        required: false,
        maxLength: 39,
        default: "",
        },
        {
        body: "NODIG",
        sql: "NODIG",
        required: false,
        maxLength: 1,
        default: "",
        }
    ],},
}
    
    export class Berekening extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    