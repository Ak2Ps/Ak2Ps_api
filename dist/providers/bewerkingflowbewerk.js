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
var config_1 = require("../config");
//
var bewerkingflowperformance_1 = require("./bewerkingflowperformance");
//
var dict = {
    table: "bewerkingflowperformance",
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
var Bewerkingflowbewerk = /** @class */ (function (_super) {
    __extends(Bewerkingflowbewerk, _super);
    function Bewerkingflowbewerk() {
        return _super.call(this, dict) || this;
    }
    Bewerkingflowbewerk.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var bewerkingsnummer, productnummer, id, result, rows, row, sql, sqlbewerking, rowsbewerking, rowbewerking, sqlproduct, rowsproduct, rowproduct, sqlproductlijn, rowsproductlijn, rowproductlijn, sqltijd, rowstijd, rowtijd, irowtijd, sqluitval, rowsuitval, rowuitval, _a, totAfkeur, totReparatie, irowuitval, rowtijd_1, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        bewerkingsnummer = '';
                        productnummer = '';
                        id = db_1.default.fix(req.query.id || '');
                        result = '';
                        rowproduct = {};
                        rowproductlijn = {};
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _c.sent();
                        //
                        sql = "\nselect BEWERKINGFLOW.*,\ndate2screendate(startdatumtijd) as STARTDATUM,\ndate2screendate(plandatumtijd) as PLANDATUM,\ndate2screendate(einddatumtijd) as EINDDATUM,\ndate2screendate(tekeningdatumtijd) as TEKENINGDATUM,\ncase when uitval = 0 then null else uitval end as uitval_oms,\n(select naam \nfrom BEWERKINGSOORT \nwhere BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort) \nas NAAM\nfrom BEWERKINGFLOW\nwhere id = '" + id + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _c.sent();
                        if (!rows[0]) return [3 /*break*/, 9];
                        row = rows[0];
                        bewerkingsnummer = row.BEWERKINGSNUMMER;
                        sqlbewerking = "\nselect * \nfrom BEWERKING \nwhere bewerkingsnummer = '" + row.BEWERKINGSNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlbewerking)];
                    case 3:
                        rowsbewerking = _c.sent();
                        if (!rowsbewerking[0]) return [3 /*break*/, 9];
                        rowbewerking = rowsbewerking[0];
                        sqlproduct = "\nselect * \nfrom PRODUCT \nwhere productnummer = '" + rowbewerking.PRODUCTNUMMER + "'";
                        productnummer = rowbewerking.PRODUCTNUMMER;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproduct)];
                    case 4:
                        rowsproduct = _c.sent();
                        if (rowsproduct[0]) {
                            rowproduct = rowsproduct[0];
                        }
                        else {
                            rowproduct.PRODUCTNUMMER = rowbewerking.PRODUCTNUMMER;
                            rowproduct.PRODUCTNAAM = '?????';
                        }
                        sqlproductlijn = "\nselect * \nfrom PRODUCTLIJN \nwhere productlijn = '" + rowproduct.LIJN + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproductlijn)];
                    case 5:
                        rowsproductlijn = _c.sent();
                        if (rowsproductlijn[0]) {
                            rowproductlijn = rowsproductlijn[0];
                        }
                        else {
                            rowproductlijn.PRODUCTLIJN = rowproduct.LIJN;
                            rowproductlijn.PRODUCTIELIJN = '';
                        }
                        result += '<table  class="t">';
                        result += '<tr><td  rowspan="99" id="b_barcode" style="width:400px;"></td></tr>\n';
                        result += '<tr><td></td><td style="width:1em">&nbsp;</td><td class="lth" style="width:10em">Volgens tekening</td><td class="th" style="width:10em;font-weight:normal;"><b>Nr:</b>&nbsp;'
                            + row.TEKENINGNUMMER
                            + '</td></tr>\n';
                        result += '<tr><td></td><td></td><td class="ltr"><b>Revisie:&nbsp;</b>'
                            + row.TEKENINGREVISIE
                            + '</td><td class="tr"><b>Datum:&nbsp;</b>'
                            + row.TEKENINGDATUM
                            + '</td></tr>\n';
                        result += '</table>';
                        result += '<script>document.getElementById("b_barcode").innerHTML = draw39("B'
                            + config_1.Config.app + '-' + row.BEWERKINGSNUMMER + '-' + row.VOLGNUMMER + '",1,1);</script>';
                        result += '<table class="t" style="margin 5px 0px 0px 0px">';
                        result += '<tr>';
                        result += '<td class="lth">';
                        result += 'Productienummer';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Volgnummer';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Product';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Naam';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Lijn';
                        result += '</td>';
                        result += "</tr>\n";
                        result += '<tr>';
                        result += '<td class="ltr">';
                        result += row.BEWERKINGSNUMMER;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += row.VOLGNUMMER;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowproduct.PRODUCTNUMMER;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowproduct.PRODUCTNAAM;
                        result += '</td>';
                        result += '<td class="tr">';
                        if (rowbewerking.LIJN != '') {
                            result += rowbewerking.LIJN;
                        }
                        else if (rowproductlijn.PRODUCTIELIJN != '') {
                            result += rowproductlijn.PRODUCTIELIJN;
                        }
                        else {
                            result += rowproduct.LIJN;
                        }
                        result += '</td>';
                        result += "</tr>\n";
                        result += '</table>';
                        result += '<table class="t" style="margin 5px 0px 0px 0px">';
                        result += '<tr>';
                        result += '<td class="lth">';
                        result += 'Bewerking';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Te bewerken';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Start Bewerking';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Gereed bewerking';
                        result += '</td>';
                        result += "</tr>\n";
                        result += '<tr>';
                        result += '<td class="ltr">';
                        result += row.NAAM;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += row.BEWERKINGAANTAL;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += row.STARTDATUM + '&nbsp;';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += row.PLANDATUM;
                        result += '</td>';
                        result += "</tr>\n";
                        result += '</table>';
                        result += '<table class="t" style="margin 5px 0px 0px 0px">';
                        result += '<tr>';
                        result += '<td class="lth">';
                        result += 'Bewerkt';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Uitval';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Aantal Goed';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Datum gereed';
                        result += '</td>';
                        result += "</tr>\n";
                        result += '<tr>';
                        result += '<td class="ltr">';
                        result += '&nbsp;';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += row.UITVAL_OMS;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += '&nbsp;';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += row.EINDDATUM;
                        result += '</td>';
                        result += "</tr>\n";
                        result += '</table>';
                        result += '<table class="t" style="margin 5px 0px 0px 0px">';
                        result += '<tr>';
                        result += '<td class="lth">';
                        result += 'Medewerker';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Datum';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Starttijd';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Eindtijd';
                        result += '</td>';
                        result += '<td class="th">';
                        result += ' v ';
                        result += '</td>';
                        result += '<td style="width:10px">';
                        result += ' ';
                        result += '</td>';
                        result += '<td class="lth">';
                        result += 'Uitval';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Afkeur';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Reparatie';
                        result += '</td>';
                        result += "</tr>\n";
                        sqltijd = "\nselect BEWERKINGTIJD.*,\n(select min(naam) from GEBRUIKER where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) as gebruiker,\ndate2screendate(startdatumtijd) as DATUM,\ndate2screentime(startdatumtijd) as START,\ndate2screentime(einddatumtijd) as EIND\nfrom BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingflowid = '" + row.ID + "'\norder by startdatumtijd,id";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqltijd)];
                    case 6:
                        rowstijd = _c.sent();
                        irowtijd = 0;
                        sqluitval = "\ninsert into BEWERKINGUITVAL \n(bewerkingsnummer,bewerkingflowid, productnummer, uitval)\nselect \n'" + row.BEWERKINGSNUMMER + "',\n'" + row.ID + "',\n'" + rowproduct.PRODUCTNUMMER + "',\nuitval\nfrom UITVAL\nwhere not exists \n(select 1 from BEWERKINGUITVAL \nwhere BEWERKINGUITVAL.uitval = UITVAL.UITVAL\nand bewerkingflowid = '" + row.ID + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqluitval)];
                    case 7:
                        _c.sent();
                        sqluitval = "\nselect\ncase when AantalReparatie = 0 then null else AantalReparatie end as AantalReparatie,\ncase when AantalAfkeur = 0 then null else AantalAfkeur end as AantalAfkeur,\n(select min(concat(uitval,' ',naam)) from UITVAL where UITVAL.UITVAL = BEWERKINGUITVAL.uitval) as uitval\nfrom BEWERKINGUITVAL\nwhere BEWERKINGUITVAL.bewerkingflowid = '" + row.ID + "'\norder by Bewerkingsnummer,uitval";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqluitval)];
                    case 8:
                        rowsuitval = _c.sent();
                        totAfkeur = 0;
                        totReparatie = 0;
                        for (irowuitval = 0; irowuitval < rowsuitval.length; irowuitval++) {
                            rowuitval = rowsuitval[irowuitval];
                            result += '<tr>';
                            if (rowstijd[irowtijd]) {
                                rowtijd = rowstijd[irowtijd];
                                result += '<td class="ltrnaam" style="width:10em">';
                                result += rowtijd.GEBRUIKER;
                                result += '</td>';
                                result += '<td class="tr">';
                                result += rowtijd.DATUM;
                                result += '</td>';
                                result += '<td class="tr">';
                                result += rowtijd.START;
                                result += '</td>';
                                result += '<td class="tr">';
                                result += rowtijd.EIND;
                                result += '</td>';
                                result += '<td class="tr">';
                                result += ' v ';
                                result += '</td>';
                                irowtijd++;
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
                                result += '<td class="tr">';
                                result += ' ';
                                result += '</td>';
                                result += '<td class="tr">';
                                result += ' ';
                                result += '</td>';
                            }
                            result += '<td>';
                            result += ' ';
                            result += '</td>';
                            result += '<td class="ltrnaam">';
                            result += rowuitval.UITVAL;
                            result += '</td>';
                            result += '<td class="tr">';
                            result += rowuitval.AANTALAFKEUR;
                            totAfkeur = totAfkeur + Number(rowuitval.AANTALAFKEUR);
                            result += '</td>';
                            result += '<td class="tr">';
                            result += rowuitval.AANTALREPARATIE;
                            totReparatie = totReparatie + Number(rowuitval.AANTALREPARATIE);
                            result += '</td>';
                            result += "</tr>\n";
                        }
                        if (rowstijd[irowtijd]) {
                            rowtijd_1 = rowstijd[irowtijd];
                            result += '<td class="ltr" style="width:10em">';
                            result += rowtijd_1.GEBRUIKER;
                            result += '</td>';
                            result += '<td class="tr">';
                            result += rowtijd_1.DATUM;
                            result += '</td>';
                            result += '<td class="tr">';
                            result += rowtijd_1.START;
                            result += '</td>';
                            result += '<td class="tr">';
                            result += rowtijd_1.EIND;
                            result += '</td>';
                            result += '<td class="tr">';
                            result += ' v ';
                            result += '</td>';
                            irowtijd++;
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
                            result += '<td class="tr">';
                            result += ' ';
                            result += '</td>';
                            result += '<td class="tr">';
                            result += ' ';
                            result += '</td>';
                        }
                        result += '<td>';
                        result += ' ';
                        result += '</td>';
                        result += '<td class="ltr">';
                        result += 'Totaal:';
                        result += '</td>';
                        result += '<td class="tr">';
                        if (totAfkeur != 0) {
                            result += String(totAfkeur);
                        }
                        result += '</td>';
                        result += '<td class="tr">';
                        if (totReparatie != 0) {
                            result += String(totReparatie);
                        }
                        result += '</td>';
                        result += "</tr>\n";
                        result += '</table>';
                        result += '<table class="t" style="margin 5px 0px 0px 0px">';
                        result += '<tr>';
                        result += '<td rowspan=99>';
                        result += '<textarea id="opmerking" style="height:10em;width:30em;border: 1px solid;" readonly=readonly>';
                        result += '</textarea>';
                        result += '<script type="text/javascript">document.getElementById("opmerking").innerHTML = unescape("' + rowbewerking.OPMERKING + '");</script>';
                        result += '</td>';
                        result += '<td rowspan=99 style="width:3em"></td>';
                        result += "</tr>\n";
                        result += '<tr>';
                        result += '<td class="lth">Magazijn voorraad:';
                        result += '</td>';
                        result += '<td class="lth" style="width:5em">&nbsp;</td>';
                        result += "</tr>\n";
                        result += '<tr>';
                        result += '<td class="lth">Totaal goed uit productie:';
                        result += '</td>';
                        result += '<td class="lth" style="width:5em">&nbsp;</td>';
                        result += "</tr>\n";
                        result += '<tr>';
                        result += '<td class="lth">Totaal goed uit productie:';
                        result += '</td>';
                        result += '<td class="lth" style="width:5em">&nbsp;</td>';
                        result += "</tr>\n";
                        result += '<tr>';
                        result += '<td>&nbsp;</td>';
                        result += "</tr>\n";
                        result += '<tr>';
                        result += '<td class="lth">Nieuwe voorraad:';
                        result += '</td>';
                        result += '<td class="lth" style="width:5em">&nbsp;</td>';
                        result += "</tr>\n";
                        result += '</table>';
                        _c.label = 9;
                    case 9:
                        _b = result;
                        return [4 /*yield*/, bewerkingflowperformance_1.Bewerkingflowperformance.print(req, res, next, bewerkingsnummer, productnummer)];
                    case 10:
                        result = _b + _c.sent();
                        //
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingflowbewerk.prototype.routes = function (req, res, next) {
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
    return Bewerkingflowbewerk;
}(crud_1.Crud));
exports.Bewerkingflowbewerk = Bewerkingflowbewerk;
//# sourceMappingURL=bewerkingflowbewerk.js.map