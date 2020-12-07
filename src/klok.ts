import db from "./db";
import { Request, Response, NextFunction } from "express";
import { Util } from "./util";
import { Logger } from "./logger";
import * as fs from "fs";
import { Config } from "./config";

export class Klok {

  constructor() {
    Logger.info("Creating Klok");
  }

  public static async scan(req: Request, res: Response, next: NextFunction) {
    let gebruiker = req.body.gebruiker;
    let bewerkingsnummer = req.body.bewerkingsnummer;
    let volgnummer = req.body.volgnummer;
    let msg = req.body.msg;
    let year = req.body.year;
    let month = req.body.month;
    let day = req.body.day;
    let hour = req.body.hour;
    let minute = req.body.minute;
    let second = req.body.second;
    let scan = '';
    let naam = '';
    let productnummer = '';
    let bewerkingsoort = '';
    let bewerkingsoortnaam = '';
    let bewerkingflowid = '';
    let swinsert = 0;
    //
    let screendatetime = `${day}-${month}-${year} ${hour}:${minute}`
    let screendatetimestart = `${day}-${month}-${year} 00:00`
    let screendatetimeeind = `${day}-${month}-${year} 23:59`
    let connection = await db.waitConnection();
    //
    let sql = '';
    let rows: any;
    let row: any;
    //
    // Is dit een medewerking ingave (gebruiker)
    // Is dit een medewerker-scan (pos1: U, - , gebruiker)
    // Is dit een bon-scan (pos1: B, pos2: Application, - , bewerkingsnummer, - , volgnummer)
    //
    let bonarr = msg.split('-');
    //
    if (scan == '') {
      if (bonarr[0]) {
        if (bonarr[0].toUpperCase() == 'U') {
          //
          // Bestaat de gebruiker?
          //
          sql = `
select * 
from GEBRUIKER 
where upper(gebruiker) = '${bonarr[1].toUpperCase()}'`;
          rows = await db.waitQuery(connection, sql);
          if (rows[0]) {
            row = rows[0];
            scan = 'gebruiker';
            gebruiker = row.GEBRUIKER;
            naam = row.NAAM;
          }
        }
      }
    }
    //
    //
    //
    if (scan == '') {
      if (bonarr[0]) {
        if (bonarr[0].toUpperCase() == 'UIT') {
          scan = 'uit';
        }
      }
    }
    //
    //
    //
    if (scan == '') {
      if (bonarr[0] && bonarr[1] && bonarr[2]) {
        if (bonarr[0].length == 2
          && bonarr[0].substr(0, 1).toUpperCase() == 'B') {
          //
          // Bestaat de bon?
          //
          if (bonarr[1].length >= 1
            && bonarr[1].length < 9
            && bonarr[2].length >= 1
            && bonarr[2].length < 5) {
            sql = `
select 
BEWERKINGFLOW.ID, 
BEWERKINGFLOW.bewerkingsnummer,
BEWERKINGFLOW.volgnummer,
BEWERKING.productnummer,
BEWERKINGSOORT.bewerkingsoort as bewerkingsoort,
BEWERKINGSOORT.naam as bewerkingsoortnaam
from BEWERKINGFLOW,BEWERKING,BEWERKINGSOORT
where BEWERKINGFLOW.bewerkingsnummer = '${bonarr[1]}'
and BEWERKINGFLOW.volgnummer = '${bonarr[2]}'
and BEWERKING.bewerkingsnummer = BEWERKINGFLOW.bewerkingsnummer
and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort`;
            rows = await db.waitQuery(connection, sql);
            if (rows[0]) {
              row = rows[0];
              scan = 'bon';
              bewerkingsnummer = row.BEWERKINGSNUMMER;
              bewerkingflowid = row.ID;
              volgnummer = row.VOLGNUMMER;
              productnummer = row.PRODUCTNUMMER;
              bewerkingsoort = row.BEWERKINGSOORT;
              bewerkingsoortnaam = row.BEWERKINGSOORTNAAM;
            }
          }
        }
      }
    }
    //
    //
    //
    if (scan == '') {
      if (msg.trim() != '') {
        sql = `
select * 
from GEBRUIKER 
where badge1 = '${msg}'`;
        rows = await db.waitQuery(connection, sql);
        if (rows[0]) {
          row = rows[0];
          scan = 'gebruiker';
          gebruiker = row.GEBRUIKER;
          naam = row.NAAM;
        }
      }
    }
    if (scan == '') {
      if (msg.trim() != '') {
        sql = `
select * 
from GEBRUIKER 
where badge2= '${msg}'`;
        rows = await db.waitQuery(connection, sql);
        if (rows[0]) {
          row = rows[0];
          scan = 'gebruiker';
          gebruiker = row.GEBRUIKER;
          naam = row.NAAM;
        }
      }
    }
    if (scan == '') {
      sql = `
        select * 
        from GEBRUIKER 
        where upper(gebruiker) = upper('${msg}')`;
      rows = await db.waitQuery(connection, sql);
      if (rows[0]) {
        row = rows[0];
        scan = 'selectgebruiker';
        gebruiker = row.GEBRUIKER;
        naam = row.NAAM;
      }
    }
    //
    //
    //
    if (scan == 'selectgebruiker') {
      bewerkingsnummer = '';
      volgnummer = '';
      productnummer = '';
      bewerkingsoort = '';
      bewerkingsoortnaam = '';
    }
    if (scan == 'gebruiker') {
      bewerkingsnummer = '';
      volgnummer = '';
      productnummer = '';
      bewerkingsoort = '';
      bewerkingsoortnaam = '';
      //
      // Alle open bewerkings-regels van deze gebruiker afsluiten
      //
      sql = `
update BEWERKINGTIJD set
einddatumtijd = screendatetime2date('${screendatetime}')
where gebruiker = '${gebruiker}'
and startdatumtijd >= screendatetime2date('${screendatetimestart}')
and startdatumtijd <= screendatetime2date('${screendatetimeeind}')
and einddatumtijd = screendatetime2date('${screendatetimestart}')`;
      res.crudResult = await db.waitQuery(connection, sql);
      sql = `
update BEWERKINGTIJD set 
tijd= TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)
where gebruiker = '${gebruiker}'
and startdatumtijd >= screendatetime2date('${screendatetimestart}')
and startdatumtijd <= screendatetime2date('${screendatetimeeind}')`;
      res.crudResult = await db.waitQuery(connection, sql);
      //
      // Is er al een tijdregel voor vandaag
      //     Vandaag regel open regel toevoegen
      // of
      //     Vandaag openen
      //
      sql = `
select * from BEWERKINGTIJD
where gebruiker = '${gebruiker}'
and startdatumtijd >= screendatetime2date('${screendatetimestart}')
and startdatumtijd <= screendatetime2date('${screendatetimeeind}')
and bewerkingsnummer = 0`;
      rows = await db.waitQuery(connection, sql);
      if (rows[0]) {
        row = rows[0];
        sql = `
update BEWERKINGTIJD set
einddatumtijd = screendatetime2date('${screendatetime}'),
productnummer = 'in'
where id = '${row.ID}'`;
        res.crudResult = await db.waitQuery(connection, sql);
        sql = `
update BEWERKINGTIJD set
tijd = TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)
where id = '${row.ID}'`;
        res.crudResult = await db.waitQuery(connection, sql);
      } else {
        sql = `
insert into BEWERKINGTIJD
(Bewerkingsnummer,Bewerkingflowid,Productnummer,Gebruiker,
startdatumtijd,einddatumtijd,tijd)
values (
'0',
'0',
'in',
'${gebruiker}',
screendatetime2date('${screendatetime}'),
screendatetime2date('${screendatetime}'),
'0'
)`;
        res.crudResult = await db.waitQuery(connection, sql);
      }
    }
    if (scan == 'bon') {
      if (gebruiker == '') {
        bewerkingsnummer = '';
        volgnummer = '';
        productnummer = '';
        bewerkingsoort = '';
        bewerkingsoortnaam = '';
      } else {
        swinsert = 1;
        sql = `
select * from BEWERKINGTIJD
where gebruiker = '${gebruiker}'
and startdatumtijd >= screendatetime2date('${screendatetimestart}')
and startdatumtijd <= screendatetime2date('${screendatetimeeind}')
order by startdatumtijd desc`;
        rows = await db.waitQuery(connection, sql);
        for (let irow = 0; irow < rows.lenght; irow++) {
          row = rows[irow];
          if (row.BEWERKINGFLOWID == bewerkingflowid) {
            let time =
              (hour * 60 + minute)
              - Number(row.EINDDATUMTIJD.substr(11, 2)) * 60
              + Number(row.EINDDATUMTIJD.substr(14, 2));
            if ((row.EINDDATUMTIJD == year + '-' + month + '-' + day + ' ' + '00:00:00')
              || (time < 5)
            ) {
              swinsert = 0;
              sql = `
update BEWERKINGTIJD set
einddatumtijd = screendatetime2date('${screendatetimestart}')
where id = '${row.ID}'`;
              res.crudResult = await db.waitQuery(connection, sql);
            }
          }
        }
        if (swinsert == 1) {
          sql = `
insert into BEWERKINGTIJD
(Bewerkingsnummer,Bewerkingsoort,Bewerkingflowid,Productnummer,Gebruiker,
startdatumtijd,einddatumtijd,tijd)
values (
'${bewerkingsnummer}',
'${bewerkingsoort}',
'${bewerkingflowid}',
'${productnummer}',
'${gebruiker}',
screendatetime2date('${screendatetime}'),
screendatetime2date('${screendatetimestart}'),
'0'
)`;
          res.crudResult = await db.waitQuery(connection, sql);
        }
        gebruiker = '';
        naam = '';
      }
    }
    if (scan == 'uit') {
      if (gebruiker == '') {
        bewerkingsnummer = '';
        volgnummer = '';
        productnummer = '';
        bewerkingsoort = '';
        bewerkingsoortnaam = '';
      } else {
        //
        // Alle open bewerkings-regels van deze gebruiker afsluiten
        //
        sql = `
update BEWERKINGTIJD set 
einddatumtijd = screendatetime2date('${screendatetime}')
where gebruiker = '${gebruiker}'
and startdatumtijd >= screendatetime2date('${screendatetimestart}')
and startdatumtijd <= screendatetime2date('${screendatetimeeind}')
and einddatumtijd = screendatetime2date('${screendatetimestart}')`;
        res.crudResult = await db.waitQuery(connection, sql);
        sql = `
update BEWERKINGTIJD set
tijd = TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)
where gebruiker = '${gebruiker}'
and startdatumtijd >= screendatetime2date('${screendatetimestart}')
and startdatumtijd <= screendatetime2date('${screendatetimeeind}')`;
        res.crudResult = await db.waitQuery(connection, sql);
        //
        // De tijdregel op uit zetten
        //
        sql = `
update BEWERKINGTIJD set
productnummer = 'uit'
where gebruiker = '${gebruiker}'
and startdatumtijd >= screendatetime2date('${screendatetimestart}')
and startdatumtijd <= screendatetime2date('${screendatetimeeind}')
and bewerkingsnummer = '0'`;
        res.crudResult = await db.waitQuery(connection, sql);
      }
    }
    //
    let result = {
      items: [
        {
          msg: msg,
          SCAN: scan,
          GEBRUIKER: gebruiker,
          NAAM: naam,
          BEWERKINGSNUMMER: bewerkingsnummer,
          VOLGNUMMER: volgnummer,
          PRODUCTNUMMER: productnummer,
          BEWERKINGSOORT: bewerkingsoort,
          BEWERKINGSOORTNAAM: bewerkingsoortnaam
        }
      ]
    };
    connection.release();
    res.status(200).send(result);
    return;
  }
}
