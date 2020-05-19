
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "BEWERKINGTIJD",
    key: [
        {
            body: "BEWERKINGSNUMMER",
            sql: "BEWERKINGSNUMMER",
        },
        {
            body: "PRODUCTNUMMER",
            sql: "PRODUCTNUMMER",
        },
        {
            body: "BEWERKINGFLOWID",
            sql: "BEWERKINGFLOWID",
        },
        {
            body: "STARTDATUMTIJD",
            sql: "STARTDATUMTIJD",
        },
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "BEWERKINGSNUMMER",
        where: [
            {
                query: "value",
                sql: "ucase(BEWERKINGSNUMMER) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "BEWERKINGSNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "Gebruiker,startdatumtijd,bewerkingsnummer",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "open",
                sql: "case when '?' = '1' then tijd = 0 else true end",
            },
            {
                query: "bewerkingsnummer",
                sql: "ucase(BEWERKINGSNUMMER) like ucase('%?%')",
            },
            {
                query: "productnummer",
                sql: "ucase(PRODUCTNUMMER) like ucase('%?%')",
            },
            {
                query: "bewerkingflowid",
                sql: "BEWERKINGFLOWID = ?",
            },
            {
                query: "afdeling",
                sql: "ucase(AFDELING) like ucase('%?%')",
            },
            {
                query: "gebruiker",
                sql: "GEBRUIKER = '?'",
            },
            {
                query: "bewerkingsoort",
                sql: "ucase(BEWERKINGSOORT) like ucase('%?%')",
            },
            {
                query: "startdatumtijd",
                sql: "STARTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "einddatumtijd",
                sql: "EINDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "aantalgemaakt",
                sql: "AANTALGEMAAKT = ?",
            },
            {
                query: "aantaluitval",
                sql: "ucase(AANTALUITVAL) like ucase('%?%')",
            },
            {
                query: "tijd",
                sql: "TIJD = ?",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "BEWERKINGSNUMMER",
                sql: "ifnull(BEWERKINGSNUMMER,'') as BEWERKINGSNUMMER",
            },
            {
                row: "BEWERKINGFLOWID",
                sql: "ifnull(cast(BEWERKINGFLOWID as CHAR),'') as BEWERKINGFLOWID",
            },
            {
                row: "GEBRUIKER",
                sql: "(select min(naam) from GEBRUIKER where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) as GEBRUIKER",
            },
            {
                row: "STARTDATUMTIJD",
                sql: "date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD",
            },
            {
                row: "EINDDATUMTIJD",
                sql: "date2jsondate(EINDDATUMTIJD) as EINDDATUMTIJD",
            },
            {
                row: "DATUM",
                sql: "date2screendate(STARTDATUMTIJD) as DATUM",
            },
            {
                row: "START",
                sql: "date2screentime(STARTDATUMTIJD) as START",
            },
            {
                row: "EIND",
                sql: "date2screentime(EINDDATUMTIJD) as EIND",
            },
            {
                row: "BON",
                sql: `(
select concat(bewerkingsnummer,'-',volgnummer)
from BEWERKINGFLOW
where BEWERKINGFLOW.id = BEWERKINGTIJD.bewerkingflowid) as BON`
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "PRODUCTNUMMERX",
                sql: `(
select productnummer from BEWERKING
where BEWERKING.bewerkingsnummer = BEWERKINGTIJD.bewerkingsnummer)
as PRODUCTNUMMERX`,
            },
            {
                row: "BEWERKINGSOORT",
                sql: `
(select naam from BEWERKINGSOORT,BEWERKINGFLOW
where BEWERKINGFLOW.id = BEWERKINGTIJD.bewerkingflowid
and BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) as BEWERKINGSOORT
`
            },
            {
                row: "TIJD",
                sql: "ifnull(cast(TIJD as CHAR),'') as TIJD",
            },
            //{
            //    row: "AFDELING",
            //    sql: "ifnull(AFDELING,'') as AFDELING",
            //},
            //{
            //    row: "AANTALGEMAAKT",
            //    sql: "ifnull(cast(AANTALGEMAAKT as CHAR),'') as AANTALGEMAAKT",
            //},
            //{
            //    row: "AANTALUITVAL",
            //    sql: "ifnull(AANTALUITVAL,'') as AANTALUITVAL",
            //},
        ],
    },
    update: {
        fields: [
            {
                body: "BEWERKINGSNUMMER",
                sql: "BEWERKINGSNUMMER = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "BEWERKINGFLOWID",
                sql: "BEWERKINGFLOWID",
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
            //{
            //    body: "AFDELING",
            //    sql: "AFDELING = '?'",
            //    required: false,
            //    maxLength: 3,
            //    default: "",
            //},
            //{
            //    body: "GEBRUIKER",
            //    sql: "GEBRUIKER = '?'",
            //    required: false,
            //    maxLength: 255,
            //    default: "",
            //},
            //{
            //    body: "BEWERKINGSOORT",
            //    sql: "BEWERKINGSOORT = '?'",
            //    required: false,
            //    maxLength: 1,
            //    default: "",
            //},
            //{
            //    body: "STARTDATUMTIJD",
            //    sql: "STARTDATUMTIJD = screendate2date('?')",
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
            //    body: "AANTALGEMAAKT",
            //    sql: "AANTALGEMAAKT = '?'",
            //    required: false,
            //    maxLength: 10,
            //    default: "",
            //},
            //{
            //    body: "AANTALUITVAL",
            //    sql: "AANTALUITVAL = '?'",
            //    required: false,
            //    maxLength: 10,
            //    default: "",
            //},
            //{
            //    body: "TIJD",
            //    sql: "TIJD = '?'",
            //    required: false,
            //    maxLength: 10,
            //    default: "",
            //}
        ],
    },
}

export class Gebruikertijd extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected addWhere(req: Request, res: Response, next: NextFunction, where: any): string {
        let result = super.addWhere(req, res, next, where);
        if (req.query.year && req.query.month && req.query.day) {
            let screendate = `${db.fix(req.query.day)}-${db.fix(req.query.month)}-${db.fix(req.query.year)}`;
            if (result == "") {
                result += "\nwhere ";
            } else {
                result += "\nand ";
            }
            result += `date2screendate(startdatumtijd) = '${screendate}'`;
        }
        return result;
    }


    protected async doAfterUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let result = true;
        let sqlgebruiker: string;
        let startdatumtijd = req.body.DATUM + " " + req.body.START;
        let einddatumtijd = req.body.DATUM + " " + req.body.EIND;
        if (req.body.GEBRUIKER) {
            sqlgebruiker = `
gebruiker = (select min(gebruiker) from GEBRUIKER where naam = '${db.fix(req.body.GEBRUIKER)}')`;
        } else {
            sqlgebruiker = `
gebruiker = '${db.fix(req.ak2_user)}'`;
        }
        let sql = `
update BEWERKINGTIJD set
${sqlgebruiker},
startdatumtijd = screendatetime2date('${startdatumtijd}'),
einddatumtijd = screendatetime2date('${einddatumtijd}'),
tijd = '${db.fix(req.body.TIJD)}'
where id = ${db.fix(req.body.ID)}`;
        res.crudResult = await db.waitQuery(res.crudConnection, sql);
        sql = `
update BEWERKINGTIJD set
tijd = TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)
where id = ${db.fix(req.body.ID)}`;
        res.crudResult = await db.waitQuery(res.crudConnection, sql);
        return (result);
    }


}
