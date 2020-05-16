import db from "./db";
import { Request, Response, NextFunction } from "express";
import { Util } from "./util";
import { Logger } from "./logger";

export class Action {
    constructor(action: string) {
        Logger.info(`Creating ${action}`);
    }
    protected async doAction(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let result = '';
        res.status(200).send(result);
        return;
    }

    public async routes(req: Request, res: Response, next: NextFunction) {
        //
        let method = req.method;
        let action = db.fix(req.query.action || '');
        //
        Logger.request(req);
        //
        if (action == "select") {
            this.doAction(req, res, next);
        } else if (method == "GET") {
            this.doAction(req, res, next);
        } else if (method == "PUT") {
            this.doAction(req, res, next);
        } else if (method == "POST") {
            this.doAction(req, res, next);
        } else if (method == "DELETE") {
            this.doAction(req, res, next);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }
}
