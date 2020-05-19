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
var action_1 = require("../action");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var config_1 = require("../config");
var child = __importStar(require("child_process"));
var fs = __importStar(require("fs"));
var http_1 = __importDefault(require("http"));
//
var Schedule = /** @class */ (function (_super) {
    __extends(Schedule, _super);
    function Schedule() {
        var _this = _super.call(this, "Schedule") || this;
        _this.runTimer();
        return _this;
    }
    Schedule.prototype.runTimer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.timer = setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    var result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                result = {};
                                logger_1.Logger.info("Schedule alive " + util_1.Util.Date2Screentime(new Date()));
                                return [4 /*yield*/, this.waitBackup()];
                            case 1:
                                result = _a.sent();
                                logger_1.Logger.info(result.message);
                                return [4 /*yield*/, this.waitImport("")];
                            case 2:
                                result = _a.sent();
                                logger_1.Logger.info(result.message);
                                this.runTimer();
                                return [2 /*return*/];
                        }
                    });
                }); }, config_1.Config.scheduleinterval * 1000);
                return [2 /*return*/];
            });
        });
    };
    Schedule.prototype.waitBackup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var message, result, curdir, thisDate, thisDbBackup, thisDataBackup, thisTime, cmd, shellresult, cmd, shellresult;
            return __generator(this, function (_a) {
                message = '';
                result = {};
                curdir = config_1.Config.appDir + "/backup";
                thisDate = util_1.Util.Date2Screendate(new Date());
                thisDbBackup = config_1.Config.dbschema + "_" + thisDate + ".sql";
                thisDataBackup = config_1.Config.dbschema + "_" + thisDate + ".7z";
                thisTime = util_1.Util.Date2Screentime(new Date());
                //
                if (thisTime < config_1.Config.backuptime) {
                    message += "Too early for backup " + thisDbBackup + " (" + config_1.Config.backuptime + ") ...<br>\n";
                }
                else {
                    if (fs.existsSync(curdir + "/" + thisDbBackup)) {
                        message += "Db backup " + thisDbBackup + " already made ...<br>\n";
                        //
                        if (fs.existsSync(curdir + "/" + thisDataBackup)) {
                            message += "Data backup " + thisDataBackup + " already made ...<br>\n";
                        }
                        else {
                            cmd = "\"\\program files\\7-zip\\7z\" a -tzip backup/" + thisDataBackup + " -x!backup .";
                            logger_1.Logger.info(cmd);
                            try {
                                shellresult = child.execSync(cmd, {
                                    cwd: config_1.Config.appDir,
                                });
                            }
                            catch (error) {
                                //Logger.error(JSON.stringify(error));
                            }
                            message += "Data backup " + thisDataBackup + " done ...<br>\n";
                        }
                    }
                    else {
                        cmd = "mysqldump --databases " + config_1.Config.dbschema + " --user=" + config_1.Config.dbuser + " --password=" + config_1.Config.dbpassword + " >" + thisDbBackup;
                        try {
                            shellresult = child.execSync(cmd, {
                                cwd: curdir,
                            });
                        }
                        catch (error) {
                            //Logger.error(req, JSON.stringify(error));
                        }
                        message += "Db backup " + thisDbBackup + " done ...<br>\n";
                    }
                }
                result = {
                    db: "" + thisDbBackup,
                    data: "" + thisDataBackup,
                    success: "true",
                    message: message
                };
                return [2 /*return*/, result];
            });
        });
    };
    Schedule.prototype.waitImport = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var message, result, data, thisPath, OperationalOnly, BestellingOnly, BewerkingOnly, OrderOnly, CalcOnly, curdir, thisDate, thisFilename, thisTime, Start;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = '';
                        result = {
                            success: "true",
                            message: message
                        };
                        thisPath = '';
                        OperationalOnly = 0;
                        BestellingOnly = 0;
                        BewerkingOnly = 0;
                        OrderOnly = 0;
                        CalcOnly = 0;
                        curdir = config_1.Config.appDir + "/import";
                        thisDate = util_1.Util.Date2Screendate(new Date());
                        thisFilename = config_1.Config.dbschema + "_" + thisDate + ".log";
                        thisTime = util_1.Util.Date2Screentime(new Date());
                        if (!(thisTime < config_1.Config.backuptime)) return [3 /*break*/, 1];
                        result = {
                            backup: '',
                            success: "true",
                            message: "Too early for import (" + config_1.Config.exacttime + ") ..."
                        };
                        return [3 /*break*/, 22];
                    case 1:
                        if (!fs.existsSync(curdir + "/" + thisFilename)) return [3 /*break*/, 2];
                        result = {
                            backup: thisFilename,
                            success: "true",
                            message: "Import " + thisFilename + " already made ..."
                        };
                        return [3 /*break*/, 22];
                    case 2:
                        Start = 1;
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
                        if (!(Start == 1)) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.cleanLog()];
                    case 3:
                        // cleanLog
                        data = _a.sent();
                        try {
                            if (data.items[0].MSG == '') {
                                message += "Logboodschappen ouder dan 5 dagen verwijderd. <br><br>";
                            }
                            else {
                                message += data.items[0].MSG;
                            }
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        if (!(OperationalOnly == 1)) return [3 /*break*/, 4];
                        return [3 /*break*/, 21];
                    case 4:
                        if (!(BestellingOnly == 1)) return [3 /*break*/, 5];
                        return [3 /*break*/, 21];
                    case 5:
                        if (!(BewerkingOnly == 1)) return [3 /*break*/, 6];
                        return [3 /*break*/, 21];
                    case 6:
                        if (!(OrderOnly == 1)) return [3 /*break*/, 7];
                        return [3 /*break*/, 21];
                    case 7:
                        if (!(CalcOnly == 1)) return [3 /*break*/, 8];
                        return [3 /*break*/, 21];
                    case 8:
                        //
                        // getLEVERANCIER
                        //
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Accounts"
                            + "&outfile=import/exactaccounts.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 9:
                        data = _a.sent();
                        try {
                            message += "\nLeverancier: " + data.msg + "<br>\n";
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactleverancier"
                            + "&file=import/exactaccounts.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 10:
                        data = _a.sent();
                        try {
                            message += data.items[0].msg + "\n";
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getKLANT
                        //
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Accounts"
                            + "&outfile=import/exactaccounts.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 11:
                        data = _a.sent();
                        try {
                            message += "\nKlant: " + data.msg + "<br>\n";
                            ;
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactklant"
                            + "&file=import/exactaccounts.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 12:
                        data = _a.sent();
                        try {
                            message += data.items[0].msg + "\n";
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getPRODUCT
                        //
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Items"
                            + "&outfile=import/exactitems.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 13:
                        data = _a.sent();
                        try {
                            message += "\nProduct: " + data.msg + "<br>\n";
                            ;
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactproduct"
                            + "&file=import/exactitems.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 14:
                        data = _a.sent();
                        try {
                            message += data.items[0].msg + "\n";
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getSTUKLIJST
                        //
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=ManufacturedBillofMaterials"
                            + "&Params_Status=30,20,10"
                            + "&outfile=import/exactmbom.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 15:
                        data = _a.sent();
                        try {
                            message += "\nStuklijst: " + data.msg + "<br>\n";
                            ;
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactproduct"
                            + "&file=import/exactmbom.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 16:
                        data = _a.sent();
                        try {
                            message += data.items[0].msg + "\n";
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getLEVERANCIERPRODUCT
                        //
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=PurchaseOrders"
                            + "&Params_Status=10,20"
                            + "&outfile=import/exactpurchase.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 17:
                        data = _a.sent();
                        try {
                            message += "\nLeverancierproduct: " + data.msg + "<br>\n";
                            ;
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactleverancierproduct"
                            + "&file=import/exactpurchase.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 18:
                        data = _a.sent();
                        try {
                            message += data.items[0].msg + "\n";
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        // getVOORRAAD
                        //
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=StockPositions"
                            + "&outfile=import/exactstock.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 19:
                        data = _a.sent();
                        try {
                            message += "\nVoorraad: " + data.msg + "<br>\n";
                            ;
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        //
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactvoorraad"
                            + "&file=import/exactstock.dat";
                        return [4 /*yield*/, this.getInfo(thisPath)];
                    case 20:
                        data = _a.sent();
                        try {
                            message += data.items[0].msg + "\n";
                        }
                        catch (error) {
                            message += JSON.stringify(error);
                        }
                        _a.label = 21;
                    case 21:
                        //
                        fs.appendFileSync(curdir + "/" + thisFilename, "Ready ...\n");
                        result = {
                            success: "true",
                            message: message
                        };
                        _a.label = 22;
                    case 22: return [2 /*return*/, result];
                }
            });
        });
    };
    Schedule.prototype.cleanLog = function () {
        return new Promise(function (resolve, reject) {
            var headers = {};
            var ak2req = http_1.default.request({
                host: config_1.Config.server,
                path: "/toolbox.php?app=" + config_1.Config.app + "&action=cleanlog",
                method: 'POST',
                port: config_1.Config.serverPort,
                headers: headers,
                protocol: 'http:'
            }, function (ak2res) {
                var responseString = "";
                ak2res.on("data", function (data) {
                    responseString += data;
                });
                ak2res.on("end", function () {
                    resolve(JSON.parse(responseString));
                });
                ak2res.on("error", function (error) {
                    logger_1.Logger.error(JSON.stringify(error));
                    reject(error);
                });
            });
            ak2req.on("error", function (error) {
                logger_1.Logger.error(JSON.stringify(error));
                reject(false);
            });
            ak2req.end();
        });
    };
    Schedule.prototype.getInfo = function (url) {
        return new Promise(function (resolve, reject) {
            var headers = {};
            var result;
            var ak2req = http_1.default.request({
                host: config_1.Config.server,
                path: url,
                method: 'GET',
                port: config_1.Config.serverPort,
                headers: headers,
                protocol: 'http:'
            }, function (ak2res) {
                var responseString = "";
                ak2res.on("data", function (data) {
                    responseString += data;
                });
                ak2res.on("end", function () {
                    try {
                        result = JSON.parse(responseString);
                    }
                    catch (error) {
                        result = responseString;
                    }
                    resolve(result);
                });
                ak2res.on("error", function (error) {
                    logger_1.Logger.error(JSON.stringify(error));
                    reject(error);
                });
            });
            ak2req.on("error", function (error) {
                logger_1.Logger.error(JSON.stringify(error));
                reject(false);
            });
            ak2req.end();
        });
    };
    Schedule.prototype.doBackup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        return [4 /*yield*/, this.waitBackup()];
                    case 1:
                        result = _a.sent();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Schedule.prototype.doImport = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        return [4 /*yield*/, this.waitImport("")];
                    case 1:
                        result = _a.sent();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Schedule.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action;
            return __generator(this, function (_a) {
                method = req.method;
                action = db_1.default.fix(req.query.action || '');
                //
                logger_1.Logger.request(req);
                //
                if (action == "backup") {
                    this.doBackup(req, res, next);
                }
                else if (action == "import") {
                    this.doImport(req, res, next);
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Schedule;
}(action_1.Action));
exports.Schedule = Schedule;
//# sourceMappingURL=schedule.js.map