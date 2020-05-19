import { Crud } from '../crud';
//
import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";

const dict: Dict = {
    table: "PARAM",
    key: [
        {
            body: "NAAM",
            sql: "NAAM",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(NAAM)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "NAAM as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "ucase(NAAM)",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "naam",
                sql: "ucase(NAAM) like ucase('?%')",
            },
            {
                query: "inhoud",
                sql: "ucase(INHOUD) like ucase('?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "NAAM",
                sql: "ifnull(NAAM,'') as NAAM",
            },
            {
                row: "INHOUD",
                sql: "ifnull(INHOUD,'') as INHOUD",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "NAAM",
                sql: "NAAM",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "INHOUD",
                sql: "INHOUD",
                required: false,
                maxLength: 255,
                default: "",
            }
        ],
    },
}

export class Param extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async getParam(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let sql: string;
        let rows: any;
        res.crudConnection = await db.waitConnection();
        sql = `
insert into PARAM (naam,inhoud)
select '${req.body.NAAM}',''
from DUAL
where not exists (
select 1 from PARAM where naam = '${req.body.NAAM}'
)`;
        rows = await db.waitQuery(res.crudConnection, sql);
        //
        sql = `
select 
cast(ID as char) as ID, 
NAAM,
INHOUD
from PARAM
where naam = '${req.body.NAAM}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        //
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async setParam(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let sql: string;
        let rows: any;
        res.crudConnection = await db.waitConnection();
        sql = `
insert into PARAM (naam,inhoud)
select '${req.body.NAAM}',''
from DUAL
where not exists (
select 1 from PARAM where naam = '${req.body.NAAM}'
)`;
        rows = await db.waitQuery(res.crudConnection, sql);
        //
        sql = `
update PARAM set
inhoud = '${req.body.INHOUD}'
where naam = '${req.body.NAAM}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        //
        sql = `
select 
cast(ID as char) as ID, 
NAAM,
INHOUD
 from PARAM
where naam = '${req.body.NAAM}'`;
        rows = await db.waitQuery(res.crudConnection, sql);
        //
        res.crudConnection.release();
        let result = {
            NAAM: req.body.NAAM,
            INHOUD: req.body.INHOUD,
            ID: "0"
        }
        res.status(200).send(result);
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
        } else if (method == "GET") {
            this.doQuery(req, res, next, this.dict);
        } else if (method == "PUT" || method == "POST") {
            if (action == "getparam") {
                this.getParam(req, res, next, this.dict);
            } else if (action == "setparam") {
                this.setParam(req, res, next, this.dict);
            } else {
                this.doUpdate(req, res, next, this.dict);
            }
        } else if (method == "DELETE") {
            this.doDelete(req, res, next, this.dict);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }
}
