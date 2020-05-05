
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "retourrap",
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

export class Retourrap extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixQuery(req.query);
        let sql = '';
        let rows: any;
        let row: any;
        let result = '';
        //
        res.crudConnection = await db.waitConnection();
        //
        let where = '';
        let gereedwhere = '';
        let startwhere = '';
        let startwhere2 = '';
        let productgereedwhere = '';
        let startgereed = '';
        //
        if (query.datumvanaf != '') {
            if (startwhere != '') {
                startwhere += '\nand ';
            }
            startwhere += `RETOUR.startdatumtijd >= screendate2date('${query.datumvanaf}')`;
        }
        if (query.datumvanaf != '') {
            if (gereedwhere != '') {
                gereedwhere += '\nand ';
            }
            gereedwhere += `RETOUR.gereeddatumtijd >= screendate2date('${query.datumvanaf}')`;
        }
        if (query.datumvanaf != '') {
            if (productgereedwhere != '') {
                productgereedwhere += '\nand ';
            }
            productgereedwhere += `BEWERKING.einddatumtijd >= screendate2date('${query.datumvanaf}')`;
        }
        //
        if (query.datumtm != '') {
            if (startwhere != '') {
                startwhere += '\nand ';
            }
            startwhere += `RETOUR.startdatumtijd <= screendate2date('${query.datumtm}')`;
        }
        if (query.datumtm != '') {
            if (productgereedwhere != '') {
                productgereedwhere += '\nand ';
            }
            productgereedwhere += `BEWERKING.einddatumtijd <= screendate2date('${query.datumtm}')`;
        }
        if (query.datumtm != '') {
            if (gereedwhere != '') {
                gereedwhere += '\nand ';
            }
            gereedwhere += `RETOUR.gereeddatumtijd <= screendate2date('${query.datumtm}')`;
        }
        //
        // RAP1 Afgehandeld per afdeling/actie/termijn
        //
        if (query.action == 'rap1') {
            if (gereedwhere != '') {
                gereedwhere = '\nand ' + gereedwhere;
            }
            sql = ` 
select *,
(
select 
count(*)
from RETOURACTIE,RETOUR
where RETOURACTIE.REFERENTIE = RETOUR.REFERENTIE
and   RETOURACTIE.gebruiker  = basegebruiker.gebruiker
and   RETOURACTIE.actie      = baseactie.actie 
and   isnull(RETOUR.gereeddatumtijd) = false 
${gereedwhere}
) as aantal_gebruiker_actie,
(
select 
count(*)
from RETOURACTIE,RETOUR
where RETOURACTIE.REFERENTIE = RETOUR.REFERENTIE
and   RETOURACTIE.gebruiker  = basegebruiker.gebruiker
and   RETOUR.termijn         = basetermijn.retourtermijn 
and   isnull(RETOUR.gereeddatumtijd) = false 
${gereedwhere}
) as aantal_gebruiker_termijn
from
(
select 
RETOURGEBRUIKER.gebruiker,
RETOURGEBRUIKER.naam as gebruiker_naam
from
RETOURGEBRUIKER
where exists (select 1 from RETOURACTIE 
where RETOURACTIE.gebruiker = RETOURGEBRUIKER.GEBRUIKER)
order by RETOURGEBRUIKER.gebruiker
) basegebruiker
,
(
select 
RETOURACTIETYPE.actie,
RETOURACTIETYPE.naam as actie_naam
from
RETOURACTIETYPE
where exists (select 1 from RETOURACTIE 
where RETOURACTIE.actie = RETOURACTIETYPE.ACTIE)
order by RETOURACTIETYPE.actie
) baseactie
,
(
select 
RETOURTERMIJN.retourtermijn,
RETOURTERMIJN.naam as termijn_naam
from
RETOURTERMIJN
where exists (select 1 from RETOUR 
where RETOUR.termijn = RETOURTERMIJN.retourtermijn)
order by RETOURTERMIJN.retourtermijn
) basetermijn
order by gebruiker,actie,retourtermijn`;
            //
            // RAP2 kosten van afgehandelde acties
            //
        } else if (query.action == 'rap2') {
            if (gereedwhere != '') {
                gereedwhere = '\nand ' + gereedwhere;
            }
            sql = ` 
select *,
format(
case when aantal_referentie > 0 
then (retour_kosten * aantal_retour) / aantal_referentie 
else 0 end
,8) as kosten
from (
select base.afdeling,
format(
(select sum(kosten) from RETOUR 
where RETOUR.referentie = base.referentie)
,8) as retour_kosten,
sum(aantal) as aantal,
max(aantal) as aantal_retour,
(select count(*) from RETOURACTIE 
where RETOURACTIE.referentie = base.referentie) as aantal_referentie,
sum(garantie_ja) as garantie_ja,
sum(garantie_nee) as garantie_nee,
sum(garantie_misschien) as garantie_misschien
from 
(
select 
RETOURGEBRUIKER.gebruiker,
min(RETOURGEBRUIKER.naam) as afdeling,
basera.referentie,
sum((select 1 from RETOUR 
where RETOUR.referentie = basera.referentie)) as aantal,
sum((select 1 from RETOUR 
where RETOUR.referentie = basera.referentie and RETOUR.garantie = 1)) 
as garantie_ja,
sum((select 1 from RETOUR 
where RETOUR.referentie = basera.referentie and RETOUR.garantie = 2)) 
as garantie_nee,
sum((select 1 from RETOUR 
where RETOUR.referentie = basera.referentie and RETOUR.garantie = '???')) 
as garantie_misschien
from RETOURGEBRUIKER
left join (
select RETOURACTIE.* from RETOURACTIE inner join RETOUR 
on RETOURACTIE.referentie = RETOUR.referentie 
where   isnull(RETOUR.gereeddatumtijd) = false 
${gereedwhere}
) basera on RETOURGEBRUIKER.gebruiker = basera.gebruiker
group by RETOURGEBRUIKER.gebruiker, basera.referentie
) base
group by base.gebruiker	
) base2`;
            //
            // RAP3 binnengekomen referenties per afdeling
            //
        } else if (query.action == "rap3") {
            startwhere2 = '';
            if (startwhere != '') {
                startwhere2 = '\nand ' + startwhere;
                startwhere = '\nwhere ' + startwhere;
            }
            sql = `
select
case when afdeling = '...' then afdeling 
else (select min(naam) from RETOURGEBRUIKER where gebruiker = afdeling) end 
as afdeling,
klantnummer,
min(naam) as naam,
count(distinct(referentie)) as aantal_retouren,
min(referentie),
max(referentie),
min(productnummer),
max(productnummer),
count(distinct(productnummer)),
sum(aantal) as aantal_producten,
case when afdeling = '...' then '???' else
(select count(*) from RETOURACTIE, RETOURKLANT, RETOUR
where RETOURACTIE.referentie = RETOUR.referentie
and   RETOUR.referentie = RETOURKLANT.referentie
and   RETOURKLANT.klantnummer = base.klantnummer 
and   RETOURACTIE.gebruiker = base.afdeling 
${startwhere2})
end
as aantal_acties
from
(
select *,
case when afdeling1 = afdeling2 then afdeling1 else '...' end as afdeling
from
(select 
RETOUR.referentie,
RETOUR.startdatumtijd,
RETOURPRODUCT.productnummer,
RETOURPRODUCT.aantal,
(select min(RETOURACTIE.gebruiker) from RETOURACTIE 
where RETOURACTIE.referentie = RETOUR.referentie) as afdeling1,
(select max(RETOURACTIE.gebruiker) from RETOURACTIE 
where RETOURACTIE.referentie = RETOUR.referentie) as afdeling2
from RETOURPRODUCT inner join RETOUR 
on RETOUR.referentie = RETOURPRODUCT.referentie 
${startwhere}
) baseproduct
left join
(select 
referentie as klantreferentie, 
klantnummer, 
naam from RETOURKLANT) baseklant 
on baseproduct.referentie = baseklant.klantreferentie
) base
group by afdeling, klantnummer
order by afdeling, klantnummer`;
            //
            // RAP4A binnengekomen per afdeling/product
            //
        } else if (query.action == "rap4a") {
            startwhere2 = '';
            if (startwhere != '') {
                startwhere2 = '\nand ' + startwhere;
                startwhere = '\nwhere ' + startwhere;
            }
            sql = ` 
select
(select 
naam 
from RETOURACTIETYPE 
where RETOURACTIETYPE.actie = baseactie.actie) as actietype,
baseactie.actie
from
(
select distinct 
actie
from RETOURACTIE inner join RETOUR 
on RETOURACTIE.referentie = RETOUR.referentie 
${startwhere}
) baseactie
order by baseactie.actie` ;
            //
            // RAP4B totaalregel
            //
        } else if (query.action == "rap4b") {
            startwhere2 = '';
            if (startwhere != '') {
                startwhere2 = '\nand ' + startwhere;
                startwhere = '\nwhere ' + startwhere;
            }
            if (productgereedwhere != '') {
                productgereedwhere = '\nand ' + productgereedwhere;
            }
            sql = `
select
(select 
sum(startaantal) 
from BEWERKING 
where BEWERKING.productnummer = baseproduct.productnummer
${productgereedwhere}) 
as aantal_gemaakt,
(select min(naam) from RETOURGEBRUIKER 
where RETOURGEBRUIKER.gebruiker = baseactie.gebruiker) 
as afdeling,
baseproduct.productnummer,
(select PRODUCT.productnaam from PRODUCT 
where PRODUCT.productnummer = baseproduct.productnummer) 
as omschrijving,
baseproduct.referentie,
(select naam from RETOURACTIETYPE 
where RETOURACTIETYPE.actie = baseactie.actie) 
as actietype,
baseproduct.aantal_product,
baseactie.aantal_actie,
baseactie.gebruiker,
baseactie.actie
from
(
select 
RETOURACTIE.referentie,
actie,
1 as aantal_actie,
RETOURACTIE.gebruiker
from RETOURACTIE inner join RETOUR 
on RETOURACTIE.referentie = RETOUR.referentie 
${startwhere}
) baseactie
inner join
(
select referentie,
productnummer,
aantal as aantal_product
from RETOURPRODUCT
) baseproduct
on baseactie.referentie = baseproduct.referentie
order by baseactie.gebruiker, baseproduct.productnummer, baseactie.referentie, baseactie.actie`;
            //
            // RAP5 Afgehandeld per retourtype
            //
        } else if (query.action == 'rap5') {
            if (gereedwhere != '') {
                gereedwhere = '\nand ' + gereedwhere;
            }
            sql = ` 
select *,
(
select 
count(*)
from RETOUR
where isnull(RETOUR.gereeddatumtijd) = false 
${gereedwhere}
) as aantal,
(
select 
count(*)
from RETOURTYPE, RETOUR
where RETOURTYPE.retourtype = RETOUR.type
and   RETOUR.type = basetype.retourtype 
and isnull(RETOUR.gereeddatumtijd) = false 
${gereedwhere}
) as aantal_type,
(
select 
count(*)
from RETOURTERMIJN, RETOUR
where RETOURTERMIJN.retourtermijn = RETOUR.termijn
and   RETOUR.termijn = basetermijn.retourtermijn 
and isnull(RETOUR.gereeddatumtijd) = false  
${gereedwhere}
) as aantal_termijn
from
(
select 
RETOURTYPE.retourtype,
RETOURTYPE.naam as type_naam
from
RETOURTYPE
order by RETOURTYPE.retourtype
) basetype
,
(
select 
RETOURTERMIJN.retourtermijn,
RETOURTERMIJN.naam as termijn_naam
from
RETOURTERMIJN
order by RETOURTERMIJN.retourtermijn
) basetermijn
order by retourtype, retourtermijn`;
            //
            // RAP6 Binnengekomen per retourtype
            //
        } else if (query.action == 'rap6') {
            if (startwhere != '') {
                startwhere = '\nand ' + startwhere;
            }
            sql = `
select *,
(
select 
count(*)
from RETOUR
where isnull(startdatumtijd) = false 
${startwhere}
) as aantal,
(
select 
count(*)
from RETOURTYPE, RETOUR
where RETOURTYPE.retourtype = RETOUR.type
and   RETOUR.type = basetype.retourtype 
${startwhere}
) as aantal_type,
(
select 
count(*)
from RETOURTERMIJN, RETOUR
where RETOURTERMIJN.retourtermijn = RETOUR.termijn
and   RETOUR.termijn = basetermijn.retourtermijn 
${startwhere}
) as aantal_termijn
from
(
select 
RETOURTYPE.retourtype,
RETOURTYPE.naam as type_naam
from
RETOURTYPE
order by RETOURTYPE.retourtype
) basetype
,
(
select 
RETOURTERMIJN.retourtermijn,
RETOURTERMIJN.naam as termijn_naam
from
RETOURTERMIJN
order by RETOURTERMIJN.retourtermijn
) basetermijn
order by retourtype, retourtermijn`;
            //
            // RAP7 Binnengekomen detail
            //
        } else if (query.action == 'rap7') {
            where = '';
            if (startwhere != '') {
                where = '\nwhere ' + startwhere;
            }
            sql = `
select 
id,
referentie,
klantreferentie,
startdatumtijd,
gereeddatumtijd,
gebruiker,
type,
termijn,
prijsopgave,
garantie,
format(kosten,8) as kosten,
opmerking,
status,
trim((select case when count(klantnummer) > 1 then '...'
else min(concat(RETOURKLANT.klantnummer, ' ',RETOURKLANT.naam)) end 
from RETOURKLANT where RETOURKLANT.referentie = RETOUR.referentie))
as klant_oms,
(select RETOURTYPE.naam from RETOURTYPE 
where RETOURTYPE.retourtype = RETOUR.type) as type_oms,
(select RETOURTERMIJN.naam from RETOURTERMIJN 
where RETOURTERMIJN.retourtermijn = RETOUR.termijn) as termijn_oms,
date2screendate(startdatumtijd) as START,
date2screendate(gereeddatumtijd) as GEREED,
datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) as DUUR
from RETOUR
${where}
order by RETOUR.startdatumtijd, RETOUR.referentie`;
            //
            // RAP8 Binnengekomen open binnen/buiten termijn
            //
        } else if (query.action == 'rap8') {
            where = '';
            if (startwhere != '') {
                if (where == '') {
                    where = where + '\nwhere ';
                }
                where = where + startwhere;
            }
            sql = `
select
sum(1) as aantal,
sum(case when isnull(gereeddatumtijd) = false then 1 else 0 end) 
as aantal_afgehandeld,
sum(case when isnull(gereeddatumtijd) = false 
and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) 
then 1 else 0 end) 
as aantal_gereed_binnen,
sum(case when isnull(gereeddatumtijd) = false 
and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) 
then 1 else 0 end) 
as aantal_gereed_buiten,
sum(case when isnull(gereeddatumtijd) then 1 else 0 end) 
as aantal_open,
sum(case when isnull(gereeddatumtijd) 
and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) 
then 1 else 0 end) 
as aantal_binnen,
sum(case when isnull(gereeddatumtijd) 
and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) 
then 1 else 0 end) 
as aantal_buiten
from RETOUR
${where}`;
            //
            // RAP8b Afgehandeld totaal binnen/buiten termijn
            //
        } else if (query.action == 'rap8b') {
            where = '\nwhere isnull(RETOUR.gereeddatumtijd) = false';
            if (gereedwhere != '') {
                where = where + '\nand ' + gereedwhere;
            }
            sql = `
select
sum(1) as aantal,
sum(case when isnull(gereeddatumtijd) = false then 1 else 0 end) as aantal_afgehandeld,
sum(case when isnull(gereeddatumtijd) = false and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) as aantal_gereed_binnen,
sum(case when isnull(gereeddatumtijd) = false and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) as aantal_gereed_buiten,
sum(case when isnull(gereeddatumtijd) then 1 else 0 end) as aantal_open,
sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) as aantal_binnen,
sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) as aantal_buiten
from RETOUR
${where}`;
            //
            // RAP8c Open binnen/buiten termijn vanaf/tm
            //
        } else if (query.action == 'rap8c') {
            where = '\nwhere isnull(RETOUR.gereeddatumtijd) = true';
            if (startgereed != '') {
                if (where == '') {
                    where = where + '\nand ';
                }
                where = where + startgereed;
            }
            sql = `
select
sum(1) as aantal,
sum(case when isnull(gereeddatumtijd) = false then 1 else 0 end) 
as aantal_afgehandeld,
sum(case when isnull(gereeddatumtijd) = false 
and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) 
as aantal_gereed_binnen,
sum(case when isnull(gereeddatumtijd) = false
and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) 
as aantal_gereed_buiten,
sum(case when isnull(gereeddatumtijd) then 1 else 0 end) 
as aantal_open,
sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) 
as aantal_binnen,
sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) 
as aantal_buiten
from RETOUR
${where}`;
            //
            // RAP9 Afgehandeld detail
            //
        } else if (query.action == 'rap9') {
            where = '\nwhere isnull(RETOUR.gereeddatumtijd) = false';
            if (gereedwhere != '') {
                where = where + '\nand ' + gereedwhere;
            }
            sql = ` 
select 
id,
referentie,
klantreferentie,
startdatumtijd,
gereeddatumtijd,
gebruiker,
type,
termijn,
prijsopgave,
garantie,
format(kosten,8) as kosten,
opmerking,
status,
trim((select case when count(klantnummer) > 1 
then '...' else min(concat(RETOURKLANT.klantnummer, ' ',RETOURKLANT.naam)) end 
from RETOURKLANT 
where RETOURKLANT.referentie = RETOUR.referentie)) as klant_oms,
(select RETOURTYPE.naam from RETOURTYPE 
where RETOURTYPE.retourtype = RETOUR.type) as type_oms,
(select RETOURTERMIJN.naam from RETOURTERMIJN 
where RETOURTERMIJN.retourtermijn = RETOUR.termijn) as termijn_oms,
date2screendate(startdatumtijd) as START,
date2screendate(gereeddatumtijd) as GEREED,
datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) as DUUR
from RETOUR
${where}
order by RETOUR.gereeddatumtijd, RETOUR.referentie`;
            //
            // RAP10 Open detail
            //
        } else if (query.action == 'rap10') {
            where = '\nwhere isnull(RETOUR.gereeddatumtijd) = true';
            if (startwhere != '') {
                where = where + '\nand ' + startwhere;
            }
            sql = ` 
select
id,
referentie,
klantreferentie,
startdatumtijd,
gereeddatumtijd,
gebruiker,
type,
termijn,
prijsopgave,
garantie,
format(kosten,8) as kosten,
opmerking,
status,
trim((select case when count(klantnummer) > 1 then '...' 
else min(concat(RETOURKLANT.klantnummer, ' ',RETOURKLANT.naam)) end 
from RETOURKLANT 
where RETOURKLANT.referentie = RETOUR.referentie)) as klant_oms,
(select RETOURTYPE.naam from RETOURTYPE 
where RETOURTYPE.retourtype = RETOUR.type) as type_oms,
(select RETOURTERMIJN.naam from RETOURTERMIJN 
where RETOURTERMIJN.retourtermijn = RETOUR.termijn) as termijn_oms,
date2screendate(startdatumtijd) as START,
date2screendate(gereeddatumtijd) as GEREED,
datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) 
as DUUR
from RETOUR
${where}
order by RETOUR.startdatumtijd, RETOUR.referentie`;
            //
            // RAP11 Binnengekomen open binnen/buiten termijn in combinatie met totaal_open (overzichts rapport)
            //
        } else if (query.action == 'rap11') {
            where = '';
            if (startwhere != '') {
                if (where == '') {
                    where = where + '\nwhere ';
                }
                where = where + startwhere;
            }
            sql = `
select
sum(1) as aantal,
sum(case when type = '01' then 1 else 0 end) as aantal_claim,
sum(case when type = '04' then 1 else 0 end) as aantal_reparatie,
sum(case when type != '01' and type != '04' then 1 else 0 end) as aantal_overig,
sum(case when isnull(gereeddatumtijd) = false then 1 else 0 end) as aantal_afgehandeld,
sum(case when isnull(gereeddatumtijd) = false and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) as aantal_gereed_binnen,
sum(case when isnull(gereeddatumtijd) = false and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) as aantal_gereed_buiten,
sum(case when isnull(gereeddatumtijd) then 1 else 0 end) as aantal_open,
sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) as aantal_binnen,
sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) as aantal_buiten,
(select sum(case when isnull(gereeddatumtijd) then 1 else 0 end) from RETOUR) as totaal_aantal_open,
(select sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end)) as totaal_aantal_binnen,
(select sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end)) as totaal_aantal_buiten
from RETOUR
${where}`;
        }
        //
        rows = await db.waitQuery(res.crudConnection, sql);
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
