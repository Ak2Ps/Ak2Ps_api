import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import * as fs from "fs";

export class Calender {

  constructor() {
    Logger.info("Creating Calender");
  }

  protected getDatumSql(vanaf: string, tm: string): string {
    // vanaf,tm zijn YYYY-MM-DD
    let sql = '';
    sql = `
select 
selected_date as datum, 
date2screendate(selected_date) as datum_oms,
DAYOFWEEK(selected_date) as dag , 
WEEKOFYEAR(selected_date) as week from
(
select adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date
from
(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,
(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,
(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,
(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,
(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4
) v
where selected_date >= '${vanaf}'
and selected_date <= '${tm}'`;
    return sql;
  }

  protected getDagOms(dag: number): string {
    let result = '?';
    if (dag == 2) {
      result = "ma";
    } else if (dag == 3) {
      result = "di";
    } else if (dag == 4) {
      result = "wo";
    } else if (dag == 5) {
      result = "do";
    } else if (dag == 6) {
      result = "vr";
    } else if (dag == 7) {
      result = "za";
    } else if (dag == 1) {
      result = "zo";
    }
    return result;
  }

  protected async getColumns(req: Request, res: Response, next: NextFunction, options?: Dict) {
    //
    let sql: string;
    let result = '';
    let header = '';
    let field = '';
    let row: any;
    //
    let vanaf = String(req.query.vanaf || "2000-01-01");
    let tm = String(req.query.tm || "2999-12-31");
    //
    res.crudConnection = await db.waitConnection();
    //
    sql = this.getDatumSql(vanaf, tm);
    let rows = await db.waitQuery(res.crudConnection, sql);
    result += '[';
    result += "{";
    header = "GEBRUIKER";
    result += `"HEADER": "${header}"`;
    field = "GEBRUIKER";
    result += `,"FIELD":"${field}"`;
    result += "}";
    for (let irow = 0; irow < rows.length; irow++) {
      row = rows[irow];
      result += ",{";
      header = this.getDagOms(row.DAG) + ' ' + row.DATUM_OMS;
      result += `"HEADER":"${header}"`;
      field = "COLUMN_" + row.DATUM + "_DATUM";
      result += `,"FIELD":"${field}"`;
      result += "}";
      result += ",{";
      header = "TOTTIJD";
      result += `"HEADER":"${header}"`;
      field = "COLUMN_" + row.DATUM + "_TOTTIJD";
      result += `,"FIELD":"${field}"`;
      result += "}";
      result += ",{";
      header = this.getDagOms(row.DAG) + ' ' + row.DATUM_OMS;
      result += `"HEADER":"${header}"`;
      field = "COLUMN_" + row.DATUM + "_DAG";
      result += `,"FIELD":"${field}"`;
      result += "}";
      if (row.DAG == 1) {
        header = "Week";
        result += `,{"HEADER":"${header}"`;
        field = "COLUMN_" + row.DATUM + "_DATUM_WEEK";
        result += `,"FIELD":"${field}"`;
        result += "}";
        result += ",{";
        header = "TOTTIJD";
        result += `"HEADER":"${header}"`;
        field = "COLUMN_" + row.DATUM + "_TOTTIJD_WEEK";
        result += `,"FIELD":"${field}"`;
        result += "}";
        result += ",{";
        header = "Week " + row.WEEK;
        result += `"HEADER":"${header}"`;
        field = "COLUMN_" + row.DATUM + "_DAG_WEEK";
        result += `,"FIELD":"${field}"`;
        result += "}";
      }
    }
    result += ']';
    let jsonresult: any = [];
    try {
      jsonresult = JSON.parse(result);
    } catch (error) {
      Logger.error(req,error);
      Logger.error(req,result);
      jsonresult = [];
    }
    //
    //
    res.crudConnection.release();
    res.status(200).send(jsonresult);
    return;
  }

  protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
    //
    let sql: string;
    let sqldatum: string;
    let row: any;
    let result = '';
    let tottijd = 0;
    let swfirstrow = 0;
    let wigebruiker = '';
    let key = "";
    let val = '';
    let inuittijd = 0;
    let bontijd = 0;
    let plantijd = 0;
    let pauzetijd = 0;
    let column = '';
    //
    // 2000-01-01
    // 0123456789
    //
    let vanaf = String(req.query.vanaf || "2000-01-01");
    let tm = String(req.query.tm || "2999-12-31");
    //
    let gebruiker = req.query.gebruiker || "";
    let afdeling = req.query.afdeling || "";
    //
    res.crudConnection = await db.waitConnection();
    //
    sqldatum = this.getDatumSql(vanaf, tm);
    //
    sql = `
select
gebruiker,
datum,
dayofweek(datum) as dagnummer,
weekofyear(datum) as weeknummer,
sum(inuittijd) as inuittijd,
sum(bontijd) as bontijd,
sum(plantijd) as plantijd,
sum(pauzetijd) as pauzetijd,
concat('<table class="caldata_table">',
group_concat(
case
when soort = 'TIJD' then 
case when productnummer = 'in' OR productnummer = 'uit' then
concat('<tr class="caldata_tr">',
'<td class="caldata_type">inuit</td>',
'<td class="caldata_start">', start,'-', eind,'</td>',
'<td class="caldata_tijd"> (', inuittijd, ')</td></tr>')
else
concat('<tr class="caldata_tr">',
'<td  class="caldata_type">bon</td>',
'<td class="caldata_start">', start,'-', eind, ' </td>',
'<td class="caldata_tijd">(', bontijd, ')</td>',
'<td class="caldata_productnummer">', productnummer, '</td>',
'<td class="caldata_bon">' , bewerkingsnummer, '-', bewerkingsoort, '</td></tr>')
end
when soort = 'DATUM' then
''
when soort = 'PLAN' then
concat('<tr class="caldata_tr">',
'<td class="caldata_type">plan</td>',
'<td class="caldata_start">', start,'-', eind,'</td>',
'<td class="caldata_tijd">(', plantijd, '-' , pauzetijd, ')',
'<td class="caldata_productnummer">', productnummer, '</td>',
'</td></tr>')
end
order by start asc, eind asc, bewerkingsnummer
separator ''
),
'</table>')
as dag
from
(select
'DATUM' as soort,
b.gebruiker,
a.datum,
'' as start,
'' as eind,
'' as bewerkingsnummer,
'' as productnummer,
'' as bewerkingsoort,
0 as inuittijd,
0 as bontijd,
0 as plantijd,
0 as pauzetijd
from
(${sqldatum}) a,
gebruiker b
where b.aktief = 1`;
    //
    if (afdeling != '') {
      sql += `
and b.afdeling = '${afdeling}'`;
    }
    if (gebruiker != '') {
      sql += `
and b.gebruiker = '${gebruiker}'`;
    }
    //
    // gebruikertijd
    //
    sql += `
union
select
'TIJD' as soort,
c.gebruiker,
date(c.startdatumtijd) as datum,
date2screentime(c.startdatumtijd) as start,
date2screentime(c.einddatumtijd) as eind,
c.bewerkingsnummer,
c.productnummer,
(select max(bs.afkorting) from bewerkingflow bf, bewerkingsoort bs
where c.bewerkingflowid = bf.id
and bf.bewerkingsoort = bs.bewerkingsoort) as bewerkingsoort,
case when productnummer = 'in' OR productnummer = 'uit' then c.tijd else 0 end as inuittijd,
case when productnummer != 'in' AND productnummer != 'uit' then c.tijd else 0 end as bontijd,
0 as plantijd,
0 as pauzetijd
from bewerkingtijd c FORCE INDEX(BEWERKINGTIJD_I4),
gebruiker d
where d.gebruiker = c.gebruiker
and c.startdatumtijd >=  STR_TO_DATE('${vanaf}','%Y-%m-%d')
and c.startdatumtijd <= STR_TO_DATE('${tm + " " + "23:59"}','%Y-%m-%d %H:%i')
and d.aktief = 1`;
    if (afdeling != '') {
      sql += `
and d.afdeling = '${afdeling}'`;
    }
    if (gebruiker != '') {
      sql += `
and d.gebruiker = '${gebruiker}'`;
    }
    //
    // gebruikerplan
    //
    sql += `
union
select
'PLAN' as soort,
p.gebruiker,
date(p.startdatumtijd) as datum,
date2screentime(p.startdatumtijd) as start,
date2screentime(p.einddatumtijd) as eind,
0 as bewerkingsnummer,
ifnull(p.plansoort, '') as productnummer,
'' as bewerkingsoort,
0 as inuittijd,
0 as bontijd,
p.tijd as plantijd,
p.pauze as pauzetijd
from gebruikerplan p,
gebruiker e
where p.gebruiker = e.gebruiker
and p.startdatumtijd >=  STR_TO_DATE('${vanaf}','%Y-%m-%d')
and p.startdatumtijd <= STR_TO_DATE('${tm + " " + "23:59"}','%Y-%m-%d %H:%i')
and e.aktief = 1`;
    if (afdeling != '') {
      sql += `
and e.afdeling = '${afdeling}'`;
    }
    if (gebruiker != '') {
      sql += `
and e.gebruiker = '${gebruiker}'`;
    }
    //
    //
    //
    sql += `
    ) base `;
    //
    sql += `
group by gebruiker, datum
order by gebruiker, datum`;
    //
    let rows = await db.waitQuery(res.crudConnection, sql);
    //
    tottijd = 0;
    swfirstrow = 1;
    wigebruiker = '---';
    result += '[';
    for (let irow = 0; irow < rows.length; irow++) {
      row = rows[irow];
      if (row.GEBRUIKER != wigebruiker) {
        wigebruiker = row.GEBRUIKER;
        if (swfirstrow == 1) {
          swfirstrow = 0;
          result += "\n";
        } else {
          result += "},\n";
        }
        result += '    {';
        //
        key = "GEBRUIKER";
        val = wigebruiker;
        if (val == '') {
          val = '??';
        }
        //
        result += `"${key}":${JSON.stringify(val)}`;
        //
        tottijd = 0;
        inuittijd = 0;
        bontijd = 0;
        plantijd = 0;
        pauzetijd = 0;
      }
      //
      inuittijd += Number(row.INUITTIJD);
      bontijd += Number(row.BONTIJD);
      plantijd += Number(row.PLANTIJD);
      pauzetijd += Number(row.PAUZETIJD);
      tottijd = inuittijd + bontijd + plantijd + pauzetijd;
      //
      for (key in row) {
        val = row[key];
        if (val == '') {
          val = '??';
        }
        if (key == "GEBRUIKER") {
        } else {
          if (key == "DATUM") {
            column = "COLUMN_" + val;
          }
          result += ',';
          key = column + "_" + key;
          result += `"${key}":${JSON.stringify(val)}`;
        }
      }
      if (Number(row.DAGNUMMER) == 1) {
        //
        // weekregel tussenvoegen voor de maandag
        result += ',';
        key = column + "_DAG_WEEK";
        //
        if (tottijd == 0) {
          val = '  ';
        } else {
          val = "<table>";
          val += "<tr><td>inuit</td><td> " + Util.MakeHHMM(inuittijd) + "</td><td>(" + inuittijd + ")</td></tr>";
          val += "<tr><td>bon</td><td> " + Util.MakeHHMM(bontijd) + "</td><td>(" + bontijd + ")</td></tr>";
          val += "<tr><td>plan</td><td> " + Util.MakeHHMM(plantijd) + "</td><td>(" + plantijd + ")</td></tr>";
          val += "<tr><td>pauze</td><td> " + Util.MakeHHMM(pauzetijd) + "</td><td>(" + pauzetijd + ")</td></tr>";
          val += "</table>";
        }
        if (val == '') {
          val = '"??"';
        }
        result += `"${key}":${JSON.stringify(val)}`;
        tottijd = 0;
        inuittijd = 0;
        bontijd = 0;
        plantijd = 0;
        pauzetijd = 0;
      }
    }
    if (swfirstrow != 1) {
      result += '}';
    }
    result += "\n]\n";
    //
    let jsonresult: any = [];
    try {
      jsonresult = JSON.parse(result);
    } catch (error) {
      Logger.error(req,error);
      Logger.error(req,result);
    }
    res.crudConnection.release();
    res.status(200).send(jsonresult);
    return;
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    Logger.test(`toolbox: ${method}, ${action}`);
    //
    if (action == "getColumns") {
      this.getColumns(req, res, next);
    } else if (method == "GET") {
      this.doQuery(req, res, next)
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
