
    /* 
    add to router:
    import { Bestellingpick } from './providers/bestellingpick';
    private bestellingpick: Bestellingpick;
    this.bestellingpick = new Bestellingpick();
    this.app.route('/bestellingpick.php').all((req, res, next) => this.bestellingpick.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "BESTELLINGPICK",
key: [
  {
    body:"BESTELNUMMER",
    sql:"BESTELNUMMER",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(BESTELREGEL)",
    where: [
        {
            query: "value",
            sql: "ucase(BESTELREGEL) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "BESTELNUMMER as ID"
        },
        {
            row: "VALUE",
            sql: "BESTELREGEL AS VALUE"
        }
    ],
},
query: {
    orderby: "BESTELNUMMER",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "bestelnummer",
        sql: "BESTELNUMMER like ('%?%')",
        },
        {
        query: "bestelregel",
        sql: "BESTELREGEL like ('%?%')",
        },
        {
        query: "status",
        sql: "STATUS like ('%?%')",
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
        query: "bestelling",
        sql: "BESTELLING = ?",
        },
        {
        query: "faktor",
        sql: "FAKTOR = ?",
        },
        {
        query: "gepickeddatumtijd",
        sql: "GEPICKEDDATUMTIJD > screendate2date('?')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "BESTELNUMMER",
        sql: "ifnull(BESTELNUMMER,'') as BESTELNUMMER",
        },
        {
        row: "BESTELREGEL",
        sql: "ifnull(BESTELREGEL,'') as BESTELREGEL",
        },
        {
        row: "STATUS",
        sql: "ifnull(STATUS,'') as STATUS",
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
        row: "BESTELLING",
        sql: "ifnull(cast(BESTELLING as CHAR),'') as BESTELLING",
        },
        {
        row: "FAKTOR",
        sql: "ifnull(cast(FAKTOR as CHAR),'') as FAKTOR",
        },
        {
        row: "GEPICKEDDATUMTIJD",
        sql: "date2jsondate(GEPICKEDDATUMTIJD) as GEPICKEDDATUMTIJD",
        }
    ],},
update: {
    fields: [
        {
        body: "BESTELNUMMER",
        sql: "BESTELNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "BESTELREGEL",
        sql: "BESTELREGEL = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "STATUS",
        sql: "STATUS = '?'",
        required: false,
        maxLength: 3,
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
        body: "ONDERDEELNUMMER",
        sql: "ONDERDEELNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "BESTELLING",
        sql: "BESTELLING = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "FAKTOR",
        sql: "FAKTOR = '?'",
        required: false,
        maxLength: 17,
        default: "",
        },
        {
        body: "GEPICKEDDATUMTIJD",
        sql: "GEPICKEDDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Bestellingpick extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    