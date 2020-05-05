
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import { Config } from '../config';
//
import { Bewerkingflowperformance } from './bewerkingflowperformance';
import { Ecm } from './ecm';
//
const dict: Dict = {
    table: "bewerkingfloweindcontrole",
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

export class Bewerkingfloweindcontrole extends Crud {
    constructor() {
        super(
            dict
        )
    }


    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let bewerkingsnummer = '';
        let productnummer = '';
        let thisECMDatum = '';
        let thisUrl = '';
        let thisDate = '';
        let id = db.fix(req.query.id || '');
        let data: any;
        let totAfkeur = 0;
        let totReparatie = 0;
        //
        let result = '';
        let rows: any;
        let row: any;
        let sql: string;
        let sqlupdate: string;
        let sqlbewerking: string;
        let rowsbewerking: any;
        let rowbewerking: any;
        let sqlproduct: string;
        let rowsproduct: any;
        let rowproduct: any = {};
        let sqlproductlijn: string;
        let rowsproductlijn: any;
        let rowproductlijn: any = {};
        let sqltijd: string;
        let rowstijd: any;
        let rowtijd: any;
        let irowtijd: number;
        let sqluitval: string;
        let rowsuitval: any;
        let rowuitval: any;
        //
        res.crudConnection = await db.waitConnection();
        //
        sql = `
select BEWERKINGFLOW.*,
date2screendate(startdatumtijd) as STARTDATUM,
date2screendate(plandatumtijd) as PLANDATUM,
date2screendate(einddatumtijd) as EINDDATUM,
date2screendate(tekeningdatumtijd) as TEKENINGDATUM,
case when uitval = 0 then null else uitval end as uitval_oms,
(select naam 
from BEWERKINGSOORT 
where BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort) 
as NAAM
from BEWERKINGFLOW
where id = '${id}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            row = rows[0];
            bewerkingsnummer = row.BEWERKINGSNUMMER;
            sqlbewerking = `
select BEWERKING.*,
date2screendate(initstartdatumtijd) as INITSTARTDATUM,
date2screendate(startdatumtijd) as STARTDATUM,
date2screendate(plandatumtijd) as PLANDATUM,
date2screendate(einddatumtijd) as EINDDATUM
from BEWERKING 
where bewerkingsnummer = '${row.BEWERKINGSNUMMER}'`;
            rowsbewerking = await db.waitQuery(res.crudConnection, sqlbewerking);
            if (rowsbewerking[0]) {
                rowbewerking = rowsbewerking[0];
                productnummer = rowbewerking.PRODUCTNUMMER;
                sqlproduct = `
select * 
from PRODUCT 
where productnummer = '${rowbewerking.PRODUCTNUMMER}'`;
                rowsproduct = await db.waitQuery(res.crudConnection, sqlproduct);
                if (rowsproduct[0]) {
                    rowproduct = rowsproduct[0];
                } else {
                    rowproduct.PRODUCTNUMMER = rowbewerking.PRODUCTNUMMER;
                    rowproduct.PRODUCTNAAM = '?????';
                }
                thisECMDatum = '';
                if (rowbewerking.INITSTARTDATUM != "") {
                    thisECMDatum = rowbewerking.INITSTARTDATUM;
                } else if (rowbewerking.STARTDATUM != "") {
                    thisECMDatum = rowbewerking.STARTDATUM;
                } else if (rowbewerking.PLANDATUM != "") {
                    thisECMDatum = rowbewerking.PLANDATUM;
                } else if (rowbewerking.EINDDATUM != "") {
                    thisECMDatum = rowbewerking.EINDDATUM;
                }
                if (rowbewerking.EINDCONTROLENUMMER == '') {
                    // dd-mm-jjjj -> jjjj-mm-dd
                    // 01 34 6789
                    thisDate = thisECMDatum.substr(6, 4) + '-'
                        + thisECMDatum.substr(3, 2) + '-'
                        + thisECMDatum.substr(0, 2);
                    data = await Ecm.waitEcm(req, res, next,
                        {
                            Product: rowbewerking.PRODUCTNUMMER,
                            Size: row.BEWERKINGAANTAL,
                            Date: thisDate,
                            Bewerking: rowbewerking.BEWERKINGSNUMMER,
                        });
                    if (data == false) {
                        rowbewerking.EINDCONTROLENUMMER = `Timeout Error on ECM`;
                    } else {
                        if (data.ErrorCode > 0) {
                            rowbewerking.EINDCONTROLENUMMER = data.ErrorDescription;
                        } else {
                            rowbewerking.EINDCONTROLENUMMER = data.Number;
                            // update de BEWERKING table ...
                            sqlupdate = `
update BEWERKING set
eindcontrolenummer = '${rowbewerking.EINDCONTROLENUMMER}'
where bewerkingsnummer = '${row.BEWERKINGSNUMMER}'`;
                            await db.waitQuery(res.crudConnection, sqlupdate);
                        }
                    }
                }

                result += '<table  class="t">';
                result += '<tr><td  rowspan="99" id="b_barcode" style="width:400px;"></td></tr>' + "\n";
                result += '<tr><td></td><td style="width:1em">&nbsp;</td><td class="lth" style="width:10em">Volgens tekening</td><td class="th" style="width:10em;font-weight:normal;"><b>Nr:</b>&nbsp;'
                    + row.TEKENINGNUMMER
                    + '</td></tr>' + "\n";
                result += '<tr><td></td><td></td><td class="ltr"><b>Revisie:&nbsp;</b>'
                    + row.TEKENINGREVISIE
                    + '</td><td class="tr"><b>Datum:&nbsp;</b>'
                    + row.TEKENINGDATUM
                    + '</td></tr>' + "\n";
                result += '</table>';

                result += '<script>document.getElementById("b_barcode").innerHTML = draw39("B'
                    + Config.app + '-' + row.BEWERKINGSNUMMER
                    + '-' + row.VOLGNUMMER + '",1,1);</script>';

                result += '<table class="t">';
                result += '<tr>';
                result += '<td class="lth">';
                result += 'Productienummer';
                result += '</td>';
                result += '<td class="th">';
                result += 'Volgnummer';
                result += '</td>';
                result += '<td class="th">';
                result += 'Product';
                result += '</td>';
                result += '<td class="th">';
                result += 'Naam';
                result += '</td>';
                result += '<td class="th">';
                result += 'ECM Nummer';
                result += '</td>';
                result += '<td class="th">';
                result += 'ECM Datum';
                result += '</td>';
                result += "</tr>\n";
                result += '<tr>';
                result += '<td class="ltr">';
                result += row.BEWERKINGSNUMMER;
                result += '</td>';
                result += '<td class="tr">';
                result += row.VOLGNUMMER;
                result += '</td>';
                result += '<td class="tr">';
                result += rowproduct.PRODUCTNUMMER;
                result += '</td>';
                result += '<td class="tr">';
                result += rowproduct.PRODUCTNAAM;
                result += '</td>';
                result += '<td class="tr">';
                result += rowbewerking.EINDCONTROLENUMMER;
                result += '</td>';
                result += '<td class="tr">';
                result += thisECMDatum;
                result += '</td>';
                result += "</tr>\n";
                result += '</table>';

                result += '<table class="t">';
                result += '<tr>';
                result += '<td class="lth">';
                result += 'Eindcontrole';
                result += '</td>';
                result += '<td class="th">';
                result += 'Te controleren';
                result += '</td>';
                result += '<td class="th">';
                result += 'Start Controle';
                result += '</td>';
                result += '<td class="th">';
                result += 'Gereed Controle';
                result += '</td>';
                result += "</tr>\n";
                result += '<tr>';
                result += '<td class="ltr">';
                result += row.NAAM;
                result += '</td>';
                result += '<td class="tr">';
                result += row.BEWERKINGAANTAL;
                result += '</td>';
                result += '<td class="tr">';
                result += row.STARTDATUM + '&nbsp;';
                result += '</td>';
                result += '<td class="tr">';
                result += row.PLANDATUM;
                result += '</td>';
                result += "</tr>\n";
                result += '</table>';

                result += '<table class="t">';
                result += '<tr>';
                result += '<td class="lth">';
                result += 'Bewerkt';
                result += '</td>';
                result += '<td class="th">';
                result += 'Uitval';
                result += '</td>';
                result += '<td class="th">';
                result += 'Aantal Goed';
                result += '</td>';
                result += '<td class="th">';
                result += 'Datum gereed';
                result += '</td>';
                result += "</tr>\n";
                result += '<tr>';
                result += '<td class="ltr">';
                result += '&nbsp;';
                result += '</td>';
                result += '<td class="tr">';
                result += row.UITVAL_OMS;
                result += '</td>';
                result += '<td class="tr">';
                result += '&nbsp;';
                result += '</td>';
                result += '<td class="tr">';
                result += row.EINDDATUM;
                result += '</td>';
                result += "</tr>\n";
                result += '</table>';

                result += '<table class="t">';
                result += '<tr>';
                result += '<td class="lth">';
                result += 'Medewerker';
                result += '</td>';
                result += '<td class="th">';
                result += 'Datum';
                result += '</td>';
                result += '<td class="th">';
                result += 'Starttijd';
                result += '</td>';
                result += '<td class="th">';
                result += 'Eindtijd';
                result += '</td>';
                result += '<td class="th">';
                result += ' v ';
                result += '</td>';
                result += '<td style="width:10px">';
                result += ' ';
                result += '</td>';
                result += '<td class="lth">';
                result += 'Uitval';
                result += '</td>';
                result += '<td class="th">';
                result += 'Afkeur';
                result += '</td>';
                result += '<td class="th">';
                result += 'Reparatie';
                result += '</td>';
                result += "</tr>\n";

                sqltijd = `
select 
BEWERKINGTIJD.*,
(select min(naam) from GEBRUIKER where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) as gebruiker,
date2screendate(startdatumtijd) as DATUM,
date2screentime(startdatumtijd) as START,
date2screentime(einddatumtijd) as EIND
from BEWERKINGTIJD
where BEWERKINGTIJD.bewerkingflowid = '${row.ID}'
order by startdatumtijd,id`;
                rowstijd = await db.waitQuery(res.crudConnection, sqltijd);
                irowtijd = 0;

                sqluitval = `
insert into BEWERKINGUITVAL 
(bewerkingsnummer,bewerkingflowid, productnummer, uitval)
select 
'${row.BEWERKINGSNUMMER}',
'${row.ID}',
'${rowproduct.PRODUCTNUMMER}',
'uitval'
from UITVAL
where not exists (
select 1 from BEWERKINGUITVAL where BEWERKINGUITVAL.uitval = UITVAL.UITVAL
and bewerkingflowid = '${row.ID}')`;
                await db.waitQuery(res.crudConnection, sqluitval);
                sqluitval = ` 
select 
case when AantalReparatie = 0 then null else AantalReparatie end as AantalReparatie,
case when AantalAfkeur = 0 then null else AantalAfkeur end as AantalAfkeur,
(select min(concat(uitval,' ',naam))
from UITVAL 
where UITVAL.UITVAL = BEWERKINGUITVAL.uitval) as uitval
from BEWERKINGUITVAL
where BEWERKINGUITVAL.bewerkingflowid = '${row.ID}'
order by Bewerkingsnummer,uitval`;
                rowsuitval = await db.waitQuery(res.crudConnection, sqluitval);
                totAfkeur = 0;
                totReparatie = 0;
                for (let irowuitval = 0; irowuitval < rowsuitval.length; irowuitval++) {
                    rowuitval = rowsuitval[irowuitval];
                    result += '<tr>';
                    if (rowstijd[irowtijd]) {
                        rowtijd = rowstijd[irowtijd];
                        result += '<td class="ltrnaam" style="width:10em">';
                        result += rowtijd.GEBRUIKER;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowtijd.DATUM;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowtijd.START;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowtijd.EIND;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += ' v ';
                        result += '</td>';
                        irowtijd++;
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
                        result += '<td class="tr">';
                        result += ' ';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += ' ';
                        result += '</td>';
                    }
                    result += '<td>';
                    result += ' ';
                    result += '</td>';
                    result += '<td class="ltrnaam">';
                    result += rowuitval.UITVAL;
                    result += '</td>';
                    result += '<td class="tr">';
                    result += rowuitval.AANTALAFKEUR;
                    totAfkeur += Number(rowuitval.AANTALAFKEUR);
                    result += '</td>';
                    result += '<td class="tr">';
                    result += rowuitval.AANTALREPARATIE;
                    totReparatie += Number(rowuitval.AANTALREPARATIE);
                    result += '</td>';
                    result += "</tr>\n";
                }
                if (rowstijd[irowtijd]) {
                    result += '<td class="ltr" style="width:10em">';
                    result += rowtijd.GEBRUIKER;
                    result += '</td>';
                    result += '<td class="tr">';
                    result += rowtijd.DATUM;
                    result += '</td>';
                    result += '<td class="tr">';
                    result += rowtijd.START;
                    result += '</td>';
                    result += '<td class="tr">';
                    result += rowtijd.EIND;
                    result += '</td>';
                    result += '<td class="tr">';
                    result += ' v ';
                    result += '</td>';
                    irowtijd++;
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
                    result += '<td class="tr">';
                    result += ' ';
                    result += '</td>';
                    result += '<td class="tr">';
                    result += ' ';
                    result += '</td>';
                }
                result += '<td>';
                result += ' ';
                result += '</td>';
                result += '<td class="ltr">';
                result += 'Totaal:';
                result += '</td>';
                result += '<td class="tr">';
                if (totAfkeur != 0) {
                    result += String(totAfkeur);
                }
                result += '</td>';
                result += '<td class="tr">';
                if (totReparatie != 0) {
                    result += String(totReparatie);
                }
                result += '</td>';
                result += "</tr>\n";
                result += '</table>';

                result += '<table class="t">';
                result += '<tr>';
                result += '<td rowspan=99>';
                result += '<textarea id="opmerking" style="height:10em;width:30em;border: 1px solid;" readonly=readonly>';
                result += '</textarea>';
                result += '<script type="text/javascript">document.getElementById("opmerking").innerHTML = unescape("' + rowbewerking.OPMERKING + '");</script>';
                result += '</td>';
                result += '<td rowspan=99 style="width:3em"></td>';
                result += "</tr>\n";

                result += '<tr>';
                result += '<td class="lth">Magazijn voorraad:';
                result += '</td>';
                result += '<td class="lth" style="width:5em">&nbsp;</td>';
                result += "</tr>\n";

                result += '<tr>';
                result += '<td class="lth">Totaal goed uit productie:';
                result += '</td>';
                result += '<td class="lth" style="width:5em">&nbsp;</td>';
                result += "</tr>\n";

                result += '<tr>';
                result += '<td class="lth">Totaal goed uit productie:';
                result += '</td>';
                result += '<td class="lth" style="width:5em">&nbsp;</td>';
                result += "</tr>\n";

                result += '<tr>';
                result += '<td>&nbsp;';
                result += '</td>';
                result += "</tr>\n";

                result += '<tr>';
                result += '<td class="lth">Nieuwe voorraad:';
                result += '</td>';
                result += '<td class="lth" style="width:5em">&nbsp;</td>';
                result += "</tr>\n";

                result += '</table>';
            }
        }
        result += await Bewerkingflowperformance.print(req, res, next, bewerkingsnummer, productnummer);
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
