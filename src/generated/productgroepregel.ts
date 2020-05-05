
    /* 
    add to router:
    import { Productgroepregel } from './providers/productgroepregel';
    private productgroepregel: Productgroepregel;
    this.productgroepregel = new Productgroepregel();
    this.app.route('/productgroepregel.php').all((req, res, next) => this.productgroepregel.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PRODUCTGROEPREGEL",
key: [
  {
    body:"PRODUCTGROEP",
    sql:"PRODUCTGROEP",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(PRODUCTNUMMER)",
    where: [
        {
            query: "value",
            sql: "ucase(PRODUCTNUMMER) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "PRODUCTGROEP as ID"
        },
        {
            row: "VALUE",
            sql: "PRODUCTNUMMER AS VALUE"
        }
    ],
},
query: {
    orderby: "PRODUCTGROEP",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "productgroep",
        sql: "PRODUCTGROEP like ('%?%')",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        },
        {
        query: "isonderdeel",
        sql: "ISONDERDEEL like ('%?%')",
        },
        {
        query: "volgnummer",
        sql: "VOLGNUMMER = ?",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "PRODUCTGROEP",
        sql: "ifnull(PRODUCTGROEP,'') as PRODUCTGROEP",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        },
        {
        row: "ISONDERDEEL",
        sql: "ifnull(ISONDERDEEL,'') as ISONDERDEEL",
        },
        {
        row: "VOLGNUMMER",
        sql: "ifnull(cast(VOLGNUMMER as CHAR),'') as VOLGNUMMER",
        }
    ],},
update: {
    fields: [
        {
        body: "PRODUCTGROEP",
        sql: "PRODUCTGROEP = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "PRODUCTNUMMER",
        sql: "PRODUCTNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "ISONDERDEEL",
        sql: "ISONDERDEEL = '?'",
        required: false,
        maxLength: 1,
        default: "",
        },
        {
        body: "VOLGNUMMER",
        sql: "VOLGNUMMER",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Productgroepregel extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    