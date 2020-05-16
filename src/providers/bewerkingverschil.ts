import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";

export class Bewerkingverschil {

  constructor() {
    Logger.info("Creating Bewerkingverschil");
  }

  private async doQuery(req: Request, res: Response, next: NextFunction) {
    let where = ``;
    //
    let bewerkingsnummer = req.query.bewerkingsnummer;
    let productnummer = req.query.productnummer;
    let lijn = req.query.lijn;
    let sel_vanaf = req.query.sel_vanaf;
    //
    let sql = `
select *,
date2screendate(initstartdatumtijd) as STARTDATUM,
date2screendate(einddatumtijd) as EINDDATUM,
date2screendate(ak2einddatumtijd) as AK2EINDDATUM,
DATEDIFF( einddatumtijd, ak2einddatumtijd ) as WACHTDAGENEXACT
from 
(
  select *,
  startaantal - gemiddeldflowaantal as flowverschil,
  startaantal - gemiddeldvoortgangflowaantal as voortgangverschil,
  startaantal - gemiddeldlogistiekflowaantal as logistiekverschil,
  abs(startaantal - gemiddeldflowaantal) as absflowverschil,
  abs(startaantal - gemiddeldvoortgangflowaantal) as absvoortgangverschil,
  abs(startaantal - gemiddeldlogistiekflowaantal) as abslogistiekverschil
  from
  (
  SELECT *,
  case when ifnull(flowaantalbewerkingen,0) > 0 
  then round((ifnull(flowaantal,0) / flowaantalbewerkingen),0)
  else 0 end 
  as gemiddeldflowaantal,
  case when ifnull(voortgangflowaantalbewerkingen,0) > 0 
  then round((ifnull(voortgangflowaantal,0) / voortgangflowaantalbewerkingen),0)
  else 0 end 
  as gemiddeldvoortgangflowaantal,
  case when ifnull(logistiekflowaantalbewerkingen,0) > 0 
  then round((ifnull(logistiekflowaantal,0) / logistiekflowaantalbewerkingen),0) 
  else 0 end 
  as gemiddeldlogistiekflowaantal
   FROM
  (
  SELECT
     BEWERKING.id,
       BEWERKING.Bewerkingsnummer,
       BEWERKING.Productnummer,
       BEWERKING.Einddatumtijd,
       BEWERKING.Productieaantal,
       BEWERKING.Startaantal,
     BEWERKING.Initstartdatumtijd,
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
     ( SELECT sum( bewerkingaantal) FROM BEWERKINGFLOW 
         WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer ) as flowaantal,
       ( SELECT count( distinct(bewerkingsoort)) FROM BEWERKINGFLOW 
         WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer ) as flowaantalbewerkingen,
       ( SELECT sum( bewerkingaantal) FROM BEWERKINGFLOW,BEWERKINGSOORT 
         WHERE BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort 
         and BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
         and BEWERKINGSOORT.voortgang = 1) as voortgangflowaantal,
       ( SELECT count( distinct(BEWERKINGFLOW.bewerkingsoort)) FROM BEWERKINGFLOW,BEWERKINGSOORT
         WHERE BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort 
         and BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
         and BEWERKINGSOORT.voortgang = 1 ) as voortgangflowaantalbewerkingen,
       ( SELECT sum( bewerkingaantal) FROM BEWERKINGFLOW,BEWERKINGSOORT
         WHERE BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort 
         and BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
         and BEWERKINGSOORT.naam like (\'logistiek%\')) as logistiekflowaantal,
       ( SELECT count( distinct(BEWERKINGFLOW.bewerkingsoort)) FROM BEWERKINGFLOW,BEWERKINGSOORT
         WHERE bewerkingflow.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort 
         and BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
         and BEWERKINGSOORT.naam like (\'logistiek%\')) as logistiekflowaantalbewerkingen,
       ( SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW
         WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
       AND NOT EXISTS (select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
       AND BEWERKINGFLOW.einddatumtijd is null)) as ak2einddatumtijd
      FROM
       bewerking) base
  ) som
  ) verschil
  `;
    if (req.query.bewerkingsnummer) {
      if (where == '') {
        where += " where ";
      } else {
        where += " and ";
      }
      where += ` bewerkingsnummer = '${req.query.bewerkingsnummer}'`;
    }
    if (req.query.productnummer) {
      if (where == '') {
        where += " where ";
      } else {
        where += " and ";
      }
      where += ` productnummer like '%${req.query.productnummer}%'`;
    }
    if (req.query.lijn) {
      if (where == '') {
        where += " where ";
      } else {
        where += " and ";
      }
      where += ` lijn = '${req.query.lijn}'`;
    }
    //
    if (sel_vanaf) {
      if (where == '') {
        where += " where ";
      } else {
        where += " and ";
      }
      where += `initstartdatumtijd >= screendate2date('${sel_vanaf}')`;
    }
    sql += where;
    sql += "\norder by cast(voortgangverschil as decimal) desc, initstartdatumtijd, cast(id as decimal)";
    //
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    res.status(200).send(rows);
    return;
  }

  private async doUpdate(req: Request, res: Response, next: NextFunction) {
    let row = req.body;
    let id = db.getDataId(req);
    let sql = `
update BEWERKING set
Startaantal = '${db.fix(row.STARTAANTAL)}'
where id = ${db.fix(id)};
`;
    //
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    res.status(200).send(row);
    return;
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    //
    if (method == "GET") {
      this.doQuery(req, res, next);
    } else if (method == "PUT") {
      let result = true;
      if (result) {
        this.doUpdate(req, res, next);
      }
    } else if (method == "POST") {
    } else if (method == "DELETE") {
    } else {
      Util.unknownOperation(req, res, next);
    }
  }
}
