
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "RETOURPRODUCT",
    key: [
        {
            body: "ID",
            sql: "ID",
        },
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(PRODUCTNUMMER)",
        where: [
            {
                query: "value",
                sql: "ucase(PRODUCTNUMMER) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "REFERENTIE as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "referentie,productnummer",
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
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            },
            {
                query: "aantal",
                sql: "AANTAL = ?",
            },
            {
                query: "klantproductnummer",
                sql: "KLANTPRODUCTNUMMER like ('%?%')",
            },
            {
                query: "serienummer",
                sql: "SERIENUMMER like ('%?%')",
            },
            {
                query: "productiedatumtijd",
                sql: "PRODUCTIEDATUMTIJD > screendate2date('?')",
            },
            {
                query: "opmerking",
                sql: "OPMERKING like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "REFERENTIE",
                sql: "ifnull(REFERENTIE,'') as REFERENTIE",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "AANTAL",
                sql: "ifnull(cast(AANTAL as CHAR),'') as AANTAL",
            },
            {
                row: "KLANTPRODUCTNUMMER",
                sql: "ifnull(KLANTPRODUCTNUMMER,'') as KLANTPRODUCTNUMMER",
            },
            {
                row: "SERIENUMMER",
                sql: "ifnull(SERIENUMMER,'') as SERIENUMMER",
            },
            {
                row: "PRODUCTIEDATUMTIJD",
                sql: "date2jsondate(PRODUCTIEDATUMTIJD) as PRODUCTIEDATUMTIJD",
            },
            {
                row: "OPMERKING",
                sql: "ifnull(OPMERKING,'') as OPMERKING",
            },
            {
                row: "PRODUCTIEDATUM",
                sql: "date2screendate(PRODUCTIEDATUMTIJD) as PRODUCTIEDATUM",
            },
            {
                row: "PRODUCTNAAM",
                sql: "ifnull((select productnaam from PRODUCT where PRODUCT.productnummer = RETOURPRODUCT.productnummer),'') as PRODUCTNAAM",
            },
            {
                row: "LEVERANCIERPRODUCTNUMMER",
                sql: "ifnull((select leverancierproductnummer from PRODUCT where PRODUCT.productnummer = RETOURPRODUCT.productnummer),'') as LEVERANCIERPRODUCTNUMMER",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "REFERENTIE",
                sql: "REFERENTIE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRODUCTNUMMER",
                sql: "PRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "AANTAL",
                sql: "AANTAL = '?'",
                required: false,
                maxLength: 16,
                default: "",
            },
            {
                body: "KLANTPRODUCTNUMMER",
                sql: "KLANTPRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "SERIENUMMER",
                sql: "SERIENUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRODUCTIEDATUM",
                sql: "PRODUCTIEDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
        ],
    },
}

export class Retourproduct extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let sql = this.createQuerySql(req, res, next, options);
        res.crudConnection = await db.waitConnection();
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doInit(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let result = true;
        let sql: string;
        res.crudConnection = await db.waitConnection();
        sql = `
insert into RETOURPRODUCT (referentie)
select '${req.query.referentie}' from DUAL
where not exists (select 1 from RETOURPRODUCT where referentie = '${req.query.referentie}')`;
        let rows = await db.waitQuery(res.crudConnection, sql);
        //
        sql = "select";
        sql += this.addSelectFields(req, res, next, dict?.query?.fields);
        sql += ` from ${dict?.table}`;
        sql += ` where referentie = '${req.query.referentie}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        //
        res.crudConnection.release();
        res.status(200).send(rows[0]);
        return;
    }

    protected async doOvernemen(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let result = true;
        let sql: string;
        res.crudConnection = await db.waitConnection();
        sql = `
select *,
'${req.query.rowindex}' as rowindex
from PRODUCT 
where id =  '${req.query.productid}'`;
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
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
            this.doSelect(req, res, next, this.dict);
        } else if (action == "init") {
            this.doInit(req, res, next, this.dict);
        } else if (action == "update") {
            Util.unknownOperation(req, res, next);
        } else if (action == "overnemen") {
            this.doOvernemen(req, res, next, this.dict);
        } else if (method == "GET") {
            this.doQuery(req, res, next, this.dict);
        } else if (method == "PUT" || method == "POST") {
            this.doUpdate(req, res, next, this.dict);
        } else if (method == "DELETE") {
            this.doDelete(req, res, next, this.dict);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }



}
