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
exports.Bewerkingflowpick = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var config_1 = require("../config");
//
var dict = {
    table: "bewerkingflowpick",
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
var Bewerkingflowpick = /** @class */ (function (_super) {
    __extends(Bewerkingflowpick, _super);
    function Bewerkingflowpick() {
        return _super.call(this, dict) || this;
    }
    Bewerkingflowpick.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var bewerkingsnummer, productnummer, id, result, rows, row, sql, sqlonderdeel, rowsonderdeel, rowonderdeel, faktor, sqlonderdeel1, rowsonderdeel1, rowonderdeel1, faktor1, sqlonderdeel2, rowsonderdeel2, rowonderdeel2, faktor2, sqlonderdeel3, rowsonderdeel3, rowonderdeel3, faktor3, sqlonderdeel4, rowsonderdeel4, rowonderdeel4, faktor4, sqlonderdeel5, rowsonderdeel5, rowonderdeel5, faktor5, sqlonderdeel6, rowsonderdeel6, rowonderdeel6, faktor6, sqlonderdeel99, rowsonderdeel99, rowonderdeel99, sqlbewerking, rowsbewerking, rowbewerking, sqlproduct, rowsproduct, rowproduct, sqlproductlijn, rowsproductlijn, rowproductlijn, sqltijd, rowstijd, rowtijd, irowtijd, sqluitval, rowsuitval, rowuitval, tlregels, _a, irowonderdeel, irowonderdeel1, irowonderdeel2, irowonderdeel3, irowonderdeel4, irowonderdeel5, irowonderdeel99;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bewerkingsnummer = '';
                        productnummer = '';
                        id = db_1.default.fix(req.query.id || '');
                        result = '';
                        rowproduct = {};
                        rowproductlijn = {};
                        tlregels = 0;
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        //
                        sql = "\nselect BEWERKINGFLOW.*,\ndate2screendate(startdatumtijd) as STARTDATUM,\ndate2screendate(plandatumtijd) as PLANDATUM,\ndate2screendate(einddatumtijd) as EINDDATUM,\ncase when uitval = 0 then null else uitval end as uitval_oms,\n(select naam from BEWERKINGSOORT \nwhere BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort)\nas NAAM\nfrom BEWERKINGFLOW\nwhere id = '" + id + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        if (!rows[0]) return [3 /*break*/, 26];
                        row = rows[0];
                        sqlbewerking = "\nselect * \nfrom BEWERKING \nwhere bewerkingsnummer = '" + row.BEWERKINGSNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlbewerking)];
                    case 3:
                        rowsbewerking = _b.sent();
                        if (!rowsbewerking[0]) return [3 /*break*/, 26];
                        rowbewerking = rowsbewerking[0];
                        sqlproduct = "\nselect * \nfrom PRODUCT\nwhere productnummer = '" + rowbewerking.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproduct)];
                    case 4:
                        rowsproduct = _b.sent();
                        if (rowsproduct[0]) {
                            rowproduct = rowsproduct[0];
                        }
                        else {
                            rowproduct = {};
                            rowproduct.PRODUCTNUMMER = rowbewerking.PRODUCTNUMMER;
                            rowproduct.PRODUCTNAAM = '?????';
                        }
                        result += '<table><tr>';
                        result += '<td id="b_barcode" style="width:400px;"></td>';
                        result += '</tr>\n</table><br>';
                        result += '<script>document.getElementById("b_barcode").innerHTML = draw39("B'
                            + config_1.Config.app + '-'
                            + row.BEWERKINGSNUMMER + '-'
                            + row.VOLGNUMMER + '",1,1);</script>';
                        result += '<table class="t">';
                        result += '<tr>';
                        result += '<td class="lth">';
                        result += 'Productienummer';
                        result += '</td>';
                        result += '<td class="lth">';
                        result += 'Volgnummer';
                        result += '</td>';
                        result += '<td class="lth">';
                        result += 'Product';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Naam';
                        result += '</td>';
                        result += '</tr>\n';
                        result += '<tr>';
                        result += '<td class="ltr">';
                        result += row.BEWERKINGSNUMMER;
                        result += '</td>';
                        result += '<td class="ltr">';
                        result += row.VOLGNUMMER;
                        result += '</td>';
                        result += '<td class="ltr">';
                        result += rowproduct.PRODUCTNUMMER;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowproduct.PRODUCTNAAM;
                        result += '</td>';
                        result += '</tr>\n';
                        result += '</table>';
                        result += '<br>';
                        result += '<table class="t">';
                        result += '<tr>';
                        result += '<td class="lth">';
                        result += 'Bewerking';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Te bewerken';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Start<br>Bewerking';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Gereed<br>Bewerking';
                        result += '</td>';
                        result += '<td style="width:1em">&nbsp;</td>';
                        result += '<td class="lth">';
                        result += 'Aantal Bewerkt';
                        result += '</td>';
                        result += '</tr>\n';
                        result += '<tr>';
                        result += '<td class="ltrnaam">';
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
                        result += '<td style="width:1em">&nbsp;</td>';
                        result += '<td class="ltr">';
                        result += '';
                        result += '</td>';
                        result += '</tr>\n';
                        result += '</table>';
                        result += '<br>';
                        result += '<table class="t">';
                        result += '<tr>';
                        result += '<td class="lth">';
                        result += 'Onderdeel';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Naam';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Locatie';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Factor';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Nodig';
                        result += '</td>';
                        result += '<td class="lth">';
                        result += 'Gepicked';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Restant';
                        result += '</td>';
                        result += '<td class="th">';
                        result += 'Verschil';
                        result += '</td>';
                        result += '</tr>\n';
                        // Level 0
                        sqlonderdeel = "\nselect * from ONDERDEEL,PRODUCT\nwhere ONDERDEEL.productnummer = '" + rowproduct.PRODUCTNUMMER + "'\nand ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer\nand ONDERDEEL.onderdeelnummer = PRODUCT.productnummer\norder by ONDERDEEL.onderdeelnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlonderdeel)];
                    case 5:
                        rowsonderdeel = _b.sent();
                        irowonderdeel = 0;
                        _b.label = 6;
                    case 6:
                        if (!(irowonderdeel < rowsonderdeel.length)) return [3 /*break*/, 24];
                        rowonderdeel = rowsonderdeel[irowonderdeel];
                        faktor = Number(rowonderdeel.FAKTOR).toFixed(7);
                        result += '<tr>';
                        result += '<td class="ltr">';
                        result += rowonderdeel.PRODUCTNUMMER;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowonderdeel.PRODUCTNAAM;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += rowonderdeel.LOCATIE;
                        result += '</td>';
                        result += '<td class="tr">';
                        result += Number(faktor);
                        result += '</td>';
                        result += '<td class="tr">';
                        result += (Number(faktor) * Number(row.BEWERKINGAANTAL)).toFixed(0);
                        result += '</td>';
                        result += '<td class="tr">';
                        result += '&nbsp;';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += '&nbsp;';
                        result += '</td>';
                        result += '<td class="tr">';
                        result += '&nbsp;';
                        result += '</td>';
                        result += '</tr>\n';
                        //Level 1
                        sqlonderdeel1 = "\n                        select * \nfrom ONDERDEEL,PRODUCT\nwhere ONDERDEEL.productnummer = '" + rowonderdeel.PRODUCTNUMMER + "'\nand ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer\nand ONDERDEEL.onderdeelnummer = PRODUCT.productnummer\norder by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlonderdeel1)];
                    case 7:
                        rowsonderdeel1 = _b.sent();
                        irowonderdeel1 = 0;
                        _b.label = 8;
                    case 8:
                        if (!(irowonderdeel1 < rowsonderdeel1.length)) return [3 /*break*/, 23];
                        rowonderdeel1 = rowsonderdeel1[irowonderdeel1];
                        faktor1 = (Number(rowonderdeel1.FAKTOR) * Number(faktor)).toFixed(7);
                        // Level2
                        sqlonderdeel2 = "\nselect * \nfrom ONDERDEEL,PRODUCT\nwhere ONDERDEEL.productnummer = '" + rowonderdeel1.PRODUCTNUMMER + "'\nand ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer\nand ONDERDEEL.onderdeelnummer = PRODUCT.productnummer\norder by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlonderdeel2)];
                    case 9:
                        rowsonderdeel2 = _b.sent();
                        irowonderdeel2 = 0;
                        _b.label = 10;
                    case 10:
                        if (!(irowonderdeel2 < rowsonderdeel2.length)) return [3 /*break*/, 22];
                        rowonderdeel2 = rowsonderdeel2[irowonderdeel2];
                        faktor2 = (Number(rowonderdeel2.FAKTOR) * Number(faktor1)).toFixed(7);
                        // Level 3
                        sqlonderdeel3 = "\nselect * \nfrom ONDERDEEL,PRODUCT\nwhere ONDERDEEL.productnummer = '" + rowonderdeel2.PRODUCTNUMMER + "'\nand ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer\nand ONDERDEEL.onderdeelnummer = PRODUCT.productnummer\norder by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlonderdeel3)];
                    case 11:
                        rowsonderdeel3 = _b.sent();
                        irowonderdeel3 = 0;
                        _b.label = 12;
                    case 12:
                        if (!(irowonderdeel3 < rowsonderdeel3.length)) return [3 /*break*/, 21];
                        rowonderdeel3 = rowsonderdeel3[irowonderdeel3];
                        faktor3 = (Number(rowonderdeel3.FAKTOR) * Number(faktor2)).toFixed(7);
                        // Level 4
                        sqlonderdeel4 = "\nselect * \nfrom ONDERDEEL,PRODUCT\nwhere ONDERDEEL.productnummer = '" + rowonderdeel3.PRODUCTNUMMER + "'\nand ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer\nand ONDERDEEL.onderdeelnummer = PRODUCT.productnummer\norder by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlonderdeel4)];
                    case 13:
                        rowsonderdeel4 = _b.sent();
                        irowonderdeel4 = 0;
                        _b.label = 14;
                    case 14:
                        if (!(irowonderdeel4 < rowsonderdeel4.length)) return [3 /*break*/, 20];
                        rowonderdeel4 = rowsonderdeel4[irowonderdeel4];
                        faktor4 = (Number(rowonderdeel4.FAKTOR) * Number(faktor3)).toFixed(7);
                        // Level 5
                        sqlonderdeel5 = "\nselect * \nfrom ONDERDEEL,PRODUCT\nwhere ONDERDEEL.productnummer = '" + rowonderdeel4.PRODUCTNUMMER + "'\nand ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer\nand ONDERDEEL.onderdeelnummer = PRODUCT.productnummer\norder by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlonderdeel5)];
                    case 15:
                        rowsonderdeel5 = _b.sent();
                        irowonderdeel5 = 0;
                        _b.label = 16;
                    case 16:
                        if (!(irowonderdeel5 < rowsonderdeel5.length)) return [3 /*break*/, 19];
                        rowonderdeel5 = rowsonderdeel5[irowonderdeel5];
                        faktor5 = (Number(rowonderdeel5.FAKTOR) * Number(faktor4)).toFixed(7);
                        // Level 99
                        sqlonderdeel99 = "\nselect * \nfrom ONDERDEEL,PRODUCT\nwhere ONDERDEEL.productnummer = '" + rowonderdeel5.PRODUCTNUMMER + "'\nand ONDERDEEL.onderdeelnummer != ONDERDEEL.productnummer\nand ONDERDEEL.onderdeelnummer = PRODUCT.productnummer\norder by ONDERDEEL.faktor desc, ONDERDEEL.onderdeelnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlonderdeel99)];
                    case 17:
                        rowsonderdeel99 = _b.sent();
                        for (irowonderdeel99 = 0; irowonderdeel99 < rowsonderdeel99.length; irowonderdeel99++) {
                            rowonderdeel99 = rowsonderdeel99[irowonderdeel99];
                            result += '<tr>';
                            result += '<td class="ltr">';
                            result += 'Onderdeel in onderdeel probleem';
                            result += '</td>';
                            result += '<td class="tr">';
                            result += '????';
                            result += '</td>';
                            result += '<td class="tr">';
                            result += '????';
                            result += '</td>';
                            result += '<td class="tr">';
                            result += '????';
                            result += '</td>';
                            result += '<td class="tr">';
                            result += '????';
                            result += '</td>';
                            result += '</tr>\n';
                        }
                        _b.label = 18;
                    case 18:
                        irowonderdeel5++;
                        return [3 /*break*/, 16];
                    case 19:
                        irowonderdeel4++;
                        return [3 /*break*/, 14];
                    case 20:
                        irowonderdeel3++;
                        return [3 /*break*/, 12];
                    case 21:
                        irowonderdeel2++;
                        return [3 /*break*/, 10];
                    case 22:
                        irowonderdeel1++;
                        return [3 /*break*/, 8];
                    case 23:
                        irowonderdeel++;
                        return [3 /*break*/, 6];
                    case 24:
                        result += '</table>';
                        result += '<br>';
                        result += '<table class="t">';
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
                        result += '</tr>\n';
                        sqltijd = "\nselect BEWERKINGTIJD.*,\n(select min(naam) from GEBRUIKER where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) as gebruiker,\ndate2screendate(startdatumtijd) as DATUM,\ndate2screentime(startdatumtijd) as START,\ndate2screentime(einddatumtijd) as EIND\nfrom BEWERKINGTIJD\nwhere BEWERKINGTIJD.bewerkingflowid = '" + row.ID + "'\norder by startdatumtijd,id";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqltijd)];
                    case 25:
                        rowstijd = _b.sent();
                        tlregels = 0;
                        while (tlregels < 8) {
                            tlregels = tlregels + 1;
                            result += '<tr>';
                            if (rowstijd[tlregels - 1]) {
                                rowtijd = rowstijd[tlregels - 1];
                                result += '<td class="ltr" style="width:10em">';
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
                                result += 'v';
                                result += '</td>';
                            }
                            else {
                                result += '<td class="ltr">';
                                result += '.';
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
                            result += '</tr>\n';
                        }
                        result += '</table>';
                        result += '<br>';
                        result += '<textarea id="opmerking" style="height:10em;width:40em;border: 1px solid;" readonly=readonly>';
                        result += '</textarea>';
                        result += '<script type="text/javascript">document.getElementById("opmerking").innerHTML = unescape("'
                            + rowbewerking.OPMERKING + '");</script>';
                        _b.label = 26;
                    case 26:
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingflowpick.prototype.routes = function (req, res, next) {
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
    return Bewerkingflowpick;
}(crud_1.Crud));
exports.Bewerkingflowpick = Bewerkingflowpick;
//# sourceMappingURL=bewerkingflowpick.js.map