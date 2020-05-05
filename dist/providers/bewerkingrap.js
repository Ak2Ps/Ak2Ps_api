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
    table: "bewerkingrap",
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
var Bewerkingrap = /** @class */ (function (_super) {
    __extends(Bewerkingrap, _super);
    function Bewerkingrap() {
        return _super.call(this, dict) || this;
    }
    Bewerkingrap.prototype.getPerc = function (perc) {
        var result = '';
        if (perc == 0) {
            return '0';
        }
        if (perc == 100) {
            return '100';
        }
        return perc.toFixed(1);
    };
    Bewerkingrap.prototype.doBewerkingrap = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sqlbewerking, rowsbewerking, rowbewerking, sqlproduct, rowsproduct, rowproduct, irowproduct, sqltekening, rowstekening, rowtekening, toturen, totreparatie, totafkeur, sqltijd, rowstijd, rowtijd, irowtijd, sqluitval, rowsuitval, rowuitval, irowuitval, bewerkingsnummer, _a, irowtekening;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = '';
                        irowproduct = 0;
                        toturen = 0;
                        totreparatie = 0;
                        totafkeur = 0;
                        irowtijd = 0;
                        irowuitval = 0;
                        bewerkingsnummer = db_1.default.fix(req.query.bewerkingsnummer || '');
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        //
                        sqlbewerking = "\nselect * from BEWERKING \nwhere bewerkingsnummer = '" + bewerkingsnummer + "' ";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlbewerking)];
                    case 2:
                        rowsbewerking = _b.sent();
                        if (!rowsbewerking[0]) return [3 /*break*/, 7];
                        rowbewerking = rowsbewerking[0];
                        sqlproduct = "\nselect * \nfrom PRODUCT \nwhere productnummer = '" + rowbewerking.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproduct)];
                    case 3:
                        rowsproduct = _b.sent();
                        result += '<table class="t">';
                        result += '<tr>';
                        result += '<td class="lth">';
                        result += 'Bewerkingsoort';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Volgens<br>Tekeningnummer';
                        result += '</td>';
                        result += '<td class="lth">';
                        result += 'Revisie';
                        result += '</td>';
                        result += '<td class="lth">';
                        result += 'Datum';
                        result += '</td>';
                        result += '</tr>';
                        sqltekening = "\nselect tekeningnummer, tekeningrevisie,\ndate2screendate(tekeningdatumtijd) as TEKENINGDATUM,\n(select min(naam) from BEWERKINGSOORT where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) as bewerkingsoort\nfrom BEWERKINGFLOW\nwhere bewerkingsnummer = '" + bewerkingsnummer + "'\norder by Startdatumtijd, bewerkingsoort, tekeningnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqltekening)];
                    case 4:
                        rowstekening = _b.sent();
                        for (irowtekening = 0; irowtekening < rowstekening.length; irowtekening++) {
                            rowtekening = rowstekening[irowtekening];
                            result += '<tr>';
                            result += '<td class="ltr">' + rowtekening.BEWERKINGSOORT + '</td>';
                            result += '<td class="tr">' + rowtekening.TEKENINGNUMMER + '</td>';
                            result += '<td class="tr">' + rowtekening.TEKENINGREVISIE + '</td>';
                            result += '<td class="tr">' + rowtekening.TEKENINGDATUM + '</td>';
                            result += '</tr>';
                        }
                        result += "</table>";
                        result += '<br>';
                        if (!rowsproduct[irowproduct]) return [3 /*break*/, 7];
                        rowproduct = rowsproduct[irowproduct];
                        result += '<table class="t">';
                        result += '<tr>';
                        result += '<td class="lth">';
                        result += 'Bewerkingsoort';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Uren';
                        result += '</td>';
                        result += '<td style="width:20px">&nbsp;</td>';
                        result += '<td class="lth">';
                        result += 'Uitval';
                        result += '</td>';
                        result += '<td class="lth">';
                        result += 'Afkeur';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Reparatie';
                        result += '</td>';
                        result += '</tr>';
                        toturen = 0;
                        totreparatie = 0;
                        totafkeur = 0;
                        sqltijd = "\nselect \n(select min(naam) from BEWERKINGSOORT where BEWERKINGSOORT.bewerkingsoort = BEWERKINGTIJD.bewerkingsoort) as bewerkingsoort,\nsum(tijd) as uren\nfrom BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingsnummer = '" + bewerkingsnummer + "'\ngroup by bewerkingsoort\norder by bewerkingsoort";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqltijd)];
                    case 5:
                        rowstijd = _b.sent();
                        irowtijd = 0;
                        sqluitval = "\nselect\nsum(case when AantalReparatie = 0 then null else AantalReparatie end) as AantalReparatie,\nsum(case when AantalAfkeur = 0 then null else AantalAfkeur end) as AantalAfkeur,\n(select min(concat(uitval,' ',naam)) \nfrom UITVAL where UITVAL.UITVAL = BEWERKINGUITVAL.uitval) as uitval\nfrom BEWERKINGUITVAL\nwhere BEWERKINGUITVAL.bewerkingsnummer = '" + bewerkingsnummer + "'\ngroup by uitval\nhaving (sum(AantalReparatie) != 0 or sum(AantalAfkeur) != 0)\norder by uitval";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqluitval)];
                    case 6:
                        rowsuitval = _b.sent();
                        irowuitval = 0;
                        //
                        while (rowsuitval[irowuitval] || rowstijd[irowtijd]) {
                            result += '<tr>';
                            if (rowstijd[irowtijd]) {
                                rowtijd = rowstijd[irowtijd];
                                irowtijd++;
                                result += '<td class="ltr" style="width:10em">';
                                result += rowtijd.BEWERKINGSOORT;
                                result += '</td>';
                                result += '<td class="tr">';
                                result += util_1.Util.MakeHHMM(rowtijd.UREN);
                                toturen += Number(rowtijd.UREN);
                                result += '</td>';
                            }
                            else {
                                result += '<td class="ltr">';
                                result += ' ';
                                result += '</td>';
                                result += '<td class="tr">';
                                result += ' ';
                                result += '</td>';
                            }
                            result += '<td>';
                            result += ' ';
                            result += '</td>';
                            if (rowsuitval[irowuitval]) {
                                rowuitval = rowsuitval[irowuitval];
                                irowuitval++;
                                result += '<td class="ltr">';
                                result += rowuitval.UITVAL;
                                result += '</td>';
                                result += '<td class="tr">';
                                result += rowuitval.AANTALAFKEUR;
                                result += '</td>';
                                result += '<td class="tr">';
                                result += rowuitval.AANTALREPARATIE;
                                result += '</td>';
                                totafkeur += Number(rowuitval.AANTALAFKEUR);
                                totreparatie += Number(rowuitval.AANTALREPARATIE);
                            }
                            else {
                                result += '<td class="ltr">';
                                result += ' ';
                                result += '</td>';
                                result += '<td class="tr">';
                                result += ' ';
                                result += '</td>';
                                result += '<td class="tr">';
                                result += ' ';
                                result += '</td>';
                            }
                            result += '</tr>';
                        }
                        result += '<td class="ltr">';
                        result += '<b>Totaal:<b>';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += '<b>' + util_1.Util.MakeHHMM(toturen) + '</b>';
                        toturen = 0;
                        result += '</td>';
                        result += '<td>';
                        result += ' ';
                        result += '</td>';
                        result += '<td class="ltr">';
                        result += '<b>Totaal:<b>';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += totafkeur.toFixed(0);
                        result += '</td>';
                        result += '<td class="tr">';
                        result += totreparatie.toFixed(0);
                        result += '</td>';
                        result += '</table>';
                        result += '<br>';
                        result += '<textarea id="opmerking" style="height:10em;width:40em;border: 1px solid;">';
                        result += '</textarea>';
                        result += '<script type="text/javascript">document.getElementById("opmerking").innerHTML = unescape("'
                            + rowbewerking.OPMERKING + '");</script>';
                        irowproduct++;
                        _b.label = 7;
                    case 7:
                        //
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingrap.prototype.doNogtedoen = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, rows, row, where, bewerkingsnummer, _a, gedaan, tedoen, nogtedoen, perc;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = '';
                        where = '';
                        bewerkingsnummer = db_1.default.fix(req.query.bewerkingsnummer || '');
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        //
                        //
                        // Bewerkingaantal uit BEWERKINGFLOW die gereed zijn, tov totaal-bewerkingaantal
                        //
                        sql = "\nselect\nsum(case when einddatumtijd is null then 0 else Bewerkingaantal end) as aantal,\nsum(Bewerkingaantal) as tedoen\nfrom BEWERKINGFLOW";
                        if (bewerkingsnummer != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += " \nbewerkingsnummer = '" + bewerkingsnummer + "'";
                        }
                        sql += " \n" + where;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        gedaan = 0;
                        tedoen = 0;
                        nogtedoen = 0;
                        perc = 0;
                        if (rows[0]) {
                            row = rows[0];
                            gedaan = Number(row.AANTAL);
                            tedoen = Number(row.TEDOEN);
                        }
                        if (tedoen >= gedaan) {
                            if (tedoen != 0) {
                                perc = 100 - (tedoen - gedaan) / tedoen * 100;
                            }
                            nogtedoen = tedoen - gedaan;
                        }
                        else {
                            perc = 100;
                            nogtedoen = 0;
                        }
                        result += '[';
                        result += '\n{"y":'
                            + gedaan.toFixed(0)
                            + ',"tooltip":"'
                            + gedaan.toFixed(0)
                            + '","color":"yellowgreen", "label":"'
                            + this.getPerc(perc)
                            + '% gedaan"}';
                        result += '\n,{"y":'
                            + nogtedoen.toFixed(0)
                            + ',"tooltip":"'
                            + nogtedoen.toFixed(0)
                            + '","color":"tomato", "label":"'
                            + this.getPerc(100 - perc)
                            + '% te doen"}';
                        result += ']';
                        //
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingrap.prototype.doAantaluur = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, rows, row, swfirst, _a, bewerkingsnummer, productnummer, afgesloten, datum, datumvanaf, datumtm, ak2einddatumvanaf, ak2einddatumtm, sqlpartbewerkingen, sqlpartuitval, sqlpartaantal, startstatistiek, irow;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = '';
                        swfirst = 1;
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        bewerkingsnummer = db_1.default.fix(req.query.bewerkingsnummer || '');
                        productnummer = db_1.default.fix(req.query.productnummer || '');
                        afgesloten = db_1.default.fix(req.query.afgesloten || '');
                        datum = db_1.default.fix(req.query.datum || '');
                        datumvanaf = db_1.default.fix(req.query.datumvanaf || '');
                        datumtm = db_1.default.fix(req.query.datumtm || '');
                        ak2einddatumvanaf = db_1.default.fix(req.query.ak2einddatumvanaf || '');
                        ak2einddatumtm = db_1.default.fix(req.query.ak2einddatumtm || '');
                        sqlpartbewerkingen = " \n(select count(distinct bewerkingsoort)\nfrom BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\nand exists (\nselect 1 from BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGSOORT.voortgang = 1\n)\nand exists (\nselect 1 from BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\n))\nas bewerkingen";
                        sqlpartuitval = "\n(select sum(ifnull(uitval,0))\nfrom BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\n)\nas uitval";
                        sqlpartaantal = "\n(select sum(BEWERKINGFLOW.bewerkingaantal)\nfrom BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\nand exists (\nselect 1 from BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGSOORT.voortgang = 1\n)\nand exists (\nselect 1 from BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\n))\nas aantal";
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, 'STARTSTATISTIEK')];
                    case 2:
                        startstatistiek = _b.sent();
                        //
                        // aantal bewerkingen die meedoen, totaal bewerkingaantal die meedoen, totaal aantal minuten
                        //
                        sql = "\nselect round(((aantal / bewerkingen) / uur)) as y,\nBASE2.* from (\nselect\n" + sqlpartbewerkingen + ",\nmin(startdatumtijd) as start,\nbewerkingsnummer,\n" + sqlpartaantal + ",\n(sum(tijd) / 60) as uur\nfrom (\nselect\nBEWERKING.startdatumtijd, BEWERKING.bewerkingsnummer,\nBEWERKINGFLOW.bewerkingsoort, BEWERKINGFLOW.bewerkingaantal as aantalgemaakt,\nBEWERKINGTIJD.tijd\nfrom BEWERKING,BEWERKINGFLOW,BEWERKINGTIJD\nwhere BEWERKING.productnummer = '" + productnummer + "' and BEWERKINGTIJD.tijd > 0\nand BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer\nand BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\nand BEWERKING.startdatumtijd >= screendate2date('" + startstatistiek + "')";
                        if (afgesloten == 'on') {
                            sql += "\nand not isnull(BEWERKING.einddatumtijd)";
                        }
                        if (datum != '') {
                            sql += " \nand date(BEWERKING.startdatumtijd) >= screendate2date('" + datum + "')";
                        }
                        if (datumvanaf != '') {
                            sql += "\nand date(BEWERKING.einddatumtijd) >= screendate2date('" + datumvanaf + "')";
                        }
                        if (datumtm != '') {
                            sql += "\nand date(BEWERKING.einddatumtijd) <= screendate2date('" + datumtm + "')";
                        }
                        if (ak2einddatumvanaf != '') {
                            sql += " \nand (select max(BEWERKINGFLOW.einddatumtijd) \nfrom BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) \n>= screendate2date('" + ak2einddatumvanaf + "')\nand not exists (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nand BEWERKINGFLOW.einddatumtijd is null) ";
                        }
                        if (ak2einddatumtm != '') {
                            sql += "\nand (select max(BEWERKINGFLOW.einddatumtijd) \nfrom BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) <= screendate2date('" + ak2einddatumtm + "')\nand not exists (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nand BEWERKINGFLOW.einddatumtijd is null) ";
                        }
                        sql += "\n) BASE\ngroup by bewerkingsnummer\n) BASE2\norder by start, bewerkingsnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _b.sent();
                        result += '[';
                        swfirst = 1;
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (row.Y == '') {
                                row.Y = '0';
                            }
                            if (swfirst == 1) {
                                swfirst = 0;
                            }
                            else {
                                result += ',';
                            }
                            if (row.BEWERKINGSNUMMER == bewerkingsnummer) {
                                result += '\n{"y":'
                                    + row.Y
                                    + ',"tooltip":"'
                                    + row.Y
                                    + '","color":"tomato"}';
                            }
                            else {
                                result += '\n{"y":'
                                    + row.Y
                                    + ',"tooltip":"'
                                    + row.Y
                                    + '","color":"yellowgreen"}';
                            }
                        }
                        result += ']';
                        //
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingrap.prototype.doUitval = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, rows, row, swfirst, _a, bewerkingsnummer, productnummer, afgesloten, datum, datumvanaf, datumtm, ak2einddatumvanaf, ak2einddatumtm, sqlpartbewerkingen, sqlpartuitval, sqlpartaantal, startstatistiek, irow;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = '';
                        swfirst = 1;
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        bewerkingsnummer = db_1.default.fix(req.query.bewerkingsnummer || '');
                        productnummer = db_1.default.fix(req.query.productnummer || '');
                        afgesloten = db_1.default.fix(req.query.afgesloten || '');
                        datum = db_1.default.fix(req.query.datum || '');
                        datumvanaf = db_1.default.fix(req.query.datumvanaf || '');
                        datumtm = db_1.default.fix(req.query.datumtm || '');
                        ak2einddatumvanaf = db_1.default.fix(req.query.ak2einddatumvanaf || '');
                        ak2einddatumtm = db_1.default.fix(req.query.ak2einddatumtm || '');
                        sqlpartbewerkingen = " \n(select count(distinct bewerkingsoort)\nfrom BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\nand exists (\nselect 1 from BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGSOORT.voortgang = 1\n)\nand exists (\nselect 1 from BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\n))\nas bewerkingen";
                        sqlpartuitval = "\n(select sum(ifnull(uitval,0))\nfrom BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\n)\nas uitval";
                        sqlpartaantal = "\n(select sum(BEWERKINGFLOW.bewerkingaantal)\nfrom BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BASE.bewerkingsnummer\nand exists (\nselect 1 from BEWERKINGSOORT\nwhere BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort\nand BEWERKINGSOORT.voortgang = 1\n)\nand exists (\nselect 1 from BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingflowid = BEWERKINGFLOW.id\n))\nas aantal";
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, 'STARTSTATISTIEK')];
                    case 2:
                        startstatistiek = _b.sent();
                        //
                        // aantal bewerkingen die meedoen, totaal bewerkingenaantal die meedoen, totaal uitval
                        //
                        sql = "\nselect round((uitval * 100 / (aantal / bewerkingen)),2) as y, \nBASE2.* from (\nselect\n" + sqlpartbewerkingen + ",\n" + sqlpartuitval + ",\nmin(startdatumtijd) as start,\nbewerkingsnummer,\n" + sqlpartaantal + ",\n1\nfrom (\nselect startdatumtijd, bewerkingsnummer\nfrom BEWERKING\nwhere productnummer = '" + productnummer + "'\nand BEWERKING.startdatumtijd >= screendate2date('" + startstatistiek + "')";
                        if (afgesloten == 'on') {
                            sql += "\nand not isnull(BEWERKING.einddatumtijd)";
                        }
                        if (datum != '') {
                            sql += " \nand date(BEWERKING.startdatumtijd) >= screendate2date('" + datum + "')";
                        }
                        if (datumvanaf != '') {
                            sql += "\nand date(BEWERKING.einddatumtijd) >= screendate2date('" + datumvanaf + "')";
                        }
                        if (datumtm != '') {
                            sql += "\nand date(BEWERKING.einddatumtijd) <= screendate2date('" + datumtm + "')";
                        }
                        if (ak2einddatumvanaf != '') {
                            sql += " \nand (select max(BEWERKINGFLOW.einddatumtijd) \nfrom BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) \n>= screendate2date('" + ak2einddatumvanaf + "')\nand not exists (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nand BEWERKINGFLOW.einddatumtijd is null) ";
                        }
                        if (ak2einddatumtm != '') {
                            sql += "\nand (select max(BEWERKINGFLOW.einddatumtijd) \nfrom BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) <= screendate2date('" + ak2einddatumtm + "')\nand not exists (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nand BEWERKINGFLOW.einddatumtijd is null) ";
                        }
                        sql += "\n) BASE\ngroup by bewerkingsnummer\n) BASE2\norder by start, bewerkingsnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _b.sent();
                        result += '[';
                        swfirst = 1;
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (row.Y == '') {
                                row.Y = '0';
                            }
                            if (swfirst == 1) {
                                swfirst = 0;
                            }
                            else {
                                result += ',';
                            }
                            if (row.BEWERKINGSNUMMER == bewerkingsnummer) {
                                result += '\n{"y":'
                                    + row.Y
                                    + ',"tooltip":"'
                                    + row.Y
                                    + '","color":"yellow"}';
                            }
                            else {
                                result += '\n{"y":'
                                    + row.Y
                                    + ',"tooltip":"'
                                    + row.Y
                                    + '","color":"lightblue"}';
                            }
                        }
                        result += ']';
                        //
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingrap.prototype.doTijdperbewerking = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, rows, row, tltot, swfirst, perc, _a, bewerkingsnummer, productnummer, afgesloten, datum, datumvanaf, datumtm, ak2einddatumvanaf, ak2einddatumtm, startstatistiek, irow, irow;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = '';
                        sql = '';
                        tltot = 0;
                        swfirst = 1;
                        perc = 0;
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        bewerkingsnummer = db_1.default.fix(req.query.bewerkingsnummer || '');
                        productnummer = db_1.default.fix(req.query.productnummer || '');
                        afgesloten = db_1.default.fix(req.query.afgesloten || '');
                        datum = db_1.default.fix(req.query.datum || '');
                        datumvanaf = db_1.default.fix(req.query.datumvanaf || '');
                        datumtm = db_1.default.fix(req.query.datumtm || '');
                        ak2einddatumvanaf = db_1.default.fix(req.query.ak2einddatumvanaf || '');
                        ak2einddatumtm = db_1.default.fix(req.query.ak2einddatumtm || '');
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, 'STARTSTATISTIEK')];
                    case 2:
                        startstatistiek = _b.sent();
                        //
                        sql = "\nselect min(BEWERKINGSOORT.KLEUR) as kleur,\nmin(BEWERKINGSOORT.NAAM) as BEWERKINGSOORT_OMS,\nsum(TIJD) as Y,\nBEWERKINGTIJD.bewerkingsoort\nfrom BEWERKINGTIJD,BEWERKINGSOORT,BEWERKINGFLOW,BEWERKING\nwhere BEWERKING.bewerkingsnummer = BEWERKINGFLOW.bewerkingsnummer\nand BEWERKINGFLOW.id = BEWERKINGTIJD.bewerkingflowid\nand BEWERKINGSOORT.BEWERKINGSOORT = BEWERKINGFLOW.BEWERKINGSOORT\nand BEWERKING.startdatumtijd >= screendate2date('" + startstatistiek + "')";
                        if (bewerkingsnummer != '') {
                            sql += " \nand BEWERKING.bewerkingsnummer = '" + bewerkingsnummer + "'";
                        }
                        else {
                            if (productnummer != '') {
                                sql += "\nand BEWERKING.productnummer = '" + productnummer + "'";
                            }
                            if (afgesloten == 'on') {
                                sql += "\nand not isnull(BEWERKING.einddatumtijd)";
                            }
                            if (datum != '') {
                                sql += " \nand date(BEWERKING.startdatumtijd) >= screendate2date('" + datum + "')";
                            }
                            if (datumvanaf != '') {
                                sql += "\nand date(BEWERKING.einddatumtijd) >= screendate2date('" + datumvanaf + "')";
                            }
                            if (datumtm != '') {
                                sql += "\nand date(BEWERKING.einddatumtijd) <= screendate2date('" + datumtm + "')";
                            }
                            if (ak2einddatumvanaf != '') {
                                sql += " \nand (select max(BEWERKINGFLOW.einddatumtijd) \nfrom BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) \n>= screendate2date('" + ak2einddatumvanaf + "')\nand not exists (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nand BEWERKINGFLOW.einddatumtijd is null) ";
                            }
                            if (ak2einddatumtm != '') {
                                sql += "\nand (select max(BEWERKINGFLOW.einddatumtijd) \nfrom BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) <= screendate2date('" + ak2einddatumtm + "')\nand not exists (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nand BEWERKINGFLOW.einddatumtijd is null) ";
                            }
                        }
                        sql += "\ngroup by BEWERKINGFLOW.bewerkingsoort\norder by BEWERKINGFLOW.bewerkingsoort";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _b.sent();
                        tltot = 0;
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            tltot += Number(row.Y);
                        }
                        result += '[';
                        swfirst = 1;
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (row.Y == '') {
                                row.Y = '0';
                            }
                            if (swfirst == 1) {
                                swfirst = 0;
                            }
                            else {
                                result += ',';
                            }
                            perc = 0;
                            if (tltot > 0) {
                                perc = Number(row.Y) / tltot * 100;
                            }
                            result += '\n{"y":'
                                + row.Y
                                + ',"tooltip":"'
                                + row.Y
                                + '","color":"'
                                + row.KLEUR
                                + '", "label":"'
                                + row.BEWERKINGSOORT_OMS
                                + ' ('
                                + this.getPerc(perc)
                                + '%) '
                                + '"}';
                        }
                        result += ']';
                        //
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingrap.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action;
            return __generator(this, function (_a) {
                method = req.method;
                action = db_1.default.fix(req.query.action || '');
                //
                logger_1.Logger.test(this.dict.table + ": " + method + ", " + action + " ");
                //
                if (action == "bewerkingrap") {
                    this.doBewerkingrap(req, res, next, this.dict);
                }
                else if (action == "nogtedoen") {
                    this.doNogtedoen(req, res, next, this.dict);
                }
                else if (action == "aantaluur") {
                    this.doAantaluur(req, res, next, this.dict);
                }
                else if (action == "uitval") {
                    this.doUitval(req, res, next, this.dict);
                }
                else if (action == "tijdperbewerking") {
                    this.doTijdperbewerking(req, res, next, this.dict);
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Bewerkingrap;
}(crud_1.Crud));
exports.Bewerkingrap = Bewerkingrap;
//# sourceMappingURL=bewerkingrap.js.map