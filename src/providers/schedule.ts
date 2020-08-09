
import { Action } from '../action';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import { Config } from '../config';
import * as child from 'child_process';
import * as fs from 'fs';
//

export class Schedule extends Action {
    private timer: any;
    protected isRunning = false;
    constructor() {
        super(
            "Schedule"
        )
        this.isRunning = false;
        if (Config.scheduleinterval > 0){
            this.runTimer();
        }
    }

    protected addMessage(message: string, res?: Response): string {
        Logger.info(message);
        if (res) {
            res.write(message + "<br>");
        }
        return message + "\n";
    }

    protected async runTimer() {
        while (true) {
            await Util.sleep(Config.scheduleinterval);
            if (this.isRunning == true) {
            } else {
                this.addMessage("Schedule loopt " + Util.Date2Screentime(new Date()) + " ...");
                let result: any = {};
                let message = '';
                result = await this.waitDbBackup("");
                //message += this.addMessage(result.message);
                result = await this.waitDataBackup("");
                //message += this.addMessage(result.message);
                result = await this.waitImport("");
                //message += this.addMessage(result.message);
            }
        }
    }

    protected async waitDbBackup(action: string) {
        let message = '';
        let result: any = {};
        let Auto = 0;
        //
        let curdir = Config.appDir + "/backup";
        let thisDate = Util.Date2Screendate(new Date());
        let thisDbBackup = `${Config.dbschema}_${thisDate}.sql`;
        let thisTime = Util.Date2Screentime(new Date());
        //
        if (action == "") {
            Auto = 1;
        }
        if (Auto == 1) {
            if (thisTime < Config.backuptime) {
                message += this.addMessage(`Wachten om backups te maken tot ${Config.backuptime} ...`);
                result = {
                    backup: `${thisDbBackup}`,
                    success: "true",
                    message: message
                };
                return result;
            }
            if (fs.existsSync(`${curdir}/${thisDbBackup}`)) {
                // message += this.addMessage(`Database backup ${thisDbBackup} is vandaag al gemaakt ...`);
                result = {
                    backup: `${thisDbBackup}`,
                    success: "true",
                    message: message
                };
                return result;
            }
        }
        //
        this.isRunning = true;
        //
        let cmd = `mysqldump --databases ${Config.dbschema} --user=${Config.dbuser} --password=${Config.dbpassword} >${thisDbBackup}`;
        try {
            let shellresult = child.execSync(cmd,
                {
                    cwd: curdir,
                });
        } catch (error) {
            //Logger.error(req, JSON.stringify(error));
        }
        // message += this.addMessage(`Database backup ${thisDbBackup} is gemaakt ...`);
        result = {
            backup: `${thisDbBackup}`,
            success: "true",
            message: message
        };
        //
        this.isRunning = false;
        //
        return result;
    }

    protected async waitDataBackup(action: string) {
        let message = '';
        let result: any = {};
        let Auto = 0;
        //
        let curdir = Config.appDir + "/backup";
        let thisDate = Util.Date2Screendate(new Date());
        let thisDataBackup = `${Config.dbschema}_${thisDate}.7z`;
        let thisTime = Util.Date2Screentime(new Date());
        //
        if (action == "") {
            Auto = 1;
        }
        if (Auto == 1) {
            if (thisTime < Config.backuptime) {
                message += this.addMessage(`Wachten om backups te maken tot ${Config.backuptime} ...`);
                result = {
                    backup: `${thisDataBackup}`,
                    success: "true",
                    message: message
                };
                return result;
            }
            if (fs.existsSync(`${curdir}/${thisDataBackup}`)) {
                // message += this.addMessage(`Databackup ${thisDataBackup} is vandaag al gemaakt ...`);
                result = {
                    backup: `${thisDataBackup}`,
                    success: "true",
                    message: message
                };
                return result;
            }
        }
        //
        this.isRunning = true;
        //
        let cmd = `"\\program files\\7-zip\\7z" a -tzip backup/${thisDataBackup} -x!backup .`;
        message += this.addMessage(cmd);
        try {
            let shellresult = child.execSync(cmd,
                {
                    cwd: Config.appDir,
                });
        } catch (error) {
            //Logger.error(JSON.stringify(error));
        }
        message += this.addMessage(`Data backup ${thisDataBackup} is gemaakt ...`);
        result = {
            backup: `${thisDataBackup}`,
            success: "true",
            message: message
        };
        //
        this.isRunning = false;
        //
        return result;
    }

    protected async waitImport(action: string, res?: Response) {
        let titel = '';
        let message = '';
        let msg = '';
        let result: any = {
            success: "true",
            message: message
        };
        let data: any;
        let thisPath = '';
        let retry = 0;
        let All = 0;
        let Auto = 0;
        let OperationalOnly = 0;
        let BestellingOnly = 0;
        let BewerkingOnly = 0;
        let OrderOnly = 0;
        let CalcOnly = 0;
        //
        let curdir = Config.appDir + "/import";
        let thisDate = Util.Date2Screendate(new Date());
        let thisFilename = `${Config.dbschema}_${thisDate}.log`;
        let thisTime = Util.Date2Screentime(new Date());
        //
        switch ((action).toLowerCase()) {
            case "all":
                All = 1;
                titel = "Alles importeren en doorrekenen";
                break;
            case "operational":
                OperationalOnly = 1;
                titel = "Operationele gegevens importeren";
                break;
            case "bestelling":
                BestellingOnly = 1;
                titel = "Bestellingen importeren";
                break;
            case "bewerking":
                BewerkingOnly = 1;
                titel = "Bewerkingen importeren";
                break;
            case "order":
                OrderOnly = 1;
                titel = "Orders importeren";
                break;
            case "calc":
                CalcOnly = 1;
                titel = "Doorrekenen";
                break;
            default:
                Auto = 1;
                All = 1;
                titel = "Automatisch alles importeren en doorrekenen";
        }
        //
        if (Auto == 1) {
            if (thisTime < Config.backuptime) {
                message += this.addMessage(`Wacht to ${Config.exacttime} voor de import ...`);
                result = {
                    backup: '',
                    success: "true",
                    message: message
                }
                return result;
            }
            if (fs.existsSync(`${curdir}/${thisFilename}`)) {
                // message += this.addMessage(`Import ${thisFilename} is vandaag al uitgevoerd ...`);
                result = {
                    backup: thisFilename,
                    success: "true",
                    message: message
                };
                return result;
            }
        }
        //
        this.isRunning = true;
        //
        // clean
        //
        message += this.addMessage("Logboodschappen en backups ouder dan 7 dagen verwijderen.", res);
        thisPath = `/toolbox.php?app=${Config.app}`
            + "&action=cleanbackup";
        data = await Util.postInfo(thisPath);
        try {
            if (data.items[0].MSG == '') {
            } else {
                message += this.addMessage(data.items[0].MSG, res);
            }
        } catch (error) {
            message += this.addMessage(JSON.stringify(error), res);
        }
        //
        if (All == 1) {
            //
            // getLEVERANCIER
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen leveranciers.", res);
            } else {
                message += this.addMessage("Ophalen leveranciers.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=Accounts"
                    + "&outfile=import/exactaccounts.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Leveranciers inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactleverancier"
                + "&file=import/exactaccounts.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1) {
            //
            // getKLANT
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen klanten.", res);
            } else {
                message += this.addMessage("Ophalen klanten.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=Accounts"
                    + "&outfile=import/exactaccounts.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Klanten inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactklant"
                + "&file=import/exactaccounts.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1) {
            //
            // getPRODUCT
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen producten.", res);
            } else {
                message += this.addMessage("Ophalen producten.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=Items"
                    + "&outfile=import/exactitems.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Producten inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactproduct"
                + "&file=import/exactitems.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1) {
            //
            // getSTUKLIJST
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen stuklijsten.", res);
            } else {
                message += this.addMessage("Ophalen stuklijsten.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=ManufacturedBillofMaterials"
                    + "&Params_Status=30,20,10"
                    + "&outfile=import/exactmbom.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Stuklijsten inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactstuklijst"
                + "&file=import/exactmbom.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1) {
            //
            // getLEVERANCIERPRODUCT
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen leverancierproductnummers.", res);
            } else {
                message += this.addMessage("Ophalen leverancierproductnummers.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=PurchaseOrders"
                    + "&Params_Status=10,20"
                    + "&outfile=import/exactpurchase.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Leverancierproductnummers inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactleverancierproduct"
                + "&file=import/exactpurchase.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1) {
            //
            // getVOORRAAD
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen voorraad.", res);
            } else {
                message += this.addMessage("Ophalen voorraad.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=StockPositions"
                    + "&outfile=import/exactstock.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Voorraad inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactvoorraad"
                + "&file=import/exactstock.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1 || OperationalOnly == 1 || BestellingOnly == 1) {
            //
            // getBESTELLING
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen bestellingen.", res);
            } else {
                message += this.addMessage("Ophalen bestellingen.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=PurchaseOrders"
                    + "&Params_Status=10,20"
                    + "&outfile=import/exactpurchase.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Bestellingen inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactbestelling"
                + "&file=import/exactpurchase.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1 || OperationalOnly == 1 || BestellingOnly == 1) {
            //
            // getRECEIPT
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen ontvangsten.", res);
            } else {
                message += this.addMessage("Ophalen ontvangsten.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=Receipts"
                    + "&outfile=import/exactreceipt.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Ontvangsten inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactreceipt"
                + "&file=import/exactreceipt.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1 || OperationalOnly == 1 || OrderOnly == 1) {
            //
            // getORDER
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen orders.", res);
            } else {
                message += this.addMessage("Ophalen orders.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=SalesOrders"
                    + "&Params_Status=12,20"
                    + "&outfile=import/exactsales.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Orders inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactorder"
                + "&file=import/exactsales.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1 || OperationalOnly == 1 || OrderOnly == 1) {
            //
            // getDELIVERY
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen afleveringen.", res);
            } else {
                message += this.addMessage("Ophalen afleveringen.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=Deliveries"
                    + "&outfile=import/exactdeliveries.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Afleveringen inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactdelivery"
                + "&file=import/exactdeliveries.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1 || OperationalOnly == 1 || BewerkingOnly == 1) {
            //
            // getBEWERK
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen bewerkingen.", res);
            } else {
                message += this.addMessage("Ophalen bewerkingen.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=ShopOrders"
                    + "&Params_Status=20,10"
                    + "&outfile=import/exactshoporders.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Bewerkingen inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactbewerk"
                + "&file=import/exactshoporders.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1 || OperationalOnly == 1 || BewerkingOnly == 1) {
            //
            // getBEWERKONTVANGST
            //
            message += this.addMessage("", res);
            if (Config.exactinterfaceapp == "false"){
                message += this.addMessage("Skip Ophalen bewerkingontvangsten.", res);
            } else {
                message += this.addMessage("Ophalen bewerkingontvangsten.", res);
                thisPath = `/exactclient.php?app=${Config.app}`
                    + "&action=GET"
                    + "&type=XML"
                    + "&topic=ShopOrderStockReceipts"
                    + "&outfile=import/exactshoporderreceipts.dat";
                data = await Util.getInfo(thisPath);
                try {
                    message += this.addMessage(data.msg, res);
                } catch (error) {
                    message += this.addMessage(JSON.stringify(error), res);
                }
            }
            //
            message += this.addMessage("Bewerkingontvangsten inlezen.", res);
            thisPath = `/upload.php?app=${Config.app}`
                + "&action=get,exactbewerkontvangst"
                + "&file=import/exactshoporderreceipts.dat";
            data = await Util.getInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(JSON.stringify(error), res);
            }
        }
        if (All == 1 || CalcOnly == 1) {
            //
            // addlogistiek
            //
            message += this.addMessage("", res);
            message += this.addMessage("Default bewerkingen toevoegen.", res);
            thisPath = `/toolbox.php?app=${Config.app}`
                + "&action=addlogistiek";
            data = await Util.postInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].MSG, res);
            } catch (error) {
                message += this.addMessage(data, res);
            }
        }
        if (All == 1 || CalcOnly == 1) {
            //
            // fase0: Oude voorraadstand opschonen
            //
            message += this.addMessage("Oude voorraadstand opschonen.", res);
            thisPath = `/voorraad.php?app=${Config.app}`
                + "&action=fase0";
            data = await Util.postInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(data, res);
            }
        }
        if (All == 1 || CalcOnly == 1) {
            //
            // fase1: Startvoorraad, orders, bestellingen en bewerkingen doorrekenen
            //
            message += this.addMessage("Startvoorraad, orders, bestellingen en bewerkingen doorrekenen.", res);
            thisPath = `/voorraad.php?app=${Config.app}`
                + "&action=fase1";
            data = await Util.postInfo(thisPath);
            try {
                message += this.addMessage(data.items[0].msg, res);
            } catch (error) {
                message += this.addMessage(data, res);
            }
        }
        if (All == 1 || CalcOnly == 1) {
            //
            // Fase2: Voorraad afboeken van onderdelen van producten waar tekorten van zijn
            //
            message += this.addMessage("Voorraad afboeken van onderdelen van producten waar tekorten van zijn.", res);
            thisPath = `/voorraad.php?app=${Config.app}`
                + "&action=fase2";
            data = await Util.postInfo(thisPath);
            retry = 0;
            try {
                if (Number(data.items[0].regelsbesteld) > 0) {
                    // is het goede type antwoord gegeven
                    retry = 1;
                }
            } catch (error) {
                message += this.addMessage(data, res);
            }
            //
            // Volgende keren fase2
            //
            let tlcycle = 0;
            while (retry > 0) {
                message += this.addMessage(data.items[0].regelsbesteld + " regels afgeboekt, nog een keer ...", res);
                tlcycle++;
                retry = 0;
                if (tlcycle > 6) {
                    message += this.addMessage("Onderdeel is Onderdeel probleem, toch maar opbouwen lijst ...", res);
                } else {
                    thisPath = `/voorraad.php?app=${Config.app}`
                        + "&action=fase2";
                    data = await Util.postInfo(thisPath);
                    try {
                        if (Number(data.items[0].regelsbesteld) > 0) {
                            // is het goede type antwoord gegeven
                            retry = 1;
                        }
                    } catch (error) {
                        message += this.addMessage(data, res);
                    }
                }
            }
        }
        if (All == 1 || CalcOnly == 1) {
            //
            // fase3: Voorraadstand vastleggen
            //
            message += this.addMessage("Voorraadstand vastleggen ...", res);
            thisPath = `/voorraad.php?app=${Config.app}`
                + "&action=fase3";
            data = await Util.postInfo(thisPath);
            msg = 'Vastgelegd.';
            if (data.items){
                if (data.items[0]){
                    if (data.items[0].regelsbijgewerkt){
                        msg = `${data.items[0].regelsbijgewerkt} regels vastgelegd.`;
                    }
                }
            }
            message += this.addMessage(msg);
        }
        if (All == 1 || CalcOnly == 1) {
            //
            // Eerste fase4: Beperkende faktoren bijwerken (Zoek de kurk)
            //
            message += this.addMessage("Beperkende faktoren bijwerken (Zoek de kurk) ...", res);
            thisPath = `/voorraad.php?app=${Config.app}`
                + "&action=fase4";
            data = await Util.postInfo(thisPath);
            retry = 0;
            try {
                if (data.items[0].regels > 0) {
                    retry = 1;
                }
            } catch (error) {
                message += this.addMessage(data, res);
            }
            //
            // Volgende fase4: 
            //
            while (retry > 0) {
                message += this.addMessage(data.items[0].regels + " regels doorzocht, nog een keer ...", res);
                thisPath = `/voorraad.php?app=${Config.app}`
                    + "&action=fase4";
                data = await Util.postInfo(thisPath);
                retry = 0;
                try {
                    if (Number(data.items[0].regels) > 0) {
                        retry = 1;
                    }
                } catch (error) {
                    message += this.addMessage(data, res);
                }
            }
        }
        if (All == 1 || CalcOnly == 1) {
            //
            // Alles is bijgewerkt
            //
            message += this.addMessage("Alles is bijgewerkt.", res);
        }
        //
        // Gereed
        //
        message += this.addMessage("", res);
        message += this.addMessage("Gereed ...", res);
        let bericht: any = {};
        bericht.datum = Util.Date2Screendatetime(new Date());
        bericht.author = Config.appnaam;
        bericht.email = "";
        bericht.header = Config.appnaam + " " + Util.Date2Screendatetime(new Date()) + ": " + titel;
        bericht.inhoud = encodeURIComponent(message);
        bericht.moderated = 1;
        thisPath = `/bb.php?app=${Config.app}`
            + "&action=addmsg"
            + "&bb=Log";
        data = await Util.postInfo(thisPath, bericht);
        //
        // Logging
        //
        fs.appendFileSync(`${curdir}/${thisFilename}`, message.replace(/<br>/gi, ''));
        result = {
            success: "true",
            message: message
        };
        //
        this.isRunning = false;
        //
        return result;
    }

    protected async doDbBackup(req: Request, res: Response, next: NextFunction) {
        let query = db.fixQuery(req.query);
        let result = await this.waitDbBackup(query.type);
        res.status(200).send(result);
        return;
    }

    protected async doDataBackup(req: Request, res: Response, next: NextFunction) {
        let query = db.fixQuery(req.query);
        let result = await this.waitDataBackup(query.type);
        res.status(200).send(result);
        return;
    }

    protected async doImport(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixQuery(req.query);
        let result = await this.waitImport(query.type, res);
        res.end();
        return;
    }

    public async routes(req: Request, res: Response, next: NextFunction) {
        //
        let method = req.method;
        let action = db.fix(req.query.action || '');
        //
        Logger.request(req);
        //
        if (action == "dbbackup" || action == "get,dbbackup") {
            this.doDbBackup(req, res, next);
        } else if (action == "databackup" || action == "get,databackup") {
            this.doDataBackup(req, res, next);
        } else if (action == "import" || action == "get,import") {
            //
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Cache-Control", "no-cache");
            //
            this.doImport(req, res, next);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
