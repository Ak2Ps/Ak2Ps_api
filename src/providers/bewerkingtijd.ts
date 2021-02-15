
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "bewerkingtijd",
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

export class Bewerkingtijd extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let bewerkingsnummer = db.fix(req.query.bewerkingsnummer || '');
        let bewerkingflowid = db.fix(req.query.bewerkingflowid || '');
        let where = '';
        //
        res.crudConnection = await db.waitConnection();
        //
        let sql = `
select * from (
select 
id, 
Bewerkingsnummer, 
BewerkingflowId, 
Productnummer, 
AantalGemaakt, 
AantalUitval,
(select min(naam) from GEBRUIKER where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) as gebruiker,
(select min(naam) from BEWERKINGSOORT,BEWERKINGFLOW where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort and BEWERKINGFLOW.ID = BEWERKINGTIJD.BEWERKINGFLOWID) as bewerkingsoort,
(select min(kleur) from BEWERKINGSOORT,BEWERKINGFLOW where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort and BEWERKINGFLOW.ID = BEWERKINGTIJD.BEWERKINGFLOWID) as kleur,
startdatumtijd,
einddatumtijd,
date2screendate(startdatumtijd) as DATUM,
date2screentime(startdatumtijd) as START,
date2screentime(einddatumtijd) as EIND,
tijd
from BEWERKINGTIJD`;
        if (bewerkingsnummer != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `bewerkingsnummer = '${bewerkingsnummer}'`;
        }
        if (bewerkingflowid != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `bewerkingflowid = '${bewerkingflowid}'`;
        }
        sql += `
${where}
) base
order by Bewerkingsnummer,Productnummer,Gebruiker,startdatumtijd`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let sql: any;
        let rows: any;
        let id = db.fix(db.getDataId(req));
        //
        res.crudConnection = await db.waitConnection();
        //
        sql = `
update BEWERKINGTIJD set
Bewerkingsnummer = '${db.fix(req.body.BEWERKINGSNUMMER || '')}',
Bewerkingflowid = '${db.fix(req.body.BEWERKINGFLOWID || '')}',
Productnummer = '${db.fix(req.body.PRODUCTNUMMER || '')}',
AantalGemaakt = '${db.fix(req.body.AANTALGEMAAKT || '')}',
AantalUitval = '${db.fix(req.body.AANTALUITVAL || '')}',`;
        if (req.body.GEBRUIKER == '') {
            sql += `
Gebruiker = '${req.ak2_user}',`;
        } else {
            sql += `
Gebruiker = 
(select min(gebruiker) from GEBRUIKER
where naam = '${db.fix(req.body.GEBRUIKER || '')}'),`;
        }
        sql += `
Bewerkingsoort = 
(select min(bewerkingsoort) from BEWERKINGSOORT 
where naam = '${db.fix(req.body.BEWERKINGSOORT || '')}'),
startdatumtijd = screendatetime2date('${db.fix(req.body.DATUM || '')} ${db.fix(req.body.START || '')}'),
einddatumtijd = screendatetime2date('${db.fix(req.body.DATUM || '')} ${db.fix(req.body.EIND || '')}'),
tijd = '${db.fix(req.body.TIJD || '')}'
where id = '${id}'`;
        await db.waitQuery(res.crudConnection, sql);
        //
        sql = `
update BEWERKINGTIJD set
tijd=TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)
where id = '${id}'`;
        await db.waitQuery(res.crudConnection, sql);
        //
        res.crudConnection.release();
        res.status(200).send(req.body);
        return;
    }

    protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let id = db.fix(db.getDataId(req));
        //
        res.crudConnection = await db.waitConnection();
        let sql = `
insert into BEWERKINGTIJD
(Bewerkingsnummer,Bewerkingflowid,Productnummer,Gebruiker,Bewerkingsoort,
AantalGemaakt, AantalUitval,
startdatumtijd,einddatumtijd,tijd)
values (
'${db.fix(req.body.BEWERKINGSNUMMER || '')}',
'${db.fix(req.body.BEWERKINGFLOWID || '')}',
'${db.fix(req.body.PRODUCTNUMMER || '')}',
(select min(gebruiker) from GEBRUIKER 
where naam = '${db.fix(req.body.GEBRUIKER || '')}'),
(select min(bewerkingsoort) from BEWERKINGSOORT 
where naam = '${db.fix(req.body.BEWERKINGSOORT || '')}'),
'${db.fix(req.body.AANTALGEMAAKT || '')}',
'${db.fix(req.body.AANTALUITVAL || '')}',
screendatetime2date('${db.fix(req.body.DATUM || '')} ${db.fix(req.body.START || '')}'),
screendatetime2date('${db.fix(req.body.DATUM || '')} ${db.fix(req.body.EIND || '')}'),
'${db.fix(req.body.TIJD || '')}'
)`;
        let result = await db.waitQuery(res.crudConnection, sql);
        req.body.ID = db.getInsertId(result);

        res.crudConnection.release();
        res.status(200).send(req.body);
        return;
    }

    protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        res.crudConnection = await db.waitConnection();
        //
        let id = db.getDataId(req);
        let sql = `
delete from BEWERKINGTIJD
where id = '${id}'`;
        let result = await db.waitQuery(res.crudConnection, sql);
        //
        // en daarna de afterdelete
        //
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
            this.doInsert(req, res, next, this.dict);
        } else if (method == "DELETE") {
            this.doDelete(req, res, next, this.dict);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }
}
