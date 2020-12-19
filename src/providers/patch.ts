
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import { Config } from "../config";
//
const dict: Dict = {
    table: "patch",
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

export class Patch extends Crud {
    constructor() {
        super(
            dict
        )
    }


    protected async getVersion(req: Request, res: Response, next: NextFunction) {
        //
        let query = db.fixQuery(req.query);
        let result = '2016.1';
        //
        let sql = `select inhoud from PARAM where naam = 'VERSIE'`;
        let rows = await db.waitDDL(res.crudConnection, sql);
        if (rows[0]) {
            result = rows[0].INHOUD;
        }
        //
        return result;
    }

    protected async setVersion(req: Request, res: Response, next: NextFunction, version: string) {
        //
        let query = db.fixQuery(req.query);
        let sql = '';
        //
        sql = `
insert into PARAM
(NAAM,INHOUD)
select
'VERSIE',
'${db.fix(version)}'
from DUAL 
where not exists (
select 1 from PARAM
where NAAM= 'VERSIE')`;
        await db.waitDDL(res.crudConnection, sql);
        //
        sql = `
update PARAM set 
INHOUD = '${version}'
where NAAM = 'VERSIE'`;
        await db.waitDDL(res.crudConnection, sql);
        //
        return version;
    }

    protected async addBb(req: Request, res: Response, next: NextFunction, bb: string, omschrijving: string) {
        //
        let query = db.fixQuery(req.query);
        //
        let sql = `
insert into BB 
(Bb,Omschrijving)
select
'${bb}',
'${db.fix(omschrijving)}'
from DUAL 
where not exists (
select 1 from BB 
where Bb = '${db.fix(bb)}')`;
        //
        await db.waitDDL(res.crudConnection, sql);
        //
        return;
    }

    protected async addUser(req: Request, res: Response, next: NextFunction, gebruiker: string, naam: string, menu: string, wachtwoord: string) {
        //
        let query = db.fixQuery(req.query);
        //
        let sql = `
insert into GEBRUIKER 
(Gebruiker,Naam,Menu,Wachtwoord,aktief)
select
'${db.fix(gebruiker)}',
'${db.fix(naam)}',
'${db.fix(menu)}',
'${db.fix(wachtwoord)}',
'1'
from DUAL where not exists 
(select 1 from GEBRUIKER 
where gebruiker = '${db.fix(gebruiker)}') `;
        //
        await db.waitDDL(res.crudConnection, sql);
        //
        return;
    }

    protected async addMenu(req: Request, res: Response, next: NextFunction, menu: string) {
        //
        let query = db.fixQuery(req.query);
        //
        let sql = `
insert into MENU_2015 
(Menu)
values
(
'${db.fix(menu)}'
)`;
        //
        await db.waitDDL(res.crudConnection, sql);
        //
        return;
    }

    protected async addOption(req: Request, res: Response, next: NextFunction, menu: string, volgnummer: number, omschrijving: string, submenu: string, link: string) {
        //
        let query = db.fixQuery(req.query);
        //
        let sql = `
insert into MENUREGEL_2015 
(Menu,Volgnummer,Omschrijving,Submenu,Link)
values (
'${db.fix(menu)}',
'${String(volgnummer)}',
'${db.fix(omschrijving)}',
'${db.fix(submenu)}',
'${db.fix(link)}'
)`;
        //
        await db.waitDDL(res.crudConnection, sql);
        //
        return;
    }


    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        res.crudResult.success = true;
        //
        if (query.action == "init") {
            await this.doInit(req, res, next);
        } else if (query.action == "p1") {
            await this.doP1(req, res, next);
        } else {
            await this.doUtf(req, res, next);
            await this.doAlter(req, res, next);
            await this.doMenu(req, res, next);
            await this.doView(req, res, next);
            await this.doProcedure(req, res, next);
        }
        //
        res.crudConnection.release();
        res.status(200).send(res.crudResult);
        return;
    }

    protected async doInit(req: Request, res: Response, next: NextFunction) {
        //
        Logger.info("Init ...");
        let query = db.fixQuery(req.query);
        //
        res.crudResult.messages.push({ field: "Init", message: "Init is niet van toepassing" });
        //
        return;
    }

    protected async doUtf(req: Request, res: Response, next: NextFunction) {
        //
        Logger.info("DoUtf ...");
        let query = db.fixQuery(req.query);
        //
        let sql = '';
        let rows: any;
        let row: any;
        let sqldetail = '';
        sql = `
SELECT 
table_name,
CONCAT('ALTER TABLE ',  table_name, ' CONVERT TO CHARACTER SET utf8 COLLATE utf8_bin;')
as reorganize
FROM information_schema.tables
WHERE table_schema='${Config.dbschema}'
AND table_collation != 'utf8_bin'`;
        rows = await db.waitDDL(res.crudConnection, sql);
        for (let irow = 0; irow < rows.length; irow++) {
            row = rows[irow];
            sqldetail = `
${row.REORGANIZE}`;
            Logger.info(sqldetail);
            await db.waitDDL(res.crudConnection, sqldetail);
            res.crudResult.messages.push({ field: row.TABLE_NAME, message: sqldetail });
        }
        //
        res.crudResult.messages.push({ field: "Utf", message: "doUtf uitgevoerd ..." });
        //
        return;
    }

    protected async doP1(req: Request, res: Response, next: NextFunction) {
        //
        Logger.info("DoP1 ...");
        let query = db.fixQuery(req.query);
        //
        let sql = '';
        let rows: any;
        let row: any;
        let sqldetail = '';
        sql = `
		select 
		bewerking.bewerkingsnummer,
		bewerking.einddatumtijd,productieaantal, 
		min(bewerkingaantal) as minaantal,
		max(bewerkingaantal) as maxaantal from
			bewerking,
			(
			select 
				bewerkingsnummer,bewerkingsoort,
				sum(bewerkingaantal) as bewerkingaantal from 
					BEWERKINGFLOW group by bewerkingsnummer, bewerkingsoort
			) s1
		where bewerking.bewerkingsnummer = s1.bewerkingsnummer
		group by bewerkingsnummer
		having (productieaantal < min(bewerkingaantal) or productieaantal > max(bewerkingaantal))
		and productieaantal < 0
		order by einddatumtijd,bewerkingsnummer`;
        rows = await db.waitDDL(res.crudConnection, sql);
        for (let irow = 0; irow < rows.length; irow++) {
            row = rows[irow];
            sqldetail = `
update bewerking 
set productieaantal =  '${row.MAXAANTAL}'`;
            await db.waitDDL(res.crudConnection, sqldetail);
        }
        //
        res.crudResult.messages.push({ field: "P1", message: "P1 uitgevoerd ..." });
        //
        return;
    }

    protected async doAlter(req: Request, res: Response, next: NextFunction) {
        //
        Logger.info("DoAlter ...");
        let query = db.fixQuery(req.query);
        //
        let sql = ``;
        let rows: any;
        let row: any;
        let sqldetail = '';
        //
        let thisVersion = await this.getVersion(req, res, next);
        // 2016.1
        if (thisVersion == '2016.1') {
            Logger.info("DoAlter 2016.1 ...");
            sql = `
            select *, 
            upper(table_name) as new_name 
            from information_schema.tables
            where table_schema = '${Config.dbschema}'`;
            rows = db.waitDDL(res.crudConnection, sql);
            for (let irow = 0; irow < rows.length; irow++) {
                row = rows[irow];
                if (row.TABLE_NAME != row.NEW_NAME) {
                    sqldetail = 'alter table '
                        + row.TABLE_NAME
                        + ' rename '
                        + row.NEW_NAME + ' ';
                    await db.waitDDL(res.crudConnection, sqldetail);
                }
                if (String(row.ENGINE).toUpperCase() != 'INNODB') {
                    sqldetail = 'alter table '
                        + row.TABLE_NAME
                        + ' engine = InnoDB ';
                    await db.waitDDL(res.crudConnection, sqldetail);
                }
                if (String(row.TABLE_COLLATION).toUpperCase() != 'utf8_general_ci'.toUpperCase()) {
                    sqldetail = 'alter table '
                        + row.TABLE_NAME
                        + ' CHARACTER SET utf8 ';
                    await db.waitDDL(res.crudConnection, sqldetail);
                }
                sqldetail = 'alter table '
                    + row.TABLE_NAME
                    + ' convert to CHARACTER SET utf8 ';
                await db.waitDDL(res.crudConnection, sqldetail);
            }
            thisVersion = await this.setVersion(req, res, next, '2020.1');
        }
        // 2020.1
        if (thisVersion == '2020.1') {
            Logger.info("DoAlter 2020.1 ...");
            sql = `
insert into PARAM 
(inhoud,naam) 
select 
'01-01-2019',
'EXACTSTART' 
from dual
where not exists (
select 1 from PARAM 
where naam = 'EXACTSTART')`;
            await db.waitDDL(res.crudConnection, sql);
            thisVersion = await this.setVersion(req, res, next, '2020.2');
        }
        // 2020.2
        if (thisVersion == '2020.2') {
            Logger.info("DoAlter 2020.2 ...");
            //thisVersion = await this.setVersion(req,res,next, '2020.3');
            sql = `
drop table menu`;
            await db.waitDDL(res.crudConnection, sql);
            sql = `
drop table menuregel`;
            await db.waitDDL(res.crudConnection, sql);
            sql = `
alter table param
ADD COLUMN Opmerking LONGTEXT NULL DEFAULT NULL AFTER Inhoud
`;
            await db.waitDDL(res.crudConnection, sql);
            sql = `
delete from param 
where NAAM in (
'BBADMIN','BBMOD','BBSMTP',
'RETOURENDIR','BESTELLINGENDIR',
'ECMURL',
'EXACTSERVER','EXACT','DIVISION'
)`;
            await db.waitDDL(res.crudConnection, sql);
            sql = `
update param set opmerking = '' where opmerking is null`
            await db.waitDDL(res.crudConnection, sql);
        }
        //
        res.crudResult.messages.push({ field: "Patch", message: `database upgraded to version ${thisVersion} ...` });
        //
        return;
    }

    protected async doMenu(req: Request, res: Response, next: NextFunction) {
        //
        Logger.info("DoMenu ...");
        let query = db.fixQuery(req.query);
        res.crudResult.success = true;
        let sql = '';
        //
        // default gebruikers
        //
        Logger.info("DoMenu default gebruikers ...");
        await this.addUser(req, res, next, 'Gast', 'Gast', 'Gast', '');
        await this.addUser(req, res, next, 'Admin', 'Admin', 'Admin', '');
        await this.addUser(req, res, next, 'Super', 'Super', 'Super', 'super');
        //
        await this.addUser(req, res, next, 'Inkoop', 'Inkoop', 'Inkoop', 'inkoop');
        await this.addUser(req, res, next, 'Verkoop', 'Verkoop', 'Verkoop', 'verkoop');
        await this.addUser(req, res, next, 'Orderdesk', 'Orderdesk', 'Orderdesk', 'orderdesk');
        await this.addUser(req, res, next, 'Magazijn', 'Magazijn', 'Magazijn', 'magazijn');
        await this.addUser(req, res, next, 'Productie', 'Productie', 'Productie', 'productie');
        await this.addUser(req, res, next, 'RenD', 'RenD', 'RenD', 'rend');
        await this.addUser(req, res, next, 'Planning', 'Planning', 'Planning', 'planning');
        //
        await this.addUser(req, res, next, 'HoofdVerkoop', 'HoofdVerkoop', 'HoofdVerkoop', 'hoofdVerkoop');
        await this.addUser(req, res, next, 'HoofdInkoop', 'HoofdInkoop', 'HoofdInkoop', 'hoofdInkoop');
        await this.addUser(req, res, next, 'HoofdOrderdesk', 'HoofdOrderdesk', 'HoofdOrderdesk', 'hoofdOrderdesk');
        await this.addUser(req, res, next, 'HoofdRenD', 'HoofdRenD', 'HoofdRenD', 'hoofdrend');
        //
        await this.addUser(req, res, next, 'Zegwaard', 'Zegwaard', 'Zegwaard', 'zegwaard');
        //
        // Menu inhoud
        //
        sql = `delete from MENU_2015`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `delete from MENUREGEL_2015`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // Menus
        //
        Logger.info("DoMenu menu's ...");
        await this.addMenu(req, res, next, 'Gast');
        await this.addMenu(req, res, next, 'Admin');
        await this.addMenu(req, res, next, 'Super');
        await this.addMenu(req, res, next, 'Verkoop');
        await this.addMenu(req, res, next, 'Inkoop');
        await this.addMenu(req, res, next, 'Orderdesk');
        await this.addMenu(req, res, next, 'Magazijn');
        await this.addMenu(req, res, next, 'Werkvoorbereiding');
        await this.addMenu(req, res, next, 'Productie');
        await this.addMenu(req, res, next, 'RenD');
        await this.addMenu(req, res, next, 'Planning');
        await this.addMenu(req, res, next, 'HoofdVerkoop');
        await this.addMenu(req, res, next, 'HoofdInkoop');
        await this.addMenu(req, res, next, 'HoofdOrderdesk');
        await this.addMenu(req, res, next, 'HoofdRenD');
        await this.addMenu(req, res, next, 'Zegwaard');
        await this.addMenu(req, res, next, 'User');
        //
        Logger.info("DoMenu options ...");
        await this.addOption(req, res, next, 'Gast', 1, 'Home', 'SubGastAfmelden', '');
        //
        await this.addOption(req, res, next, 'Admin', 1, 'Home', 'SubAdminAfmelden', '');
        await this.addOption(req, res, next, 'Admin', 2, 'Beheer', 'SubBeheer', '');
        await this.addOption(req, res, next, 'Admin', 3, 'Klok', 'SubKlok', '');
        await this.addOption(req, res, next, 'Admin', 4, 'Importeren', 'SubImport', '');
        await this.addOption(req, res, next, 'Admin', 5, 'Overzichten', 'SubLijst', '');
        await this.addOption(req, res, next, 'Admin', 6, 'Werkvoorbereiding', 'SubWerkvoorbereiding', '');
        await this.addOption(req, res, next, 'Admin', 7, 'Productie', 'SubProductie', '');
        await this.addOption(req, res, next, 'Admin', 8, 'Inkoop', 'SubInkoop', '');
        await this.addOption(req, res, next, 'Admin', 9, 'Orderadministratie', 'SubOrder', '');
        await this.addOption(req, res, next, 'Admin', 10, 'Retouren', 'SubRetouren', '');
        await this.addOption(req, res, next, 'Admin', 11, 'Rapportage', 'SubRapportage', '');
        //
        await this.addOption(req, res, next, 'Super', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'Super', 2, 'Beheer', 'SubSuperBeheer', '');
        await this.addOption(req, res, next, 'Super', 3, 'Klok', 'SubKlok', '');
        await this.addOption(req, res, next, 'Super', 4, 'Importeren', 'SubImport', '');
        await this.addOption(req, res, next, 'Super', 5, 'Overzichten', 'SubLijst', '');
        await this.addOption(req, res, next, 'Super', 6, 'Werkvoorbereiding', 'SubWerkvoorbereiding', '');
        await this.addOption(req, res, next, 'Super', 7, 'Productie', 'SubProductie', '');
        await this.addOption(req, res, next, 'Super', 8, 'Inkoop', 'SubInkoop', '');
        await this.addOption(req, res, next, 'Super', 9, 'Orderadministratie', 'SubOrder', '');
        await this.addOption(req, res, next, 'Super', 9, 'Retouren', 'SubRetouren', '');
        await this.addOption(req, res, next, 'Super', 10, 'Rapportage', 'SubRapportage', '');
        //
        await this.addOption(req, res, next, 'Verkoop', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'Verkoop', 4, 'Overzichten', 'SubVerkoopLijst', '');
        await this.addOption(req, res, next, 'Verkoop', 7, 'Orderadministratie', 'SubOrder', '');
        await this.addOption(req, res, next, 'Verkoop', 9, 'Rapportage', 'SubVerkoopRapportage', '');
        //
        await this.addOption(req, res, next, 'Inkoop', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'Inkoop', 4, 'Overzichten', 'SubLijst', '');
        await this.addOption(req, res, next, 'Inkoop', 6, 'Inkoop', 'SubInkoop', '');
        await this.addOption(req, res, next, 'Inkoop', 7, 'Orderadministratie', 'SubOrder', '');
        //
        await this.addOption(req, res, next, 'Orderdesk', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'Orderdesk', 4, 'Overzichten', 'SubOrderdeskLijst', '');
        await this.addOption(req, res, next, 'Orderdesk', 6, 'Inkoop', 'SubInkoop', '');
        await this.addOption(req, res, next, 'Orderdesk', 7, 'Orderadministratie', 'SubOrder', '');
        //
        await this.addOption(req, res, next, 'Magazijn', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'Magazijn', 3, 'Klok', 'SubKlok', '');
        await this.addOption(req, res, next, 'Magazijn', 5, 'Productie', 'SubProductie', '');
        //
        await this.addOption(req, res, next, 'Productie', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'Productie', 3, 'Klok', 'SubKlok', '');
        await this.addOption(req, res, next, 'Productie', 4, 'Productie', 'SubProductieProductie', '');
        //
        await this.addOption(req, res, next, 'RenD', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'RenD', 5, 'Productie', 'SubRenDProductie', '');
        await this.addOption(req, res, next, 'RenD', 8, 'Retouren', 'SubRetouren', '');
        await this.addOption(req, res, next, 'RenD', 9, 'Rapportage', 'SubRenDRapportage', '');
        //
        await this.addOption(req, res, next, 'Planning', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'Planning', 2, 'Klok', 'SubKlok', '');
        await this.addOption(req, res, next, 'Planning', 3, 'Beheer', 'SubPlanningBeheer', '');
        await this.addOption(req, res, next, 'Planning', 4, 'Overzichten', 'SubLijst', '');
        await this.addOption(req, res, next, 'Planning', 5, 'Productie', 'SubProductie', '');
        await this.addOption(req, res, next, 'Planning', 9, 'Rapportage', 'SubPlanningRapportage', '');
        //
        await this.addOption(req, res, next, 'HoofdVerkoop', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'HoofdVerkoop', 4, 'Overzichten', 'SubLijst', '');
        await this.addOption(req, res, next, 'HoofdVerkoop', 5, 'Productie', 'SubProductie', '');
        await this.addOption(req, res, next, 'HoofdVerkoop', 6, 'Inkoop', 'SubInkoop', '');
        await this.addOption(req, res, next, 'HoofdVerkoop', 7, 'Orderadministratie', 'SubOrder', '');
        await this.addOption(req, res, next, 'HoofdVerkoop', 8, 'Retouren', 'SubZegwaardRetouren', '');
        await this.addOption(req, res, next, 'HoofdVerkoop', 9, 'Rapportage', 'SubHoofdVerkoopRapportage', '');
        //
        await this.addOption(req, res, next, 'HoofdInkoop', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'HoofdInkoop', 4, 'Overzichten', 'SubLijst', '');
        await this.addOption(req, res, next, 'HoofdInkoop', 5, 'Productie', 'SubProductie', '');
        await this.addOption(req, res, next, 'HoofdInkoop', 6, 'Inkoop', 'SubInkoop', '');
        await this.addOption(req, res, next, 'HoofdInkoop', 7, 'Orderadministratie', 'SubOrder', '');
        await this.addOption(req, res, next, 'HoofdInkoop', 9, 'Rapportage', 'SubHoofdInkoopRapportage', '');
        //
        await this.addOption(req, res, next, 'HoofdOrderdesk', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'HoofdOrderdesk', 4, 'Overzichten', 'SubLijst', '');
        await this.addOption(req, res, next, 'HoofdOrderdesk', 5, 'Productie', 'SubProductie', '');
        await this.addOption(req, res, next, 'HoofdOrderdesk', 6, 'Inkoop', 'SubInkoop', '');
        await this.addOption(req, res, next, 'HoofdOrderdesk', 7, 'Orderadministratie', 'SubOrder', '');
        await this.addOption(req, res, next, 'HoofdOrderdesk', 8, 'Retouren', 'SubZegwaardRetouren', '');
        await this.addOption(req, res, next, 'HoofdOrderdesk', 9, 'Rapportage', 'SubHoofdOrderdeskRapportage', '');
        //
        await this.addOption(req, res, next, 'HoofdRenD', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'HoofdRenD', 2, 'Beheer', 'SubRenDBeheer', '');
        await this.addOption(req, res, next, 'HoofdRenD', 4, 'Overzichten', 'SubLijst', '');
        await this.addOption(req, res, next, 'HoofdRenD', 5, 'Productie', 'SubProductie', '');
        await this.addOption(req, res, next, 'HoofdRenD', 6, 'Inkoop', 'SubInkoop', '');
        await this.addOption(req, res, next, 'HoofdRenD', 7, 'Orderadministratie', 'SubOrder', '');
        await this.addOption(req, res, next, 'HoofdRenD', 8, 'Retouren', 'SubRetouren', '');
        await this.addOption(req, res, next, 'HoofdRenD', 9, 'Rapportage', 'SubHoofdRenDRapportage', '');
        //
        await this.addOption(req, res, next, 'Zegwaard', 1, 'Home', 'SubAfmelden', '');
        await this.addOption(req, res, next, 'Zegwaard', 2, 'Klok', 'SubKlok', '');
        await this.addOption(req, res, next, 'Zegwaard', 5, 'Productie', 'SubProductie', '');
        await this.addOption(req, res, next, 'Zegwaard', 8, 'Retouren', 'SubZegwaardRetouren', '');
        //
        await this.addOption(req, res, next, 'User', 1, 'Home', 'SubAfmelden', '');
        //
        // Hoofdmenu
        //
        await this.addOption(req, res, next, 'SubGastAfmelden', 1, 'Dashboard', '', 'showBb("Home")');
        await this.addOption(req, res, next, 'SubGastAfmelden', 2, 'Afmelden', '', 'navigate("index.html")');
        //
        await this.addOption(req, res, next, 'SubAfmelden', 1, 'Dashboard', '', 'showBb("Home")');
        await this.addOption(req, res, next, 'SubAfmelden', 2, 'Afmelden', '', 'navigate("index.html")');
        await this.addOption(req, res, next, 'SubAfmelden', 3, 'Mijn gegevens', '', 'showPage("gebruikerinfo.html")');
        //
        await this.addOption(req, res, next, 'SubAdminAfmelden', 1, 'Dashboard', '', 'showBb("Home")');
        await this.addOption(req, res, next, 'SubAdminAfmelden', 2, 'Afmelden', '', 'navigate("index.html")');
        await this.addOption(req, res, next, 'SubAdminAfmelden', 3, 'Mijn gegevens', '', 'showPage("gebruikerinfo.html")');
        await this.addOption(req, res, next, 'SubAdminAfmelden', 4, 'Dashboard bericht', '', 'insertBb("Home")');
        //
        // Beheer
        //
        await this.addOption(req, res, next, 'SubBeheer', 1, 'Gebruikers', '', 'showPage("gebruiker.html")');
        await this.addOption(req, res, next, 'SubBeheer', 3, 'Menuregels', '', 'showPage("menuregel.html")');
        await this.addOption(req, res, next, 'SubBeheer', 4, 'Parameters', '', 'showPage("param.html")');
        await this.addOption(req, res, next, 'SubBeheer', 6, 'Log Info', '', 'showPage("loginfo.html")');
        await this.addOption(req, res, next, 'SubBeheer', 7, 'Uitvalcodes', '', 'showPage("uitval.html")');
        await this.addOption(req, res, next, 'SubBeheer', 8, 'Bewerkingsoorten', '', 'showPage("bewerkingsoort.html")');
        await this.addOption(req, res, next, 'SubBeheer', 9, 'Standaard uurtarief', '', 'showPage("uurtarief.html")');
        await this.addOption(req, res, next, 'SubBeheer', 10, 'Pauze', '', 'showPage("pauze.html")');
        await this.addOption(req, res, next, 'SubBeheer', 11, 'Afdelingen', '', 'showPage("afdeling.html")');
        await this.addOption(req, res, next, 'SubBeheer', 12, 'Productgroepen', '', 'showPage("productgroep.html")');
        await this.addOption(req, res, next, 'SubBeheer', 13, 'Productlijnen', '', 'showPage("productlijn.html")');
        await this.addOption(req, res, next, 'SubBeheer', 14, 'Startaantal verschil', '', 'showPage("bewerkingverschil.html")');
        await this.addOption(req, res, next, 'SubBeheer', 15, 'Retourtypes', '', 'showPage("retourtype.html")');
        await this.addOption(req, res, next, 'SubBeheer', 16, 'Retourtermijnen', '', 'showPage("retourtermijn.html")');
        await this.addOption(req, res, next, 'SubBeheer', 17, 'RetourUitvoerders', '', 'showPage("retourgebruiker.html")');
        await this.addOption(req, res, next, 'SubBeheer', 18, 'RetourGarantieopties', '', 'showPage("retourgarantie.html")');
        await this.addOption(req, res, next, 'SubBeheer', 19, 'RetourActietypes', '', 'showPage("retouractietype.html")');
        await this.addOption(req, res, next, 'SubBeheer', 20, 'Plansoorten', '', 'showPage("plansoort.html")');
        await this.addOption(req, res, next, 'SubBeheer', 21, 'Update versie', '', 'showWindow("patch.php")');
        await this.addOption(req, res, next, 'SubBeheer', 22, 'Status', '', 'showPage("status.html")');
        //
        await this.addOption(req, res, next, 'SubSuperBeheer', 1, 'Gebruikers', '', 'showPage("gebruiker.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 7, 'Uitvalcodes', '', 'showPage("uitval.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 8, 'Bewerkingsoorten', '', 'showPage("bewerkingsoort.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 9, 'Standaard uurtarief', '', 'showPage("uurtarief.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 10, 'Pauze', '', 'showPage("pauze.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 11, 'Afdelingen', '', 'showPage("afdeling.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 12, 'Productgroepen', '', 'showPage("productgroep.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 13, 'Productlijnen', '', 'showPage("productlijn.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 16, 'Retourtypes', '', 'showPage("retourtype.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 17, 'Retourtermijnen', '', 'showPage("retourtermijn.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 18, 'RetourUitvoerders', '', 'showPage("retourgebruiker.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 19, 'RetourGarantieopties', '', 'showPage("retourgarantie.html")');
        await this.addOption(req, res, next, 'SubSuperBeheer', 20, 'RetourActietypes', '', 'showPage("retouractietype.html")');
        //
        await this.addOption(req, res, next, 'SubPlanningBeheer', 1, 'Gebruikers', '', 'showPage("gebruiker.html")');
        //
        await this.addOption(req, res, next, 'SubRenDBeheer', 9, 'Standaard uurtarief', '', 'showPage("uurtarief.html")');
        //
        // klok
        //
        await this.addOption(req, res, next, 'SubKlok', 1, 'Klok', '', 'showPage("gebruikertijd.html")');
        await this.addOption(req, res, next, 'SubKlok', 2, 'Calender', '', 'showPage("calender.html")');
        //
        // Import
        //
        await this.addOption(req, res, next, 'SubImport', 1, 'Herstel verbinding met Exact deel1', '', 'showPage("exact.html?getcode=1")');
        await this.addOption(req, res, next, 'SubImport', 2, 'Herstel verbinding met Exact deel2', '', 'showPage("exact2.html?getfirstrefresh=1")');
        await this.addOption(req, res, next, 'SubImport', 11, 'Alle gegevens importeren en doorrekenen', '', 'showPage("upload.html")');
        await this.addOption(req, res, next, 'SubImport', 12, 'Operationele gegevens importeren', '', 'showPage("upload.html?OperationalOnly=1")');
        await this.addOption(req, res, next, 'SubImport', 13, 'Bestellingen importeren', '', 'showPage("upload.html?OperationalOnly=2")');
        await this.addOption(req, res, next, 'SubImport', 14, 'Bewerkingen importeren', '', 'showPage("upload.html?OperationalOnly=3")');
        await this.addOption(req, res, next, 'SubImport', 15, 'Orders importeren', '', 'showPage("upload.html?OperationalOnly=4")');
        await this.addOption(req, res, next, 'SubImport', 16, 'Doorrekenen', '', 'showPage("calc.html")');
        await this.addOption(req, res, next, 'SubImport', 17, 'Logging', '', 'showBb("Log")');
        //
        // Lijst
        //
        await this.addOption(req, res, next, 'SubLijst', 1, 'Leveranciers', '', 'showPage("leverancier.html")');
        await this.addOption(req, res, next, 'SubLijst', 2, 'Klanten', '', 'showPage("klant.html")');
        await this.addOption(req, res, next, 'SubLijst', 3, 'Producten/startvoorraad', '', 'showPage("product.html")');
        await this.addOption(req, res, next, 'SubLijst', 4, 'Stuklijst', '', 'showPage("onderdeel.html")');
        await this.addOption(req, res, next, 'SubLijst', 5, 'Bestellingen', '', 'showPage("bestelling.html")');
        await this.addOption(req, res, next, 'SubLijst', 6, 'Orders', '', 'showPage("productvraag.html?sel44=Alle")');
        await this.addOption(req, res, next, 'SubLijst', 7, 'Productie', '', 'showPage("bewerking.html")');
        await this.addOption(req, res, next, 'SubLijst', 8, 'Voorraad', '', 'showPage("productvoorraad.html")');
        await this.addOption(req, res, next, 'SubLijst', 9, 'Vrijgegeven dagen', '', 'showPage("mnl.html")');
        //
        await this.addOption(req, res, next, 'SubVerkoopLijst', 2, 'Klanten', '', 'showPage("klant.html")');
        await this.addOption(req, res, next, 'SubVerkoopLijst', 6, 'Orders', '', 'showPage("productvraag.html?sel44=Alle")');
        await this.addOption(req, res, next, 'SubVerkoopLijst', 8, 'Voorraad', '', 'showPage("productvoorraad.html")');
        //
        await this.addOption(req, res, next, 'SubOrderdeskLijst', 1, 'Leveranciers', '', 'showPage("leverancier.html")');
        await this.addOption(req, res, next, 'SubOrderdeskLijst', 2, 'Klanten', '', 'showPage("klant.html")');
        await this.addOption(req, res, next, 'SubOrderdeskLijst', 5, 'Bestellingen', '', 'showPage("bestelling.html")');
        await this.addOption(req, res, next, 'SubOrderdeskLijst', 6, 'Orders', '', 'showPage("productvraag.html?sel44=Alle")');
        await this.addOption(req, res, next, 'SubOrderdeskLijst', 9, 'Vrijgegeven dagen', '', 'showPage("mnl.html")');
        //
        // Werkvoorbereiding
        //
        await this.addOption(req, res, next, 'SubWerkvoorbereiding', 3, 'Werkvoorbereiding', '', 'showPage("planning.html?sel44=Nee&action=werkvoorbereiding")');
        //
        // Productie
        //
        await this.addOption(req, res, next, 'SubProductie', 1, 'Logistiek', '', 'showPage("logistiek.html")');
        await this.addOption(req, res, next, 'SubProductie', 2, 'Overzicht', '', 'showPage("bewerking.html")');
        await this.addOption(req, res, next, 'SubProductie', 4, 'Planning', '', 'showPage("planning.html?sel44=Nee&action=planning")');
        await this.addOption(req, res, next, 'SubProductie', 5, 'Lijnplanning', '', 'showPage("planning.html?sel44=Nee&action=lijnplanning")');
        await this.addOption(req, res, next, 'SubProductie', 6, 'Lijnplanning2', '', 'showPage("planning.html?sel44=Nee&action=lijnplanning2")');
        await this.addOption(req, res, next, 'SubProductie', 7, 'Uitleverlijst', '', 'showPage("uitlever.html?productie=1")');
        //
        await this.addOption(req, res, next, 'SubProductieProductie', 2, 'Overzicht', '', 'showPage("bewerking.html")');
        await this.addOption(req, res, next, 'SubProductieProductie', 4, 'Planning', '', 'showPage("planning.html?sel44=Nee&action=planning")');
        await this.addOption(req, res, next, 'SubProductieProductie', 5, 'lijnplanning', '', 'showPage("planning.html?sel44=Nee&action=lijnplanning")');
        await this.addOption(req, res, next, 'SubProductieProductie', 6, 'lijnplanning2', '', 'showPage("planning.html?sel44=Nee&action=lijnplanning2")');
        //
        await this.addOption(req, res, next, 'SubRenDProductie', 3, 'Werkvoorbereiding', '', 'showPage("planning.html?sel44=Nee&action=werkvoorbereiding")');
        //
        // Inkoop
        //
        await this.addOption(req, res, next, 'SubInkoop', 1, 'Voorraad', '', 'showPage("productvoorraad.html")');
        await this.addOption(req, res, next, 'SubInkoop', 2, 'Voorraadbeoordeling', '', 'showPage("voorraad.html")');
        await this.addOption(req, res, next, 'SubInkoop', 3, 'Productgroep', '', 'showPage("bestellingproductgroep.html")');
        await this.addOption(req, res, next, 'SubInkoop', 5, 'Bestellijst', '', 'showPage("inkoop.html")');
        await this.addOption(req, res, next, 'SubInkoop', 6, 'Bestellingen', '', 'showPage("bestellingkop.html")');
        await this.addOption(req, res, next, 'SubInkoop', 7, 'Open bestellingen', '', 'showPage("bestelling.html?inkoop=Ja")');
        await this.addOption(req, res, next, 'SubInkoop', 8, 'Bestellingen die te laat zijn', '', 'showPage("bestellingtelaat.html")');
        await this.addOption(req, res, next, 'SubInkoop', 9, '44 Orders', '', 'showPage("productvraag.html?sel44=Ja")');
        await this.addOption(req, res, next, 'SubInkoop', 10, 'Uitleverlijst', '', 'showPage("uitlever.html")');
        //
        // Order
        //
        await this.addOption(req, res, next, 'SubOrder', 1, '44 Orders', '', 'showPage("productvraag.html?selRo=Ja&sel44=Ja&1=1")');
        await this.addOption(req, res, next, 'SubOrder', 2, 'Uitleverlijst', '', 'showPage("uitlever.html")');
        //
        // Retouren
        //
        await this.addOption(req, res, next, 'SubRetouren', 1, 'Overzichts rapport', '', 'showPage("retourrap.html?rap=rap11")');
        await this.addOption(req, res, next, 'SubRetouren', 2, 'Overzicht R bewerkingen', '', 'showPage("bewerking.html?selR=Ja")');
        await this.addOption(req, res, next, 'SubRetouren', 3, 'Retouren', '', 'showPage("retour.html")');
        await this.addOption(req, res, next, 'SubRetouren', 4, 'Totaal binnengekomen', '', 'showPage("retourrap.html?rap=rap8")');
        await this.addOption(req, res, next, 'SubRetouren', 5, 'Binnengekomen', '', 'showPage("retourrap.html?rap=rap6")');
        await this.addOption(req, res, next, 'SubRetouren', 6, 'Details binnengekomen', '', 'showPage("retourrap.html?rap=rap7")');
        await this.addOption(req, res, next, 'SubRetouren', 7, 'Totaal afgehandeld', '', 'showPage("retourrap.html?rap=rap8b")');
        await this.addOption(req, res, next, 'SubRetouren', 8, 'Afgehandeld', '', 'showPage("retourrap.html?rap=rap5")');
        await this.addOption(req, res, next, 'SubRetouren', 9, 'Details afgehandeld', '', 'showPage("retourrap.html?rap=rap9")');
        await this.addOption(req, res, next, 'SubRetouren', 10, 'Totaal open', '', 'showPage("retourrap.html?rap=rap8c")');
        await this.addOption(req, res, next, 'SubRetouren', 11, 'Details open', '', 'showPage("retourrap.html?rap=rap10")');
        await this.addOption(req, res, next, 'SubRetouren', 12, 'Alle rapporten', '', 'showPage("retourrap.html")');
        //
        await this.addOption(req, res, next, 'SubZegwaardRetouren', 3, 'Retouren', '', 'showPage("retour.html")');
        //
        // Rapportage
        //
        await this.addOption(req, res, next, 'SubRapportage', 1, 'Medewerkers', '', 'showPage("gebruikerrap.html")');
        await this.addOption(req, res, next, 'SubRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")');
        await this.addOption(req, res, next, 'SubRapportage', 3, 'Product uitval', '', 'showPage("productuitvalrap.html")');
        await this.addOption(req, res, next, 'SubRapportage', 4, 'Productie uitval', '', 'showPage("bewerkinguitvalrap.html")');
        //
        await this.addOption(req, res, next, 'SubVerkoopRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")');
        //
        await this.addOption(req, res, next, 'SubRenDRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")');
        await this.addOption(req, res, next, 'SubRenDRapportage', 3, 'Product uitval', '', 'showPage("productuitvalrap.html")');
        await this.addOption(req, res, next, 'SubRenDRapportage', 4, 'Productie uitval', '', 'showPage("bewerkinguitvalrap.html")');
        //
        await this.addOption(req, res, next, 'SubPlanningRapportage', 1, 'Medewerkers', '', 'showPage("gebruikerrap.html")');
        await this.addOption(req, res, next, 'SubPlanningRapportage', 3, 'Product uitval', '', 'showPage("productuitvalrap.html")');
        await this.addOption(req, res, next, 'SubPlanningRapportage', 4, 'Productie uitval', '', 'showPage("bewerkinguitvalrap.html")');
        //
        await this.addOption(req, res, next, 'SubHoofdVerkoopRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")');
        //
        await this.addOption(req, res, next, 'SubHoofdInkoopRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")');
        //
        await this.addOption(req, res, next, 'SubHoofdOrderdeskRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")');
        //
        await this.addOption(req, res, next, 'SubHoofdRenDRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")');
        await this.addOption(req, res, next, 'SubHoofdRenDRapportage', 3, 'Product uitval', '', 'showPage("productuitvalrap.html")');
        await this.addOption(req, res, next, 'SubHoofdRenDRapportage', 4, 'Productie uitval', '', 'showPage("bewerkinguitvalrap.html")');
        //
        // bb
        //
        Logger.info("DoMenu bb ...");
        await this.addBb(req, res, next, 'Home', 'Home');
        await this.addBb(req, res, next, 'Log', 'Log');
        //
        res.crudResult.messages.push({ field: "Menu", message: "Menu uitgevoerd ..." });
        //
        return;
    }

    protected async doView(req: Request, res: Response, next: NextFunction) {
        //
        Logger.info("DoView ...");
        let query = db.fixQuery(req.query);
        //
        let sql = ''
        sql = `
drop view if exists uitvalsoort`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `create view uitvalsoort as
select * from 
(select 'Electrisch' as VALUE
union
select 'Mechanisch'
union
select 'Overig') base;`;
        await db.waitDDL(res.crudConnection, sql);
        //
        res.crudResult.messages.push({ field: "View", message: "View uitgevoerd ..." });
        //
        return;
    }

    protected async doProcedure(req: Request, res: Response, next: NextFunction) {
        //
        Logger.info("DoProcedure ...");
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        let sql = ``;
        //
        //
        // date2screendate: DD-MM-YYYY
        //
        sql = `drop function if exists date2screendate`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `
CREATE FUNCTION date2screendate( parDate datetime )
    RETURNS varchar(10)
BEGIN
    return 
    case 
    when parDate is null then ''
    when parDate = '0000-00-00 00:00:00' then ''
    else DATE_FORMAT(parDate,'%d-%m-%Y')
    end;
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // date2screentime HH24:MI
        //
        sql = `drop function if exists date2screentime`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `
CREATE FUNCTION date2screentime( parDate datetime )
    RETURNS varchar(5)
BEGIN
    return 
    case 
    when parDate is null then ''
    when parDate = '0000-00-00 00:00:00' then ''
    else DATE_FORMAT(parDate,'%H:%i')
    end;
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // date2screendatetime DD-MM-YYYY HH24:MI
        //
        sql = `drop function if exists date2screendatetime`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `
CREATE FUNCTION date2screendatetime( parDate datetime )
    RETURNS varchar(16)
BEGIN
    return 
    case 
    when parDate is null  then ''
    when parDate = '0000-00-00 00:00:00' then ''
    else DATE_FORMAT(parDate,'%d-%m-%Y %H:%i')
    end;
END
`;
        //
        // date2jsondate YYYY-MM-DD HH24:MI:SS
        //
        sql = `drop function if exists date2jsondate`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `
CREATE FUNCTION date2jsondate( parDate datetime )
    RETURNS varchar(19)
BEGIN
    return 
    case 
    when parDate is null  then ''
    when parDate = '0000-00-00 00:00:00' then ''
    else DATE_FORMAT(parDate,'%Y-%m-%d %H:%i:%s')
    end;
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // screendate2date
        //
        sql = `drop function if exists screendate2date`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `
CREATE FUNCTION screendate2date( parDate varchar(10) )
    RETURNS datetime
BEGIN
    return 
    case 
    when parDate is null then null
    when trim(parDate) = '' then null
    else STR_TO_DATE(parDate,'%d-%m-%Y')
    end;
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // screentime2date
        //
        sql = `drop function if exists screentime2date`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `
CREATE FUNCTION screentime2date( parDate varchar(5) )
    RETURNS datetime
BEGIN
    return 
    case 
    when parDate is null then null
    when trim(parDate) = '' then null
    else STR_TO_DATE(parDate,'%H:%i')
    end;
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // screendatetime2date
        //
        sql = `drop function if exists screendatetime2date`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `
CREATE FUNCTION screendatetime2date( parDate varchar(16) )
    RETURNS datetime
BEGIN
    return 
    case 
    when parDate is null then null
    when trim(parDate) = '' then null
    else STR_TO_DATE(parDate,'%d-%m-%Y %H:%i')
    end;
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // jsondate2date
        //
        sql = `drop function if exists jsondate2date`;
        await db.waitDDL(res.crudConnection, sql);
        sql = `
CREATE FUNCTION jsondate2date( parDate varchar(19) )
    RETURNS datetime
BEGIN
    return 
    case 
    when parDate is null then null
    when trim(parDate) = '' then null
    else STR_TO_DATE(parDate,'%Y-%m-%d %H:%i:%s')
    end;
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // getOpenStand
        //
        sql = `drop function if exists getOpenStand`;
        await db.waitDDL(res.crudConnection, sql);

        sql = `
CREATE FUNCTION getOpenStand(
    parProductnummer varchar(50) ,
    parAssets varchar(255) ) 
    RETURNS varchar(1000)
BEGIN
    DECLARE thisProductnummer varchar(50);
    DECLARE thisBewerkingsnummer varchar(10);
    DECLARE thisStand varchar(1000);
    select '' into thisStand;
    select parProductnummer into thisProductnummer;
    select bewerkingsnummer
    into thisBewerkingsnummer
    from bewerking 
        where productnummer = thisProductnummer 
        and (
            isnull(einddatumtijd)
            or 
            exists(
                select 1 from bewerkingflow
                where bewerking.bewerkingsnummer = bewerkingflow.bewerkingsnummer
                and isnull(bewerkingflow.einddatumtijd)
                )
            )
        order by startdatumtijd
        limit 1;
    if ifnull(thisBewerkingsnummer,'') = '' then
        return '';
    end if;
    select
    group_concat(
        concat(
            '<span style="white-space:nowrap;color:black;background-color:',BEWERKINGSOORT.kleur,'">',
            BEWERKINGSOORT.afkorting,
            '(',
            (select SUM(case when BF.einddatumtijd is null then 0 else BF.bewerkingaantal end) 
                from BEWERKINGFLOW BF,BEWERKING BW
                where BW.bewerkingsnummer = thisBewerkingsnummer
                and BF.bewerkingsnummer = thisBewerkingsnummer
                and BF.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
                and exists (select 1 from BEWERKINGFLOW
                    where BEWERKINGFLOW.bewerkingsnummer = thisBewerkingsnummer
                    and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
                    and BEWERKINGFLOW.einddatumtijd is null)
                ),
            ')',
            '</span>',
            (select case when MIN(case when BF.einddatumtijd is null then 0 else 1 end) = 0 
            then concat('<img src="' , parAssets , 'bewerkingopen.png"></img>')
            else concat('<img src="' , parAssets , 'bewerkingclosed.png">/img>')
            end
            from BEWERKINGFLOW BF,BEWERKING BW
            where BW.bewerkingsnummer = thisBewerkingsnummer
            and BF.bewerkingsnummer = thisBewerkingsnummer
            and BF.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
            and exists (select 1 from BEWERKINGFLOW
                where BEWERKINGFLOW.bewerkingsnummer = thisBewerkingsnummer
                and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
                and BEWERKINGFLOW.einddatumtijd is null)
                )
            ) 
            ORDER BY BEWERKINGSOORT.VOLGORDE,BEWERKINGSOORT.BEWERKINGSOORT
            SEPARATOR ', '
            )
        from BEWERKINGSOORT
        into thisStand;
    select concat( thisBewerkingsnummer,': ',ifnull(thisStand,'')) into thisStand from dual;

    RETURN ifnull(thisStand,'');
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // getStand
        //
        sql = `drop function if exists getStand`;
        await db.waitDDL(res.crudConnection, sql);

        sql = `
CREATE FUNCTION getStand(
    parBewerkingsnummer  varchar(10) , 
    parAssets varchar(255) ) 
    RETURNS varchar(1000)
BEGIN
    DECLARE thisBewerkingsnummer varchar(10);
    DECLARE thisStand varchar(1000);
    select '' into thisStand;
    select parBewerkingsnummer into thisBewerkingsnummer;
    if ifnull(thisBewerkingsnummer,'') = '' then
        return '';
    end if;
    select
    group_concat(
        concat(
            '<span style="white-space:nowrap;color:black;background-color:',BEWERKINGSOORT.kleur,'">',
            BEWERKINGSOORT.afkorting,
            '(',
            (select SUM(case when BF.einddatumtijd is null then 0 else BF.bewerkingaantal end) 
                from BEWERKINGFLOW BF,BEWERKING BW
                where BW.bewerkingsnummer = thisBewerkingsnummer
                and BF.bewerkingsnummer = thisBewerkingsnummer
                and BF.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
                and exists (select 1 from BEWERKINGFLOW
                    where BEWERKINGFLOW.bewerkingsnummer = thisBewerkingsnummer
                    and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
                    and BEWERKINGFLOW.einddatumtijd is null)
                ),
            ')',
            '</span>',
            (select case when MIN(case when BF.einddatumtijd is null then 0 else 1 end) = 0 
            then concat('<img src="' , parAssets , 'bewerkingopen.png"></img>')
            else concat('<img src="' , parAssets , 'bewerkingclosed.png">/img>')
            end
            from BEWERKINGFLOW BF,BEWERKING BW
            where BW.bewerkingsnummer = thisBewerkingsnummer
            and BF.bewerkingsnummer = thisBewerkingsnummer
            and BF.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
            and exists (select 1 from BEWERKINGFLOW
                where BEWERKINGFLOW.bewerkingsnummer = thisBewerkingsnummer
                and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort
                and BEWERKINGFLOW.einddatumtijd is null)
                )
            ) 
            ORDER BY BEWERKINGSOORT.VOLGORDE,BEWERKINGSOORT.BEWERKINGSOORT
            SEPARATOR ', '
            )
        from BEWERKINGSOORT
        into thisStand;
    RETURN ifnull(thisStand,'');
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // getLijn
        //
        sql = `drop function if exists getLijn`;
        await db.waitDDL(res.crudConnection, sql);

        sql = `
CREATE FUNCTION getLijn(
    parProductnummer  varchar(50) )
    RETURNS varchar(50)
BEGIN
    DECLARE thisProductnummer varchar(50);
    DECLARE thisLijn varchar(50);
    select '' into thisLijn;
    select parProductnummer into thisProductnummer;
    if ifnull(thisProductnummer,'') = '' then
        return '';
    end if;
    select max(productielijn) into thisLijn 
        from PRODUCTLIJN lijnprdl 
        where lijnprdl.productlijn = 
            (select max(lijn) from PRODUCT lijnprd 
                where lijnprd.productnummer = thisProductnummer);
    if ifnull(thisLijn,'') = '' then
        select max(lijn) into thisLijn from PRODUCT lijnprd
            where lijnprd.productnummer = thisProductnummer;
    end if;                
    RETURN ifnull(thisLijn,'');
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // getKurk
        //
        sql = `drop function if exists getKurk`;
        await db.waitDDL(res.crudConnection, sql);

        sql = `
CREATE FUNCTION getKurk(
    parProductnummer  varchar(50) ,
    parDatumtijd datetime )
    RETURNS varchar(255)
BEGIN
    DECLARE thisProductnummer varchar(50);
    DECLARE thisKurk varchar(255);
    DECLARE thisDatumtijd datetime;
    select '' into thisKurk;
    select parProductnummer into thisProductnummer;
    select parDatumtijd into thisDatumtijd;
    if ifnull(thisProductnummer,'') = '' then
        return '';
    end if;
    if ifnull(thisDatumtijd,'') = '' then
        return '';
    end if;
    select concat(date2screendate(PRODUCTVOORRAAD.beperkdatumtijd),
        ' ',beperknummer) 
        into thisKurk
        from PRODUCTVOORRAAD
        where PRODUCTVOORRAAD.id = 
            (select min(PRODUCTVOORRAAD.id) from PRODUCTVOORRAAD
                where PRODUCTVOORRAAD.productnummer = thisProductnummer
                and PRODUCTVOORRAAD.beperkdatumtijd = 
                    (select min(PRODUCTVOORRAAD.beperkdatumtijd) from PRODUCTVOORRAAD
                        where PRODUCTVOORRAAD.productnummer = thisProductnummer
                        and PRODUCTVOORRAAD.beperkdatumtijd <= thisDatumtijd));
    RETURN ifnull(thisKurk,'');
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // getOpenAantal
        //
        sql = `drop function if exists getOpenAantal`;
        await db.waitDDL(res.crudConnection, sql);

        sql = `
CREATE FUNCTION getOpenAantal(
    parProductnummer varchar(50)) 
    RETURNS varchar(1000)
BEGIN
    DECLARE thisProductnummer varchar(50);
    DECLARE thisOpenAantal varchar(1000);
    select '' into thisOpenAantal;
    select parProductnummer into thisProductnummer;
    select group_concat(
        concat(
            '<span style="white-space:nowrap;color:black;background-color:',
            kleur,
            '">',
            afkorting,
            '(', 
            open_aantal,
            ')', 
            '</span>'
            )
        order by volgorde,bewerkingsoort
        separator ', ')
        into thisOpenAantal from (
        select 
            bewerking.productnummer,
            bewerkingsoort.bewerkingsoort as bewerkingsoort,
            bewerkingsoort.afkorting as afkorting,
            bewerkingsoort.volgorde as volgorde,
            bewerkingsoort.kleur as kleur,
            sum(bewerkingaantal) as open_aantal 
            from bewerking,bewerkingflow,bewerkingsoort
        where bewerking.bewerkingsnummer = bewerkingflow.bewerkingsnummer
        and bewerkingflow.bewerkingsoort = bewerkingsoort.bewerkingsoort
        and bewerking.productnummer = thisProductnummer
        and isnull(bewerkingflow.Einddatumtijd)
        and bewerkingsoort.volgorde != 0
        group by bewerking.productnummer,bewerkingsoort.bewerkingsoort
        order by bewerking.productnummer,bewerkingsoort.bewerkingsoort
        ) base
        group by productnummer;
    RETURN ifnull(thisOpenAantal,'');
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        // getHandtekening
        //
        sql = `drop function if exists getHandtekening`;
        await db.waitDDL(res.crudConnection, sql);

        sql = `
CREATE FUNCTION getHandtekening(
    parContactpersoon varchar(50)) 
    RETURNS varchar(1000)
BEGIN
    select '' into @thisResult;
    select '' into @thisHandtekening;
    select parContactpersoon into @thisContactpersoon;
    select ifnull(min(handtekening),'')
        into @thisHandtekening 
        from gebruiker
        where upper(naam) = upper(@thisContactpersoon);
    if @thisHandtekening = '' then
        select ifnull(min(handtekening),'')
            into @thisHandtekening 
            from gebruiker
            where upper(gebruiker) = upper(@thisContactpersoon);
        if @thisHandtekening = '' then
            select ifnull(min(handtekening),'')
            into @thisHandtekening 
                from gebruiker
                where upper(contactpersoon) = upper(@thisContactpersoon);
        end if;
    end if;
    select @thisHandtekening into @thisResult;
    return @thisResult;
END
`;
        await db.waitDDL(res.crudConnection, sql);
        //
        res.crudResult.messages.push({ field: "Procedure", message: "Procedure uitgevoerd ..." });
        //
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
            this.doQuery(req, res, next, dict);
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
