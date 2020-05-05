
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "bewerkinguitval",
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

export class Bewerkinguitval extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        res.crudConnection = await db.waitConnection();
        //
        let where = '';
        let sql = '';
        let rows: any;
        let row: any;
        let bewerkingsnummer = db.fix(req.query.bewerkingsnummer || '');
        let bewerkingflowid = db.fix(req.query.bewerkingflowid || '');
        let productnummer = db.fix(req.query.productnummer || '');

        if ((bewerkingsnummer == '') && (bewerkingflowid != '')) {
            sql = `
select bewerkingsnummer from BEWERKINGFLOW 
where id = '${bewerkingflowid}'`;
            rows = await db.waitQuery(res.crudConnection, sql);
            if (rows[0]) {
                row = rows[0];
                bewerkingsnummer = row.BEWERKINGSNUMMER;
            }
        }

        if (bewerkingflowid != '') {
            sql = `
insert into BEWERKINGUITVAL 
(bewerkingsnummer, bewerkingflowid, productnummer, uitval)
select 
'${bewerkingsnummer}',
'${bewerkingflowid}',
'${productnummer}',
uitval
from UITVAL
where not exists (
select 1 from BEWERKINGUITVAL
where BEWERKINGUITVAL.uitval = UITVAL.UITVAL
and bewerkingflowid = '${bewerkingflowid}')
and exists (
select 1 from BEWERKING 
where BEWERKING.bewerkingsnummer = '${bewerkingsnummer}')`;
            db.waitQuery(res.crudConnection, sql);
        }

        sql = `
select * from (
select 
BEWERKINGUITVAL.id, 
Bewerkingsnummer,
Productnummer,
Bewerkingflowid,
case when AantalReparatie = 0 then null else AantalReparatie end as AantalReparatie,
case when AantalAfkeur = 0 then null else AantalAfkeur end as AantalAfkeur,
(select min(naam) from GEBRUIKER 
where GEBRUIKER.Gebruiker = BEWERKINGUITVAL.gebruiker) 
as gebruiker,
(select min(concat(uitval,' ',naam)) from UITVAL 
where UITVAL.UITVAL = BEWERKINGUITVAL.uitval) as uitval
from BEWERKINGUITVAL`;
        if (bewerkingsnummer != '') {
            if (where == '') {
                where += '\nwhere ';
            } else {
                where += '\nand ';
            }
            where += `BEWERKINGUITVAL.bewerkingsnummer = '${bewerkingsnummer}'`;
        }
        if (bewerkingflowid != '') {
            if (where == '') {
                where += '\nwhere ';
            } else {
                where += '\nand ';
            }
            where += `bewerkingflowid = '${bewerkingflowid}'`;
        }
        sql += `
${where}
) base
order by Bewerkingsnummer,uitval
`;
        //
        rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        let sql = `
update BEWERKINGUITVAL set
Bewerkingsnummer = '${db.fix(req.body.BEWERKINGSNUMMER)}',
Bewerkingflowid = '${db.fix(req.body.BEWERKINGFLOWID)}',
Productnummer = '${db.fix(req.body.PRODUCTNUMMER)}',
AantalReparatie = '${db.fix(req.body.AANTALREPARATIE)}',
AantalAfkeur = '${db.fix(req.body.AANTALAFKEUR)}',`;
        if (req.body.GEBRUIKER == '') {
            sql += `
Gebruiker = '${req.ak2_user}'`;
        } else {
            sql += `
Gebruiker = 
(select min(gebruiker) from GEBRUIKER 
where naam = '${db.fix(req.body.GEBRUIKER)}')`;
        }
        sql += `
where id = '${id}'`;
        //
        await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(req.body);
        return;
    }

    protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
        res.crudConnection = await db.waitConnection();
        //
        let sql = `
insert into BEWERKINGUITVAL
(Bewerkingsnummer,Bewerkingflowid,Productnummer,Gebruiker,Uitval,
AantalReparatie, AantalAfkeur)
values (
'${db.fix(req.body.BEWERKINGSNUMMER)}',
'${db.fix(req.body.BEWERKINGFLOWID)}',
'${db.fix(req.body.PRODUCTNUMMER)}',
(select min(gebruiker) from GEBRUIKER 
where naam = '${db.fix(req.body.GEBRUIKER)}'),
(select min(uitval) from UITVAL 
where naam = '${db.fix(req.query.UITVAL).substr(0, 2)}'),
'${db.fix(req.body.AANTALREPARATIE)}',
'${db.fix(req.body.AANTALAFKEUR)}')`;
        //
        let result = await db.waitQuery(res.crudConnection, sql);
        req.body.ID = db.getInsertId(result);
        res.crudConnection.release();
        res.status(200).send(req.body);
        return;
    }

    protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        let sql = `
delete from bewerkinguitval
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
            this.doInsert(req, res, next, this.dict);
        } else if (method == "DELETE") {
            this.doDelete(req, res, next, this.dict);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
