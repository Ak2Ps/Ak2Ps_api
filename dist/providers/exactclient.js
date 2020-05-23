"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var fs = __importStar(require("fs"));
var config_1 = require("../config");
var https_1 = __importDefault(require("https"));
var http_1 = __importDefault(require("http"));
var xml2js_1 = require("xml2js");
//
var dict = {
    table: "exactclient",
    key: [],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "",
        where: [],
        fields: [],
    },
    query: {
        orderby: "",
        where: [],
        fields: [],
    },
    update: {
        fields: [],
    },
};
var Exactclient = /** @class */ (function (_super) {
    __extends(Exactclient, _super);
    function Exactclient() {
        return _super.call(this, dict) || this;
    }
    Exactclient.prototype.getJson = function (data) {
        return new Promise(function (resolve, reject) {
            xml2js_1.parseString(data, function (err, result) {
                if (err) {
                    logger_1.Logger.error(JSON.stringify(err));
                    resolve({});
                }
                else {
                    resolve(result);
                }
            });
        });
    };
    Exactclient.prototype.getField = function (object) {
        var index = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            index[_i - 1] = arguments[_i];
        }
        var result = '';
        var thisObject = object;
        for (var iobj = 0; iobj < index.length; iobj++) {
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
            }
            else {
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
        return db_1.default.fix(result);
    };
    Exactclient.prototype.checkRunningInterface = function (req, res, next) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var headers, ak2req;
            return __generator(this, function (_a) {
                if (config_1.Config.serverPort == 9001) {
                    //
                    // Ik handel het antwoord van exact zelf wel af
                    //
                    resolve(true);
                }
                else {
                    headers = {};
                    ak2req = http_1.default.request({
                        host: "localhost",
                        path: "/",
                        method: 'GET',
                        port: 9001,
                        headers: headers,
                        protocol: 'http:'
                    }, function (ak2res) {
                        var responseString = "";
                        ak2res.on("data", function (data) {
                            responseString += data;
                        });
                        ak2res.on("end", function () {
                            resolve(true);
                        });
                        ak2res.on("error", function (error) {
                            logger_1.Logger.error(req, JSON.stringify(error));
                            resolve(false);
                        });
                    });
                    ak2req.on("error", function (error) {
                        logger_1.Logger.error(req, JSON.stringify(error));
                        resolve(false);
                    });
                    ak2req.end();
                }
                return [2 /*return*/];
            });
        }); });
    };
    Exactclient.prototype.getAuth = function (req, res, next, options) {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var body, headers, exactreq;
            return __generator(this, function (_a) {
                body = options.body;
                headers = {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Content-Length": body.length,
                    "Accept": '*/*',
                };
                exactreq = https_1.default.request({
                    host: "start.exactonline.nl",
                    path: "/api/oauth2/token",
                    method: 'POST',
                    port: 443,
                    headers: headers,
                    protocol: 'https:'
                }, function (exactres) {
                    var responseString = "";
                    exactres.on("data", function (data) {
                        responseString += data;
                    });
                    exactres.on("end", function () {
                        resolve(responseString);
                    });
                    exactres.on("error", function (error) {
                        resolve(JSON.stringify(error));
                    });
                });
                exactreq.write(body);
                exactreq.end();
                return [2 /*return*/];
            });
        }); });
    };
    Exactclient.prototype.getData = function (req, res, next, options) {
        return new Promise(function (resolve, reject) {
            var headers = {};
            var exactreq = https_1.default.request({
                host: "start.exactonline.nl",
                path: "/docs/XMLDownload.aspx" + options.path,
                method: 'GET',
                port: 443,
                headers: headers,
                protocol: 'https:'
            }, function (exactres) {
                var responseString = "";
                exactres.on("data", function (data) {
                    responseString += data;
                });
                exactres.on("end", function () {
                    resolve(responseString);
                });
                exactres.on("error", function (error) {
                    resolve(JSON.stringify(error));
                });
            });
            exactreq.end();
        });
    };
    Exactclient.prototype.doQuery = function (req, res, next, xoptions) {
        return __awaiter(this, void 0, void 0, function () {
            var result, options, json, xml, tlblok, query, _a, exactstart, outfile, thisUrl, thisResponse, _b, _c, error_1, thisResponse, _d, _e, error_2, sep, thisPathFirst, thisPathGet, retry, thisTs_d, thisData, firstproperty, thisSingleTopic, property;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        //
                        res.crudData = {};
                        result = '';
                        tlblok = -1;
                        query = db_1.default.fixQuery(req.query);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _f.sent();
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, 'EXACTSTART')];
                    case 2:
                        exactstart = _f.sent();
                        res.crudConnection.release();
                        if (exactstart == '') {
                            exactstart = '01-01-2018';
                        }
                        try {
                            if (!fs.existsSync(config_1.Config.exactdir)) {
                                fs.mkdirSync(config_1.Config.exactdir);
                            }
                        }
                        catch (error) {
                            logger_1.Logger.error(req, JSON.stringify(error));
                        }
                        try {
                            if (!fs.existsSync(config_1.Config.appDir + "/import")) {
                                fs.mkdirSync(config_1.Config.appDir + "/import");
                            }
                        }
                        catch (error) {
                            logger_1.Logger.error(req, JSON.stringify(error));
                        }
                        outfile = config_1.Config.appDir + "/import/exactresult.dat";
                        if (query.outfile != '') {
                            outfile = config_1.Config.appDir + "/" + query.outfile;
                        }
                        if (!(query.action == 'GETCODE')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.checkRunningInterface(req, res, next)];
                    case 3:
                        if ((_f.sent()) == false) {
                            res.send("Server 9001 moet lopen om het antwoord van Exact af te kunnen handelen (redirectUrl van de ExactApi)");
                            return [2 /*return*/];
                        }
                        thisUrl = "https://start.exactonline.nl/api/oauth2/auth"
                            + '?client_id='
                            + config_1.Config.exactclientid
                            + '&redirect_uri='
                            + config_1.Config.urlRedirect
                            + '&response_type=code';
                        res.set({
                            Location: thisUrl
                        });
                        res.status(302).send();
                        return [2 /*return*/];
                    case 4:
                        if (!(query.action == 'GETFIRSTREFRESH')) return [3 /*break*/, 9];
                        //
                        // get refresh
                        //
                        res.crudData.code = '';
                        res.crudData.refresh = '';
                        thisResponse = void 0;
                        try {
                            res.crudData.code = String(fs.readFileSync(config_1.Config.exactdir + "/exactcode.dat"));
                        }
                        catch (error) {
                            res.crudData.code = '';
                            logger_1.Logger.error(req, JSON.stringify(error));
                        }
                        if (res.crudData.code == "") {
                            res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                            return [2 /*return*/];
                        }
                        //
                        options = {
                            body: "code=" + res.crudData.code
                                + "&client_id=" + config_1.Config.exactclientid
                                + "&grant_type=authorization_code"
                                + "&client_secret=" + config_1.Config.exactclientsecret
                                + "&redirect_uri=" + config_1.Config.urlRedirect
                        };
                        _f.label = 5;
                    case 5:
                        _f.trys.push([5, 7, , 8]);
                        _c = (_b = JSON).parse;
                        return [4 /*yield*/, this.getAuth(req, res, next, options)];
                    case 6:
                        thisResponse = _c.apply(_b, [_f.sent()]);
                        res.crudData.refresh = thisResponse.refresh_token;
                        return [3 /*break*/, 8];
                    case 7:
                        error_1 = _f.sent();
                        logger_1.Logger.error(JSON.stringify(error_1));
                        res.crudData.refresh = '';
                        return [3 /*break*/, 8];
                    case 8:
                        if (res.crudData.refresh == "") {
                            res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                            return [2 /*return*/];
                        }
                        try {
                            fs.writeFileSync(config_1.Config.exactdir + "/exactrefresh.dat", res.crudData.refresh);
                        }
                        catch (error) {
                            res.crudData.refresh = '';
                            logger_1.Logger.error(req, JSON.stringify(error));
                        }
                        if (res.crudData.refresh == "") {
                            res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                            return [2 /*return*/];
                        }
                        result += '<p>';
                        result += "Deel 2 van de verbinding met Exact is gecontroleerd, sluit dit window om verder te gaan ...";
                        result += '</p>';
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 9:
                        if (!(query.action.indexOf('GET') >= 0)) return [3 /*break*/, 14];
                        res.crudData.refresh = '';
                        res.crudData.access = '';
                        thisResponse = void 0;
                        try {
                            res.crudData.refresh = String(fs.readFileSync(config_1.Config.exactdir + "/exactrefresh.dat"));
                        }
                        catch (error) {
                            res.crudData.refresh = '';
                            logger_1.Logger.error(req, JSON.stringify(error));
                        }
                        if (res.crudData.refresh == "") {
                            logger_1.Logger.error("401 Unauthorized: Herstel Exact verbinding");
                            res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                            return [2 /*return*/];
                        }
                        options = {
                            body: "refresh_token=" + res.crudData.refresh
                                + "&client_id=" + config_1.Config.exactclientid
                                + "&grant_type=refresh_token"
                                + "&client_secret=" + config_1.Config.exactclientsecret
                        };
                        _f.label = 10;
                    case 10:
                        _f.trys.push([10, 12, , 13]);
                        _e = (_d = JSON).parse;
                        return [4 /*yield*/, this.getAuth(req, res, next, options)];
                    case 11:
                        thisResponse = _e.apply(_d, [_f.sent()]);
                        res.crudData.access = thisResponse.access_token;
                        res.crudData.refresh = thisResponse.refresh_token;
                        return [3 /*break*/, 13];
                    case 12:
                        error_2 = _f.sent();
                        logger_1.Logger.error(JSON.stringify(error_2));
                        res.crudData.refresh = '';
                        return [3 /*break*/, 13];
                    case 13:
                        if (res.crudData.access == "") {
                            logger_1.Logger.error("401 Unauthorized: Herstel Exact verbinding");
                            res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                            return [2 /*return*/];
                        }
                        if (res.crudData.refresh == "") {
                            logger_1.Logger.error("401 Unauthorized: Herstel Exact verbinding");
                            res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                            return [2 /*return*/];
                        }
                        try {
                            fs.writeFileSync(config_1.Config.exactdir + "/exactrefresh.dat", res.crudData.refresh);
                        }
                        catch (error) {
                            res.crudData.refresh = '';
                            logger_1.Logger.error(req, JSON.stringify(error));
                        }
                        if (res.crudData.refresh == "") {
                            logger_1.Logger.error("401 Unauthorized: Herstel Exact verbinding");
                            res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                            return [2 /*return*/];
                        }
                        try {
                            fs.writeFileSync(outfile, "");
                        }
                        catch (error) {
                            logger_1.Logger.error("401 Unauthorized: Herstel Exact verbinding");
                            res.status(401).send("401 Unauthorized: Herstel Exact verbinding");
                            return [2 /*return*/];
                        }
                        _f.label = 14;
                    case 14:
                        if (!(query.action.indexOf('GET') >= 0)) return [3 /*break*/, 21];
                        sep = "?";
                        thisPathFirst = '';
                        thisPathGet = '';
                        //
                        thisPathFirst = '?_Division_='
                            + config_1.Config.exactdivision
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
                        if ((query.filter || '') != '') {
                            thisPathFirst += sep
                                + '$filter='
                                + encodeURIComponent(query.filter);
                            sep = '&';
                        }
                        if ((query.select || '') != '') {
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
                        logger_1.Logger.info("    exactclient getting: " + query.topic);
                        retry = 1;
                        _f.label = 15;
                    case 15:
                        if (!(retry == 1)) return [3 /*break*/, 20];
                        options = {
                            path: thisPathGet
                        };
                        return [4 /*yield*/, this.getData(req, res, next, options)];
                    case 16:
                        result = _f.sent();
                        if (!(result == "")) return [3 /*break*/, 17];
                        if (tlblok == -1) {
                            logger_1.Logger.error("401 Unauthorized: Empty response, wrong division? [" + config_1.Config.exactdivision + "]");
                            res.status(401).send("401 Unauthorized : Empty response, wrong division? [" + config_1.Config.exactdivision + "]");
                            return [2 /*return*/];
                        }
                        else {
                            retry = 0;
                        }
                        return [3 /*break*/, 19];
                    case 17: return [4 /*yield*/, this.getJson(result)];
                    case 18:
                        json = _f.sent();
                        thisTs_d = this.getField(json.eExact, 'Topics', 'Topic', '$', 'ts_d');
                        thisData = '';
                        if (json.eExact[query.topic]) {
                            if (json.eExact[query.topic][0]) {
                                tlblok++;
                                logger_1.Logger.info("    " + query.topic + ": " + (tlblok + 1));
                                thisData = json.eExact[query.topic][0];
                                firstproperty = 1;
                                thisSingleTopic = '';
                                for (property in thisData) {
                                    if (firstproperty == 1) {
                                        firstproperty = 0;
                                        thisSingleTopic = property;
                                        if (tlblok == 0) {
                                            fs.appendFileSync(outfile, "{\"" + thisSingleTopic + "\":[");
                                        }
                                        else {
                                            fs.appendFileSync(outfile, ",");
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
                        }
                        else {
                            thisPathGet = thisPathFirst + "&TSPaging=" + thisTs_d;
                        }
                        _f.label = 19;
                    case 19: return [3 /*break*/, 15];
                    case 20:
                        if (tlblok >= 0) {
                            fs.appendFileSync(outfile, "]}");
                        }
                        logger_1.Logger.info("    " + query.topic + ": ready ...");
                        result = {
                            msg: "Aantal blokken opgehaald: " + (tlblok + 1)
                        };
                        _f.label = 21;
                    case 21:
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Exactclient.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action;
            return __generator(this, function (_a) {
                method = req.method;
                action = db_1.default.fix(req.query.action || '');
                //
                logger_1.Logger.request(req);
                //
                if (action == "select") {
                    util_1.Util.unknownOperation(req, res, next);
                }
                else if (method == "GET") {
                    this.doQuery(req, res, next, this.dict);
                }
                else if (method == "PUT") {
                    util_1.Util.unknownOperation(req, res, next);
                }
                else if (method == "POST") {
                    util_1.Util.unknownOperation(req, res, next);
                }
                else if (method == "DELETE") {
                    util_1.Util.unknownOperation(req, res, next);
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Exactclient;
}(crud_1.Crud));
exports.Exactclient = Exactclient;
//# sourceMappingURL=exactclient.js.map