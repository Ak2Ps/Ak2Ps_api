
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "BESTELLING",
    key: [
        {
            body: "LEVERANCIERNUMMER",
            sql: "LEVERANCIERNUMMER",
        },
        {
            body: "BESTELNUMMER",
            sql: "BESTELNUMMER",
        },
        {
            body: "REGELNUMMER",
            sql: "REGELNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "PRODUCTNUMMER",
        where: [
            {
                query: "value",
                sql: "PRODUCTNUMMER like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "leveranciernummer,bestelnummer,productnummer,startdatumtijd",
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
                query: "lijststatus",
                sql: "LIJSTSTATUS like ('%?%')",
            },
            {
                query: "startdatumtijd",
                sql: "STARTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('?%')",
            },
            {
                query: "bestelling",
                sql: "BESTELLING = ?",
            },
            {
                query: "sel_vanaf",
                sql: "BESTELDATUMTIJD >= screendate2date('?')",
            },
            {
                query: "sel_tm",
                sql: "BESTELDATUMTIJD <= screendate2date('?')",
            },
            {
                query: "leveranciernummer",
                sql: "LEVERANCIERNUMMER = '?'",
            },
            {
                query: "leveranciernaam",
                sql: "LEVERANCIERNAAM like ('%?%')",
            },
            {
                query: "leverancierproductnummer",
                sql: "LEVERANCIERPRODUCTNUMMER like ('%?%')",
            },
            {
                query: "bestelnummer",
                sql: "BESTELNUMMER = '?'",
            },
            {
                query: "regelnummer",
                sql: "REGELNUMMER like ('%?%')",
            },
            {
                query: "geprintdatumtijd",
                sql: "GEPRINTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "gepickeddatumtijd",
                sql: "GEPICKEDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "verzondendatumtijd",
                sql: "VERZONDENDATUMTIJD > screendate2date('?')",
            },
            {
                query: "ontvangendatumtijd",
                sql: "ONTVANGENDATUMTIJD > screendate2date('?')",
            },
            {
                query: "contactpersoon",
                sql: "CONTACTPERSOON like ('%?%')",
            },
            {
                query: "inkoopprijs",
                sql: "INKOOPPRIJS = ?",
            },
            {
                query: "opmerking",
                sql: "OPMERKING like ('%?%')",
            }
        ],
        fields: [
        ],
    },
    update: {
        fields: [
        ],
    },
}

export class Bestellingkop extends Crud {
    constructor() {
        super(
            dict
        )
    }


    protected createQuerySql(req: Request, res: Response, next: NextFunction, options?: Dict): string {
        let sql = `
select *,
date2screendate(startdatumtijd) as STARTDATUM,
case when producten <= 1 then productnummer else '...' end as PRODUCTNUMMER,
case when besteldatumtijden <= 1 then date2screendate(besteldatumtijd) else '...' end as BESTELDATUM,
date2screendate(geprintdatumtijd) as GEPRINTDATUM,
case when geprintdatumtijd is null then NULL else 1 end as GEPRINT,
date2screendate(gepickeddatumtijd) as GEPICKEDDATUM,
case when gepickeddatumtijd is null then NULL else 1 end as GEPICKED,
date2screendate(verzondendatumtijd) as VERZONDENDATUM,
case when verzondendatumtijd is null then NULL else 1 end as VERZONDEN,
date2screendate(ontvangendatumtijd) as ONTVANGENDATUM,
case when ontvangendatumtijd is null then NULL else 1 end as ONTVANGEN,
(select Zoekcode from LEVERANCIER 
where LEVERANCIER.leveranciernummer = BASE.leveranciernummer) as ZOEKKODE,
(select naam from LEVERANCIER 
where LEVERANCIER.leveranciernummer = BASE.leveranciernummer) as LEVERANCIERNAAM
from (
select bestelnummer,
bestelnummer as ID,
min(startdatumtijd) as startdatumtijd,
min(besteldatumtijd) as besteldatumtijd,
count(distinct(besteldatumtijd)) as besteldatumtijden,
min(geprintdatumtijd) as geprintdatumtijd,
min(gepickeddatumtijd) as gepickeddatumtijd,
min(verzondendatumtijd) as verzondendatumtijd,
min(ontvangendatumtijd) as ontvangendatumtijd,
min(productnummer) as productnummer,
count(distinct(productnummer)) as producten,
sum(bestelling) as bestelling,
min(leveranciernummer) as leveranciernummer
from BESTELLING group by bestelnummer) BASE
`;
        sql += this.addWhere(req, res, next, options?.query?.where);
        if (req.query.geprint == 'Nee') {
            sql += ` having geprint is null`;
        } else if (req.query.geprint == 'Ja') {
            sql += ` having geprint = 1`;
        }
        sql += this.addOrderby(req, res, next, options?.query?.orderby);
        return sql;
    }


    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let sql: any;
        let rows: any;
        //
        res.crudConnection = await db.waitConnection();
        let bestelnummer = db.getDataId(req);
        if (Number(req.body.GEPRINT) == 1) {
            sql = `
update BESTELLING set 
geprintdatumtijd = sysdate() 
where geprintdatumtijd is null 
and bestelnummer = '${bestelnummer}'`;
        } else {
            sql = `
update BESTELLING 
set geprintdatumtijd = null 
where geprintdatumtijd is not null 
and bestelnummer = '${bestelnummer}'`;
        }
        rows = await db.waitQuery(res.crudConnection, sql);
        //
        res.crudConnection.release();
        res.status(200).send(req.body);
        return;
    }
}
