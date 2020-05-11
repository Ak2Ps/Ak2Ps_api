import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import { Mailer } from "../mailer";
import * as fs from "fs";
import pdf from "html-pdf"
import { Config } from "../config";
import { Klok } from "../klok"
import * as child from 'child_process';

export class Toolbox {
  mailer: Mailer;
  constructor() {
    this.mailer = new Mailer();
    Logger.info("Creating Toolbox");
  }

  private async getBewerking(req: Request, res: Response, next: NextFunction) {
    let bewerkingsnummer = req.query.bewerkingsnummer || req.body.bewerkingsnummer;
    let sql: string;
    let result: any;
    let rows: any;
    let row: any;
    let msg = '';
    let connection = await db.waitConnection();
    sql = `
  select BEWERKING.*,
  (select min(Productnaam) as PRODUCTNAAM from PRODUCT where PRODUCT.productnummer = BEWERKING.productnummer) as Productnaam,
  (select sum(ifnull(uitval,0)) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) as aantaluitval
  from BEWERKING
  where BEWERKING.bewerkingsnummer = '${bewerkingsnummer}'`;
    rows = await db.waitQuery(connection, sql);
    if (!rows[0]) {
      msg = 'Productienummer onbekend';
      result = {
        items: [
          {
            msg: msg,
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            BEWERKINGSNUMMER: "",
            PRODUCTIEAANTAL: "",
            STARTAANTAL: "",
            AANTALUITVAL: '',
            PRODUCTNUMMER: '',
            PRODUCTNAAM: '',
            OPMERKING: '',
            REPARATIE: '',
            EINDCONTROLENUMMER: ''
          }
        ]
      };
      connection.release();
      res.status(200).send(result);
      return;
    }
    row = rows[0];
    //
    let reparatie = '';
    let sqlrep = `
select NAAM 
from BEWERKINGSOORT 
where REPARATIE = '1' 
order by BEWERKINGSOORT`;
    let rowsrep = await db.waitQuery(connection, sqlrep);
    if (rowsrep[0]) {
      reparatie = rowsrep[0].NAAM;
    }
    result = {
      items: [
        {
          msg: msg,
          GEBRUIKER: req.ak2_user,
          GEBRUIKERNAAM: req.ak2_user,
          BEWERKINGSNUMMER: row.BEWERKINGSNUMMER,
          PRODUCTIEAANTAL: row.PRODUCTIEAANTAL,
          STARTAANTAL: row.STARTAANTAL,
          AANTALUITVAL: row.AANTALUITVAL,
          PRODUCTNUMMER: row.PRODUCTNUMMER,
          PRODUCTNAAM: row.PRODUCTNAAM,
          OPMERKING: row.OPMERKING,
          REPARATIE: reparatie,
          EINDCONTROLENUMMER: row.EINDCONTROLENUMMER
        }
      ]
    }
    connection.release();
    res.status(200).send(result);
    return;
  }

  private async getVraag(req: Request, res: Response, next: NextFunction) {
    let ordernummer = req.query.ordernummer || req.body.ordernummer;
    let sql = `
select 
ifnull(ORDERNUMMER,'') as ORDERNUMMER,
ifnull(OPMERKING,'') as OPMERKING,
ifnull(OPMERKING2,'') as OPMERKING2
FROM VRAAG
WHERE ORDERNUMMER = '${ordernummer}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result: any = {};
    if (rows.length <= 0) {
      result = {
        items: [
          {
            msg: "Ordernummer onbekend",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            ORDERNUMMER: ordernummer,
            OPMERKING: "",
            OPMERKING2: ""
          }
        ]
      };
    } else {
      result = {
        items: [
          {
            msg: "",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            ORDERNUMMER: ordernummer,
            OPMERKING: rows[0].OPMERKING,
            OPMERKING2: rows[0].OPMERKING2
          }
        ]
      };
    }
    res.status(200).send(result);
    return;
  }

  private async getVraagProduct(req: Request, res: Response, next: NextFunction) {
    let ordernummer = "";
    let productnummer = "";
    let id = req.query.id || req.body.id;
    try {
      ordernummer = String(id).split("_")[0];
      productnummer = String(id).split("_")[1];
    } catch (error) {

    }
    let sql = `
select 
ifnull(ORDERNUMMER,'') as ORDERNUMMER,
ifnull(OPMERKING,'') as OPMERKING
FROM PRODUCTVRAAG
WHERE ORDERNUMMER = '${ordernummer}'
and PRODUCTNUMMER = '${productnummer}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result: any = {};
    if (rows.length <= 0) {
      result = {
        items: [
          {
            msg: "Orderproductnummer onbekend",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            ORDERNUMMER: ordernummer,
            ID: "",
            OPMERKING: ""
          }
        ]
      };
    } else {
      result = {
        items: [
          {
            msg: "",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            ID: rows[0].ORDERNUMMER + "_" + rows[0].PRODUCTNUMMER,
            OPMERKING: rows[0].OPMERKING
          }
        ]
      };
    }
    res.status(200).send(result);
    return;
  }

  private async getBewerkingflow(req: Request, res: Response, next: NextFunction) {
    let bewerkingflowid = req.query.bewerkingflowid || req.body.bewerkingflowid;
    let connection = await db.waitConnection();
    let result: any;
    let row: any;
    let sql = `
select 
BEWERKING.*,
BEWERKINGFLOW.VOLGNUMMER,
(select min(Productnaam) from PRODUCT where PRODUCT.productnummer = BEWERKING.productnummer) as Productnaam,
(select min(naam) from BEWERKINGSOORT where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) as Bewerkingsoortnaam,
(select min(kleur) from BEWERKINGSOORT where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) as kleur,
sum(ifnull(uitval,0)) as aantaluitval
from BEWERKING,BEWERKINGFLOW
where BEWERKINGFLOW.id = '${bewerkingflowid}'
and BEWERKING.bewerkingsnummer = 'BEWERKINGFLOW.bewerkingsnummer'`;
    let rows = await db.waitQuery(connection, sql);
    if (!rows[0]) {
      result = {
        items: [
          {
            msg: "Productienummer onbekend",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            BEWERKINGSNUMMER: '',
            VOLGNUMMER: '',
            BEWERKINGSOORT: '',
            PRODUCTIEAANTAL: '',
            STARTAANTAL: '',
            AANTALUITVAL: '',
            PRODUCTNUMMER: '',
            PRODUCTNAAM: '',
            OPMERKING: '',
            KLEUR: ''
          }
        ]
      };
      connection.release();
      res.status(200).send(result);
      return;
    }
    row = rows[0];
    result = {
      items: [
        {
          msg: "",
          GEBRUIKER: req.ak2_user,
          GEBRUIKERNAAM: req.ak2_user,
          BEWERKINGSNUMMER: row.BEWERKINGSNUMMER,
          VOLGNUMMER: row.VOLGNUMMER,
          BEWERKINGSOORT: row.BEWERKINGSOORTNAAM,
          PRODUCTIEAANTAL: row.PRODUCTIEAANTAL,
          STARTAANTAL: row.STARTAANTAL,
          AANTALUITVAL: row.AANTALUITVAL,
          PRODUCTNUMMER: row.PRODUCTNUMMER,
          PRODUCTNAAM: row.PRODUCTNAAM,
          OPMERKING: row.OPMERKING,
          KLEUR: row.KLEUR
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async getRetour(req: Request, res: Response, next: NextFunction) {
    let referentie = req.query.referentie;
    if (!referentie) {
      referentie = req.body.referentie;
    }
    let sql = `
select 
ifnull(OPMERKING,'') as OPMERKING
FROM RETOUR
WHERE REFERENTIE = '${referentie}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result: any = {};
    if (rows.length <= 0) {
      result = {
        items: [
          {
            msg: "Referentie onbekend",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            OPMERKING: ""
          }
        ]
      };
    } else {
      result = {
        items: [
          {
            msg: "",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            OPMERKING: rows[0].OPMERKING
          }
        ]
      };
    }
    res.status(200).send(result);
    return;
  }

  private async getRetourKlant(req: Request, res: Response, next: NextFunction) {
    let referentie = req.query.referentie;
    if (!referentie) {
      referentie = req.body.referentie;
    }
    let sql = `
select ifnull(OPMERKING,'') as OPMERKING
FROM RETOURKLANT
WHERE REFERENTIE = '${referentie}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result: any = {};
    if (rows.length <= 0) {
      result = {
        items: [
          {
            msg: "Referentie onbekend",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            OPMERKING: ""
          }
        ]
      };
    } else {
      result = {
        items: [
          {
            msg: "",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            OPMERKING: rows[0].OPMERKING
          }
        ]
      };
    }
    res.status(200).send(result);
    return;
  }

  private async getRetourActie(req: Request, res: Response, next: NextFunction) {
    let id = req.query.id || req.body.id;
    let sql = `
select ifnull(OPMERKING,'') as OPMERKING
FROM RETOURACTIE
WHERE ID = '${id}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result: any = {};
    if (rows.length <= 0) {
      result = {
        items: [
          {
            msg: "Referentie onbekend",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            OPMERKING: ""
          }
        ]
      };
    } else {
      result = {
        items: [
          {
            msg: "",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            OPMERKING: rows[0].OPMERKING
          }
        ]
      };
    }
    res.status(200).send(result);
    return;
  }

  private async getRetourProduct(req: Request, res: Response, next: NextFunction) {
    let id = req.query.id || req.body.id;
    let sql = `
select ifnull(OPMERKING,'') as OPMERKING
FROM RETOURPRODUCT
WHERE ID = '${id}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result: any = {};
    if (rows.length <= 0) {
      result = {
        items: [
          {
            msg: "Referentie onbekend",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            OPMERKING: ""
          }
        ]
      };
    } else {
      result = {
        items: [
          {
            msg: "",
            GEBRUIKER: req.ak2_user,
            GEBRUIKERNAAM: req.ak2_user,
            OPMERKING: rows[0].OPMERKING
          }
        ]
      };
    }
    res.status(200).send(result);
    return;
  }

  private async saveRetourOpmerking(req: Request, res: Response, next: NextFunction) {
    let referentie = req.query.referentie || req.body.referentie || "";
    let sql = `
update RETOUR
set opmerking = '${req.body.opmerking}'
WHERE REFERENTIE = '${referentie}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          msg: ""
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async saveRetourKlantOpmerking(req: Request, res: Response, next: NextFunction) {
    let sql = `
update RETOURKLANT
set opmerking = '${req.body.opmerking}'
WHERE ID = '${req.body.id}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          msg: ""
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async saveRetourProductOpmerking(req: Request, res: Response, next: NextFunction) {
    let sql = `
update RETOURPRODUCT
set opmerking = '${req.body.opmerking}'
WHERE ID = '${req.body.id}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          msg: ""
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async saveRetourActieOpmerking(req: Request, res: Response, next: NextFunction) {
    let sql = `
update RETOURACTIE
set opmerking = '${req.body.opmerking}'
WHERE ID = '${req.body.id}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          msg: ""
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async saveBewerkingOpmerking(req: Request, res: Response, next: NextFunction) {
    let sql = `
update BEWERKING
set opmerking = '${req.body.opmerking}'
WHERE bewerkingsnummer = '${req.body.bewerkingsnummer}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          msg: ""
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async saveVraagproductOpmerking(req: Request, res: Response, next: NextFunction) {
    let sql = `
update PRODUCTVRAAG
set opmerking = '${req.body.opmerking}'
WHERE ordernummer = '${req.body.ordernummer}'
AND productnummer = '${req.body.productnummer}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          msg: ""
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async saveVraagOpmerking2(req: Request, res: Response, next: NextFunction) {
    let sql = `
update VRAAG
set opmerking2 = '${req.body.opmerking}'
WHERE ordernummernummer = '${req.body.ordernummer}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          msg: ""
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async saveVraagOpmerking(req: Request, res: Response, next: NextFunction) {
    let sql = `
update VRAAG
set opmerking = '${req.body.opmerking}'
WHERE ordernummer = '${req.body.ordernummer}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          msg: ""
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async getProductOpmerking(req: Request, res: Response, next: NextFunction) {
    let sql: string;
    let connection = await db.waitConnection();
    //
    sql = `
insert into PRODUCTOPMERKING
(productnummer,bron,opmerking)
select 
'${db.fix(req.body.productnummer)}',
'${db.fix(req.body.bron)}',
'${db.fix(req.body.opmerking || '')}' from dual
where not exists
(
select 1 from PRODUCTOPMERKING
where productnummer = '${db.fix(req.body.productnummer)}'
and bron = '${db.fix(req.body.bron)}'
)`;
    res.crudResult = await db.waitQuery(connection, sql);
    sql = `
select *
FROM PRODUCTOPMERKING
WHERE productnummer = '${db.fix(req.body.productnummer)}'
and bron = '${db.fix(req.body.bron)}'`;
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result: any = {};
    if (!rows[0]) {
      result = {
        items: [
          {
            msg: "Productopmerking onbekend",
            OPMERKING: ""
          }
        ]
      };
    } else {
      result = {
        items: [
          {
            msg: "",
            OPMERKING: rows[0].OPMERKING,
          }
        ]
      };
    }
    res.status(200).send(result);
    return;
  }

  private async saveProductOpmerking(req: Request, res: Response, next: NextFunction) {
    let sql = `
update PRODUCTOPMERKING
set opmerking = '${db.fix(req.body.opmerking)}'
WHERE productnummer = '${db.fix(req.body.productnummer)}'
AND bron = '${db.fix(req.body.bron)}'`;
    let connection = await db.waitConnection();
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          msg: ""
        }
      ]
    };
    res.status(200).send(result);
    return;
  }

  private async getUurtarief(req: Request, res: Response, next: NextFunction) {
    let sql: string;
    let rows: any;
    let result: any;
    let uurtarief = '';
    //
    let connection = await db.waitConnection();
    //
    sql = `
select INHOUD 
from PARAM 
where naam = 'UURTARIEF';`;
    rows = await db.waitQuery(connection, sql);
    if (rows[0]) {
      uurtarief = rows[0].INHOUD;
    }
    result = {
      items: [
        {
          msg: '', UURTARIEF: uurtarief
        }]
    };
    connection.release();
    res.status(200).send(result);
    return;
  }

  private async setUurtarief(req: Request, res: Response, next: NextFunction) {
    let uurtarief = req.body.uurtarief || '';
    //
    let sql: string;
    let rows: any;
    let result: any;
    //
    let connection = await db.waitConnection();
    //
    sql = `
insert into PARAM (naam) 
select 'UURTARIEF' from DUAL
where not exists 
(select 1 from PARAM where naam = 'UURTARIEF')`;
    rows = await db.waitQuery(connection, sql);
    sql = `
update PARAM set
inhoud = '${db.fix(uurtarief)}' 
where naam = 'UURTARIEF';`;
    rows = await db.waitQuery(connection, sql);
    result = {
      items: [
        {
          msg: ''
        }]
    };
    connection.release();
    res.status(200).send(result);
    return;
  }

  private async getStartstatistiek(req: Request, res: Response, next: NextFunction) {
    let startstatistiek = "01-01-2011";
    let sql = `
select INHOUD 
from PARAM 
where naam = 'STARTSTATISTIEK';`;
    let connection = await db.waitConnection()
    let rows = await db.waitQuery(connection, sql);
    connection.release();
    if (rows.length > 0) {
      startstatistiek = rows[0].INHOUD;
    }
    let result = { items: [{ MSG: "", STARTSTATISTIEK: startstatistiek }] };
    res.status(200).send(result);
    return;
  }

  private async setStartstatistiek(req: Request, res: Response, next: NextFunction) {
    let sql: string;
    let rows: any;
    let connection = await db.waitConnection();
    //
    sql = `
insert into PARAM (NAAM)
select 'STARTSTATISTIEK' from DUAL
where not exists (
select 1 from PARAM where naam = 'STARTSTATISTIEK'
)`
    rows = await db.waitQuery(connection, sql);
    sql = `
update PARAM set
INHOUD = '${req.body.startstatistiek}' 
where naam = 'STARTSTATISTIEK';`;
    rows = await db.waitQuery(connection, sql);
    //
    connection.release();//
    let result = {
      items: [{ MSG: "" }]
    };
    res.status(200).send(result);
    return;
  }

  private async getEmail(req: Request, res: Response, next: NextFunction) {
    let vrijgegeven = req.query.vrijgegeven || req.body.vrijgegeven;
    let table = req.query.table || req.body.table;
    let key = req.query.key || req.body.key;
    let to = '';
    let msg = '';
    let email = '';
    let sql: string;
    let rows: any;
    let result: any;
    //
    let connection = await db.waitConnection();
    //
    let parname = vrijgegeven;
    //
    if (parname) {
      sql = `
select INHOUD 
from PARAM 
where naam = '${parname}';`;
      rows = await db.waitQuery(connection, sql);
      if (rows[0]) {
        to = rows[0].INHOUD;
      }
      result = {
        items: [{ msg: msg, parname: parname, to: to }]
      };
      connection.release();
      res.status(200).send(result);
      return;
      return;
    }
    //
    if (table == 'leverancier') {
      sql = `
select EMAIL
from LEVERANCIER 
where leveranciernummer = '${key}'`;
      rows = await db.waitQuery(connection, sql);
      if (rows[0]) {
        email = rows[0].EMAIL;
      } else {
        msg = `onbekende leverancier: ${key}`;
      }
    } else {
      msg = `onbekende table: ${table}`;
    }
    result = {
      items: [{ MSG: msg, EMAIL: email }]
    };
    connection.release();
    res.status(200).send(result);
    return;
  }

  private async setEmail(req: Request, res: Response, next: NextFunction) {
    let vrijgegeven = req.query.vrijgegeven || req.body.vrijgegeven;
    let table = req.query.table || req.body.table;
    let key = req.query.key || req.body.key;
    let to = req.query.to || req.body.to;
    let email = req.query.email || req.body.email;
    //
    let msg = '';
    let sql: string;
    let rows: any;
    let result: any;
    //
    let connection = await db.waitConnection();
    //
    let parname = vrijgegeven;
    //
    if (parname) {
      sql = `
insert into PARAM (naam) 
select '${parname}' from DUAL
where not exists 
(select 1 from PARAM where naam = '${parname}')`;
      rows = await db.waitQuery(connection, sql);
      sql = `
update PARAM set
inhoud = '${db.fix(to)}' 
where naam = '${parname}';`;
      rows = await db.waitQuery(connection, sql);
      result = {
        items: [{ msg: msg, parname: parname, to: to }]
      };
      connection.release();
      res.status(200).send(result);
      return;
    }
    //
    if (table == 'leverancier') {
      sql = `
update LEVERANCIER set
email = '${email}'
where leveranciernummer = '${key}'`;
      rows = await db.waitQuery(connection, sql);
    } else {
      msg = `onbekende table: ${table}`;
    }
    result = {
      items: [{ MSG: msg, EMAIL: email }]
    };
    connection.release();
    res.status(200).send(result);
    return;
  }

  private async clearLeverancierNieuw(req: Request, res: Response, next: NextFunction) {
    let sql: string;
    let rows: any;
    let connection = await db.waitConnection();
    //
    sql = `
update BESTELLING 
set lijststatus = 'PRT'
where leveranciernummer = '${db.fix(req.query.leverancier)}'`;
    rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          MSG: `De regels van leverancier ${db.fix(req.query.leverancier)} zijn van op 'Geprint' gezet ...`,
        }]
    };
    res.status(200).send(result);
    return;
  }

  private async getPauze(req: Request, res: Response, next: NextFunction) {
    let start = "12:00";
    let eind = "12:30";
    let connection = await db.waitConnection();
    //
    let sql = `
select INHOUD 
from PARAM 
where naam = 'PAUZESTART';`;
    let rows = await db.waitQuery(connection, sql);
    if (rows[0]) {
      start = rows[0].INHOUD;
    }
    //
    sql = `
select INHOUD 
from PARAM 
where naam = 'PAUZEEIND';`;
    rows = await db.waitQuery(connection, sql);
    if (rows[0]) {
      eind = rows[0].INHOUD;
    }
    //
    connection.release();//
    let result = {
      items: [{ MSG: "", START: start, EIND: eind }]
    };
    res.status(200).send(result);
    return;
  }

  private async setPauze(req: Request, res: Response, next: NextFunction) {
    let sql: string;
    let rows: any;
    let connection = await db.waitConnection();
    //
    sql = `
insert into PARAM (NAAM)
select 'PAUZESTART' from DUAL
where not exists (
select 1 from PARAM where naam = 'PAUZESTART'
)`
    rows = await db.waitQuery(connection, sql);
    sql = `
update PARAM set
INHOUD = '${req.body.start}' 
where naam = 'PAUZESTART';`;
    rows = await db.waitQuery(connection, sql);
    //
    //
    //
    sql = `
insert into PARAM (NAAM)
select 'PAUZEEIND' from DUAL
where not exists (
select 1 from PARAM where naam = 'PAUZEEIND'
)`
    rows = await db.waitQuery(connection, sql);
    sql = `
update PARAM set
INHOUD = '${req.body.eind}' 
where naam = 'PAUZEEIND';`;
    rows = await db.waitQuery(connection, sql);
    //
    connection.release();//
    let result = {
      items: [{ MSG: "", START: req.body.start, EIND: req.body.eind }]
    };
    res.status(200).send(result);
    return;
  }

  private async addLogistiek(req: Request, res: Response, next: NextFunction) {
    let msg = '';
    let sql: string;
    let sqlinsert: string;
    let rows: any;
    let row: any;
    let rowspf: any;
    let rowpf: any;
    let tlrow = 0;
    let connection = await db.waitConnection();
    let idbw = -1;
    //
    let productnummer = req.query.productnummer || '';
    let lijn = req.query.lijn || '';
    let datum = req.query.datum || '';
    //
    sql = `
select * from BEWERKINGSOORT
where layout = 'rapBEWERKINGFLOWPICK.php'
order by bewerkingsoort`;
    rows = await db.waitQuery(connection, sql);
    if (rows[0]) {
      row = rows[0];
      idbw = Number(row.ID);
    } else {
      idbw = -1;
      msg = 'Geen bewerkingsoort met logistieklijst aanwezig (instellingen)';
    }
    //
    //
    //
    if (idbw != -1) {
      sql = `
select * from BEWERKING
where einddatumtijd is null
and not exists (select 1 from BEWERKINGFLOW,BEWERKINGSOORT
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
and BEWERKINGSOORT.layout = 'rapBEWERKINGFLOWPICK.php')`;
      rows = await db.waitQuery(connection, sql);
      for (let irow = 0; irow < rows.length; irow++) {
        row = rows[irow];
        tlrow++;
        if (row.PRODUCTIEAANTAL == '') {
          row.PRODUCTIEAANTAL = '0';
        }
        if (row.STARTAANTAL == '') {
          row.STARTAANTAL = '0';
        }
        //
        // Bestaat er een productflowregel voor?
        //
        sql = `
select *,
PRODUCTFLOW.id as PFID
from PRODUCTFLOW,BEWERKINGSOORT
where PRODUCTFLOW.productnummer = '${row.PRODUCTNUMMER}'
and PRODUCTFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
and BEWERKINGSOORT.layout = 'rapBEWERKINGFLOWPICK.php'
order by PRODUCTFLOW.volgnummer`;
        rowspf = await db.waitQuery(connection, sql);
        if (rowspf[0]) {
          rowpf = rowspf[0];
          sqlinsert = `
insert into BEWERKINGFLOW
(Bewerkingsnummer,Bewerkingsoort,Volgnummer,
Bewerkingaantal, Startdatumtijd, Geprint, Plandatumtijd, Einddatumtijd)
select 
'${row.BEWERKINGSNUMMER}', 
bewerkingsoort, 
volgnummer,
'${row.PRODUCTIEAANTAL}',
null,null,null,null
from PRODUCTFLOW
where id = '${rowpf.PFID}'`;
          res.crudResult = await db.waitQuery(connection, sqlinsert);
        } else {
          sqlinsert = `
insert into BEWERKINGFLOW
(Bewerkingsnummer,Bewerkingsoort,Volgnummer,
Bewerkingaantal, Startdatumtijd, Geprint, Plandatumtijd, Einddatumtijd)
select 
'${row.BEWERKINGSNUMMER}', 
bewerkingsoort,
1,
'${row.PRODUCTIEAANTAL}',
null,null,null,null
from BEWERKINGSOORT
where id = '${idbw}'`;
          res.crudResult = await db.waitQuery(connection, sqlinsert);
        }
      }
      if (tlrow == 0) {
        msg = 'Logistiekbewerkingen waren compleet, geen toevoegingen nodig ...';
      } else {
        msg = `{$tlrow} logistiekbewerkingen toegevoegd ...`;
      }
    }
    //
    //
    //
    connection.release();
    let result = {
      items: [
        {
          MSG: msg,
        }]
    };
    res.status(200).send(result);
    return;
  }

  private async cleanLog(req: Request, res: Response, next: NextFunction) {
    let sql: string;
    let rows: any;
    let connection = await db.waitConnection();
    //
    sql = `
delete from BBMSG 
where bb = 'Log' 
and date <  DATE_SUB(SYSDATE(),INTERVAL 5 DAY)`;
    rows = await db.waitQuery(connection, sql);
    connection.release();
    let result = {
      items: [
        {
          MSG: "",
        }]
    };
    res.status(200).send(result);
    return;
  }

  public async sendVrijMail(req: Request, res: Response, next: NextFunction) {
    let msg = '';
    if ((req.body.to || '') == '') {
      msg = "Email is niet verzonden"
    } else {
      //
      let subject = `Vrijgave van ${req.body.datum}`;
      if ((req.body.productgroep || '') != '') {
        subject += ` van ${req.body.productgroep}`;
      }
      subject += ` is uitgevoerd`;
      //
      let message = `http://${Config.server}:${Config.serverPort}/${req.body.filename}.pdf`;
      await this.mailer.send(req.body.to, subject, message);
      msg = `Email is verzonden naar ${req.body.to}`;
    }
    let result = {
      items: [{
        msg: msg,
        filename: req.body.filename
      }]
    };
    res.status(200).send(result);
    return (true);
  }

  private async makePdf(req: Request, res: Response, next: NextFunction) {
    let scherm = req.body.html || '';
    let filename = req.body.filename || 'todo';
    let orientation = req.body.orientation || 'portrait';
    let papersize = req.body.papersize || 'A4';
    //
    let sourcedir = `${Config.appDir}/html`;
    let targetdir = `${Config.appDir}/pdf`;
    try {
      fs.mkdirSync(sourcedir);
    } catch (error) {
      // already exists
    }
    try {
      fs.mkdirSync(targetdir);
    } catch (error) {
      // already exists
    }
    fs.writeFileSync(`${sourcedir}/${filename}.html`, scherm);
    let html = fs.readFileSync(`${sourcedir}/${filename}.html`, 'utf8');
    let options: pdf.CreateOptions = {
      format: papersize,
      orientation: orientation,
      base: "http://localhost/ak2ps/build/",
      header: {
        height: "10mm"
      },
      footer: {
        height: "10mm"
      }
    }
    pdf.create(html, options).toFile(`${targetdir}/${filename}.pdf`, (pdferr, pdfres) => {
      let msg = `${filename}.pfd has been generated successfully!`;
      if (pdferr) {
        Logger.error(req, JSON.stringify(pdferr));
        msg = JSON.stringify(pdferr);
      }
      let result = {
        items: [
          {
            msg: msg,
            filename: `pdf/${filename}`
          }]
      };
      res.status(200).send(result);
      return;
    })
    //
  }

  private async makePdfBestelling(req: Request, res: Response, next: NextFunction) {
    let scherm = req.body.html || '';
    let filename = req.body.filename || 'test.pdf';
    let orientation = req.body.orientation || 'portrait';
    let papersize = req.body.papersize || 'A4';
    //
    let sourcedir = `${Config.appDir}/html`;
    let targetdir = `${Config.appDir}/pdf`;
    try {
      fs.mkdirSync(sourcedir);
    } catch (error) {
      // already exists
    }
    try {
      fs.mkdirSync(targetdir);
    } catch (error) {
      // already exists
    }
    fs.writeFileSync(`${sourcedir}/${filename}.html`, scherm);
    let html = fs.readFileSync(`${sourcedir}/${filename}.html`, 'utf8');
    let options: pdf.CreateOptions = {
      format: papersize,
      orientation: orientation,
      base: "http://localhost/ak2ps/build/",
      header: {
        height: "10mm"
      },
      footer: {
        height: "10mm"
      }
    }
    pdf.create(html, options).toFile(`${targetdir}/${filename}.pdf`, (pdferr, pdfres) => {
      let msg = `${filename}.pdf has been generated successfully!`;
      if (pdferr) {
        Logger.error(req, JSON.stringify(pdferr));
        msg = JSON.stringify(pdferr);
      }
      let result = {
        items: [
          {
            msg: msg,
            filename: `pdf/${filename}`
          }]
      };
      res.status(200).send(result);
      return;
    })
    //
  }

  private async makeExcel(req: Request, res: Response, next: NextFunction) {
    // nvt?
    let scherm = req.body.html || '';
    let filename = req.body.filename || 'temp.xls';
    //
    let targetdir = `${Config.appDir}/tmpxls`;
    try {
      fs.mkdirSync(targetdir);
    } catch (error) {
      // already exists
    }
    fs.writeFileSync(`${targetdir}/${filename}.xls`, scherm);
    let msg = `${filename}.xls has been generated successfully!`;
    let result = {
      items: [
        {
          msg: msg,
          filename: `${filename}`
        }]
    };
    res.status(200).send(result);
    return;
    //
  }

  private async showPdf(req: Request, res: Response, next: NextFunction) {
    // nvt?
    let filename = req.body.filename || req.query.filename;
    res.status(200).sendFile(`${Config.appDir}/pdf/${filename}`);
    return;
    //
  }

  private async showExcel(req: Request, res: Response, next: NextFunction) {
    // nvt?
    let filename = req.body.filename || req.query.filename;
    res.setHeader('Content-Description', 'File Transfer');
    res.setHeader('Content-type', 'application/excel');
    res.setHeader('Content-Disposition: attachment', `filename=${filename}`);
    let result = `
<html xmlns:x="urn:schemas-microsoft-com:office:excel">
<head>
<!--[if gte mso 9]>
<xml>
<x:ExcelWorkbook>
<x:ExcelWorksheets>
<x:ExcelWorksheet>
<x:Name>Sheet 1</x:Name>
<x:WorksheetOptions>
<x:Print>
<x:ValidPrinterInfo/>
</x:Print>
</x:WorksheetOptions>
</x:ExcelWorksheet>
</x:ExcelWorksheets>
</x:ExcelWorkbook>
</xml>
<![endif]-->
</head>
<body>`;
    result += fs.readFileSync(filename);
    result += `
</body>
</html>`;
    if (Number(req.query.delete) == 1) {
      fs.unlinkSync(filename);
    }
    res.status(200).send(result);
    return;
    //
  }

  public async sendMail(req: Request, res: Response, next: NextFunction) {
    let msg = '';
    if ((req.body.to || '') == '') {
      msg = "Email is niet verzonden"
    } else {
      await this.mailer.send(req.body.to, req.body.header, req.body.message);
      msg = `Email is verzonden naar ${req.body.to}`;
    }
    let result = {
      items: [{
        msg: msg,
        filename: req.body.filename
      }]
    };
    res.status(200).send(result);
    return (true);
  }

  private async getVrijgegeven(req: Request, res: Response, next: NextFunction) {
    let productgroep = req.query.productgroep || req.body.productgroep || "";
    let msg = 'Nog niet';
    //
    let scandir = Config.appDir + "/pdf";
    try {
      fs.readdirSync(scandir).forEach((file) => {
        let ext = String(file).split('.').pop();
        if (ext?.toUpperCase() == "PDF") {
          if (file.toUpperCase().indexOf("MNL_") == 0) {
            let jaar = Number(file.substr(4, 4));
            let maand = Number(file.substr(8, 2));
            let dag = Number(file.substr(10, 2));
            let today = new Date();
            if (jaar == today.getFullYear()
              && maand == today.getMonth() + 1
              && dag == today.getDate()) {
              if (productgroep == "") {
                if (file.substr(12, 1) == ".") {
                  msg = "Ja";
                }
              } else {
                if (file.substr(13, productgroep.length) == productgroep) {
                  msg = "Ja";
                }
              }
            }
          }
        }
      });
    } catch (error) {
      Logger.error(req, error);
    }
    //
    let result = {
      items: [{ msg: msg }]
    };
    res.status(200).send(result);
    return;
  }

  public async makeTekening(req: Request, res: Response, next: NextFunction) {
    let msg = '';
    let error = '';
    let shellresult: any;
    let sql = '';
    let rows: any;
    let row: any;
    let infile = '';
    let outfile = '';
    let tekeningnummer = req.body.tekeningnummer || '';
    let bewerkingsoort = req.body.bewerkingsoort || '';
    let productnummer = req.body.productnummer || req.query.productnummer || '';
    let bestelnummer = req.body.bestelnummer || '';
    let type = '';
    //
    let tekdir = 'F:/acltwin/DRAWINGS';
    let outdir = req.body.outdir || '';
    let curdir = Config.appDir;
    let dwg = 'dwg2pdf.cmd';
    let indir = '';
    let cmd = '';
    //
    let test = 0;
    //
    let url = '';
    let url2 = '';
    let url3 = '';
    let url4 = '';
    let url5 = '';
    let url6 = '';
    let url7 = '';
    let url8 = '';
    let url9 = '';
    let url10 = '';
    //
    let connection = await db.waitConnection();
    //
    sql = `
select
INHOUD
from PARAM
where naam = 'TEKENINGDIR'`;
    rows = await db.waitQuery(connection, sql);
    if (rows[0]) {
      row = rows[0];
      tekdir = row.INHOUD;
    }
    //
    tekdir = tekdir.replace(/\//g, '\\');
    outdir = outdir.replace(/\//g, '\\');
    curdir = curdir.replace(/\//g, '\\');
    //
    if (bewerkingsoort == "INKOOP") {
      sql = `
select 
distinct(productnummer) as productnummer 
from BESTELLING 
where bestelnummer = '${bestelnummer}'`;
      rows = await db.waitQuery(connection, sql);
      for (let irow = 0; irow < rows.length; irow++) {
        row = rows[irow];
        if (row.PRODUCTNUMMER != "") {
          productnummer = row.PRODUCTNUMMER;
          type = productnummer.substr(0, 1).toUpperCase();
          if (type == 'T') {
            indir = tekdir + "\\PRODUCTS";
            tekeningnummer = productnummer;
          } else if ((type == 'M') || (type == 'S')) {
            tekeningnummer = productnummer;
            indir = tekdir + "\\MATERIALS";
          } else {
            tekeningnummer = productnummer;
            indir = tekdir + "\\ASSEMBLY";
          }
          infile = indir + "\\" + tekeningnummer + ".DWG";
          outfile = outdir + "\\" + tekeningnummer + ".pdf";
          if (fs.existsSync(outfile)) {
            fs.unlinkSync(outfile);
          }
          if (fs.existsSync(infile) === false && test == 0) {
            error += `DWG ${infile} onbekend ...\n`;
          } else {
            cmd = `${curdir}\\${dwg} "${infile}" "${outfile}"`;
            try {
              shellresult = child.execSync(cmd,
                {
                  cwd: curdir,
                });
            } catch (error) {
              //Logger.error(req, JSON.stringify(error));
            }
            if (fs.existsSync(outfile) === false) {
              error += `PDF ${outfile} is niet aangemaakt ...\n`;
            } else {
              msg += `${outfile}\n`;
            }
          }
          if (url == '') {
            url = outfile;
          } else if (url2 == '') {
            url2 = outfile;
          } else if (url3 == '') {
            url3 = outfile;
          } else if (url4 == '') {
            url4 = outfile;
          } else if (url5 == '') {
            url5 = outfile;
          } else if (url6 == '') {
            url6 = outfile;
          } else if (url7 == '') {
            url7 = outfile;
          } else if (url8 == '') {
            url8 = outfile;
          } else if (url9 == '') {
            url9 = outfile;
          } else if (url10 == '') {
            url10 = outfile;
          }
        }
      }
    } else {
      sql = `
select * 
from BEWERKINGSOORT 
where naam = '${bewerkingsoort}'`;
      rows = await db.waitQuery(connection, sql);
      if (rows[0]) {
        row = rows[0];
        if (row.BEWERKINGSOORT != "") {
          bewerkingsoort = row.BEWERKINGSOORT;
        }
      }
      //
      type = productnummer.substr(0, 1).toUpperCase();
      // T
      if (type == 'T') {
        if ((bewerkingsoort == '3')
          || (bewerkingsoort == '4')
          || (bewerkingsoort == '7')
          || (bewerkingsoort == 'C')
          || (bewerkingsoort == 'G')
          || (bewerkingsoort == 'N')) {
          tekeningnummer = 'D' + productnummer;
        } else {
          tekeningnummer = 'A' + productnummer;
        }
        indir = tekdir + "\\ASSEMBLY";
        infile = indir + "\\" + tekeningnummer + ".DWG";
        outfile = curdir + "\\tekening\\" + tekeningnummer + ".pdf";
        if (fs.existsSync(outfile)) {
          fs.unlinkSync(outfile);
        }
        url = `http://${Config.server}${Config.appUrl}/tekening/${tekeningnummer}.pdf`;
        if (fs.existsSync(infile) === false && test == 0) {
          msg += `DWG ${infile} onbekend ...\n`;
        } else {
          cmd = `${curdir}\\${dwg} "${infile}" "${outfile}"`;
          try {
            shellresult = child.execSync(cmd,
              {
                cwd: curdir,
              });
          } catch (error) {
            //Logger.error(req, JSON.stringify(error));
          }
          if (fs.existsSync(outfile) === false) {
            msg += `PDF ${outfile} is niet aangemaakt ...\n`;
          }
        }
        if ((bewerkingsoort == '3')
          || (bewerkingsoort == '4')
          || (bewerkingsoort == '7')
          || (bewerkingsoort == 'C')
          || (bewerkingsoort == 'G')
          || (bewerkingsoort == 'N')) {
          tekeningnummer = productnummer;
          indir = tekdir + "\\PRODUCTS";
          infile = indir + "\\" + tekeningnummer + ".DWG";
          outfile = curdir + "\\tekening\\" + tekeningnummer + ".pdf";
          if (fs.existsSync(outfile)) {
            fs.unlinkSync(outfile);
          }
          url2 = `http://${Config.server}${Config.appUrl}/tekening/${tekeningnummer}.pdf`;
          if (fs.existsSync(infile) === false && test == 0) {
            msg += `DWG ${infile} onbekend ...\n`;
          } else {
            cmd = `${curdir}\\${dwg} "${infile}" "${outfile}"`;
            try {
              shellresult = child.execSync(cmd,
                {
                  cwd: curdir,
                });
            } catch (error) {
              //Logger.error(req, JSON.stringify(error));
            }
            if (fs.existsSync(outfile) === false) {
              msg += `PDF ${outfile} is niet aangemaakt ...\n`;
            }
          }
        }
      } else if ((type == 'M') || (type == 'S')) {
        tekeningnummer = productnummer;
        indir = tekdir + "\\MATERIALS";
        infile = indir + "\\" + tekeningnummer + ".DWG";
        outfile = curdir + "\\tekening\\" + tekeningnummer + ".pdf";
        if (fs.existsSync(outfile)) {
          fs.unlinkSync(outfile);
        }
        url2 = `http://${Config.server}${Config.appUrl}/tekening/${tekeningnummer}.pdf`;
        if (fs.existsSync(infile) === false && test == 0) {
          msg += `DWG ${infile} onbekend ...\n`;
        } else {
          cmd = `${curdir}\\${dwg} "${infile}" "${outfile}"`;
          try {
            shellresult = child.execSync(cmd,
              {
                cwd: curdir,
              });
          } catch (error) {
            //Logger.error(req, JSON.stringify(error));
          }
          if (fs.existsSync(outfile) === false) {
            msg += `PDF ${outfile} is niet aangemaakt ...\n`;
          }
        }
      } else {
        tekeningnummer = productnummer;
        indir = tekdir + "\\ASSEMBLY";
        infile = indir + "\\" + tekeningnummer + ".DWG";
        outfile = curdir + "\\tekening\\" + tekeningnummer + ".pdf";
        if (fs.existsSync(outfile)) {
          fs.unlinkSync(outfile);
        }
        url = `http://${Config.server}${Config.appUrl}/tekening/${tekeningnummer}.pdf`;
        if (fs.existsSync(infile) === false && test == 0) {
          msg += `DWG ${infile} onbekend ...\n`;
        } else {
          cmd = `${curdir}\\${dwg} "${infile}" "${outfile}"`;
          try {
            shellresult = child.execSync(cmd,
              {
                cwd: curdir,
              });
          } catch (error) {
            //Logger.error(req, JSON.stringify(error));
          }
          if (fs.existsSync(outfile) === false) {
            msg += `PDF ${outfile} is niet aangemaakt ...\n`;
          }
        }
      }
      // + W
      tekeningnummer = 'W' + productnummer;
      indir = "F:\\data\\ak2\\werkvoorbereiding";
      infile = indir + "\\" + tekeningnummer + ".pdf";
      url3 = encodeURI(`http://${Config.server}${Config.appUrl}/toolbox.php?action=showpdf&filename=${infile}`);
      if (fs.existsSync(infile) === false && test == 0) {
        url3 = '';
      }
      // + O
      tekeningnummer = 'O' + productnummer;
      indir = "F:\\acltwin\\REMARKS";
      infile = indir + "\\" + tekeningnummer + ".pdf";
      url4 = encodeURI(`http://${Config.server}${Config.appUrl}/toolbox.php?action=showpdf&filename=${infile}`);
      if (fs.existsSync(infile) === false && test == 0) {
        url4 = '';
      }
      // + I1 tm I6 in url5 tm url10
      let thisStart = '';
      let thisEnd = '';
      let thisFiles: any;
      indir = "F:\\data\\ak2\\werkvoorbereiding";
      thisStart = indir + "\\I" + productnummer + "_";
      thisEnd = ".pdf";
      try {
        thisFiles = fs.readdirSync(indir).filter((element) => {
          if (!element.startsWith(thisStart)) {
            return false;
          }
          if (!element.endsWith(thisEnd)) {
            return false;
          }
          return true;
        });
      } catch (error) {
        return false;
      }
      //
      if (thisFiles[0]) {
        infile = thisFiles[0];
        url5 = encodeURI(`http://${Config.server}${Config.appUrl}/toolbox.php?action=showpdf&filename=${infile}`);
      }
      if (thisFiles[1]) {
        infile = thisFiles[1];
        url6 = encodeURI(`http://${Config.server}${Config.appUrl}/toolbox.php?action=showpdf&filename=${infile}`);
      }
      if (thisFiles[2]) {
        infile = thisFiles[2];
        url7 = encodeURI(`http://${Config.server}${Config.appUrl}/toolbox.php?action=showpdf&filename=${infile}`);
      }
      if (thisFiles[3]) {
        infile = thisFiles[3];
        url8 = encodeURI(`http://${Config.server}${Config.appUrl}/toolbox.php?action=showpdf&filename=${infile}`);
      }
      if (thisFiles[4]) {
        infile = thisFiles[4];
        url9 = encodeURI(`http://${Config.server}${Config.appUrl}/toolbox.php?action=showpdf&filename=${infile}`);
      }
      if (thisFiles[5]) {
        infile = thisFiles[5];
        url10 = encodeURI(`http://${Config.server}${Config.appUrl}/toolbox.php?action=showpdf&filename=${infile}`);
      }

    }
    //
    let result = {
      items: [{
        msg: msg,
        error: error,
        url: url,
        url2: url2,
        url3: url3,
        url4: url4,
        url5: url5,
        url6: url6,
        url7: url7,
        url8: url8,
        url9: url9,
        url10: url10,
        filename: req.body.filename
      }]
    };
    connection.release();
    res.status(200).send(result);
    return (true);
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action || '');
    Logger.request(req);
    //
    if (action == "getbewerking") {
      this.getBewerking(req, res, next);
    } else if (action == "getvraag") {
      this.getVraag(req, res, next);
    } else if (action == "getvraagproduct") {
      this.getVraagProduct(req, res, next);
    } else if (action == "getbewerkingflow") {
      this.getBewerkingflow(req, res, next);
      //
    } else if (action == "getretour") {
      this.getRetour(req, res, next);
    } else if (action == "getretourklant") {
      this.getRetourKlant(req, res, next);
    } else if (action == "getretouractie") {
      this.getRetourActie(req, res, next);
    } else if (action == "getretourproduct") {
      this.getRetourProduct(req, res, next);
      //
    } else if (action == "saveretouropmerking") {
      this.saveRetourOpmerking(req, res, next);
    } else if (action == "saveretourklantopmerking") {
      this.saveRetourKlantOpmerking(req, res, next);
    } else if (action == "saveretourproductopmerking") {
      this.saveRetourProductOpmerking(req, res, next);
    } else if (action == "saveretouractieopmerking") {
      this.saveRetourActieOpmerking(req, res, next);
    } else if (action == "savebewerkingopmerking") {
      this.saveBewerkingOpmerking(req, res, next);
    } else if (action == "savevraagopmerking") {
      this.saveVraagOpmerking(req, res, next);
    } else if (action == "savevraagproductopmerking") {
      this.saveVraagproductOpmerking(req, res, next);
    } else if (action == "savevraagopmerking2") {
      //
      this.saveVraagOpmerking2(req, res, next);
      //
    } else if (action == "getproductopmerking") {
      this.getProductOpmerking(req, res, next);
    } else if (action == "saveproductopmerking") {
      this.saveProductOpmerking(req, res, next);
      //
    } else if (action == "getuurtarief") {
      this.getUurtarief(req, res, next);
    } else if (action == "setuurtarief") {
      this.setUurtarief(req, res, next);
      //
    } else if (action == "getstartstatistiek") {
      this.getStartstatistiek(req, res, next);
    } else if (action == "setstartstatistiek") {
      this.setStartstatistiek(req, res, next);
    } else if (action == "getemail") {
      this.getEmail(req, res, next);
    } else if (action == "setemail") {
      this.setEmail(req, res, next);
    } else if (action == "clearleveranciernieuw") {
      this.clearLeverancierNieuw(req, res, next);
    } else if (action == "getpauze") {
      this.getPauze(req, res, next);
    } else if (action == "setpauze") {
      this.setPauze(req, res, next);
    } else if (action == "addlogistiek") {
      this.addLogistiek(req, res, next);
    } else if (action == "cleanlog") {
      this.cleanLog(req, res, next);
    } else if (action == "sendvrijmail") {
      this.sendVrijMail(req, res, next);
    } else if (action == "makepdf") {
      this.makePdf(req, res, next);
    } else if (action == "makepdfbestelling") {
      this.makePdfBestelling(req, res, next);
    } else if (action == "makeexcel") {
      this.makeExcel(req, res, next);
    } else if (action == "showpdf") {
      this.showPdf(req, res, next);
    } else if (action == "showexcel") {
      this.showExcel(req, res, next);
    } else if (action == "sendmail") {
      this.sendMail(req, res, next);
    } else if (action == "getvrijgegeven") {
      this.getVrijgegeven(req, res, next);
    } else if (action == "maketekening") {
      this.makeTekening(req, res, next);
    } else if (action == "scan") {
      Klok.scan(req, res, next);
    } else {
      Util.exePhp(req, res, next);
    }
  }
}
