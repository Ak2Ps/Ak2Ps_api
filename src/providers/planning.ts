
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "planning",
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

export class Planning extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doDropBerekening(req: Request, res: Response, next: NextFunction) {
        let istemp = 'TEMPORARY';
        let sql = '';
        //
        sql = `DROP ${istemp} table berekening_sqlpartaantal`;
        await db.waitQuery(res.crudConnection, sql);
        //
        sql = `DROP ${istemp} table berekening_sqlpartstartaantal`;
        await db.waitQuery(res.crudConnection, sql);
        //
        sql = `DROP ${istemp} table berekening_sqlparttijd`;
        await db.waitQuery(res.crudConnection, sql);
        //
        sql = `DROP ${istemp} table berekening_sqlpartbewerkingen`;
        await db.waitQuery(res.crudConnection, sql);
        //
        sql = `DROP ${istemp} table berekening_sqlpartopdrachten`;
        await db.waitQuery(res.crudConnection, sql);
        //
        sql = `DROP ${istemp} table berekening`;
        await db.waitQuery(res.crudConnection, sql);
        //
        return;
    }

    protected async doCreateBerekening(req: Request, res: Response, next: NextFunction) {
        let istemp = 'TEMPORARY';
        let sql = '';
        let where = '';
        let performancestart = await Util.waitParam(req, res, next, 'PERFORMANCESTART')
        let productnummer = db.fix(req.query.productnummer || '');
        let is = db.fix(req.query.is || '');
        //
        if (productnummer != '') {
            if (where == '') {
                where += `\nwhere `;
            } else {
                where += `\nand `;
            }
            if (Number(is) == 1) {
                where += `productnummer = '${productnummer}'`;
            } else {
                where += `ucase(productnummer) like ucase('${productnummer}%')`;
            }
        }
        //
        // Aantal
        //
        sql = `
CREATE ${istemp} TABLE berekening_sqlpartaantal AS 
SELECT 
SUM(BEWERKINGFLOW.bewerkingaantal) AS sqlpartaantal,
E.productnummer 
FROM 
BEWERKINGFLOW,
(select * from BEWERKING ${where}) E
WHERE BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer
AND E.einddatumtijd IS NOT NULL
AND E.startdatumtijd >= screendate2date('${performancestart}')
AND EXISTS ( SELECT 1 FROM BEWERKINGSOORT
WHERE BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
AND BEWERKINGSOORT.voortgang = 1)
AND EXISTS ( SELECT 1 FROM BEWERKINGTIJD
WHERE BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id)
GROUP BY e.productnummer`;
        await db.waitQuery(res.crudConnection, sql);
        //
        // startaantal
        //
        sql = `
CREATE ${istemp} TABLE berekening_sqlpartstartaantal AS
SELECT
SUM(startaantal) AS sqlpartstartaantal,
F.productnummer
FROM
(select * from BEWERKING ${where}) F
WHERE F.einddatumtijd IS NOT NULL
AND F.startdatumtijd >= screendate2date('${performancestart}')
GROUP BY F.productnummer`;
        await db.waitQuery(res.crudConnection, sql);
        //
        // tijd
        //
        sql = `
CREATE ${istemp} TABLE berekening_sqlparttijd AS
SELECT
SUM(BEWERKINGTIJD.tijd) AS sqlparttijd,
c.productnummer
FROM
BEWERKINGTIJD,
BEWERKINGFLOW,
(select * from BEWERKING ${where} ) C
WHERE BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
AND BEWERKINGTIJD.bewerkingsnummer = C.bewerkingsnummer
AND C.einddatumtijd IS NOT NULL
AND C.startdatumtijd >= screendate2date('${performancestart}')
GROUP BY c.productnummer`;
        await db.waitQuery(res.crudConnection, sql);
        //
        // bewerkingflows
        //
        sql = `
CREATE ${istemp} TABLE berekening_sqlpartbewerkingen AS
SELECT
COUNT(DISTINCT BEWERKINGFLOW.bewerkingsoort) AS sqlpartbewerkingen,
E.PRODUCTNUMMER
FROM
BEWERKINGFLOW,
(select * from BEWERKING ${where}) E
WHERE BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer
AND E.einddatumtijd IS NOT NULL
AND E.startdatumtijd >= screendate2date('${performancestart}')
AND EXISTS(SELECT 1 FROM BEWERKINGSOORT
WHERE BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
AND BEWERKINGSOORT.voortgang = 1)
AND EXISTS(SELECT  1 FROM BEWERKINGTIJD
WHERE BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id)
GROUP BY E.PRODUCTNUMMER`;
        await db.waitQuery(res.crudConnection, sql);
        //
        // Bewerkingen
        //
        sql = `
CREATE ${istemp} TABLE berekening_sqlpartopdrachten AS
SELECT
COUNT(DISTINCT E.bewerkingsnummer) AS sqlpartopdrachten,
E.PRODUCTNUMMER
FROM
BEWERKINGFLOW,
(select * from BEWERKING ${where}) E
WHERE BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer
AND E.einddatumtijd IS NOT NULL
AND E.startdatumtijd >= screendate2date('${performancestart}')
AND EXISTS(SELECT 1 FROM BEWERKINGSOORT
WHERE BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
AND BEWERKINGSOORT.voortgang = 1)
GROUP BY E.PRODUCTNUMMER`;
        await db.waitQuery(res.crudConnection, sql);
        //
        // totaal
        //
        sql = `
CREATE ${istemp} TABLE berekening AS
SELECT
berekening_sqlparttijd.productnummer,
sqlparttijd,
sqlpartaantal,
sqlpartstartaantal sqlpartopdrachten,
sqlpartbewerkingen,
CONCAT(ROUND(60 * (sqlpartstartaantal / sqlparttijd)),
' uit ',
sqlpartopdrachten,
' * ',
sqlpartbewerkingen) AS berekening,
ROUND(60 * (sqlpartstartaantal / sqlparttijd)) AS gemiddeld,
0 AS nodig
FROM
berekening_sqlparttijd,
berekening_sqlpartaantal,
berekening_sqlpartstartaantal,
berekening_sqlpartopdrachten,
berekening_sqlpartbewerkingen
WHERE berekening_sqlparttijd.productnummer = berekening_sqlpartaantal.productnummer
AND berekening_sqlparttijd.productnummer = berekening_sqlpartstartaantal.productnummer
AND berekening_sqlparttijd.productnummer = berekening_sqlpartopdrachten.productnummer
AND berekening_sqlparttijd.productnummer = berekening_sqlpartbewerkingen.productnummer`;
        await db.waitQuery(res.crudConnection, sql);
        //
        sql = `
alter table berekening add index berekening_i1(productnummer)`;
        await db.waitQuery(res.crudConnection, sql);
        //
        return;
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixBody(req.query);
        let sql = '';
        let where = '';
        let orderby = '';
        let sqlpartstandhtml = '';
        //
        res.crudConnection = await db.waitConnection();
        //
        if (query.assets == "") {
            query.assets = "images/";
        } else {
            query.assets = "assets/image/";
        }
        //
        let startstatistiek = await Util.waitParam(req, res, next, 'STARTSTATISTIEK');
        if (startstatistiek == '') {
            startstatistiek = '01-01-2015';
        }
        let performancestart = await Util.waitParam(req, res, next, 'PERFORMANCESTART');
        if (performancestart == '') {
            performancestart = '01-01-2015';
        }
        //
        // berekening
        //
        if (query.action == "werkvoorbereiding") {
            await this.doCreateBerekening(req, res, next);
        }
        //
        //
        //
        if (query.bewerkingsnummer != '') {
            where += Util.addAnd(where);
            where += `bewerkingsnummer = '${query.bewerkingsnummer}'`;
        }
        if (query.productnummer != '') {
            where += Util.addAnd(where);
            if (Number(query.is) == 1) {
                where += `productnummer = '${query.productnummer}'`;
            } else {
                where += `ucase(productnummer) like ucase('${query.productnummer}%')`;
            }
        }
        if (query.open == 'Nee') {
            where += Util.addAnd(where);
            where += `not isnull(einddatumtijd)`;
        }
        if (query.open == 'Ja') {
            where += Util.addAnd(where);
            where += `isnull(einddatumtijd)`;
        }
        if (query.selR == 'Nee') {
            where += Util.addAnd(where);
            where += `bewerkingsnummer not like 'R%'`;
        }
        if (query.selR == 'Ja') {
            where += Util.addAnd(where);
            where += `bewerkingsnummer like 'R%'`;
        }
        if (query.seltm != '') {
            where += Util.addAnd(where);
            where += `plandatumtijd <= screendate2date('${query.seltm}')`;
        }
        if (query.bewerkingsoort != '') {
            where += Util.addAnd(where);
            where += `exists (
select 1 from BEWERKINGFLOW
where BEWERKING.bewerkingsnummer = BEWERKINGFLOW.bewerkingsnummer
and BEWERKINGFLOW.bewerkingsoort in
(select bewerkingsoort from BEWERKINGSOORT 
where bewerkingsoort.naam = '${query.bewerkingsoort}')
and BEWERKINGFLOW.einddatumtijd is null
)`;
        }
        //
        //
        //
        if (query.action == "lijnplanning" || query.action == "lijnplanning2") {
            //
            // Als er 1 open is, dan open:
            // dus max(<img src=query.assets . "bewerkingopen.png"></img>, <img src="images/bewerkingclosed.png"></img>)
            // (textuele volgorde: "open" is hoger dan "closed"
            //
            sqlpartstandhtml =
                `
select group_concat(distinct
concat(
'<span style="white-space:nowrap;color:black;background-color:',BEWERKINGSOORT.kleur,'">',
BEWERKINGSOORT.afkorting,'(',
(select sum(case when einddatumtijd is null then 0 else bewerkingaantal end)
from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer
and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
),
')',
'</span>',
(select max(
case when einddatumtijd is null then '<img src="${query.assets}bewerkingopen.png"></img>' 
else '<img src="${query.assets}bewerkingclosed.png"></img>'
end)
from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer
and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
)
)
order by volgnummer)
from BEWERKINGFLOW,BEWERKINGSOORT
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
and BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer`;
        } else {
            //
            // Als er 1 open is, dan open:
            // dus max(<img src="images/bewerkingopen.png"></img>, <img src="images/bewerkingclosed.png"></img>)
            // (textuele volgorde: "open" is hoger dan "closed"
            //
            sqlpartstandhtml =
                `select group_concat(distinct
concat(
'<span style="white-space:nowrap;color:black;background-color:',BEWERKINGSOORT.kleur,'">',
BEWERKINGSOORT.afkorting,
'</span>',
(select max(
case when einddatumtijd is null then '<img src="${query.assets}bewerkingopen.png"></img>'
else '<img src="${query.assets}bewerkingclosed.png"></img>'
end)
from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer
and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
)
)
order by volgnummer)
from BEWERKINGFLOW,BEWERKINGSOORT
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
and BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer`;
        }
        //
        // Hier begint de sql
        //
        sql = `
select *,  
null as CRUD,
concat(ifnull(bewerkt,0),' / ',gepland,' (',ifnull(aantalbewerking,0),')') as stand,
(${sqlpartstandhtml}) as standhtml,
(select productnaam from PRODUCT 
where PRODUCT.PRODUCTNUMMER = BASE.productnummer) 
as productnaam,
date2screendate(bewerkingplandatumtijd) as BEWERKINGPLAN,
date2screendate(bewerkingeinddatumtijd) as BEWERKINGEIND,`;
        //
        if (query.action == "werkvoorbereiding") {
            sql += `\nberekening, gemiddeld, 0 as nodig`;
        } else {
            sql += `\n0 as berekening, 0 as gemiddeld, 0 as nodig`;
        }
        //
        //
        // Bewerkingen
        //
        sql += `
from (
select 'B' as type, 
id,
null as actienummer,
bewerkingsnummer,
initstartdatumtijd,
startdatumtijd,
einddatumtijd,
plandatumtijd,
adviesplandatumtijd,
exactplandatumtijd,
(select min(plandatumtijd) from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER
and BEWERKINGFLOW.einddatumtijd IS NULL`;
        if (query.bewerkingsoort != '') {
            sql += `
and BEWERKINGFLOW.bewerkingsoort = 
(select bewerkingsoort from BEWERKINGSOORT 
where naam = '${query.bewerkingsoort}')`;
        }
        sql += `
) as bewerkingplandatumtijd,
(select max(einddatumtijd) from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER`;
        if (query.bewerkingsoort != '') {
            sql += `
and BEWERKINGFLOW.bewerkingsoort = 
(select bewerkingsoort from BEWERKINGSOORT 
where naam = '${query.bewerkingsoort}')`;
        }
        sql += `
)  as bewerkingeinddatumtijd,
date2screendate(initstartdatumtijd) as INITDATUM,
date2screendate(startdatumtijd) as START,
date2screendate(plandatumtijd) as PLAN,
date2screendate(adviesplandatumtijd) as ADVIESPLAN,
date2screendate(exactplandatumtijd) as EXACTPLAN,
date2screendate(einddatumtijd) as EIND,
Eindcontrolenummer,
Productnummer,
Productieaantal,
Startaantal,
(select case when performance = 0 then '' else performance end 
from PRODUCT where PRODUCT.productnummer = BEWERKING.productnummer) 
as Performance,
Opmerking,
(select max(lijn) from PRODUCT productlijnprd 
where productlijnprd.productnummer = BEWERKING.productnummer) as productlijn,
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
(select count(distinct(bewerkingsoort)) from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER
and exists( 
select 1 from BEWERKINGSOORT 
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort 
and BEWERKINGSOORT.voortgang = 1))
as aantalbewerking,
(select sum(bewerkingaantal) from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER)
as gepland,
(select sum(bewerkingaantal) from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER 
and BEWERKINGFLOW.einddatumtijd is not null)
as bewerkt,
(select sum(tijd) from BEWERKINGFLOW,BEWERKINGTIJD
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER 
and BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id)
as besteed,
(select sum(uitval) from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER)
as aantaluitval,
(select sum(aantalafkeur) from BEWERKINGUITVAL 
where BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) 
as aantalafkeur,
(select sum(aantalreparatie) from BEWERKINGUITVAL 
where BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) 
as aantalreparatie,
'' as kurk
from BEWERKING`;
        sql += `
${where}`;
        //
        // Orders voor producten die geproduceerd worden (met een lijn)
        //
        if (query.action != "lijnplanning2") {
            sql += `
union all
select 'O' as type, PRODUCTVOORRAAD.id,
PRODUCTVOORRAAD.actienummer,
'Order' as bewerkingsnummer,
PRODUCTVOORRAAD.voorraaddatumtijd as initstartdatumtijd,
PRODUCTVOORRAAD.voorraaddatumtijd as startdatumtijd,
null as einddatumtijd,
PRODUCTVOORRAAD.voorraaddatumtijd as plandatumtijd,
null as adviesplandatumtijd,
null as exactplandatumtijd,
PRODUCTVOORRAAD.voorraaddatumtijd as bewerkingplandatumtijd,
null as bewerkingeinddatumtijd,
date2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as INITDATUM,
date2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as START,
date2screendate(PRODUCTVOORRAAD.actiedatumtijd) as PLAN,
null as ADVIESPLAN,
null as EXACTPLAN,
null as eind,
null as eindcontrolenummer, 
PRODUCTVOORRAAD.productnummer,
case when PRODUCTVOORRAAD.voorraad >= PRODUCTVOORRAAD.actievoorraad 
then PRODUCTVOORRAAD.voorraad * -1 
else PRODUCTVOORRAAD.actievoorraad * -1 end 
as productieaantal,
PRODUCTVOORRAAD.voorraad as startaantal,
(select case when performance = 0 
then '' else performance end 
from PRODUCT 
where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer) 
as performance,
PRODUCTVOORRAAD.actievoorraad as opmerking,
(select max(lijn) from PRODUCT productlijnprd where productlijnprd.productnummer = PRODUCT.productnummer) as productlijn,
if ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)) is not null,
(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)),
if ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer) is not null,
(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer),
null
)
) as lijn,
null as aantalbewerking,
null as gepland,
null as bewerking,
null as besteed,
null as aantaluitval,
null as aantalafkeur,
null as aantalreparatie,
concat(date2screendate(PRODUCTVOORRAAD.beperkdatumtijd),' ',beperknummer) as KURK
from PRODUCTVOORRAAD 
inner join PRODUCT on (PRODUCTVOORRAAD.productnummer = PRODUCT.productnummer)`;
            //
            where = '';
            if (query.bewerkingsnummer != '') {
                where += Util.addAnd(where);
                where += `PRODUCTVOORRAAD.productnummer = '----------'`;
            }
            if (query.productnummer != '') {
                where += Util.addAnd(where);
                if (Number(query.is) == 1) {
                    where += `PRODUCTVOORRAAD.productnummer = '${query.productnummer}'`;
                } else {
                    where += `ucase(PRODUCTVOORRAAD.productnummer) like ucase('${query.productnummer}%')`;
                }
            }
            if (query.sel44 == 'Nee') {
                where += Util.addAnd(where);
                where += `
(PRODUCTVOORRAAD.voorraaddatumtijd < screendate2date('01-01-2044')
or PRODUCTVOORRAAD.voorraaddatumtijd > screendate2date('31-12-2044'))`;
            }
            if (query.seltm != '') {
                where += Util.addAnd(where);
                where += `
date(PRODUCTVOORRAAD.voorraaddatumtijd) <= screendate2date('${query.seltm}')`;
            }
            //
            // Alleen orders die lijden tot een negatieve voorraad
            //
            if (1 == 1) {
                where += Util.addAnd(where);
                where += `PRODUCTVOORRAAD.actievoorraad < 0`;
            }
            //
            where += Util.addAnd(where);
            where += `PRODUCTVOORRAAD.actie = 'VE'`;
            //
            sql += `
${where}`;
        }
        //
        // Onderdelen voor producten die geproduceerd worden (met een lijn)
        //
        if (query.action != "lijnplanning2") {
            sql += `
union all
select 'OB' as type, 
PRODUCTVOORRAAD.id,
PRODUCTVOORRAAD.actienummer,
'Nodig' as bewerkingsnummer,
PRODUCTVOORRAAD.voorraaddatumtijd as initstartdatumtijd,
PRODUCTVOORRAAD.voorraaddatumtijd as startdatumtijd,
null as einddatumtijd,
PRODUCTVOORRAAD.voorraaddatumtijd as plandatumtijd,
null as adviesplandatumtijd,
null as exactplandatumtijd,
PRODUCTVOORRAAD.voorraaddatumtijd as bewerkingplandatumtijd,
null as bewerkingeinddatumtijd,
'' as INITDATUM,
'' as START,
date2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as PLAN,
null as ADVIESPLAN,
null as EXACTPLAN,
null as eind,
null as eindcontrolenummer,
PRODUCTVOORRAAD.productnummer,
case when PRODUCTVOORRAAD.voorraad >= PRODUCTVOORRAAD.actievoorraad 
then PRODUCTVOORRAAD.voorraad * -1 
else PRODUCTVOORRAAD.actievoorraad * -1 end 
as productieaantal,
PRODUCTVOORRAAD.voorraad as startaantal,
(select case when Performance = 0 then '' 
else performance end 
from PRODUCT 
where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer)
as performance,
PRODUCTVOORRAAD.actievoorraad as opmerking,
(select max(lijn) from PRODUCT productlijnprd 
where productlijnprd.productnummer = PRODUCT.productnummer) 
as productlijn,
if ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)) is not null,
(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)),
if ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer) is not null,
(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer),
null
)
) as lijn,
null as aantalbewerking,
null as gepland,
null as bewerking,
null as besteed,
null as aantaluitval,
null as aantalafkeur,
null as aantalreparatie,
concat(date2screendate(PRODUCTVOORRAAD.beperkdatumtijd),' ',beperknummer) as KURK
from PRODUCTVOORRAAD 
inner join PRODUCT 
on (PRODUCTVOORRAAD.productnummer = PRODUCT.productnummer)`;
            //
            where = '';
            if (query.bewerkingsnummer != '') {
                where += Util.addAnd(where);
                where += `PRODUCTVOORRAAD.productnummer = '----------'`;
            }
            if (query.productnummer != '') {
                where += Util.addAnd(where);
                if (Number(query.is) == 1) {
                    where += `PRODUCTVOORRAAD.productnummer = '${query.productnummer}'`;
                } else {
                    where += `ucase(PRODUCTVOORRAAD.productnummer) like ucase('${query.productnummer}%')`;
                }
            }
            if (query.seltm != '') {
                where += Util.addAnd(where);
                where += `PRODUCTVOORRAAD.voorraaddatumtijd <= screendate2date('${query.seltm}')`;
            }
            //
            // Alleen orders die lijden tot een negatieve voorraad
            //
            if (1 == 1) {
                where += Util.addAnd(where);
                where += `PRODUCTVOORRAAD.actievoorraad < 0`;
            }
            //
            where += Util.addAnd(where);
            where += `PRODUCTVOORRAAD.actie = 'OP'`;
            //
            sql += `
${where}`;
        }
        //
        // Algemeen
        //
        sql += `
) BASE` ;
        if (query.action == "werkvoorbereiding") {
            sql += `
left join (
select 
berekening.productnummer as berekening_productnummer,
berekening as berekening,
gemiddeld,
nodig 
from berekening) ber
on berekening_productnummer = BASE.productnummer`;
        }
        where = '';
        if (query.productlijn != '') {
            where += Util.addAnd(where);
            where += `productlijn = '${query.productlijn}'`;
        }
        if (query.lijn != '') {
            where += Util.addAnd(where);
            where += `lijn = '${query.lijn}'`;
        }
        if (query.action == "lijnplanning" || query.action == "lijnplanning2") {
            where += Util.addAnd(where);
            where += `lijn != ''`;
        }
        if (query.selR == 'Ja') {
            where += Util.addAnd(where);
            where = `productnummer in (
select productnummer from BEWERKING 
where bewerkingsnummer like 'R%)`;
        }

        if (query.seltm != '') {
            where += Util.addAnd(where);
            if (query.action == "planning") {
                where += `bewerkingplandatumtijd <= screendate2date('${query.seltm}')`;
            } else {
                where += `plandatumtijd <= screendate2date('${query.seltm}')`;
            }
        }

        sql += `
${where}`;

        if (query.action == 'planning') {
            orderby = 'Lijn,bewerkingplandatumtijd,Plandatumtijd,Bewerkingsnummer';
        } else if (query.action == 'lijnplanning' || query.action == "lijnplanning2") {
            orderby = 'Plandatumtijd,Lijn,bewerkingplandatumtijd,Bewerkingsnummer';
        } else {
            orderby = 'Lijn,Plandatumtijd,Bewerkingsnummer';
        }
        sql += `
order by ${orderby}`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        if (query.action == "werkvoorbereiding") {
            this.doDropBerekening(req, res, next);
        }
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixBody(req.body);
        let sql = '';
        let where = ''
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        if (body.CRUD == 'D') {
            if (body.TYPE == 'B') {
                sql = `
delete from BEWERKING
where id = '${id}'`;
                await db.waitQuery(res.crudConnection, sql);
            } else {
                Util.unknownOperation(req, res, next);
                return;
            }
        } else {
            if (body.TYPE == 'B') {
                if (Number(body.STARTAANTAL) < Number(body.PRODUCTIEAANTAL)) {
                    body.STARTAANTAL = body.PRODUCTIEAANTAL;
                }
                if (body.BEWERKINGSNUMMER == 'Order') {
                    body.BEWERKINGSNUMMER = '???';
                }
                sql = `
update BEWERKING set
Bewerkingsnummer =  '${body.BEWERKINGSNUMMER}',
Startdatumtijd =screendate2date('${body.START}'),
Lijn =  '${body.LIJN}',
Plandatumtijd =screendate2date('${body.PLAN}'),
Einddatumtijd =screendate2date('${body.EIND}'),
Eindcontrolenummer =  '${body.EINDCONTROLENUMMER}',
Productnummer = '${body.PRODUCTNUMMER}',
Productieaantal = '${body.PRODUCTIEAANTAL}',
Startaantal = '${body.STARTAANTAL}'
where id = '${id}'`;
                await db.waitQuery(res.crudConnection, sql);
                //
                sql = `
update PRODUCT set
Performance =  '${body.PERFORMANCE}'
where Productnummer = '${body.PRODUCTNUMMER}'`;
                await db.waitQuery(res.crudConnection, sql);
            } else if (body.TYPE == 'O') {
                sql = `
update PRODUCT set
Performance =  '${body.PERFORMANCE}'
where Productnummer = '${body.PRODUCTNUMMER}'`;
                await db.waitQuery(res.crudConnection, sql);
            } else if (body.TYPE == 'OB') {
                sql = `
update PRODUCT set
Performance =  '${body.PERFORMANCE}'
where Productnummer = '${body.PRODUCTNUMMER}'`;
                await db.waitQuery(res.crudConnection, sql);
            } else {
                Util.unknownOperation(req, res, next);
                return;
            }
        }
        //
        res.crudConnection.release();
        res.status(200).send(body);
        return;
    }

    protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixQuery(req.body);
        res.crudConnection = await db.waitConnection();
        //
        if (body.STARTAANTAL < body.PRODUCTIEAANTAL) {
            body.STARTAANTAL = body.PRODUCTIEAANTAL;
        }
        let sql = '';
        sql = `
insert into BEWERKING
(bewerkingsnummer,startdatumtijd,lijn,plandatumtijd,einddatumtijd,eindcontrolenummer,
Productnummer,ProductieaantalStartaantal,
Opmerking)
values (
'${body.BEWERKINGSNUMMER}',
screendate2date('${body.START}'),
'${body.LIJN}',
screendate2date('${body.PLAN}'),
screendate2date('${body.EIND}'),
'${body.EINDCONTROLENUMMER}',
'${body.PRODUCTNUMMER}',
'${body.PRODUCTIEAANTAL}',
'${body.STARTAANTAL}',
'${body.OPMERKING}')`;
        let result = await db.waitQuery(res.crudConnection, sql);
        body.ID = db.getInsertId(result);
        //
        sql = `
update PRODUCT set
Performance =  '${body.PERFORMANCE}'
where Productnummer = '${body.PRODUCTNUMMER}'`;
        await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(body);
        return;
    }

    protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixQuery(req.body);
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        let sql = `
delete from bewerking
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
            Util.unknownOperation(req, res, next);
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
