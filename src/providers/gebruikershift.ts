
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "gebruikershift",
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

export class Gebruikershift extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        res.crudConnection = await db.waitConnection();
        //
        let sql = `
select id, soort, naam from GEBRUIKERPLAN
where gebruiker = ''
order by soort`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        let soort = db.fix(req.body.SOORT || '');
        let naam = db.fix(req.body.NAAM || '');
        let sql = `
update PLANSOORT set
soort = '${soort}',
naam = '${naam}',
where id = '${id}'`;
        //
        await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(req.body);
        return;
    }

    protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
        res.crudConnection = await db.waitConnection();
        //
        let soort = db.fix(req.body.SOORT || '');
        let naam = db.fix(req.body.NAAM || '');
        //
        let sql = `
insert into PLANSOORT
(soort,naam)
values (
'${soort}',
'${naam}'
)`;
        //
        let result = await db.waitQuery(res.crudConnection, sql);
        req.body.ID = db.getInsertId(result);
        res.crudConnection.release();
        res.status(200).send(req.body);
        return;
    }

    protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        let sql = `
delete from PLANSOORT
where id = '${id}'`;
        //
        await db.waitQuery(res.crudConnection, sql);
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
