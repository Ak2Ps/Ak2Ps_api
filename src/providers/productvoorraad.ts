
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

export class Productvoorraad extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doSelect(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        let sql = `select .. as ID, .. as VALUE from empty ...`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        let where = '';
        let sql = `
select * 
from (
select 
PRODUCTVOORRAAD.id, 
PRODUCTVOORRAAD.productnummer,
if ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)) is not null,
(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)),
if ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer) is not null,
(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer),
null
)
) as lijn,
PRODUCTVOORRAAD.voorraad,
PRODUCTVOORRAAD.actienummer,
PRODUCTVOORRAAD.actie, 
PRODUCTVOORRAAD.actieomschrijving, 
PRODUCTVOORRAAD.actievoorraad,
PRODUCTVOORRAAD.onderdelen, 
PRODUCTVOORRAAD.tebestellen, 
PRODUCTVOORRAAD.besteld,
date2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as VOORRAADDATUM,
date2screendate(PRODUCTVOORRAAD.actiedatumtijd) as ACTIEDATUM,
concat(date2screendate(PRODUCTVOORRAAD.beperkdatumtijd),' ',beperknummer) as KURK
from PRODUCTVOORRAAD 
inner join PRODUCT 
on (PRODUCTVOORRAAD.productnummer = PRODUCT.productnummer)`;
        if (query.productnummer != '') {
            where += Util.addAnd(where);
            where += `PRODUCTVOORRAAD.productnummer like ('${query.productnummer}%')`;
        }
        if (query.klant.trim() != '') {
            where += `PRODUCTVOORRAAD.productnummer in 
(select productnummer from PRODUCTVRAAG 
where klantnummer = trim('${query.klant}'))`;
        }
        if (query.negatief == 'on') {
            where += Util.addAnd(where);
            where += `PRODUCTVOORRAAD.actievoorraad < 0`;
        }
        if (query.geenstart == 'on') {
            where += Util.addAnd(where);
            where += `PRODUCTVOORRAAD.actie != 'VRD'`;
        }
        //
        sql += `
${where}
order by PRODUCT.LIJN,PRODUCTVOORRAAD.voorraaddatumtijd,PRODUCTVOORRAAD.productnummer,PRODUCTVOORRAAD.actievoorraad desc,PRODUCTVOORRAAD.id
) BASE`;
        if ((query.lijn != '') && (query.lijn != '0.00')) {
            sql += `
where base.lijn like ('%${query.lijn}%')`;
        }
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixBody(req.body);
        res.crudConnection = await db.waitConnection();
        let sql = '';
        //
        let id = db.fix(db.getDataId(req));
        sql = `
update PRODUCTVOORRAAD set
productnummer = '${body.PRODUCTNUMMER}',
onderdelen = '${body.ONDERDELEN}',
Voorraaddatumtijd = screendate2date('${body.VOORRAADDATUM}'),
Actiedatumtijd = screendate2date('${body.ACTIEDATUM}'),
actievoorraad = '${body.ACTIEVOORRAAD}',
voorraad = '${body.VOORRAAD}',
actie = '${body.ACTIE}',
actieomschrijving = '${body.ACTIEOMSCHRIJVING}'
where id = '${id}'`;
        await db.waitQuery(res.crudConnection, sql);
        //
        sql = `
update PRODUCT set'
lijn = '${body.LIJN}'
where productnummer = '${body.PRODUCTNUMMER}'`;
        //
        await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(body);
        return;
    }

    protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixBody(req.body);
        res.crudConnection = await db.waitConnection();
        //
        let sql = `
insert into PRODUCTVOORRAAD
(productnummer,onderdelen,voorraad,actievoorraad,
actie,actieomschrijving,voorraaddatumtijd,actiedatumtijd
values (
'${body.PRODUCTNUMMER}',
'${body.ONDERDELEN}',
'${body.VOORRAAD}',
'${body.ACTIEVOORRAAD}',
'${body.ACTIE}',
'${body.ACTIEOMSCRIJVING}',
screendate2date('${body.VOORRAADDATUM}',
screendate2date('${body.ACTIEDATUM}')
)`;
        //
        let result = await db.waitQuery(res.crudConnection, sql);
        body.ID = db.getInsertId(result);
        res.crudConnection.release();
        res.status(200).send(body);
        return;
    }

    protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixBody(req.body);
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        let sql = `
delete from PRODUCTVOORRAAD
where id = '${id}'`;
        //
        await db.waitQuery(res.crudConnection, sql);
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
            this.doSelect(req, res, next, this.dict);
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
