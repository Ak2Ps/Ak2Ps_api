
import { Action } from '../action';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//

export class EmptyAction extends Action {
    constructor() {
        super(
            "Emptyaction"
        )
    }

    protected async doSelect(req: Request, res: Response, next: NextFunction) {
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        let sql = `select .. as ID, .. as VALUE from empty ...`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        let sql = `select * from empty ...`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixBody(req.body);
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        let sql = `
update empty ...
where id = '${id}'`;
        //
        await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(body);
        return;
    }

    protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixBody(req.body);
        res.crudConnection = await db.waitConnection();
        //
        let sql = `insert into empty ...`;
        //
        let result = await db.waitQuery(res.crudConnection, sql);
        body.ID = db.getInsertId(result);
        res.crudConnection.release();
        res.status(200).send(body);
        return;
    }

    protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let body = db.fixBody(req.body);
        res.crudConnection = await db.waitConnection();
        //
        let id = db.fix(db.getDataId(req));
        let sql = `
delete from empty ...
where id = '${id}'`;
        //
        await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(body);
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
            this.doSelect(req, res, next);
        } else if (method == "GET") {
            this.doQuery(req, res, next);
        } else if (method == "PUT") {
            this.doUpdate(req, res, next);
        } else if (method == "POST") {
            this.doInsert(req, res, next);
        } else if (method == "DELETE") {
            this.doDelete(req, res, next);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
