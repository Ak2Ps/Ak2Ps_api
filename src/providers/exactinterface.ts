
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import * as fs from "fs"
import { Config } from '../config';
//
const dict: Dict = {
    table: "exactinterface",
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

export class Exactinterface extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doSetcode(req: Request, res: Response, next: NextFunction) {
        //
        let result = '';
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        try {
            if (!fs.existsSync(Config.exactdir)){
                fs.mkdirSync(Config.exactdir);
            }
            fs.writeFileSync(Config.exactdir + "/" + "exactcode.dat",query.code);
            result = "De verbinding met Exact is gecontroleerd, sluit dit window en voer deel2 uit om verder te gaan ...";
        } catch (error){
            result = JSON.stringify(error);
            Logger.error(req,result);
        }
        //
        res.crudConnection.release();
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
            Util.unknownOperation(req, res, next);
        } else if (method == "GET") {
            if (req.path == '/setcode.php'){
                this.doSetcode(req, res, next);
            } else if (req.path == '/getcode.php'){
                } else {
                Util.unknownOperation(req, res, next);
            }
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

