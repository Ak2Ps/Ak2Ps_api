
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import * as fs from 'fs';
import { Config } from '../config';
import { AsyncResource } from 'async_hooks';
//

export class Retourtextfragmenten {

    constructor() {
    }

    public static async getBarcode(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        result = `<div id="pageheader" style="display:none">
<div style="height:${em};">&nbsp;</div>
<div style="height:6em">
<table><tr>
<td id="b_barcode" style="width:400px;"></td>
</tr></table><br>
</div>
</div>`;
        return (result);
    }

    public static async getHeader(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        result = `<div style="height:${em}">
<table class="t">
<tr>
<td>&nbsp;</td>
</tr>
</table>
</div>`;
        return (result);
    }

    public static async getKlantHeader(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += (`<div style="height:${em};">`);
        result += (`<table class="t">`);
        // Datum
        result += (`<tr>`);
        result += (`<td class="leftmargin">&nbsp;</td>`);
        if (res.crudData.taal == 'nl') {
            value = "Datum:";
        } else {
            value = "Date:";
        }
        result += (`<td class="leftlabel">${value}</td>`);
        result += (`<td>`);
        result += (res.crudData.row.STARTDATUM);
        result += (`</td>`);
        result += (`</tr>`);
        // Onze referentie
        result += (`<tr>`);
        result += (`<td class="leftmargin">&nbsp;</td>`);
        if (res.crudData.taal == 'nl') {
            value = "Onze referentie";
        } else {
            value = "Our reference:";
        }
        result += (`<td class="leftlabel">${value}</td>`);
        result += (`<td>`);
        result += (res.crudData.row.REFERENTIE);
        result += (`</td>`);
        result += (`</tr>`);
        // Uw referentie
        result += (`<tr>`);
        result += (`<td class="leftmargin">&nbsp;</td>`);
        if (res.crudData.taal == 'nl') {
            value = "Uw referentie";
        } else {
            value = "Your reference:";
        }
        result += (`<td class="leftlabel">${value}</td>`);
        result += (`<td>`);
        result += (res.crudData.row.KLANTREFERENTIE);
        result += (`</td>`);
        result += (`</tr>`);
        // Spatieregel
        result += (`<tr>`);
        result += (`<td>&nbsp;</td>`);
        result += (`</tr>`);
        // Aan
        result += (`<tr>`);
        result += (`<td class="leftmargin">&nbsp;</td>`);
        if (res.crudData.taal == 'nl') {
            value = "Aan:";
        } else {
            value = "To:";
        }
        result += (`<td class="leftlabel">${value}</td>`);
        result += (`<td>`);
        if (String(res.crudData.rowklant.AFLEVERNAAM).trim() != '') {
            result += (res.crudData.rowklant.AFLEVERNAAM);
        } else {
            result += (res.crudData.rowklant.NAAM);
        }
        result += (`</td>`);
        result += (`</tr>`);
        // tav
        result += (`<tr>`);
        result += (`<td class="leftmargin">&nbsp;</td>`);
        if (res.crudData.taal == 'nl') {
            value = "T.a.v.:";
        } else {
            value = "Attn.:";
        }
        result += (`<td class="leftlabel">${value}</td>`);
        result += (`<td>`);
        result += (res.crudData.rowklant.CONTACT);
        result += (`</td>`);
        result += (`</tr>`);
        // email
        result += (`<tr>`);
        result += (`<td class="leftmargin">&nbsp;</td>`);
        if (res.crudData.taal == 'nl') {
            value = "Email:";
        } else {
            value = "Email.:";
        }
        result += (`<td class="leftlabel">${value}</td>`);
        result += (`<td>`);
        if (String(res.crudData.rowklant.AFLEVERNAAM).trim() != '') {
            result += (res.crudData.rowklant.AFLEVEREMAIL);
        } else {
            result += (res.crudData.rowklant.EMAIL);
        }
        result += (`</td>`);
        result += (`</tr>`);
        // Spatieregel
        result += (`<tr>`);
        result += (`<td>&nbsp;</td>`);
        result += (`</tr>`);
        // Straat + nummer
        result += (`<tr>`);
        result += (`<td class="leftmargin">&nbsp;</td>`);
        if (res.crudData.taal == 'nl') {
            value = "Afleveradres:";
        } else {
            value = "Shipping address:";
        }
        result += (`<td class="leftlabel">${value}</td>`);
        result += (`<td>`);
        if (String(res.crudData.rowklant.AFLEVERNAAM).trim() != '') {
            result += (res.crudData.rowklant.AFLEVERADRES);
        } else {
            result += (res.crudData.rowklant.ADRES);
        }
        result += (`</td>`);
        result += (`</tr>`);
        // Postkode Woonplaats land
        result += (`<tr>`);
        result += (`<td></td>`);
        result += (`<td></td>`);
        if (String(res.crudData.rowklant.AFLEVERNAAM).trim() != '') {
            result += (`<td>`);
            if (res.crudData.rowklant.AFLEVERPOSTCODE != '') {
                result += (res.crudData.rowklant.AFLEVERPOSTCODE);
                result += (`&nbsp;`);
            }
            result += (res.crudData.rowklant.AFLEVERWOONPLAATS);
            result += (`&nbsp;`);
            result += (`</td>`);
            if (res.crudData.rowklant.AFLEVERLAND != '') {
                result += (`<td>`);
                result += (res.crudData.rowklant.AFLEVERLAND);
                result += (`</td>`);
            }
        } else {
            result += (`<td>`);
            if (res.crudData.rowklant.POSTCODE != '') {
                result += (res.crudData.rowklant.POSTCODE);
                result += (`&nbsp;`);
            }
            result += (res.crudData.rowklant.WOONPLAATS);
            result += (`&nbsp;`);
            result += (`</td>`);
            if (res.crudData.rowklant.LAND != '') {
                result += (`<td>`);
                result += (res.crudData.rowklant.LAND);
                result += (`</td>`);
            }
        }
        result += (`</tr>`);
        result += (`</table>`);
        result += (`</div>`);
        return (result);
    }

    public static async getKlantHeaderVerzend(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        // Aan
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Aan:";
        } else {
            value = "To:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        if (res.crudData.rowklant.AFLEVERNAAM.trim() != '') {
            result += (res.crudData.rowklant.AFLEVERNAAM);
        } else {
            result += (res.crudData.rowklant.NAAM);
        }
        result += ('</td>');
        result += ('<td>');
        if (res.crudData.rowklant.AFLEVERDPDNUMMER.trim() != '') {
            result += (res.crudData.rowklant.AFLEVERDPDNUMMER);
        } else {
            result += ("&nbsp;");
        }
        result += ('</td>');
        result += ('</tr>');
        // tav
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "T.a.v.:";
        } else {
            value = "Attn.:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.rowklant.CONTACT);
        result += ('</td>');
        result += ('</tr>');
        // email
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Email:";
        } else {
            value = "Email.:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        if (res.crudData.rowklant.AFLEVERNAAM.trim() != '') {
            result += (res.crudData.rowklant.AFLEVEREMAIL);
        } else {
            result += (res.crudData.rowklant.EMAIL);
        }
        result += ('</td>');
        result += ('</tr>');
        // Straat + nummer
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Afleveradres:";
        } else {
            value = "Shipping address:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        if (res.crudData.rowklant.AFLEVERNAAM.trim() != '') {
            result += (res.crudData.rowklant.AFLEVERADRES);
        } else {
            result += (res.crudData.rowklant.ADRES);
        }
        result += ('</td>');
        result += ('</tr>');
        // Postkode Woonplaats land
        result += ('<tr>');
        result += ('<td></td>');
        result += ('<td></td>');
        if (res.crudData.rowklant.AFLEVERNAAM.trim() != '') {
            result += ('<td>');
            if (res.crudData.rowklant.AFLEVERPOSTCODE != '') {
                result += (res.crudData.rowklant.AFLEVERPOSTCODE);
                result += ('&nbsp;');
            }
            result += (res.crudData.rowklant.AFLEVERWOONPLAATS);
            result += ('&nbsp;');
            result += ('</td>');
            if (res.crudData.rowklant.AFLEVERLAND != '') {
                result += ('<td>');
                result += (res.crudData.rowklant.AFLEVERLAND);
                result += ('</td>');
            }
        } else {
            result += ('<td>');
            if (res.crudData.rowklant.POSTCODE != '') {
                result += (res.crudData.rowklant.POSTCODE);
                result += ('&nbsp;');
            }
            result += (res.crudData.rowklant.WOONPLAATS);
            result += ('&nbsp;');
            result += ('</td>');
            if (res.crudData.rowklant.LAND != '') {
                result += ('<td>');
                result += (res.crudData.rowklant.LAND);
                result += ('</td>');
            }
        }
        result += ('</tr>');
        // Spatieregel
        result += ('<tr>');
        result += ('<td>&nbsp;</td>');
        result += ('</tr>');
        // Datum
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Datum:";
        } else {
            value = "Date:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.row.GEREEDDATUM);
        result += ('</td>');
        result += ('</tr>');
        // Onze referentie
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Onze referentie";
        } else {
            value = "Our reference:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.row.REFERENTIE);
        result += ('</td>');
        result += ('</tr>');
        // Uw referentie
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Uw referentie";
        } else {
            value = "Your reference:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.row.KLANTREFERENTIE);
        result += ('</td>');
        result += ('</tr>');
        result += ('</table>');
        result += ('</div>');
        return (result);
    }

    public static async getLeverancierHeader(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        // Aan
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Aan:";
        } else {
            value = "To:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.rowleverancier.NAAM);
        result += ('</td>');
        result += ('<td>');
        // dpdnummer niet beschikbaar bij leverancier
        result += ("&nbsp;");
        result += ('</td>');
        result += ('</tr>');
        // tav
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "T.a.v.:";
        } else {
            value = "Attn.:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.rowleverancier.CONTACT);
        result += ('</td>');
        result += ('</tr>');
        // Straat + nummer
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Adres:";
        } else {
            value = "Address:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.rowleverancier.ADRES);
        result += ('</td>');
        result += ('</tr>');
        // Postkode Woonplaats land
        result += ('<tr>');
        result += ('<td></td>');
        result += ('<td>');
        if (res.crudData.rowleverancier.POSTCODE != '') {
            result += (res.crudData.rowleverancier.POSTCODE);
            result += ('&nbsp;');
        }
        result += (res.crudData.rowleverancier.WOONPLAATS);
        result += ('&nbsp;');
        result += ('</td>');
        if (res.crudData.rowklant.LAND != '') {
            result += ('<td>');
            result += (res.crudData.rowleverancier.LAND);
            result += ('</td>');
        }
        result += ('</tr>');
        // Spatieregel
        result += ('<tr>');
        result += ('<td>&nbsp;</td>');
        result += ('</tr>');
        // Datum
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Datum:";
        } else {
            value = "Date:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.row.STARTDATUM);
        result += ('</td>');
        result += ('</tr>');
        // Onze referentie
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Onze referentie";
        } else {
            value = "Our reference:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.row.REFERENTIE);
        result += ('</td>');
        result += ('</tr>');
        // Uw referentie
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Klant referentie";
        } else {
            value = "Customer reference:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        result += ('<td>');
        result += (res.crudData.row.KLANTREFERENTIE);
        result += ('</td>');
        result += ('</tr>');
        result += ('</table>');
        result += ('</div>');
        return (result);
    }

    public static async getMidText(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        result += ('<td>');
        if (res.crudData.taal == 'nl') {
            value = 'Betreft:    Ontvangstbevestiging retour gezonden product(en).<br>'
                + '<br>'
                + 'Hierbij bevestigen wij de ontvangst van de door u retour gezonden producten.<br>'
                + 'De onderstaande producten zijn in ons Retour Systeem opgenomen:';
        } else {
            value = 'Concerns:    Confirmation of receipt returned product(s).<br>'
                + '<br>'
                + 'Hereby we confirm the receipt of your returned products.<br>'
                + 'The products below are registered in our system:';
        }
        result += value;
        result += ('</td></tr>');
        result += ('</table>');
        result += ('</div>');
        return (result);
    }

    public static async getMidTextVerzend(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        result += ('<td>');
        if (res.crudData.taal == 'nl') {
            value = 'Betreft:    Verzendbon retour gezonden product(en).<br>'
                + '<br>'
                + 'Hierbij ontvangt u de volgende artikel(en)/reparatie(s) retour:<br>';
        } else {
            value = 'Concerns:    Packing list of returned product(s).<br>'
                + '<br>'
                + 'Hereby you will receive the following product(s)/repair(s) in return:<br>';
        }
        result += value;
        result += ('</td></tr>');
        result += ('</table>');
        result += ('</div>');
        return (result);
    }

    public static async getMidTextLeverancier(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        result += ('<td>');
        if (res.crudData.taal == 'nl') {
            value = 'Betreft:    Verzendbon product(en) ter onderzoek / reparatie.<br>'
                + '<br>'
                + 'Hierbij ontvangt u de volgende artikel(en) ter onderzoek / reparatie:<br>';
        } else {
            value = 'Concerns:    Packing list product(s) for analysis / repair.<br>'
                + '<br>'
                + 'Hereby you will receive the following product(s) for analysis / repair:<br>';
        }
        result += value;
        result += ('</td></tr>');
        result += ('</table>');
        result += ('</div>');
        return (result);
    }

    public static async getItems(req: Request, res: Response, next: NextFunction, em: string) {
        let query = db.fixQuery(req.query);
        let result = '';
        let value = '';
        let referentie = query.referentie;
        if (Number(query.copy) == 1) {
            result += ('<div style="height:' + em + ';background-image: url(images/Copy_watermark.gif);">');
        } else {
            result += ('<div style="height:' + em + ';">');
        }
        result += ('<div>');
        // productregels:
        result += ('<table class=t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = 'Aantal';
        } else {
            value = 'Amount';
        }
        result += ('<td style="width:8em"><b>' + value + '</b></td>');
        if (res.crudData.taal == 'nl') {
            value = 'Artikelnummer';
        } else {
            value = 'Article number';
        }
        result += ('<td style="width:8em"><b>' + value + '</b></td>');
        if (res.crudData.taal == 'nl') {
            value = 'Omschrijving';
        } else {
            value = 'Description';
        }
        result += ('<td style="width:20em"><b>' + value + '</b></td>');
        result += ('</tr>');
        result += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td></tr>');
        //
        let sqlreg = `
select *,
 date2screendate(productiedatumtijd) as PRODUCTIEDATUM
from RETOURPRODUCT
where referentie  = '${query.referentie}'
order by klantproductnummer,serienummer,productiedatumtijd,productnummer`;
        let rowsreg = await db.waitQuery(res.crudConnection, sqlreg);
        for (let irowreg = 0; irowreg < rowsreg.length; irowreg++) {
            let rowreg = rowsreg[irowreg];
            let sqlproduct = `
select *
from PRODUCT
where productnummer = '${rowreg.PRODUCTNUMMER}'`;
            let rowsproduct = await db.waitQuery(res.crudConnection, sqlproduct);
            let rowproduct: any = {};
            if (rowsproduct[0]) {
                rowproduct = rowsproduct[0];
            } else {
                rowproduct.PRODUCTNAAM = '???';
            }
            result += ('<tr>');
            result += ('<td></td>');
            result += ('<td style="text-align:left;">' + rowreg.AANTAL + '</td>');
            result += ('<td>' + rowreg.PRODUCTNUMMER + '</td>');
            result += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
            result += ('</tr>');
        }
        result += ('</table>');
        result += ('<br>');
        result += ('</div>');
        result += ('</div>');
        return (result);
    }

    public static async getItemsVerzend(req: Request, res: Response, next: NextFunction, em: string) {
        let sqlproduct = '';
        let rowsproduct: any;
        let rowproduct: any;
        let sqlreg = '';
        let rowsreg: any;
        let rowreg: any;
        let query = db.fixQuery(req.query);
        let result = '';
        let value = '';
        let referentie = query.referentie;
        if (Number(query.copy) == 1) {
            result += ('<div style="height:' + em + ';background-image: url(images/Copy_watermark.gif);">');
        } else {
            result += ('<div style="height:' + em + ';">');
        }
        // Artikelregels
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            result += ('<td style="width:10em;"><b>Aantal</b></td>');
            result += ('<td style="width:10em"><b>Artikel<br>nummer.</b></td>');
            result += ('<td style="width:20em"><b>Omschrijving</b></td>');
        } else {
            result += ('<td style="width:10em;"><b>Quantity</b></td>');
            result += ('<td style="width:10em"><b>Article<br>number.</b></td>');
            result += ('<td style="width:20em"><b>Description</b></td>');
        }
        result += ('</tr>');
        result += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td></tr>');
        sqlreg = ` 
select *,
date2screendate(productiedatumtijd) as PRODUCTIEDATUM
from RETOURPRODUCT
where referentie  = '${res.crudData.row.REFERENTIE}'
order by klantproductnummer,serienummer,productiedatumtijd,productnummer`;
        rowsreg = await db.waitQuery(res.crudConnection, sqlreg);
        for (let irowreg = 0; irowreg < rowsreg.length; irowreg++) {
            rowreg = rowsreg[irowreg];
            sqlproduct = `
select *
from PRODUCT
where productnummer = '${rowreg.PRODUCTNUMMER}'`;
            rowsproduct = await db.waitQuery(res.crudConnection, sqlproduct);
            rowproduct = {};
            if (rowsproduct[0]) {
                rowproduct = rowsproduct[0];
            } else {
                rowproduct.PRODUCTNAAM = '???';
            }
            result += ('<tr>');
            result += ('<td></td>');
            result += ('<td>' + rowreg.AANTAL + '</td>');
            result += ('<td>' + rowreg.PRODUCTNUMMER + '</td>');
            result += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
            result += ('</tr>');
            result += ('<tr>');
            result += ('<td></td>');
            result += ('<td></td>');
            result += ('<td colspan=99>' + Util.decodeOpmerking(rowreg.OPMERKING, 80) + '</td>');
            result += ('</tr>');

        }
        result += ('</table>');
        // spatieregels:
        result += ('<br>');
        // actieregels:
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            result += ('<td style="width:10em"><b>Afdeling</b></td>');
            result += ('<td style="width:10em"><b>Actie</b></td>');
            result += ('<td style="width:25em"><b>Opmerking</b></td>');
        } else {
            result += ('<td style="width:10em"><b>Department</b></td>');
            result += ('<td style="width:10em"><b>Action</b></td>');
            result += ('<td style="width:25em"><b>Remark</b></td>');
        }

        result += ('</tr>');
        result += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td></tr>');

        sqlreg = `
select * from
(select *,
date2screendate(gereeddatumtijd) as GEREEDDATUM,
(select naam from RETOURGEBRUIKER 
where RETOURGEBRUIKER.gebruiker = RETOURACTIE.gebruiker) 
as AFDELING,
(select naam from RETOURACTIETYPE 
where RETOURACTIETYPE.actie = RETOURACTIE.actie) 
as ACTIETYPE
from RETOURACTIE
where referentie  = '${referentie}'
) base
order by gebruiker,gereeddatumtijd,actie`;
        rowsreg = await db.waitQuery(res.crudConnection, sqlreg);
        for (let irowreg = 0; irowreg < rowsreg.length; irowreg++) {
            rowreg = rowsreg[irowreg];
            sqlproduct = `
select *
from PRODUCT
where productnummer = '${rowreg.PRODUCTNUMMER}'`;
            rowsproduct = await db.waitQuery(res.crudConnection, sqlproduct);
            rowproduct = {};
            if (rowsproduct[0]) {
                rowproduct = rowsproduct[0];
            } else {
                rowproduct.PRODUCTNAAM = '???';
            }
            result += ('<tr>');
            result += ('<td></td>');
            result += ('<td>' + rowreg.AFDELING + '</td>');
            result += ('<td>' + rowreg.ACTIETYPE + '</td>');
            result += ('<td>' + Util.decodeOpmerking(rowreg.OPMERKING, 80) + '</td>');
            result += ('</tr>');
        }
        result += ('</table>');
        //
        result += ('</div>');
        return (result);
    }


    public static async getItemsLeverancier(req: Request, res: Response, next: NextFunction, em: string) {
        let query = db.fixQuery(req.query);
        let result = '';
        let value = '';
        let referentie = query.referentie;
        let leverancier = query.leverancier || '';
        let sqlreg = '';
        let rowsreg: any;
        let rowreg: any;
        let sqlproduct = '';
        let rowsproduct: any;
        let rowproduct: any;
        if (Number(query.copy) == 1) {
            result += ('<div style="height:' + em + ';background-image: url(images/Copy_watermark.gif);">');
        } else {
            result += ('<div style="height:' + em + ';">');
        }
        // Artikelregels
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            result += ('<td style="width:10em;"><b>Aantal</b></td>');
            result += ('<td style="width:10em"><b>Artikel<br>nummer.</b></td>');
            result += ('<td style="width:20em"><b>Omschrijving</b></td>');
        } else {
            result += ('<td style="width:10em;"><b>Quantity</b></td>');
            result += ('<td style="width:10em"><b>Article<br>number.</b></td>');
            result += ('<td style="width:20em"><b>Description</b></td>');
        }
        result += ('</tr>');
        result += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td></tr>');
        sqlreg = `
select retourproduct.*,
date2screendate(productiedatumtijd) as PRODUCTIEDATUM
from 
(retourproduct left join bestelling 
on retourproduct.productnummer = bestelling.productnummer)
left join leverancier 
on bestelling.leveranciernummer = leverancier.leveranciernummer
where retourproduct.referentie  = '${referentie}'
and bestelling.LEVERANCIERNUMMER = '${leverancier}'
order by klantproductnummer,serienummer,productiedatumtijd,productnummer`;
        rowsreg = await db.waitQuery(res.crudConnection, sqlreg);
        for (let irowreg = 0; irowreg < rowsreg.length; irowreg++) {
            rowreg = rowsreg[irowreg];
            sqlproduct = `
select *
from PRODUCT
where productnummer = '${rowreg.PRODUCTNUMMER}'`;
            rowsproduct = await db.waitQuery(res.crudConnection, sqlproduct);
            rowproduct = {};
            if (rowsproduct[0]) {
                rowproduct = rowsproduct[0];
            } else {
                rowproduct.PRODUCTNAAM = '???';
            }
            result += ('<tr>');
            result += ('<td></td>');
            result += ('<td>' + rowreg.AANTAL + '</td>');
            result += ('<td>' + rowreg.PRODUCTNUMMER + '</td>');
            result += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
            result += ('</tr>');
            result += ('<tr>');
            result += ('<td></td>');
            result += ('<td></td>');
            result += ('<td colspan=99>' + Util.decodeOpmerking(rowreg.OPMERKING, 80) + '</td>');
            result += ('</tr>');

        }
        result += ('</table>');
        //
        result += ('</div>');
        return (result);
    }

    public static async getGarantie(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        // Garantie
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Garantie:";
        } else {
            value = "Guarantee:";
        }
        result += ('<td class="leftlabel">' + value + '</td>');
        if (res.crudData.row.GARANTIE == '01') {
            if (res.crudData.taal == 'nl') {
                value = "Ja";
            } else {
                value = "Yes";
            }
        } else {
            if (res.crudData.taal == 'nl') {
                value = "Nee";
            } else {
                value = "No";
            }
        }
        result += ('<td>' + value + '</td>');
        result += ('</tr>');
        // Kosten
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        if (res.crudData.taal == 'nl') {
            value = "Kosten:";
        } else {
            value = "Costs:";
        }
        result += ('<td>' + value + '</td>');
        if (Number(res.crudData.row.KOSTEN) > 0) {
            value = Number(res.crudData.row.KOSTEN).toFixed(2) + ' Euro';
        } else {
            if (res.crudData.taal == 'nl') {
                value = "Geen";
            } else {
                value = "None";
            }
        }
        result += ('<td>' + value + '</td>');
        result += ('</tr>');
        result += "</table>";
        result += ('</div>');
        return (result);
    }

    public static async getBottomText(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        result += ('<td>');
        if (res.crudData.taal == 'nl') {
            value = 'Deze producten worden op korte termijn aan inspectie onderworpen. De uitkomsten krijgt u op later<br>'
                + 'tijdstip van ons gecommuniceerd.<br><br>'
                + 'Wij vertrouwen u hiermede voldoende te hebben geinformeerd.<br>'
                + 'Zijn er echter nog vragen, dan verzoeken wij u contact met ons op te nemen.<br><br>';
        } else {
            value = 'We hope to inform you as soon as possible about any results of examination.<br>'
                + '<br>'
                + 'If you have any questions, do not hesitate to contact us.<br><br>';
        }
        result += value;
        result += ('</td></tr>');
        result += ('</table>');
        result += ('</div>');
        return (result);
    }

    public static async getBottomTextVerzend(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        result += ('<td>');
        if (res.crudData.taal == 'nl') {
            value = 'Wij vertrouwen erop hiermee uw retour naar tevredenheid te hebben afgehandeld.<br>'
                + 'Zijn er echter nog vragen, dan verzoeken wij u contact met ons op te nemen.';
        } else {
            value = 'We trust that we have handled your repair sufficiently.<br>'
                + 'If there are any questions, do not hesitate to contact us.';
        }
        result += value;
        result += ('</td></tr>');
        result += ('</table>');
        result += ('</div>');
        return result;
    }


    public static async getBottomTextLeverancier(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        result += ('<td>');
        if (res.crudData.taal == 'nl') {
            value = 'Zijn er nog vragen, dan verzoeken wij u contact met ons op te nemen.';
        } else {
            value = 'If there are any questions, do not hesitate to contact us.';
        }
        result += value;
        result += ('</td></tr>');
        result += ('</table>');
        result += ('</div>');
        return result;
    }

    public static async getOnderschrift(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        let value = '';
        result += ('<div style="height:' + em + ';">');
        result += ('<table class="t">');
        result += ('<tr>');
        result += ('<td class="leftmargin">&nbsp;</td>');
        result += ('<td>');
        if (res.crudData.taal == 'nl') {
            result +=
                'Met vriendelijke groeten,<br>'
                + '<b>TASSERON B.V.</b><br><br>';
        } else {
            result +=
                'Best regards,<br>'
                + '<b>TASSERON B.V.</b><br><br>';
        }
        result += value;
        result += ('</td></tr>');
        result += ('<tr>');
        result += ('<td class="leftmargin"></td>');
        result += ('<td style="width:40em">');
        result += (res.crudData.row.GEBRUIKER);
        result += ('</td>');
        result += ('');
        result += '';
        result += ('</td>');
        result += ('</tr>');
        result += "<tr><td>&nbsp;</td></tr>";
        result += ('<tr>');
        result += ('<td></td>');
        result += ('<td style="height:6em;width:18em">');
        //
        let sqlhandtekening = `
select getHandtekening('${res.crudData.row.GEBRUIKER}') as handtekening
from dual`;
        value = '';
        let rowshandtekening = await db.waitQuery(res.crudConnection, sqlhandtekening);
        if (rowshandtekening[0]) {
            value = rowshandtekening[0].HANDTEKENING;
        }
        result += '<img src="'
            + value
            + '" style="height:6em;width:18em">'
            + '</img> ';
        result += ('</td>');
        result += ('</tr>');
        result += ('</table>');
        result += ('</div>');
        return (result);
    }

    public static async getFooter(req: Request, res: Response, next: NextFunction, em: string) {
        let result = '';
        result = `
<div style="height:${em}">
<table class="t">
<tr>
</tr>
</table>
</div>`;
        return (result);
    }

    public static async setValues(req: Request, res: Response, next: NextFunction) {
        let result = '';
        result = ''
            + '<div style="display:none">'
            + '<div id="thisApp">' + Config.app + '</div>'
            + '<div id="thisFilename">' + res.crudData.filename + '</div>'
            + '<div id="thisDir">' + res.crudData.targetdir + '</div>'
            + '<div id="thisUrl">' + res.crudData.targeturl + '</div>'
            + '</div>';
        return (result);
    }

    public static async getRetour(req: Request, res: Response, next: NextFunction, type: string) {
        //
        let query = db.fixQuery(req.query);
        let sql = '';
        let rows: any;
        let row: any;
        let sqlklant = '';
        let rowsklant: any;
        let rowklant: any;
        //
        res.crudData.taal = '';
        res.crudData.land = '';
        sql = `
select *,
date2screendate(startdatumtijd) as STARTDATUM,
date2screendate(gereeddatumtijd) as GEREEDDATUM,
(select min(productnummer) from RETOURPRODUCT 
where RETOURPRODUCT.referentie = RETOUR.referentie)
as MIN_PROD
from RETOUR  
where referentie = '${query.referentie}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            row = rows[0];
            res.crudData.row = rows[0];
            sqlklant = `
select * 
from RETOURKLANT 
where referentie = '${query.referentie}'`;
            rowsklant = await db.waitQuery(res.crudConnection, sqlklant);
            rowklant = {};
            if (rowsklant[0]) {
                rowklant = rowsklant[0];
            } else {
                rowklant.KLANTNUMMER = '';
                rowklant.ZOEKCODE = '';
                //
                rowklant.NAAM = '';
                rowklant.POSTCODE = '';
                rowklant.WOONPLAATS = '';
                rowklant.LAND = '';
                rowklant.CONTACT = '';
                rowklant.EMAIL = '';
                rowklant.ADRES = '';
                //
                rowklant.AFLEVERDPDNUMMER = '';
                //
                rowklant.AFLEVERNAAM = '';
                rowklant.AFLEVERPOSTCODE = '';
                rowklant.AFLEVERWOONPLAATS = '';
                rowklant.AFLEVERLAND = '';
                rowklant.AFLEVEREMAIL = '';
                rowklant.AFLEVERADRES = '';
            }
            res.crudData.rowklant = rowklant;
            if (rowklant.AFLEVERNAAM != '') {
                res.crudData.land = String(rowklant.AFLEVERLAND).toLowerCase().trim();
            } else {
                res.crudData.land = String(rowklant.LAND).toLowerCase().trim();
            }
            if (res.crudData.land == 'nl' || res.crudData.land == '') {
                res.crudData.taal = 'nl';
            } else {
                res.crudData.taal = 'en';
            }
            // zoeknaam directory
            // bestelnummer directory
            res.crudData.targetdir = Config.retourendir;
            if (res.crudData.targetdir == '') {
                res.crudData.targetdir = 'f:/data/ak2/retouren';
            }
            res.crudData.targeturl = "toolbox.php?action=showpdf&filename=" + res.crudData.targetdir;
            try {
                if (!fs.existsSync(res.crudData.targetdir)) {
                    fs.mkdirSync(res.crudData.targetdir);
                }
            } catch (error) {
                Logger.error(req,error);
            }
            if (rowklant.ZOEKCODE == '') {
                res.crudData.targetdir += ('/' + Util.constructFilename(rowklant.KLANTNUMMER));
                res.crudData.targeturl += ('/' + Util.constructFilename(rowklant.KLANTNUMMER));
            } else {
                res.crudData.targetdir += ('/' + Util.constructFilename(rowklant.ZOEKCODE) + '_' + Util.constructFilename(rowklant.KLANTNUMMER));
                res.crudData.targeturl += ('/' + Util.constructFilename(rowklant.ZOEKCODE) + '_' + Util.constructFilename(rowklant.KLANTNUMMER));
            }
            try {
                if (!fs.existsSync(res.crudData.targetdir)) {
                    fs.mkdirSync(res.crudData.targetdir);
                }
            } catch (error) {
                Logger.error(req,error);
            }
            res.crudData.targetdir += ('/' + Util.constructFilename(query.referentie) + '_' + Util.constructFilename(row.MIN_PROD));
            res.crudData.targeturl += ('/' + Util.constructFilename(query.referentie) + '_' + Util.constructFilename(row.MIN_PROD));
            try {
                if (!fs.existsSync(res.crudData.targetdir)) {
                    fs.mkdirSync(res.crudData.targetdir);
                }
            } catch (error) {
                Logger.error(req,error);
            }
            //
            res.crudData.filename = res.crudData.targetdir + "/" + Util.constructFilename(query.referentie) + "_" + type + ".pdf";
            res.crudData.targeturl += "/" + Util.constructFilename(query.referentie) + "_" + type + ".pdf";
        }
        return;
    }

    public static async getRetourleverancier(req: Request, res: Response, next: NextFunction) {
        let query = db.fixQuery(req.query);
        if (!query.leverancier) {
            query.leverancier = '';
        }
        let land = '';
        let sql = '';
        let rows: any;
        let row: any;
        let sqlklant = '';
        let rowsklant: any;
        let rowklant: any;
        let sqlleverancier = '';
        let rowsleverancier: any;
        let rowleverancier: any;
        sql = `
select *,
date2screendate(startdatumtijd) as STARTDATUM,
date2screendate(gereeddatumtijd) as GEREEDDATUM,
(select min(productnummer) from RETOURPRODUCT 
where RETOURPRODUCT.referentie = RETOUR.referentie) 
as MIN_PROD
from RETOUR  
where referentie = '${query.referentie}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            row = rows[0];
            res.crudData.row = rows[0];
            sqlklant = `
select * 
from RETOURKLANT 
where referentie = '${query.referentie}'`;
            rowsklant = await db.waitQuery(res.crudConnection, sqlklant);
            rowklant = {};
            if (rowsklant[0]) {
                rowklant = rowsklant[0];
            } else {
                rowklant.KLANTNUMMER = '';
                rowklant.ZOEKCODE = '';
                //
                rowklant.NAAM = '';
                rowklant.POSTCODE = '';
                rowklant.WOONPLAATS = '';
                rowklant.LAND = '';
                rowklant.CONTACT = '';
                rowklant.EMAIL = '';
                rowklant.ADRES = '';
                //
                rowklant.AFLEVERDPDNUMMER = '';
                //
                rowklant.AFLEVERNAAM = '';
                rowklant.AFLEVERPOSTCODE = '';
                rowklant.AFLEVERWOONPLAATS = '';
                rowklant.AFLEVERLAND = '';
                rowklant.AFLEVEREMAIL = '';
                rowklant.AFLEVERADRES = '';
            }
            res.crudData.rowklant = rowklant;
            sqlleverancier = `
select 
retourproduct.referentie,
retourproduct.productnummer,
product.leveranciernummer,
leverancier.*
from 
(retourproduct left join product 
on retourproduct.productnummer = product.productnummer)
left join leverancier 
on product.leveranciernummer = leverancier.leveranciernummer
where retourproduct.referentie  = '${query.referentie}'
and product.leveranciernummer  = '${query.leverancier}'`;
            rowsleverancier = await db.waitQuery(res.crudConnection, sqlleverancier);
            rowleverancier = {};
            if (rowsleverancier[0]) {
                rowleverancier = rowsleverancier[0];
            } else {
                rowleverancier.LAND = '';
                rowleverancier.NAAM = '';
                rowleverancier.CONTACT = '';
                rowleverancier.ADRES = '';
                rowleverancier.POSTCODE = '';
                rowleverancier.WOONPLAATS = '';
                rowleverancier.NAAM = '';
            }
            res.crudData.rowleverancier = rowleverancier;
            land = rowleverancier.LAND;
            if (land == 'nl' || land == '') {
                res.crudData.taal = 'nl';
            } else {
                res.crudData.taal = 'en';
            }
            // zoeknaam directory
            // bestelnummer directory
            res.crudData.targetdir = Config.retourendir;
            if (res.crudData.targetdir == '') {
                res.crudData.targetdir = 'f:/data/ak2/retouren';
            }
            res.crudData.targeturl = "toolbox.php?action=showpdf&filename="
                + res.crudData.targetdir;
            try {
                if (!fs.existsSync(res.crudData.targetdir)) {
                    fs.mkdirSync(res.crudData.targetdir);
                }
            } catch (error) {
                Logger.error(req,error);
            }
            if (rowklant.ZOEKCODE == '') {
                res.crudData.targetdir += ('/' + Util.constructFilename(rowklant.KLANTNUMMER));
                res.crudData.targeturl += ('/' + Util.constructFilename(rowklant.KLANTNUMMER));
            } else {
                res.crudData.targetdir += ('/' + Util.constructFilename(rowklant.ZOEKCODE) + '_' + Util.constructFilename(rowklant.KLANTNUMMER));
                res.crudData.targeturl += ('/' + Util.constructFilename(rowklant.ZOEKCODE) + '_' + Util.constructFilename(rowklant.KLANTNUMMER));
            }
            try {
                if (!fs.existsSync(res.crudData.targetdir)) {
                    fs.mkdirSync(res.crudData.targetdir);
                }
            } catch (error) {
                Logger.error(req,error);
            }
            res.crudData.targetdir += ('/' + Util.constructFilename(query.referentie));
            res.crudData.targeturl += ('/' + Util.constructFilename(query.referentie));
            try {
                if (!fs.existsSync(res.crudData.targetdir)) {
                    fs.mkdirSync(res.crudData.targetdir);
                }
            } catch (error) {
                Logger.error(req,error);
            }
            res.crudData.targetdir += ('/' + Util.constructFilename(query.leverancier) + '_' + Util.constructFilename(row.MIN_PROD));
            res.crudData.targeturl += ('/' + Util.constructFilename(query.leverancier) + '_' + Util.constructFilename(row.MIN_PROD));
            try {
                if (!fs.existsSync(res.crudData.targetdir)) {
                    fs.mkdirSync(res.crudData.targetdir);
                }
            } catch (error) {
                Logger.error(req,error);
            }
            //
            res.crudData.filename = res.crudData.targetdir
                + "/"
                + Util.constructFilename(query.referentie)
                + "_"
                + Util.constructFilename(query.leverancier)
                + "_verzend.pdf";
            res.crudData.targeturl += "/"
                + Util.constructFilename(query.referentie)
                + "_"
                + Util.constructFilename(query.leverancier)
                + "_verzend.pdf";
        }
        return;
    }
}
