
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "bewerkinguitvalrap",
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

export class Bewerkinguitvalrap extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doSelect(req: Request, res: Response, next: NextFunction, options?: Dict) {
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
        let action = db.fix(req.query.action||'');
        //
        let lijn = db.fix(req.query.lijn || '');
        let soort = db.fix(req.query.soort || '');
        let klant = db.fix(req.query.klant || '');
        let productnummer = db.fix(req.query.productnummer || '');
        let van = db.fix(req.query.van || '');
        let tm = db.fix(req.query.tm || '');
        let top = db.fix(req.query.top || '');
        let uitvalvan = db.fix(req.query.uitvalvan || '');
        let afkeurvan = db.fix(req.query.afkeurvan || '');
        let reparatievan = db.fix(req.query.reparatievan || '');
        let aantalvan = db.fix(req.query.aantalvan || '');
        //            
        let sql = '';
        let where = '';
        //
        res.crudConnection = await db.waitConnection();
        let startstatistiek = await Util.waitParam(req, res, next, 'STARTSTATISTIEK');
        //
        sql = `
select *, 		
@rownum := @rownum + 1 as vlnr
from(`;


        if (action == 'gentot') {
            sql += `
select
' ' as id,
' ' as bewerkingsnummer,
' ' as EIND,
' ' as Lijn,
' ' as Productnummer,
' ' as productnaam,
' ' as soort,
count(*) as aantalbewerkingen,
sum(aantal) as aantal,
sum(Uitval) as uitval,
case when sum(aantal) > 0 then round(sum(uitval) / sum(aantal) * 100, 2) else '0.00' end as percuitval,
sum(afkeur) as afkeur,
case when sum(aantal) > 0 then round(sum(afkeur) / sum(aantal) * 100, 2) else '0.00' end as percafkeur,
sum(afkeurm) as afkeurm,
case when sum(aantal) > 0 then round(sum(afkeurm) / sum(aantal) * 100, 2) else '0.00' end as percafkeurm,
sum(afkeure) as afkeure,
case when sum(aantal) > 0 then round(sum(afkeure) / sum(aantal) * 100, 2) else '0.00' end as percafkeure,
sum(afkeuro) as afkeuro,
case when sum(aantal) > 0 then round(sum(afkeuro) / sum(aantal) * 100, 2) else '0.00' end as percafkeuro,
sum(reparatie) as reparatie,
case when sum(aantal) > 0 then round(sum(reparatie) / sum(aantal) * 100, 2) else '0.00' end as percreparatie,
sum(reparatiem) as reparatiem,
case when sum(aantal) > 0 then round(sum(reparatiem) / sum(aantal) * 100, 2) else '0.00' end as percreparatiem,
sum(reparatiee) as reparatiee,
case when sum(aantal) > 0 then round(sum(reparatiee) / sum(aantal) * 100, 2) else '0.00' end as percreparatiee,
sum(reparatieo) as reparatieo,
case when sum(aantal) > 0 then round(sum(reparatieo) / sum(aantal) * 100, 2) else '0.00' end as percreparatieo
from(`;
        }

        sql += `
select * from (
select * from 
(select min(id) as min_id,
Bewerkingsnummer,
date2screendate(einddatumtijd) as EIND,
Lijn,
Productnummer,
min(productnaam) as productnaam,
min(soort) as soort,
' ' as aantalbewerkingen,
sum(Startaantal) as aantal,
sum(Uitval) as uitval,
case when sum(startaantal) > 0 then round(sum(uitval) / sum(startaantal) * 100, 2) else '0.00' end as percuitval,
sum(afkeur) as afkeur,
case when sum(startaantal) > 0 then round(sum(afkeur) / sum(startaantal) * 100, 2) else '0.00' end as percafkeur,
sum(afkeurm) as afkeurm,
case when sum(startaantal) > 0 then round(sum(afkeurm) / sum(startaantal) * 100, 2) else '0.00' end as percafkeurm,
sum(afkeure) as afkeure,
case when sum(startaantal) > 0 then round(sum(afkeure) / sum(startaantal) * 100, 2) else '0.00' end as percafkeure,
sum(afkeuro) as afkeuro,
case when sum(startaantal) > 0 then round(sum(afkeuro) / sum(startaantal) * 100, 2) else '0.00' end as percafkeuro,
sum(reparatie) as reparatie,
case when sum(startaantal) > 0 then round(sum(reparatie) / sum(startaantal) * 100, 2) else '0.00' end as percreparatie,
sum(reparatiem) as reparatiem,
case when sum(startaantal) > 0 then round(sum(reparatiem) / sum(startaantal) * 100, 2) else '0.00' end as percreparatiem,
sum(reparatiee) as reparatiee,
case when sum(startaantal) > 0 then round(sum(reparatiee) / sum(startaantal) * 100, 2) else '0.00' end as percreparatiee,
sum(reparatieo) as reparatieo,
case when sum(startaantal) > 0 then round(sum(reparatieo) / sum(startaantal) * 100, 2) else '0.00' end as percreparatieo
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
BEWERKING.Bewerkingsnummer,
BEWERKING.Productnummer,
PRODUCT.Productnaam,
BEWERKING.Einddatumtijd,
ifnull(BEWERKING.startaantal, 0) as startaantal,
(SELECT max(BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW
WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
AND NOT EXISTS(select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
AND BEWERKINGFLOW.einddatumtijd is null)) as ak2einddatumtijd,
(Select ifnull(Sum(BEWERKINGFLOW.Uitval), 0) From BEWERKINGFLOW
Where BEWERKINGFLOW.Bewerkingsnummer = BEWERKING.Bewerkingsnummer) As uitval,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur), 0) From BEWERKINGUITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer) As afkeur,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur), 0) From BEWERKINGUITVAL, UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and UITVAL.uitvalsoort in ('Mechanisch')) As afkeurm,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur), 0) From BEWERKINGUITVAL, UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and UITVAL.uitvalsoort in ('Electrisch')) As afkeure,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur), 0) From BEWERKINGUITVAL, UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and ifnull(UITVAL.uitvalsoort, '') not in ('Electrisch','Mechanisch')) As afkeuro,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie), 0) From BEWERKINGUITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer) As reparatie,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie), 0) From BEWERKINGUITVAL, UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and UITVAL.uitvalsoort in ('Mechanisch')) As reparatiem,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie), 0) From BEWERKINGUITVAL, UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and UITVAL.uitvalsoort in ('Electrisch')) As reparatiee,
(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie), 0) From BEWERKINGUITVAL, UITVAL
Where BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer
And BEWERKINGUITVAL.uitval = UITVAL.uitval
and ifnull(UITVAL.uitvalsoort, '') not in ('Electrisch','Mechanisch')) As reparatieo
From
BEWERKING inner Join
PRODUCT On BEWERKING.Productnummer = PRODUCT.Productnummer`;

        if (where == '') {
            where += `\nwhere `;
        } else {
            where += `\nand `;
        }
        where += `
not ISNULL(BEWERKING.einddatumtijd)
and startdatumtijd >= screendate2date('${startstatistiek}')`;

        if (productnummer != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `PRODUCT.productnummer like ('${productnummer}%')`;
        }
        if (klant.trim() != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `PRODUCT.productnummer in (select productnummer from PRODUCTVRAAG where klantnaam = trim('${klant}'))`;
        }
        if (soort.substr(0, 1) == 'M') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `PRODUCT.soort = 'M'`;
        } else if (soort.substr(0, 1) == 'V') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `PRODUCT.soort = 'V'`;
        }
        if (van != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `(screendate2date('${van}') <=
(SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW 
WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
AND NOT EXISTS (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
AND BEWERKINGFLOW.einddatumtijd is null)))`;
        }
        if (tm != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `(screendate2date('${tm}') >=
(SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW
WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
AND NOT EXISTS (
select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
AND BEWERKINGFLOW.einddatumtijd is null)))`;
        }
        sql += `
${where}
) Base`;

        if (lijn.trim() != '') {
            sql += `
where base.lijn = trim('${lijn}')`;
        }

        sql += `
group by Bewerkingsnummer
order by cast(percuitval as decimal) desc,lijn,bewerkingsnummer,min_id
) Somregel`;
        //
        where = '';
        if (aantalvan != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `aantal >= ${aantalvan}`;
        }
        if (uitvalvan != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `percuitval >= ${uitvalvan}`;
        }
        if (afkeurvan != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `percafkeur >= ${afkeurvan}`;
        }
        if (reparatievan != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            where += `percreparatie >= ${reparatievan}`;
        }
        sql += where;
        if (top != '') {
            sql += `\nLIMIT 0,${top}`;
        }

        sql += `\n) topsel`;

        if (action == 'gentot') {
            sql += `\n) Genregel`;
        }

        sql += `\n) vlnrregel, (select @rownum:=0) rownumregel`;
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
        if (method == "GET") {
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
