
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "",
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

export class Ecmtester extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        let result = `
<?xml version="1.0" encoding="UTF-8" ?>
<Batch>
<Number>12345</Number>
<ErrorCode>0</ErrorCode>
<ErrorDescription>OK</ErrorDescription>
</Batch>`;
        //
        // live testdata
        //
        result = '<?xml version="1.0" encoding="UTF-8"?><Batch><Number>12766</Number><ErrorCode>0</ErrorCode><ErrorDescription>OK</ErrorDescription></Batch>';
        //
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
