
    /* 
    add to router:
    import { Retourklant } from './providers/retourklant';
    private retourklant: Retourklant;
    this.retourklant = new Retourklant();
    this.app.route('/retourklant.php').all((req, res, next) => this.retourklant.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "RETOURKLANT",
key: [
  {
    body:"REFERENTIE",
    sql:"REFERENTIE",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(KLANTNUMMER)",
    where: [
        {
            query: "value",
            sql: "ucase(KLANTNUMMER) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "REFERENTIE as ID"
        },
        {
            row: "VALUE",
            sql: "KLANTNUMMER AS VALUE"
        }
    ],
},
query: {
    orderby: "REFERENTIE",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "referentie",
        sql: "REFERENTIE like ('%?%')",
        },
        {
        query: "klantnummer",
        sql: "KLANTNUMMER like ('%?%')",
        },
        {
        query: "naam",
        sql: "NAAM like ('%?%')",
        },
        {
        query: "zoekcode",
        sql: "ZOEKCODE like ('%?%')",
        },
        {
        query: "adres",
        sql: "ADRES like ('%?%')",
        },
        {
        query: "woonplaats",
        sql: "WOONPLAATS like ('%?%')",
        },
        {
        query: "postcode",
        sql: "POSTCODE like ('%?%')",
        },
        {
        query: "land",
        sql: "LAND like ('%?%')",
        },
        {
        query: "telefoon",
        sql: "TELEFOON like ('%?%')",
        },
        {
        query: "fax",
        sql: "FAX like ('%?%')",
        },
        {
        query: "email",
        sql: "EMAIL like ('%?%')",
        },
        {
        query: "aflevernaam",
        sql: "AFLEVERNAAM like ('%?%')",
        },
        {
        query: "afleveradres",
        sql: "AFLEVERADRES like ('%?%')",
        },
        {
        query: "afleverwoonplaats",
        sql: "AFLEVERWOONPLAATS like ('%?%')",
        },
        {
        query: "afleverpostcode",
        sql: "AFLEVERPOSTCODE like ('%?%')",
        },
        {
        query: "afleverland",
        sql: "AFLEVERLAND like ('%?%')",
        },
        {
        query: "afleverdpdnummer",
        sql: "AFLEVERDPDNUMMER like ('%?%')",
        },
        {
        query: "aflevertelefoon",
        sql: "AFLEVERTELEFOON like ('%?%')",
        },
        {
        query: "afleverfax",
        sql: "AFLEVERFAX like ('%?%')",
        },
        {
        query: "afleveremail",
        sql: "AFLEVEREMAIL like ('%?%')",
        },
        {
        query: "contact",
        sql: "CONTACT like ('%?%')",
        },
        {
        query: "opmerking",
        sql: "OPMERKING like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "REFERENTIE",
        sql: "ifnull(REFERENTIE,'') as REFERENTIE",
        },
        {
        row: "KLANTNUMMER",
        sql: "ifnull(KLANTNUMMER,'') as KLANTNUMMER",
        },
        {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM",
        },
        {
        row: "ZOEKCODE",
        sql: "ifnull(ZOEKCODE,'') as ZOEKCODE",
        },
        {
        row: "ADRES",
        sql: "ifnull(ADRES,'') as ADRES",
        },
        {
        row: "WOONPLAATS",
        sql: "ifnull(WOONPLAATS,'') as WOONPLAATS",
        },
        {
        row: "POSTCODE",
        sql: "ifnull(POSTCODE,'') as POSTCODE",
        },
        {
        row: "LAND",
        sql: "ifnull(LAND,'') as LAND",
        },
        {
        row: "TELEFOON",
        sql: "ifnull(TELEFOON,'') as TELEFOON",
        },
        {
        row: "FAX",
        sql: "ifnull(FAX,'') as FAX",
        },
        {
        row: "EMAIL",
        sql: "ifnull(EMAIL,'') as EMAIL",
        },
        {
        row: "AFLEVERNAAM",
        sql: "ifnull(AFLEVERNAAM,'') as AFLEVERNAAM",
        },
        {
        row: "AFLEVERADRES",
        sql: "ifnull(AFLEVERADRES,'') as AFLEVERADRES",
        },
        {
        row: "AFLEVERWOONPLAATS",
        sql: "ifnull(AFLEVERWOONPLAATS,'') as AFLEVERWOONPLAATS",
        },
        {
        row: "AFLEVERPOSTCODE",
        sql: "ifnull(AFLEVERPOSTCODE,'') as AFLEVERPOSTCODE",
        },
        {
        row: "AFLEVERLAND",
        sql: "ifnull(AFLEVERLAND,'') as AFLEVERLAND",
        },
        {
        row: "AFLEVERDPDNUMMER",
        sql: "ifnull(AFLEVERDPDNUMMER,'') as AFLEVERDPDNUMMER",
        },
        {
        row: "AFLEVERTELEFOON",
        sql: "ifnull(AFLEVERTELEFOON,'') as AFLEVERTELEFOON",
        },
        {
        row: "AFLEVERFAX",
        sql: "ifnull(AFLEVERFAX,'') as AFLEVERFAX",
        },
        {
        row: "AFLEVEREMAIL",
        sql: "ifnull(AFLEVEREMAIL,'') as AFLEVEREMAIL",
        },
        {
        row: "CONTACT",
        sql: "ifnull(CONTACT,'') as CONTACT",
        },
        {
        row: "OPMERKING",
        sql: "ifnull(OPMERKING,'') as OPMERKING",
        }
    ],},
update: {
    fields: [
        {
        body: "REFERENTIE",
        sql: "REFERENTIE = '?'",
        required: false,
        maxLength: 50,
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
        body: "NAAM",
        sql: "NAAM = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "ZOEKCODE",
        sql: "ZOEKCODE = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "ADRES",
        sql: "ADRES = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "WOONPLAATS",
        sql: "WOONPLAATS = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "POSTCODE",
        sql: "POSTCODE = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "LAND",
        sql: "LAND = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "TELEFOON",
        sql: "TELEFOON = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "FAX",
        sql: "FAX = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "EMAIL",
        sql: "EMAIL = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "AFLEVERNAAM",
        sql: "AFLEVERNAAM = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "AFLEVERADRES",
        sql: "AFLEVERADRES = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "AFLEVERWOONPLAATS",
        sql: "AFLEVERWOONPLAATS = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "AFLEVERPOSTCODE",
        sql: "AFLEVERPOSTCODE = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "AFLEVERLAND",
        sql: "AFLEVERLAND = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "AFLEVERDPDNUMMER",
        sql: "AFLEVERDPDNUMMER = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "AFLEVERTELEFOON",
        sql: "AFLEVERTELEFOON = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "AFLEVERFAX",
        sql: "AFLEVERFAX = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "AFLEVEREMAIL",
        sql: "AFLEVEREMAIL = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "CONTACT",
        sql: "CONTACT = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "OPMERKING",
        sql: "OPMERKING = '?'",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Retourklant extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    