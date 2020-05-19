
import { Crud } from '../crud';
//
import { Request, Response, NextFunction, json } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "inkoop",
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

export class Inkoop extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let productnummer = db.fix(req.query.productnummer || '');
        let productgroep = db.fix(req.query.productgroep || '');
        let leverancier = db.fix(req.query.leverancier || '');
        let swlijn = db.fix(req.query.swlijn || '');
        let datum = db.fix(req.query.datum || '');
        let details = db.fix(req.query.details || '');
        let negatief = db.fix(req.query.negatief || '');
        //
        res.crudConnection = await db.waitConnection();
        //
        let where = '';
        let result = '';
        let sql = `
select *, 
case when leveranciercount = 1 then leveranciermin else '...' end as leverancier,
date2screendate(mindatumtijd) as MINDATUM

from (
select concat('V_',PRODUCTVOORRAAD.actie) 
as type,
(select OPMERKING from PRODUCTOPMERKING 
where PRODUCT.productnummer = PRODUCTOPMERKING.productnummer 
and PRODUCTOPMERKING.bron = 'INKOOP') 
as PRODUCTOPMERKING,
PRODUCTVOORRAAD.id, 
PRODUCTVOORRAAD.productnummer, 
PRODUCT.productnaam,
getLijn(PRODUCT.productnummer)
as lijn,
case when PRODUCTVOORRAAD.actie = 'VRD' then PRODUCTVOORRAAD.voorraad else null end 
as voorraad,
ifnull(PRODUCT.leverdagen,0) as leverdagen,
case when PRODUCTVOORRAAD.actie = 'VE' then PRODUCTVOORRAAD.voorraad else null end 
as inorder,
case when PRODUCTVOORRAAD.actie = 'BE' then PRODUCTVOORRAAD.voorraad else null end 
as inproductie,
case when PRODUCTVOORRAAD.actie = 'OP' then PRODUCTVOORRAAD.voorraad else null end 
as inbewerking,
case when PRODUCTVOORRAAD.actie = 'BES' then PRODUCTVOORRAAD.voorraad else null end 
as inbestelling,
PRODUCTVOORRAAD.actievoorraad as vrij,
(select min(actievoorraad) from PRODUCTVOORRAAD MA 
where MA.productnummer = PRODUCTVOORRAAD.productnummer) as minvrd,
(select min(voorraaddatumtijd) from PRODUCTVOORRAAD MA 
where MA.productnummer = PRODUCTVOORRAAD.productnummer 
and MA.actievoorraad < 0) as mindatumtijd,
(select count(*) from BESTELLING 
where BESTELLING.productnummer = PRODUCTVOORRAAD.productnummer) 
as leveranciercount,
(select min(leveranciernummer) from BESTELLING 
where BESTELLING.productnummer = PRODUCTVOORRAAD.productnummer) 
as leveranciermin,
date2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as VOORRAADDATUM,
PRODUCTVOORRAAD.voorraaddatumtijd
from PRODUCTVOORRAAD,PRODUCT
where PRODUCTVOORRAAD.productnummer = PRODUCT.productnummer`;
        if ((productgroep != '') && (productnummer != '')) {
            where += `
and (PRODUCT.productnummer in 
(select productnummer from PRODUCTGROEPREGEL 
where productgroep = '${productgroep}')
or ucase(PRODUCT.productnummer) like ucase('${productnummer}%'))`;
        } else if (productgroep != '') {
            where += `
and PRODUCT.productnummer in 
(select productnummer from PRODUCTGROEPREGEL 
where productgroep = '${productgroep}')`;
        } else if (productnummer != '') {
            where += `
and ucase(PRODUCT.productnummer) like ucase('${productnummer}%')`;
        }
        //
        if (leverancier != '') {
            where += `
and PRODUCT.productnummer in 
(select productnummer from BESTELLING 
where Leveranciernummer = '${leverancier}')`;
        }
        if (swlijn == 'Ja') {
            where += `
and PRODUCT.lijn is not null`;
        } else if (swlijn == "Nee") {
            where += `
and PRODUCT.lijn is null`;
        }
        if (datum != '') {
            where += `
and PRODUCTVOORRAAD.voorraaddatumtijd <= screendate2date('${datum}')`;
        }
        sql += `
${where}
) BASE`;
        //
        // Algemeen
        //
        if (negatief == 'on') {
            sql += `
where minvrd < 0`;
        }
        sql += `
            order by mindatumtijd,productnummer,voorraaddatumtijd,vrij desc`;
        //
        //
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        //
        if (details == 'on') {
            res.status(200).send(rows);
        } else {
            let wiproductnummer = '';
            let wirow: any = '';
            let swfirst = 1;
            for (let irow = 0; irow < rows.length; irow++) {
                let row = rows[irow];
                if (row.PRODUCTNUMMER != wiproductnummer) {
                    if (wirow != '') {
                        if (swfirst == 1) {
                            swfirst = 0;
                            result += "\n[";
                        } else {
                            result += "\n,";
                        }
                        //$db -> jsonRow($wirow);
                        result += JSON.stringify(wirow);
                    }
                    wirow = row;
                    wirow.VOORRAADDATUM = wirow.MINDATUM;
                    wiproductnummer = row.PRODUCTNUMMER;
                } else {
                    wirow.INORDER = String(Number(wirow.INORDER) + Number(row.INORDER));
                    wirow.INPRODUCTIE = String(Number(wirow.INPRODUCTIE) + Number(row.INPRODUCTIE));
                    wirow.INBEWERKING = String(Number(wirow.INBEWERKING) + Number(row.INBEWERKING));
                    wirow.INBESTELLING = String(Number(wirow.INBESTELLING) + Number(row.INBESTELLING));
                    wirow.VOORRAADDATUM = wirow.MINDATUM;
                    wirow.VRIJ = row.VRIJ;
                }
            }
            if (wirow != '') {
                if (swfirst == 1) {
                    swfirst = 0;
                    result += "[";
                } else {
                    result += ",";
                }
                //$db -> jsonRow($wirow);
                result += JSON.stringify(wirow);
                result += ']';
            } else {
                result += '[]';
            }
            res.status(200).send(result);
        }
        //
        res.crudConnection.release();
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
