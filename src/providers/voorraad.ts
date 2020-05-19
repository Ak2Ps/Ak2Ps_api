import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import * as fs from "fs";
import { Config } from "../config";

export class Voorraad {

  constructor() {
    Logger.info("Creating Voorraad");
  }

  protected async getParam(req: Request, res: Response, next: NextFunction, naam: string) {
    let result = "";
    let sql: string;
    //
    sql = `
select 
ifnull(INHOUD,'') as INHOUD
from param
where naam = '${naam}'`;
    let rows = await db.waitQuery(res.crudConnection, sql);
    if (rows[0]) {
      result = rows[0].INHOUD;
    }
    return result;
  }

  protected async fase0(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let sql: string;
    res.crudConnection = await db.waitConnection();
    //
    // Opschonen
    //
    sql = `
update PRODUCT 
set eindvoorraad = 0, 
tebestellen = 0`;
    res.crudResult = await db.waitQuery(res.crudConnection, sql);
    sql = `
delete from PRODUCTVOORRAAD`;
    res.crudResult = await db.waitQuery(res.crudConnection, sql);
    //
    res.crudConnection.release();
    let result = {
      items: [
        { msg: 'Gereed ...' }
      ]
    }
    res.status(200).send(result);
    return;
  }

  protected async fase1(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let sql: string;
    let sqlinsert: string;
    let wiproductnummer = '';
    let tlvoorraad = 0;
    let tltebestellen = 0;
    let swbestellen = 0;
    let bestellen = 0;
    let aantal = 0;
    res.crudConnection = await db.waitConnection();
    //
    let orderdagen = await this.getParam(req, res, next, "ORDERDAGEN");
    let besteldagen = await this.getParam(req, res, next, "BESTELDAGEN");
    //
    // Alle vraagregels op artikel,datum doorlopen en voorraadregels maken (voorraad = delta)
    // Te bestellen: als er een negatieve voorraad optreedt voor een artikel met onderdelen -> het verschil
    //
    sql = `
select * from (
select
actie,
actie_oms,
productnummer,
datum,
initdatum,
startdatum,
aantal,
geproduceerd,
uitval,
actienummer,
date2screendate(initdatum) as INITDATUM_OMS,
date2screendate(datum) as DATUM_OMS,
date2screendate(startdatum) as STARTDATUM_OMS,
(select min(Voorraaddatumtijd) from PRODUCT where BASE.productnummer = PRODUCT.Productnummer) as VOORRAADDATUM,
(select min(Productnaam) from PRODUCT where BASE.productnummer = PRODUCT.Productnummer) as PRODUCTNAAM,
(select count(*) from ONDERDEEL where BASE.productnummer = ONDERDEEL.productnummer and ONDERDEEL.onderdeelnummer != BASE.productnummer and faktor > 0) as onderdelen
from (`;
    // BE: Openstaande Bewerkingen
    sql += `
SELECT 
'BE' as actie,
concat('Eindproduct ', Bewerkingsnummer, ' van ', date2screendate(startdatumtijd)) as actie_oms,
productnummer,
bewerkingsnummer as actienummer,
null as initdatum,
ifnull(plandatumtijd,startdatumtijd) as datum,
startdatumtijd as startdatum,
productieaantal as aantal,
(select sum(AantalGemaakt) from BEWERKINGTIJD where BEWERKINGTIJD.bewerkingsnummer = BEWERKING.bewerkingsnummer) as geproduceerd,
(select sum(AantalAfkeur) + sum(AantalReparatie) from BEWERKINGUITVAL where BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.bewerkingsnummer) as uitval
from BEWERKING 
where einddatumtijd is null`;
    // VE: Orders
    sql += `
    union all
SELECT
'VE',
a.Orderreferentie, 
a.productnummer,
a.ordernummer,
a.initvraagdatumtijd,`;
    if (Number(orderdagen) == 1) {
      //voorraaddatum (x dagen eerder op voorraad dan nodig)
      sql += `
DATE_SUB(a.vraagdatumtijd,INTERVAL ifnull(p.leverdagen,0) DAY),`;
    } else {
      sql += `
a.vraagdatumtijd,`;
    }
    sql += `
a.vraagdatumtijd,
a.vraag * -1,
null, 
null
from PRODUCTVRAAG a left join PRODUCT p
on a.productnummer = p.productnummer`;
    // BES: Bestelling
    sql += `
union all
SELECT 
'BES',
'Bestelling',
a.productnummer,
null,
null,
a.besteldatumtijd,`;
    if (Number(besteldagen) == 1) {
      //actiedatum (x dagen eerder bestellen dan nodig)
      sql += `
DATE_SUB(a.besteldatumtijd,INTERVAL ifnull(p.leverdagen,0) DAY),`;
    } else {
      sql += `
a.besteldatumtijd,`;
    }
    sql += `
a.bestelling,
null,
null
from BESTELLING a left join PRODUCT p 
on a.productnummer = p.productnummer`;
    // VRD: Startvoorraad
    sql += `
union all
SELECT 
'VRD',
'Startvoorraad',
productnummer, 
null,
null,
null,
null,
voorraad,
null,
null
from PRODUCT`;
    sql += `
) BASE
) BASE2
order by productnummer, datum, aantal desc`;
    let rows = await db.waitQuery(res.crudConnection, sql);
    wiproductnummer = '';
    tlvoorraad = 0;
    tltebestellen = 0;
    swbestellen = 0;
    aantal = 0;
    for (let irow = 0; irow < rows.length; irow++) {
      let row = rows[irow];
      if (wiproductnummer != row.PRODUCTNUMMER) {
        wiproductnummer = row.PRODUCTNUMMER;
        tlvoorraad = 0;
        tltebestellen = 0;
        swbestellen = 0;
      }
      aantal = Number(row.AANTAL);
      tlvoorraad = tlvoorraad + aantal;
      tltebestellen = tltebestellen - aantal;
      //
      // Pas bijmaken als er iets nodig is (VE/OP)
      // Anders wachten (VRD/BE/BES)
      //
      if (row.ACTIE == 'VE') {
        swbestellen = 1;
      } else if (row.ACTIE == 'OP') {
        // Deze actie wordt pas in fase 2 aangemaakt: dus nu eigenlijk een overbodige uitvraag
        swbestellen = 1;
      }
      if (swbestellen == 0) {
        sqlinsert = `
insert into PRODUCTVOORRAAD (
productnummer,
actienummer,
voorraad, 
initdatumtijd,
actiedatumtijd,
voorraaddatumtijd,
tebestellen,
besteld,
actie,
actieomschrijving,
onderdelen,
expanded)
values (
trim('${db.fix(row.PRODUCTNUMMER)}'),
null,
'${String(aantal)}',
screendate2date('${row.INITDATUM_OMS}'),
screendate2date('${row.STARTDATUM_OMS}'),
screendate2date('${row.DATUM_OMS}'),
0,
0,
trim('${db.fix(row.ACTIE)}'),
trim('${db.fix(row.ACTIE_OMS)}'),
'${row.ONDERDELEN}',
0
)`;
        res.crudResult = await db.waitQuery(res.crudConnection, sqlinsert);
      } else {
        bestellen = 0;
        if ((tltebestellen > 0) && (Number(row.ONDERDELEN) > 0)) {
          bestellen = tltebestellen;
          tltebestellen = 0;
        }
        sqlinsert = `
insert into PRODUCTVOORRAAD (
productnummer,
actienummer,
voorraad,
initdatumtijd,
actiedatumtijd,
voorraaddatumtijd,
tebestellen,
besteld,
actie,
actieomschrijving,
onderdelen,
expanded)
values (
trim('${db.fix(row.PRODUCTNUMMER)}'),
trim('${db.fix(row.ACTIENUMMER)}'),
'${aantal}',
screendate2date('${row.INITDATUM_OMS}'),
screendate2date('${row.STARTDATUM_OMS}'),
screendate2date('${row.DATUM_OMS}'),
'${bestellen}',
0,
trim('${db.fix(row.ACTIE)}'),
trim('${db.fix(row.ACTIE_OMS)}'),
'${row.ONDERDELEN}',
0
)`;
        res.crudResult = await db.waitQuery(res.crudConnection, sqlinsert);
      }
    }
    //
    res.crudConnection.release();
    let result = {
      items: [
        { msg: 'Gereed ...' }
      ]
    }
    res.status(200).send(result);
    return;
  }

  protected async fase2(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let tlregels = 0;
    let tlvoorraad = 0;
    let sql: string;
    let sqlonderdeel: string;
    let sqlinsert: string;
    let sqlupdate: string;
    res.crudConnection = await db.waitConnection();
    //
    // Alle voorraad regels met tebestellen > 0 (producten met een onderdeel waar een tekort voor was)
    // Een voorraadregel toevoegen voor elk onderdeel met benodigd aantal en indicatie: artikel nog beoordelen
    //
    sql = `
select PRODUCTVOORRAAD.*,
date2screendate(voorraaddatumtijd)  as DATUM_OMS
from PRODUCTVOORRAAD
where tebestellen > 0
and expanded = 0
order by productnummer`;
    let rows = await db.waitQuery(res.crudConnection, sql);
    for (let irow = 0; irow < rows.length; irow++) {
      let row = rows[irow];
      tlregels = tlregels + 1;
      tlvoorraad = Number(row.TEBESTELLEN) * -1;
      //
      // Voor elk onderdeel een voorraad-vermindering-regel toevoegen
      // (Elk onderdeel kan weer onderdelen hebben)
      //
      sqlonderdeel = `
select *
from ONDERDEEL
where productnummer = trim('${row.PRODUCTNUMMER}')
and productnummer != onderdeelnummer
and faktor > 0`;
      let rowsonderdeel = await db.waitQuery(res.crudConnection, sqlonderdeel);
      for (let irowonderdeel = 0; irowonderdeel < rowsonderdeel.length; irowonderdeel++) {
        let rowonderdeel = rowsonderdeel[irowonderdeel];
        sqlinsert = `
insert into PRODUCTVOORRAAD
(productnummer,actienummer,
voorraad, initdatumtijd,voorraaddatumtijd,tebestellen,besteld,actie,actieomschrijving,onderdelen,expanded)
values (
trim('${db.fix(rowonderdeel.ONDERDEELNUMMER)}'),
trim('${db.fix(rowonderdeel.PRODUCTNUMMER)}'),
${Number(rowonderdeel.FAKTOR) * tlvoorraad},
screendate2date('${row.DATUM_OMS}'),
screendate2date('${row.DATUM_OMS}'),
0,
0,
'OP',
'Onderdeel voor ${db.fix(row.PRODUCTNUMMER)}',
-1,
0
)`;
        res.crudResult = await db.waitQuery(res.crudConnection, sqlinsert);
      }
      sqlupdate = `
update PRODUCTVOORRAAD set
tebestellen = 0,
expanded = 1
where id = trim('${row.ID}')`;
      res.crudResult = await db.waitQuery(res.crudConnection, sqlupdate);
    }
    //
    // Voorraad en aantal onderdelen van de zojuist toegevoegde regels opnieuw beoordelen per artikel
    // Om eventueel een nieuwe 'tebestellen' te bepalen
    //
    sql = `
select distinct PRODUCTNUMMER
from PRODUCTVOORRAAD
where onderdelen = -1
order by productnummer`;
    rows = await db.waitQuery(res.crudConnection, sql);
    for (let irow = 0; irow < rows.length; irow++) {
      let row = rows[irow];
      await this.beoordeelProduct(req, res, next, row.PRODUCTNUMMER);
    }
    //
    let result = {
      items: [
        { msg: `${tlregels} regels afgeboekt ...`, regelsbesteld: tlregels }
      ]
    }
    res.crudConnection.release();
    res.status(200).send(result);
    return;
  }

  protected async fase3(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let tlregels = 0;
    let sql: string;
    let sqlupdate: string;
    let aantal = 0;
    let swbestellen = 0;
    let tlvoorraad = 0;
    let wiproductnummer: string;
    res.crudConnection = await db.waitConnection();
    //
    sql = `
select * from PRODUCTVOORRAAD
order by productnummer, voorraaddatumtijd, voorraad desc`;
    let rows = await db.waitQuery(res.crudConnection, sql);
    wiproductnummer = "";
    for (let irow = 0; irow < rows.length; irow++) {
      let row = rows[irow];
      tlregels = tlregels + 1;
      if (row.PRODUCTNUMMER != wiproductnummer) {
        wiproductnummer = row.PRODUCTNUMMER;
        swbestellen = 0;
        tlvoorraad = 0;
      }
      aantal = Number(row.VOORRAAD);
      tlvoorraad = tlvoorraad + aantal;
      if (row.ACTIE == 'VE') {
        swbestellen = 1;
      } else if (row.ACTIE == 'OP') {
        swbestellen = 1;
      }
      sqlupdate = `
update PRODUCTVOORRAAD set
actievoorraad = '${tlvoorraad}'
where id = trim('${row.ID}')`;
      res.crudResult = await db.waitQuery(res.crudConnection, sqlupdate);
    }
    //
    let result = {
      items: [
        { msg: `${tlregels} regels bijgewerkt ...`, regelsbijgewerkt: tlregels }
      ]
    }
    res.crudConnection.release();
    res.status(200).send(result);
    return;
  }

  protected async fase4(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let tlregels = 0;
    let sql: string;
    let sqlupdate: string;
    let wiproductnummer = '';
    let widatum: string;
    res.crudConnection = await db.waitConnection();
    //
    sql = `
select 
DET.productnummer, 
DET.actievoorraad,
DET.voorraaddatumtijd,
date2screendate(voorraaddatumtijd) as DATUM_OMS
from PRODUCTVOORRAAD DET,
(
select 
min(voorraaddatumtijd) as mindat, 
productnummer
from PRODUCTVOORRAAD
where actievoorraad < 0
group by productnummer
) BASE
where BASE.productnummer = DET.productnummer
and   BASE.mindat = DET.voorraaddatumtijd
and   ifnull(DET.beperkstatus,'---') = '---'
order by DET.productnummer, DET.actievoorraad`;
    let rows = await db.waitQuery(res.crudConnection, sql);
    wiproductnummer = "";
    for (let irow = 0; irow < rows.length; irow++) {
      let row = rows[irow];
      tlregels = tlregels + 1;
      if (tlregels >= 150) {
        break;
      }
      if (row.PRODUCTNUMMER != wiproductnummer) {
        wiproductnummer = row.PRODUCTNUMMER;
        widatum = row.DATUM_OMS;
        sqlupdate = `
update PRODUCTVOORRAAD set
beperkdatumtijd = screendate2date('${widatum}'),
beperknummer = '${db.fix(wiproductnummer)}'
where PRODUCTVOORRAAD.productnummer in
(
select productnummer from ONDERDEEL
where onderdeelnummer = '${db.fix(wiproductnummer)}'
)
and actievoorraad < 0
and ifnull(beperkdatumtijd,screendate2date('31-12-2999')) 
> screendate2date('${widatum}')`;
        res.crudResult = await db.waitQuery(res.crudConnection, sqlupdate);
        sqlupdate = `
update PRODUCTVOORRAAD set
beperkstatus = '1'
where PRODUCTVOORRAAD.productnummer = '${db.fix(wiproductnummer)}'`;
        res.crudResult = await db.waitQuery(res.crudConnection, sqlupdate);
      }
    }
    //
    let result = {
      items: [
        { msg: `${tlregels} regels bijgewerkt ...`, regels: tlregels }
      ]
    }
    res.crudConnection.release();
    res.status(200).send(result);
    return;
  }

  protected async getOnderdeelVoorraad(req: Request, res: Response, next: NextFunction, productnummer: string) {
    let result = '';
    let sqlOV = `
select
'OV' as TYPE,
PRODUCTVOORRAAD.*,
date2screendate(voorraaddatumtijd) as DATUM_OMS,
(select count(*) from ONDERDEEL where PRODUCTVOORRAAD.productnummer = ONDERDEEL.productnummer and ONDERDEEL.onderdeelnummer != PRODUCTVOORRAAD.productnummer and faktor > 0) as ONDERDELEN
from PRODUCTVOORRAAD
where productnummer = trim('${productnummer}')
order by voorraaddatumtijd, voorraad desc, id`;
    let rowsOV = await db.waitQuery(res.crudConnection, sqlOV);
    for (let irowOV = 0; irowOV < rowsOV.length; irowOV++) {
      let rowOV = rowsOV[irowOV];
      result += ",\n";
      result += JSON.stringify(rowOV);
    }
    return result;
  }

  protected async beoordeelProduct(req: Request, res: Response, next: NextFunction, productnummer: string) {
    let tlvoorraad = 0;
    let tltebestellen = 0;
    let swbestellen = 0;
    let bestellen = 0;
    let sqlupdate: string;
    let aantal = 0;
    let sql = `
select PRODUCTVOORRAAD.*,
date2screendate(voorraaddatumtijd) as DATUM_OMS,
(select count(*) from ONDERDEEL
where PRODUCTVOORRAAD.productnummer = ONDERDEEL.productnummer and ONDERDEEL.onderdeelnummer != PRODUCTVOORRAAD.productnummer and faktor > 0) as ONDERDEEL_ONDERDELEN
from PRODUCTVOORRAAD
where productnummer = trim('${productnummer}')
order by voorraaddatumtijd, voorraad desc`;
    let rows = await db.waitQuery(res.crudConnection, sql);
    for (let irow = 0; irow < rows.length; irow++) {
      let row = rows[irow];
      aantal = Number(row.VOORRAAD);
      tlvoorraad = tlvoorraad + aantal;
      tltebestellen = tltebestellen - aantal;
      if (Number(row.ONDERDEEL_ONDERDELEN) <= 0) {
        //
        // Geen onderdelen, hoeft niet meer verder beoordeeld te worden
        //			
        sqlupdate = `
update PRODUCTVOORRAAD set
tebestellen = 0,
onderdelen = 0
where id = trim('${row.ID}')`;
        res.crudResult = await db.waitQuery(res.crudConnection, sqlupdate);
      } else if (tltebestellen <= 0) {
        //
        // Er is genoeg, hoeft niet meer verder beoordeeld te worden
        //
        sqlupdate = `
update PRODUCTVOORRAAD set
tebestellen = 0,
onderdelen = '${row.ONDERDEEL_ONDERDELEN}'
where id = trim('${row.ID}')`;
        res.crudResult = await db.waitQuery(res.crudConnection, sqlupdate);
      } else {
        //
        // Pas bestellen als er iets nodig is (VE/OP)
        // Anders wachten (VRD/BE/BES
        //
        if (row.ACTIE == 'VE') {
          swbestellen = 1;
        } else if (row.ACTIE == 'OP') {
          swbestellen = 1;
        }
        if (swbestellen == 0) {
          sqlupdate = `
update PRODUCTVOORRAAD set
tebestellen = 0,
onderdelen = '${row.ONDERDEEL_ONDERDELEN}'
where id = trim('${row.ID}')`;
          res.crudResult = await db.waitQuery(res.crudConnection, sqlupdate);
        } else {
          //
          // Er is te weinig, het artikel heeft onderdelen en moet opnieuw beoordeeld worden
          //
          bestellen = tltebestellen;
          tltebestellen = 0;
          sqlupdate = `
update PRODUCTVOORRAAD set
tebestellen = '${bestellen}',
onderdelen = '${row.ONDERDEEL_ONDERDELEN}'
where id = trim('${row.ID}')`;
          res.crudResult = await db.waitQuery(res.crudConnection, sqlupdate);
        }
      }
    }
    return;
  }

  protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
    //
    let productnummer = req.query.productnummer || "";
    let soort = req.query.soort || "";
    let lijn = req.query.lijn || "";
    let klant = req.query.klant || "";
    let datum = req.query.datum || "";
    let like = req.query.like || "";
    let result = "";
    //
    let sql: string;
    let sql99: string;
    let where = '';
    res.crudConnection = await db.waitConnection();
    //
    sql = `
select * from(
select 'P' as TYPE,
PRODUCTVOORRAAD.*,
getLijn(PRODUCT.productnummer) as LIJN,
PRODUCT.SOORT,
PRODUCT.PRODUCTNAAM,
date2screendate(PRODUCTVOORRAAD.initdatumtijd) as INITDATUM_OMS,
date2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as DATUM_OMS,
date2screendate(PRODUCTVOORRAAD.actiedatumtijd) as ACTIEDATUM_OMS
from PRODUCTVOORRAAD left join PRODUCT 
on PRODUCTVOORRAAD.PRODUCTNUMMER = PRODUCT.PRODUCTNUMMER`;
    if (productnummer != '') {
      if (where == '') {
        where += ' where ';
      } else {
        where += ' and ';
      }
      if (like == '1') {
        where += `
ucase(PRODUCTVOORRAAD.productnummer) like ucase('${productnummer}%')`;
      } else {
        where += `
PRODUCTVOORRAAD.productnummer = ('${productnummer}')`;
      }
    }
    if (String(klant).trim() != '') {
      if (where == '') {
        where += ' where ';
      } else {
        where += ' and ';
      }
      where += `PRODUCTVOORRAAD.productnummer in (select productnummer from PRODUCTVRAAG where klantnaam = '${String(klant).trim()}')`;
    }
    if (String(soort).substr(0, 1) == 'M') {
      if (where == '') {
        where += ' where ';
      } else {
        where += ' and ';
      }
      where += "PRODUCT.soort = 'M'";
    }
    if (String(soort).substr(0, 1) == 'V') {
      if (where == '') {
        where += ' where ';
      } else {
        where += ' and ';
      }
      where += "PRODUCT.soort = 'V'";
    }
    if (datum != '') {
      if (where == '') {
        where += ' where ';
      } else {
        where += ' and ';
      }
      where += `
(
ISNULL(PRODUCTVOORRAAD.voorraaddatumtijd) 
or PRODUCTVOORRAAD.voorraaddatumtijd <= screendate2date('${datum}')
)`;
    }
    sql += where;
    sql += ' ) base ';
    where = "";
    if (String(lijn).trim() != '') {
      if (where == '') {
        where += ' where ';
      } else {
        where += ' and ';
      }
      where += `base.lijn = '${String(lijn).trim()}'`;
    }
    sql += where;
    sql += " order by ifnull(lijn,''),productnummer, voorraaddatumtijd, voorraad desc, actieomschrijving, actiedatumtijd, actievoorraad, id";
    // 
    let rows = await db.waitQuery(res.crudConnection, sql);
    //
    //
    //
    let wiproductnummer = "";
    let swfirst = 1;
    let tlart = 0;
    result += "[\n";
    for (let irow = 0; irow < rows.length; irow++) {
      let row = rows[irow];
      tlart++;
      if ((productnummer != '') && (tlart == 1001)) {
        sql99 = `
select
'99' as TYPE,
'Meer dan 1000 producten opgevraagd ...' as MSG
from DUAL`;
        let rows99 = await db.waitQuery(res.crudConnection, sql99);
        if (swfirst == 1) {
          swfirst = 0;
        } else {
          result += ",\n";
        }
        result += JSON.stringify(rows99[0]);
        break;
      }
      //
      //
      //
      if (swfirst == 1) {
        swfirst = 0;
      } else {
        result += ",\n";
      }
      result += JSON.stringify(row);
      //
      if ((productnummer != '') && (row.PRODUCTNUMMER != wiproductnummer)) {
        wiproductnummer = row.PRODUCTNUMMER;
        let sqlO1 = `
select
'O1' as TYPE,
PRODUCTNUMMER,
cast(FAKTOR as char) as FAKTOR,
ONDERDEELNUMMER
from ONDERDEEL
where PRODUCTNUMMER = '${row.PRODUCTNUMMER}'
and ONDERDEELNUMMER != '${row.PRODUCTNUMMER}'
and FAKTOR > 0
order by ONDERDEELNUMMER`;
        let rowsO1 = await db.waitQuery(res.crudConnection, sqlO1);
        for (let irowO1 = 0; irowO1 < rowsO1.length; irowO1++) {
          let rowO1 = rowsO1[irowO1];
          if (swfirst == 1) {
            swfirst = 0;
          } else {
            result += ",\n";
          }
          result += JSON.stringify(rowO1);
          // Voorraadstand onderdeel 1
          result += await this.getOnderdeelVoorraad(req, res, next, rowO1.ONDERDEELNUMMER);
          //
          let sqlO2 = `
select
'O2' as TYPE,
PRODUCTNUMMER,
cast(FAKTOR as char) as FAKTOR,
ONDERDEELNUMMER
from ONDERDEEL
where PRODUCTNUMMER = '${rowO1.ONDERDEELNUMMER}'
and ONDERDEELNUMMER != '${rowO1.ONDERDEELNUMMER}'
and FAKTOR > 0
order by ONDERDEELNUMMER`;
          let rowsO2 = await db.waitQuery(res.crudConnection, sqlO2);
          for (let irowO2 = 0; irowO2 < rowsO2.length; irowO2++) {
            let rowO2 = rowsO2[irowO2];
            if (swfirst == 1) {
              swfirst = 0;
            } else {
              result += ",\n";
            }
            result += JSON.stringify(rowO2);
            // Voorraadstand onderdeel 2
            result += await this.getOnderdeelVoorraad(req, res, next, rowO2.ONDERDEELNUMMER);
            //
            let sqlO3 = `
select
'O3' as TYPE,
PRODUCTNUMMER,
cast(FAKTOR as char) as FAKTOR,
ONDERDEELNUMMER
from ONDERDEEL
where PRODUCTNUMMER = '${rowO2.ONDERDEELNUMMER}'
and ONDERDEELNUMMER != '${rowO2.ONDERDEELNUMMER}'
and FAKTOR > 0
order by ONDERDEELNUMMER`;
            let rowsO3 = await db.waitQuery(res.crudConnection, sqlO3);
            for (let irowO3 = 0; irowO3 < rowsO3.length; irowO3++) {
              let rowO3 = rowsO3[irowO3];
              if (swfirst == 1) {
                swfirst = 0;
              } else {
                result += ",\n";
              }
              result += JSON.stringify(rowO3);
              // Voorraadstand onderdeel 3
              result += await this.getOnderdeelVoorraad(req, res, next, rowO3.ONDERDEELNUMMER);
              //
              let sqlO4 = `
select
'O4' as TYPE,
PRODUCTNUMMER,
cast(FAKTOR as char) as FAKTOR,
ONDERDEELNUMMER
from ONDERDEEL
where PRODUCTNUMMER = '${rowO3.ONDERDEELNUMMER}'
and ONDERDEELNUMMER != '${rowO3.ONDERDEELNUMMER}'
and FAKTOR > 0
order by ONDERDEELNUMMER`;
              let rowsO4 = await db.waitQuery(res.crudConnection, sqlO4);
              for (let irowO4 = 0; irowO4 < rowsO4.length; irowO4++) {
                let rowO4 = rowsO4[irowO4];
                if (swfirst == 1) {
                  swfirst = 0;
                } else {
                  result += ",\n";
                }
                result += JSON.stringify(rowO4);
                // Voorraadstand onderdeel 4
                result += await this.getOnderdeelVoorraad(req, res, next, rowO4.ONDERDEELNUMMER);
                //
                let sqlO5 = `
select
'O5' as TYPE,
PRODUCTNUMMER,
cast(FAKTOR as char) as FAKTOR,
ONDERDEELNUMMER
from ONDERDEEL
where PRODUCTNUMMER = '${rowO4.ONDERDEELNUMMER}'
and ONDERDEELNUMMER != '${rowO4.ONDERDEELNUMMER}'
and FAKTOR > 0
order by ONDERDEELNUMMER`;
                let rowsO5 = await db.waitQuery(res.crudConnection, sqlO5);
                for (let irowO5 = 0; irowO5 < rowsO5.length; irowO5++) {
                  let rowO5 = rowsO5[irowO5];
                  if (swfirst == 1) {
                    swfirst = 0;
                  } else {
                    result += ",\n";
                  }
                  result += JSON.stringify(rowO5);
                  // Voorraadstand onderdeel 5
                  result += await this.getOnderdeelVoorraad(req, res, next, rowO5.ONDERDEELNUMMER);
                  //
                  let sqlO6 = `
select
'O6' as TYPE,
PRODUCTNUMMER,
cast(FAKTOR as char) as FAKTOR,
ONDERDEELNUMMER
from ONDERDEEL
where PRODUCTNUMMER = '${rowO5.ONDERDEELNUMMER}'
and ONDERDEELNUMMER != '${rowO5.ONDERDEELNUMMER}'
and FAKTOR > 0
order by ONDERDEELNUMMER`;
                  let rowsO6 = await db.waitQuery(res.crudConnection, sqlO6);
                  for (let irowO6 = 0; irowO6 < rowsO6.length; irowO6++) {
                    let rowO6 = rowsO6[irowO6];
                    if (swfirst == 1) {
                      swfirst = 0;
                    } else {
                      result += ",\n";
                    }
                    result += JSON.stringify(rowO6);
                    // Voorraadstand onderdeel 6
                    result += await this.getOnderdeelVoorraad(req, res, next, rowO6.ONDERDEELNUMMER);
                    //
                    let sql99 = `
select
'99' as TYPE,
'Onderdeel van Onderdeel probleem' as MSG
from DUAL`;
                    let rows99 = await db.waitQuery(res.crudConnection, sql99);
                    for (let irow99 = 0; irow99 < rows99.length; irow99++) {
                      let row99 = rows99[irow99];
                      if (swfirst == 1) {
                        swfirst = 0;
                      } else {
                        result += ",\n";
                      }
                      result += JSON.stringify(row99);
                    }
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
    result += "]\n";
    //
    res.crudConnection.release();
    try {
      rows = JSON.parse(result);
    } catch (error) {
      rows = error;
    }
    res.status(200).send(rows);
    return;
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    Logger.request(req);
    //
    if (action == "fase0") {
      this.fase0(req, res, next);
    } else if (action == "fase1") {
      this.fase1(req, res, next);
    } else if (action == "fase2") {
      this.fase2(req, res, next);
    } else if (action == "fase3") {
      this.fase3(req, res, next);
    } else if (action == "fase4") {
      this.fase4(req, res, next);
    } else if (method == "GET") {
      this.doQuery(req, res, next);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }
}
