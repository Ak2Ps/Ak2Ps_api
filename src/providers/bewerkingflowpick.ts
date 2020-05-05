
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import { Config } from '../config';
//
const dict: Dict = {
    table: "bewerkingflowpick",
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

export class Bewerkingflowpick extends Crud {
    constructor() {
        super(
            dict
        )
    }


    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
            let bewerkingsnummer = '';
            let productnummer = '';
            let id = db.fix(req.query.id || '');
            let result = '';
            let rows: any;
            let row: any;
            let sql: string;
            let sqlonderdeel: string;
            let rowsonderdeel: any;
            let rowonderdeel: any;
            let faktor: string;
            let sqlonderdeel1: string;
            let rowsonderdeel1: any;
            let rowonderdeel1: any;
            let faktor1: string;
            let sqlonderdeel2: string;
            let rowsonderdeel2: any;
            let rowonderdeel2: any;
            let faktor2: string;
            let sqlonderdeel3: string;
            let rowsonderdeel3: any;
            let rowonderdeel3: any;
            let faktor3: string;
            let sqlonderdeel4: string;
            let rowsonderdeel4: any;
            let rowonderdeel4: any;
            let faktor4: string;
            let sqlonderdeel5: string;
            let rowsonderdeel5: any;
            let rowonderdeel5: any;
            let faktor5: string;
            let sqlonderdeel6: string;
            let rowsonderdeel6: any;
            let rowonderdeel6: any;
            let faktor6: string;
            let sqlonderdeel99: string;
            let rowsonderdeel99: any;
            let rowonderdeel99: any;
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
            let tlregels = 0;
            //
            res.crudConnection = await db.waitConnection();
            //

            sql = `
select BEWERKINGFLOW.*,
date2screendate(startdatumtijd) as STARTDATUM,
date2screendate(plandatumtijd) as PLANDATUM,
date2screendate(einddatumtijd) as EINDDATUM,
case when uitval = 0 then null else uitval end as uitval_oms,
(select naam from BEWERKINGSOORT 
where BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort)
as NAAM
from BEWERKINGFLOW
where id = '${id}'`;
            rows = await db.waitQuery(res.crudConnection, sql);
            if (rows[0]) {
                row = rows[0];
                sqlbewerking = `
select * 
from BEWERKING 
where bewerkingsnummer = '${row.BEWERKINGSNUMMER}'`;
                rowsbewerking = await db.waitQuery(res.crudConnection, sqlbewerking);
                if (rowsbewerking[0]) {
                    rowbewerking = rowsbewerking[0];
                    sqlproduct = `
select * 
from PRODUCT
where productnummer = '${rowbewerking.PRODUCTNUMMER}'`;
                    rowsproduct = await db.waitQuery(res.crudConnection, sqlproduct);
                    if (rowsproduct[0]) {
                        rowproduct = rowsproduct[0];
                    } else {
                        rowproduct = {};
                        rowproduct.PRODUCTNUMMER = rowbewerking.PRODUCTNUMMER;
                        rowproduct.PRODUCTNAAM = '?????';
                    }

                    result += '<table><tr>';
                    result += '<td id="b_barcode" style="width:400px;"></td>';
                    result += '</tr>\n</table><br>';

                    result += '<script>document.getElementById("b_barcode").innerHTML = draw39("B'
                        + Config.app + '-'
                        + row.BEWERKINGSNUMMER + '-'
                        + row.VOLGNUMMER + '",1,1);</script>';

                    result += '<table class="t">';
                    result += '<tr>';
                    result += '<td class="lth">';
                    result += 'Productienummer';
                    result += '</td>';
                    result += '<td class="lth">';
                    result += 'Volgnummer';
                    result += '</td>';
                    result += '<td class="lth">';
                    result += 'Product';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Naam';
                    result += '</td>';
                    result += '</tr>\n';
                    result += '<tr>';
                    result += '<td class="ltr">';
                    result += row.BEWERKINGSNUMMER;
                    result += '</td>';
                    result += '<td class="ltr">';
                    result += row.VOLGNUMMER;
                    result += '</td>';
                    result += '<td class="ltr">';
                    result += rowproduct.PRODUCTNUMMER;
                    result += '</td>';
                    result += '<td class="tr">';
                    result += rowproduct.PRODUCTNAAM;
                    result += '</td>';
                    result += '</tr>\n';
                    result += '</table>';

                    result += '<br>';

                    result += '<table class="t">';
                    result += '<tr>';

                    result += '<td class="lth">';
                    result += 'Bewerking';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Te bewerken';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Start<br>Bewerking';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Gereed<br>Bewerking';
                    result += '</td>';
                    result += '<td style="width:1em">&nbsp;</td>';
                    result += '<td class="lth">';
                    result += 'Aantal Bewerkt';
                    result += '</td>';
                    result += '</tr>\n';
                    result += '<tr>';
                    result += '<td class="ltrnaam">';
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
                    result += '<td style="width:1em">&nbsp;</td>';
                    result += '<td class="ltr">';
                    result += '';
                    result += '</td>';
                    result += '</tr>\n';
                    result += '</table>';

                    result += '<br>';

                    result += '<table class="t">';
                    result += '<tr>';
                    result += '<td class="lth">';
                    result += 'Onderdeel';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Naam';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Locatie';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Factor';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Nodig';
                    result += '</td>';
                    result += '<td class="lth">';
                    result += 'Gepicked';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Restant';
                    result += '</td>';
                    result += '<td class="th">';
                    result += 'Verschil';
                    result += '</td>';
                    result += '</tr>\n';
                    // Level 0
                    sqlonderdeel = `
select * from ONDERDEEL,PRODUCT
where ONDERDEEL.productnummer = '${rowproduct.PRODUCTNUMMER}'
and ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer
and ONDERDEEL.onderdeelnummer = PRODUCT.productnummer
order by ONDERDEEL.onderdeelnummer`;
                    rowsonderdeel = await db.waitQuery(res.crudConnection, sqlonderdeel);
                    for (let irowonderdeel = 0; irowonderdeel < rowsonderdeel.length; irowonderdeel++) {
                        rowonderdeel = rowsonderdeel[irowonderdeel];
                        faktor = Number(rowonderdeel.FAKTOR).toFixed(7);
                        result += '<tr>';
                        result += '<td class="ltr">';
                        result += rowonderdeel.PRODUCTNUMMER;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowonderdeel.PRODUCTNAAM;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowonderdeel.LOCATIE;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += Number(faktor);
                        result += '</td>';
                        result += '<td class="tr">';
                        result += (Number(faktor) * Number(row.BEWERKINGAANTAL)).toFixed(0);
                        result += '</td>';
                        result += '<td class="tr">';
                        result += '&nbsp;';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += '&nbsp;';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += '&nbsp;';
                        result += '</td>';
                        result += '</tr>\n';
                        //Level 1
                        sqlonderdeel1 = `
                        select * 
from ONDERDEEL,PRODUCT
where ONDERDEEL.productnummer = '${rowonderdeel.PRODUCTNUMMER}'
and ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer
and ONDERDEEL.onderdeelnummer = PRODUCT.productnummer
order by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer`;
                        rowsonderdeel1 = await db.waitQuery(res.crudConnection, sqlonderdeel1);
                        for (let irowonderdeel1 = 0; irowonderdeel1 < rowsonderdeel1.length; irowonderdeel1++) {
                            rowonderdeel1 = rowsonderdeel1[irowonderdeel1];
                            faktor1 = (Number(rowonderdeel1.FAKTOR) * Number(faktor)).toFixed(7);
                            // Level2
                            sqlonderdeel2 = `
select * 
from ONDERDEEL,PRODUCT
where ONDERDEEL.productnummer = '${rowonderdeel1.PRODUCTNUMMER}'
and ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer
and ONDERDEEL.onderdeelnummer = PRODUCT.productnummer
order by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer`;
                            rowsonderdeel2 = await db.waitQuery(res.crudConnection, sqlonderdeel2);
                            for (let irowonderdeel2 = 0; irowonderdeel2 < rowsonderdeel2.length; irowonderdeel2++) {
                                rowonderdeel2 = rowsonderdeel2[irowonderdeel2];
                                faktor2 = (Number(rowonderdeel2.FAKTOR) * Number(faktor1)).toFixed(7);
                                // Level 3
                                sqlonderdeel3 = `
select * 
from ONDERDEEL,PRODUCT
where ONDERDEEL.productnummer = '${rowonderdeel2.PRODUCTNUMMER}'
and ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer
and ONDERDEEL.onderdeelnummer = PRODUCT.productnummer
order by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer`;
                                rowsonderdeel3 = await db.waitQuery(res.crudConnection, sqlonderdeel3);
                                for (let irowonderdeel3 = 0; irowonderdeel3 < rowsonderdeel3.length; irowonderdeel3++) {
                                    rowonderdeel3 = rowsonderdeel3[irowonderdeel3];
                                    faktor3 = (Number(rowonderdeel3.FAKTOR) * Number(faktor2)).toFixed(7);
                                    // Level 4
                                    sqlonderdeel4 = `
select * 
from ONDERDEEL,PRODUCT
where ONDERDEEL.productnummer = '${rowonderdeel3.PRODUCTNUMMER}'
and ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer
and ONDERDEEL.onderdeelnummer = PRODUCT.productnummer
order by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer`;

                                    rowsonderdeel4 = await db.waitQuery(res.crudConnection, sqlonderdeel4);
                                    for (let irowonderdeel4 = 0; irowonderdeel4 < rowsonderdeel4.length; irowonderdeel4++) {
                                        rowonderdeel4 = rowsonderdeel4[irowonderdeel4];
                                        faktor4 = (Number(rowonderdeel4.FAKTOR) * Number(faktor3)).toFixed(7);

                                        // Level 5
                                        sqlonderdeel5 = `
select * 
from ONDERDEEL,PRODUCT
where ONDERDEEL.productnummer = '${rowonderdeel4.PRODUCTNUMMER}'
and ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer
and ONDERDEEL.onderdeelnummer = PRODUCT.productnummer
order by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer`;

                                        rowsonderdeel5 = await db.waitQuery(res.crudConnection, sqlonderdeel5);
                                        for (let irowonderdeel5 = 0; irowonderdeel5 < rowsonderdeel5.length; irowonderdeel5++) {
                                            rowonderdeel5 = rowsonderdeel5[irowonderdeel5];
                                            faktor5 = (Number(rowonderdeel5.FAKTOR) * Number(faktor4)).toFixed(7);

                                            // Level 99
                                            sqlonderdeel99 = `
select * 
from ONDERDEEL,PRODUCT
where ONDERDEEL.productnummer = '${rowonderdeel5.PRODUCTNUMMER}'
and ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer
and ONDERDEEL.onderdeelnummer = PRODUCT.productnummer
order by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer`;
                                            rowsonderdeel99 = await db.waitQuery(res.crudConnection, sqlonderdeel99);
                                            for (let irowonderdeel99 = 0; irowonderdeel99 < rowsonderdeel99.length; irowonderdeel99++) {
                                                rowonderdeel99 = rowsonderdeel99[irowonderdeel99];
                                                result += '<tr>';
                                                result += '<td class="ltr">';
                                                result += 'Onderdeel in onderdeel probleem';
                                                result += '</td>';
                                                result += '<td class="tr">';
                                                result += '????';
                                                result += '</td>';
                                                result += '<td class="tr">';
                                                result += '????';
                                                result += '</td>';
                                                result += '<td class="tr">';
                                                result += '????';
                                                result += '</td>';
                                                result += '<td class="tr">';
                                                result += '????';
                                                result += '</td>';
                                                result += '</tr>\n';
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    result += '</table>';

                    result += '<br>';

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
                    result += '</tr>\n';

                    sqltijd = `
select BEWERKINGTIJD.*,
(select min(naam) from GEBRUIKER where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) as gebruiker,
date2screendate(startdatumtijd) as DATUM,
date2screentime(startdatumtijd) as START,
date2screentime(einddatumtijd) as EIND
from BEWERKINGTIJD
where BEWERKINGTIJD.bewerkingflowid = '${row.ID}'
order by startdatumtijd,id`;
                    rowstijd = await db.waitQuery(res.crudConnection, sqltijd);

                    tlregels = 0;
                    while (tlregels < 8) {
                        tlregels = tlregels + 1;
                        result += '<tr>';

                        if (rowstijd[tlregels-1]) {
                            rowtijd = rowstijd[tlregels-1];
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
                            result += 'v';
                            result += '</td>';
                        } else {
                            result += '<td class="ltr">';
                            result += '.';
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
                        result += '</tr>\n';
                    }
                    result += '</table>';
                    result += '<br>';

                    result += '<textarea id="opmerking" style="height:10em;width:40em;border: 1px solid;" readonly=readonly>';
                    result += '</textarea>';
                    result += '<script type="text/javascript">document.getElementById("opmerking").innerHTML = unescape("'
                        + rowbewerking.OPMERKING + '");</script>';
                }
            }
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
