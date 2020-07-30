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
exports.Bewerkingflow = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var dict = {
    table: "BEWERKINGFLOW",
    key: [
        {
            body: "BEWERKINGSNUMMER",
            sql: "BEWERKINGSNUMMER",
        },
        {
            body: "VOLGNUMMER",
            sql: "VOLGNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "bewerkingsnummer,volgnummer",
        where: [],
        fields: [],
    },
    query: {
        orderby: "bewerkingsnummer,volgnummer",
        where: [],
        fields: [],
    },
    update: {
        fields: [],
    },
};
var Bewerkingflow = /** @class */ (function (_super) {
    __extends(Bewerkingflow, _super);
    function Bewerkingflow() {
        return _super.call(this, dict) || this;
    }
    Bewerkingflow.prototype.updateProductflow = function (req, res, next, bewerkingsnummer) {
        return __awaiter(this, void 0, void 0, function () {
            var productnummer, sql, rows, row, sqlupdate, irow, sqlflow, rowsflow, rowflow, sqlinsert, sqldelete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productnummer = '';
                        sql = "\nselect \nproductnummer \nfrom BEWERKING\nwhere bewerkingsnummer = '" + db_1.default.fix(bewerkingsnummer) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        if (!rows[0]) {
                            return [2 /*return*/];
                        }
                        row = rows[0];
                        productnummer = row.PRODUCTNUMMER;
                        sqlupdate = "\nupdate \nPRODUCTFLOW \nset volgnummer = -1\nwhere productnummer = '" + db_1.default.fix(productnummer) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 2:
                        _a.sent();
                        //
                        // en nu weer inschakelen
                        //
                        sql = "\nselect \nmin(volgnummer) as volgnummer, \nBEWERKINGFLOW.bewerkingsoort\nfrom BEWERKINGFLOW,BEWERKINGSOORT\nwhere bewerkingsnummer = '" + db_1.default.fix(bewerkingsnummer) + "'\nand BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\nand BEWERKINGSOORT.voortgang = '1'\ngroup by BEWERKINGFLOW.bewerkingsoort";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _a.sent();
                        irow = 0;
                        _a.label = 4;
                    case 4:
                        if (!(irow < rows.length)) return [3 /*break*/, 10];
                        row = rows[irow];
                        sqlflow = "\nselect * \nfrom PRODUCTFLOW\nwhere productnummer = '" + db_1.default.fix(productnummer) + "'\nand bewerkingsoort = '" + row.BEWERKINGSOORT + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlflow)];
                    case 5:
                        rowsflow = _a.sent();
                        if (!rowsflow[0]) return [3 /*break*/, 7];
                        rowflow = rowsflow[0];
                        //
                        // Een bestaande weer activeren
                        //
                        sqlupdate = "\nupdate PRODUCTFLOW set\nvolgnummer = '" + row.VOLGNUMMER + "'\nwhere productnummer = '" + db_1.default.fix(productnummer) + "'\nand bewerkingsoort = '" + row.BEWERKINGSOORT + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        sqlinsert = "\ninsert into PRODUCTFLOW \n(productnummer,bewerkingsoort,volgnummer)\nvalues (\n'" + db_1.default.fix(productnummer) + "',\n'" + db_1.default.fix(row.BEWERKINGSOORT) + "',\n'" + db_1.default.fix(row.VOLGNUMMER) + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlinsert)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        irow++;
                        return [3 /*break*/, 4];
                    case 10:
                        sqldelete = "\ndelete from PRODUCTFLOW\nwhere productnummer = '" + db_1.default.fix(productnummer) + "'\nand volgnummer = -1";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqldelete)];
                    case 11:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingflow.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, where, sql, bewerkingsnummer, productnummer, bewerkingsoort, addbwkflow, addproductflow, rows_1, row, sqlinsert, rows_2, irow, row, aantal, sqlaantal, rowsaantal, rowaantal, sqlupdate, volgnummer, rows_3, irow, row, sqlupdate, rows;
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
                        bewerkingsnummer = req.query.bewerkingsnummer || '';
                        productnummer = req.query.productnummer || '';
                        bewerkingsoort = req.query.bewerkingsoort || '';
                        addbwkflow = 1;
                        addproductflow = 0;
                        if (bewerkingsnummer == '') {
                            addbwkflow = 0;
                        }
                        if (!(addbwkflow == 1)) return [3 /*break*/, 3];
                        sql = "\nselect \nproductnummer from BEWERKING\nwhere bewerkingsnummer = '" + db_1.default.fix(bewerkingsnummer) + "'\nand einddatumtijd is null";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows_1 = _b.sent();
                        if (rows_1[0]) {
                            row = rows_1[0];
                            productnummer = row.PRODUCTNUMMER;
                            if (productnummer != '') {
                                addproductflow = 1;
                            }
                        }
                        else {
                            addbwkflow = 0;
                        }
                        _b.label = 3;
                    case 3:
                        if (!(addproductflow == 1)) return [3 /*break*/, 5];
                        sqlinsert = "\ninsert into BEWERKINGFLOW\n(Bewerkingsnummer,Bewerkingsoort,Volgnummer,\nBewerkingaantal, Startdatumtijd, Geprint, Plandatumtijd, Einddatumtijd)\nselect \n'" + db_1.default.fix(bewerkingsnummer) + "',\n bewerkingsoort, volgnummer,\n0,null,null,null,null\nfrom PRODUCTFLOW\nwhere productnummer = '" + db_1.default.fix(productnummer) + "'\nand not exists\n(select 1 from BEWERKINGFLOW\nwhere BEWERKINGFLOW.bewerkingsnummer = '" + db_1.default.fix(bewerkingsnummer) + "'\nand BEWERKINGFLOW.bewerkingsoort = PRODUCTFLOW.bewerkingsoort)\nand bewerkingsoort is not null";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlinsert)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        if (!(bewerkingsnummer != '')) return [3 /*break*/, 12];
                        sql = "\n        select * from BEWERKINGFLOW\nwhere bewerkingsnummer = '" + db_1.default.fix(bewerkingsnummer) + "'\nand bewerkingsoort is not null\nand bewerkingaantal = 0\nand exists\n(select 1 from BEWERKINGSOORT \nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort \nand voortgang = '1')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        rows_2 = _b.sent();
                        irow = 0;
                        _b.label = 7;
                    case 7:
                        if (!(irow < rows_2.length)) return [3 /*break*/, 12];
                        row = rows_2[0];
                        aantal = '0';
                        sqlaantal = "\nselect \nsum(ifnull(bewerkingaantal,0)) as aantal \nfrom BEWERKINGFLOW\nwhere bewerkingsnummer = '" + db_1.default.fix(bewerkingsnummer) + "'\nand bewerkingsoort = '" + row.BEWERKINGSOORT + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlaantal)];
                    case 8:
                        rowsaantal = _b.sent();
                        if (rowsaantal[0]) {
                            rowaantal = rowsaantal[0];
                            aantal = rowaantal.AANTAL;
                        }
                        if (aantal == '') {
                            aantal = '0';
                        }
                        sqlupdate = "\nupdate BEWERKINGFLOW set\nbewerkingaantal = \n(select ifnull(startaantal,0) from BEWERKING\nwhere bewerkingsnummer = '" + db_1.default.fix(bewerkingsnummer) + "') - " + aantal + "\nwhere id = '" + db_1.default.fix(row.ID) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 9:
                        _b.sent();
                        sqlupdate = "\nupdate BEWERKINGFLOW set\nbewerkingaantal = 0\nwhere bewerkingaantal < 0 \nand id = '" + db_1.default.fix(row.ID) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11:
                        irow++;
                        return [3 /*break*/, 7];
                    case 12:
                        if (!(bewerkingsnummer != '')) return [3 /*break*/, 17];
                        sql = "\nselect * \nfrom BEWERKINGFLOW\nwhere bewerkingsnummer = '" + db_1.default.fix(bewerkingsnummer) + "'\norder by case when volgnummer = null then 999999 when volgnummer = 0 then 999999 else volgnummer end, id";
                        volgnummer = 0;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 13:
                        rows_3 = _b.sent();
                        irow = 0;
                        _b.label = 14;
                    case 14:
                        if (!(irow < rows_3.length)) return [3 /*break*/, 17];
                        row = rows_3[irow];
                        volgnummer = volgnummer + 1;
                        sqlupdate = "\nupdate BEWERKINGFLOW set\nvolgnummer = '" + volgnummer + "'\nwhere id = '" + db_1.default.fix(row.ID) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 15:
                        _b.sent();
                        _b.label = 16;
                    case 16:
                        irow++;
                        return [3 /*break*/, 14];
                    case 17:
                        //
                        // Hier gaan we dan
                        //
                        sql = "\nselect \nid, \nBewerkingsnummer,\nEindcontrolenummer,\n(select min(bewerkingsoort) \nfrom BEWERKINGSOORT \nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) \nas bwksoort,\n(select min(naam) \nfrom BEWERKINGSOORT \nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) \nas bewerkingsoort,\n(select min(kleur) \nfrom BEWERKINGSOORT \nwhere BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) \nas kleur,\n(select min(layout) \nfrom BEWERKINGSOORT \nwhere BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) \nas layout,\n(select sum(tijd) \nfrom BEWERKINGTIJD \nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id) \nas besteed,\n(select cast(concat(\nsum(case when aantalAfkeur is null then 0 else aantalAfkeur end),\n'/',\nsum(case when aantalreparatie is null then 0 else aantalreparatie end)\n) as char(1000))\nfrom BEWERKINGUITVAL \nwhere BEWERKINGUITVAL.bewerkingflowid = BEWERKINGFLOW.id) \nas registreeruitval,\n(select sum(tijd) \nfrom BEWERKINGTIJD \nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id) \nas registreertijd,\nVolgnummer,\nBewerkingaantal,\ndate2screendate(startdatumtijd) as STARTDATUM,\ngeprint,\ndate2screendate(plandatumtijd) as PLANDATUM,\ndate2screendate(einddatumtijd) as EINDDATUM,\ntekeningnummer, \ntekeningrevisie,\ndate2screendate(tekeningdatumtijd) as TEKENINGDATUM,\ncase when Uitval = 0 then null else Uitval end as Uitval\nfrom BEWERKINGFLOW";
                        //
                        // Bij lege bewerkingsnummer niets selekteren
                        //
                        if (where == '') {
                            where += ' where ';
                        }
                        else {
                            where += ' and ';
                        }
                        where += "\nBEWERKINGFLOW.bewerkingsnummer = '" + db_1.default.fix(bewerkingsnummer) + "'";
                        if (bewerkingsoort != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nBEWERKINGFLOW.bewerkingsoort in (\nselect bewerkingsoort from BEWERKINGSOORT where naam = '" + db_1.default.fix(bewerkingsoort) + "')";
                        }
                        sql += "\n" + where + "\norder by Bewerkingsnummer,volgnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 18:
                        rows = _b.sent();
                        //
                        res.crudConnection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingflow.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = db_1.default.getDataId(req);
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        sql = "\nupdate BEWERKINGFLOW set\nBewerkingsnummer ='" + db_1.default.fix(req.body.BEWERKINGSNUMMER) + "',\nBewerkingsoort = (select min(bewerkingsoort) from BEWERKINGSOORT\nwhere naam ='" + db_1.default.fix(req.body.BEWERKINGSOORT) + "'),\nVolgnummer ='" + db_1.default.fix(req.body.VOLGNUMMER) + "',\nBewerkingaantal ='" + db_1.default.fix(req.body.BEWERKINGAANTAL) + "',\nstartdatumtijd = screendate2date('" + db_1.default.fix(req.body.STARTDATUM) + "'),\nGeprint ='" + db_1.default.fix(req.body.GEPRINT) + "',\nplandatumtijd = screendate2date('" + db_1.default.fix(req.body.PLANDATUM) + "'),\neinddatumtijd = screendate2date('" + db_1.default.fix(req.body.EINDDATUM) + "'),\neindcontrolenummer ='" + db_1.default.fix(req.body.EINDCONTROLENUMMER) + "',\ntekeningnummer ='" + db_1.default.fix(req.body.TEKENINGNUMMER) + "',\ntekeningrevisie ='" + db_1.default.fix(req.body.TEKENINGREVISIE) + "',\ntekeningdatumtijd =screendate2date('" + db_1.default.fix(req.body.TEKENINGDATUM) + "'),\nUitval ='" + db_1.default.fix(req.body.UITVAL) + "'\nwhere id ='" + db_1.default.fix(req.body.ID) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _b.sent();
                        //
                        return [4 /*yield*/, this.updateProductflow(req, res, next, req.body.BEWERKINGSNUMMER)];
                    case 3:
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
    Bewerkingflow.prototype.doInsert = function (req, res, next, options) {
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
                        sql = "\ninsert into BEWERKINGFLOW\n(Bewerkingsnummer,Bewerkingsoort,Volgnummer,\nBewerkingaantal, Startdatumtijd, Geprint, Plandatumtijd, Einddatumtijd, Eindcontrolenummer,\ntekeningnummer,tekeningrevisie,tekeningdatumtijd,Uitval)\nvalues (\n'" + db_1.default.fix(req.body.BEWERKINGSNUMMER) + "',\n(select min(bewerkingsoort) from BEWERKINGSOORT where naam = '" + db_1.default.fix(req.body.BEWERKINGSOORT) + "'),\n'" + db_1.default.fix(req.body.VOLGNUMMER) + "',\n'" + db_1.default.fix(req.body.BEWERKINGAANTAL) + "',\nscreendate2date('" + db_1.default.fix(req.body.STARTDATUM) + "'),\n'" + db_1.default.fix(req.body.GEPRINT) + "',\nscreendate2date('" + db_1.default.fix(req.body.PLANDATUM) + "'),\nscreendate2date('" + db_1.default.fix(req.body.EINDDATUM) + "'),\n'" + db_1.default.fix(req.body.EINDCONTROLENUMMER) + "',\n'" + db_1.default.fix(req.body.TEKENINGNUMMER) + "',\n'" + db_1.default.fix(req.body.TEKENINGREVISIE) + "',\nscreendate2date('" + db_1.default.fix(req.body.TEKENINGDATUM) + "'),\n'" + db_1.default.fix(req.body.UITVAL) + "'\n)";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        result = _b.sent();
                        req.body.ID = db_1.default.getInsertId(result);
                        //
                        return [4 /*yield*/, this.updateProductflow(req, res, next, req.body.BEWERKINGSNUMMER)];
                    case 3:
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
    Bewerkingflow.prototype.doDelete = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, bewerkingsnummer, sql, rows, row, sqldelete;
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
                        bewerkingsnummer = '';
                        sql = "\nselect \nBEWERKINGSNUMMER from BEWERKINGFLOW\nwhere ID = '" + db_1.default.fix(id) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        if (rows[0]) {
                            row = rows[0];
                            bewerkingsnummer = row.BEWERKINGSNUMMER;
                        }
                        sqldelete = "\ndelete from BEWERKINGFLOW\nwhere ID = '" + db_1.default.fix(id) + "'\nand not exists \n(select 1 from BEWERKINGTIJD \nwhere BEWERKINGTIJD.bewerkingflowid = '" + db_1.default.fix(id) + "')\nand not exists \n(select 1 from BEWERKINGUITVAL \nwhere BEWERKINGUITVAL.bewerkingflowid = '" + db_1.default.fix(id) + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqldelete)];
                    case 3:
                        _b.sent();
                        if (!(bewerkingsnummer != '')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.updateProductflow(req, res, next, bewerkingsnummer)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        //
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingflow.prototype.routes = function (req, res, next) {
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
    return Bewerkingflow;
}(crud_1.Crud));
exports.Bewerkingflow = Bewerkingflow;
//# sourceMappingURL=bewerkingflow.js.map