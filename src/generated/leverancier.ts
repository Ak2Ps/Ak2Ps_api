
    /* 
    add to router:
    import { Leverancier } from './providers/leverancier';
    private leverancier: Leverancier;
    this.leverancier = new Leverancier();
    this.app.route('/leverancier.php').all((req, res, next) => this.leverancier.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "LEVERANCIER",
key: [
  {
    body:"LEVERANCIERNUMMER",
    sql:"LEVERANCIERNUMMER",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(NAAM)",
    where: [
        {
            query: "value",
            sql: "ucase(NAAM) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "LEVERANCIERNUMMER as ID"
        },
        {
            row: "VALUE",
            sql: "NAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "LEVERANCIERNUMMER",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "leveranciernummer",
        sql: "LEVERANCIERNUMMER like ('%?%')",
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
        query: "categorie",
        sql: "CATEGORIE like ('%?%')",
        },
        {
        query: "contact",
        sql: "CONTACT like ('%?%')",
        },
        {
        query: "land",
        sql: "LAND like ('%?%')",
        },
        {
        query: "leverdagen",
        sql: "LEVERDAGEN = ?",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "LEVERANCIERNUMMER",
        sql: "ifnull(LEVERANCIERNUMMER,'') as LEVERANCIERNUMMER",
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
        row: "CATEGORIE",
        sql: "ifnull(CATEGORIE,'') as CATEGORIE",
        },
        {
        row: "CONTACT",
        sql: "ifnull(CONTACT,'') as CONTACT",
        },
        {
        row: "LAND",
        sql: "ifnull(LAND,'') as LAND",
        },
        {
        row: "LEVERDAGEN",
        sql: "ifnull(cast(LEVERDAGEN as CHAR),'') as LEVERDAGEN",
        }
    ],},
update: {
    fields: [
        {
        body: "LEVERANCIERNUMMER",
        sql: "LEVERANCIERNUMMER = '?'",
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
        body: "CATEGORIE",
        sql: "CATEGORIE = '?'",
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
        body: "LAND",
        sql: "LAND = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "LEVERDAGEN",
        sql: "LEVERDAGEN = '?'",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Leverancier extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    