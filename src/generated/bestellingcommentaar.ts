
    /* 
    add to router:
    import { Bestellingcommentaar } from './providers/bestellingcommentaar';
    private bestellingcommentaar: Bestellingcommentaar;
    this.bestellingcommentaar = new Bestellingcommentaar();
    this.app.route('/bestellingcommentaar.php').all((req, res, next) => this.bestellingcommentaar.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BESTELLINGCOMMENTAAR",
key: [
  {
    body:"BESTELLINGID",
    sql:"BESTELLINGID",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(REGELNUMMER)",
    where: [
        {
            query: "value",
            sql: "ucase(REGELNUMMER) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "BESTELLINGID as ID"
        },
        {
            row: "VALUE",
            sql: "REGELNUMMER AS VALUE"
        }
    ],
},
query: {
    orderby: "BESTELLINGID",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "bestellingid",
        sql: "BESTELLINGID = ?",
        },
        {
        query: "regelnummer",
        sql: "REGELNUMMER = ?",
        },
        {
        query: "commentaar",
        sql: "COMMENTAAR like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "BESTELLINGID",
        sql: "ifnull(cast(BESTELLINGID as CHAR),'') as BESTELLINGID",
        },
        {
        row: "REGELNUMMER",
        sql: "ifnull(cast(REGELNUMMER as CHAR),'') as REGELNUMMER",
        },
        {
        row: "COMMENTAAR",
        sql: "ifnull(COMMENTAAR,'') as COMMENTAAR",
        }
    ],},
update: {
    fields: [
        {
        body: "BESTELLINGID",
        sql: "BESTELLINGID",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "REGELNUMMER",
        sql: "REGELNUMMER",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "COMMENTAAR",
        sql: "COMMENTAAR = '?'",
        required: false,
        maxLength: 254,
        default: "",
        }
    ],},
}
    
    export class Bestellingcommentaar extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    