
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "bewerkingflowperformance",
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

export class Bewerkingflowperformance extends Crud {
    constructor() {
        super(
            dict
        )
    }

    public static async query(req: Request, res: Response, next: NextFunction, bewerkingsnummer: string, productnummer: string) {
        let result = '';
        req.query.performancestart = "01-01-2016";
        let sql = `
select * 
from PARAM 
where naam = 'PERFORMANCESTART'`;
        let rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            let row = rows[0];
            req.query.performancestart = row.INHOUD;
        }
        //
        let norm = 0;
        let target = 0;
        let besteed = 0;
        sql = this.createSql(req, res, next);
        //
        // bepaal de performanceverbetering aan de hand van de totaalregel
        //
        let faktor = 1;
        rows = await db.waitQuery(res.crudConnection, sql);
        for (let irow = 0; irow < rows.length; irow++) {
            let row = rows[irow];
            if (row.BEWERKINGSOORT == "Totaal") {
                if (Number(row.NORM) != 0) {
                    if (Number(row.GEMIDDELD) != 0) {
                        faktor = Number(row.NORM) / Number(row.GEMIDDELD);
                    }
                }
            }
        }
        //
        // print de info
        //
        result += '[';
        let swfirstrow = 1;
        for (let irow = 0; irow < rows.length; irow++) {
            let row = rows[irow];
            if (swfirstrow == 1) {
                swfirstrow = 0;
                result += "\n";
            } else {
                result += ",\n";
            }
            //
            //
            //
            if (row.BEWERKINGSOORT == "Totaal") {
                norm = Number(row.NORM);
                if (norm == 0) {
                    norm = Number(row.GEMIDDELD);
                    row.NORM = norm.toFixed(0);
                }
            } else {
                norm = Number(row.GEMIDDELD) * faktor;
                row.NORM = norm.toFixed(0);
            }
            if (norm == 0) {
                norm = 1;
            }
            target = Number((Number(row.TODO) / norm * 60).toFixed(0));
            besteed = Number(row.BESTEED);
            let HHMMNORMAAL = Util.MakeHHMM(target);
            let HHMMBESTEED = Util.MakeHHMM(besteed);
            let HHMMOVER = Util.MakeHHMM(target - besteed);
            row.HHMMNORMAAL = HHMMNORMAAL;
            row.HHMMBESTEED = HHMMBESTEED;
            row.HHMMOVER = HHMMOVER;
            result += JSON.stringify(row);
        }
        result += ']';
        return (result);
    }

    public static async print(req: Request, res: Response, next: NextFunction, bewerkingsnummer: string, productnummer: string) {
        let result = '';
        req.query.performancestart = "01-01-2016";
        req.query.bewerkingsnummer = bewerkingsnummer;
        req.query.productnummer = productnummer;
        let sql = `
select * 
from PARAM 
where naam = 'PERFORMANCESTART'`;
        let rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            let row = rows[0];
            req.query.performancestart = row.INHOUD;
        }
        //
        //
        //
        sql = `
select * 
from bewerking 
where bewerkingsnummer = '${bewerkingsnummer}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            let row = rows[0];
            req.query.productnummer = rows[0].PRODUCTNUMMER;
        }
        //
        sql = this.createSql(req, res, next);
        //
        // bepaal de performanceverbetering aan de hand van de totaalregel
        //
        let faktor = 1;
        rows = await db.waitQuery(res.crudConnection, sql);
        for (let irow = 0; irow < rows.length; irow++) {
            let row = rows[irow];
            if (row.BEWERKINGSOORT == "Totaal") {
                if (Number(row.NORM) != 0) {
                    if (Number(row.GEMIDDELD) != 0) {
                        faktor = Number(row.NORM) / Number(row.GEMIDDELD);
                    }
                }
            }

        }
        //
        // print de info
        //
        let tlrow = 0;
        for (let irow = 0; irow < rows.length; irow++) {
            let row = rows[irow];

            if (tlrow == 0) {
                result += '<table class="t" style="margin 5px 0px 0px 0px">';
                result += '<tr>';
                result += '<td class="lth">';
                result += 'Bewerking';
                result += '</td>';
                result += '<td class="th">';
                result += 'Aantal/uur';
                result += '</td>';
                result += '<td class="th">';
                result += 'Norm';
                result += '</td>';
                result += '<td class="th">';
                result += 'Te doen';
                result += '</td>';
                result += '<td class="th">';
                result += 'Tijd nodig';
                result += '</td>';
                result += '<td class="th">';
                result += '';
                result += '</td>';
                result += '<td class="th">';
                result += 'Besteed';
                result += '</td>';
                result += '<td class="th">';
                result += 'Aantal/uur';
                result += '</td>';
                result += '<td class="th">';
                result += 'Tijd over';
                result += '</td>';
                result += "</tr>\n";
                result += '<tr>';
            }
            tlrow++;
            result += '<tr>';
            // bewerking
            result += '<td class="ltr">';
            result += row.NAAM;
            result += '</td>';
            // aantal per uur
            result += '<td class="tr">';
            let performance = row.UURPERFORMANCE;
            result += performance;
            result += '</td>';
            // norm
            result += '<td class="tr">';
            let norm = '';
            if (row.BEWERKINGSOORT == "Totaal") {
                norm = row.NORM;
                if (Number(norm) == 0) {
                    norm = row.GEMIDDELD;
                    row.NORM = norm;
                }
            } else {
                norm = String((Number(row.GEMIDDELD) * faktor).toFixed(0));
                row.NORM = norm;
            }
            result += norm;
            result += '</td>';
            // te doen
            result += '<td class="tr">';
            result += row.TODO
            result += '</td>';
            // tijd nodig
            result += '<td class="tr">';
            let target = '';
            norm = row.NORM;
            if (Number(norm) != 0) {
                target = String((Number(row.TODO) / Number(norm) * 60).toFixed(0));
            }
            result += Util.MakeHHMM(Number(target));
            result += '</td>';
            // splitter
            result += '<td class="tr"</td>';
            // besteed
            result += '<td class="tr">';
            result += Util.MakeHHMM(Number(row.BESTEED));
            result += '</td>';
            // aantal/uur
            result += '<td class="tr">';
            let besteed = '';
            let real = '';
            if (Number(row.BESTEED) == 0) {
                besteed = '0';
                real = '0';
                result += "?";
            } else {
                besteed = row.BESTEED;
                real = String((Number(row.TODO) / Number(row.BESTEED) * 60).toFixed(0));
                result += real;
            }
            result += '</td>';
            // tijd over
            result += '<td class="tr">';
            result += Util.MakeHHMM(Number(target) - Number(besteed));
            result += '</td>';
            //
            result += "</tr>\n";
        }
        if (tlrow == 0) {
            result += '<p>(Nog) geen historische informatie beschikbaar.</p>';
        } else {
            result += '</table>';
        }
        return (result);
    }

    protected async doExplain(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let result: any = {};
        let sql = '';
        let rows: any = [];
        res.crudConnection = await db.waitConnection();
        //
        // performancestart
        //
        req.query.performancestart = "01-01-2016";
        let bewerkingsnummer: any = db.fix(req.query.bewerkingsnummer || '');
        let productnummer: any = '';
        let performancestart: any = '';
        sql = `
select * 
from PARAM 
where naam = 'PERFORMANCESTART'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            let row = rows[0];
            req.query.performancestart = row.INHOUD;
        }
        result.PERFORMANCESTART = req.query.performancestart;
        performancestart = req.query.performancestart;
        //
        // productie
        //
        result.PRODUCTIE = {};
        sql = `
select * 
from bewerking 
where bewerkingsnummer = '${bewerkingsnummer}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            let row = rows[0];
            result.PRODUCTIE = rows[0];
            productnummer = rows[0].PRODUCTNUMMER;
        }
        result.PRODUCTNUMMER = productnummer;
        req.query.productnummer = productnummer;
        //
        // product
        //
        result.PRODUCT = {};
        sql = `
select * 
from product
where productnummer = '${productnummer}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            let row = rows[0];
            result.PRODUCT = rows[0];
        }
        //
        // gesloten producties van dit artikel in de periode
        //
        result.GESLOTENPRODUCTIES = [];
        sql = `
select
(select sum(tijd) from bewerkingtijd 
where bewerkingtijd.bewerkingsnummer = bewerking.bewerkingsnummer)
as tijd,
bewerking.* 
from bewerking
where bewerking.productnummer ='${productnummer}'
and bewerking.einddatumtijd is not null 
and bewerking.startdatumtijd >= screendate2date('${performancestart}')
order by bewerking.startdatumtijd`;
        result.GESLOTENPRODUCTIES = await db.waitQuery(res.crudConnection, sql);
        //
        // bewerkingen van de gesloten producties van dit artikkel in de periode
        //
        result.GESLOTENBEWERKINGEN = [];
        sql = `
select 
(select sum(tijd) from bewerkingtijd 
where bewerkingtijd.bewerkingsnummer = bewerking.bewerkingsnummer 
and bewerkingtijd.bewerkingflowid = bewerkingflow.id) 
as tijd,
(select reparatie from bewerkingsoort
where bewerkingsoort = bewerkingflow.bewerkingsoort)
as reparatie,
(select layout from bewerkingsoort
where bewerkingsoort = bewerkingflow.bewerkingsoort)
as layout,
(select naam from bewerkingsoort
where bewerkingsoort = bewerkingflow.bewerkingsoort)
as bewerkingsoort_oms,
bewerkingflow.*
from bewerkingflow inner join bewerking on bewerkingflow.bewerkingsnummer = bewerking.bewerkingsnummer
where bewerking.productnummer ='${productnummer}'
and bewerking.einddatumtijd is not null 
and bewerking.startdatumtijd >= screendate2date('${performancestart}')
order by bewerkingflow.bewerkingsoort,bewerking.startdatumtijd,bewerking.bewerkingsnummer`;
        result.GESLOTENBEWERKINGEN = await db.waitQuery(res.crudConnection, sql);
        //
        res.crudConnection.release();
        res.status(200).send(result);
        return;
    }


    private static createSql(req: Request, res: Response, next: NextFunction): string {
        let performancestart = req.query.performancestart;
        let bewerkingsnummer = db.fix(req.query.bewerkingsnummer || '');
        let productnummer = db.fix(req.query.productnummer || '');
        let sql = `
select 
productnummer,
'' as norm,
bewerkingsoort,
naam,
(select sum(bewerkingaantal) from bewerkingflow 
where bewerkingflow.bewerkingsnummer = '${bewerkingsnummer}' 
and bewerkingflow.bewerkingsoort = BASE.bewerkingsoort) 
as todo,
(select ifnull(sum(tijd),0) from bewerkingflow, bewerkingtijd 
where bewerkingtijd.bewerkingflowid = bewerkingflow.id 
and bewerkingflow.bewerkingsnummer = '${bewerkingsnummer}' 
and bewerkingflow.bewerkingsoort = BASE.bewerkingsoort) 
as besteed,
sum(bewerkingaantal) as aantal,
sum(tijd) as minuten,
round(sum(bewerkingaantal)/sum(tijd)*60) as gemiddeld, 
concat(round(sum(bewerkingaantal)/sum(tijd)*60),' uit ',count(*)) 
as uurperformance 
from (
select 
bewerking.productnummer, 
bewerking.startdatumtijd as bwk_startdatumtijd,
bewerking.einddatumtijd as bwk_einddatumtijd,
bewerkingsoort.naam,
bewerkingsoort.layout,
bewerkingflow.bewerkingsnummer, 
bewerkingflow.volgnummer, 
bewerkingflow.bewerkingsoort, 
bewerkingflow.einddatumtijd , 
bewerkingflow.bewerkingaantal,
(select sum(tijd) from bewerkingtijd 
where bewerkingtijd.bewerkingsnummer = bewerking.bewerkingsnummer 
and bewerkingtijd.bewerkingflowid = bewerkingflow.id) 
as tijd
from bewerkingflow,bewerking, bewerkingsoort
where BEWERKING.startdatumtijd >= screendate2date('${performancestart}')
and BEWERKING.einddatumtijd is not null
and bewerking.productnummer = '${productnummer}'
and bewerkingflow.bewerkingsnummer = bewerking.bewerkingsnummer
and bewerkingsoort.bewerkingsoort = bewerkingflow.bewerkingsoort
and bewerkingsoort.layout in ('rapBEWERKINGFLOWBEWERK.php','rapBEWERKINGFLOWEINDCONTROLE.php')
and bewerkingsoort.reparatie = 0 
) BASE
group by productnummer,bewerkingsoort,naam
union 
select 
productnummer,
performance as norm,
bewerkingsoort,
naam,
todo,
besteed,
aantal,
tijd,
round(sum(startaantal) * 60 / sum(tijd)) as gemiddeld,
concat (round(sum(startaantal) * 60 / sum(tijd)), ' uit ', aantal_bewerkingen) as uurperformance
from (
select 
productnummer,
performance,
'Totaal' as bewerkingsoort,
'Totaal' as naam ,
(select startaantal from bewerking where bewerking.bewerkingsnummer = '${bewerkingsnummer}')  as todo,
(select sum(tijd) from bewerkingtijd where bewerkingtijd.bewerkingsnummer = '${bewerkingsnummer}') as besteed,
(select sum(bewerkingaantal) from bewerkingflow inner join
(select distinct bewerkingsnummer from bewerking 
where bewerking.productnummer = '${productnummer}' 
and bewerking.einddatumtijd is not null 
and bewerking.startdatumtijd >= screendate2date('${performancestart}')) a 
on bewerkingflow.bewerkingsnummer = a.bewerkingsnummer
where exists (select 1 from bewerkingsoort 
where bewerkingflow.bewerkingsoort = bewerkingsoort.bewerkingsoort
and bewerkingsoort.voortgang = 1)
and exists (select 1 from bewerkingtijd
where bewerkingflow.id = bewerkingtijd.bewerkingflowid)
) as aantal,
(select sum(startaantal) from bewerking
where bewerking.productnummer = '${productnummer}' 
and bewerking.einddatumtijd is not null 
and bewerking.startdatumtijd >= screendate2date('${performancestart}'))
as startaantal,
(select sum(tijd) from bewerkingtijd  inner join
( select distinct bewerkingsnummer from bewerking
where bewerking.productnummer = '${productnummer}'
and bewerking.einddatumtijd is not null 
and bewerking.startdatumtijd >= screendate2date('${performancestart}')) b
on bewerkingtijd.bewerkingsnummer = b.bewerkingsnummer
where exists (select 1 from bewerkingflow
where bewerkingflow.id = bewerkingtijd.bewerkingflowid)
) as tijd,
(select count(*) from bewerking
where bewerking.productnummer ='${productnummer}'
and bewerking.einddatumtijd is not null 
and bewerking.startdatumtijd >= screendate2date('${performancestart}'))  as aantal_bewerkingen
from product where productnummer = '${productnummer}'
) basetot`;
        return sql;
    }


    public async routes(req: Request, res: Response, next: NextFunction) {
        //
        let method = req.method;
        let action = db.fix(req.query.action || '');
        //
        Logger.request(req);
        //
        if (action == "select") {
            this.doSelect(req, res, next, this.dict);
        } else if (action == "explain") {
            this.doExplain(req, res, next, this.dict);
        } else if (action == "getHtml") {
            let bewerkingsnummer: any = db.fix(req.query.bewerkingsnummer || '');
            let productnummer: any = '';
            res.crudConnection = await db.waitConnection();
            let result = await Bewerkingflowperformance.print(req, res, next,bewerkingsnummer,productnummer);
            res.crudConnection.release();
            res.status(200).send(result);
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
