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
    table: "productbwerkingrap",
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
var Productbewerkingrap = /** @class */ (function (_super) {
    __extends(Productbewerkingrap, _super);
    function Productbewerkingrap() {
        return _super.call(this, dict) || this;
    }
    Productbewerkingrap.prototype.addBewerking = function (req, res, next, productnummer) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, sqlpartaantal, sqlpartproductieaantal, sqlpartstartaantal, sqlparttijd, sqlpartbewerkingen, sqlpartopdrachten, sql, rows, irow, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        //
                        if (query.datumvanaf == '') {
                            query.datumvanaf = query.datum;
                        }
                        if (query.datumtm == '') {
                            query.datumtm = '31-12-2099';
                        }
                        result = '';
                        sqlpartaantal = " \n(select sum(BEWERKINGFLOW.bewerkingaantal)\n from BEWERKINGFLOW,BEWERKING E\n where BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer\n and E.productnummer =  '" + productnummer + "'\n and E.einddatumtijd is not null\n and E.einddatumtijd >= screendate2date('" + query.datumvanaf + "')\n and E.einddatumtijd <= screendate2date('" + query.datumtm + "')\n and E.startdatumtijd >= screendate2date('" + query.datum + "')\n and exists (\n select 1 from BEWERKINGSOORT\n where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\n and BEWERKINGSOORT.voortgang = 1\n )\n and exists (\n select 1 from BEWERKINGTIJD\n where BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\n )\n )";
                        sqlpartproductieaantal = "\n(select sum(productieaantal)\nfrom BEWERKING E\nwhere E.productnummer =  '" + productnummer + "'\nand E.einddatumtijd is not null\nand E.einddatumtijd >= screendate2date('" + query.datumvanaf + "')\nand E.einddatumtijd <= screendate2date('" + query.datumtm + "')\nand E.startdatumtijd >= screendate2date('" + query.datum + "')\n)";
                        sqlpartstartaantal = "\n(select sum(startaantal)\nfrom BEWERKING E\nwhere E.productnummer =  '" + productnummer + "'\nand E.einddatumtijd is not null\nand E.einddatumtijd >= screendate2date('" + query.datumvanaf + "')\nand E.einddatumtijd <= screendate2date('" + query.datumtm + "')\nand E.startdatumtijd >= screendate2date('" + query.datum + "')\n)";
                        sqlparttijd = "\n(select round(sum(BEWERKINGTIJD.tijd)/60,2) \nfrom BEWERKINGTIJD,BEWERKINGFLOW,BEWERKING C\nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\nand BEWERKINGFLOW.bewerkingsnummer = C.bewerkingsnummer\nand C.PRODUCTNUMMER = '" + productnummer + "'\nand C.einddatumtijd is not null\nand C.einddatumtijd >= screendate2date('" + query.datumvanaf + "')\nand C.einddatumtijd <= screendate2date('" + query.datumtm + "')\nand C.startdatumtijd >= screendate2date('" + query.datum + "')\n)";
                        sqlpartbewerkingen = "\n(select count(distinct BEWERKINGFLOW.bewerkingsoort)\nfrom BEWERKINGFLOW,BEWERKING E\nwhere BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer\nand E.PRODUCTNUMMER = '" + productnummer + "'\nand E.einddatumtijd is not null\nand E.einddatumtijd >= screendate2date('" + query.datumvanaf + "')\nand E.einddatumtijd <= screendate2date('" + query.datumtm + "')\nand E.startdatumtijd >= screendate2date('" + query.datum + "')\nand exists (\nselect 1 from BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGSOORT.voortgang = 1\n)\nand exists (\nselect 1 from BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\n)\n)";
                        sqlpartopdrachten = "\n(select count(distinct E.bewerkingsnummer)\nfrom BEWERKINGFLOW,BEWERKING E\nwhere BEWERKINGFLOW.bewerkingsnummer = E.bewerkingsnummer\nand E.PRODUCTNUMMER = '" + productnummer + "'\nand E.einddatumtijd is not null\nand E.einddatumtijd >= screendate2date('" + query.datumvanaf + "')\nand E.einddatumtijd <= screendate2date('" + query.datumtm + "')\nand E.startdatumtijd >= screendate2date('" + query.datum + "')\nand exists (\nselect 1 from BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGSOORT.voortgang = 1\n)\n)";
                        sql = "\nselect\n'BWK' as type,\n" + sqlparttijd + " as uren,\n" + sqlpartstartaantal + " as aantal,\n" + sqlpartopdrachten + " as bewerkingen,\nround(" + sqlpartstartaantal + " / " + sqlparttijd + ") as gemaantaluur,\n(select SOORT from PRODUCT \nwhere productnummer = '" + productnummer + "') \nas soort,\nif ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = '" + productnummer + "')) is not null,\n(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = '" + productnummer + "')),\nif ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = '" + productnummer + "') is not null,\n(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = '" + productnummer + "'),\nnull\n)\n) as lijn,\n(select inkoopprijs from PRODUCT \nwhere productnummer = '" + productnummer + "') \nas inkoopprijs,\n(select inkoopprijsgemiddeld from PRODUCT \nwhere productnummer = '" + productnummer + "') \nas inkoopprijsgemiddeld\nfrom DUAL";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (Number(row.UREN) != 0) {
                                row.UREN = Number(row.UREN).toFixed(2);
                            }
                            row.INKOOPPRIJS = Number(row.INKOOPPRIJS).toFixed(8);
                            row.INKOOPPRIJSGEMIDDELD = Number(row.INKOOPPRIJSGEMIDDELD).toFixed(8);
                            result += ",\n";
                            result += JSON.stringify(row);
                        }
                        //
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Productbewerkingrap.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var where, sql, result, swfirst, tlart, query, _a, rows, irow, row, sql99, rows99, row99, _b, sqlO1, rowsO1, irowO1, rowO1, _c, sqlO2, rowsO2, irowO2, rowO2, _d, sqlO3, rowsO3, irowO3, rowO3, _e, sqlO4, rowsO4, irowO4, rowO4, _f, sqlO5, rowsO5, irowO5, rowO5, _g, sqlO6, rowsO6, irowO6, rowO6, _h, sql99, rows99, row99;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        where = '';
                        sql = '';
                        result = '';
                        swfirst = 0;
                        tlart = 0;
                        query = db_1.default.fixQuery(req.query);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _j.sent();
                        if (!(query.action == 'getartikel')) return [3 /*break*/, 34];
                        sql = "\nselect * from (\nselect 'P' as TYPE, \nPRODUCTNUMMER,SOORT,\nif ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)) is not null,\n(select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer)),\nif ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer) is not null,\n(select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = PRODUCT.productnummer),\nnull\n)\n) as lijn\nfrom PRODUCT";
                        if (query.productnummer != '') {
                            where += util_1.Util.addAnd(where);
                            where += "productnummer like ('" + query.productnummer + "%')";
                        }
                        if (query.klant.trim() != '') {
                            where += util_1.Util.addAnd(where);
                            where += "productnummer in (\nselect productnummer from PRODUCTVRAAG \nwhere klantnaam = trim('" + query.klant + "')";
                        }
                        if (query.soort.substr(0, 1) == 'M') {
                            where += util_1.Util.addAnd(where);
                            where += "soort = 'M'";
                        }
                        else if (query.soort.substr(0, 1) == 'V') {
                            where += util_1.Util.addAnd(where);
                            where += "soort = 'V'";
                        }
                        sql += "\n" + where + "\norder by PRODUCTNUMMER\n) BASE";
                        if (query.lijn.trim() != '') {
                            sql += " where BASE.lijn = trim(" + query.lijn + "')";
                        }
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _j.sent();
                        swfirst = 1;
                        tlart = 0;
                        result += "[\n";
                        irow = 0;
                        _j.label = 3;
                    case 3:
                        if (!(irow < rows.length)) return [3 /*break*/, 33];
                        row = rows[irow];
                        tlart++;
                        if (!(tlart > 500)) return [3 /*break*/, 5];
                        sql99 = "\nselect '99' as TYPE, \n'Meer dan 500 producten opgevraagd ...' as MSG \nfrom DUAL";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql99)];
                    case 4:
                        rows99 = _j.sent();
                        if (rows99[0]) {
                            row99 = rows99[0];
                            if (swfirst == 1) {
                                swfirst = 0;
                            }
                            else {
                                result += ",\n";
                            }
                            result += JSON.stringify(row99);
                        }
                        return [3 /*break*/, 33];
                    case 5:
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(row);
                        //
                        _b = result;
                        return [4 /*yield*/, this.addBewerking(req, res, next, row.PRODUCTNUMMER)];
                    case 6:
                        //
                        result = _b + _j.sent();
                        sqlO1 = "\nselect 'O1' as TYPE,\nPRODUCTNUMMER,\nFAKTOR,\nONDERDEELNUMMER from ONDERDEEL\nwhere PRODUCTNUMMER = '" + row.PRODUCTNUMMER + "'\nand ONDERDEELNUMMER !=  '" + row.PRODUCTNUMMER + "'\nand FAKTOR >= 0 \norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO1)];
                    case 7:
                        rowsO1 = _j.sent();
                        irowO1 = 0;
                        _j.label = 8;
                    case 8:
                        if (!(irowO1 < rowsO1.length)) return [3 /*break*/, 32];
                        rowO1 = rowsO1[irowO1];
                        rowO1.FAKTOR = Number(rowO1.FAKTOR).toFixed(7);
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO1);
                        _c = result;
                        return [4 /*yield*/, this.addBewerking(req, res, next, rowO1.ONDERDEELNUMMER)];
                    case 9:
                        result = _c + _j.sent();
                        sqlO2 = "\nselect 'O2' as TYPE,\nFAKTOR,\nONDERDEELNUMMER from ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO1.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER !=  '" + rowO1.ONDERDEELNUMMER + "'\nand FAKTOR >= 0 \norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO2)];
                    case 10:
                        rowsO2 = _j.sent();
                        irowO2 = 0;
                        _j.label = 11;
                    case 11:
                        if (!(irowO2 < rowsO2.length)) return [3 /*break*/, 31];
                        rowO2 = rowsO2[irowO2];
                        rowO2.FAKTOR = Number(rowO2.FAKTOR).toFixed(7);
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO2);
                        _d = result;
                        return [4 /*yield*/, this.addBewerking(req, res, next, rowO2.ONDERDEELNUMMER)];
                    case 12:
                        result = _d + _j.sent();
                        sqlO3 = "\nselect 'O3' as TYPE,\nFAKTOR,\nONDERDEELNUMMER from ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO2.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER !=  '" + rowO2.ONDERDEELNUMMER + "'\nand FAKTOR >= 0 \norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO3)];
                    case 13:
                        rowsO3 = _j.sent();
                        irowO3 = 0;
                        _j.label = 14;
                    case 14:
                        if (!(irowO3 < rowsO3.length)) return [3 /*break*/, 30];
                        rowO3 = rowsO3[irowO3];
                        rowO3.FAKTOR = Number(rowO3.FAKTOR).toFixed(7);
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO3);
                        _e = result;
                        return [4 /*yield*/, this.addBewerking(req, res, next, rowO3.ONDERDEELNUMMER)];
                    case 15:
                        result = _e + _j.sent();
                        sqlO4 = "\nselect 'O4' as TYPE,\nFAKTOR,\nONDERDEELNUMMER \nfrom ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO3.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER !=  '" + rowO3.ONDERDEELNUMMER + "'\nand FAKTOR >= 0 \norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO4)];
                    case 16:
                        rowsO4 = _j.sent();
                        irowO4 = 0;
                        _j.label = 17;
                    case 17:
                        if (!(irowO4 < rowsO4.length)) return [3 /*break*/, 29];
                        rowO4 = rowsO4[irowO4];
                        rowO4.FAKTOR = Number(rowO4.FAKTOR).toFixed(7);
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO4);
                        _f = result;
                        return [4 /*yield*/, this.addBewerking(req, res, next, rowO4.ONDERDEELNUMMER)];
                    case 18:
                        result = _f + _j.sent();
                        sqlO5 = "\nselect 'O5' as TYPE,\nFAKTOR,\nONDERDEELNUMMER \nfrom ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO4.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER !=  '" + rowO4.ONDERDEELNUMMER + "'\nand FAKTOR >= 0 \norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO5)];
                    case 19:
                        rowsO5 = _j.sent();
                        irowO5 = 0;
                        _j.label = 20;
                    case 20:
                        if (!(irowO5 < rowsO5.length)) return [3 /*break*/, 28];
                        rowO5 = rowsO5[irowO5];
                        rowO5.FAKTOR = Number(rowO5.FAKTOR).toFixed(7);
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO5);
                        _g = result;
                        return [4 /*yield*/, this.addBewerking(req, res, next, rowO5.ONDERDEELNUMMER)];
                    case 21:
                        result = _g + _j.sent();
                        sqlO6 = "\nselect 'O6' as TYPE,\nFAKTOR,\nONDERDEELNUMMER \nfrom ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO5.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER !=  '" + rowO5.ONDERDEELNUMMER + "'\nand FAKTOR >= 0 \norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO6)];
                    case 22:
                        rowsO6 = _j.sent();
                        irowO6 = 0;
                        _j.label = 23;
                    case 23:
                        if (!(irowO6 < rowsO6.length)) return [3 /*break*/, 27];
                        rowO6 = rowsO6[irowO6];
                        rowO6.FAKTOR = Number(rowO6.FAKTOR).toFixed(7);
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO6);
                        _h = result;
                        return [4 /*yield*/, this.addBewerking(req, res, next, rowO6.ONDERDEELNUMMER)];
                    case 24:
                        result = _h + _j.sent();
                        sql99 = "\nselect '99' as TYPE,\n'Onderdeel van Onderdeel probleem' as MSG \nfrom DUAL";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql99)];
                    case 25:
                        rows99 = _j.sent();
                        if (rows99[0]) {
                            row99 = rows99[0];
                            if (swfirst == 1) {
                                swfirst = 0;
                            }
                            else {
                                result += ",\n";
                            }
                            JSON.stringify(row99);
                        }
                        _j.label = 26;
                    case 26:
                        irowO6++;
                        return [3 /*break*/, 23];
                    case 27:
                        irowO5++;
                        return [3 /*break*/, 20];
                    case 28:
                        irowO4++;
                        return [3 /*break*/, 17];
                    case 29:
                        irowO3++;
                        return [3 /*break*/, 14];
                    case 30:
                        irowO2++;
                        return [3 /*break*/, 11];
                    case 31:
                        irowO1++;
                        return [3 /*break*/, 8];
                    case 32:
                        irow++;
                        return [3 /*break*/, 3];
                    case 33:
                        result += "]\n";
                        //
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 34: return [2 /*return*/];
                }
            });
        });
    };
    Productbewerkingrap.prototype.routes = function (req, res, next) {
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
    return Productbewerkingrap;
}(crud_1.Crud));
exports.Productbewerkingrap = Productbewerkingrap;
//# sourceMappingURL=productbewerkingrap.js.map