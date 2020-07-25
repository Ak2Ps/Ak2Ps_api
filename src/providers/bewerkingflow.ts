
import { Crud } from '../crud';
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";

const dict: Dict = {
  table: "BEWERKINGFLOW",
  key: [
    {
      body: "BEWERKINGSNUMMER",
      sql: "BEWERKINGSNUMMER",
    },
    {
      body: "VOLGNUMMER",
      sql: "VOLGNUMMER",
    }
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "bewerkingsnummer,volgnummer",
    where: [
    ],
    fields: [
    ],
  },
  query: {
    orderby: "bewerkingsnummer,volgnummer",
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

export class Bewerkingflow extends Crud {
  constructor() {
    super(
      dict
    )
  }

  protected async updateProductflow(req: Request, res: Response, next: NextFunction, bewerkingsnummer: string) {
    let productnummer = '';
    let sql = `
select 
productnummer 
from BEWERKING
where bewerkingsnummer = '${db.fix(bewerkingsnummer)}'`;
    let rows = await db.waitQuery(res.crudConnection, sql);
    if (!rows[0]) {
      return;
    }
    let row = rows[0];
    productnummer = row.PRODUCTNUMMER;
    //
    // productflowregels uitschakelen
    //
    let sqlupdate = `
update 
PRODUCTFLOW 
set volgnummer = -1
where productnummer = '${db.fix(productnummer)}'`;
    await db.waitQuery(res.crudConnection, sqlupdate);
    //
    // en nu weer inschakelen
    //
    sql = `
select 
min(volgnummer) as volgnummer, 
BEWERKINGFLOW.bewerkingsoort
from BEWERKINGFLOW,BEWERKINGSOORT
where bewerkingsnummer = '${db.fix(bewerkingsnummer)}'
and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
and BEWERKINGSOORT.voortgang = '1'
group by BEWERKINGFLOW.bewerkingsoort`;
    rows = await db.waitQuery(res.crudConnection, sql);
    for (let irow = 0; irow < rows.length; irow++) {
      row = rows[irow];
      let sqlflow = `
select * 
from PRODUCTFLOW
where productnummer = '${db.fix(productnummer)}'
and bewerkingsoort = '${row.BEWERKINGSOORT}'`;
      let rowsflow = await db.waitQuery(res.crudConnection, sqlflow);
      if (rowsflow[0]) {
        let rowflow = rowsflow[0];
        //
        // Een bestaande weer activeren
        //
        sqlupdate = `
update PRODUCTFLOW set
volgnummer = '${row.VOLGNUMMER}'
where productnummer = '${db.fix(productnummer)}'
and bewerkingsoort = '${row.BEWERKINGSOORT}'`;
        await db.waitQuery(res.crudConnection, sqlupdate);
      } else {
        //
        // een nieuwe toevoegen
        //
        let sqlinsert = `
insert into PRODUCTFLOW 
(productnummer,bewerkingsoort,volgnummer)
values (
'${db.fix(productnummer)}',
'${db.fix(row.BEWERKINGSOORT)}',
'${db.fix(row.VOLGNUMMER)}')`;
        await db.waitQuery(res.crudConnection, sqlinsert);
      }
    }
    //
    // De nog steeds uitgeschakelde verwijderen
    //
    let sqldelete = `
delete from PRODUCTFLOW
where productnummer = '${db.fix(productnummer)}'
and volgnummer = -1`;
    await db.waitQuery(res.crudConnection, sqldelete);
    return;
  }

  protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
    //
    res.crudConnection = await db.waitConnection();
    //
    let where = '';
    let sql = '';
    //
    let bewerkingsnummer = req.query.bewerkingsnummer || '';
    let productnummer = req.query.productnummer || '';
    let bewerkingsoort = req.query.bewerkingsoort || '';
    let addbwkflow = 1;
    let addproductflow = 0;

    if (bewerkingsnummer == '') {
      addbwkflow = 0;
    }
    if (addbwkflow == 1) {
      sql = `
select 
productnummer from BEWERKING
where bewerkingsnummer = '${db.fix(bewerkingsnummer)}'
and einddatumtijd is null`;
      let rows = await db.waitQuery(res.crudConnection, sql);
      if (rows[0]) {
        let row = rows[0];
        productnummer = row.PRODUCTNUMMER;
        if (productnummer != '') {
          addproductflow = 1;
        }
      } else {
        addbwkflow = 0;
      }
    }
    // Alleen als de bewerking bestaat 
    // en de bewerking nog niet gereed is (einddatumtijd = null)
    // en er sprake van een product is, productflow regels toevoegen aan flow
    if (addproductflow == 1) {
      let sqlinsert = `
insert into BEWERKINGFLOW
(Bewerkingsnummer,Bewerkingsoort,Volgnummer,
Bewerkingaantal, Startdatumtijd, Geprint, Plandatumtijd, Einddatumtijd)
select 
'${db.fix(bewerkingsnummer)}',
 bewerkingsoort, volgnummer,
0,null,null,null,null
from PRODUCTFLOW
where productnummer = '${db.fix(productnummer)}'
and not exists
(select 1 from BEWERKINGFLOW
where BEWERKINGFLOW.bewerkingsnummer = '${db.fix(bewerkingsnummer)}'
and BEWERKINGFLOW.bewerkingsoort = PRODUCTFLOW.bewerkingsoort)
and bewerkingsoort is not null`;
      await db.waitQuery(res.crudConnection, sqlinsert);
    }
    // Aantallen invullen
    if (bewerkingsnummer != '') {
      sql = `
        select * from BEWERKINGFLOW
where bewerkingsnummer = '${db.fix(bewerkingsnummer)}'
and bewerkingsoort is not null
and bewerkingaantal = 0
and exists
(select 1 from BEWERKINGSOORT 
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort 
and voortgang = '1')`;
      let rows = await db.waitQuery(res.crudConnection, sql);
      for (let irow = 0; irow < rows.length; irow++) {
        let row = rows[0];
        let aantal = '0';
        let sqlaantal = `
select 
sum(ifnull(bewerkingaantal,0)) as aantal 
from BEWERKINGFLOW
where bewerkingsnummer = '${db.fix(bewerkingsnummer)}'
and bewerkingsoort = '${row.BEWERKINGSOORT}'`;
        let rowsaantal = await db.waitQuery(res.crudConnection, sqlaantal);
        if (rowsaantal[0]) {
          let rowaantal = rowsaantal[0];
          aantal = rowaantal.AANTAL;
        }
        if (aantal == '') {
          aantal = '0';
        }
        let sqlupdate = `
update BEWERKINGFLOW set
bewerkingaantal = 
(select ifnull(startaantal,0) from BEWERKING
where bewerkingsnummer = '${db.fix(bewerkingsnummer)}') - ${aantal}
where id = '${db.fix(row.ID)}'`;
        await db.waitQuery(res.crudConnection, sqlupdate);
        sqlupdate = `
update BEWERKINGFLOW set
bewerkingaantal = 0
where bewerkingaantal < 0 
and id = '${db.fix(row.ID)}'`;
        await db.waitQuery(res.crudConnection, sqlupdate);
      }
    }
    // Hernummeren
    if (bewerkingsnummer != '') {
      sql = `
select * 
from BEWERKINGFLOW
where bewerkingsnummer = '${db.fix(bewerkingsnummer)}'
order by case when volgnummer = null then 999999 when volgnummer = 0 then 999999 else volgnummer end, id`;
      let volgnummer = 0;
      let rows = await db.waitQuery(res.crudConnection, sql);
      for (let irow = 0; irow < rows.length; irow++) {
        let row = rows[irow];
        volgnummer = volgnummer + 1;
        let sqlupdate = `
update BEWERKINGFLOW set
volgnummer = '${volgnummer}'
where id = '${db.fix(row.ID)}'`;
        await db.waitQuery(res.crudConnection, sqlupdate);
      }
    }
    //
    // Hier gaan we dan
    //
    sql = `
select 
id, 
Bewerkingsnummer,
Eindcontrolenummer,
(select min(bewerkingsoort) 
from BEWERKINGSOORT 
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) 
as bwksoort,
(select min(naam) 
from BEWERKINGSOORT 
where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) 
as bewerkingsoort,
(select min(kleur) 
from BEWERKINGSOORT 
where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) 
as kleur,
(select min(layout) 
from BEWERKINGSOORT 
where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) 
as layout,
(select sum(tijd) 
from BEWERKINGTIJD 
where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id) 
as besteed,
(select concat(
sum(case when aantalAfkeur is null then 0 else aantalAfkeur end),
'/',
sum(case when aantalreparatie is null then 0 else aantalreparatie end)
)
from BEWERKINGUITVAL 
where BEWERKINGUITVAL.bewerkingflowid = BEWERKINGFLOW.id) 
as registreeruitval,
(select sum(tijd) 
from BEWERKINGTIJD 
where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id) 
as registreertijd,
Volgnummer,
Bewerkingaantal,
date2screendate(startdatumtijd) as STARTDATUM,
geprint,
date2screendate(plandatumtijd) as PLANDATUM,
date2screendate(einddatumtijd) as EINDDATUM,
tekeningnummer, 
tekeningrevisie,
date2screendate(tekeningdatumtijd) as TEKENINGDATUM,
case when Uitval = 0 then null else Uitval end as Uitval
from BEWERKINGFLOW`;
    //
    // Bij lege bewerkingsnummer niets selekteren
    //
    if (where == '') {
      where += ' where ';
    } else {
      where += ' and ';
    }
    where += `
BEWERKINGFLOW.bewerkingsnummer = '${db.fix(bewerkingsnummer)}'`;
    if (bewerkingsoort != '') {
      if (where == '') {
        where += ' where ';
      } else {
        where += ' and ';
      }
      where += `
BEWERKINGFLOW.bewerkingsoort in (
select bewerkingsoort from BEWERKINGSOORT where naam = '${db.fix(bewerkingsoort)}')`;
    }
    sql += `
${where}
order by Bewerkingsnummer,volgnummer`;
    //
    let rows = await db.waitQuery(res.crudConnection, sql);
    //
    res.crudConnection.release();
    res.status(200).send(rows);
    return;
  }

  protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let id = db.getDataId(req);
    //
    res.crudConnection = await db.waitConnection();
    //
    let sql = `
update BEWERKINGFLOW set
Bewerkingsnummer ='${db.fix(req.body.BEWERKINGSNUMMER)}',
Bewerkingsoort = (select min(bewerkingsoort) from BEWERKINGSOORT
where naam ='${db.fix(req.body.BEWERKINGSOORT)}'),
Volgnummer ='${db.fix(req.body.VOLGNUMMER)}',
Bewerkingaantal ='${db.fix(req.body.BEWERKINGAANTAL)}',
startdatumtijd = screendate2date('${db.fix(req.body.STARTDATUM)}'),
Geprint ='${db.fix(req.body.GEPRINT)}',
plandatumtijd = screendate2date('${db.fix(req.body.PLANDATUM)}'),
einddatumtijd = screendate2date('${db.fix(req.body.EINDDATUM)}'),
eindcontrolenummer ='${db.fix(req.body.EINDCONTROLENUMMER)}',
tekeningnummer ='${db.fix(req.body.TEKENINGNUMMER)}',
tekeningrevisie ='${db.fix(req.body.TEKENINGREVISIE)}',
tekeningdatumtijd =screendate2date('${db.fix(req.body.TEKENINGDATUM)}'),
Uitval ='${db.fix(req.body.UITVAL)}'
where id ='${db.fix(req.body.ID)}'`;
    await db.waitQuery(res.crudConnection, sql);
    //
    await this.updateProductflow(req, res, next, req.body.BEWERKINGSNUMMER);
    //
    res.crudConnection.release();
    res.status(200).send(req.body);
    return;
  }

  protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
    //
    res.crudConnection = await db.waitConnection();
    //
    let id = db.getDataId(req);
    let sql = `
insert into BEWERKINGFLOW
(Bewerkingsnummer,Bewerkingsoort,Volgnummer,
Bewerkingaantal, Startdatumtijd, Geprint, Plandatumtijd, Einddatumtijd, Eindcontrolenummer,
tekeningnummer,tekeningrevisie,tekeningdatumtijd,Uitval)
values (
'${db.fix(req.body.BEWERKINGSNUMMER)}',
(select min(bewerkingsoort) from BEWERKINGSOORT where naam = '${db.fix(req.body.BEWERKINGSOORT)}'),
'${db.fix(req.body.VOLGNUMMER)}',
'${db.fix(req.body.BEWERKINGAANTAL)}',
screendate2date('${db.fix(req.body.STARTDATUM)}'),
'${db.fix(req.body.GEPRINT)}',
screendate2date('${db.fix(req.body.PLANDATUM)}'),
screendate2date('${db.fix(req.body.EINDDATUM)}'),
'${db.fix(req.body.EINDCONTROLENUMMER)}',
'${db.fix(req.body.TEKENINGNUMMER)}',
'${db.fix(req.body.TEKENINGREVISIE)}',
screendate2date('${db.fix(req.body.TEKENINGDATUM)}'),
'${db.fix(req.body.UITVAL)}'
)`;
    let result = await db.waitQuery(res.crudConnection, sql);
    req.body.ID = db.getInsertId(result);
    //
    await this.updateProductflow(req, res, next, req.body.BEWERKINGSNUMMER);
    //
    res.crudConnection.release();
    res.status(200).send(req.body);
    return;
  }

  protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
    //
    res.crudConnection = await db.waitConnection();
    //
    let id = db.getDataId(req);
    let bewerkingsnummer = '';
    let sql = `
select 
BEWERKINGSNUMMER from BEWERKINGFLOW
where ID = '${db.fix(id)}'`;
    let rows = await db.waitQuery(res.crudConnection, sql);
    if (rows[0]) {
      let row = rows[0];
      bewerkingsnummer = row.BEWERKINGSNUMMER;
    }
    let sqldelete = `
delete from BEWERKINGFLOW
where ID = '${db.fix(id)}'
and not exists 
(select 1 from BEWERKINGTIJD 
where BEWERKINGTIJD.bewerkingflowid = '${db.fix(id)}')
and not exists 
(select 1 from BEWERKINGUITVAL 
where BEWERKINGUITVAL.bewerkingflowid = '${db.fix(id)}')`;
    await db.waitQuery(res.crudConnection, sqldelete);
    if (bewerkingsnummer != '') {
      await this.updateProductflow(req, res, next, bewerkingsnummer);
    }
    //
    res.crudConnection.release();
    res.status(200).send(req.body);
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
