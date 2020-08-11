
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "BEWERKING",
    key: [
        {
            body: "BEWERKINGSNUMMER",
            sql: "BEWERKINGSNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "BEWERKINGSNUMMER",
        where: [
        ],
        fields: [
        ],
    },
    query: {
        orderby: "BEWERKINGSNUMMER",
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

export class Bewerking extends Crud {
    constructor() {
        super(
            dict
        )
    }


    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let bewerkingsnummer = db.fix(req.query.bewerkingsnummer || '');
        let productnummer = db.fix(req.query.productnummer || '');
        let lijn = db.fix(req.query.lijn || '');
        let is = db.fix(req.query.is || '');
        let open = db.fix(req.query.open || '');
        let afgesloten = db.fix(req.query.afgesloten || '');
        let datum = db.fix(req.query.datum || '');
        let datumvanaf = db.fix(req.query.datumvanaf || '');
        let datumtm = db.fix(req.query.datumtm || '');
        let ak2einddatumvanaf = db.fix(req.query.ak2einddatumvanaf || '');
        let ak2einddatumtm = db.fix(req.query.ak2einddatumtm || '');
        let selR = db.fix(req.query.selr || '');
        let assets = db.fix(req.query.assets || '');
        if (assets == "") {
            assets = "images/";
        } else {
            assets = "assets/image/";
        }
        let startstatistiek = '';
        let where = '';
        //
        res.crudConnection = await db.waitConnection();
        let sql = `SET SESSION group_concat_max_len = 100000`;
        await db.waitQuery(res.crudConnection, sql);
        sql = `select * from PARAM where naam = 'STARTSTATISTIEK'`;
        let rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            let row = rows[0];
            startstatistiek = row.INHOUD;
        }
        //
        let sqlpartaantal = `
(select sum(BEWERKINGFLOW.bewerkingaantal)
from BEWERKINGFLOW,BEWERKING E
where BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer
and E.productnummer = BEWERKING.productnummer
and E.einddatumtijd is not null
and E.startdatumtijd >= screendate2date('${startstatistiek}')
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
        let sqlparttijd = `
(select sum(BEWERKINGTIJD.tijd) from BEWERKINGTIJD,BEWERKINGFLOW,BEWERKING C
where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
and BEWERKINGFLOW.bewerkingsnummer = C.bewerkingsnummer
and C.PRODUCTNUMMER = BEWERKING.productnummer
and C.einddatumtijd is not null
and C.startdatumtijd >= screendate2date('${startstatistiek}')
)`;
        let sqlpartbewerkingen = `
(select count(distinct BEWERKINGFLOW.bewerkingsoort)
from BEWERKINGFLOW,BEWERKING E
where BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer
and E.PRODUCTNUMMER = BEWERKING.productnummer
and E.einddatumtijd is not null
and E.startdatumtijd >= screendate2date('${startstatistiek}')
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
and E.PRODUCTNUMMER = BEWERKING.productnummer
and E.einddatumtijd is not null
and E.startdatumtijd >= screendate2date('${startstatistiek}')
and exists (
select 1 from BEWERKINGSOORT
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
and BEWERKINGSOORT.voortgang = 1
)
)`;
        let sqlpartak2eind = `
(select max(BEWERKINGFLOW.einddatumtijd)
from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
and not exists (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
and einddatumtijd is null)
)`;
        //
        // Als er 1 open is, dan open:
        // dus max(<img src=$assets . "bewerkingopen.png"></img>, <img src="images/bewerkingclosed.png"></img>)
        // (textuele volgorde: "open" is hoger dan "closed"
        //
        let sqlpartstandhtml = `
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
case when einddatumtijd is null then '<img src="${assets}bewerkingopen.png"></img> '
else '<img src="${assets}bewerkingclosed.png"></img> '
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

        sql = `
select *,
date2screendate(ak2einddatumtijd) as AK2EIND
from (select *,
concat(ifnull(bewerkt,0),' / ',gepland,' (',ifnull(aantalbewerking,0),')') as stand,
(${sqlpartstandhtml}) as standhtml
from (
select id, 
bewerkingsnummer,
initstartdatumtijd,
startdatumtijd,
einddatumtijd,
eindcontrolenummer,
plandatumtijd,
date2screendate(initstartdatumtijd) as INITDATUM,
date2screendate(startdatumtijd) as START,
date2screendate(plandatumtijd) as PLAN,
date2screendate(adviesplandatumtijd) as ADVIESPLAN,
date2screendate(einddatumtijd) as EIND,
Productnummer, 
Productieaantal,
Startaantal,
Opmerking,
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
(select count(distinct(bewerkingsoort)) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER and exists( select 1 from BEWERKINGSOORT where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort and BEWERKINGSOORT.voortgang = 1))  as aantalbewerking,
(select sum(bewerkingaantal) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) as gepland,
(select sum(bewerkingaantal) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER and BEWERKINGFLOW.einddatumtijd is not null) as bewerkt,
(select sum(tijd) from BEWERKINGFLOW,BEWERKINGTIJD where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER and BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id) as besteed,`;
        //

        sql += `  
(select CONCAT(round(
${sqlpartaantal}
/
${sqlpartbewerkingen}
/
${sqlparttijd}
* 60),
' uit ',
${sqlpartopdrachten},
'*',
${sqlpartbewerkingen}
) from DUAL
) as berekening,`;
        sql += ` 
(select round(
BEWERKING.productieaantal / (
${sqlpartaantal}
/
${sqlpartbewerkingen}
/ 
${sqlparttijd}
)
) from DUAL
) as gemiddeld,`;
        sql += `
${sqlpartak2eind}
as ak2einddatumtijd,`;
        //
        sql += `
(select sum(uitval) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) as aantaluitval,
(select sum(aantalafkeur) from BEWERKINGUITVAL where BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) as aantalafkeur,
(select sum(aantalreparatie) from BEWERKINGUITVAL where BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) as aantalreparatie
from BEWERKING`;
        //
        //
        //
        if (bewerkingsnummer != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `
bewerkingsnummer = '${bewerkingsnummer}'`;
        }
        if (productnummer != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            if (Number(is) == 1) {
                where += `
productnummer = '${productnummer}'`;
            } else {
                where += `
ucase(productnummer) like ucase('${productnummer}%')`;
            }
        }
        if (open == 'Nee') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `
not isnull(einddatumtijd)`;
        }
        if (open == 'Ja') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `
isnull(einddatumtijd)`;
        }
        if (afgesloten == 'on') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `
not isnull(einddatumtijd)`;
        }
        if (selR == 'Nee') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `
bewerkingsnummer not like 'R%'`;
        }
        if (selR == 'Ja') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `
bewerkingsnummer like 'R%'`;
        }
        if (datum != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `
startdatumtijd >= screendate2date('${datum}')`;
        }
        if (datumvanaf != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `
einddatumtijd >= screendate2date('${datumvanaf}')`;
        }
        if (datumtm != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += `
einddatumtijd <= screendate2date('${datumtm})`;
        }
        if (ak2einddatumvanaf != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += ` 
(select max(BEWERKINGFLOW.einddatumtijd) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer)
>= screendate2date('${ak2einddatumvanaf}')
and not exists (select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer and BEWERKINGFLOW.einddatumtijd is null)`;
        }
        if (ak2einddatumtm != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += ` 
(select max(BEWERKINGFLOW.einddatumtijd) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer)
<= screendate2date('${ak2einddatumtm}')
and not exists (select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer and BEWERKINGFLOW.einddatumtijd is null)`;
        }
        //
        //
        //
        sql += `
${where}
) BASE) BASE2`;

        where = '';
        if (lijn != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += ` 
lijn = '${lijn}'`;
        }

        sql += `
            ${where}
            order by Lijn,Bewerkingsnummer,Ak2Einddatumtijd,Startdatumtijd
            `;
        //
        //
        //
        rows = await db.waitQuery(res.crudConnection, sql);
        //
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let id = db.getDataId(req);
        let startaantal = Number(req.body.STARTAANTAL) || 0;
        let productieaantal = Number(req.body.PRODUCTIE) || 0;
        if (startaantal < productieaantal) {
            startaantal = productieaantal;
        }
        res.crudConnection = await db.waitConnection();
        let sqlinsert = ` 
insert into BEWERKING
(bewerkingsnummer,initstartdatumtijd,startdatumtijd,
lijn,plandatumtijd,einddatumtijd,eindcontrolenummer,
Productnummer,Productieaantal,Startaantal,
Opmerking)
values (
'${db.fix(req.body.BEWERKINGSNUMMER)}',
screendate2date('${req.body.INITDATUM}'),
screendate2date('${req.body.START}'),
'${db.fix(req.body.LIJN)}',
screendate2date('${req.body.PLAN}'),
screendate2date('${req.body.EIND}'),
'${db.fix(req.body.EINDCONTROLENUMMER)}',
'${db.fix(req.body.PRODUCTNUMMER)}',
'${db.fix(String(productieaantal))}',
'${db.fix(String(startaantal))}',
'${db.fix(req.body.OPMERKING)}')`;
        //
        // test
        //
        if (Number(productieaantal) == 0) {
            Logger.test(req,sqlinsert);
        }
        let result = await db.waitQuery(res.crudConnection, sqlinsert);
        req.body.ID = db.getInsertId(result);
        res.crudConnection.release();
        res.status(200).send(req.body);
        return;
    }

    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let id = db.getDataId(req);
        let startaantal = Number(req.body.STARTAANTAL) || 0;
        let productieaantal = Number(req.body.PRODUCTIE) || 0;
        if (startaantal < productieaantal) {
            startaantal = productieaantal;
        }
        res.crudConnection = await db.waitConnection();
        // als bewerkingsnummer wijzigt
        // dan ook :
        // update BEWERKINGFLOW set bewerkingsnummer = $new where bewerkingsnummer = $old
        // update BEWERKINGTIJD set bewerkingsnummer = $new where bewerkingsnummer = $old
        // update BEWERKINGUITVAL set bewerkingsnummer = $new where bewerkingsnummer = $old
        // wat was het oude nummer
        let sql = ` 
select 
bewerkingsnummer 
from BEWERKING 
where id  = '${db.fix(id)}'`;
        let rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            let row = rows[0];
            let thisOld = db.fix(row.BEWERKINGSNUMMER);
            let thisNew = db.fix(req.body.BEWERKINGSNUMMER);
            if (thisOld != thisNew) {
                sql = ` 
update BEWERKINGFLOW set
bewerkingsnummer = '${thisNew}'
where bewerkingsnummer = '${thisOld}'`;
                await db.waitQuery(res.crudConnection, sql);
                sql = ` 
update BEWERKINGTIJD set
bewerkingsnummer = '${thisNew}'
where bewerkingsnummer = '${thisOld}'`;
                await db.waitQuery(res.crudConnection, sql);
                sql = ` 
update BEWERKINGUITVAL set
bewerkingsnummer = '${thisNew}'
where bewerkingsnummer = '${thisOld}'`;
                await db.waitQuery(res.crudConnection, sql);
            }
        }
        sql = `
update BEWERKING set
Bewerkingsnummer =  '${db.fix(req.body.BEWERKINGSNUMMER)}',
InitStartdatumtijd = screendate2date('${req.body.INITDATUM}'),
Startdatumtijd = screendate2date('${req.body.START}'),
lijn = '${db.fix(req.body.LIJN)}',
Plandatumtijd = screendate2date('${req.body.PLAN}'),
Einddatumtijd = screendate2date('${req.body.EIND}'),
Eindcontrolenummer =  '${db.fix(req.body.EINDCONTROLENUMMER)}',
Productnummer = '${db.fix(req.body.PRODUCTNUMMER)}',
Productieaantal = '${productieaantal}',
Startaantal = '${startaantal}',
Opmerking = '${db.fix(req.body.OPMERKING)}'
where id = '${db.fix(id)}'`;
        //
        // test
        //
        if (Number(productieaantal) == 0) {
            Logger.test(req,sql);
        }
        //
        await db.waitQuery(res.crudConnection, sql);
        //
        res.crudConnection.release();
        res.status(200).send(req.body);
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
