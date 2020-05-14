import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import * as types from "../util";

export class Gebruiker {
  constructor() {
    Logger.info("Creating Gebruiker");
  }

  private getQuery(where: string, orderby: string): string {
    if (!orderby) {
      orderby = "ucase(GEBRUIKER)";
    }
    //
    let sql = `
select 
cast(id as CHAR) as ID,
gebruiker as GEBRUIKER,
menu as MENU,
telefoon as TELEFOON,
email as EMAIL,
contactpersoon as CONTACTPERSOON,
land as LAND,
woonplaats as WOONPLAATS,
adres as ADRES,
naam as NAAM,
handtekening as HANDTEKENING,
aktief as AKTIEF,
ifnull(afdeling,'') as AFDELING,
'' as HANDTEKENING_OMS,
ifnull(badge1,'') as BADGE1,
ifnull(badge2,'') as BADGE2,
ifnull((select naam from AFDELING where AFDELING.AFDELING = GEBRUIKER.AFDELING),'') as AFDELING_OMS
from GEBRUIKER
where gebruiker not in ('Admin','Gast','Mod')`;
    if (where) {
      sql += ` and ${where}`;
    }
    sql += ` order by ${orderby};`;
    return sql;
  }

  private getSelectQuery(value: string): string {
    let sql = `
select 
gebruiker as ID,
naam as VALUE 
from GEBRUIKER
where gebruiker not in ('Admin','Gast','Mod')
and aktief = 1`;
    if (value) {
      sql += ` and ucase(naam) like '${value}'`;
    }
    sql += ` order by ucase(naam);`;
    return sql;
  }

  private getMyInfoQuery(user: string): string {
    let sql = `
select 
gebruiker as GEBRUIKER,
menu as MENU,
telefoon as TELEFOON,
email as EMAIL,
contactpersoon as CONTACTPERSOON,
land as LAND,
woonplaats as WOONPLAATS,
adres as ADRES,
naam as NAAM,
handtekening as HANDTEKENING,
'' as HANDTEKENING_OMS,
(select naam from AFDELING where AFDELING.AFDELING = GEBRUIKER.AFDELING) as AFDELING_OMS
from GEBRUIKER
where ucase(gebruiker) = ucase('${user}');`;
    return sql;
  }

  private getKaartjeQuery(gebruiker: string): string {
    let sql = `
select 
NAAM,
GEBRUIKER 
from GEBRUIKER 
where ucase(gebruiker) = ucase('${gebruiker}');`;
    return sql;
  }

  private getKaartjedataQuery(gebruiker: string): string {
    let sql = `
select 
NAAM,
GEBRUIKER,
"???"as BARCODE 
from GEBRUIKER 
where ucase(gebruiker) = ucase('${gebruiker}');`;
    return sql;
  }

  private getInsert(params: any): string {
    let sql = `
insert into GEBRUIKER
(menu,telefoon,email,contactpersoon,
land,woonplaats,adres,
naam,handtekening,gebruiker,aktief,badge1,badge2)
values (
'${db.fix(params.MENU)}',
'${db.fix(params.TELEFOON)}',
'${db.fix(params.EMAIL)}',
'${db.fix(params.CONTACTPERSOON)}',
'${db.fix(params.LAND)}',
'${db.fix(params.WOONPLAATS)}',
'${db.fix(params.ADRES)}',
'${db.fix(params.NAAM)}',
'${db.fix(params.HANDTEKENING)}',
'${db.fix(params.GEBRUIKER)}',
'${db.fix(params.AKTIEF)}',
'${db.fix(params.BADGE1)}',
'${db.fix(params.BADGE2)}'
);
select last_insert_id() as last_id;`;
    return sql;
  }

  private getUpdate(params: any): string {
    let sql = `
update GEBRUIKER set
menu = '${db.fix(params.MENU)}',
telefoon = '${db.fix(params.TELEFOON)}',
email = '${db.fix(params.EMAIL)}',
contactpersoon = '${db.fix(params.CONTACTPERSOON)}',
land = '${db.fix(params.LAND)}',
woonplaats = '${db.fix(params.WOONPLAATS)}',
adres = '${db.fix(params.ADRES)}',
naam = '${db.fix(params.NAAM)}',
handtekening = '${db.fix(params.HANDTEKENING)}',
gebruiker = '${db.fix(params.GEBRUIKER)}',
afdeling = (select min(afdeling) from AFDELING where naam = '${db.fix(params.AFDELING_OMS)}'),
aktief = '${db.fix(params.AKTIEF)}',
badge1 = '${db.fix(params.BADGE1)}',
badge2 = '${db.fix(params.BADGE2)}'
where id = ${db.fix(params.ID)};`;
    return sql;
  }

  private getDelete(Id: string): string {
    let sql = `
delete from GEBRUIKER
where id = ${Id};`;
    return sql;
  }

  private getMyInfoUpdate(params: any): string {
    let sql = `
update GEBRUIKER set
email =  '${db.fix(params.email)}',
woonplaats =  '${db.fix(params.woonplaats)}',
adres = '${db.fix(params.adres)}',
naam =  '${db.fix(params.naam)}'
where ucase(gebruiker) = ucase('${db.fix(params.gebruiker)}');`;
    return sql;
  }

  private getMyPasswordUpdate(params: any): string {
    let sql = `
update GEBRUIKER set
wachtwoord =  '${db.fix(params.wachtwoord)}'
where ucase(gebruiker) = ucase('${db.fix(params.gebruiker)}');`;
    return sql;
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    let value = db
      .fix(req.query.value)
      .toUpperCase()
      .replace(/\*/gi, "%");
    Logger.test(`Gebruiker: ${method}, ${action}, ${value}`);
    //
    if (method == "GET") {
      //
      if (action == "select") {
        let connection = await db.waitConnection();
        let sql = this.getSelectQuery(value);
        let rows = await db.waitQuery(connection, sql);
        connection.release();
        res.status(200).send(rows);
        return;
      } else if (action == "getall") {
        let connection = await db.waitConnection();
        let sql = this.getQuery("", "");
        let rows = await db.waitQuery(connection,sql);
        connection.release();
        res.status(200).send(rows);
        return;
      } else {
        let connection = await db.waitConnection();
        let sql = this.getQuery("Aktief = 1", "");
        let rows = await db.waitQuery(connection, sql);
        connection.release();
        res.status(200).send(rows);
        return;
      }
    } else if (method == "PUT") {
      let connection = await db.waitConnection();
      let sql = this.getUpdate(req.body);
      let rows = await db.waitQuery(connection, sql);
      let where = `ID = ${db.fix(req.body.ID)} `;
      sql = this.getQuery(where, "");
      rows = await db.waitQuery(connection, sql);
      connection.release();
      res.status(200).send(rows);
      return;
    } else if (method == "POST") {
      if (action == "getmyinfo") {
        let connection = await db.waitConnection();
        let sql = this.getMyInfoQuery(db.fix(req.ak2_user));
        let rows = await db.waitQuery(connection, sql);
        connection.release();
        res.status(200).send(rows);
        return;
      } else if (action == "setmyinfo") {
        req.body.gebruiker = req.ak2_user;
        if (req.body.wachtwoord != req.body.herhaalwachtwoord) {
          res.status(200).send(`[{"msg":"Wachtwoorden komen niet overeen"}]`);
          return;
        }
        let connection = await db.waitConnection();
        let sql = this.getMyInfoUpdate(req.body);
        let rows = await db.waitQuery(connection, sql);
        if (req.body.wachtwoord) {
          sql = this.getMyPasswordUpdate(db.fix(req.body.gebruiker));
          let rows = await db.waitQuery(connection, sql);
          connection.release();
          res.status(200).send(`[{}]`);
          return;
        } else {
          connection.release();
          res.status(200).send(`[{}]`);
        }
        return;
      } else if (action == "kaartje") {
        let connection = await db.waitConnection();
        let sql = this.getKaartjeQuery(String(req.query.gebruiker));
        let rows = await db.waitQuery(connection, sql);
        connection.release();
        let result = `<table><tr>
<td>${rows[0].NAAM}</td>
</tr></table><br>
<table><tr>
<td id="b_barcode"></td>
</tr></table><br>
`;
        res.status(200).send(result);
        return;
      } else if (action == "kaartjedata") {
        let connection = await db.waitConnection();
        let sql = this.getKaartjedataQuery(String(req.query.gebruiker));
        let rows = await db.waitQuery(connection, sql);
        connection.release();
        res.status(200).send(rows);
        return;
      } else {
        let connection = await db.waitConnection();
        let sql = this.getInsert(req.body);
        let rows = await db.waitQuery(connection, sql);
        let last_id = rows[1][0].last_id;
        let where = `ID = ${last_id} `;
        sql = this.getQuery(where, "");
        rows = await db.waitQuery(connection, sql);
        connection.release();
        res.status(200).send(rows);
        return;
      }
    } else if (method == "DELETE") {
      let connection = await db.waitConnection();
      let sql = this.getDelete(db.getDataId(req));
      let rows = await db.waitQuery(connection, sql);
      connection.release();
      res.status(200).send(`[{}]`);
      return;
    }
    Util.unknownOperation(req, res, next);
  }
}
