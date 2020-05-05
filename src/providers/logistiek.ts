
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "logistiek",
    key: [
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "",
        where: [
        ],
        fields: [
        ],
    },
    query: {
        orderby: "",
        where: [
        ],
        fields: [
        ],
    },
    update: {
        fields: [
        ],
    },
}

export class Logistiek extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let productnummer = db.fix(req.query.productnummer || '');
        let lijn = db.fix(req.query.lijn || '');
        let datum = db.fix(req.query.datum || '');
        if (datum == '') {
            datum = '01-01-1880';
        }
        let selR = db.fix(req.query.selr || '');
        //
        res.crudConnection = await db.waitConnection();
        //
        let where = ''
        let sql = `
select * 
from (
select
BASE.* from (
select 
BEWERKINGFLOW.id as id,
BEWERKINGFLOW.Bewerkingsnummer as bewerkingsnummer,
BEWERKING.Productnummer as productnummer,
if ((select max(lijn) from BEWERKINGFLOW lijnbwf where lijnbwf.bewerkingsnummer = BEWERKING.bewerkingsnummer and lijnbwf.volgnummer = BEWERKINGFLOW.volgnummer) is not null,
    (select max(lijn) from BEWERKINGFLOW lijnbwf where lijnbwf.bewerkingsnummer = BEWERKING.bewerkingsnummer and lijnbwf.volgnummer = BEWERKINGFLOW.volgnummer),
    if ((select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer) is not null,
        (select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer),
        if ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)) is not null,
            (select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)),
            if ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer) is not null,
                (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer),
                null
            )
        )
    )
) as lijn,
(select min(naam) from BEWERKINGSOORT 
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) 
as bewerkingsoort,
(select min(kleur) from BEWERKINGSOORT 
where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) 
as kleur,
(select min(layout) from BEWERKINGSOORT 
where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) 
as layout,
Volgnummer,
Bewerkingaantal,
BEWERKINGFLOW.startdatumtijd as startdatumtijd,
BEWERKING.startdatumtijd as bwstartdatumtijd,
BEWERKINGFLOW.einddatumtijd as einddatumtijd,
BEWERKINGFLOW.plandatumtijd as plandatumtijd,
date2screendate(BEWERKING.startdatumtijd) as START,
date2screendate(BEWERKINGFLOW.startdatumtijd) as STARTDATUM,
geprint,
date2screendate(BEWERKINGFLOW.plandatumtijd) as PLANDATUM,
date2screendate(BEWERKINGFLOW.einddatumtijd) as EINDDATUM
from BEWERKING,BEWERKINGFLOW
where BEWERKING.bewerkingsnummer = BEWERKINGFLOW.bewerkingsnummer
and BEWERKING.einddatumtijd is null
and BEWERKINGFLOW.einddatumtijd is null
and (BEWERKING.startdatumtijd is null or BEWERKING.startdatumtijd >= screendate2date('${datum}'))`;
        //
        if (productnummer != '') {
            sql += `
and BEWERKING.productnummer like ('${productnummer}%')`;
        }
        if (selR == 'Nee') {
            sql += `
and BEWERKING.bewerkingsnummer not like 'R%'`;
        }
        if (selR == 'Ja') {
            sql += `
and BEWERKING.bewerkingsnummer like 'R%'`;
        }
        //
        sql += `
) BASE) BASE2`;
        //
        where = `
where layout = 'rapBEWERKINGFLOWPICK.php'`;
        if (lijn != '') {
            if (where == '') {
                where += '\nwhere ';
            } else {
                where += '\nand ';
            }
            where += `lijn = '${lijn}'`;
        }
        sql += `
${where}
order by Startdatumtijd,Bewerkingsnummer,volgnummer`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        res.crudConnection = await db.waitConnection();
        //
        let startdatum = db.fix(req.body.STARTDATUM || '');
        let lijn = db.fix(req.body.LIJN || '');
        let geprint = db.fix(req.body.GEPRINT || '');
        let id = db.fix(db.getDataId(req));
        let sql = `
update BEWERKINGFLOW set
startdatumtijd = screendate2date('${startdatum}'),
lijn = '${lijn}',
Geprint = '${geprint}'
where id = '${id}'`;
        //
        await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(req.body);
        return;
    }

    public async routes(req: Request, res: Response, next: NextFunction) {
        //
        let method = req.method;
        let action = db.fix(req.query.action||'');
        //
        Logger.request(req);
        //
        if (action == "select") {
            Util.unknownOperation(req, res, next);
        } else if (method == "GET") {
            this.doQuery(req, res, next, this.dict);
        } else if (method == "PUT") {
            this.doUpdate(req, res, next, this.dict);
        } else if (method == "POST") {
            Util.unknownOperation(req, res, next);
        } else if (method == "DELETE") {
            Util.unknownOperation(req, res, next);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
