
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import * as fs from 'fs';
import { Config } from '../config';
import { Retourtextfragmenten } from './retourtextfragmenten';
import { Retour } from './retour';
//
const dict: Dict = {
    table: "retourverzend",
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

export class Retourverzend extends Crud {
    constructor() {
        super(
            dict
        )
    }


    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        res.crudData = {};
        res.crudData.html = '';
        res.crudData.taal = "";
        res.crudData.row = {};
        res.crudData.rowklant = {};
        res.crudData.filename = "";
        res.crudData.targetdir = "";
        res.crudData.targeturl = "";
        //
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        let result = await Retourtextfragmenten.getRetour(req, res, next, "verzend");
        //
        if (String(query.action).indexOf('getfile') >= 0) {
            res.crudData.result = {
                success: "true",
                filename: res.crudData.filename,
            }
            res.status(200).send(res.crudData.result);
            res.crudConnection.release();
            return;
        }
        //
        res.crudData.html += await Retourtextfragmenten.getBarcode(req, res, next, '8em'); //(alleen als zichtbaar)
        res.crudData.html += await Retourtextfragmenten.getHeader(req, res, next, '3em');
        res.crudData.html += await Retourtextfragmenten.getKlantHeaderVerzend(req, res, next, '15em');
        res.crudData.html += await Retourtextfragmenten.getMidTextVerzend(req, res, next, '5em');
        res.crudData.html += await Retourtextfragmenten.getItemsVerzend(req, res, next, '20em');
        res.crudData.html += await Retourtextfragmenten.getGarantie(req, res, next, '4em');
        res.crudData.html += await Retourtextfragmenten.getBottomTextVerzend(req, res, next, '6em');
        res.crudData.html += await Retourtextfragmenten.getOnderschrift(req, res, next, '12em');
        res.crudData.html += await Retourtextfragmenten.getFooter(req, res, next, '2em');
        res.crudData.html += await Retourtextfragmenten.setValues(req, res, next);
        //
        res.status(200).send(res.crudData.html);
        res.crudConnection.release();
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
