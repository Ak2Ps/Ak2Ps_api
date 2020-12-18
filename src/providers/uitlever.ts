
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "uitlever",
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

export class Uitlever extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixQuery(req.query);
        query.startvoorraad = {};
        if (query.assets == "") {
            query.assets = "images/";
        } else if (query.assets == "2"){
            query.assets = "";
        } else {
            query.assets = "assets/image/";
        }
        res.crudConnection = await db.waitConnection();
        //
        let vraagwhere = '';
        let sql = '';
        let where = '';
        let rows: any;
        let row: any;
        let sqlbase = '';
        let sqlupdate = '';
        //
        if (query.klant != '') {
            vraagwhere += Util.addAnd(vraagwhere);
            vraagwhere += `klantnummer = ${query.klant}`;
        }
        if (query.productnummer != '') {
            vraagwhere += Util.addAnd(vraagwhere);
            vraagwhere += `ucase(productnummer) like ucase('${query.productnummer}%')`;
        }
        if (query.einddatum != '') {
            vraagwhere += Util.addAnd(vraagwhere);
            vraagwhere += `vraagdatumtijd <= screendate2date('${query.einddatum}')`;
        }
        sql = `
select * from (
select *,
date2screendate(vraagdatumtijd) as VRAAGDATUM,
date2screendate(initvraagdatumtijd) as INITVRAAGDATUM,
date2screendate(acceptdatumtijd) as ACCEPTDATUM,
date2screendate(orderdatumtijd) as ORDERDATUM,
(select ZOEKCODE from KLANT 
where PRODUCTVRAAG.klantnummer = KLANT.klantnummer) 
as KLANTZOEKCODE,
(select VOORRAAD from PRODUCT 
where PRODUCTVRAAG.productnummer = PRODUCT.productnummer)
as VOORRAAD,	
(select sum(productieaantal) from BEWERKING 
where bewerking.productnummer = productvraag.productnummer 
and isnull(einddatumtijd)) 
as OPENPRODUCTIEAANTAL,
getLijn(PRODUCTVRAAG.productnummer) as lijn,
(select OPMERKING from VRAAG 
where VRAAG.ordernummer = PRODUCTVRAAG.ordernummer) 
as VRAAG_OMS,           
OPMERKING as INTERN_OMS,
(select Productnaam from PRODUCT 
where PRODUCTVRAAG.productnummer = PRODUCT.productnummer) 
as PRODUCT_OMS,
getOpenStand(PRODUCTVRAAG.productnummer,'${query.assets}') as STAND,
getKurk(PRODUCTVRAAG.productnummer,PRODUCTVRAAG.vraagdatumtijd) as KURK
from PRODUCTVRAAG
${vraagwhere}
) BASE`;
        //
        //
        //
        if (query.productnummer != '') {
            where += Util.addAnd(where);
            where += `ucase(productnummer) like ucase('${query.productnummer}%')`;
        }
        if (query.productgroep != '') {
            where += Util.addAnd(where);
            where += `productnummer in (
select productnummer 
from PRODUCTGROEPREGEL 
where productgroep = '${query.productgroep}')`;
        }
        if (query.einddatum != '') {
            where += Util.addAnd(where);
            where += `date(vraagdatumtijd) <= screendate2date('${query.einddatum}')`;
        }
        if (query.lijn != '') {
            where += Util.addAnd(where);
            where += `base.lijn  = '${query.lijn}'`;
        }
        //
        sql += `
${where}
order by vraagdatumtijd,klantzoekcode,productnummer`;
        //
        //
        //
        sqlbase = `
DROP TEMPORARY TABLE IF EXISTS TABLE_UITLEVER`;
        await db.waitQuery(res.crudConnection, sqlbase);
        //
        sqlbase = `
CREATE TEMPORARY TABLE TABLE_UITLEVER 
(TMPID int(10) NOT NULL AUTO_INCREMENT,
PRIMARY KEY (TMPID), INDEX(TMPID)) 
${sql}`;
        await db.waitQuery(res.crudConnection, sqlbase);
        //
        //
        //
        sql = `
select * from TABLE_UITLEVER`;
        rows = await db.waitQuery(res.crudConnection, sql);
        for (let irow = 0; irow < rows.length; irow++) {
            row = rows[irow];
            query.productnummer = row.PRODUCTNUMMER;
            if (!query.startvoorraad[query.productnummer]) {
                query.startvoorraad[query.productnummer] = Number(row.VOORRAAD);
            }
            query.startvoorraad[query.productnummer] = query.startvoorraad[query.productnummer] - Number(row.VRAAG);
            sqlupdate = `
update TABLE_UITLEVER set
VOORRAAD = ${query.startvoorraad[query.productnummer]}
where TMPID = '${row.TMPID}'`;
            await db.waitQuery(res.crudConnection, sqlupdate);
        }
        sql = `
select *,
getOpenAantal(productnummer) as openaantal,
case when 
initvraagdatumtijd >= screendate2date('01-01-2044')
and initvraagdatumtijd <= screendate2date('31-12-2044')
then concat('(44) ', ORDERREFERENTIE) 
else ORDERREFERENTIE end 
as ORDERREFERENTIE
from TABLE_UITLEVER`;
        where = '';
        where += Util.addAnd(where);
        where += `vraag != 0`;
        if (query.sel44 == 'Nee') {
            where += Util.addAnd(where);
            where += `(initvraagdatumtijd < screendate2date('01-01-2044')
or initvraagdatumtijd > screendate2date('31-12-2044'))`;
        } else if (query.sel44 == "Ja") {
            where += Util.addAnd(where);
            where = `initvraagdatumtijd >= screendate2date('01-01-2044')
and initvraagdatumtijd <= screendate2date('31-12-2044')`;
        }
        if (query.klant != '') {
            where += Util.addAnd(where);
            where += `klantnummer = '${query.klant}'`;
        }
        if (query.zoekcode) {
            if (query.zoekcode != '') {
                where += Util.addAnd(where);
                where = `ucase(klantzoekcode) like ucase('${query.zoekcode}%')`;
            }
        }
        sql += `
${where}`;
        //
        rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    public async routes(req: Request, res: Response, next: NextFunction) {
        //
        let method = req.method;
        let action = db.fix(req.query.action || '');
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
