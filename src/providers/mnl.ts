
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import * as fs from "fs";
import { Config } from '../config';
//
const dict: Dict = {
    table: "mnl",
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

export class Mnl extends Crud {
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
select id,
concat(substr(id,5,4),substr(id,9,2),substr(id,11,2)) as YYYYMMDD,
concat(substr(id,11,2),\'-\',substr(id,9,2),\'-\',substr(id,5,4)) as NAAM
from (
select ' ' as id from DUAL`;

        let scandir = Config.appDir + "/pdf";
        try {
            fs.readdirSync(scandir).forEach((file) => {
                let ext = String(file).split('.').pop();
                if (ext?.toUpperCase() == "PDF") {
                    if (file.toUpperCase().indexOf("MNL_") == 0) {
                        sql += `
    union
    select '${db.fix(file)}'
    from dual`;
                    }
                }
            });
        } catch (error){
                
        }
        sql += `
) BASE where BASE.ID <> ' '
order by  YYYYMMDD desc`;
        //
        let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(rows);
        return;
    }

    protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let id = db.fix(db.getDataId(req));
        fs.unlinkSync(Config.appDir + "/pdf/" + id);
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
            Util.unknownOperation(req, res, next);
        } else if (method == "POST") {
            Util.unknownOperation(req, res, next);
        } else if (method == "DELETE") {
            this.doDelete(req, res, next, this.dict);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
