import { Crud } from '../crud';

import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import { stringify } from 'querystring';


const dict: Dict = {
  table: "RETOUR",
  key: [
    {
      body: "REFERENTIE",
      sql: "REFERENTIE",
    }
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "ucase(REFERENTIE)",
    where: [
      {
        query: "value",
        sql: "ucase(REFERENTIE) like '%?%'",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "REFERENTIE as ID"
      },
      {
        row: "VALUE",
        sql: "REFERENTIE AS VALUE"
      }
    ],
  },
  query: {
    orderby: "RETOUR",
    where: [
      {
        query: "id",
        sql: "ID = ?",
      },
      {
        query: "referentie",
        sql: "REFERENTIE like ('%?%')",
      },
      {
        query: "klantreferentie",
        sql: "KLANTREFERENTIE like ('%?%')",
      },
      {
        query: "klantnummer",
        sql: "KLANTNUMMER = '?'",
      },
      {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
      },
    ],
  },
}

export class Retour extends Crud {
  constructor() {
    super(
      dict
    )
  }

  private async setGereed(referentie: string) {
    let connection = await db.waitConnection();
    let sql = `
update RETOUR set
gereeddatumtijd = 
(select case
when exists(select 1 from RETOURACTIE 
where gereeddatumtijd is NULL 
and referentie = '${db.fix(referentie)}')
then null
else
(select max(gereeddatumtijd) from RETOURACTIE 
where referentie = '${db.fix(referentie)}')
end)
where referentie = '${db.fix(referentie)}';`;
    await db.waitQuery(connection, sql);
    connection.release();
  }

  private async getReferentieLeverancier(req: Request, res: Response, next: NextFunction) {
    let referentie = req.query.referentie;
    let sql = `
select 
RETOURPRODUCT.referentie as REFERENTIE,
RETOURPRODUCT.productnummer as PRODUCTNUMMER,
PRODUCT.leveranciernummer as LEVERANCIERNUMMER
from
(RETOURPRODUCT left join PRODUCT on RETOURPRODUCT.productnummer = PRODUCT.productnummer)
left join LEVERANCIER on PRODUCT.leveranciernummer = LEVERANCIER.leveranciernummer
where RETOURPRODUCT.referentie  = '${referentie}'
order by PRODUCT.leveranciernummer, RETOURPRODUCT.productnummer;`;
    //
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    res.status(200).send(rows);
    return;
  }

  protected createQuerySql(req: Request, res: Response, next: NextFunction, options?: Dict): string {
    //
    let sql = `
 select
 cast(Id as CHAR) as ID
 ,ifnull(Referentie,'') as REFERENTIE
 ,ifnull(Klantreferentie,'') as KLANTREFERENTIE
 ,date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD
 ,date2jsondate(GEREEDDATUMTIJD) as GEREEDDATUMTIJD
 ,ifnull(Gebruiker,'') as GEBRUIKER
 ,ifnull(Type,'') as TYPE
 ,ifnull(Termijn,'') as TERMIJN
 ,ifnull(Prijsopgave,'') as PRIJSOPGAVE
 ,ifnull(Garantie,'') as GARANTIE
 ,ifnull(Kosten,'') as KOSTEN
 ,ifnull(Opmerking,'') as OPMERKING
 ,ifnull(Status,'') as STATUS
 ,ifnull(START,'') as START
 ,ifnull(GEREED,'') as GEREED
 ,ifnull(cast(DUUR as char),'') as DUUR
 ,ifnull(cast(\`OVER\` as char),'') as \`OVER\`
 ,ifnull(KOSTEN_DESC,'') as KOSTEN_DESC
 ,ifnull(GARANTIE_DESC,'') as GARANTIE_DESC
 ,ifnull(TYPE_DESC,'') as TYPE_DESC
 ,ifnull(TERMIJN_DESC,'') as TERMIJN_DESC
 ,ifnull(PRIJSOPGAVE_DESC,'') as PRIJSOPGAVE_DESC
 ,ifnull(KLANT,'') as KLANT
 ,ifnull(KLANTNUMMER,'') as KLANTNUMMER
 ,case when producten <= 1 then ifnull(productnummer,'')
 else '...'
 end as PRODUCTNUMMER
 ,ifnull(AANTAL,'') as AANTAL
 ,ifnull(PRODUCTEN,'') as PRODUCTEN
 ,case when acties <= 1 then ifnull(actie,'')
 else '...'
 end as ACTIE
 ,ifnull(ACTIES,'') as ACTIES
 from (select *,
 date2screendate(startdatumtijd) as START,
 date2screendate(gereeddatumtijd) as GEREED,
 datediff(ifnull(gereeddatumtijd,sysdate()),startdatumtijd) as DUUR,
 cast(termijn as signed) - datediff(ifnull(gereeddatumtijd,sysdate()),startdatumtijd) as \`OVER\`,
 format(kosten,2) as KOSTEN_DESC,
 (select naam from RETOURGARANTIE where RETOUR.garantie = RETOURGARANTIE.garantie) as GARANTIE_DESC,
 (select naam from RETOURTYPE where RETOUR.type = RETOURTYPE.retourtype) as TYPE_DESC,
 (select naam from RETOURTERMIJN where RETOUR.termijn = RETOURTERMIJN.retourtermijn) as TERMIJN_DESC,
 (select case when RETOUR.prijsopgave = \'1\' then \'Ja\' else \'Nee\' end from DUAL) as PRIJSOPGAVE_DESC,
 (select min(zoekcode) from RETOURKLANT where RETOUR.referentie = RETOURKLANT.referentie) as KLANT,
 (select min(klantnummer) from RETOURKLANT where RETOUR.referentie = RETOURKLANT.referentie) as KLANTNUMMER,
 (select min(productnummer) from RETOURPRODUCT where RETOUR.referentie = RETOURPRODUCT.referentie) as PRODUCTNUMMER,
 (select sum(aantal) from RETOURPRODUCT where RETOUR.referentie = RETOURPRODUCT.referentie) as AANTAL,
 (select count(distinct productnummer) from RETOURPRODUCT where RETOUR.referentie = RETOURPRODUCT.referentie) as producten,
 (select min(RETOURACTIETYPE.naam) from RETOURACTIE,RETOURACTIETYPE where RETOURACTIE.actie = RETOURACTIETYPE.actie and RETOUR.referentie = RETOURACTIE.referentie) as ACTIE,
 (select count(*) from RETOURACTIE where RETOUR.referentie = RETOURACTIE.referentie) as acties
 from RETOUR) BASE `;
    let where = this.addWhere(req, res, next, dict?.query?.where);
    if (req.query.open == "Nee") {
      if (where == '') {
        where += " where";
      } else {
        where += " and";
      }
      where += ` not isnull(gereeddatumtijd)`;
    }
    if (req.query.open == "Ja") {
      if (where == '') {
        where += " where";
      } else {
        where += " and";
      }
      where += ` isnull(gereeddatumtijd)`;
    }
    if (req.query.datum) {
      if (where == '') {
        where += " where";
      } else {
        where += " and";
      }
      where += ` gereeddatumtijd >= screendate2date('${req.query.datum}')`;
    }
    sql += `${where}`;
    sql += ` order by referentie,startdatumtijd`;
    //
    return sql;
  }

  protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
    // PUT
    res.crudConnection = await db.waitConnection();
    //
    let id = db.getDataId(req);
    let sql: string;
    let rows: any;
    let oldref: string;
    let newref: string;
    let result: any;
    let prijsopgave: string;
    // als referentie wijzigt
    // dan ook : 
    // update RETOURKLANT set referentie = $new where referentie = $old
    // update RETOURPRODUCT set referentie = $new where referentie = $old
    // update RETOURACTIE set referentie = $new where referentie = $old
    // wat was het oude nummer
    sql = `select referentie from RETOUR where id = ${id}`;
    rows = await db.waitQuery(res.crudConnection, sql);
    if (rows[0]) {
      oldref = db.fix(rows[0].REFERENTIE);
      newref = db.fix(req.body.REFERENTIE);
      if (oldref != newref) {
        sql = `
update RETOURKLANT set
referentie =  '${newref}'
where referentie = '${oldref}'`;
        result = await db.waitQuery(res.crudConnection, sql);
        sql = `
update RETOURPRODUCT set
referentie =  '${newref}'
where referentie = '${oldref}'`;
        result = await db.waitQuery(res.crudConnection, sql);
        sql = `
update RETOURACTIE set
referentie =  '${newref}'
where referentie = '${oldref}'`;
        result = await db.waitQuery(res.crudConnection, sql);
      }
    }
    prijsopgave = String(req.body.PRIJSOPGAVE_DESC);
    prijsopgave = prijsopgave.toUpperCase();
    prijsopgave = prijsopgave.substr(0, 1);
    if (prijsopgave == 'J') {
      prijsopgave = '1';
    } else {
      prijsopgave = '0';
    }
    sql = `
update RETOUR set
referentie = '${db.fix(req.body.REFERENTIE)}',
klantreferentie = '${db.fix(req.body.KLANTREFERENTIE)}',
Startdatumtijd = screendate2date('${db.fix(req.body.START)}'),
Gereeddatumtijd = screendate2date('${db.fix(req.body.GEREED)}'),
Garantie = (select min(garantie) from RETOURGARANTIE where upper(naam) like  upper('${db.fix(req.body.GARANTIE_DESC)}%')),
kosten = '${db.fix(req.body.KOSTEN_DESC)}',
Type = (select min(retourtype) from RETOURTYPE where upper(naam) like  upper('${db.fix(req.body.TYPE_DESC)}%')),
Termijn = (select min(retourtermijn) from RETOURTERMIJN where upper(naam) like  upper('${db.fix(req.body.TERMIJN_DESC)}%')),
Prijsopgave = '${prijsopgave}'
where id = '${db.fix(id)}'`;
    result = await db.waitQuery(res.crudConnection, sql);
    sql = `
update RETOUR set
Gebruiker =  '${db.fix(req.ak2_user)}'
where id = '${db.fix(id)}'
and gebruiker = ''` ;
    result = await db.waitQuery(res.crudConnection, sql);
    //
    await this.setGereed(req.body.REFERENTIE);
    //
    res.crudConnection.release();
    res.status(200).send(req.body);
    return;
  }

  protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
    // POST
    let result: any;
    let prijsopgave: string;
    let jaar: string;
    let voorvoegsel: string;
    let newref: string;
    let sql: string;
    let rows: any;
    res.crudConnection = await db.waitConnection();
    //
    let id = db.getDataId(req);

    prijsopgave = String(req.body.PRIJSOPGAVE_DESC);
    prijsopgave = prijsopgave.toUpperCase();
    prijsopgave = prijsopgave.substr(0, 1);
    if (prijsopgave == 'J') {
      prijsopgave = '1';
    } else {
      prijsopgave = '0';
    }
    jaar = String(req.body.START);
    // dd-mm-yyyy
    // 0123456789
    jaar = jaar.substr(6, 4);
    // TRV_JJJJ_0000
    // 0123456789012
    voorvoegsel = req.ak2_app;
    newref = jaar + '_0000';
    sql = `
select max(referentie) as REF 
from RETOUR 
where referentie like 'TR${voorvoegsel}_${jaar}_%'`;
    rows = await db.waitQuery(res.crudConnection, sql);
    if (rows[0]) {
      let vlnr = Number(String(rows[0].REF).substr(9));
      vlnr += 1;
      let strVlnr: string = String(vlnr);
      while (strVlnr.length < 4) {
        strVlnr = '0' + strVlnr;
      }
      newref = 'TR' + voorvoegsel + "_" + jaar + '_' + strVlnr;
    }
    sql = `
insert into RETOUR
(referentie,klantreferentie,startdatumtijd,gereeddatumtijd,gebruiker,
kosten,garantie,type,termijn,prijsopgave)
values (
'${newref}',
'${db.fix(req.body.KLANTREFERENTIE)}',
screendate2date('${db.fix(req.body.START)}'),
screendate2date('${db.fix(req.body.GEREED)}'),
'${db.fix(req.ak2_user)}',
'${db.fix(req.query.KOSTEN_DESC)}',
(select min(garantie) from RETOURGARANTIE where upper(naam) like  upper('${db.fix(req.body.GARANTIE_DESC)}%')),
(select min(retourtype) from RETOURTYPE where upper(naam) like  upper('${db.fix(req.body.TYPE_DESC)}%')),
(select min(retourtermijn) from RETOURTERMIJN where upper(naam) like  upper('${db.fix(req.body.TERMIJN_DESC)}%')),
Prijsopgave = '${prijsopgave}')`;
    rows = await db.waitQuery(res.crudConnection, sql);
    req.body.ID = rows.insertId;
    req.body.REFERENTIE = newref;
    req.body.GEBRUIKER = req.ak2_user;
    //
    res.crudConnection.release();
    res.status(200).send(req.body);
    return;
  }

  protected async doAfterDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let result = true;
    let id = db.fix(db.getDataId(req));
    let sql = `select REFERENTIE from RETOUR where id  = ${id}`;
    let rows = await db.waitQuery(res.crudConnection, sql);
    if (rows[0]) {
      let old = rows[0].REFERENTIE;
      sql = `delete from RETOURKLANT where referentie = '${old}'`;
      rows = await db.waitQuery(res.crudConnection, sql);
      sql = `delete from RETOURPRODUCT where referentie = '${old}'`;
      rows = await db.waitQuery(res.crudConnection, sql);
      sql = `delete from RETOURACTIE where referentie = '${old}'`;
      rows = await db.waitQuery(res.crudConnection, sql);
    }
    return (result);
  }


  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    //
    Logger.request(req);
    //
    if (action == "select") {
      this.doSelect(req, res, next, this.dict);
    } else if (method == "GET") {
      if (action == 'getreferentieleverancier') {
        this.getReferentieLeverancier(req, res, next);
      } else {
        this.doQuery(req, res, next, this.dict);
      }
    } else if (method == "PUT") {
      this.doUpdate(req, res, next, this.dict);
    } else if (method == "PUT" || method == "POST") {
      this.doInsert(req, res, next, this.dict);
    } else if (method == "DELETE") {
      this.doDelete(req, res, next, this.dict);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }

}
