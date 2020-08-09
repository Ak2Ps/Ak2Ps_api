"use strict";
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
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var config_1 = require("../config");
var fs = __importStar(require("fs"));
var Status = /** @class */ (function () {
    function Status() {
        logger_1.Logger.info("Creating Status");
    }
    Status.prototype.getStatus = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var poolstatus, connection, thisParam, thisError, thisErrorName, thisErrorLines, iLine, thisLog, thisApiName, thisApiLines, iLine, result;
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
                        //
                        //
                        //
                        connection.release();
                        result = {
                            poolstatus: poolstatus,
                            versie: thisParam,
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