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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bewerkinguitval = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
//
var dict = {
    table: "bewerkinguitval",
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
var Bewerkinguitval = /** @class */ (function (_super) {
    __extends(Bewerkinguitval, _super);
    function Bewerkinguitval() {
        return _super.call(this, dict) || this;
    }
    Bewerkinguitval.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, where, sql, rows, row, bewerkingsnummer, bewerkingflowid, productnummer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        where = '';
                        sql = '';
                        bewerkingsnummer = db_1.default.fix(req.query.bewerkingsnummer || '');
                        bewerkingflowid = db_1.default.fix(req.query.bewerkingflowid || '');
                        productnummer = db_1.default.fix(req.query.productnummer || '');
                        if (!((bewerkingsnummer == '') && (bewerkingflowid != ''))) return [3 /*break*/, 3];
                        sql = "\nselect bewerkingsnummer from BEWERKINGFLOW \nwhere id = '" + bewerkingflowid + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        if (rows[0]) {
                            row = rows[0];
                            bewerkingsnummer = row.BEWERKINGSNUMMER;
                        }
                        _b.label = 3;
                    case 3:
                        if (bewerkingflowid != '') {
                            sql = "\ninsert into BEWERKINGUITVAL \n(bewerkingsnummer, bewerkingflowid, productnummer, uitval)\nselect \n'" + bewerkingsnummer + "',\n'" + bewerkingflowid + "',\n'" + productnummer + "',\nuitval\nfrom UITVAL\nwhere not exists (\nselect 1 from BEWERKINGUITVAL\nwhere BEWERKINGUITVAL.uitval = UITVAL.UITVAL\nand bewerkingflowid = '" + bewerkingflowid + "')\nand exists (\nselect 1 from BEWERKING \nwhere BEWERKING.bewerkingsnummer = '" + bewerkingsnummer + "')";
                            db_1.default.waitQuery(res.crudConnection, sql);
                        }
                        sql = "\nselect * from (\nselect \nBEWERKINGUITVAL.id, \nBewerkingsnummer,\nProductnummer,\nBewerkingflowid,\ncase when AantalReparatie = 0 then null else AantalReparatie end as AantalReparatie,\ncase when AantalAfkeur = 0 then null else AantalAfkeur end as AantalAfkeur,\n(select min(naam) from GEBRUIKER \nwhere GEBRUIKER.Gebruiker = BEWERKINGUITVAL.gebruiker) \nas gebruiker,\n(select min(concat(uitval,' ',naam)) from UITVAL \nwhere UITVAL.UITVAL = BEWERKINGUITVAL.uitval) as uitval\nfrom BEWERKINGUITVAL";
                        if (bewerkingsnummer != '') {
                            if (where == '') {
                                where += '\nwhere ';
                            }
                            else {
                                where += '\nand ';
                            }
                            where += "BEWERKINGUITVAL.bewerkingsnummer = '" + bewerkingsnummer + "'";
                        }
                        if (bewerkingflowid != '') {
                            if (where == '') {
                                where += '\nwhere ';
                            }
                            else {
                                where += '\nand ';
                            }
                            where += "bewerkingflowid = '" + bewerkingflowid + "'";
                        }
                        sql += "\n" + where + "\n) base\norder by Bewerkingsnummer,uitval\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        //
                        rows = _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkinguitval.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        id = db_1.default.fix(db_1.default.getDataId(req));
                        sql = "\nupdate BEWERKINGUITVAL set\nBewerkingsnummer = '" + db_1.default.fix(req.body.BEWERKINGSNUMMER) + "',\nBewerkingflowid = '" + db_1.default.fix(req.body.BEWERKINGFLOWID) + "',\nProductnummer = '" + db_1.default.fix(req.body.PRODUCTNUMMER) + "',\nAantalReparatie = '" + db_1.default.fix(req.body.AANTALREPARATIE) + "',\nAantalAfkeur = '" + db_1.default.fix(req.body.AANTALAFKEUR) + "',";
                        if (req.body.GEBRUIKER == '') {
                            sql += "\nGebruiker = '" + req.ak2_user + "'";
                        }
                        else {
                            sql += "\nGebruiker = \n(select min(gebruiker) from GEBRUIKER \nwhere naam = '" + db_1.default.fix(req.body.GEBRUIKER) + "')";
                        }
                        sql += "\nwhere id = '" + id + "'";
                        //
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        //
                        _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkinguitval.prototype.doInsert = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        sql = "\ninsert into BEWERKINGUITVAL\n(Bewerkingsnummer,Bewerkingflowid,Productnummer,Gebruiker,Uitval,\nAantalReparatie, AantalAfkeur)\nvalues (\n'" + db_1.default.fix(req.body.BEWERKINGSNUMMER) + "',\n'" + db_1.default.fix(req.body.BEWERKINGFLOWID) + "',\n'" + db_1.default.fix(req.body.PRODUCTNUMMER) + "',\n(select min(gebruiker) from GEBRUIKER \nwhere naam = '" + db_1.default.fix(req.body.GEBRUIKER) + "'),\n(select min(uitval) from UITVAL \nwhere naam = '" + db_1.default.fix(req.query.UITVAL).substr(0, 2) + "'),\n'" + db_1.default.fix(req.body.AANTALREPARATIE) + "',\n'" + db_1.default.fix(req.body.AANTALAFKEUR) + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        result = _b.sent();
                        req.body.ID = db_1.default.getInsertId(result);
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkinguitval.prototype.doDelete = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        id = db_1.default.fix(db_1.default.getDataId(req));
                        sql = "\ndelete from bewerkinguitval\nwhere id = '" + id + "'";
                        //
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        //
                        _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkinguitval.prototype.routes = function (req, res, next) {
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
                    this.doUpdate(req, res, next, this.dict);
                }
                else if (method == "POST") {
                    this.doInsert(req, res, next, this.dict);
                }
                else if (method == "DELETE") {
                    this.doDelete(req, res, next, this.dict);
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Bewerkinguitval;
}(crud_1.Crud));
exports.Bewerkinguitval = Bewerkinguitval;
//# sourceMappingURL=bewerkinguitval.js.map