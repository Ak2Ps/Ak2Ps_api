"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var config_1 = require("../config");
var fs = __importStar(require("fs"));
var Status = /** @class */ (function () {
    function Status() {
        logger_1.Logger.info("Creating Status");
    }
    Status.prototype.setLogger = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result;
            return __generator(this, function (_a) {
                query = db_1.default.fixQuery(req.query);
                if (query.show_error) {
                    if (query.show_error == "false") {
                        config_1.Config.show_error = false;
                    }
                    else {
                        config_1.Config.show_error = true;
                    }
                }
                if (query.show_warning) {
                    if (query.show_warning == "false") {
                        config_1.Config.show_warning = false;
                    }
                    else {
                        config_1.Config.show_warning = true;
                    }
                }
                if (query.show_info) {
                    if (query.show_info == "false") {
                        config_1.Config.show_info = false;
                    }
                    else {
                        config_1.Config.show_info = true;
                    }
                }
                if (query.show_sql) {
                    if (query.show_sql == "false") {
                        config_1.Config.show_sql = false;
                    }
                    else {
                        config_1.Config.show_sql = true;
                    }
                }
                result = {
                    show_error: config_1.Config.show_error,
                    show_warning: config_1.Config.show_warning,
                    show_info: config_1.Config.show_info,
                    show_sql: config_1.Config.show_sql,
                };
                res.status(200).send(result);
                return [2 /*return*/];
            });
        });
    };
    Status.prototype.getStatus = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var poolstatus, connection, thisParam, thisError, thisErrorName, thisErrorLines, iLine, thisLog, thisApiName, thisApiLines, iLine, thisDb, thisData, thisImport, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.waitPoolstatus()
                        //
                        // haal versie
                        //
                    ];
                    case 1:
                        poolstatus = _a.sent();
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 2:
                        connection = _a.sent();
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, "VERSIE")];
                    case 3:
                        thisParam = _a.sent();
                        thisError = [];
                        thisErrorName = config_1.Config.appDir + "/log/error.log";
                        thisErrorLines = [];
                        try {
                            thisErrorLines = String(fs.readFileSync(thisErrorName)).split("\n");
                        }
                        catch (error) {
                            // no errors
                        }
                        for (iLine = thisErrorLines.length - 50; iLine < thisErrorLines.length; iLine++) {
                            if (iLine >= 0) {
                                thisError.push(String(iLine) + ": " + thisErrorLines[iLine]);
                            }
                        }
                        thisLog = [];
                        thisApiName = config_1.Config.appDir + "/log/api.log";
                        thisApiLines = [];
                        try {
                            thisApiLines = String(fs.readFileSync(thisApiName)).split("\n");
                        }
                        catch (error) {
                            // no log
                        }
                        for (iLine = thisApiLines.length - 50; iLine < thisApiLines.length; iLine++) {
                            if (iLine >= 0) {
                                thisLog.push(String(iLine) + ": " + thisApiLines[iLine]);
                            }
                        }
                        thisDb = [];
                        fs.readdirSync(config_1.Config.appDir + "/backup").map(function (filename) {
                            if (filename.endsWith(".sql")) {
                                var path = config_1.Config.appDir + "/backup/" + filename;
                                var file = fs.statSync(path);
                                thisDb.push(filename + ": (" + file.size + ")");
                            }
                        });
                        thisData = [];
                        fs.readdirSync(config_1.Config.appDir + "/backup").map(function (filename) {
                            if (filename.endsWith(".7z")) {
                                var path = config_1.Config.appDir + "/backup/" + filename;
                                var file = fs.statSync(path);
                                thisData.push(filename + ": (" + file.size + ")");
                            }
                        });
                        thisImport = [];
                        fs.readdirSync(config_1.Config.appDir + "/import").map(function (filename) {
                            if (filename.endsWith(".log")) {
                                var path = config_1.Config.appDir + "/import/" + filename;
                                var file = fs.statSync(path);
                                thisImport.push(filename);
                            }
                        });
                        //
                        //
                        //
                        connection.release();
                        result = {
                            versie: thisParam,
                            show_error: config_1.Config.show_error,
                            show_warning: config_1.Config.show_warning,
                            show_info: config_1.Config.show_info,
                            show_sql: config_1.Config.show_sql,
                            poolstatus: poolstatus,
                            dbbackupstatus: thisDb,
                            databackupstatus: thisData,
                            importstatus: thisImport,
                            error: thisError,
                            log: thisLog,
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Status.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action;
            return __generator(this, function (_a) {
                method = req.method;
                action = util_1.Util.getLast(req.query.action);
                //
                logger_1.Logger.request(req);
                //
                if (action == "get") {
                    this.getStatus(req, res, next);
                }
                else if (action == "setLogger") {
                    this.setLogger(req, res, next);
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Status;
}());
exports.Status = Status;
//# sourceMappingURL=status.js.map