
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "gebruikerrap",
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

export class Gebruikerrap extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        res.crudConnection = await db.waitConnection();
        let sql = '';
        let rows: any;
        let row: any;
        //
        let where = '';
        let naam = db.fix(req.query.naam || '');
        let startdatum = db.fix(req.query.startdatum || '');
        let einddatum = db.fix(req.query.einddatum || '');
        let afdeling = db.fix(req.query.afdeling || '');
        let inuit = db.fix(req.query.inuit || '');
        let gebruiker = '';
        if (naam != '') {
            sql = `
select gebruiker 
from GEBRUIKER where naam = '${naam}'`;
            rows = await db.waitQuery(res.crudConnection, sql);
            if (rows[0]) {
                row = rows[0];
                gebruiker = row.GEBRUIKER;
            } else {
                gebruiker = '???';
            }
        }
        //
        sql = `
select * from (
select 
id, 
Bewerkingsnummer, 
Productnummer, 
AantalGemaakt, 
AantalUitval, 
Gebruiker,
(select min(afdeling) from GEBRUIKER 
where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker ) 
as Afdeling,
(select min(AFDELING.naam) 
from GEBRUIKER,AFDELING 
where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker 
and GEBRUIKER.Afdeling = AFDELING.afdeling) 
as Afdeling_oms,
(select min(naam) from GEBRUIKER 
where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) 
as Naam,
(select min(naam) from BEWERKINGSOORT 
where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGTIJD.bewerkingsoort) 
as bewerkingsoort,
(select min(kleur) from BEWERKINGSOORT 
where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGTIJD.bewerkingsoort) 
as kleur,
startdatumtijd,
einddatumtijd,
date2screendate(startdatumtijd) as DATUM,
date2screentime(startdatumtijd) as START,
date2screentime(einddatumtijd) as EIND,
tijd
from BEWERKINGTIJD`
        if (gebruiker != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `gebruiker = '${gebruiker}'`;
        }
        if (startdatum != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `startdatumtijd >= screendate2date('${startdatum}')`;
        }
        if (einddatum != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `startdatumtijd >= screendate2date('${einddatum}')`;
        }
        if (inuit != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            if (Number(inuit) == 1) {
                where += `productnummer in ('in','uit')`;
            } else {
                where += `productnummer not in ('in','uit')`;
            }
        }
        //
        sql += `
${where}
) base`;
        where = '';
        if (afdeling != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `afdeling = (select min(afdeling) from AFDELING 
where naam = '${afdeling}')`;
        }
        sql += `
${where}
order by Afdeling,Naam,startdatumtijd`;
        //
        rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
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
            Util.unknownOperation(req, res, next);
        } else if (method == "POST") {
            Util.unknownOperation(req, res, next);
        } else if (method == "DELETE") {
            Util.unknownOperation(req, res, next);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
