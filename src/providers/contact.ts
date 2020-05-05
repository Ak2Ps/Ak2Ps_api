
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "contact",
    key: [
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "",
        where: [
        ],
        fields: [
        ],
    },
    query: {
        orderby: "",
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

export class Contact extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let klantnummer = db.fix(req.query.klantnummer || '');
        //
        res.crudConnection = await db.waitConnection();
        //
        let sql = `
select distinct contact,telefoon,fax,email from (
select contact,telefoon,fax,email from RETOURKLANT 
where not isnull(contact)`;
        if (klantnummer != '') {
            sql += `
and klantnummer = '${klantnummer}'`;
        }
        sql += `
union
select contact,telefoon,fax,email from KLANT where not isnull(contact)`;
        if (klantnummer != '') {
            sql += `
and klantnummer = '${klantnummer}'`;
        }
        sql += `
) BASE_A
order by contact`;
        //
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
            Util.unknownOperation(req, res, next);
        } else if (method == "GET") {
            this.doQuery(req, res, next, this.dict);
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
