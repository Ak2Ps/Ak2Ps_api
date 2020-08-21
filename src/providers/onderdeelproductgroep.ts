
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//
const dict: Dict = {
    table: "Onderdeelproductgroep",
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

export class Onderdeelproductgroep extends Crud {
    constructor() {
        super(
            dict
        )
    }


    public static async add(req: Request, res: Response, next: NextFunction, productgroep: string, productnummer: string, level: number) {
        level++;
        if (level > 5) {
            return;
        }
        let sql = `
select productnummer from PRODUCTGROEPREGEL
where productgroep = '${productgroep}'
and IsOnderdeel is null`;
        if (productnummer) {
            sql += ` and productnummer = '${productnummer}'`;
        }
        let rows = await db.waitQuery(res.crudConnection, sql);
        if (rows.length <= 0) {
            return;
        }
        rows.forEach(async (row: any) => {
            let sqlonderdeel = `
select onderdeelnummer
from ONDERDEEL
where productnummer = '${row.productnummer}'`;
            let rowsonderdeel = await db.waitQuery(res.crudConnection, sqlonderdeel);
            rowsonderdeel.forEach(async (rowonderdeel: any) => {
                let sqlinsert = `
insert into PRODUCTGROEPREGEL (productgroep,productnummer,IsOnderdeel)
select '${productgroep}',rowonderdeel.onderdeelnummer),'1' from DUAL
where not exists (select 1 from PRODUCTGROEPREGEL
where productgroep = '${productgroep}'
and productnummer = '${rowonderdeel.onderdeelnummer}')`;
                let result = await db.waitQuery(res.crudConnection, sqlinsert);
                await Onderdeelproductgroep.add(req, res, next, productgroep, rowonderdeel.onderdeelnummer, level);
            });
        });
    }

    public static async delete(req: Request, res: Response, next: NextFunction, productgroep: string) {
        let sql = `
delete from PRODUCTGROEPREGEL
where productgroep ='${productgroep}'
and IsOnderdeel is not null`;
        await db.waitQuery(res.crudConnection, sql);
        return;
    }
}
