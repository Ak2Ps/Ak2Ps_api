
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import { Onderdeelproductgroep } from "./onderdeelproductgroep"
//
const dict: Dict = {
    table: "productgroepbestelling",
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

export class Productgroepbestelling extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        let where = '';
        let sql = `
select * from 
(select *, 
voorraad + inbestelling + inproductie + inbewerking + inorder as vrij,
date2screendate(mindatum) as MINDATUM_OMS
from (
select 
id, 
productnummer, 
productnaam,
lijn,
'${query.productgroep}' as productgroep,
ifnull((select 'Ja' from PRODUCTGROEPREGEL 
where PRODUCTGROEPREGEL.productgroep = '' . query.productgroep . '' 
and PRODUCT.Productnummer = PRODUCTGROEPREGEL.Productnummer),'Nee') 
as ingroep,
(select IsOnderdeel from PRODUCTGROEPREGEL 
where PRODUCTGROEPREGEL.productgroep = '${query.productgroep}' 
and PRODUCT.Productnummer = PRODUCTGROEPREGEL.Productnummer) 
as IsOnderdeel,
ifnull(voorraad,0) as voorraad,
ifnull(leverdagen,0) as leverdagen,
ifnull((select sum(voorraad) from PRODUCTVOORRAAD
where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer 
and PRODUCTVOORRAAD.actie = 'VE'),0) 
as inorder,
ifnull((select sum(voorraad) from PRODUCTVOORRAAD 
where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer 
and PRODUCTVOORRAAD.actie = 'BE'),0) 
as inproductie,
ifnull((select sum(voorraad) from PRODUCTVOORRAAD 
where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer 
and PRODUCTVOORRAAD.actie = 'OP'),0) 
as inbewerking,
ifnull((select sum(voorraad) from PRODUCTVOORRAAD 
where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer 
and PRODUCTVOORRAAD.actie = 'BES'),0) 
as inbestelling,
ifnull((select min(actievoorraad) from PRODUCTVOORRAAD 
where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer),0) 
as minvoorraad,
ifnull((select min(voorraaddatumtijd) from PRODUCTVOORRAAD 
where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer 
and actievoorraad < 0),0) 
as mindatum,
date2screendate(voorraaddatumtijd) as VOORRAADDATUM
from PRODUCT`;
        if ((query.productgroep != '') && (query.productnummer != '')) {
            where += Util.addAnd(where);
            where += `(productnummer in (select productnummer from PRODUCTGROEPREGEL 
where productgroep = '${query.productgroep}')
or ucase(productnummer) like ucase('${query.productnummer}%'))`;
        } else if (query.productgroep != '') {
            where += Util.addAnd(where);
            where += `productnummer in (select productnummer from PRODUCTGROEPREGEL 
where productgroep = '${query.productgroep}')`;
        } else if (query.productnummer != '') {
            where += Util.addAnd(where);
            where += `ucase(productnummer) like ucase('${query.productnummer}%')`;
        } else {
            where += Util.addAnd(where);
            where += `productnummer ='????'`;
        }
        sql += `
${where}
) BASE ) BASE2
`;
        //
        where = '';
        if (query.metlijn != 'on') {
            where += Util.addAnd(where);
            where += `ifnull(lijn,'') = ''`;
        }
        if (query.negatief == 'on') {
            where += Util.addAnd(where);
            where += `minvoorraad  < 0`;
        }
        sql += `
${where}
order by productnummer
`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixBody(req.body);
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        if (body.PRODUCTGROEP != '') {
            let sql = `
select * 
from PRODUCTGROEP 
where productgroep = '${body.PRODUCTGROEP}'`;
            let rows = await db.waitQuery(res.crudConnection, sql);
            if (rows[0]) {
                let row = rows[0];
                if (body.INGROEP == 'Nee') {
                    sql = `
delete from PRODUCTGROEPREGEL
where productgroep = '${body.PRODUCTGROEP}'
and productnummer = '${body.PRODUCTNUMMER}'`;
                    ;
                    await db.waitQuery(res.crudConnection, sql);
                } else {
                    sql = `
insert into PRODUCTGROEPREGEL (productgroep,productnummer) 
select
'${body.PRODUCTGROEP}',
'${body.PRODUCTNUMMER}'
from DUAL 
where not exists 
(select 1 from PRODUCTGROEPREGEL
where productgroep = '${body.PRODUCTGROEP}'
and productnummer = '${body.PRODUCTNUMMER}')`;
                    await db.waitQuery(res.crudConnection, sql);
                }
                if (row['METONDERDELEN'] == '1') {
                    await Onderdeelproductgroep.delete(req, res, next, body.PRODUCTGROEP);
                    await Onderdeelproductgroep.add(req, res, next, body.PRODUCTGROEP, '', 0);
                }
            }
        }
        //
        res.crudConnection.release();
        res.status(200).send(body);
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
