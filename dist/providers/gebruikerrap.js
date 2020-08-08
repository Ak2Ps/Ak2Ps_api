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
exports.Gebruikerrap = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
//
var dict = {
    table: "gebruikerrap",
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
var Gebruikerrap = /** @class */ (function (_super) {
    __extends(Gebruikerrap, _super);
    function Gebruikerrap() {
        return _super.call(this, dict) || this;
    }
    Gebruikerrap.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sql, rows, row, where, naam, startdatum, einddatum, afdeling, inuit, gebruiker;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        sql = '';
                        where = '';
                        naam = db_1.default.fix(req.query.naam || '');
                        startdatum = db_1.default.fix(req.query.startdatum || '');
                        einddatum = db_1.default.fix(req.query.einddatum || '');
                        afdeling = db_1.default.fix(req.query.afdeling || '');
                        inuit = db_1.default.fix(req.query.inuit || '');
                        gebruiker = '';
                        if (!(naam != '')) return [3 /*break*/, 3];
                        sql = "\nselect gebruiker \nfrom GEBRUIKER where naam = '" + naam + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        if (rows[0]) {
                            row = rows[0];
                            gebruiker = row.GEBRUIKER;
                        }
                        else {
                            gebruiker = '???';
                        }
                        _b.label = 3;
                    case 3:
                        //
                        sql = "\nselect * from (\nselect \nid, \nBewerkingsnummer, \nProductnummer, \nAantalGemaakt, \nAantalUitval, \nGebruiker,\n(select min(afdeling) from GEBRUIKER \nwhere GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker ) \nas Afdeling,\n(select min(AFDELING.naam) \nfrom GEBRUIKER,AFDELING \nwhere GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker \nand GEBRUIKER.Afdeling = AFDELING.afdeling) \nas Afdeling_oms,\n(select min(naam) from GEBRUIKER \nwhere GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) \nas Naam,\n(select min(naam) from BEWERKINGSOORT \nwhere BEWERKINGSOORT.Bewerkingsoort = BEWERKINGTIJD.bewerkingsoort) \nas bewerkingsoort,\n(select min(kleur) from BEWERKINGSOORT \nwhere BEWERKINGSOORT.Bewerkingsoort = BEWERKINGTIJD.bewerkingsoort) \nas kleur,\nstartdatumtijd,\neinddatumtijd,\ndate2screendate(startdatumtijd) as DATUM,\ndate2screentime(startdatumtijd) as START,\ndate2screentime(einddatumtijd) as EIND,\ntijd\nfrom BEWERKINGTIJD";
                        if (gebruiker != '') {
                            if (where == '') {
                                where += "\nwhere ";
                            }
                            else {
                                where += "\nand ";
                            }
                            where += "gebruiker = '" + gebruiker + "'";
                        }
                        if (startdatum != '') {
                            if (where == '') {
                                where += "\nwhere ";
                            }
                            else {
                                where += "\nand ";
                            }
                            where += "startdatumtijd >= screendate2date('" + startdatum + "')";
                        }
                        if (einddatum != '') {
                            if (where == '') {
                                where += "\nwhere ";
                            }
                            else {
                                where += "\nand ";
                            }
                            where += "startdatumtijd >= screendate2date('" + einddatum + "')";
                        }
                        if (inuit != '') {
                            if (where == '') {
                                where += "\nwhere ";
                            }
                            else {
                                where += "\nand ";
                            }
                            if (Number(inuit) == 1) {
                                where += "productnummer in ('in','uit')";
                            }
                            else {
                                where += "productnummer not in ('in','uit')";
                            }
                        }
                        //
                        sql += "\n" + where + "\n) base";
                        where = '';
                        if (afdeling != '') {
                            if (where == '') {
                                where += "\nwhere ";
                            }
                            else {
                                where += "\nand ";
                            }
                            where += "afdeling = (select min(afdeling) from AFDELING \nwhere naam = '" + afdeling + "')";
                        }
                        sql += "\n" + where + "\norder by Afdeling,Naam,startdatumtijd";
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
    Gebruikerrap.prototype.routes = function (req, res, next) {
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
    return Gebruikerrap;
}(crud_1.Crud));
exports.Gebruikerrap = Gebruikerrap;
//# sourceMappingURL=gebruikerrap.js.map