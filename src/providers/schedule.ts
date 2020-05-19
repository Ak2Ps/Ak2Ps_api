
import { Action } from '../action';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import { Config } from '../config';
import * as child from 'child_process';
import * as fs from 'fs';
import http from "http";
//

export class Schedule extends Action {
    private timer: any;
    constructor() {
        super(
            "Schedule"
        )
        this.runTimer();
    }

    protected async runTimer() {
        this.timer = setTimeout(async () => {
            let result: any = {};
            Logger.info("Schedule alive " + Util.Date2Screentime(new Date()));
            result = await this.waitBackup();
            Logger.info(result.message);
            result = await this.waitImport("");
            Logger.info(result.message);
            this.runTimer();
        }, Config.scheduleinterval * 1000);
    }

    protected async waitBackup() {
        let message = '';
        let result: any = {};
        //
        let curdir = Config.appDir + "/backup";
        let thisDate = Util.Date2Screendate(new Date());
        let thisDbBackup = `${Config.dbschema}_${thisDate}.sql`;
        let thisDataBackup = `${Config.dbschema}_${thisDate}.7z`;
        let thisTime = Util.Date2Screentime(new Date());
        //
        if (thisTime < Config.backuptime) {
            message += `Too early for backup ${thisDbBackup} (${Config.backuptime}) ...<br>\n`;
        } else {
            if (fs.existsSync(`${curdir}/${thisDbBackup}`)) {
                message += `Db backup ${thisDbBackup} already made ...<br>\n`;
                //
                if (fs.existsSync(`${curdir}/${thisDataBackup}`)) {
                    message += `Data backup ${thisDataBackup} already made ...<br>\n`;
                } else {
                    let cmd = `"\\program files\\7-zip\\7z" a -tzip backup/${thisDataBackup} -x!backup .`;
                    Logger.info(cmd);
                    try {
                        let shellresult = child.execSync(cmd,
                            {
                                cwd: Config.appDir,
                            });
                    } catch (error) {
                        //Logger.error(JSON.stringify(error));
                    }
                    message += `Data backup ${thisDataBackup} done ...<br>\n`
                }
            } else {
                let cmd = `mysqldump --databases ${Config.dbschema} --user=${Config.dbuser} --password=${Config.dbpassword} >${thisDbBackup}`;
                try {
                    let shellresult = child.execSync(cmd,
                        {
                            cwd: curdir,
                        });
                } catch (error) {
                    //Logger.error(req, JSON.stringify(error));
                }
                message += `Db backup ${thisDbBackup} done ...<br>\n`
            }
        }
        result = {
            db: `${thisDbBackup}`,
            data: `${thisDataBackup}`,
            success: "true",
            message: message
        };

        return result;
    }

    protected async waitImport(action: string) {
        let message = '';
        let result: any = {
            success: "true",
            message: message
        };
        let data: any;
        let thisPath = '';
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
        if (thisTime < Config.backuptime) {
            result = {
                backup: '',
                success: "true",
                message: `Too early for import (${Config.exacttime}) ...`
            }
        } else {
            if (fs.existsSync(`${curdir}/${thisFilename}`)) {
                result = {
                    backup: thisFilename,
                    success: "true",
                    message: `Import ${thisFilename} already made ...`
                };
            } else {
                //
                let Start = 1;
                switch (Number(action)) {
                    case 0:
                        break;
                    case 1:
                        OperationalOnly = 1;
                        break;
                    case 2:
                        BestellingOnly = 1;
                        break;
                    case 3:
                        BewerkingOnly = 1;
                        break;
                    case 4:
                        OrderOnly = 1;
                        break;
                    case 11:
                        CalcOnly = 1;
                        break;
                    default:
                        Start = 0;
                }
                if (Start == 1) {
                    // cleanLog
                    data = await this.cleanLog();
                    try {
                        if (data.items[0].MSG == '') {
                            message += "Logboodschappen ouder dan 5 dagen verwijderd. <br><br>"
                        } else {
                            message += data.items[0].MSG;
                        }
                    } catch (error) {
                        message += JSON.stringify(error);
                    }
                    if (OperationalOnly == 1) {
                        //me.getBESTELLING();
                    } else if (BestellingOnly == 1) {
                        //me.getBESTELLING();
                    } else if (BewerkingOnly == 1) {
                        //me.getBEWERK();
                    } else if (OrderOnly == 1) {
                        //me.getORDER();
                    } else if (CalcOnly == 1) {
                        //me.fase0();
                    } else {
                        //
                        // getLEVERANCIER
                        //
                        thisPath = `/exactclient.php?app=${Config.app}`
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Accounts"
                            + "&outfile=import/exactaccounts.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += "\nLeverancier: " + data.msg + "<br>\n";
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = `/upload.php?app=${Config.app}`
                            + "&action=get,exactleverancier"
                            + "&file=import/exactaccounts.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += data.items[0].msg + "\n";
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getKLANT
                        //
                        thisPath = `/exactclient.php?app=${Config.app}`
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Accounts"
                            + "&outfile=import/exactaccounts.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += "\nKlant: " + data.msg + "<br>\n";;
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = `/upload.php?app=${Config.app}`
                            + "&action=get,exactklant"
                            + "&file=import/exactaccounts.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += data.items[0].msg + "\n";
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getPRODUCT
                        //
                        thisPath = `/exactclient.php?app=${Config.app}`
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Items"
                            + "&outfile=import/exactitems.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += "\nProduct: " + data.msg + "<br>\n";;
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = `/upload.php?app=${Config.app}`
                            + "&action=get,exactproduct"
                            + "&file=import/exactitems.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += data.items[0].msg + "\n";
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getSTUKLIJST
                        //
                        thisPath = `/exactclient.php?app=${Config.app}`
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=ManufacturedBillofMaterials"
                            + "&Params_Status=30,20,10"
                            + "&outfile=import/exactmbom.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += "\nStuklijst: " + data.msg + "<br>\n";;
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = `/upload.php?app=${Config.app}`
                            + "&action=get,exactproduct"
                            + "&file=import/exactmbom.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += data.items[0].msg + "\n";
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getLEVERANCIERPRODUCT
                        //
                        thisPath = `/exactclient.php?app=${Config.app}`
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=PurchaseOrders"
                            + "&Params_Status=10,20"
                            + "&outfile=import/exactpurchase.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += "\nLeverancierproduct: " + data.msg + "<br>\n";;
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = `/upload.php?app=${Config.app}`
                            + "&action=get,exactleverancierproduct"
                            + "&file=import/exactpurchase.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += data.items[0].msg + "\n";
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getVOORRAAD
                        //
                        thisPath = `/exactclient.php?app=${Config.app}`
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=StockPositions"
                            + "&outfile=import/exactstock.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += "\nVoorraad: " + data.msg + "<br>\n";;
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = `/upload.php?app=${Config.app}`
                            + "&action=get,exactvoorraad"
                            + "&file=import/exactstock.dat";
                        data = await this.getInfo(thisPath);
                        try {
                            message += data.items[0].msg + "\n";
                        } catch (error) {
                            message += JSON.stringify(error);
                        }
                    }
                }
                //
                fs.appendFileSync(`${curdir}/${thisFilename}`, "Ready ...\n");
                result = {
                    success: "true",
                    message: message
                };
            }
        }
        return result;
    }

    protected cleanLog(): Promise<any> {
        return new Promise((resolve, reject) => {
            let headers = {};
            let ak2req = http.request(
                {
                    host: Config.server,
                    path: `/toolbox.php?app=${Config.app}&action=cleanlog`,
                    method: 'POST',
                    port: Config.serverPort,
                    headers: headers,
                    protocol: 'http:'
                },
                ak2res => {
                    let responseString = "";
                    ak2res.on("data", (data) => {
                        responseString += data;
                    });
                    ak2res.on("end", () => {
                        resolve(JSON.parse(responseString));
                    });
                    ak2res.on("error", (error) => {
                        Logger.error(JSON.stringify(error));
                        reject(error);
                    });
                }
            );
            ak2req.on("error", (error) => {
                Logger.error(JSON.stringify(error));
                reject(false);
            })
            ak2req.end();
        })
    }

    protected getInfo(url: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let headers = {};
            let result: any;
            let ak2req = http.request(
                {
                    host: Config.server,
                    path: url,
                    method: 'GET',
                    port: Config.serverPort,
                    headers: headers,
                    protocol: 'http:'
                },
                ak2res => {
                    let responseString = "";
                    ak2res.on("data", (data) => {
                        responseString += data;
                    });
                    ak2res.on("end", () => {
                        try {
                            result = JSON.parse(responseString);
                        } catch (error) {
                            result = responseString;
                        }
                        resolve(result);
                    });
                    ak2res.on("error", (error) => {
                        Logger.error(JSON.stringify(error));
                        reject(error);
                    });
                }
            );
            ak2req.on("error", (error) => {
                Logger.error(JSON.stringify(error));
                reject(false);
            })
            ak2req.end();
        })
    }

    protected async doBackup(req: Request, res: Response, next: NextFunction) {
        let query = db.fixQuery(req.query);
        let result = await this.waitBackup();
        res.status(200).send(result);
        return;
    }

    protected async doImport(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixQuery(req.query);
        let result = await this.waitImport("");
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
        if (action == "backup") {
            this.doBackup(req, res, next);
        } else if (action == "import") {
            this.doImport(req, res, next);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
