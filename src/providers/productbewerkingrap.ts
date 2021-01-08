
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "productbwerkingrap",
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

export class Productbewerkingrap extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async addBewerking(req: Request, res: Response, next: NextFunction, productnummer: string) {
        let query = db.fixQuery(req.query);
        //
        if (query.datumvanaf == '') {
            query.datumvanaf = query.datum;
        }
        if (query.datumtm == '') {
            query.datumtm = '31-12-2099';
        }
        let result = '';
        //
        let sqlpartaantal = ` 
(select sum(BEWERKINGFLOW.bewerkingaantal)
 from BEWERKINGFLOW,BEWERKING E
 where BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer
 and E.productnummer =  '${productnummer}'
 and E.einddatumtijd is not null
 and E.einddatumtijd >= screendate2date('${query.datumvanaf}')
 and E.einddatumtijd <= screendate2date('${query.datumtm}')
 and E.startdatumtijd >= screendate2date('${query.datum}')
 and exists (
 select 1 from BEWERKINGSOORT
 where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
 and BEWERKINGSOORT.voortgang = 1
 )
 and exists (
 select 1 from BEWERKINGTIJD
 where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
 )
 )` ;

        let sqlpartproductieaantal = `
(select sum(productieaantal)
from BEWERKING E
where E.productnummer =  '${productnummer}'
and E.einddatumtijd is not null
and E.einddatumtijd >= screendate2date('${query.datumvanaf}')
and E.einddatumtijd <= screendate2date('${query.datumtm}')
and E.startdatumtijd >= screendate2date('${query.datum}')
)`;

        let sqlpartstartaantal = `
(select sum(startaantal)
from BEWERKING E
where E.productnummer =  '${productnummer}'
and E.einddatumtijd is not null
and E.einddatumtijd >= screendate2date('${query.datumvanaf}')
and E.einddatumtijd <= screendate2date('${query.datumtm}')
and E.startdatumtijd >= screendate2date('${query.datum}')
)` ;

        let sqlparttijd = `
(select round(sum(BEWERKINGTIJD.tijd)/60,2) 
from BEWERKINGTIJD,BEWERKINGFLOW,BEWERKING C
where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
and BEWERKINGFLOW.bewerkingsnummer = C.bewerkingsnummer
and C.PRODUCTNUMMER = '${productnummer}'
and C.einddatumtijd is not null
and C.einddatumtijd >= screendate2date('${query.datumvanaf}')
and C.einddatumtijd <= screendate2date('${query.datumtm}')
and C.startdatumtijd >= screendate2date('${query.datum}')
)` ;

        let sqlpartbewerkingen = `
(select count(distinct BEWERKINGFLOW.bewerkingsoort)
from BEWERKINGFLOW,BEWERKING E
where BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer
and E.PRODUCTNUMMER = '${productnummer}'
and E.einddatumtijd is not null
and E.einddatumtijd >= screendate2date('${query.datumvanaf}')
and E.einddatumtijd <= screendate2date('${query.datumtm}')
and E.startdatumtijd >= screendate2date('${query.datum}')
and exists (
select 1 from BEWERKINGSOORT
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
and BEWERKINGSOORT.voortgang = 1
)
and exists (
select 1 from BEWERKINGTIJD
where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
)
)`;

        let sqlpartopdrachten = `
(select count(distinct E.bewerkingsnummer)
from BEWERKINGFLOW,BEWERKING E
where BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer
and E.PRODUCTNUMMER = '${productnummer}'
and E.einddatumtijd is not null
and E.einddatumtijd >= screendate2date('${query.datumvanaf}')
and E.einddatumtijd <= screendate2date('${query.datumtm}')
and E.startdatumtijd >= screendate2date('${query.datum}')
and exists (
select 1 from BEWERKINGSOORT
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
and BEWERKINGSOORT.voortgang = 1
)
)`;
        let sql = `
select
'BWK' as type,
${sqlparttijd} as uren,
${sqlpartstartaantal} as aantal,
${sqlpartopdrachten} as bewerkingen,
round(${sqlpartstartaantal} / ${sqlparttijd}) as gemaantaluur,
(select SOORT from PRODUCT 
where productnummer = '${productnummer}') 
as soort,
if ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = '${productnummer}')) is not null,
(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = '${productnummer}')),
if ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = '${productnummer}') is not null,
(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = '${productnummer}'),
null
)
) as lijn,
(select inkoopprijs from PRODUCT 
where productnummer = '${productnummer}') 
as inkoopprijs,
(select inkoopprijsgemiddeld from PRODUCT 
where productnummer = '${productnummer}') 
as inkoopprijsgemiddeld
from DUAL`;
        let rows = await db.waitQuery(res.crudConnection, sql);
        for (let irow = 0; irow < rows.length; irow++) {
            let row = rows[irow];
            if (Number(row.UREN) != 0) {
                row.UREN = Number(row.UREN).toFixed(2);
            }
            row.INKOOPPRIJS = Number(row.INKOOPPRIJS).toFixed(8);
            row.INKOOPPRIJSGEMIDDELD = Number(row.INKOOPPRIJSGEMIDDELD).toFixed(8);
            result += ",\n";
            result += JSON.stringify(row);
        }
        //
        return (result);
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let where = '';
        let sql = '';
        let result = '';
        let swfirst = 0;
        let tlart = 0;
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        if (query.action == 'getartikel') {
            sql = `
select * from (
select 'P' as TYPE, 
PRODUCTNUMMER,SOORT,
if ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)) is not null,
(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)),
if ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer) is not null,
(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer),
null
)
) as lijn
from PRODUCT` ;
            if (query.productnummer != '') {
                where += Util.addAnd(where);
                where += `ucase(productnummer) like ucase('${query.productnummer}%')`;
            }
            if (query.klant.trim() != '') {
                where += Util.addAnd(where);
                where += `productnummer in (
select productnummer from PRODUCTVRAAG 
where klantnaam = trim('${query.klant}')`;
            }
            if (query.soort.substr(0, 1) == 'M' || query.soort.substr(0, 1) == '1') {
                where += Util.addAnd(where);
                where += `soort = 'M'`;
            } else if (query.soort.substr(0, 1) == 'V' || query.soort.substr(0, 1) == '0') {
                where += Util.addAnd(where);
                where += `soort = 'V'`;
            }
            sql += `
${where}
order by PRODUCTNUMMER
) BASE`;
            if (query.lijn.trim() != '') {
                sql += ` where BASE.lijn = trim(${query.lijn}')`;
            }
            let rows = await db.waitQuery(res.crudConnection, sql);
            swfirst = 1;
            tlart = 0;
            result += "[\n";
            for (let irow = 0; irow < rows.length; irow++) {
                let row = rows[irow];
                tlart++;
                if (tlart > 500) {
                    let sql99 = `
select '99' as TYPE, 
'Meer dan 500 producten opgevraagd ...' as MSG 
from DUAL`;
                    let rows99 = await db.waitQuery(res.crudConnection, sql99);
                    if (rows99[0]) {
                        let row99 = rows99[0];
                        if (swfirst == 1) {
                            swfirst = 0;
                        } else {
                            result += ",\n";
                        }
                        result += JSON.stringify(row99);
                    }
                    break;
                }
                if (swfirst == 1) {
                    swfirst = 0;
                } else {
                    result += ",\n";
                }
                result += JSON.stringify(row);
                //
                result += await this.addBewerking(req, res, next, row.PRODUCTNUMMER);
                //
                let sqlO1 = `
select 'O1' as TYPE,
PRODUCTNUMMER,
FAKTOR,
ONDERDEELNUMMER from ONDERDEEL
where PRODUCTNUMMER = '${row.PRODUCTNUMMER}'
and ONDERDEELNUMMER !=  '${row.PRODUCTNUMMER}'
and FAKTOR >= 0 
order by ONDERDEELNUMMER`;
                let rowsO1 = await db.waitQuery(res.crudConnection, sqlO1);
                for (let irowO1 = 0; irowO1 < rowsO1.length; irowO1++) {
                    let rowO1 = rowsO1[irowO1];
                    rowO1.FAKTOR = Number(rowO1.FAKTOR).toFixed(7);
                    if (swfirst == 1) {
                        swfirst = 0;
                    } else {
                        result += ",\n";
                    }
                    result += JSON.stringify(rowO1);
                    result += await this.addBewerking(req, res, next, rowO1.ONDERDEELNUMMER);
                    let sqlO2 = `
select 'O2' as TYPE,
FAKTOR,
ONDERDEELNUMMER from ONDERDEEL
where PRODUCTNUMMER = '${rowO1.ONDERDEELNUMMER}'
and ONDERDEELNUMMER !=  '${rowO1.ONDERDEELNUMMER}'
and FAKTOR >= 0 
order by ONDERDEELNUMMER`;
                    let rowsO2 = await db.waitQuery(res.crudConnection, sqlO2);
                    for (let irowO2 = 0; irowO2 < rowsO2.length; irowO2++) {
                        let rowO2 = rowsO2[irowO2];
                        rowO2.FAKTOR = Number(rowO2.FAKTOR).toFixed(7);
                        if (swfirst == 1) {
                            swfirst = 0;
                        } else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO2);
                        result += await this.addBewerking(req, res, next, rowO2.ONDERDEELNUMMER);
                        let sqlO3 = `
select 'O3' as TYPE,
FAKTOR,
ONDERDEELNUMMER from ONDERDEEL
where PRODUCTNUMMER = '${rowO2.ONDERDEELNUMMER}'
and ONDERDEELNUMMER !=  '${rowO2.ONDERDEELNUMMER}'
and FAKTOR >= 0 
order by ONDERDEELNUMMER`;
                        let rowsO3 = await db.waitQuery(res.crudConnection, sqlO3);
                        for (let irowO3 = 0; irowO3 < rowsO3.length; irowO3++) {
                            let rowO3 = rowsO3[irowO3];
                            rowO3.FAKTOR = Number(rowO3.FAKTOR).toFixed(7);
                            if (swfirst == 1) {
                                swfirst = 0;
                            } else {
                                result += ",\n";
                            }
                            result += JSON.stringify(rowO3);
                            result += await this.addBewerking(req, res, next, rowO3.ONDERDEELNUMMER);
                            let sqlO4 = `
select 'O4' as TYPE,
FAKTOR,
ONDERDEELNUMMER 
from ONDERDEEL
where PRODUCTNUMMER = '${rowO3.ONDERDEELNUMMER}'
and ONDERDEELNUMMER !=  '${rowO3.ONDERDEELNUMMER}'
and FAKTOR >= 0 
order by ONDERDEELNUMMER`;
                            let rowsO4 = await db.waitQuery(res.crudConnection, sqlO4);
                            for (let irowO4 = 0; irowO4 < rowsO4.length; irowO4++) {
                                let rowO4 = rowsO4[irowO4];
                                rowO4.FAKTOR = Number(rowO4.FAKTOR).toFixed(7);
                                if (swfirst == 1) {
                                    swfirst = 0;
                                } else {
                                    result += ",\n";
                                }
                                result += JSON.stringify(rowO4);
                                result += await this.addBewerking(req, res, next, rowO4.ONDERDEELNUMMER);
                                let sqlO5 = `
select 'O5' as TYPE,
FAKTOR,
ONDERDEELNUMMER 
from ONDERDEEL
where PRODUCTNUMMER = '${rowO4.ONDERDEELNUMMER}'
and ONDERDEELNUMMER !=  '${rowO4.ONDERDEELNUMMER}'
and FAKTOR >= 0 
order by ONDERDEELNUMMER`;
                                let rowsO5 = await db.waitQuery(res.crudConnection, sqlO5);
                                for (let irowO5 = 0; irowO5 < rowsO5.length; irowO5++) {
                                    let rowO5 = rowsO5[irowO5];
                                    rowO5.FAKTOR = Number(rowO5.FAKTOR).toFixed(7);
                                    if (swfirst == 1) {
                                        swfirst = 0;
                                    } else {
                                        result += ",\n";
                                    }
                                    result += JSON.stringify(rowO5);
                                    result += await this.addBewerking(req, res, next, rowO5.ONDERDEELNUMMER);
                                    let sqlO6 = `
select 'O6' as TYPE,
FAKTOR,
ONDERDEELNUMMER 
from ONDERDEEL
where PRODUCTNUMMER = '${rowO5.ONDERDEELNUMMER}'
and ONDERDEELNUMMER !=  '${rowO5.ONDERDEELNUMMER}'
and FAKTOR >= 0 
order by ONDERDEELNUMMER`;
                                    let rowsO6 = await db.waitQuery(res.crudConnection, sqlO6);
                                    for (let irowO6 = 0; irowO6 < rowsO6.length; irowO6++) {
                                        let rowO6 = rowsO6[irowO6];
                                        rowO6.FAKTOR = Number(rowO6.FAKTOR).toFixed(7);
                                        if (swfirst == 1) {
                                            swfirst = 0;
                                        } else {
                                            result += ",\n";
                                        }
                                        result += JSON.stringify(rowO6);
                                        result += await this.addBewerking(req, res, next, rowO6.ONDERDEELNUMMER);
                                        let sql99 = `
select '99' as TYPE,
'Onderdeel van Onderdeel probleem' as MSG 
from DUAL`;
                                        let rows99 = await db.waitQuery(res.crudConnection, sql99);
                                        if (rows99[0]) {
                                            let row99 = rows99[0];
                                            if (swfirst == 1) {
                                                swfirst = 0;
                                            } else {
                                                result += ",\n";
                                            }
                                            JSON.stringify(row99);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            result += "]\n";
            //
            res.crudConnection.release();
            res.status(200).send(result);
            return;
        }
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
