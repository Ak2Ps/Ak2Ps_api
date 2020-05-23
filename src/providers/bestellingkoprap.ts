
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import { Toolbox } from './toolbox';
import * as fs from 'fs';
import { Config } from '../config';
//
const dict: Dict = {
    table: "BESTELLING",
    key: [
        {
            body: "LEVERANCIERNUMMER",
            sql: "LEVERANCIERNUMMER",
        },
        {
            body: "BESTELNUMMER",
            sql: "BESTELNUMMER",
        },
        {
            body: "REGELNUMMER",
            sql: "REGELNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "PRODUCTNUMMER",
        where: [
            {
                query: "value",
                sql: "ucase(PRODUCTNUMMER) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "leveranciernummer,bestelnummer,productnummer,startdatumtijd",
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

export class Bestellingkoprap extends Crud {
    info: string;
    msg: string;
    html: string;
    script: string;
    defs: string;
    constructor() {
        super(
            dict
        )
        this.info = '';
        this.msg = '';
        this.html = '';
        this.script = '';
        this.defs = '';
    }


    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let bestelnummer = req.query.bestelnummer;
        let row: any = {};
        let rowlev: any = {};
        let rowreg: any = {};
        let rowproduct: any = {};
        let swfound = 0;
        //
        let sqlupdate: string;
        let sql = `
select *,
date2screendate(startdatumtijd) as STARTDATUM,
case when producten <= 1 then productnummer
else '...'
end as PRODUCTNUMMER,
case when besteldatumtijden <= 1 then date2screendate(besteldatumtijd)
else '...'
end as BESTELDATUM,
min(productnummer) as min_prod,
date2screendate(geprintdatumtijd) as GEPRINTDATUM,
date2screendate(gepickeddatumtijd) as GEPICKEDDATUM,
date2screendate(verzondendatumtijd) as VERZONDENDATUM,
date2screendate(ontvangendatumtijd) as ONTVANGENDATUM,
getHandtekening(contactpersoon) as handtekening
from (
select 
bestelnummer,
min(startdatumtijd) as startdatumtijd,
min(besteldatumtijd) as besteldatumtijd,
count(distinct(besteldatumtijd)) as besteldatumtijden,
min(geprintdatumtijd) as geprintdatumtijd,
min(gepickeddatumtijd) as gepickeddatumtijd,
min(verzondendatumtijd) as verzondendatumtijd,
min(ontvangendatumtijd) as ontvangendatumtijd,
min(productnummer) as productnummer,
min(leverancierproductnummer) as leverancierproductnummer,
count(distinct(productnummer)) as producten,
sum(bestelling) as bestelling,
min(contactpersoon) as contactpersoon,
min(leveranciernummer) as leveranciernummer
from BESTELLING group by bestelnummer) BASE
where bestelnummer = '${bestelnummer}'
order by leveranciernummer,bestelnummer,productnummer,besteldatumtijd;`;
        res.crudConnection = await db.waitConnection();
        let rows = await db.waitQuery(res.crudConnection, sql);
        if (rows[0]) {
            row = rows[0];
            let sqllev = `
select * 
from LEVERANCIER 
where leveranciernummer = '${row.LEVERANCIERNUMMER}'`;
            let rowslev = await db.waitQuery(res.crudConnection, sqllev);
            if (rowslev[0]) {
                rowlev = rowslev[0];
            }

        }
        let filename = '';
        let targetdir = Config.bestellingendir;
        let targeturl = "toolbox.php?action=showpdf&filename=" + targetdir;
        try {
            fs.mkdirSync(targetdir);
        } catch (error) {
        }
        if (rowlev.ZOEKCODE == '') {
            targetdir += ('/' + Util.constructFilename(rowlev.LEVERANCIERNUMMER));
            targeturl += ('/' + Util.constructFilename(rowlev.LEVERANCIERNUMMER));

        } else {
            targetdir += ('/' + Util.constructFilename(rowlev.ZOEKCODE + '_' + rowlev.LEVERANCIERNUMMER));
            targeturl += ('/' + Util.constructFilename(rowlev.ZOEKCODE + '_' + rowlev.LEVERANCIERNUMMER));
        }
        try {
            fs.mkdirSync(targetdir);
        } catch (error) {
        }

        targetdir += ('/' + Util.constructFilename(bestelnummer + '_' + row.MIN_PROD));
        targeturl += ('/' + Util.constructFilename(bestelnummer + '_' + row.MIN_PROD));
        try {
            fs.mkdirSync(targetdir);
        } catch (error) {
        }
        //
        filename = targetdir + "/" + Util.constructFilename(bestelnummer + "_bestelling.pdf");
        targeturl += "/" + Util.constructFilename(bestelnummer + "_bestelling.pdf");


        this.html = '';

        this.html += ('<div style="height:7em;">');
        this.html += ('<table class="t">');
        this.html += ('<tr>');
        this.html += ('<td class="leftmargin">&nbsp;</td>');
        this.html += ('<td class="leftmargin">&nbsp;</td>');
        this.html += ('<td>');
        this.html += (rowlev.NAAM);
        this.html += ('</td>');
        this.html += ('</tr>');
        if (rowlev.CONTACT != '') {
            this.html += ('<tr>');
            this.html += ('<td></td>');
            this.html += ('<td></td>');
            this.html += ('<td>');
            this.html += (rowlev.CONTACT);
            this.html += ('</td>');
            this.html += ('</tr>');
        }
        this.html += ('<tr>');
        this.html += ('<td></td>');
        this.html += ('<td></td>');
        this.html += ('<td>');
        this.html += (rowlev.ADRES);
        this.html += ('</td>');
        this.html += ('</tr>');
        this.html += ('<tr>');
        this.html += ('<td></td>');
        this.html += ('<td></td>');
        this.html += ('<td>');
        if (rowlev.POSTCODE != '') {
            this.html += (rowlev.POSTCODE);
            this.html += ('&nbsp;');
        }
        this.html += (rowlev.WOONPLAATS);
        this.html += ('</td>');
        this.html += ('</tr>');
        if (rowlev.LAND != '') {
            this.html += ('<tr>');
            this.html += ('<td></td>');
            this.html += ('<td></td>');
            this.html += ('<td>');
            this.html += (rowlev.LAND);
            this.html += ('</td>');
            this.html += ('</tr>');
        }
        if (rowlev.FAX != '') {
            this.html += ('<tr>');
            this.html += ('<td></td>');
            this.html += ('<td></td>');
            this.html += ('<td>');
            this.html += ('<b>Fax nr:</b> &nbsp;&nbsp;&nbsp;&nbsp;' + rowlev.FAX);
            this.html += ('</td>');
            this.html += ('</tr>');
        }
        if (rowlev.EMAIL != '') {
            this.html += ('<tr>');
            this.html += ('<td></td>');
            this.html += ('<td></td>');
            this.html += ('<td>');
            this.html += ('<b>E Mail</b> &nbsp;&nbsp;&nbsp;&nbsp;' + rowlev.EMAIL);
            this.html += ('</td>');
            this.html += ('</tr>');
        }
        this.html += ('</table>');
        this.html += ('</div>');

        this.html += ('<div style="height:3em;">');
        this.html += ('<table class="t">');
        this.html += ('<tr>');
        this.html += ('<td class="leftmargin">&nbsp;</td>');
        this.html += ('<td style="width:37em">');
        this.html += ('<b>PURCHASE ORDER: &nbsp;&nbsp;&nbsp;&nbsp;** </b>' + row.BESTELNUMMER + ' / ');
        if (Config.app == 'T') {
            this.html += ('Sensors');
        } else if (Config.app == 'C') {
            this.html += ('Controls');
        } else {
            this.html += ('???? ' + Config.app + ' ????');
        }
        this.html += ('<b> **</b>');
        this.html += ('</td>');
        this.html += ('<td style="width:17em;text-align:right">');
        this.html += ('<b>Date: </b>' + row.STARTDATUM);
        this.html += ('</td>');
        this.html += ('</tr>');
        this.html += ('<tr>');
        this.html += ('<td></td>');
        this.html += ('<td>');
        this.html += ('<b>OUR V.A.T. Id.Nr:&nbsp;&nbsp;&nbsp;&nbsp; </b>NL.8079.974.19.B01');
        this.html += ('</td>');
        this.html += ('</tr>');
        this.html += ('</table>');
        this.html += ('</div>');

        if (Number(req.query.copy) == 1) {
            this.html += ('<div style="height:30em;background-image: url(images/Copy_watermark.gif);">');
        } else {
            this.html += ('<div style="height:30em;">');
        }
        this.html += ('<div>');
        // regels:
        this.html += ('<table class="t">');
        this.html += ('<tr>');
        this.html += ('<td class="leftmargin">&nbsp;</td>');
        this.html += ('<td style="width:5em;"><b>Quantity</b></td>');
        this.html += ('<td style="width:10em"><b>Your art.no.</b></td>');
        this.html += ('<td style="width:10em"><b>Our art.no.</b></td>');
        this.html += ('<td style="width:20em"><b>Description</b></td>');
        this.html += ('<td style="width:8em;text-align:right"><b>Delivery</b></td>');
        this.html += ('</tr>');
        this.html += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td></tr>');

        let sqlreg = ` 
            select *,
date2screendate(besteldatumtijd) as BESTELDATUM
from BESTELLING
where bestelnummer = '${bestelnummer}'
order by besteldatumtijd, productnummer`;
        let rowsreg = await db.waitQuery(res.crudConnection, sqlreg);
        for (let irowreg = 0; irowreg < rowsreg.length; irowreg++) {
            rowreg = rowsreg[irowreg];
            let sqlproduct = ` 
select *
from PRODUCT
where productnummer = '${rowreg.PRODUCTNUMMER}'`;
            let rowsproduct = await db.waitQuery(res.crudConnection, sqlproduct);
            if (!rowsproduct[0]) {
                rowproduct = {};
                rowproduct.PRODUCTNAAM = '???';
            } else {
                rowproduct = rowsproduct[0];
            }
            this.html += ('<tr>');
            this.html += ('<td></td>');
            this.html += ('<td style="text-align:right;padding:0px 10px 0px 0px;">' + rowreg.BESTELLING + '</td>');
            this.html += ('<td>' + rowreg.LEVERANCIERPRODUCTNUMMER + '</td>');
            this.html += ('<td>' + rowreg.PRODUCTNUMMER + '</td>');
            this.html += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
            this.html += ('<td style="text-align:right;">' + rowreg.BESTELDATUM + '</td>');
            this.html += ('</tr>');
            let sqlcommentaar = `
select *
from BESTELLINGCOMMENTAAR
where bestellingid = '${rowreg.ID}'
order by regelnummer`;
            let rowscommentaar = await db.waitQuery(res.crudConnection, sqlcommentaar);
            for (let icommentaar = 0; icommentaar < rowscommentaar.length; icommentaar++) {
                let rowcommentaar = rowscommentaar[icommentaar];
                this.html += ('<tr>');
                this.html += ('<td></td>');
                this.html += ('<td></td>');
                this.html += ('<td></td>');
                this.html += ('<td></td>');
                this.html += ('<td>' + rowcommentaar.COMMENTAAR + '</td>');
                this.html += ('<td></td>');
                this.html += ('</tr>');
            }
        }
        this.html += ('</table>');
        this.html += ('</div>');

        this.html += ('<div>');
        //Picklijst
        sqlupdate = `
update BESTELLINGPICK 
set status = 'OLD' 
where bestelnummer = '${bestelnummer}'`;
        await db.waitQuery(res.crudConnection, sqlupdate);
        let sqlpick = `
select
bestelnummer,
sum(bestelling) as BESTELLING,
productnummer
from BESTELLING
where bestelnummer = '${bestelnummer}'
group by productnummer
order by productnummer`;
        let rowspick = await db.waitQuery(res.crudConnection, sqlpick);
        for (let irowpick = 0; irowpick < rowspick.length; irowpick++) {
            let rowpick = rowspick[irowpick];
            // Onderdelen
            let sqlonderdeel = `
select *
from ONDERDEEL
where productnummer = '${rowpick.PRODUCTNUMMER}'`;
            let rowsonderdeel = await db.waitQuery(res.crudConnection, sqlonderdeel);
            for (let irowonderdeel = 0; irowonderdeel < rowsonderdeel.length; irowonderdeel++) {
                let rowonderdeel = rowsonderdeel[irowonderdeel];
                sqlupdate = `
insert into BESTELLINGPICK (status,bestelnummer,productnummer,onderdeelnummer) 
select
'NEW',
'${rowpick.BESTELNUMMER}',
'${rowpick.PRODUCTNUMMER}',
'${rowonderdeel.ONDERDEELNUMMER}'
from DUAL
where not exists (select 1 from BESTELLINGPICK
where bestelnummer =  '${rowpick.BESTELNUMMER}'
and productnummer = '${rowpick.PRODUCTNUMMER}'
and onderdeelnummer = '${rowonderdeel.ONDERDEELNUMMER}')`;
                await db.waitQuery(res.crudConnection, sqlupdate);
                //
                sqlupdate = `
update BESTELLINGPICK set
status = 'NEW',
bestelling = '${rowpick.BESTELLING}',
faktor = '${rowonderdeel.FAKTOR}'
where bestelnummer =  '${rowpick.BESTELNUMMER}'
and productnummer = '${rowpick.PRODUCTNUMMER}'
and onderdeelnummer = '${rowonderdeel.ONDERDEELNUMMER}'`;
                await db.waitQuery(res.crudConnection, sqlupdate);
            }
        }
        swfound = 0;
        sqlupdate = `
delete from  BESTELLINGPICK 
where status = 'OLD'
and bestelnummer = '${bestelnummer}'`;
        await db.waitQuery(res.crudConnection, sqlupdate);
        sqlpick = `
select 
round(sum(faktor * bestelling)) as aantal,
onderdeelnummer
from BESTELLINGPICK
where bestelnummer = '${bestelnummer}'
group by onderdeelnummer
having round(sum(faktor * bestelling)) > 0
order by onderdeelnummer`;
        rowspick = await db.waitQuery(res.crudConnection, sqlpick);
        for (let irowpick = 0; irowpick < rowspick.length; irowpick++) {
            let rowpick = rowspick[irowpick];
            if (swfound == 0) {
                swfound = 1;
                this.html += ('<table class="t">');
                this.html += ('<tr>');
                this.html += ('<td class="leftmargin"></td>');
                this.html += ('<td style="width:10em;">&nbsp;</td>');
                this.html += ('<td style="width:20em"></td>');
                this.html += ('<td style="width:10em;text-align:right;"></td>');
                this.html += ('<td style="width:10em;text-align:right;"></td>');
                this.html += ('<td style="width:10em;text-align:right;"></td>');
                this.html += ('</tr>');
                this.html += ('<tr>');
                this.html += ('<td class="leftmargin"></td>');
                this.html += ('<td><b>SUPPLIED PARTS</b></td>');
                this.html += ('<td></td>');
                this.html += ('<td style="text-align:right;"></td>');
                this.html += ('<td style="text-align:right;"></td>');
                this.html += ('<td style="text-align:right;"></td>');
                this.html += ('</tr>');
                this.html += ('<tr>');
                this.html += ('<td></td>');
                this.html += ('<td><b>Part</b></td>');
                this.html += ('<td><b>Description</b></td>');
                this.html += ('<td style="text-align:right;"><b>Amount</b></td>');
                this.html += ('<td style="text-align:right;"></td>');
                this.html += ('<td style="text-align:right;"></td>');
                this.html += ('</tr>');
                this.html += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td></tr>');
            }
            let sqlproduct = `
select *
from PRODUCT
where productnummer = '${rowpick.ONDERDEELNUMMER}'`;
            let rowsproduct = await db.waitQuery(res.crudConnection, sqlproduct);
            if (rowsproduct[0]) {
                rowproduct = rowsproduct[0];
            } else {
                rowproduct.PRODUCTNAAM = '???';
            }
            this.html += ('<tr>');
            this.html += ('<td >&nbsp;</td>');
            this.html += ('<td>' + rowpick.ONDERDEELNUMMER + '</td>');
            this.html += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
            this.html += ('<td style="text-align:right;">' + rowpick.AANTAL + '</td>');
            this.html += ('<td style="text-align:right;"></td>');
            this.html += ('<td style="text-align:right;"></td>');
            this.html += ('</tr>');
        }
        if (swfound == 1) {
            this.html += ('</table>');
        }
        this.html += ('</div>');
        this.html += ('</div>');

        this.html += ('<div style="height:5em">');
        //Footer
        this.html += ('<table class="t">');
        this.html += ('<tr>');
        this.html += ('<td class="leftmargin"></td>');
        this.html += ('<td style="width:40em">');
        this.html += ('<b>DEALT BY:</b>&nbsp;&nbsp;&nbsp;&nbsp; ' + row.CONTACTPERSOON);
        this.html += ('</td>');
        this.html += ('<td rowspan="2" style="height:6em;width:18em">');

        let thisHandtekening = '&nbsp;';
        if (row.HANDTEKENING != '') {
            thisHandtekening = `<img src="${row.HANDTEKENING}" style="height:6em;width:18em"></img>`;
        }

        this.html += thisHandtekening;

        this.html += ('</td>');
        this.html += ('</tr>');
        this.html += ('<tr>');
        this.html += ('<td></td>');
        this.html += ('<td>');
        this.html += ('PLEASE CONFIRM WITHIN 5 DAYS.');
        this.html += ('</td>');
        this.html += ('</tr>');
        this.html += ('</table>');
        this.html += ('</div>');

        this.html += ('<div style="height:3em">');
        this.html += ('<table class="t">');
        this.html += ('<tr>');
        this.html += ('<td class="leftmargin">&nbsp;</td>');
        this.html += ('<td style="width:20em">');
        this.html += ('<b>INVOICE TO :</b> TASSERON BV');
        this.html += ('</td>');
        this.html += ('<td style="width:20em">&nbsp;</td>');
        this.html += ('<td style="width:20em">');
        this.html += ('<b>GOODS TO :</b> TASSERON BV');
        this.html += ('</td>');
        this.html += ('</tr>');
        this.html += ('<td>&nbsp;</td>');
        this.html += ('<td>');
        this.html += ('AMBACHTSHOF 50');
        this.html += ('</td>');
        this.html += ('<td>&nbsp;</td>');
        this.html += ('<td>');
        this.html += ('AMBACHTSHOF 50');
        this.html += ('</td>');
        this.html += ('</tr>');
        this.html += ('<td>&nbsp;</td>');
        this.html += ('<td>');
        this.html += ('NL-2632 BB NOOTDORP');
        this.html += ('</td>');
        this.html += ('<td>&nbsp;</td>');
        this.html += ('<td>');
        this.html += ('NL-2632 BB NOOTDORP');
        this.html += ('</td>');
        this.html += ('</tr>');
        this.html += ('</table>');
        this.html += ('</div>');

        this.defs = '<div style="display:none">'
            + '<div id="thisFilename">' + filename + '</div>'
            + '<div id="thisDir">' + targetdir + '</div>'
            + '<div id="thisUrl">' + targeturl + '</div>'
            + '<div id="thisApp">' + Config.app + '</div>'
            + '<div id="thisBestelnummer">' + row.BESTELNUMMER + '</div>'
            + '</div>';

        this.script = "\n"
            + '<script>thisFilename="' + filename + '";thisDir="' + targetdir + '";thisUrl="' + targeturl +
            '";</script>';
        //
        this.info = `{
"thisFilename":"${filename}",
"thisDir":"${targetdir}",
"thisUrl":"${targeturl}",
"thisApp":"${Config.app}",
"thisBestelnummer":"${row.BESTELNUMMER}"
}`;
        return;
    }

    public async routes(req: Request, res: Response, next: NextFunction) {
        //
        let method = req.method;
        let action = db.fix(req.query.action||'');
        let result = '';
        //
        Logger.request(req);
        //
        if (action == "getinfo") {
            await this.doQuery(req, res, next, this.dict);
            result = this.info;
            res.status(200).send(result);
        } else if (action == "getpage") {
            await this.doQuery(req, res, next, this.dict);
            result = this.msg + this.html;
            res.status(200).send(result);
        } else {
            await this.doQuery(req, res, next, this.dict);
            result = this.msg + this.html + this.script + this.defs;
            res.status(200).send(result);
        }
    }

}
