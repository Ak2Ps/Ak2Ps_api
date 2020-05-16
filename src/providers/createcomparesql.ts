
import { Action } from '../action';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
//

export class CreateCompareSql extends Action {
    constructor() {
        super(
            "CreateCompareSql"
        )
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction) {
        //
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        //
        let sql = '';
        //
        //
        //
        if (query.action == 'leverancier' || query.action == 'all') {
            sql += `
-- delete from ak2.leverancier;
select * from 
(SELECT ak2.leverancier.* FROM ak2.leverancier) TAS
right join
(select ak2psdata.leverancier.* from ak2psdata.leverancier) SAV
on TAS.LEVERANCIERNUMMER = SAV.LEVERANCIERNUMMER
where TAS.id is not null
and (
TAS.NAAM != SAV.NAAM
or TAS.ZOEKCODE != SAV.ZOEKCODE
or TAS.Adres != SAV.adres
or TAS.woonplaats != SAV.woonplaats
or TAS.postcode != SAV.postcode
or TAS.telefoon != SAV.telefoon
or TAS.fax != SAV.fax
or TAS.email != SAV.email
or TAS.categorie != SAV.categorie
or ifnull(TAS.leverdagen,0) != ifnull(SAV.leverdagen,0)
)
order by sav.leveranciernummer;
`;
        }
        //
        //
        //
        if (query.action == 'klant' || query.action == 'all') {
            sql += `
-- delete from ak2.klant;
select * from 
(SELECT * FROM ak2.klant) TAS
right join
(select * from ak2psdata.klant) SAV
on TAS.klantnummer = SAV.klantnummer
where 
TAS.id is not null
and (
TAS.NAAM != SAV.NAAM
or TAS.ZOEKCODE != SAV.ZOEKCODE
or TAS.Adres != SAV.adres
or TAS.woonplaats != SAV.woonplaats
or TAS.postcode != SAV.postcode
or TAS.telefoon != SAV.telefoon
or TAS.fax != SAV.fax
or TAS.email != SAV.email
or TAS.categorie != SAV.categorie
or TAS.contact != SAV.contact
or TAS.land != SAV.land
or ifnull(TAS.leverdagen,0) != ifnull(SAV.leverdagen,0)
)
order by sav.klantnummer
`;
        }
        //
        //
        //
        if (query.action == 'product' || query.action == 'all') {
            sql += `
-- delete from ak2.product;
select * from 
(SELECT * FROM ak2.product) TAS
right join
(select * from ak2psdata.product) SAV
on TAS.productnummer = SAV.productnummer
where 
TAS.id is not null
and (
ifnull(TAS.productnaam,'') != ifnull(SAV.productnaam,'')
or ifnull(TAS.voorraad,0) != ifnull(SAV.voorraad,0)
or ifnull(TAS.voorraaddatumtijd,'') != ifnull(SAV.voorraaddatumtijd,'')
or ifnull(TAS.eindvoorraad,0) != ifnull(SAV.eindvoorraad,0)
or ifnull(TAS.tepicken,0) != ifnull(SAV.tepicken,0)
or ifnull(TAS.tebestellen,0) != ifnull(SAV.tebestellen,0)
or ifnull(TAS.soort,0) != ifnull(SAV.soort,0)
or ifnull(TAS.lijn,'') != ifnull(SAV.lijn,'')
or ifnull(TAS.performance,0) != ifnull(SAV.performance,0)
or ifnull(TAS.inkoopprijs,0) != ifnull(SAV.inkoopprijs,0)
or ifnull(TAS.inkoopprijsgemiddeld,0) != ifnull(SAV.inkoopprijsgemiddeld,0)
or ifnull(TAS.leverdagen,0) != ifnull(SAV.leverdagen,0)
or ifnull(TAS.locatie,'') != ifnull(SAV.locatie,'')
or ifnull(TAS.leveranciernummer,'') != ifnull(SAV.leveranciernummer,'')
or ifnull(TAS.leverancierproductnummer,'') != ifnull(SAV.leverancierproductnummer,'')
)
order by sav.productnummer
`;
        }
        //
        //
        //
        if (query.action == 'onderdeel' || query.action == 'all') {
            sql += `
-- delete from ak2.onderdeel;
select * from 
(SELECT * FROM ak2.onderdeel) TAS
right join
(select * from ak2psdata.onderdeel) SAV
on TAS.productnummer = SAV.productnummer
and TAS.onderdeelnummer = SAV.onderdeelnummer
where 
TAS.id is not null
and (
ifnull(TAS.faktor,0) != ifnull(SAV.faktor,0)
)
order by sav.productnummer,sav.onderdeelnummer
`;
        }
        //
        //
        //
        if (query.action == 'bestelling' || query.action == 'all') {
            sql += `
-- delete from ak2.bestelling;
select * from 
(SELECT * FROM ak2.bestelling) TAS
right join
(select * from ak2psdata.bestelling) SAV
on TAS.bestelnummer = SAV.bestelnummer
and TAS.regelnummer = SAV.regelnummer
where 
TAS.id is not null
and (
-- ifnull(TAS.Startdatumtijd,'') != ifnull(SAV.Startdatumtijd,'')
   ifnull(TAS.productnummer,'') != ifnull(SAV.productnummer,'')
or ifnull(TAS.bestelling,0) != ifnull(SAV.bestelling,0)
or ifnull(TAS.besteldatumtijd,'') != ifnull(SAV.besteldatumtijd,'')
or ifnull(TAS.leveranciernummer,'') != ifnull(SAV.leveranciernummer,'')
or ifnull(TAS.leverancierproductnummer,'') != ifnull(SAV.leverancierproductnummer,'')
-- or ifnull(TAS.geprintdatumtijd,0) != ifnull(SAV.geprintdatumtijd,0)
or ifnull(TAS.gepickeddatumtijd,0) != ifnull(SAV.gepickeddatumtijd,0)
or ifnull(TAS.verzondendatumtijd,0) != ifnull(SAV.verzondendatumtijd,0)
or ifnull(TAS.ontvangendatumtijd,0) != ifnull(SAV.ontvangendatumtijd,0)
or ifnull(TAS.contactpersoon,'') != ifnull(SAV.contactpersoon,'')
or ifnull(TAS.inkoopprijs,0) != ifnull(SAV.inkoopprijs,0)
or ifnull(TAS.opmerking,'') != ifnull(SAV.opmerking,'')
)
order by sav.bestelnummer,sav.regelnummer
`;
        }
        //
        //
        //
        //let rows = await db.waitQuery(res.crudConnection, sql);
        res.crudConnection.release();
        res.status(200).send(sql);
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
            this.doQuery(req, res, next);
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
