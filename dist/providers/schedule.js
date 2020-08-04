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
//
var Schedule = /** @class */ (function (_super) {
    __extends(Schedule, _super);
    function Schedule() {
        var _this = _super.call(this, "Schedule") || this;
        _this.isRunning = false;
        _this.isRunning = false;
        if (config_1.Config.scheduleinterval > 0) {
            _this.runTimer();
        }
        return _this;
    }
    Schedule.prototype.addMessage = function (message, res) {
        logger_1.Logger.info(message);
        if (res) {
            res.write(message + "<br>");
        }
        return message + "\n";
    };
    Schedule.prototype.runTimer = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!true) return [3 /*break*/, 7];
                        return [4 /*yield*/, util_1.Util.sleep(config_1.Config.scheduleinterval)];
                    case 1:
                        _a.sent();
                        if (!(this.isRunning == true)) return [3 /*break*/, 2];
                        return [3 /*break*/, 6];
                    case 2:
                        this.addMessage("Schedule loopt " + util_1.Util.Date2Screentime(new Date()) + " ...");
                        result = {};
                        message = '';
                        return [4 /*yield*/, this.waitDbBackup("")];
                    case 3:
                        result = _a.sent();
                        return [4 /*yield*/, this.waitDataBackup("")];
                    case 4:
                        //message += this.addMessage(result.message);
                        result = _a.sent();
                        return [4 /*yield*/, this.waitImport("")];
                    case 5:
                        //message += this.addMessage(result.message);
                        result = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 0];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Schedule.prototype.waitDbBackup = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var message, result, Auto, curdir, thisDate, thisDbBackup, thisTime, cmd, shellresult;
            return __generator(this, function (_a) {
                message = '';
                result = {};
                Auto = 0;
                curdir = config_1.Config.appDir + "/backup";
                thisDate = util_1.Util.Date2Screendate(new Date());
                thisDbBackup = config_1.Config.dbschema + "_" + thisDate + ".sql";
                thisTime = util_1.Util.Date2Screentime(new Date());
                //
                if (action == "") {
                    Auto = 1;
                }
                if (Auto == 1) {
                    if (thisTime < config_1.Config.backuptime) {
                        message += this.addMessage("Wachten om backups te maken tot " + config_1.Config.backuptime + " ...");
                        result = {
                            backup: "" + thisDbBackup,
                            success: "true",
                            message: message
                        };
                        return [2 /*return*/, result];
                    }
                    if (fs.existsSync(curdir + "/" + thisDbBackup)) {
                        message += this.addMessage("Database backup " + thisDbBackup + " is vandaag al gemaakt ...");
                        result = {
                            backup: "" + thisDbBackup,
                            success: "true",
                            message: message
                        };
                        return [2 /*return*/, result];
                    }
                }
                //
                this.isRunning = true;
                cmd = "mysqldump --databases " + config_1.Config.dbschema + " --user=" + config_1.Config.dbuser + " --password=" + config_1.Config.dbpassword + " >" + thisDbBackup;
                try {
                    shellresult = child.execSync(cmd, {
                        cwd: curdir,
                    });
                }
                catch (error) {
                    //Logger.error(req, JSON.stringify(error));
                }
                message += this.addMessage("Database backup " + thisDbBackup + " is gemaakt ...");
                result = {
                    backup: "" + thisDbBackup,
                    success: "true",
                    message: message
                };
                //
                this.isRunning = false;
                //
                return [2 /*return*/, result];
            });
        });
    };
    Schedule.prototype.waitDataBackup = function (action) {
        return __awaiter(this, void 0, void 0, function () {
            var message, result, Auto, curdir, thisDate, thisDataBackup, thisTime, cmd, shellresult;
            return __generator(this, function (_a) {
                message = '';
                result = {};
                Auto = 0;
                curdir = config_1.Config.appDir + "/backup";
                thisDate = util_1.Util.Date2Screendate(new Date());
                thisDataBackup = config_1.Config.dbschema + "_" + thisDate + ".7z";
                thisTime = util_1.Util.Date2Screentime(new Date());
                //
                if (action == "") {
                    Auto = 1;
                }
                if (Auto == 1) {
                    if (thisTime < config_1.Config.backuptime) {
                        message += this.addMessage("Wachten om backups te maken tot " + config_1.Config.backuptime + " ...");
                        result = {
                            backup: "" + thisDataBackup,
                            success: "true",
                            message: message
                        };
                        return [2 /*return*/, result];
                    }
                    if (fs.existsSync(curdir + "/" + thisDataBackup)) {
                        message += this.addMessage("Databackup " + thisDataBackup + " is vandaag al gemaakt ...");
                        result = {
                            backup: "" + thisDataBackup,
                            success: "true",
                            message: message
                        };
                        return [2 /*return*/, result];
                    }
                }
                //
                this.isRunning = true;
                cmd = "\"\\program files\\7-zip\\7z\" a -tzip backup/" + thisDataBackup + " -x!backup .";
                message += this.addMessage(cmd);
                try {
                    shellresult = child.execSync(cmd, {
                        cwd: config_1.Config.appDir,
                    });
                }
                catch (error) {
                    //Logger.error(JSON.stringify(error));
                }
                message += this.addMessage("Data backup " + thisDataBackup + " is gemaakt ...");
                result = {
                    backup: "" + thisDataBackup,
                    success: "true",
                    message: message
                };
                //
                this.isRunning = false;
                //
                return [2 /*return*/, result];
            });
        });
    };
    Schedule.prototype.waitImport = function (action, res) {
        return __awaiter(this, void 0, void 0, function () {
            var titel, message, msg, result, data, thisPath, retry, All, Auto, OperationalOnly, BestellingOnly, BewerkingOnly, OrderOnly, CalcOnly, curdir, thisDate, thisFilename, thisTime, tlcycle, bericht;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        titel = '';
                        message = '';
                        msg = '';
                        result = {
                            success: "true",
                            message: message
                        };
                        thisPath = '';
                        retry = 0;
                        All = 0;
                        Auto = 0;
                        OperationalOnly = 0;
                        BestellingOnly = 0;
                        BewerkingOnly = 0;
                        OrderOnly = 0;
                        CalcOnly = 0;
                        curdir = config_1.Config.appDir + "/import";
                        thisDate = util_1.Util.Date2Screendate(new Date());
                        thisFilename = config_1.Config.dbschema + "_" + thisDate + ".log";
                        thisTime = util_1.Util.Date2Screentime(new Date());
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
                            if (thisTime < config_1.Config.backuptime) {
                                message += this.addMessage("Wacht to " + config_1.Config.exacttime + " voor de import ...");
                                result = {
                                    backup: '',
                                    success: "true",
                                    message: message
                                };
                                return [2 /*return*/, result];
                            }
                            if (fs.existsSync(curdir + "/" + thisFilename)) {
                                message += this.addMessage("Import " + thisFilename + " is vandaag al uitgevoerd ...");
                                result = {
                                    backup: thisFilename,
                                    success: "true",
                                    message: message
                                };
                                return [2 /*return*/, result];
                            }
                        }
                        //
                        this.isRunning = true;
                        //
                        // clean
                        //
                        message += this.addMessage("Logboodschappen en backups ouder dan 7 dagen verwijderen.", res);
                        thisPath = "/toolbox.php?app=" + config_1.Config.app
                            + "&action=cleanbackup";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath)];
                    case 1:
                        data = _a.sent();
                        try {
                            if (data.items[0].MSG == '') {
                            }
                            else {
                                message += this.addMessage(data.items[0].MSG, res);
                            }
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        if (!(All == 1)) return [3 /*break*/, 6];
                        //
                        // getLEVERANCIER
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 2];
                        message += this.addMessage("Skip Ophalen leveranciers.", res);
                        return [3 /*break*/, 4];
                    case 2:
                        message += this.addMessage("Ophalen leveranciers.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Accounts"
                            + "&outfile=import/exactaccounts.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 3:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 4;
                    case 4:
                        //
                        message += this.addMessage("Leveranciers inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactleverancier"
                            + "&file=import/exactaccounts.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 5:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 6;
                    case 6:
                        if (!(All == 1)) return [3 /*break*/, 11];
                        //
                        // getKLANT
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 7];
                        message += this.addMessage("Skip Ophalen klanten.", res);
                        return [3 /*break*/, 9];
                    case 7:
                        message += this.addMessage("Ophalen klanten.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Accounts"
                            + "&outfile=import/exactaccounts.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 8:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 9;
                    case 9:
                        //
                        message += this.addMessage("Klanten inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactklant"
                            + "&file=import/exactaccounts.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 10:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 11;
                    case 11:
                        if (!(All == 1)) return [3 /*break*/, 16];
                        //
                        // getPRODUCT
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 12];
                        message += this.addMessage("Skip Ophalen producten.", res);
                        return [3 /*break*/, 14];
                    case 12:
                        message += this.addMessage("Ophalen producten.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Items"
                            + "&outfile=import/exactitems.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 13:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 14;
                    case 14:
                        //
                        message += this.addMessage("Producten inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactproduct"
                            + "&file=import/exactitems.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 15:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 16;
                    case 16:
                        if (!(All == 1)) return [3 /*break*/, 21];
                        //
                        // getSTUKLIJST
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 17];
                        message += this.addMessage("Skip Ophalen stuklijsten.", res);
                        return [3 /*break*/, 19];
                    case 17:
                        message += this.addMessage("Ophalen stuklijsten.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=ManufacturedBillofMaterials"
                            + "&Params_Status=30,20,10"
                            + "&outfile=import/exactmbom.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 18:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 19;
                    case 19:
                        //
                        message += this.addMessage("Stuklijsten inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactstuklijst"
                            + "&file=import/exactmbom.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 20:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 21;
                    case 21:
                        if (!(All == 1)) return [3 /*break*/, 26];
                        //
                        // getLEVERANCIERPRODUCT
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 22];
                        message += this.addMessage("Skip Ophalen leverancierproductnummers.", res);
                        return [3 /*break*/, 24];
                    case 22:
                        message += this.addMessage("Ophalen leverancierproductnummers.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=PurchaseOrders"
                            + "&Params_Status=10,20"
                            + "&outfile=import/exactpurchase.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 23:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 24;
                    case 24:
                        //
                        message += this.addMessage("Leverancierproductnummers inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactleverancierproduct"
                            + "&file=import/exactpurchase.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 25:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 26;
                    case 26:
                        if (!(All == 1)) return [3 /*break*/, 31];
                        //
                        // getVOORRAAD
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 27];
                        message += this.addMessage("Skip Ophalen voorraad.", res);
                        return [3 /*break*/, 29];
                    case 27:
                        message += this.addMessage("Ophalen voorraad.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=StockPositions"
                            + "&outfile=import/exactstock.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 28:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 29;
                    case 29:
                        //
                        message += this.addMessage("Voorraad inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactvoorraad"
                            + "&file=import/exactstock.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 30:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 31;
                    case 31:
                        if (!(All == 1 || OperationalOnly == 1 || BestellingOnly == 1)) return [3 /*break*/, 36];
                        //
                        // getBESTELLING
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 32];
                        message += this.addMessage("Skip Ophalen bestellingen.", res);
                        return [3 /*break*/, 34];
                    case 32:
                        message += this.addMessage("Ophalen bestellingen.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=PurchaseOrders"
                            + "&Params_Status=10,20"
                            + "&outfile=import/exactpurchase.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 33:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 34;
                    case 34:
                        //
                        message += this.addMessage("Bestellingen inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactbestelling"
                            + "&file=import/exactpurchase.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 35:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 36;
                    case 36:
                        if (!(All == 1 || OperationalOnly == 1 || BestellingOnly == 1)) return [3 /*break*/, 41];
                        //
                        // getRECEIPT
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 37];
                        message += this.addMessage("Skip Ophalen ontvangsten.", res);
                        return [3 /*break*/, 39];
                    case 37:
                        message += this.addMessage("Ophalen ontvangsten.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Receipts"
                            + "&outfile=import/exactreceipt.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 38:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 39;
                    case 39:
                        //
                        message += this.addMessage("Ontvangsten inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactreceipt"
                            + "&file=import/exactreceipt.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 40:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 41;
                    case 41:
                        if (!(All == 1 || OperationalOnly == 1 || OrderOnly == 1)) return [3 /*break*/, 46];
                        //
                        // getORDER
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 42];
                        message += this.addMessage("Skip Ophalen orders.", res);
                        return [3 /*break*/, 44];
                    case 42:
                        message += this.addMessage("Ophalen orders.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=SalesOrders"
                            + "&Params_Status=12,20"
                            + "&outfile=import/exactsales.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 43:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 44;
                    case 44:
                        //
                        message += this.addMessage("Orders inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactorder"
                            + "&file=import/exactsales.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 45:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 46;
                    case 46:
                        if (!(All == 1 || OperationalOnly == 1 || OrderOnly == 1)) return [3 /*break*/, 51];
                        //
                        // getDELIVERY
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 47];
                        message += this.addMessage("Skip Ophalen afleveringen.", res);
                        return [3 /*break*/, 49];
                    case 47:
                        message += this.addMessage("Ophalen afleveringen.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=Deliveries"
                            + "&outfile=import/exactdeliveries.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 48:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 49;
                    case 49:
                        //
                        message += this.addMessage("Afleveringen inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactdelivery"
                            + "&file=import/exactdeliveries.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 50:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 51;
                    case 51:
                        if (!(All == 1 || OperationalOnly == 1 || BewerkingOnly == 1)) return [3 /*break*/, 56];
                        //
                        // getBEWERK
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 52];
                        message += this.addMessage("Skip Ophalen bewerkingen.", res);
                        return [3 /*break*/, 54];
                    case 52:
                        message += this.addMessage("Ophalen bewerkingen.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=ShopOrders"
                            + "&Params_Status=20,10"
                            + "&outfile=import/exactshoporders.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 53:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 54;
                    case 54:
                        //
                        message += this.addMessage("Bewerkingen inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactbewerk"
                            + "&file=import/exactshoporders.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 55:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 56;
                    case 56:
                        if (!(All == 1 || OperationalOnly == 1 || BewerkingOnly == 1)) return [3 /*break*/, 61];
                        //
                        // getBEWERKONTVANGST
                        //
                        message += this.addMessage("", res);
                        if (!(config_1.Config.exactinterfaceapp == "false")) return [3 /*break*/, 57];
                        message += this.addMessage("Skip Ophalen bewerkingontvangsten.", res);
                        return [3 /*break*/, 59];
                    case 57:
                        message += this.addMessage("Ophalen bewerkingontvangsten.", res);
                        thisPath = "/exactclient.php?app=" + config_1.Config.app
                            + "&action=GET"
                            + "&type=XML"
                            + "&topic=ShopOrderStockReceipts"
                            + "&outfile=import/exactshoporderreceipts.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 58:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 59;
                    case 59:
                        //
                        message += this.addMessage("Bewerkingontvangsten inlezen.", res);
                        thisPath = "/upload.php?app=" + config_1.Config.app
                            + "&action=get,exactbewerkontvangst"
                            + "&file=import/exactshoporderreceipts.dat";
                        return [4 /*yield*/, util_1.Util.getInfo(thisPath)];
                    case 60:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(JSON.stringify(error), res);
                        }
                        _a.label = 61;
                    case 61:
                        if (!(All == 1 || CalcOnly == 1)) return [3 /*break*/, 63];
                        //
                        // addlogistiek
                        //
                        message += this.addMessage("", res);
                        message += this.addMessage("Default bewerkingen toevoegen.", res);
                        thisPath = "/toolbox.php?app=" + config_1.Config.app
                            + "&action=addlogistiek";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath)];
                    case 62:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].MSG, res);
                        }
                        catch (error) {
                            message += this.addMessage(data, res);
                        }
                        _a.label = 63;
                    case 63:
                        if (!(All == 1 || CalcOnly == 1)) return [3 /*break*/, 65];
                        //
                        // fase0: Oude voorraadstand opschonen
                        //
                        message += this.addMessage("Oude voorraadstand opschonen.", res);
                        thisPath = "/voorraad.php?app=" + config_1.Config.app
                            + "&action=fase0";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath)];
                    case 64:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(data, res);
                        }
                        _a.label = 65;
                    case 65:
                        if (!(All == 1 || CalcOnly == 1)) return [3 /*break*/, 67];
                        //
                        // fase1: Startvoorraad, orders, bestellingen en bewerkingen doorrekenen
                        //
                        message += this.addMessage("Startvoorraad, orders, bestellingen en bewerkingen doorrekenen.", res);
                        thisPath = "/voorraad.php?app=" + config_1.Config.app
                            + "&action=fase1";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath)];
                    case 66:
                        data = _a.sent();
                        try {
                            message += this.addMessage(data.items[0].msg, res);
                        }
                        catch (error) {
                            message += this.addMessage(data, res);
                        }
                        _a.label = 67;
                    case 67:
                        if (!(All == 1 || CalcOnly == 1)) return [3 /*break*/, 73];
                        //
                        // Fase2: Voorraad afboeken van onderdelen van producten waar tekorten van zijn
                        //
                        message += this.addMessage("Voorraad afboeken van onderdelen van producten waar tekorten van zijn.", res);
                        thisPath = "/voorraad.php?app=" + config_1.Config.app
                            + "&action=fase2";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath)];
                    case 68:
                        data = _a.sent();
                        retry = 0;
                        try {
                            if (Number(data.items[0].regelsbesteld) > 0) {
                                // is het goede type antwoord gegeven
                                retry = 1;
                            }
                        }
                        catch (error) {
                            message += this.addMessage(data, res);
                        }
                        tlcycle = 0;
                        _a.label = 69;
                    case 69:
                        if (!(retry > 0)) return [3 /*break*/, 73];
                        message += this.addMessage(data.items[0].regelsbesteld + " regels afgeboekt, nog een keer ...", res);
                        tlcycle++;
                        retry = 0;
                        if (!(tlcycle > 6)) return [3 /*break*/, 70];
                        message += this.addMessage("Onderdeel is Onderdeel probleem, toch maar opbouwen lijst ...", res);
                        return [3 /*break*/, 72];
                    case 70:
                        thisPath = "/voorraad.php?app=" + config_1.Config.app
                            + "&action=fase2";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath)];
                    case 71:
                        data = _a.sent();
                        try {
                            if (Number(data.items[0].regelsbesteld) > 0) {
                                // is het goede type antwoord gegeven
                                retry = 1;
                            }
                        }
                        catch (error) {
                            message += this.addMessage(data, res);
                        }
                        _a.label = 72;
                    case 72: return [3 /*break*/, 69];
                    case 73:
                        if (!(All == 1 || CalcOnly == 1)) return [3 /*break*/, 75];
                        //
                        // fase3: Voorraadstand vastleggen
                        //
                        message += this.addMessage("Voorraadstand vastleggen ...", res);
                        thisPath = "/voorraad.php?app=" + config_1.Config.app
                            + "&action=fase3";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath)];
                    case 74:
                        data = _a.sent();
                        msg = 'Vastgelegd.';
                        if (data.items) {
                            if (data.items[0]) {
                                if (data.items[0].regelsbijgewerkt) {
                                    msg = data.regelsbijgewerkt + " regels vastgelegd.";
                                }
                            }
                        }
                        message += this.addMessage(msg);
                        _a.label = 75;
                    case 75:
                        if (!(All == 1 || CalcOnly == 1)) return [3 /*break*/, 79];
                        //
                        // Eerste fase4: Beperkende faktoren bijwerken (Zoek de kurk)
                        //
                        message += this.addMessage("Beperkende faktoren bijwerken (Zoek de kurk) ...", res);
                        thisPath = "/voorraad.php?app=" + config_1.Config.app
                            + "&action=fase4";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath)];
                    case 76:
                        data = _a.sent();
                        retry = 0;
                        try {
                            if (data.items[0].regels > 0) {
                                retry = 1;
                            }
                        }
                        catch (error) {
                            message += this.addMessage(data, res);
                        }
                        _a.label = 77;
                    case 77:
                        if (!(retry > 0)) return [3 /*break*/, 79];
                        message += this.addMessage(data.items[0].regels + " regels doorzocht, nog een keer ...", res);
                        thisPath = "/voorraad.php?app=" + config_1.Config.app
                            + "&action=fase4";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath)];
                    case 78:
                        data = _a.sent();
                        retry = 0;
                        try {
                            if (Number(data.items[0].regels) > 0) {
                                retry = 1;
                            }
                        }
                        catch (error) {
                            message += this.addMessage(data, res);
                        }
                        return [3 /*break*/, 77];
                    case 79:
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
                        bericht = {};
                        bericht.datum = util_1.Util.Date2Screendatetime(new Date());
                        bericht.author = config_1.Config.appnaam;
                        bericht.email = "";
                        bericht.header = config_1.Config.appnaam + " " + util_1.Util.Date2Screendatetime(new Date()) + ": " + titel;
                        bericht.inhoud = encodeURIComponent(message);
                        bericht.moderated = 1;
                        thisPath = "/bb.php?app=" + config_1.Config.app
                            + "&action=addmsg"
                            + "&bb=Log";
                        return [4 /*yield*/, util_1.Util.postInfo(thisPath, bericht)];
                    case 80:
                        data = _a.sent();
                        //
                        // Logging
                        //
                        fs.appendFileSync(curdir + "/" + thisFilename, message.replace(/<br>/gi, ''));
                        result = {
                            success: "true",
                            message: message
                        };
                        //
                        this.isRunning = false;
                        //
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Schedule.prototype.doDbBackup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        return [4 /*yield*/, this.waitDbBackup(query.type)];
                    case 1:
                        result = _a.sent();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Schedule.prototype.doDataBackup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        return [4 /*yield*/, this.waitDataBackup(query.type)];
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
                        return [4 /*yield*/, this.waitImport(query.type, res)];
                    case 1:
                        result = _a.sent();
                        res.end();
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
                if (action == "dbbackup" || action == "get,dbbackup") {
                    this.doDbBackup(req, res, next);
                }
                else if (action == "databackup" || action == "get,databackup") {
                    this.doDataBackup(req, res, next);
                }
                else if (action == "import" || action == "get,import") {
                    //
                    res.setHeader("Content-Type", "text/event-stream");
                    res.setHeader("Cache-Control", "no-cache");
                    //
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