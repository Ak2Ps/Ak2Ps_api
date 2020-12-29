

import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import { Onderdeelproductgroep } from "./onderdeelproductgroep"
import { Onderdeel } from './onderdeel';
//
const dict: Dict = {
    table: "PRODUCTVOORRAAD",
    key: [
        {
            body: "STATUS",
            sql: "STATUS",
        }
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
        orderby: "productnummer",
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

export class Bestellingproductgroep extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        res.crudConnection = await db.waitConnection();
        //
        let productgroep = db.fix(req.query.productgroep || '');
        let productnummer = db.fix(req.query.productnummer || '');
        let onderdeel = db.fix(req.query.onderdeel || '');
        let metlijn = db.fix(req.query.metlijn || '');
        let negatief = db.fix(req.query.negatief || '');
        //
        let where = '';
        let sql = `
select * from (
select *,
voorraad + inbestelling + inproductie + inbewerking + inorder as vrij,
date2screendate(mindatum) as MINDATUM_OMS
from (
select id, productnummer, productnaam,
getLijn(PRODUCT.productnummer) as lijn,
'${productgroep}' as productgroep,
ifnull((select 'Ja' from PRODUCTGROEPREGEL 
where PRODUCTGROEPREGEL.productgroep = '${productgroep}'
and PRODUCT.Productnummer = PRODUCTGROEPREGEL.Productnummer),
'Nee') 
as ingroep,
(select IsOnderdeel
from PRODUCTGROEPREGEL 
where PRODUCTGROEPREGEL.productgroep = '${productgroep}'
and PRODUCT.Productnummer = PRODUCTGROEPREGEL.Productnummer) 
as IsOnderdeel,
ifnull(voorraad,0) as voorraad,
ifnull(leverdagen,0) as leverdagen,
ifnull((select sum(voorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and PRODUCTVOORRAAD.actie = 'VE'),0) as inorder,
ifnull((select sum(voorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and PRODUCTVOORRAAD.actie = 'BE'),0) as inproductie,
ifnull((select sum(voorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and PRODUCTVOORRAAD.actie = 'OP'),0) as inbewerking,
ifnull((select sum(voorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and PRODUCTVOORRAAD.actie = 'BES'),0) as inbestelling,
ifnull((select min(actievoorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer),0) as minvoorraad,
ifnull((select min(voorraaddatumtijd) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and actievoorraad < 0),0) as mindatum,
date2screendate(voorraaddatumtijd) as VOORRAADDATUM
from PRODUCT`;
//
        if ((productgroep != '') && (productnummer != '')) {
            if (where == '') {
                where += ' where';
            } else {
                where += ' and ';
            }
            where += `
productnummer in 
(select productnummer from PRODUCTGROEPREGEL
where productgroep = '${productgroep}'
or ucase(productnummer) like (ucase('${productnummer}%')))`;
        } else if (productgroep != '') {
            if (where == '') {
                where += ' where';
            } else {
                where += ' and ';
            }
            where += `
productnummer in 
(select productnummer from PRODUCTGROEPREGEL
where productgroep = '${productgroep}')`;
        } else if (productnummer != '') {
            if (where == '') {
                where += ' where';
            } else {
                where += ' and ';
            }
            where += `
ucase(productnummer) like (ucase('${productnummer}%'))`;
        } else {
            if (where == '') {
                where += ' where';
            } else {
                where += ' and ';
            }
            where += `
productnummer ='????'`;
        }
        sql += `
${where}`;
        sql += `
) BASE ) BASE2`;
        //
        where = '';
        if (metlijn != 'on') {
            if (where == '') {
                where += ' where';
            } else {
                where += ' and ';
            }
            where += ` 
ifnull(lijn,'') = ''`;
        }
        if (negatief == 'on') {
            if (where == '') {
                where += ' where';
            } else {
                where += ' and ';
            }
            where += ` 
minvoorraad < 0`;
        }
        sql += `
${where}
order by productnummer`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }
    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let sql: any;
        let sqlupdate: any;
        //
        res.crudConnection = await db.waitConnection();
        //
        if (req.body.PRODUCTGROEP != '') {
            let sql = `
select * 
from PRODUCTGROEP
where productgroep = '${db.fix(req.body.PRODUCTGROEP)}'`;
            let rows = await db.waitQuery(res.crudConnection, sql);
            if (rows[0]) {
                let row = rows[0];
                if (req.body.INGROEP == 'Nee') {
                    sqlupdate = `
delete from PRODUCTGROEPREGEL
where productgroep = '${db.fix(req.body.PRODUCTGROEP)}'
and productnummer = '${db.fix(req.body.PRODUCTNUMMER)}'`;
                    await db.waitQuery(res.crudConnection, sqlupdate);
                } else {
                    sqlupdate = `
insert into PRODUCTGROEPREGEL 
(productgroep,productnummer) 
select
'${db.fix(req.body.PRODUCTGROEP)}',
'${db.fix(req.body.PRODUCTNUMMER)}'
from DUAL where not exists (
select 1 from PRODUCTGROEPREGEL
where productgroep = '${db.fix(req.body.PRODUCTGROEP)}'
and productnummer = '${db.fix(req.body.PRODUCTNUMMER)}')`;
                    await db.waitQuery(res.crudConnection, sqlupdate);
                }
                if (Number(row.METONDERDELEN) == 1) {
                    await Onderdeelproductgroep.delete(req, res, next, req.body.PRODUCTGROEP);
                    await Onderdeelproductgroep.add(req, res, next, req.body.PRODUCTGROEP, '', 0);
                }
            }
        }
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
            Util.unknownOperation(req, res, next);
        } else if (method == "DELETE") {
            Util.unknownOperation(req, res, next);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
