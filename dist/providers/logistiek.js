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
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
//
var dict = {
    table: "logistiek",
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
var Logistiek = /** @class */ (function (_super) {
    __extends(Logistiek, _super);
    function Logistiek() {
        return _super.call(this, dict) || this;
    }
    Logistiek.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var productnummer, lijn, datum, selR, _a, where, sql, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        productnummer = db_1.default.fix(req.query.productnummer || '');
                        lijn = db_1.default.fix(req.query.lijn || '');
                        datum = db_1.default.fix(req.query.datum || '');
                        if (datum == '') {
                            datum = '01-01-1880';
                        }
                        selR = db_1.default.fix(req.query.selr || '');
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        where = '';
                        sql = "\nselect * \nfrom (\nselect\nBASE.* from (\nselect \nBEWERKINGFLOW.id as id,\nBEWERKINGFLOW.Bewerkingsnummer as bewerkingsnummer,\nBEWERKING.Productnummer as productnummer,\nif ((select max(lijn) from BEWERKINGFLOW lijnbwf where lijnbwf.bewerkingsnummer = BEWERKING.bewerkingsnummer and lijnbwf.volgnummer = BEWERKINGFLOW.volgnummer) is not null,\n    (select max(lijn) from BEWERKINGFLOW lijnbwf where lijnbwf.bewerkingsnummer = BEWERKING.bewerkingsnummer and lijnbwf.volgnummer = BEWERKINGFLOW.volgnummer),\n    if ((select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer) is not null,\n        (select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer),\n        if ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)) is not null,\n            (select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)),\n            if ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer) is not null,\n                (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer),\n                null\n            )\n        )\n    )\n) as lijn,\n(select min(naam) from BEWERKINGSOORT \nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) \nas bewerkingsoort,\n(select min(kleur) from BEWERKINGSOORT \nwhere BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) \nas kleur,\n(select min(layout) from BEWERKINGSOORT \nwhere BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) \nas layout,\nVolgnummer,\nBewerkingaantal,\nBEWERKINGFLOW.startdatumtijd as startdatumtijd,\nBEWERKING.startdatumtijd as bwstartdatumtijd,\nBEWERKINGFLOW.einddatumtijd as einddatumtijd,\nBEWERKINGFLOW.plandatumtijd as plandatumtijd,\ndate2screendate(BEWERKING.startdatumtijd) as START,\ndate2screendate(BEWERKINGFLOW.startdatumtijd) as STARTDATUM,\ngeprint,\ndate2screendate(BEWERKINGFLOW.plandatumtijd) as PLANDATUM,\ndate2screendate(BEWERKINGFLOW.einddatumtijd) as EINDDATUM\nfrom BEWERKING,BEWERKINGFLOW\nwhere BEWERKING.bewerkingsnummer = BEWERKINGFLOW.bewerkingsnummer\nand BEWERKING.einddatumtijd is null\nand BEWERKINGFLOW.einddatumtijd is null\nand (BEWERKING.startdatumtijd is null or BEWERKING.startdatumtijd >= screendate2date('" + datum + "'))";
                        //
                        if (productnummer != '') {
                            sql += "\nand ucase(BEWERKING.productnummer) like ucase('" + productnummer + "%')";
                        }
                        if (selR == 'Nee') {
                            sql += "\nand BEWERKING.bewerkingsnummer not like 'R%'";
                        }
                        if (selR == 'Ja') {
                            sql += "\nand BEWERKING.bewerkingsnummer like 'R%'";
                        }
                        //
                        sql += "\n) BASE) BASE2";
                        //
                        where = "\nwhere layout = 'rapBEWERKINGFLOWPICK.php'";
                        if (lijn != '') {
                            if (where == '') {
                                where += '\nwhere ';
                            }
                            else {
                                where += '\nand ';
                            }
                            where += "lijn = '" + lijn + "'";
                        }
                        sql += "\n" + where + "\norder by Startdatumtijd,Bewerkingsnummer,volgnummer";
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
    Logistiek.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, startdatum, lijn, geprint, id, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        startdatum = db_1.default.fix(req.body.STARTDATUM || '');
                        lijn = db_1.default.fix(req.body.LIJN || '');
                        geprint = db_1.default.fix(req.body.GEPRINT || '');
                        id = db_1.default.fix(db_1.default.getDataId(req));
                        sql = "\nupdate BEWERKINGFLOW set\nstartdatumtijd = screendate2date('" + startdatum + "'),\nlijn = '" + lijn + "',\nGeprint = '" + geprint + "'\nwhere id = '" + id + "'";
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
    Logistiek.prototype.routes = function (req, res, next) {
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
    return Logistiek;
}(crud_1.Crud));
exports.Logistiek = Logistiek;
//# sourceMappingURL=logistiek.js.map