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
exports.Bewerkingtijd = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
//
var dict = {
    table: "bewerkingtijd",
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
var Bewerkingtijd = /** @class */ (function (_super) {
    __extends(Bewerkingtijd, _super);
    function Bewerkingtijd() {
        return _super.call(this, dict) || this;
    }
    Bewerkingtijd.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var bewerkingsnummer, bewerkingflowid, where, _a, sql, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bewerkingsnummer = db_1.default.fix(req.query.bewerkingsnummer || '');
                        bewerkingflowid = db_1.default.fix(req.query.bewerkingflowid || '');
                        where = '';
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        sql = "\nselect * from (\nselect \nid, \nBewerkingsnummer, \nBewerkingflowId, \nProductnummer, \nAantalGemaakt, \nAantalUitval,\n(select min(naam) from GEBRUIKER where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) as gebruiker,\n(select min(naam) from BEWERKINGSOORT where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGTIJD.bewerkingsoort) as bewerkingsoort,\n(select min(kleur) from BEWERKINGSOORT where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGTIJD.bewerkingsoort) as kleur,\nstartdatumtijd,\neinddatumtijd,\ndate2screendate(startdatumtijd) as DATUM,\ndate2screentime(startdatumtijd) as START,\ndate2screentime(einddatumtijd) as EIND,\ntijd\nfrom BEWERKINGTIJD";
                        if (bewerkingsnummer != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "bewerkingsnummer = '" + bewerkingsnummer + "'";
                        }
                        if (bewerkingflowid != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "bewerkingflowid = '" + bewerkingflowid + "'";
                        }
                        sql += "\n" + where + "\n) base\norder by Bewerkingsnummer,Productnummer,Gebruiker,startdatumtijd";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingtijd.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, id, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = db_1.default.fix(db_1.default.getDataId(req));
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        //
                        sql = "\nupdate BEWERKINGTIJD set'\nBewerkingsnummer = '" + db_1.default.fix(req.body.BEWERKINGSNUMMER || '') + "',\nBewerkingflowid = '" + db_1.default.fix(req.body.BEWERKINGFLOWID || '') + "',\nProductnummer = '" + db_1.default.fix(req.body.PRODUCTNUMMER || '') + "',\nAantalGemaakt = '" + db_1.default.fix(req.body.AANTALGEMAAKT || '') + "',\nAantalUitval = '" + db_1.default.fix(req.body.AANTALUITVAL || '') + "',";
                        if (req.body.GEBRUIKER == '') {
                            sql += "\nGebruiker = '" + req.ak2_user + "',";
                        }
                        else {
                            sql += "\nGebruiker = \n(select min(gebruiker) from GEBRUIKER\nwhere naam = '" + db_1.default.fix(req.body.GEBRUIKER || '') + "'),";
                        }
                        sql += "\nBewerkingsoort = \n(select min(bewerkingsoort) from BEWERKINGSOORT \nwhere naam = '" + db_1.default.fix(req.body.BEWERKINGSOORT || '') + "'),\nstartdatumtijd = screendatetime2date('" + db_1.default.fix(req.body.DATUM || '') + " " + db_1.default.fix(req.body.START || '') + "'),\neinddatumtijd = screendatetime2date('" + db_1.default.fix(req.body.DATUM || '') + " " + db_1.default.fix(req.body.EIND || '') + "'),\ntijd = '" + db_1.default.fix(req.body.TIJD || '') + "'\nwhere id = '" + id + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _b.sent();
                        //
                        sql = "\nupdate BEWERKINGTIJD set\ntijd=TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)\nwhere id = '" + id + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _b.sent();
                        //
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingtijd.prototype.doInsert = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = db_1.default.fix(db_1.default.getDataId(req));
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        sql = "\ninsert into BEWERKINGTIJD\n(Bewerkingsnummer,Bewerkingflowid,Productnummer,Gebruiker,Bewerkingsoort,\nAantalGemaakt, AantalUitval,\nstartdatumtijd,einddatumtijd,tijd)\nvalues (\n'" + db_1.default.fix(req.body.BEWERKINGSNUMMER || '') + "',\n'" + db_1.default.fix(req.body.BEWERKINGFLOWID || '') + "',\n'" + db_1.default.fix(req.body.PRODUCTNUMMER || '') + "',\n(select min(gebruiker) from GEBRUIKER \nwhere naam = '" + db_1.default.fix(req.body.GEBRUIKER || '') + "'),\n(select min(bewerkingsoort) from BEWERKINGSOORT \nwhere naam = '" + db_1.default.fix(req.body.BEWERKINGSOORT || '') + "'),\n'" + db_1.default.fix(req.body.AANTALGEMAAKT || '') + "',\n'" + db_1.default.fix(req.body.AANTALUITVAL || '') + "',\nscreendatetime2date('" + db_1.default.fix(req.body.DATUM || '') + " " + db_1.default.fix(req.body.START || '') + "'),\nscreendatetime2date('" + db_1.default.fix(req.body.DATUM || '') + " " + db_1.default.fix(req.body.EIND || '') + "'),\n'" + db_1.default.fix(req.body.TIJD || '') + "'\n)";
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
    Bewerkingtijd.prototype.doDelete = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        id = db_1.default.getDataId(req);
                        sql = "\ndelete from BEWERKINGTIJD\nwhere id = '" + id + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        result = _b.sent();
                        //
                        // en daarna de afterdelete
                        //
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingtijd.prototype.routes = function (req, res, next) {
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
    return Bewerkingtijd;
}(crud_1.Crud));
exports.Bewerkingtijd = Bewerkingtijd;
//# sourceMappingURL=bewerkingtijd.js.map