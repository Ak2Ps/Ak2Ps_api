
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
  },
  {
    body:"ONDERDEELNUMMER",
    sql:"ONDERDEELNUMMER",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(PRODUCTNUMMER), ucase(ONDERDEELNUMMER)",
    where: [
        {
            query: "value",
            sql: "ucase(PRODUCTNUMMER) like ucase('%?%')",
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
    orderby: "PRODUCTNUMMER,ONDERDEELNUMMER",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "productnummer",
        sql: "ucase(PRODUCTNUMMER) like ucase('?%')",
        },
        {
        query: "onderdeelnummer",
        sql: "ucase(ONDERDEELNUMMER) like ucase('%?%')",
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
    