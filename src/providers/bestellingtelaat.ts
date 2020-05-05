

import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
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

export class Bestellingtelaat extends Crud {
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
        let leveranciernummer = db.fix(req.query.leveranciernummer || '');
        //
        let where = '';
        let sql = `
select BASE.* from (
select 
getLijn(product.productnummer) as lijn,
BESTELLING.productnummer, 
PRODUCT.productnaam,
BESTELLING.bestelling,
BESTELLING.leveranciernummer, 
BESTELLING.leveranciernaam, 
BESTELLING.bestelnummer,
PRODUCT.Leverdagen,
ifnull((select datediff(besteldatumtijd,sysdate())),0) as DAGEN,
ontvangendatumtijd,
date2screendate(ontvangendatumtijd) as ONTVANGENDATUM,
besteldatumtijd,
date2screendate(besteldatumtijd) as BESTELDATUM
from 
BESTELLING,
PRODUCT
where BESTELLING.productnummer = PRODUCT.productnummer`;

        if ((productgroep != '') && (productnummer != '')) {
            where += `
and 
(PRODUCT.productnummer in 
(select productnummer from PRODUCTGROEPREGEL 
where productgroep = '${productgroep}')
or PRODUCT.productnummer like ('${productnummer}%'))`;
        } else if (productgroep != '') {
            where += `
and 
PRODUCT.productnummer in 
(select productnummer from PRODUCTGROEPREGEL
where productgroep = '${productgroep}')`;
        } else if (productnummer != '') {
            where += `
and 
PRODUCT.productnummer like ('${productnummer}%')`;
        } else {
        }
        if (leveranciernummer != '') {
            where += `
and 
BESTELLING.leveranciernummer = '${leveranciernummer}'`;
        }

        sql += `
${where}
) BASE
order by besteldatumtijd,bestelnummer,productnummer`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
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
