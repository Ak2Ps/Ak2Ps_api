
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
            body: "ID",
            sql: "ID",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ordernummer",
        where: [
            {
                query: "value",
                sql: "ucase(ORDERNUMMER) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ORDERNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "REFERENTIE AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTNUMMER,ORDERNUMMER,REGELNUMMER",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "ordernummer",
                sql: "ORDERNUMMER = '?'",
            },
            {
                query: "regelnummer",
                sql: "ucase(REGELNUMMER) like ucase('%?%')",
            },
            {
                query: "orderreferentie",
                sql: "ucase(ORDERREFERENTIE) like ucase('%?%')",
            },
            {
                query: "orderdatumtijd",
                sql: "ORDERDATUMTIJD > screendate2date('?')",
            },
            {
                query: "productnummer",
                sql: "ucase(PRODUCTNUMMER) like ucase('?%')",
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
                query: "klant",
                sql: "KLANTNUMMER = '?'",
            },
            {
                query: "klantnaam",
                sql: "ucase(KLANTNAAM) like ucase('%?%')",
            },
            {
                query: "einddatumtijd",
                sql: "EINDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "opmerking",
                sql: "ucase(OPMERKING) like ucase('%?%')",
            },
            {
                query: "vraagdatumtijd",
                sql: "VRAAGDATUMTIJD > screendate2date('?')",
            },
            {
                query: "productgroep",
                sql: "PRODUCTNUMMER in (select productnummer from PRODUCTGROEPREGEL where productgroep = '?')",
            },
            {
                query: "sel44",
                sql: `(
case when '?' = 'Ja' then
initvraagdatumtijd >= screendate2date('01-01-2044')
and initvraagdatumtijd <= screendate2date('31-12-2044')
when '?' = 'Nee' then
initvraagdatumtijd < screendate2date('01-01-2044')
or initvraagdatumtijd > screendate2date('31-12-2044')
else true end)`,
            },
            {
                query: "sel44plus",
                sql: `(
case 
when '?' = 'Nee' then
initvraagdatumtijd < screendate2date('01-01-2044')
when '?' = 'Ja' then
initvraagdatumtijd >= screendate2date('01-01-2044')
when '?' = 'Alle' then
true
else 
initvraagdatumtijd >= screendate2date('01-01-20?')
and initvraagdatumtijd <= screendate2date('31-12-20?')
end)`,
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
                row: "VRAAG",
                sql: "ifnull(cast(VRAAG as CHAR),'') as VRAAG",
            },
            {
                row: "VRAAGDATUM",
                sql: "date2screendate(VRAAGDATUMTIJD) as VRAAGDATUM",
            },
            {
                row: "INITVRAAGDATUM",
                sql: "date2screendate(INITVRAAGDATUMTIJD) as INITVRAAGDATUM",
            },
            {
                row: "ACCEPTDATUM",
                sql: "date2screendate(ACCEPTDATUMTIJD) as ACCEPTDATUM",
            },
            {
                row: "ORDERDATUM",
                sql: "date2screendate(ORDERDATUMTIJD) as ORDERDATUM",
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
            //{
            //    row: "INITVRAAG",
            //    sql: "ifnull(cast(INITVRAAG as CHAR),'') as INITVRAAG",
            //},
            //{
            //    row: "EINDDATUMTIJD",
            //    sql: "date2jsondate(EINDDATUMTIJD) as EINDDATUMTIJD",
            //},
            //{
            //    row: "OPMERKING",
            //    sql: "ifnull(OPMERKING,'') as OPMERKING",
            //},
            {
                row: "VRAAG_OMS",
                sql: "ifnull((select OPMERKING from VRAAG where VRAAG.ordernummer = PRODUCTVRAAG.ordernummer),'') as VRAAG_OMS",
            },
            {
                row: "PRODUCT_OMS",
                sql: "ifnull((select Productnaam from PRODUCT where PRODUCTVRAAG.productnummer = PRODUCT.productnummer),'') as PRODUCT_OMS",
            },
        ],
    },
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
                body: "VRAAGDATUM",
                sql: "VRAAGDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "ORDERDATUM",
                sql: "ORDERDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "INITVRAAGDATUM",
                sql: "INITVRAAGDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "ACCEPTDATUM",
                sql: "ACCEPTDATUMTIJD = screendate2date('?')",
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
            //{
            //    body: "INITVRAAG",
            //    sql: "INITVRAAG = '?'",
            //    required: false,
            //    maxLength: 10,
            //    default: "",
            //},
            //{
            //    body: "EINDDATUMTIJD",
            //    sql: "EINDDATUMTIJD = screendate2date('?')",
            //    required: false,
            //    maxLength: 10,
            //    default: "",
            //},
            //{
            //    body: "OPMERKING",
            //    sql: "OPMERKING = '?'",
            //    required: false,
            //    maxLength: 10,
            //    default: "",
            //},
        ],
    },
}

export class Productvraag extends Crud {
    constructor() {
        super(
            dict
        )
    }
}
