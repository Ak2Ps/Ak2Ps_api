
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import { Config } from '../config';
import { AsyncResource } from 'async_hooks';
//
const dict: Dict = {
    table: "bewerkingrap",
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

export class Bewerkingrap extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected getPerc(perc: number): string {
        let result = '';
        if (perc == 0) {
            return '0';
        }
        if (perc == 100) {
            return '100';
        }
        return perc.toFixed(1);
    }

    protected async doBewerkingrap(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let result = '';
        let sqlbewerking: string;
        let rowsbewerking: any;
        let rowbewerking: any;
        let sqlproduct: string;
        let rowsproduct: any;
        let rowproduct: any;
        let irowproduct = 0;
        let sqltekening: string;
        let rowstekening: any;
        let rowtekening: any;
        let toturen = 0;
        let totreparatie = 0;
        let totafkeur = 0;
        let sqltijd: string;
        let rowstijd: any;
        let rowtijd: any;
        let irowtijd = 0;
        let sqluitval: string;
        let rowsuitval: any;
        let rowuitval: any;
        let irowuitval = 0;
        //
        let bewerkingsnummer = db.fix(req.query.bewerkingsnummer || '');
        //
        res.crudConnection = await db.waitConnection();
        //
        sqlbewerking = `
select * from BEWERKING 
where bewerkingsnummer = '${bewerkingsnummer}' `;
        rowsbewerking = await db.waitQuery(res.crudConnection, sqlbewerking);
        if (rowsbewerking[0]) {
            rowbewerking = rowsbewerking[0];
            sqlproduct = `
select * 
from PRODUCT 
where productnummer = '${rowbewerking.PRODUCTNUMMER}'`;
            rowsproduct = await db.waitQuery(res.crudConnection, sqlproduct);
            result += '<table class="t">';
            result += '<tr>';
            result += '<td class="lth">';
            result += 'Bewerkingsoort';
            result += '</td>';
            result += '<td class="th">';
            result += 'Volgens<br>Tekeningnummer';
            result += '</td>';
            result += '<td class="lth">';
            result += 'Revisie';
            result += '</td>';
            result += '<td class="lth">';
            result += 'Datum';
            result += '</td>';
            result += '</tr>';
            sqltekening = `
select tekeningnummer, tekeningrevisie,
date2screendate(tekeningdatumtijd) as TEKENINGDATUM,
(select min(naam) from BEWERKINGSOORT where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) as bewerkingsoort
from BEWERKINGFLOW
where bewerkingsnummer = '${bewerkingsnummer}'
order by Startdatumtijd, bewerkingsoort, tekeningnummer`;
            rowstekening = await db.waitQuery(res.crudConnection, sqltekening);
            for (let irowtekening = 0; irowtekening < rowstekening.length; irowtekening++) {
                rowtekening = rowstekening[irowtekening];
                result += '<tr>';
                result += '<td class="ltr">' + rowtekening.BEWERKINGSOORT + '</td>';
                result += '<td class="tr">' + rowtekening.TEKENINGNUMMER + '</td>';
                result += '<td class="tr">' + rowtekening.TEKENINGREVISIE + '</td>';
                result += '<td class="tr">' + rowtekening.TEKENINGDATUM + '</td>';
                result += '</tr>';
            }
            result += "</table>";
            result += '<br>';
            //
            if (rowsproduct[irowproduct]) {
                rowproduct = rowsproduct[irowproduct];
                result += '<table class="t">';
                result += '<tr>';
                result += '<td class="lth">';
                result += 'Bewerkingsoort';
                result += '</td>';
                result += '<td class="th">';
                result += 'Uren';
                result += '</td>';
                result += '<td style="width:20px">&nbsp;</td>';
                result += '<td class="lth">';
                result += 'Uitval';
                result += '</td>';
                result += '<td class="lth">';
                result += 'Afkeur';
                result += '</td>';
                result += '<td class="th">';
                result += 'Reparatie';
                result += '</td>';
                result += '</tr>';

                toturen = 0;
                totreparatie = 0;
                totafkeur = 0;
                sqltijd = `
select 
(select min(naam) from BEWERKINGSOORT where BEWERKINGSOORT.bewerkingsoort = BEWERKINGTIJD.bewerkingsoort) as bewerkingsoort,
sum(tijd) as uren
from BEWERKINGTIJD
where BEWERKINGTIJD.bewerkingsnummer = '${bewerkingsnummer}'
group by bewerkingsoort
order by bewerkingsoort` ;
                rowstijd = await db.waitQuery(res.crudConnection, sqltijd);
                irowtijd = 0;
                sqluitval = `
select
sum(case when AantalReparatie = 0 then null else AantalReparatie end) as AantalReparatie,
sum(case when AantalAfkeur = 0 then null else AantalAfkeur end) as AantalAfkeur,
(select min(concat(uitval,' ',naam)) 
from UITVAL where UITVAL.UITVAL = BEWERKINGUITVAL.uitval) as uitval
from BEWERKINGUITVAL
where BEWERKINGUITVAL.bewerkingsnummer = '${bewerkingsnummer}'
group by uitval
having (sum(AantalReparatie) != 0 or sum(AantalAfkeur) != 0)
order by uitval`;
                rowsuitval = await db.waitQuery(res.crudConnection, sqluitval);
                irowuitval = 0;
                //

                while (rowsuitval[irowuitval] || rowstijd[irowtijd]) {
                    result += '<tr>';
                    if (rowstijd[irowtijd]) {
                        rowtijd = rowstijd[irowtijd];
                        irowtijd++;
                        result += '<td class="ltr" style="width:10em">';
                        result += rowtijd.BEWERKINGSOORT;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += Util.MakeHHMM(rowtijd.UREN);
                        toturen += Number(rowtijd.UREN);
                        result += '</td>';
                    } else {
                        result += '<td class="ltr">';
                        result += ' ';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += ' ';
                        result += '</td>';
                    }
                    result += '<td>';
                    result += ' ';
                    result += '</td>';
                    if (rowsuitval[irowuitval]) {
                        rowuitval = rowsuitval[irowuitval];
                        irowuitval++;
                        result += '<td class="ltr">';
                        result += rowuitval.UITVAL;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowuitval.AANTALAFKEUR;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowuitval.AANTALREPARATIE;
                        result += '</td>';
                        totafkeur += Number(rowuitval.AANTALAFKEUR);
                        totreparatie += Number(rowuitval.AANTALREPARATIE);
                    } else {
                        result += '<td class="ltr">';
                        result += ' ';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += ' ';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += ' ';
                        result += '</td>';
                    }
                    result += '</tr>';
                }
                result += '<td class="ltr">';
                result += '<b>Totaal:<b>';
                result += '</td>';
                result += '<td class="tr">';
                result += '<b>' + Util.MakeHHMM(toturen) + '</b>';
                toturen = 0;
                result += '</td>';
                result += '<td>';
                result += ' ';
                result += '</td>';
                result += '<td class="ltr">';
                result += '<b>Totaal:<b>';
                result += '</td>';
                result += '<td class="tr">';
                result += totafkeur.toFixed(0);
                result += '</td>';
                result += '<td class="tr">';
                result += totreparatie.toFixed(0)
                result += '</td>';

                result += '</table>';

                result += '<br>';

                result += '<textarea id="opmerking" style="height:10em;width:40em;border: 1px solid;">';
                result += '</textarea>';
                result += '<script type="text/javascript">document.getElementById("opmerking").innerHTML = unescape("'
                    + rowbewerking.OPMERKING + '");</script>';
                irowproduct++;
            }
        }
        //
        res.crudConnection.release();
        res.status(200).send(result);
        return;
    }


    protected async doNogtedoen(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let result = '';
        let sql: string;
        let rows: any;
        let row: any;
        let where = '';
        //
        let bewerkingsnummer = db.fix(req.query.bewerkingsnummer || '');
        //
        res.crudConnection = await db.waitConnection();
        //
        //
        // Bewerkingaantal uit BEWERKINGFLOW die gereed zijn, tov totaal-bewerkingaantal
        //
        sql = `
select
sum(case when einddatumtijd is null then 0 else Bewerkingaantal end) as aantal,
sum(Bewerkingaantal) as tedoen
from BEWERKINGFLOW`
        if (bewerkingsnummer != '') {
            if (where == '') {
                where += ' where ';
            } else {
                where += ' and ';
            }
            where += ` 
bewerkingsnummer = '${bewerkingsnummer}'`;
        }
        sql += ` 
${where}`;
        rows = await db.waitQuery(res.crudConnection, sql);
        let gedaan = 0;
        let tedoen = 0;
        let nogtedoen = 0;
        let perc = 0;
        if (rows[0]) {
            row = rows[0]
            gedaan = Number(row.AANTAL);
            tedoen = Number(row.TEDOEN);
        }
        if (tedoen >= gedaan) {
            if (tedoen != 0) {
                perc = 100 - (tedoen - gedaan) / tedoen * 100;
            }
            nogtedoen = tedoen - gedaan;
        } else {
            perc = 100;
            nogtedoen = 0;
        }
        result += '[';
        result += '\n{"y":'
            + gedaan.toFixed(0)
            + ',"tooltip":"'
            + gedaan.toFixed(0)
            + '","color":"yellowgreen", "label":"'
            + this.getPerc(perc)
            + '% gedaan"}';
        result += '\n,{"y":'
            + nogtedoen.toFixed(0)
            + ',"tooltip":"'
            + nogtedoen.toFixed(0)
            + '","color":"tomato", "label":"'
            + this.getPerc(100 - perc)
            + '% te doen"}';
        result += ']';
        //
        res.crudConnection.release();
        res.status(200).send(result);
        return;
    }

    protected async doAantaluur(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let result = '';
        let sql: string;
        let rows: any;
        let row: any;
        let swfirst = 1;
        //
        res.crudConnection = await db.waitConnection();
        //
        let bewerkingsnummer = db.fix(req.query.bewerkingsnummer || '');
        let productnummer = db.fix(req.query.productnummer || '');
        let afgesloten = db.fix(req.query.afgesloten || '');
        let datum = db.fix(req.query.datum || '');
        let datumvanaf = db.fix(req.query.datumvanaf || '');
        let datumtm = db.fix(req.query.datumtm || '');
        let ak2einddatumvanaf = db.fix(req.query.ak2einddatumvanaf || '');
        let ak2einddatumtm = db.fix(req.query.ak2einddatumtm || '');
        //
        let sqlpartbewerkingen = ` 
(select count(distinct bewerkingsoort)
from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer
and exists (
select 1 from BEWERKINGSOORT
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
and BEWERKINGSOORT.voortgang = 1
)
and exists (
select 1 from BEWERKINGTIJD
where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
))
as bewerkingen`;
        let sqlpartuitval = `
(select sum(ifnull(uitval,0))
from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer
)
as uitval`;
        let sqlpartaantal = `
(select sum(BEWERKINGFLOW.bewerkingaantal)
from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer
and exists (
select 1 from BEWERKINGSOORT
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
and BEWERKINGSOORT.voortgang = 1
)
and exists (
select 1 from BEWERKINGTIJD
where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
))
as aantal`;
        //
        let startstatistiek = await Util.waitParam(req, res, next, 'STARTSTATISTIEK');
        //
        // aantal bewerkingen die meedoen, totaal bewerkingaantal die meedoen, totaal aantal minuten
        //
        sql = `
select round(((aantal / bewerkingen) / uur)) as y,
BASE2.* from (
select
${sqlpartbewerkingen},
min(startdatumtijd) as start,
bewerkingsnummer,
${sqlpartaantal},
(sum(tijd) / 60) as uur
from (
select
BEWERKING.startdatumtijd, BEWERKING.bewerkingsnummer,
BEWERKINGFLOW.bewerkingsoort, BEWERKINGFLOW.bewerkingaantal as aantalgemaakt,
BEWERKINGTIJD.tijd
from BEWERKING,BEWERKINGFLOW,BEWERKINGTIJD
where BEWERKING.productnummer = '${productnummer}' and BEWERKINGTIJD.tijd > 0
and BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
and BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
and BEWERKING.startdatumtijd >= screendate2date('${startstatistiek}')`;
        if (afgesloten == 'on') {
            sql += `
and not isnull(BEWERKING.einddatumtijd)`;
        }
        if (datum != '') {
            sql += ` 
and date(BEWERKING.startdatumtijd) >= screendate2date('${datum}')`;
        }
        if (datumvanaf != '') {
            sql += `
and date(BEWERKING.einddatumtijd) >= screendate2date('${datumvanaf}')`;
        }
        if (datumtm != '') {
            sql += `
and date(BEWERKING.einddatumtijd) <= screendate2date('${datumtm}')`;
        }
        if (ak2einddatumvanaf != '') {
            sql += ` 
and (select max(BEWERKINGFLOW.einddatumtijd) 
from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) 
>= screendate2date('${ak2einddatumvanaf}')
and not exists (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
and BEWERKINGFLOW.einddatumtijd is null) `;
        }
        if (ak2einddatumtm != '') {
            sql += `
and (select max(BEWERKINGFLOW.einddatumtijd) 
from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) <= screendate2date('${ak2einddatumtm}')
and not exists (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
and BEWERKINGFLOW.einddatumtijd is null) `;
        }

        sql += `
) BASE
group by bewerkingsnummer
) BASE2
order by start, bewerkingsnummer`;
        rows = await db.waitQuery(res.crudConnection, sql);
        result += '[';
        swfirst = 1;
        for (let irow = 0; irow < rows.length; irow++) {
            row = rows[irow];
            if (row.Y == '') {
                row.Y = '0';
            }
            if (swfirst == 1) {
                swfirst = 0;
            } else {
                result += ',';
            }
            if (row.BEWERKINGSNUMMER == bewerkingsnummer) {
                result += '\n{"y":'
                    + row.Y
                    + ',"tooltip":"'
                    + row.Y
                    + '","color":"tomato"}';
            } else {
                result += '\n{"y":'
                    + row.Y
                    + ',"tooltip":"'
                    + row.Y
                    + '","color":"yellowgreen"}';
            }
        }
        result += ']';
        //
        res.crudConnection.release();
        res.status(200).send(result);
        return;
    }

    protected async doUitval(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let result = '';
        let sql: string;
        let rows: any;
        let row: any;
        let swfirst = 1;
        //
        res.crudConnection = await db.waitConnection();
        //
        let bewerkingsnummer = db.fix(req.query.bewerkingsnummer || '');
        let productnummer = db.fix(req.query.productnummer || '');
        let afgesloten = db.fix(req.query.afgesloten || '');
        let datum = db.fix(req.query.datum || '');
        let datumvanaf = db.fix(req.query.datumvanaf || '');
        let datumtm = db.fix(req.query.datumtm || '');
        let ak2einddatumvanaf = db.fix(req.query.ak2einddatumvanaf || '');
        let ak2einddatumtm = db.fix(req.query.ak2einddatumtm || '');
        //
        let sqlpartbewerkingen = ` 
(select count(distinct bewerkingsoort)
from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer
and exists (
select 1 from BEWERKINGSOORT
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
and BEWERKINGSOORT.voortgang = 1
)
and exists (
select 1 from BEWERKINGTIJD
where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
))
as bewerkingen`;
        let sqlpartuitval = `
(select sum(ifnull(uitval,0))
from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer
)
as uitval`;
        let sqlpartaantal = `
(select sum(BEWERKINGFLOW.bewerkingaantal)
from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer
and exists (
select 1 from BEWERKINGSOORT
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort
and BEWERKINGSOORT.voortgang = 1
)
and exists (
select 1 from BEWERKINGTIJD
where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id
))
as aantal`;
        //
        let startstatistiek = await Util.waitParam(req, res, next, 'STARTSTATISTIEK');
        //
        // aantal bewerkingen die meedoen, totaal bewerkingenaantal die meedoen, totaal uitval
        //
        sql = `
select round((uitval * 100 / (aantal / bewerkingen)),2) as y, 
BASE2.* from (
select
${sqlpartbewerkingen},
${sqlpartuitval},
min(startdatumtijd) as start,
bewerkingsnummer,
${sqlpartaantal},
1
from (
select startdatumtijd, bewerkingsnummer
from BEWERKING
where productnummer = '${productnummer}'
and BEWERKING.startdatumtijd >= screendate2date('${startstatistiek}')`;

        if (afgesloten == 'on') {
            sql += `
and not isnull(BEWERKING.einddatumtijd)`;
        }
        if (datum != '') {
            sql += ` 
and date(BEWERKING.startdatumtijd) >= screendate2date('${datum}')`;
        }
        if (datumvanaf != '') {
            sql += `
and date(BEWERKING.einddatumtijd) >= screendate2date('${datumvanaf}')`;
        }
        if (datumtm != '') {
            sql += `
and date(BEWERKING.einddatumtijd) <= screendate2date('${datumtm}')`;
        }
        if (ak2einddatumvanaf != '') {
            sql += ` 
and (select max(BEWERKINGFLOW.einddatumtijd) 
from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) 
>= screendate2date('${ak2einddatumvanaf}')
and not exists (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
and BEWERKINGFLOW.einddatumtijd is null) `;
        }
        if (ak2einddatumtm != '') {
            sql += `
and (select max(BEWERKINGFLOW.einddatumtijd) 
from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) <= screendate2date('${ak2einddatumtm}')
and not exists (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
and BEWERKINGFLOW.einddatumtijd is null) `;
        }

        sql += `
) BASE
group by bewerkingsnummer
) BASE2
order by start, bewerkingsnummer`;
        rows = await db.waitQuery(res.crudConnection, sql);
        result += '[';
        swfirst = 1;
        for (let irow = 0; irow < rows.length; irow++) {
            row = rows[irow];
            if (row.Y == '') {
                row.Y = '0';
            }
            if (swfirst == 1) {
                swfirst = 0;
            } else {
                result += ',';
            }
            if (row.BEWERKINGSNUMMER == bewerkingsnummer) {
                result += '\n{"y":'
                    + row.Y
                    + ',"tooltip":"'
                    + row.Y
                    + '","color":"yellow"}';
            } else {
                result += '\n{"y":'
                    + row.Y
                    + ',"tooltip":"'
                    + row.Y
                    + '","color":"lightblue"}';
            }
        }
        result += ']';
        //
        res.crudConnection.release();
        res.status(200).send(result);
        return;
    }

    protected async doTijdperbewerking(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let result = '';
        let sql = '';
        let rows: any;
        let row: any;
        let tltot = 0;
        let swfirst = 1;
        let perc = 0;
        //
        res.crudConnection = await db.waitConnection();
        //
        //
        let bewerkingsnummer = db.fix(req.query.bewerkingsnummer || '');
        let productnummer = db.fix(req.query.productnummer || '');
        let afgesloten = db.fix(req.query.afgesloten || '');
        let datum = db.fix(req.query.datum || '');
        let datumvanaf = db.fix(req.query.datumvanaf || '');
        let datumtm = db.fix(req.query.datumtm || '');
        let ak2einddatumvanaf = db.fix(req.query.ak2einddatumvanaf || '');
        let ak2einddatumtm = db.fix(req.query.ak2einddatumtm || '');
        //
        let startstatistiek = await Util.waitParam(req, res, next, 'STARTSTATISTIEK');
        //
        sql = `
select min(BEWERKINGSOORT.KLEUR) as kleur,
min(BEWERKINGSOORT.NAAM) as BEWERKINGSOORT_OMS,
sum(TIJD) as Y,
BEWERKINGTIJD.bewerkingsoort
from BEWERKINGTIJD,BEWERKINGSOORT,BEWERKINGFLOW,BEWERKING
where BEWERKING.bewerkingsnummer = BEWERKINGFLOW.bewerkingsnummer
and BEWERKINGFLOW.id = BEWERKINGTIJD.bewerkingflowid
and BEWERKINGSOORT.BEWERKINGSOORT = BEWERKINGFLOW.BEWERKINGSOORT
and BEWERKING.startdatumtijd >= screendate2date('${startstatistiek}')`;

        if (bewerkingsnummer != '') {
            sql += ` 
and BEWERKING.bewerkingsnummer = '${bewerkingsnummer}'`;
        } else {
            if (productnummer != '') {
                sql += `
and BEWERKING.productnummer = '${productnummer}'`;
            }
            if (afgesloten == 'on') {
                sql += `
and not isnull(BEWERKING.einddatumtijd)`;
            }
            if (datum != '') {
                sql += ` 
and date(BEWERKING.startdatumtijd) >= screendate2date('${datum}')`;
            }
            if (datumvanaf != '') {
                sql += `
and date(BEWERKING.einddatumtijd) >= screendate2date('${datumvanaf}')`;
            }
            if (datumtm != '') {
                sql += `
and date(BEWERKING.einddatumtijd) <= screendate2date('${datumtm}')`;
            }
            if (ak2einddatumvanaf != '') {
                sql += ` 
and (select max(BEWERKINGFLOW.einddatumtijd) 
from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) 
>= screendate2date('${ak2einddatumvanaf}')
and not exists (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
and BEWERKINGFLOW.einddatumtijd is null) `;
            }
            if (ak2einddatumtm != '') {
                sql += `
and (select max(BEWERKINGFLOW.einddatumtijd) 
from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) <= screendate2date('${ak2einddatumtm}')
and not exists (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
and BEWERKINGFLOW.einddatumtijd is null) `;
            }
        }
        sql += `
group by BEWERKINGFLOW.bewerkingsoort
order by BEWERKINGFLOW.bewerkingsoort`;
        rows = await db.waitQuery(res.crudConnection, sql);
        tltot = 0;
        for (let irow = 0; irow < rows.length; irow++) {
            row = rows[irow];
            tltot += Number(row.Y);
        }
        result += '[';
        swfirst = 1;
        for (let irow = 0; irow < rows.length; irow++) {
            row = rows[irow];
            if (row.Y == '') {
                row.Y = '0';
            }
            if (swfirst == 1) {
                swfirst = 0;
            } else {
                result += ',';
            }
            perc = 0;
            if (tltot > 0) {
                perc = Number(row.Y) / tltot * 100;
            }
            result += '\n{"y":'
                + row.Y
                + ',"tooltip":"'
                + row.Y
                + '","color":"'
                + row.KLEUR
                + '", "label":"'
                + row.BEWERKINGSOORT_OMS
                + ' ('
                + this.getPerc(perc)
                + '%) '
                + '"}';
        }
        result += ']';
        //
        res.crudConnection.release();
        res.status(200).send(result);
        return;
    }

    public async routes(req: Request, res: Response, next: NextFunction) {
        //
        let method = req.method;
        let action = db.fix(req.query.action||'');
        //
        if (action == "bewerkingrap") {
            this.doBewerkingrap(req, res, next, this.dict);
        } else if (action == "nogtedoen") {
            this.doNogtedoen(req, res, next, this.dict);
        } else if (action == "aantaluur") {
            this.doAantaluur(req, res, next, this.dict);
        } else if (action == "uitval") {
            this.doUitval(req, res, next, this.dict);
        } else if (action == "tijdperbewerking") {
            this.doTijdperbewerking(req, res, next, this.dict);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
