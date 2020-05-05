
    /* 
    add to router:
    import { Productvraag } from './providers/productvraag';
    private productvraag: Productvraag;
    this.productvraag = new Productvraag();
    this.app.route('/productvraag.php').all((req, res, next) => this.productvraag.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PRODUCTVRAAG",
key: [
  {
    body:"ORDERNUMMER",
    sql:"ORDERNUMMER",
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
            sql: "ORDERNUMMER as ID"
        },
        {
            row: "VALUE",
            sql: "REGELNUMMER AS VALUE"
        }
    ],
},
query: {
    orderby: "ORDERNUMMER",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "ordernummer",
        sql: "ORDERNUMMER like ('%?%')",
        },
        {
        query: "regelnummer",
        sql: "REGELNUMMER like ('%?%')",
        },
        {
        query: "orderreferentie",
        sql: "ORDERREFERENTIE like ('%?%')",
        },
        {
        query: "orderdatumtijd",
        sql: "ORDERDATUMTIJD > screendate2date('?')",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        },
        {
        query: "initvraag",
        sql: "INITVRAAG = ?",
        },
        {
        query: "vraag",
        sql: "VRAAG = ?",
        },
        {
        query: "initvraagdatumtijd",
        sql: "INITVRAAGDATUMTIJD > screendate2date('?')",
        },
        {
        query: "acceptdatumtijd",
        sql: "ACCEPTDATUMTIJD > screendate2date('?')",
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
        query: "vraagdatumtijd",
        sql: "VRAAGDATUMTIJD > screendate2date('?')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "ORDERNUMMER",
        sql: "ifnull(ORDERNUMMER,'') as ORDERNUMMER",
        },
        {
        row: "REGELNUMMER",
        sql: "ifnull(REGELNUMMER,'') as REGELNUMMER",
        },
        {
        row: "ORDERREFERENTIE",
        sql: "ifnull(ORDERREFERENTIE,'') as ORDERREFERENTIE",
        },
        {
        row: "ORDERDATUMTIJD",
        sql: "date2jsondate(ORDERDATUMTIJD) as ORDERDATUMTIJD",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        },
        {
        row: "INITVRAAG",
        sql: "ifnull(cast(INITVRAAG as CHAR),'') as INITVRAAG",
        },
        {
        row: "VRAAG",
        sql: "ifnull(cast(VRAAG as CHAR),'') as VRAAG",
        },
        {
        row: "INITVRAAGDATUMTIJD",
        sql: "date2jsondate(INITVRAAGDATUMTIJD) as INITVRAAGDATUMTIJD",
        },
        {
        row: "ACCEPTDATUMTIJD",
        sql: "date2jsondate(ACCEPTDATUMTIJD) as ACCEPTDATUMTIJD",
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
        row: "VRAAGDATUMTIJD",
        sql: "date2jsondate(VRAAGDATUMTIJD) as VRAAGDATUMTIJD",
        }
    ],},
update: {
    fields: [
        {
        body: "ORDERNUMMER",
        sql: "ORDERNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "REGELNUMMER",
        sql: "REGELNUMMER = '?'",
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
        body: "ORDERDATUMTIJD",
        sql: "ORDERDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
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
        body: "INITVRAAG",
        sql: "INITVRAAG = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "VRAAG",
        sql: "VRAAG = '?'",
        required: false,
        maxLength: 10,
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
        body: "ACCEPTDATUMTIJD",
        sql: "ACCEPTDATUMTIJD = screendate2date('?')",
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
        body: "VRAAGDATUMTIJD",
        sql: "VRAAGDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Productvraag extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    