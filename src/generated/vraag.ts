
    /* 
    add to router:
    import { Vraag } from './providers/vraag';
    private vraag: Vraag;
    this.vraag = new Vraag();
    this.app.route('/vraag.php').all((req, res, next) => this.vraag.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "VRAAG",
key: [
  {
    body:"STATUS",
    sql:"STATUS",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(GEPRINT)",
    where: [
        {
            query: "value",
            sql: "ucase(GEPRINT) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "STATUS as ID"
        },
        {
            row: "VALUE",
            sql: "GEPRINT AS VALUE"
        }
    ],
},
query: {
    orderby: "STATUS",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "status",
        sql: "STATUS like ('%?%')",
        },
        {
        query: "geprint",
        sql: "GEPRINT like ('%?%')",
        },
        {
        query: "ordernummer",
        sql: "ORDERNUMMER like ('%?%')",
        },
        {
        query: "orderreferentie",
        sql: "ORDERREFERENTIE like ('%?%')",
        },
        {
        query: "initvraagdatumtijd",
        sql: "INITVRAAGDATUMTIJD > screendate2date('?')",
        },
        {
        query: "vraagdatumtijd",
        sql: "VRAAGDATUMTIJD > screendate2date('?')",
        },
        {
        query: "klantnummer",
        sql: "KLANTNUMMER like ('%?%')",
        },
        {
        query: "klantnaam",
        sql: "KLANTNAAM like ('%?%')",
        },
        {
        query: "einddatumtijd",
        sql: "EINDDATUMTIJD > screendate2date('?')",
        },
        {
        query: "opmerking",
        sql: "OPMERKING like ('%?%')",
        },
        {
        query: "opmerking2",
        sql: "OPMERKING2 like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "STATUS",
        sql: "ifnull(STATUS,'') as STATUS",
        },
        {
        row: "GEPRINT",
        sql: "ifnull(GEPRINT,'') as GEPRINT",
        },
        {
        row: "ORDERNUMMER",
        sql: "ifnull(ORDERNUMMER,'') as ORDERNUMMER",
        },
        {
        row: "ORDERREFERENTIE",
        sql: "ifnull(ORDERREFERENTIE,'') as ORDERREFERENTIE",
        },
        {
        row: "INITVRAAGDATUMTIJD",
        sql: "date2jsondate(INITVRAAGDATUMTIJD) as INITVRAAGDATUMTIJD",
        },
        {
        row: "VRAAGDATUMTIJD",
        sql: "date2jsondate(VRAAGDATUMTIJD) as VRAAGDATUMTIJD",
        },
        {
        row: "KLANTNUMMER",
        sql: "ifnull(KLANTNUMMER,'') as KLANTNUMMER",
        },
        {
        row: "KLANTNAAM",
        sql: "ifnull(KLANTNAAM,'') as KLANTNAAM",
        },
        {
        row: "EINDDATUMTIJD",
        sql: "date2jsondate(EINDDATUMTIJD) as EINDDATUMTIJD",
        },
        {
        row: "OPMERKING",
        sql: "ifnull(OPMERKING,'') as OPMERKING",
        },
        {
        row: "OPMERKING2",
        sql: "ifnull(OPMERKING2,'') as OPMERKING2",
        }
    ],},
update: {
    fields: [
        {
        body: "STATUS",
        sql: "STATUS = '?'",
        required: false,
        maxLength: 3,
        default: "",
        },
        {
        body: "GEPRINT",
        sql: "GEPRINT = '?'",
        required: false,
        maxLength: 1,
        default: "",
        },
        {
        body: "ORDERNUMMER",
        sql: "ORDERNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "ORDERREFERENTIE",
        sql: "ORDERREFERENTIE = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "INITVRAAGDATUMTIJD",
        sql: "INITVRAAGDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "VRAAGDATUMTIJD",
        sql: "VRAAGDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "KLANTNUMMER",
        sql: "KLANTNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "KLANTNAAM",
        sql: "KLANTNAAM = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "EINDDATUMTIJD",
        sql: "EINDDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "OPMERKING",
        sql: "OPMERKING = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "OPMERKING2",
        sql: "OPMERKING2 = '?'",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Vraag extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    