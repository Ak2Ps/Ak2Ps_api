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
    table: "planning",
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
var Planning = /** @class */ (function (_super) {
    __extends(Planning, _super);
    function Planning() {
        return _super.call(this, dict) || this;
    }
    Planning.prototype.doDropBerekening = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var istemp, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        istemp = 'TEMPORARY';
                        sql = '';
                        //
                        sql = "DROP " + istemp + " table berekening_sqlpartaantal";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        _a.sent();
                        //
                        sql = "DROP " + istemp + " table berekening_sqlpartstartaantal";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _a.sent();
                        //
                        sql = "DROP " + istemp + " table berekening_sqlparttijd";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _a.sent();
                        //
                        sql = "DROP " + istemp + " table berekening_sqlpartbewerkingen";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        _a.sent();
                        //
                        sql = "DROP " + istemp + " table berekening_sqlpartopdrachten";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        _a.sent();
                        //
                        sql = "DROP " + istemp + " table berekening";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        _a.sent();
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Planning.prototype.doCreateBerekening = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var istemp, sql, where, performancestart, productnummer, is;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        istemp = 'TEMPORARY';
                        sql = '';
                        where = '';
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, 'PERFORMANCESTART')];
                    case 1:
                        performancestart = _a.sent();
                        productnummer = db_1.default.fix(req.query.productnummer || '');
                        is = db_1.default.fix(req.query.is || '');
                        //
                        if (productnummer != '') {
                            if (where == '') {
                                where += "\nwhere ";
                            }
                            else {
                                where += "\nand ";
                            }
                            if (Number(is) == 1) {
                                where += "productnummer = '" + productnummer + "'";
                            }
                            else {
                                where += "ucase(productnummer) like ucase('" + productnummer + "%')";
                            }
                        }
                        //
                        // Aantal
                        //
                        sql = "\nCREATE " + istemp + " TABLE berekening_sqlpartaantal AS \nSELECT \nSUM(BEWERKINGFLOW.bewerkingaantal) AS sqlpartaantal,\nE.productnummer \nFROM \nBEWERKINGFLOW,\n(select * from BEWERKING " + where + ") E\nWHERE BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer\nAND E.einddatumtijd IS NOT NULL\nAND E.startdatumtijd >= screendate2date('" + performancestart + "')\nAND EXISTS ( SELECT 1 FROM BEWERKINGSOORT\nWHERE BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nAND BEWERKINGSOORT.voortgang = 1)\nAND EXISTS ( SELECT 1 FROM BEWERKINGTIJD\nWHERE BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id)\nGROUP BY e.productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _a.sent();
                        //
                        // startaantal
                        //
                        sql = "\nCREATE " + istemp + " TABLE berekening_sqlpartstartaantal AS\nSELECT\nSUM(startaantal) AS sqlpartstartaantal,\nF.productnummer\nFROM\n(select * from BEWERKING " + where + ") F\nWHERE F.einddatumtijd IS NOT NULL\nAND F.startdatumtijd >= screendate2date('" + performancestart + "')\nGROUP BY F.productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _a.sent();
                        //
                        // tijd
                        //
                        sql = "\nCREATE " + istemp + " TABLE berekening_sqlparttijd AS\nSELECT\nSUM(BEWERKINGTIJD.tijd) AS sqlparttijd,\nc.productnummer\nFROM\nBEWERKINGTIJD,\nBEWERKINGFLOW,\n(select * from BEWERKING " + where + " ) C\nWHERE BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\nAND BEWERKINGTIJD.bewerkingsnummer = C.bewerkingsnummer\nAND C.einddatumtijd IS NOT NULL\nAND C.startdatumtijd >= screendate2date('" + performancestart + "')\nGROUP BY c.productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        _a.sent();
                        //
                        // bewerkingflows
                        //
                        sql = "\nCREATE " + istemp + " TABLE berekening_sqlpartbewerkingen AS\nSELECT\nCOUNT(DISTINCT BEWERKINGFLOW.bewerkingsoort) AS sqlpartbewerkingen,\nE.PRODUCTNUMMER\nFROM\nBEWERKINGFLOW,\n(select * from BEWERKING " + where + ") E\nWHERE BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer\nAND E.einddatumtijd IS NOT NULL\nAND E.startdatumtijd >= screendate2date('" + performancestart + "')\nAND EXISTS(SELECT 1 FROM BEWERKINGSOORT\nWHERE BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nAND BEWERKINGSOORT.voortgang = 1)\nAND EXISTS(SELECT  1 FROM BEWERKINGTIJD\nWHERE BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id)\nGROUP BY E.PRODUCTNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        _a.sent();
                        //
                        // Bewerkingen
                        //
                        sql = "\nCREATE " + istemp + " TABLE berekening_sqlpartopdrachten AS\nSELECT\nCOUNT(DISTINCT E.bewerkingsnummer) AS sqlpartopdrachten,\nE.PRODUCTNUMMER\nFROM\nBEWERKINGFLOW,\n(select * from BEWERKING " + where + ") E\nWHERE BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer\nAND E.einddatumtijd IS NOT NULL\nAND E.startdatumtijd >= screendate2date('" + performancestart + "')\nAND EXISTS(SELECT 1 FROM BEWERKINGSOORT\nWHERE BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nAND BEWERKINGSOORT.voortgang = 1)\nGROUP BY E.PRODUCTNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        _a.sent();
                        //
                        // totaal
                        //
                        sql = "\nCREATE " + istemp + " TABLE berekening AS\nSELECT\nberekening_sqlparttijd.productnummer,\nsqlparttijd,\nsqlpartaantal,\nsqlpartstartaantal sqlpartopdrachten,\nsqlpartbewerkingen,\nCONCAT(ROUND(60 * (sqlpartstartaantal / sqlparttijd)),\n' uit ',\nsqlpartopdrachten,\n' * ',\nsqlpartbewerkingen) AS berekening,\nROUND(60 * (sqlpartstartaantal / sqlparttijd)) AS gemiddeld,\n0 AS nodig\nFROM\nberekening_sqlparttijd,\nberekening_sqlpartaantal,\nberekening_sqlpartstartaantal,\nberekening_sqlpartopdrachten,\nberekening_sqlpartbewerkingen\nWHERE berekening_sqlparttijd.productnummer = berekening_sqlpartaantal.productnummer\nAND berekening_sqlparttijd.productnummer = berekening_sqlpartstartaantal.productnummer\nAND berekening_sqlparttijd.productnummer = berekening_sqlpartopdrachten.productnummer\nAND berekening_sqlparttijd.productnummer = berekening_sqlpartbewerkingen.productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 7:
                        _a.sent();
                        //
                        sql = "\nalter table berekening add index berekening_i1(productnummer)";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 8:
                        _a.sent();
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Planning.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql, where, orderby, sqlpartstandhtml, _a, startstatistiek, performancestart, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = db_1.default.fixBody(req.query);
                        sql = '';
                        where = '';
                        orderby = '';
                        sqlpartstandhtml = '';
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        //
                        if (query.assets == "") {
                            query.assets = "images/";
                        }
                        else {
                            query.assets = "assets/image/";
                        }
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, 'STARTSTATISTIEK')];
                    case 2:
                        startstatistiek = _b.sent();
                        if (startstatistiek == '') {
                            startstatistiek = '01-01-2015';
                        }
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, 'PERFORMANCESTART')];
                    case 3:
                        performancestart = _b.sent();
                        if (performancestart == '') {
                            performancestart = '01-01-2015';
                        }
                        if (!(query.action == "werkvoorbereiding")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.doCreateBerekening(req, res, next)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        //
                        //
                        //
                        if (query.bewerkingsnummer != '') {
                            where += util_1.Util.addAnd(where);
                            where += "bewerkingsnummer = '" + query.bewerkingsnummer + "'";
                        }
                        if (query.productnummer != '') {
                            where += util_1.Util.addAnd(where);
                            if (Number(query.is) == 1) {
                                where += "productnummer = '" + query.productnummer + "'";
                            }
                            else {
                                where += "ucase(productnummer) like ucase('" + query.productnummer + "%')";
                            }
                        }
                        if (query.open == 'Nee') {
                            where += util_1.Util.addAnd(where);
                            where += "not isnull(einddatumtijd)";
                        }
                        if (query.open == 'Ja') {
                            where += util_1.Util.addAnd(where);
                            where += "isnull(einddatumtijd)";
                        }
                        if (query.selR == 'Nee') {
                            where += util_1.Util.addAnd(where);
                            where += "bewerkingsnummer not like 'R%'";
                        }
                        if (query.selR == 'Ja') {
                            where += util_1.Util.addAnd(where);
                            where += "bewerkingsnummer like 'R%'";
                        }
                        if (query.seltm != '') {
                            where += util_1.Util.addAnd(where);
                            where += "plandatumtijd <= screendate2date('" + query.seltm + "')";
                        }
                        if (query.bewerkingsoort != '') {
                            where += util_1.Util.addAnd(where);
                            where += "exists (\nselect 1 from BEWERKINGFLOW\nwhere BEWERKING.bewerkingsnummer = BEWERKINGFLOW.bewerkingsnummer\nand BEWERKINGFLOW.bewerkingsoort in\n(select bewerkingsoort from BEWERKINGSOORT \nwhere bewerkingsoort.naam = '" + query.bewerkingsoort + "')\nand BEWERKINGFLOW.einddatumtijd is null\n)";
                        }
                        //
                        //
                        //
                        if (query.action == "lijnplanning" || query.action == "lijnplanning2") {
                            //
                            // Als er 1 open is, dan open:
                            // dus max(<img src=query.assets . "bewerkingopen.png"></img>, <img src="images/bewerkingclosed.png"></img>)
                            // (textuele volgorde: "open" is hoger dan "closed"
                            //
                            sqlpartstandhtml =
                                "\nselect group_concat(distinct\nconcat(\n'<span style=\"white-space:nowrap;color:black;background-color:',BEWERKINGSOORT.kleur,'\">',\nBEWERKINGSOORT.afkorting,'(',\n(select sum(case when einddatumtijd is null then 0 else bewerkingaantal end)\nfrom BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\nand BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n),\n')',\n'</span>',\n(select max(\ncase when einddatumtijd is null then '<img src=\"" + query.assets + "bewerkingopen.png\"></img>' \nelse '<img src=\"" + query.assets + "bewerkingclosed.png\"></img>'\nend)\nfrom BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\nand BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n)\n)\norder by volgnummer)\nfrom BEWERKINGFLOW,BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer";
                        }
                        else {
                            //
                            // Als er 1 open is, dan open:
                            // dus max(<img src="images/bewerkingopen.png"></img>, <img src="images/bewerkingclosed.png"></img>)
                            // (textuele volgorde: "open" is hoger dan "closed"
                            //
                            sqlpartstandhtml =
                                "select group_concat(distinct\nconcat(\n'<span style=\"white-space:nowrap;color:black;background-color:',BEWERKINGSOORT.kleur,'\">',\nBEWERKINGSOORT.afkorting,\n'</span>',\n(select max(\ncase when einddatumtijd is null then '<img src=\"" + query.assets + "bewerkingopen.png\"></img>'\nelse '<img src=\"" + query.assets + "bewerkingclosed.png\"></img>'\nend)\nfrom BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\nand BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n)\n)\norder by volgnummer)\nfrom BEWERKINGFLOW,BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer";
                        }
                        //
                        // Hier begint de sql
                        //
                        sql = "\nselect *,  \nnull as CRUD,\nconcat(ifnull(bewerkt,0),' / ',gepland,' (',ifnull(aantalbewerking,0),')') as stand,\n(" + sqlpartstandhtml + ") as standhtml,\n(select productnaam from PRODUCT \nwhere PRODUCT.PRODUCTNUMMER = BASE.productnummer) \nas productnaam,\ndate2screendate(bewerkingplandatumtijd) as BEWERKINGPLAN,\ndate2screendate(bewerkingeinddatumtijd) as BEWERKINGEIND,";
                        //
                        if (query.action == "werkvoorbereiding") {
                            sql += "\nberekening, gemiddeld, 0 as nodig";
                        }
                        else {
                            sql += "\n0 as berekening, 0 as gemiddeld, 0 as nodig";
                        }
                        //
                        //
                        // Bewerkingen
                        //
                        sql += "\nfrom (\nselect 'B' as type, \nid,\nnull as actienummer,\nbewerkingsnummer,\ninitstartdatumtijd,\nstartdatumtijd,\neinddatumtijd,\nplandatumtijd,\nadviesplandatumtijd,\nexactplandatumtijd,\n(select min(plandatumtijd) from BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER\nand BEWERKINGFLOW.einddatumtijd IS NULL";
                        if (query.bewerkingsoort != '') {
                            sql += "\nand BEWERKINGFLOW.bewerkingsoort = \n(select bewerkingsoort from BEWERKINGSOORT \nwhere naam = '" + query.bewerkingsoort + "')";
                        }
                        sql += "\n) as bewerkingplandatumtijd,\n(select max(einddatumtijd) from BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER";
                        if (query.bewerkingsoort != '') {
                            sql += "\nand BEWERKINGFLOW.bewerkingsoort = \n(select bewerkingsoort from BEWERKINGSOORT \nwhere naam = '" + query.bewerkingsoort + "')";
                        }
                        sql += "\n)  as bewerkingeinddatumtijd,\ndate2screendate(initstartdatumtijd) as INITDATUM,\ndate2screendate(startdatumtijd) as START,\ndate2screendate(plandatumtijd) as PLAN,\ndate2screendate(adviesplandatumtijd) as ADVIESPLAN,\ndate2screendate(exactplandatumtijd) as EXACTPLAN,\ndate2screendate(einddatumtijd) as EIND,\nEindcontrolenummer,\nProductnummer,\nProductieaantal,\nStartaantal,\n(select case when performance = 0 then '' else performance end \nfrom PRODUCT where PRODUCT.productnummer = BEWERKING.productnummer) \nas Performance,\nOpmerking,\n(select max(lijn) from PRODUCT productlijnprd \nwhere productlijnprd.productnummer = BEWERKING.productnummer) as productlijn,\nif ((select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer) is not null,\n    (select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer),\n \tif ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)) is not null,\n\t    (select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)),\n \t\tif ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer) is not null,\n            (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer),\n            null\n        )\n    )\n) as lijn,\n(select count(distinct(bewerkingsoort)) from BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER\nand exists( \nselect 1 from BEWERKINGSOORT \nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort \nand BEWERKINGSOORT.voortgang = 1))\nas aantalbewerking,\n(select sum(bewerkingaantal) from BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER)\nas gepland,\n(select sum(bewerkingaantal) from BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER \nand BEWERKINGFLOW.einddatumtijd is not null)\nas bewerkt,\n(select sum(tijd) from BEWERKINGFLOW,BEWERKINGTIJD\nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER \nand BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id)\nas besteed,\n(select sum(uitval) from BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER)\nas aantaluitval,\n(select sum(aantalafkeur) from BEWERKINGUITVAL \nwhere BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) \nas aantalafkeur,\n(select sum(aantalreparatie) from BEWERKINGUITVAL \nwhere BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) \nas aantalreparatie,\n'' as kurk\nfrom BEWERKING";
                        sql += "\n" + where;
                        //
                        // Orders voor producten die geproduceerd worden (met een lijn)
                        //
                        if (query.action != "lijnplanning2") {
                            sql += "\nunion all\nselect 'O' as type, PRODUCTVOORRAAD.id,\nPRODUCTVOORRAAD.actienummer,\n'Order' as bewerkingsnummer,\nPRODUCTVOORRAAD.voorraaddatumtijd as initstartdatumtijd,\nPRODUCTVOORRAAD.voorraaddatumtijd as startdatumtijd,\nnull as einddatumtijd,\nPRODUCTVOORRAAD.voorraaddatumtijd as plandatumtijd,\nnull as adviesplandatumtijd,\nnull as exactplandatumtijd,\nPRODUCTVOORRAAD.voorraaddatumtijd as bewerkingplandatumtijd,\nnull as bewerkingeinddatumtijd,\ndate2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as INITDATUM,\ndate2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as START,\ndate2screendate(PRODUCTVOORRAAD.actiedatumtijd) as PLAN,\nnull as ADVIESPLAN,\nnull as EXACTPLAN,\nnull as eind,\nnull as eindcontrolenummer, \nPRODUCTVOORRAAD.productnummer,\ncase when PRODUCTVOORRAAD.voorraad >= PRODUCTVOORRAAD.actievoorraad \nthen PRODUCTVOORRAAD.voorraad * -1 \nelse PRODUCTVOORRAAD.actievoorraad * -1 end \nas productieaantal,\nPRODUCTVOORRAAD.voorraad as startaantal,\n(select case when performance = 0 \nthen '' else performance end \nfrom PRODUCT \nwhere PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer) \nas performance,\nPRODUCTVOORRAAD.actievoorraad as opmerking,\n(select max(lijn) from PRODUCT productlijnprd where productlijnprd.productnummer = PRODUCT.productnummer) as productlijn,\nif ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)) is not null,\n(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)),\nif ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer) is not null,\n(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer),\nnull\n)\n) as lijn,\nnull as aantalbewerking,\nnull as gepland,\nnull as bewerking,\nnull as besteed,\nnull as aantaluitval,\nnull as aantalafkeur,\nnull as aantalreparatie,\nconcat(date2screendate(PRODUCTVOORRAAD.beperkdatumtijd),' ',beperknummer) as KURK\nfrom PRODUCTVOORRAAD \ninner join PRODUCT on (PRODUCTVOORRAAD.productnummer = PRODUCT.productnummer)";
                            //
                            where = '';
                            if (query.bewerkingsnummer != '') {
                                where += util_1.Util.addAnd(where);
                                where += "PRODUCTVOORRAAD.productnummer = '----------'";
                            }
                            if (query.productnummer != '') {
                                where += util_1.Util.addAnd(where);
                                if (Number(query.is) == 1) {
                                    where += "PRODUCTVOORRAAD.productnummer = '" + query.productnummer + "'";
                                }
                                else {
                                    where += "ucase(PRODUCTVOORRAAD.productnummer) like ucase('" + query.productnummer + "%')";
                                }
                            }
                            if (query.sel44 == 'Nee') {
                                where += util_1.Util.addAnd(where);
                                where += "\n(PRODUCTVOORRAAD.voorraaddatumtijd < screendate2date('01-01-2044')\nor PRODUCTVOORRAAD.voorraaddatumtijd > screendate2date('31-12-2044'))";
                            }
                            if (query.seltm != '') {
                                where += util_1.Util.addAnd(where);
                                where += "\ndate(PRODUCTVOORRAAD.voorraaddatumtijd) <= screendate2date('" + query.seltm + "')";
                            }
                            //
                            // Alleen orders die lijden tot een negatieve voorraad
                            //
                            if (1 == 1) {
                                where += util_1.Util.addAnd(where);
                                where += "PRODUCTVOORRAAD.actievoorraad < 0";
                            }
                            //
                            where += util_1.Util.addAnd(where);
                            where += "PRODUCTVOORRAAD.actie = 'VE'";
                            //
                            sql += "\n" + where;
                        }
                        //
                        // Onderdelen voor producten die geproduceerd worden (met een lijn)
                        //
                        if (query.action != "lijnplanning2") {
                            sql += "\nunion all\nselect 'OB' as type, \nPRODUCTVOORRAAD.id,\nPRODUCTVOORRAAD.actienummer,\n'Nodig' as bewerkingsnummer,\nPRODUCTVOORRAAD.voorraaddatumtijd as initstartdatumtijd,\nPRODUCTVOORRAAD.voorraaddatumtijd as startdatumtijd,\nnull as einddatumtijd,\nPRODUCTVOORRAAD.voorraaddatumtijd as plandatumtijd,\nnull as adviesplandatumtijd,\nnull as exactplandatumtijd,\nPRODUCTVOORRAAD.voorraaddatumtijd as bewerkingplandatumtijd,\nnull as bewerkingeinddatumtijd,\n'' as INITDATUM,\n'' as START,\ndate2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as PLAN,\nnull as ADVIESPLAN,\nnull as EXACTPLAN,\nnull as eind,\nnull as eindcontrolenummer,\nPRODUCTVOORRAAD.productnummer,\ncase when PRODUCTVOORRAAD.voorraad >= PRODUCTVOORRAAD.actievoorraad \nthen PRODUCTVOORRAAD.voorraad * -1 \nelse PRODUCTVOORRAAD.actievoorraad * -1 end \nas productieaantal,\nPRODUCTVOORRAAD.voorraad as startaantal,\n(select case when Performance = 0 then '' \nelse performance end \nfrom PRODUCT \nwhere PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer)\nas performance,\nPRODUCTVOORRAAD.actievoorraad as opmerking,\n(select max(lijn) from PRODUCT productlijnprd \nwhere productlijnprd.productnummer = PRODUCT.productnummer) \nas productlijn,\nif ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)) is not null,\n(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)),\nif ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer) is not null,\n(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer),\nnull\n)\n) as lijn,\nnull as aantalbewerking,\nnull as gepland,\nnull as bewerking,\nnull as besteed,\nnull as aantaluitval,\nnull as aantalafkeur,\nnull as aantalreparatie,\nconcat(date2screendate(PRODUCTVOORRAAD.beperkdatumtijd),' ',beperknummer) as KURK\nfrom PRODUCTVOORRAAD \ninner join PRODUCT \non (PRODUCTVOORRAAD.productnummer = PRODUCT.productnummer)";
                            //
                            where = '';
                            if (query.bewerkingsnummer != '') {
                                where += util_1.Util.addAnd(where);
                                where += "PRODUCTVOORRAAD.productnummer = '----------'";
                            }
                            if (query.productnummer != '') {
                                where += util_1.Util.addAnd(where);
                                if (Number(query.is) == 1) {
                                    where += "PRODUCTVOORRAAD.productnummer = '" + query.productnummer + "'";
                                }
                                else {
                                    where += "ucase(PRODUCTVOORRAAD.productnummer) like ucase('" + query.productnummer + "%')";
                                }
                            }
                            if (query.seltm != '') {
                                where += util_1.Util.addAnd(where);
                                where += "PRODUCTVOORRAAD.voorraaddatumtijd <= screendate2date('" + query.seltm + "')";
                            }
                            //
                            // Alleen orders die lijden tot een negatieve voorraad
                            //
                            if (1 == 1) {
                                where += util_1.Util.addAnd(where);
                                where += "PRODUCTVOORRAAD.actievoorraad < 0";
                            }
                            //
                            where += util_1.Util.addAnd(where);
                            where += "PRODUCTVOORRAAD.actie = 'OP'";
                            //
                            sql += "\n" + where;
                        }
                        //
                        // Algemeen
                        //
                        sql += "\n) BASE";
                        if (query.action == "werkvoorbereiding") {
                            sql += "\nleft join (\nselect \nberekening.productnummer as berekening_productnummer,\nberekening as berekening,\ngemiddeld,\nnodig \nfrom berekening) ber\non berekening_productnummer = BASE.productnummer";
                        }
                        where = '';
                        if (query.productlijn != '') {
                            where += util_1.Util.addAnd(where);
                            where += "productlijn = '" + query.productlijn + "'";
                        }
                        if (query.lijn != '') {
                            where += util_1.Util.addAnd(where);
                            where += "lijn = '" + query.lijn + "'";
                        }
                        if (query.action == "lijnplanning" || query.action == "lijnplanning2") {
                            where += util_1.Util.addAnd(where);
                            where += "lijn != ''";
                        }
                        if (query.selR == 'Ja') {
                            where += util_1.Util.addAnd(where);
                            where = "productnummer in (\nselect productnummer from BEWERKING \nwhere bewerkingsnummer like 'R%)";
                        }
                        if (query.seltm != '') {
                            where += util_1.Util.addAnd(where);
                            if (query.action == "planning") {
                                where += "bewerkingplandatumtijd <= screendate2date('" + query.seltm + "')";
                            }
                            else {
                                where += "plandatumtijd <= screendate2date('" + query.seltm + "')";
                            }
                        }
                        sql += "\n" + where;
                        if (query.action == 'planning') {
                            orderby = 'Lijn,bewerkingplandatumtijd,Plandatumtijd,Bewerkingsnummer';
                        }
                        else if (query.action == 'lijnplanning' || query.action == "lijnplanning2") {
                            orderby = 'Plandatumtijd,Lijn,bewerkingplandatumtijd,Bewerkingsnummer';
                        }
                        else {
                            orderby = 'Lijn,Plandatumtijd,Bewerkingsnummer';
                        }
                        sql += "\norder by " + orderby;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        rows = _b.sent();
                        if (query.action == "werkvoorbereiding") {
                            this.doDropBerekening(req, res, next);
                        }
                        res.crudConnection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Planning.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var body, sql, where, _a, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = db_1.default.fixBody(req.body);
                        sql = '';
                        where = '';
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        id = db_1.default.fix(db_1.default.getDataId(req));
                        if (!(body.CRUD == 'D')) return [3 /*break*/, 5];
                        if (!(body.TYPE == 'B')) return [3 /*break*/, 3];
                        sql = "\ndelete from BEWERKING\nwhere id = '" + id + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        util_1.Util.unknownOperation(req, res, next);
                        return [2 /*return*/];
                    case 4: return [3 /*break*/, 13];
                    case 5:
                        if (!(body.TYPE == 'B')) return [3 /*break*/, 8];
                        if (Number(body.STARTAANTAL) < Number(body.PRODUCTIEAANTAL)) {
                            body.STARTAANTAL = body.PRODUCTIEAANTAL;
                        }
                        if (body.BEWERKINGSNUMMER == 'Order') {
                            body.BEWERKINGSNUMMER = '???';
                        }
                        sql = "\nupdate BEWERKING set\nBewerkingsnummer =  '" + body.BEWERKINGSNUMMER + "',\nStartdatumtijd =screendate2date('" + body.START + "'),\nLijn =  '" + body.LIJN + "',\nPlandatumtijd =screendate2date('" + body.PLAN + "'),\nEinddatumtijd =screendate2date('" + body.EIND + "'),\nEindcontrolenummer =  '" + body.EINDCONTROLENUMMER + "',\nProductnummer = '" + body.PRODUCTNUMMER + "',\nProductieaantal = '" + body.PRODUCTIEAANTAL + "',\nStartaantal = '" + body.STARTAANTAL + "'\nwhere id = '" + id + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        _b.sent();
                        //
                        sql = "\nupdate PRODUCT set\nPerformance =  '" + body.PERFORMANCE + "'\nwhere Productnummer = '" + body.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 7:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 8:
                        if (!(body.TYPE == 'O')) return [3 /*break*/, 10];
                        sql = "\nupdate PRODUCT set\nPerformance =  '" + body.PERFORMANCE + "'\nwhere Productnummer = '" + body.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 9:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 10:
                        if (!(body.TYPE == 'OB')) return [3 /*break*/, 12];
                        sql = "\nupdate PRODUCT set\nPerformance =  '" + body.PERFORMANCE + "'\nwhere Productnummer = '" + body.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 11:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 12:
                        util_1.Util.unknownOperation(req, res, next);
                        return [2 /*return*/];
                    case 13:
                        //
                        res.crudConnection.release();
                        res.status(200).send(body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Planning.prototype.doInsert = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, sql, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = db_1.default.fixQuery(req.body);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        //
                        if (body.STARTAANTAL < body.PRODUCTIEAANTAL) {
                            body.STARTAANTAL = body.PRODUCTIEAANTAL;
                        }
                        sql = '';
                        sql = "\ninsert into BEWERKING\n(bewerkingsnummer,startdatumtijd,lijn,plandatumtijd,einddatumtijd,eindcontrolenummer,\nProductnummer,ProductieaantalStartaantal,\nOpmerking)\nvalues (\n'" + body.BEWERKINGSNUMMER + "',\nscreendate2date('" + body.START + "'),\n'" + body.LIJN + "',\nscreendate2date('" + body.PLAN + "'),\nscreendate2date('" + body.EIND + "'),\n'" + body.EINDCONTROLENUMMER + "',\n'" + body.PRODUCTNUMMER + "',\n'" + body.PRODUCTIEAANTAL + "',\n'" + body.STARTAANTAL + "',\n'" + body.OPMERKING + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        result = _b.sent();
                        body.ID = db_1.default.getInsertId(result);
                        //
                        sql = "\nupdate PRODUCT set\nPerformance =  '" + body.PERFORMANCE + "'\nwhere Productnummer = '" + body.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Planning.prototype.doDelete = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, id, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = db_1.default.fixQuery(req.body);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        id = db_1.default.fix(db_1.default.getDataId(req));
                        sql = "\ndelete from bewerking\nwhere id = '" + id + "'";
                        //
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        //
                        _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Planning.prototype.routes = function (req, res, next) {
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
    return Planning;
}(crud_1.Crud));
exports.Planning = Planning;
//# sourceMappingURL=planning.js.map