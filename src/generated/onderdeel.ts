
    /* 
    add to router:
    import { Onderdeel } from './providers/onderdeel';
    private onderdeel: Onderdeel;
    this.onderdeel = new Onderdeel();
    this.app.route('/onderdeel.php').all((req, res, next) => this.onderdeel.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "ONDERDEEL",
key: [
  {
    body:"PRODUCTNUMMER",
    sql:"PRODUCTNUMMER",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(ONDERDEELNUMMER)",
    where: [
        {
            query: "value",
            sql: "ucase(ONDERDEELNUMMER) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "PRODUCTNUMMER as ID"
        },
        {
            row: "VALUE",
            sql: "ONDERDEELNUMMER AS VALUE"
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
        query: "onderdeelnummer",
        sql: "ONDERDEELNUMMER like ('%?%')",
        },
        {
        query: "faktor",
        sql: "FAKTOR = ?",
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
        row: "ONDERDEELNUMMER",
        sql: "ifnull(ONDERDEELNUMMER,'') as ONDERDEELNUMMER",
        },
        {
        row: "FAKTOR",
        sql: "ifnull(cast(FAKTOR as CHAR),'') as FAKTOR",
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
        body: "ONDERDEELNUMMER",
        sql: "ONDERDEELNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "FAKTOR",
        sql: "FAKTOR = '?'",
        required: false,
        maxLength: 17,
        default: "",
        }
    ],},
}
    
    export class Onderdeel extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    