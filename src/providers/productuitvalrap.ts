
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "productuitvalrap",
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

export class Productuitvalrap extends Crud {
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
        let startstatistiek = await Util.waitParam(req, res, next, 'STARTSTATISTIEK');
        let where = '';
        let sql = '';


        if (query.action == 'gentot') {
            sql += `
select 
' ' as id,  
' ' as Lijn, 
' ' as Productnummer,
' ' as productnaam,
' ' as soort,
sum(aantal) as aantal,
sum(Uitval) as uitval,
case when sum(aantal) > 0 then format(sum(uitval) / sum(aantal) * 100,2) else format(0,2) end as percuitval,
sum(afkeur) as afkeur,
case when sum(aantal) > 0 then format(sum(afkeur) / sum(aantal) * 100,2) else format(0,2) end as percafkeur,
sum(afkeurm) as afkeurm,
case when sum(aantal) > 0 then format(sum(afkeurm) / sum(aantal) * 100,2) else format(0,2) end as percafkeurm,
sum(afkeure) as afkeure,
case when sum(aantal) > 0 then format(sum(afkeure) / sum(aantal) * 100,2) else format(0,2) end as percafkeure,
sum(afkeuro) as afkeuro,
case when sum(aantal) > 0 then format(sum(afkeuro) / sum(aantal) * 100,2) else format(0,2) end as percafkeuro,
sum(reparatie) as reparatie,
case when sum(aantal) > 0 then format(sum(reparatie) / sum(aantal) * 100,2) else format(0,2) end as percreparatie,
sum(reparatiem) as reparatiem,
case when sum(aantal) > 0 then format(sum(reparatiem) / sum(aantal) * 100,2) else format(0,2) end as percreparatiem,
sum(reparatiee) as reparatiee,
case when sum(aantal) > 0 then format(sum(reparatiee) / sum(aantal) * 100,2) else format(0,2) end as percreparatiee,
sum(reparatieo) as reparatieo,
case when sum(aantal) > 0 then format(sum(reparatieo) / sum(aantal) * 100,2) else format(0,2) end as percreparatieo
from (`;
        }

        sql += `
select * from (`;

        sql += `
select * from 
(select
min(id) as min_id,
Lijn,
Productnummer,
min(productnaam) as productnaam,
min(soort) as soort,
sum(Startaantal) as aantal,
sum(Uitval) as uitval,
case when sum(startaantal) > 0 then format(sum(uitval) / sum(startaantal) * 100,2) else format(0,2) end as percuitval,
sum(afkeur) as afkeur,
case when sum(startaantal) > 0 then format(sum(afkeur) / sum(startaantal) * 100,2) else format(0,2) end as percafkeur,
sum(afkeurm) as afkeurm,
case when sum(startaantal) > 0 then format(sum(afkeurm) / sum(startaantal) * 100,2) else format(0,2) end as percafkeurm,
sum(afkeure) as afkeure,
case when sum(startaantal) > 0 then format(sum(afkeure) / sum(startaantal) * 100,2) else format(0,2) end as percafkeure,
sum(afkeuro) as afkeuro,
case when sum(startaantal) > 0 then format(sum(afkeuro) / sum(startaantal) * 100,2) else format(0,2) end as percafkeuro,
sum(reparatie) as reparatie,
case when sum(startaantal) > 0 then format(sum(reparatie) / sum(startaantal) * 100,2) else format(0,2) end as percreparatie,
sum(reparatiem) as reparatiem,
case when sum(startaantal) > 0 then format(sum(reparatiem) / sum(startaantal) * 100,2) else format(0,2) end as percreparatiem,
sum(reparatiee) as reparatiee,
case when sum(startaantal) > 0 then format(sum(reparatiee) / sum(startaantal) * 100,2) else format(0,2) end as percreparatiee,
sum(reparatieo) as reparatieo,
case when sum(startaantal) > 0 then format(sum(reparatieo) / sum(startaantal) * 100,2) else format(0,2) end as percreparatieo
from
(select
BEWERKING.id,
if ((select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer) is not null,
(select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer),
if ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)) is not null,	
(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)),      
if ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer) is not null,
(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer),
null
)
)
) as lijn,
PRODUCT.Soort,
BEWERKING.Productnummer,
PRODUCT.Productnaam,
BEWERKING.Einddatumtijd,
ifnull(BEWERKING.startaantal,0) as startaantal,
(SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW
WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
AND NOT EXISTS (select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
AND BEWERKINGFLOW.einddatumtijd is null)) as ak2einddatumtijd,
(Select ifnull(Sum(BEWERKINGFLOW.Uitval),0) From BEWERKINGFLOW
Where BEWERKINGFLOW.Bewerkingsnummer = BEWERKING.Bewerkingsnummer) As uitval,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur),0) From BEWERKINGUITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer) As afkeur,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur),0) From BEWERKINGUITVAL,UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and UITVAL.uitvalsoort in ('Mechanisch')) As afkeurm,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur),0) From BEWERKINGUITVAL,UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and UITVAL.uitvalsoort in ('Electrisch')) As afkeure,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur),0) From BEWERKINGUITVAL,UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and ifnull(UITVAL.uitvalsoort,'') not in ('Electrisch','Mechanisch')) As afkeuro,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie),0) From BEWERKINGUITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer) As reparatie,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie),0) From BEWERKINGUITVAL,UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and UITVAL.uitvalsoort in ('Mechanisch')) As reparatiem,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie),0) From BEWERKINGUITVAL,UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and UITVAL.uitvalsoort in ('Electrisch')) As reparatiee,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie),0) From BEWERKINGUITVAL,UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and ifnull(UITVAL.uitvalsoort,'') not in ('Electrisch','Mechanisch')) As reparatieo
From
BEWERKING inner Join
PRODUCT On BEWERKING.Productnummer = PRODUCT.Productnummer`;
        //
        where += Util.addAnd(where);
        where += `not ISNULL(BEWERKING.einddatumtijd)
and startdatumtijd >= screendate2date('${startstatistiek}')`;

        if (query.productnummer != '') {
            where += Util.addAnd(where);
            where += `ucase(PRODUCT.productnummer) like ucase('${query.productnummer}%')`;
        }
        if (query.klant.trim() != '') {
            where += Util.addAnd(where);
            where += `PRODUCT.productnummer in (
select productnummer from PRODUCTVRAAG 
where klantnaam = trim('${query.klant}'))`;
        }
        if (query.soort.substr(0, 1) == 'M') {
            where += Util.addAnd(where);
            where += `PRODUCT.soort = 'M'`;
        } else if (query.soort.substr(0, 1) == 'V') {
            where += Util.addAnd(where);
            where += `PRODUCT.soort = 'V'`;
        }
        if (query.van != '') {
            where += Util.addAnd(where);
            where += `
(screendate2date('${query.van}') <= 
(SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW
WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
AND NOT EXISTS (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
AND BEWERKINGFLOW.einddatumtijd is null)))`;
        }
        if (query.tm != '') {
            where += Util.addAnd(where);
            where += `
(screendate2date('${query.tm}) >=
(SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW
WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
AND NOT EXISTS (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
AND BEWERKINGFLOW.einddatumtijd is null)))`;
        }
        sql += `
${where}
) Base`;

        if (query.lijn.trim() != '') {
            sql += `
where Base.lijn = trim('${query.lijn}')`;
        }

        sql += `
group by Lijn, Productnummer
order by cast(percuitval as decimal) desc,lijn,productnummer,cast(min_id as decimal)
) Somregel`;
        //
        where = '';
        if (query.aantalvan != '') {
            where += Util.addAnd(where);
            where += `aantal >= ${query.aantalvan}`;
        }
        if (query.uitvalvan != '') {
            where += Util.addAnd(where);
            where += `percuitval >= ${query.uitvalvan}`;
        }
        if (query.afkeurvan != '') {
            where += Util.addAnd(where);
            where += `percafkeur >= ${query.afkeurvan}`;
        }
        if (query.reparatievan != '') {
            where += Util.addAnd(where);
            where += `percreparatie >= ${query.reparatievan}`;
        }

        sql += `
${where}`;

        if (query.top != '') {
            sql += `
LIMIT 0,${query.top}`;
        }

        sql += `
) topsel`;

        if (query.action == 'gentot') {
            sql += `
) Genregel`;
        }
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
