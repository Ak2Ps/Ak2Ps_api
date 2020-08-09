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
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var guid_typescript_1 = require("guid-typescript");
var Logon = /** @class */ (function () {
    function Logon() {
        logger_1.Logger.info("Creating Logon");
    }
    Logon.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action, connection, gebruiker, wachtwoord, result, sql, rows, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = req.method;
                        action = db_1.default.fix(req.query.action || '');
                        if (!(method == "GET")) return [3 /*break*/, 1];
                        util_1.Util.unknownOperation(req, res, next);
                        return [2 /*return*/];
                    case 1:
                        if (!(method == "PUT")) return [3 /*break*/, 2];
                        util_1.Util.unknownOperation(req, res, next);
                        return [2 /*return*/];
                    case 2:
                        if (!(method == "POST")) return [3 /*break*/, 6];
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 3:
                        connection = _a.sent();
                        gebruiker = db_1.default.fix(req.body.gebruiker);
                        wachtwoord = db_1.default.fix(req.body.wachtwoord);
                        result = null;
                        sql = "\nselect '0' as RESULT,GEBRUIKER,NAAM,EMAIL,MENU,TOKEN,'' as DATAURL\nfrom GEBRUIKER\nwhere upper(gebruiker) = upper('" + gebruiker + "')\nand aktief = 1\nand ifnull(wachtwoord,'') = '" + wachtwoord + "';";
                        return [4 /*yield*/, db_1.default.waitQuerySilent(connection, sql)];
                    case 4:
                        rows = _a.sent();
                        if (rows.length == 0) {
                            result = {
                                items: [{ RESULT: "-1", MSG: "Onbekend" }]
                            };
                            connection.release();
                            res.status(200).send(result);
                            return [2 /*return*/];
                        }
                        result = {
                            items: rows
                        };
                        token = guid_typescript_1.Guid.create();
                        sql = "\nupdate GEBRUIKER set\ntoken = '" + token + "'\nwhere upper(gebruiker)=upper('" + gebruiker + "');";
                        return [4 /*yield*/, db_1.default.waitQuerySilent(connection, sql)];
                    case 5:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 6:
                        if (method == "DELETE") {
                            util_1.Util.unknownOperation(req, res, next);
                            return [2 /*return*/];
                        }
                        _a.label = 7;
                    case 7:
                        util_1.Util.unknownOperation(req, res, next);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Logon;
}());
exports.Logon = Logon;
//# sourceMappingURL=logon.js.map