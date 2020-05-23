
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import * as fs from 'fs';
import { Config } from '../config';
import https from "https";
import http from "http";
import { parseString } from "xml2js";
//
const dict: Dict = {
    table: "exactclient",
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

export class Exactclient extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected getJson(data: string): any {
        return new Promise((resolve, reject) => {
            parseString(data, (err, result) => {
                if (err) {
                    Logger.error(JSON.stringify(err));
                    resolve({});
                } else {
                    resolve(result);
                }
            })
        });
    }

    protected getField(object: any, ...index: string[]): string {
        let result = '';
        let thisObject = object;
        for (let iobj = 0; iobj < index.length; iobj++) {
            if (index[iobj] == '$') {
                thisObject = thisObject[index[iobj]];
                if (!thisObject) {
                    break;
                }
                iobj++;
                thisObject = thisObject[index[iobj]];
                if (!thisObject) {
                    break;
                }
            } else {
                thisObject = thisObject[index[iobj]];
                if (!thisObject) {
                    break;
                }
                thisObject = thisObject[0];
                if (!thisObject) {
                    break;
                }
            }
        }
        if (thisObject) {
            result = String(thisObject);
        }
        return db.fix(result);
    }

    protected checkRunningInterface(req: Request, res: Response, next: NextFunction): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            if (Config.serverPort == 9001) {
                //
                // Ik handel het antwoord van exact zelf wel af
                //
                resolve(true);
            } else {
                //
                // 9001 moet het antwoord van exact afhandelen (redirecturl)
                // dus moet wel lopen
                //
                let headers = {};
                let ak2req = http.request(
                    {
                        host: "localhost",
                        path: "/",
                        method: 'GET',
                        port: 9001,
                        headers: headers,
                        protocol: 'http:'
                    },
                    ak2res => {
                        let responseString = "";
                        ak2res.on("data", (data) => {
                            responseString += data;
                        });
                        ak2res.on("end", () => {
                            resolve(true);
                        });
                        ak2res.on("error", (error) => {
                            Logger.error(req, JSON.stringify(error));
                            resolve(false);
                        });
                    }
                );
                ak2req.on("error", (error) => {
                    Logger.error(req, JSON.stringify(error));
                    resolve(false);
                })
                ak2req.end();
            }
        })
    }

    protected getAuth(req: Request, res: Response, next: NextFunction, options: any): Promise<string> {
        return new Promise(async (resolve, reject) => {
            let body = options.body;
            //
            let headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": body.length,
                "Accept": '*/*',
            }
            let exactreq = https.request(
                {
                    host: "start.exactonline.nl",
                    path: "/api/oauth2/token",
                    method: 'POST',
                    port: 443,
                    headers: headers,
                    protocol: 'https:'
                },
                exactres => {
                    let responseString = "";
                    exactres.on("data", (data) => {
                        responseString += data;
                    });
                    exactres.on("end", () => {
                        resolve(responseString);
                    });
                    exactres.on("error", (error) => {
                        resolve(JSON.stringify(error));
                    });
                }
            );
            exactreq.write(body);
            exactreq.end();
        });
    }

    protected getData(req: Request, res: Response, next: NextFunction, options: any): Promise<string> {
        return new Promise((resolve, reject) => {
            let headers = {};
            let exactreq = https.request(
                {
                    host: "start.exactonline.nl",
                    path: "/docs/XMLDownload.aspx" + options.path,
                    method: 'GET',
                    port: 443,
                    headers: headers,
                    protocol: 'https:'
                },
                exactres => {
                    let responseString = "";
                    exactres.on("data", function (data) {
                        responseString += data;
                    });
                    exactres.on("end", function () {
                        resolve(responseString);
                    });
                    exactres.on("error", function (error) {
                        resolve(JSON.stringify(error));
                    });
                }
            );
            exactreq.end();
        });
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, xoptions?: Dict) {
        //
        res.crudData = {};
        //
        let result: any = '';
        let options: any;
        let json: any;
        let xml: any;
        let tlblok = -1;
        let query = db.fixQuery(req.query);
        res.crudConnection = await db.waitConnection();
        let exactstart = await Util.waitParam(req, res, next, 'EXACTSTART');
        res.crudConnection.release();
        if (exactstart == '') {
            exactstart = '01-01-2018';
        }
        try {
            if (!fs.existsSync(Config.exactdir)) {
                fs.mkdirSync(Config.exactdir);
            }
        } catch (error) {
            Logger.error(req, JSON.stringify(error));
        }
        try {
            if (!fs.existsSync(Config.appDir + "/import")) {
                fs.mkdirSync(Config.appDir + "/import");
            }
        } catch (error) {
            Logger.error(req, JSON.stringify(error));
        }
        //
        let outfile: string = Config.appDir + "/import/exactresult.dat";
        if (query.outfile != '') {
            outfile = Config.appDir + "/" + query.outfile;
        }
        //
        //
        //
        if (query.action == 'GETCODE') {
            if (await this.checkRunningInterface(req, res, next) == false) {
                res.send("Server 9001 moet lopen om het antwoord van Exact af te kunnen handelen (redirectUrl van de ExactApi)");
                return;
            }
            let thisUrl = "https://start.exactonline.nl/api/oauth2/auth"
                + '?client_id='
                + Config.exactclientid
                + '&redirect_uri='
                + Config.urlRedirect
                + '&response_type=code';
            res.set({
                Location: thisUrl
            });
            res.status(302).send();
            return;
        }

        if (query.action == 'GETFIRSTREFRESH') {
            //
            // get refresh
            //
            res.crudData.code = '';
            res.crudData.refresh = '';
            let thisResponse: any;
            try {
                res.crudData.code = String(fs.readFileSync(Config.exactdir + "/exactcode.dat"));
            } catch (error) {
                res.crudData.code = '';
                Logger.error(req, JSON.stringify(error));
            }
            if (res.crudData.code == "") {
                res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                return;
            }
            //
            options = {
                body:
                    "code=" + res.crudData.code
                    + "&client_id=" + Config.exactclientid
                    + "&grant_type=authorization_code"
                    + "&client_secret=" + Config.exactclientsecret
                    + "&redirect_uri=" + Config.urlRedirect
            }
            try {
                thisResponse = JSON.parse(await this.getAuth(req, res, next, options));
                res.crudData.refresh = thisResponse.refresh_token;
            } catch (error) {
                Logger.error(JSON.stringify(error));
                res.crudData.refresh = '';
            }
            if (res.crudData.refresh == "") {
                res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                return;
            }
            try {
                fs.writeFileSync(Config.exactdir + "/exactrefresh.dat", res.crudData.refresh);
            } catch (error) {
                res.crudData.refresh = '';
                Logger.error(req, JSON.stringify(error));
            }
            if (res.crudData.refresh == "") {
                res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                return;
            }
            result += '<p>';
            result += "Deel 2 van de verbinding met Exact is gecontroleerd, sluit dit window om verder te gaan ...";
            result += '</p>';
            res.status(200).send(result);
            return;
        }
        if (query.action.indexOf('GET') >= 0) {
            res.crudData.refresh = '';
            res.crudData.access = '';
            let thisResponse: any;
            try {
                res.crudData.refresh = String(fs.readFileSync(Config.exactdir + "/exactrefresh.dat"));
            } catch (error) {
                res.crudData.refresh = '';
                Logger.error(req, JSON.stringify(error));
            }
            if (res.crudData.refresh == "") {
                Logger.error("401 Unauthorized: Herstel Exact verbinding");
                res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                return;
            }
            options = {
                body:
                    "refresh_token=" + res.crudData.refresh
                    + "&client_id=" + Config.exactclientid
                    + "&grant_type=refresh_token"
                    + "&client_secret=" + Config.exactclientsecret
            }
            try {
                thisResponse = JSON.parse(await this.getAuth(req, res, next, options));
                res.crudData.access = thisResponse.access_token;
                res.crudData.refresh = thisResponse.refresh_token;
            } catch (error) {
                Logger.error(JSON.stringify(error));
                res.crudData.refresh = '';
            }
            if (res.crudData.access == "") {
                Logger.error("401 Unauthorized: Herstel Exact verbinding");
                res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                return;
            }
            if (res.crudData.refresh == "") {
                Logger.error("401 Unauthorized: Herstel Exact verbinding");
                res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                return;
            }
            try {
                fs.writeFileSync(Config.exactdir + "/exactrefresh.dat", res.crudData.refresh);
            } catch (error) {
                res.crudData.refresh = '';
                Logger.error(req, JSON.stringify(error));
            }
            if (res.crudData.refresh == "") {
                Logger.error("401 Unauthorized: Herstel Exact verbinding");
                res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                return;
            }
            try {
                fs.writeFileSync(outfile, ``);
            } catch (error) {
                Logger.error("401 Unauthorized: Herstel Exact verbinding");
                res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                return;
            }
        }
        if (query.action.indexOf('GET') >= 0) {
            //
            // GET DATA via REST of XML
            //
            let sep = "?";
            let thisPathFirst = '';
            let thisPathGet = '';
            //
            thisPathFirst = '?_Division_='
                + Config.exactdivision
                + '&Topic=' + query.topic;
            sep = '&';
            if ((query.Params_Status || '') != '') {
                thisPathFirst += sep
                    + 'Params_Status='
                    + query.Params_Status;
                sep = '&';
            }
            if (query.topic == "ShopOrderStockReceipts") {
                thisPathFirst += sep
                    + "Params_Date_From="
                    + exactstart;
                sep = '&';
            }
            if (query.topic == "Receipts") {
                thisPathFirst += sep
                    + "Params_TransactionDate_From="
                    + exactstart;
                sep = '&';
            }
            if (query.topic == "Deliveries") {
                thisPathFirst += sep
                    + "Params_TransactionDate_From="
                    + exactstart;
                sep = '&';
            }
            //
            if ((query.filter||'') != '') {
                thisPathFirst += sep
                    + '$filter='
                    + encodeURIComponent(query.filter);
                sep = '&';
            }
            if ((query.select||'') != '') {
                thisPathFirst += sep
                    + '$select='
                    + encodeURIComponent(query.select);
                sep = '&';
            }
            //
            thisPathFirst += sep
                + 'access_token='
                + res.crudData.access;
            sep = '&';
            //
            thisPathGet = thisPathFirst;
            Logger.info(`    exactclient getting: ${query.topic}`);
            let retry = 1;
            //
            while (retry == 1) {
                options = {
                    path: thisPathGet
                }
                result = await this.getData(req, res, next, options);
                if (result == "") {
                    if (tlblok == -1) {
                        Logger.error(`401 Unauthorized: Empty response, wrong division? [${Config.exactdivision}]`);
                        res.status(401).send(`401 Unauthorized : Empty response, wrong division? [${Config.exactdivision}]`);
                        return;
                    } else {
                        retry = 0;
                    }
                } else {
                    json = await this.getJson(result);
                    let thisTs_d = this.getField(json.eExact, 'Topics', 'Topic', '$', 'ts_d');
                    let thisData: any = '';
                    if (json.eExact[query.topic]) {
                        if (json.eExact[query.topic][0]) {
                            tlblok++;
                            Logger.info(`    ${query.topic}: ${tlblok+1}`);
                            thisData = json.eExact[query.topic][0];
                            let firstproperty = 1;
                            let thisSingleTopic = '';
                            for (let property in thisData) {
                                if (firstproperty == 1) {
                                    firstproperty = 0;
                                    thisSingleTopic = property;
                                    if (tlblok == 0) {
                                        fs.appendFileSync(outfile, `{"${thisSingleTopic}":[`);
                                    } else {
                                        fs.appendFileSync(outfile, `,`);
                                    }
                                    thisData = JSON.stringify(thisData[property], null, 2);
                                    thisData = thisData.substr(1, thisData.length - 2);
                                    fs.appendFileSync(outfile, thisData);
                                }
                            }
                        }
                    }
                    if (thisTs_d == '') {
                        retry = 0;
                    } else {
                        thisPathGet = thisPathFirst + "&TSPaging=" + thisTs_d;
                    }
                }
            }
            if (tlblok >= 0) {
                fs.appendFileSync(outfile, `]}`);
            }
            Logger.info(`    ${query.topic}: ready ...`);
            result = {
                msg: `Aantal blokken opgehaald: ${tlblok + 1}`
            };

        }
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
