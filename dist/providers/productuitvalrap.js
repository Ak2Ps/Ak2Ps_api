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
    table: "productuitvalrap",
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
var Productuitvalrap = /** @class */ (function (_super) {
    __extends(Productuitvalrap, _super);
    function Productuitvalrap() {
        return _super.call(this, dict) || this;
    }
    Productuitvalrap.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, startstatistiek, where, sql, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, 'STARTSTATISTIEK')];
                    case 2:
                        startstatistiek = _b.sent();
                        where = '';
                        sql = '';
                        if (query.action == 'gentot') {
                            sql += "\nselect \n' ' as id,  \n' ' as Lijn, \n' ' as Productnummer,\n' ' as productnaam,\n' ' as soort,\nsum(aantal) as aantal,\nsum(Uitval) as uitval,\ncase when sum(aantal) > 0 then format(sum(uitval) / sum(aantal) * 100,2) else format(0,2) end as percuitval,\nsum(afkeur) as afkeur,\ncase when sum(aantal) > 0 then format(sum(afkeur) / sum(aantal) * 100,2) else format(0,2) end as percafkeur,\nsum(afkeurm) as afkeurm,\ncase when sum(aantal) > 0 then format(sum(afkeurm) / sum(aantal) * 100,2) else format(0,2) end as percafkeurm,\nsum(afkeure) as afkeure,\ncase when sum(aantal) > 0 then format(sum(afkeure) / sum(aantal) * 100,2) else format(0,2) end as percafkeure,\nsum(afkeuro) as afkeuro,\ncase when sum(aantal) > 0 then format(sum(afkeuro) / sum(aantal) * 100,2) else format(0,2) end as percafkeuro,\nsum(reparatie) as reparatie,\ncase when sum(aantal) > 0 then format(sum(reparatie) / sum(aantal) * 100,2) else format(0,2) end as percreparatie,\nsum(reparatiem) as reparatiem,\ncase when sum(aantal) > 0 then format(sum(reparatiem) / sum(aantal) * 100,2) else format(0,2) end as percreparatiem,\nsum(reparatiee) as reparatiee,\ncase when sum(aantal) > 0 then format(sum(reparatiee) / sum(aantal) * 100,2) else format(0,2) end as percreparatiee,\nsum(reparatieo) as reparatieo,\ncase when sum(aantal) > 0 then format(sum(reparatieo) / sum(aantal) * 100,2) else format(0,2) end as percreparatieo\nfrom (";
                        }
                        sql += "\nselect * from (";
                        sql += "\nselect * from \n(select\nmin(id) as min_id,\nLijn,\nProductnummer,\nmin(productnaam) as productnaam,\nmin(soort) as soort,\nsum(Startaantal) as aantal,\nsum(Uitval) as uitval,\ncase when sum(startaantal) > 0 then format(sum(uitval) / sum(startaantal) * 100,2) else format(0,2) end as percuitval,\nsum(afkeur) as afkeur,\ncase when sum(startaantal) > 0 then format(sum(afkeur) / sum(startaantal) * 100,2) else format(0,2) end as percafkeur,\nsum(afkeurm) as afkeurm,\ncase when sum(startaantal) > 0 then format(sum(afkeurm) / sum(startaantal) * 100,2) else format(0,2) end as percafkeurm,\nsum(afkeure) as afkeure,\ncase when sum(startaantal) > 0 then format(sum(afkeure) / sum(startaantal) * 100,2) else format(0,2) end as percafkeure,\nsum(afkeuro) as afkeuro,\ncase when sum(startaantal) > 0 then format(sum(afkeuro) / sum(startaantal) * 100,2) else format(0,2) end as percafkeuro,\nsum(reparatie) as reparatie,\ncase when sum(startaantal) > 0 then format(sum(reparatie) / sum(startaantal) * 100,2) else format(0,2) end as percreparatie,\nsum(reparatiem) as reparatiem,\ncase when sum(startaantal) > 0 then format(sum(reparatiem) / sum(startaantal) * 100,2) else format(0,2) end as percreparatiem,\nsum(reparatiee) as reparatiee,\ncase when sum(startaantal) > 0 then format(sum(reparatiee) / sum(startaantal) * 100,2) else format(0,2) end as percreparatiee,\nsum(reparatieo) as reparatieo,\ncase when sum(startaantal) > 0 then format(sum(reparatieo) / sum(startaantal) * 100,2) else format(0,2) end as percreparatieo\nfrom\n(select\nBEWERKING.id,\nif ((select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer) is not null,\n(select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer),\nif ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)) is not null,\t\n(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)),      \nif ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer) is not null,\n(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer),\nnull\n)\n)\n) as lijn,\nPRODUCT.Soort,\nBEWERKING.Productnummer,\nPRODUCT.Productnaam,\nBEWERKING.Einddatumtijd,\nifnull(BEWERKING.startaantal,0) as startaantal,\n(SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW\nWHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nAND NOT EXISTS (select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nAND BEWERKINGFLOW.einddatumtijd is null)) as ak2einddatumtijd,\n(Select ifnull(Sum(BEWERKINGFLOW.Uitval),0) From BEWERKINGFLOW\nWhere BEWERKINGFLOW.Bewerkingsnummer = BEWERKING.Bewerkingsnummer) As uitval,\n(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur),0) From BEWERKINGUITVAL\nWhere BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer) As afkeur,\n(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur),0) From BEWERKINGUITVAL,UITVAL\nWhere BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer\nAnd BEWERKINGUITVAL.uitval = UITVAL.uitval\nand UITVAL.uitvalsoort in ('Mechanisch')) As afkeurm,\n(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur),0) From BEWERKINGUITVAL,UITVAL\nWhere BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer\nAnd BEWERKINGUITVAL.uitval = UITVAL.uitval\nand UITVAL.uitvalsoort in ('Electrisch')) As afkeure,\n(Select ifnull(Sum(BEWERKINGUITVAL.AantalAfkeur),0) From BEWERKINGUITVAL,UITVAL\nWhere BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer\nAnd BEWERKINGUITVAL.uitval = UITVAL.uitval\nand ifnull(UITVAL.uitvalsoort,'') not in ('Electrisch','Mechanisch')) As afkeuro,\n(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie),0) From BEWERKINGUITVAL\nWhere BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer) As reparatie,\n(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie),0) From BEWERKINGUITVAL,UITVAL\nWhere BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer\nAnd BEWERKINGUITVAL.uitval = UITVAL.uitval\nand UITVAL.uitvalsoort in ('Mechanisch')) As reparatiem,\n(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie),0) From BEWERKINGUITVAL,UITVAL\nWhere BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer\nAnd BEWERKINGUITVAL.uitval = UITVAL.uitval\nand UITVAL.uitvalsoort in ('Electrisch')) As reparatiee,\n(Select ifnull(Sum(BEWERKINGUITVAL.AantalReparatie),0) From BEWERKINGUITVAL,UITVAL\nWhere BEWERKINGUITVAL.Bewerkingsnummer = BEWERKING.Bewerkingsnummer\nAnd BEWERKINGUITVAL.uitval = UITVAL.uitval\nand ifnull(UITVAL.uitvalsoort,'') not in ('Electrisch','Mechanisch')) As reparatieo\nFrom\nBEWERKING inner Join\nPRODUCT On BEWERKING.Productnummer = PRODUCT.Productnummer";
                        //
                        where += util_1.Util.addAnd(where);
                        where += "not ISNULL(BEWERKING.einddatumtijd)\nand startdatumtijd >= screendate2date('" + startstatistiek + "')";
                        if (query.productnummer != '') {
                            where += util_1.Util.addAnd(where);
                            where += "PRODUCT.productnummer like ('" + query.productnummer + "%')";
                        }
                        if (query.klant.trim() != '') {
                            where += util_1.Util.addAnd(where);
                            where += "PRODUCT.productnummer in (\nselect productnummer from PRODUCTVRAAG \nwhere klantnaam = trim('" + query.klant + "'))";
                        }
                        if (query.soort.substr(0, 1) == 'M') {
                            where += util_1.Util.addAnd(where);
                            where += "PRODUCT.soort = 'M'";
                        }
                        else if (query.soort.substr(0, 1) == 'V') {
                            where += util_1.Util.addAnd(where);
                            where += "PRODUCT.soort = 'V'";
                        }
                        if (query.van != '') {
                            where += util_1.Util.addAnd(where);
                            where += "\n(screendate2date('" + query.van + "') <= \n(SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW\nWHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nAND NOT EXISTS (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer\nAND BEWERKINGFLOW.einddatumtijd is null)))";
                        }
                        if (query.tm != '') {
                            where += util_1.Util.addAnd(where);
                            where += "\n(screendate2date('" + query.tm + ") >=\n(SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW\nWHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer\nAND NOT EXISTS (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer\nAND BEWERKINGFLOW.einddatumtijd is null)))";
                        }
                        sql += "\n" + where + "\n) Base";
                        if (query.lijn.trim() != '') {
                            sql += "\nwhere Base.lijn = trim('" + query.lijn + "')";
                        }
                        sql += "\ngroup by Lijn, Productnummer\norder by cast(percuitval as decimal) desc,lijn,productnummer,cast(min_id as decimal)\n) Somregel";
                        //
                        where = '';
                        if (query.aantalvan != '') {
                            where += util_1.Util.addAnd(where);
                            where += "aantal >= " + query.aantalvan;
                        }
                        if (query.uitvalvan != '') {
                            where += util_1.Util.addAnd(where);
                            where += "percuitval >= " + query.uitvalvan;
                        }
                        if (query.afkeurvan != '') {
                            where += util_1.Util.addAnd(where);
                            where += "percafkeur >= " + query.afkeurvan;
                        }
                        if (query.reparatievan != '') {
                            where += util_1.Util.addAnd(where);
                            where += "percreparatie >= " + query.reparatievan;
                        }
                        sql += "\n" + where;
                        if (query.top != '') {
                            sql += "\nLIMIT 0," + query.top;
                        }
                        sql += "\n) topsel";
                        if (query.action == 'gentot') {
                            sql += "\n) Genregel";
                        }
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Productuitvalrap.prototype.routes = function (req, res, next) {
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
    return Productuitvalrap;
}(crud_1.Crud));
exports.Productuitvalrap = Productuitvalrap;
//# sourceMappingURL=productuitvalrap.js.map