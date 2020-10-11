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
exports.Bewerking = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
//
var dict = {
    table: "BEWERKING",
    key: [
        {
            body: "BEWERKINGSNUMMER",
            sql: "BEWERKINGSNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "BEWERKINGSNUMMER",
        where: [],
        fields: [],
    },
    query: {
        orderby: "BEWERKINGSNUMMER",
        where: [],
        fields: [],
    },
    update: {
        fields: [],
    },
};
var Bewerking = /** @class */ (function (_super) {
    __extends(Bewerking, _super);
    function Bewerking() {
        return _super.call(this, dict) || this;
    }
    Bewerking.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var bewerkingsnummer, productnummer, lijn, is, open, afgesloten, datum, datumvanaf, datumtm, ak2einddatumvanaf, ak2einddatumtm, selR, assets, startstatistiek, where, _a, sql, rows, row, sqlpartaantal, sqlparttijd, sqlpartbewerkingen, sqlpartopdrachten, sqlpartak2eind, sqlpartstandhtml;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bewerkingsnummer = db_1.default.fix(req.query.bewerkingsnummer || '');
                        productnummer = db_1.default.fix(req.query.productnummer || '');
                        lijn = db_1.default.fix(req.query.lijn || '');
                        is = db_1.default.fix(req.query.is || '');
                        open = db_1.default.fix(req.query.open || '');
                        afgesloten = db_1.default.fix(req.query.afgesloten || '');
                        datum = db_1.default.fix(req.query.datum || '');
                        datumvanaf = db_1.default.fix(req.query.datumvanaf || '');
                        datumtm = db_1.default.fix(req.query.datumtm || '');
                        ak2einddatumvanaf = db_1.default.fix(req.query.ak2einddatumvanaf || '');
                        ak2einddatumtm = db_1.default.fix(req.query.ak2einddatumtm || '');
                        selR = db_1.default.fix(req.query.selr || '');
                        assets = db_1.default.fix(req.query.assets || '');
                        if (assets == "") {
                            assets = "images/";
                        }
                        else {
                            assets = "assets/image/";
                        }
                        startstatistiek = '';
                        where = '';
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        sql = "SET SESSION group_concat_max_len = 100000";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _b.sent();
                        sql = "select * from PARAM where naam = 'STARTSTATISTIEK'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _b.sent();
                        if (rows[0]) {
                            row = rows[0];
                            startstatistiek = row.INHOUD;
                        }
                        sqlpartaantal = "\n(select sum(BEWERKINGFLOW.bewerkingaantal)\nfrom BEWERKINGFLOW,BEWERKING E\nwhere BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer\nand E.productnummer = BEWERKING.productnummer\nand E.einddatumtijd is not null\nand E.startdatumtijd >= screendate2date('" + startstatistiek + "')\nand exists (\nselect 1 from BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGSOORT.voortgang = 1\n)\nand exists (\nselect 1 from BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\n)\n)";
                        sqlparttijd = "\n(select sum(BEWERKINGTIJD.tijd) from BEWERKINGTIJD,BEWERKINGFLOW,BEWERKING C\nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\nand BEWERKINGFLOW.bewerkingsnummer = C.bewerkingsnummer\nand C.PRODUCTNUMMER = BEWERKING.productnummer\nand C.einddatumtijd is not null\nand C.startdatumtijd >= screendate2date('" + startstatistiek + "')\n)";
                        sqlpartbewerkingen = "\n(select count(distinct BEWERKINGFLOW.bewerkingsoort)\nfrom BEWERKINGFLOW,BEWERKING E\nwhere BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer\nand E.PRODUCTNUMMER = BEWERKING.productnummer\nand E.einddatumtijd is not null\nand E.startdatumtijd >= screendate2date('" + startstatistiek + "')\nand exists (\nselect 1 from BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGSOORT.voortgang = 1\n)\nand exists (\nselect 1 from BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\n)\n)";
                        sqlpartopdrachten = "\n(select count(distinct E.bewerkingsnummer)\nfrom BEWERKINGFLOW,BEWERKING E\nwhere BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer\nand E.PRODUCTNUMMER = BEWERKING.productnummer\nand E.einddatumtijd is not null\nand E.startdatumtijd >= screendate2date('" + startstatistiek + "')\nand exists (\nselect 1 from BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGSOORT.voortgang = 1\n)\n)";
                        sqlpartak2eind = "\n(select max(BEWERKINGFLOW.einddatumtijd)\nfrom BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer\nand not exists (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nand einddatumtijd is null)\n)";
                        sqlpartstandhtml = "\nselect group_concat(distinct\nconcat(\n'<span style=\"white-space:nowrap;color:black;background-color:',BEWERKINGSOORT.kleur,'\">',\nBEWERKINGSOORT.afkorting,'(',\n(select sum(case when einddatumtijd is null then 0 else bewerkingaantal end)\nfrom BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\nand BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n),\n')',\n'</span>',\n(select max(\ncase when einddatumtijd is null then '<img src=\"" + assets + "bewerkingopen.png\"></img> '\nelse '<img src=\"" + assets + "bewerkingclosed.png\"></img> '\nend)\nfrom BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\nand BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n)\n)\norder by volgnummer)\nfrom BEWERKINGFLOW,BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer";
                        sql = "\nselect *,\ndate2screendate(ak2einddatumtijd) as AK2EIND\nfrom (select *,\nconcat(ifnull(bewerkt,0),' / ',gepland,' (',ifnull(aantalbewerking,0),')') as stand,\n(" + sqlpartstandhtml + ") as standhtml\nfrom (\nselect id, \nbewerkingsnummer,\ninitstartdatumtijd,\nstartdatumtijd,\neinddatumtijd,\neindcontrolenummer,\nplandatumtijd,\ndate2screendate(initstartdatumtijd) as INITDATUM,\ndate2screendate(startdatumtijd) as START,\ndate2screendate(plandatumtijd) as PLAN,\ndate2screendate(adviesplandatumtijd) as ADVIESPLAN,\ndate2screendate(einddatumtijd) as EIND,\nProductnummer, \nProductieaantal,\nStartaantal,\nOpmerking,\nif ((select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer) is not null,\n(select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer),\nif ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)) is not null,\n(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)),\nif ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer) is not null,\n(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer),\nnull\n)\n)\n) as lijn,\n(select count(distinct(bewerkingsoort)) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER and exists( select 1 from BEWERKINGSOORT where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort and BEWERKINGSOORT.voortgang = 1))  as aantalbewerking,\n(select sum(bewerkingaantal) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) as gepland,\n(select sum(bewerkingaantal) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER and BEWERKINGFLOW.einddatumtijd is not null) as bewerkt,\n(select sum(tijd) from BEWERKINGFLOW,BEWERKINGTIJD where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER and BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id) as besteed,";
                        //
                        sql += "  \n(select CONCAT(round(\n" + sqlpartaantal + "\n/\n" + sqlpartbewerkingen + "\n/\n" + sqlparttijd + "\n* 60),\n' uit ',\n" + sqlpartopdrachten + ",\n'*',\n" + sqlpartbewerkingen + "\n) from DUAL\n) as berekening,";
                        sql += " \n(select round(\nBEWERKING.productieaantal / (\n" + sqlpartaantal + "\n/\n" + sqlpartbewerkingen + "\n/ \n" + sqlparttijd + "\n)\n) from DUAL\n) as gemiddeld,";
                        sql += "\n" + sqlpartak2eind + "\nas ak2einddatumtijd,";
                        //
                        sql += "\n(select sum(uitval) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) as aantaluitval,\n(select sum(aantalafkeur) from BEWERKINGUITVAL where BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) as aantalafkeur,\n(select sum(aantalreparatie) from BEWERKINGUITVAL where BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.BEWERKINGSNUMMER) as aantalreparatie\nfrom BEWERKING";
                        //
                        //
                        //
                        if (bewerkingsnummer != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nbewerkingsnummer = '" + bewerkingsnummer + "'";
                        }
                        if (productnummer != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            if (Number(is) == 1) {
                                where += "\nproductnummer = '" + productnummer + "'";
                            }
                            else {
                                where += "\nucase(productnummer) like ucase('" + productnummer + "%')";
                            }
                        }
                        if (open == 'Nee') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nnot isnull(einddatumtijd)";
                        }
                        if (open == 'Ja') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nisnull(einddatumtijd)";
                        }
                        if (afgesloten == 'on') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nnot isnull(einddatumtijd)";
                        }
                        if (selR == 'Nee') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nbewerkingsnummer not like 'R%'";
                        }
                        if (selR == 'Ja') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nbewerkingsnummer like 'R%'";
                        }
                        if (datum != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nstartdatumtijd >= screendate2date('" + datum + "')";
                        }
                        if (datumvanaf != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\neinddatumtijd >= screendate2date('" + datumvanaf + "')";
                        }
                        if (datumtm != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\neinddatumtijd <= screendate2date('" + datumtm + ")";
                        }
                        if (ak2einddatumvanaf != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += " \n(select max(BEWERKINGFLOW.einddatumtijd) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer)\n>= screendate2date('" + ak2einddatumvanaf + "')\nand not exists (select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer and BEWERKINGFLOW.einddatumtijd is null)";
                        }
                        if (ak2einddatumtm != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += " \n(select max(BEWERKINGFLOW.einddatumtijd) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer)\n<= screendate2date('" + ak2einddatumtm + "')\nand not exists (select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer and BEWERKINGFLOW.einddatumtijd is null)";
                        }
                        //
                        //
                        //
                        sql += "\n" + where + "\n) BASE) BASE2";
                        where = '';
                        if (lijn != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += " \nlijn = '" + lijn + "'";
                        }
                        sql += "\n            " + where + "\n            order by Lijn,Bewerkingsnummer,Ak2Einddatumtijd,Startdatumtijd\n            ";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        //
                        //
                        //
                        rows = _b.sent();
                        //
                        res.crudConnection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerking.prototype.doInsert = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var id, startaantal, productieaantal, _a, sqlinsert, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = db_1.default.getDataId(req);
                        startaantal = Number(req.body.STARTAANTAL) || 0;
                        productieaantal = Number(req.body.PRODUCTIE) || 0;
                        if (startaantal < productieaantal) {
                            startaantal = productieaantal;
                        }
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        sqlinsert = " \ninsert into BEWERKING\n(bewerkingsnummer,initstartdatumtijd,startdatumtijd,\nlijn,plandatumtijd,einddatumtijd,eindcontrolenummer,\nProductnummer,Productieaantal,Startaantal,\nOpmerking)\nvalues (\n'" + db_1.default.fix(req.body.BEWERKINGSNUMMER) + "',\nscreendate2date('" + req.body.INITDATUM + "'),\nscreendate2date('" + req.body.START + "'),\n'" + db_1.default.fix(req.body.LIJN) + "',\nscreendate2date('" + req.body.PLAN + "'),\nscreendate2date('" + req.body.EIND + "'),\n'" + db_1.default.fix(req.body.EINDCONTROLENUMMER) + "',\n'" + db_1.default.fix(req.body.PRODUCTNUMMER) + "',\n'" + db_1.default.fix(String(productieaantal)) + "',\n'" + db_1.default.fix(String(startaantal)) + "',\n'" + db_1.default.fix(req.body.OPMERKING) + "')";
                        //
                        // test
                        //
                        if (Number(productieaantal) == 0) {
                            logger_1.Logger.test(req, sqlinsert);
                        }
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlinsert)];
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
    Bewerking.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var id, startaantal, productieaantal, _a, sql, rows, row, thisOld, thisNew;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = db_1.default.getDataId(req);
                        startaantal = Number(req.body.STARTAANTAL) || 0;
                        productieaantal = Number(req.body.PRODUCTIEAANTAL) || 0;
                        if (startaantal < productieaantal) {
                            startaantal = productieaantal;
                        }
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        sql = " \nselect \nbewerkingsnummer \nfrom BEWERKING \nwhere id  = '" + db_1.default.fix(id) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        if (!rows[0]) return [3 /*break*/, 6];
                        row = rows[0];
                        thisOld = db_1.default.fix(row.BEWERKINGSNUMMER);
                        thisNew = db_1.default.fix(req.body.BEWERKINGSNUMMER);
                        if (!(thisOld != thisNew)) return [3 /*break*/, 6];
                        sql = " \nupdate BEWERKINGFLOW set\nbewerkingsnummer = '" + thisNew + "'\nwhere bewerkingsnummer = '" + thisOld + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _b.sent();
                        sql = " \nupdate BEWERKINGTIJD set\nbewerkingsnummer = '" + thisNew + "'\nwhere bewerkingsnummer = '" + thisOld + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        _b.sent();
                        sql = " \nupdate BEWERKINGUITVAL set\nbewerkingsnummer = '" + thisNew + "'\nwhere bewerkingsnummer = '" + thisOld + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        sql = "\nupdate BEWERKING set\nBewerkingsnummer =  '" + db_1.default.fix(req.body.BEWERKINGSNUMMER) + "',\nInitStartdatumtijd = screendate2date('" + req.body.INITDATUM + "'),\nStartdatumtijd = screendate2date('" + req.body.START + "'),\nlijn = '" + db_1.default.fix(req.body.LIJN) + "',\nPlandatumtijd = screendate2date('" + req.body.PLAN + "'),\nEinddatumtijd = screendate2date('" + req.body.EIND + "'),\nEindcontrolenummer =  '" + db_1.default.fix(req.body.EINDCONTROLENUMMER) + "',\nProductnummer = '" + db_1.default.fix(req.body.PRODUCTNUMMER) + "',\nProductieaantal = '" + productieaantal + "',\nStartaantal = '" + startaantal + "',\nOpmerking = '" + db_1.default.fix(req.body.OPMERKING) + "'\nwhere id = '" + db_1.default.fix(id) + "'";
                        //
                        // test
                        //
                        if (Number(productieaantal) == 0) {
                            logger_1.Logger.test(req, sql);
                        }
                        //
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 7:
                        //
                        _b.sent();
                        //
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerking.prototype.routes = function (req, res, next) {
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
    return Bewerking;
}(crud_1.Crud));
exports.Bewerking = Bewerking;
//# sourceMappingURL=bewerking.js.map