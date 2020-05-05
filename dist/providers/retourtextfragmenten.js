"use strict";
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var fs = __importStar(require("fs"));
var config_1 = require("../config");
//
var Retourtextfragmenten = /** @class */ (function () {
    function Retourtextfragmenten() {
    }
    Retourtextfragmenten.getBarcode = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = '';
                result = "<div id=\"pageheader\" style=\"display:none\">\n<div style=\"height:" + em + ";\">&nbsp;</div>\n<div style=\"height:6em\">\n<table><tr>\n<td id=\"b_barcode\" style=\"width:400px;\"></td>\n</tr></table><br>\n</div>\n</div>";
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getHeader = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = '';
                result = "<div style=\"height:" + em + "\">\n<table class=\"t\">\n<tr>\n<td>&nbsp;</td>\n</tr>\n</table>\n</div>";
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getKlantHeader = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ("<div style=\"height:" + em + ";\">");
                result += ("<table class=\"t\">");
                // Datum
                result += ("<tr>");
                result += ("<td class=\"leftmargin\">&nbsp;</td>");
                if (res.crudData.taal == 'nl') {
                    value = "Datum:";
                }
                else {
                    value = "Date:";
                }
                result += ("<td class=\"leftlabel\">" + value + "</td>");
                result += ("<td>");
                result += (res.crudData.row.STARTDATUM);
                result += ("</td>");
                result += ("</tr>");
                // Onze referentie
                result += ("<tr>");
                result += ("<td class=\"leftmargin\">&nbsp;</td>");
                if (res.crudData.taal == 'nl') {
                    value = "Onze referentie";
                }
                else {
                    value = "Our reference:";
                }
                result += ("<td class=\"leftlabel\">" + value + "</td>");
                result += ("<td>");
                result += (res.crudData.row.REFERENTIE);
                result += ("</td>");
                result += ("</tr>");
                // Uw referentie
                result += ("<tr>");
                result += ("<td class=\"leftmargin\">&nbsp;</td>");
                if (res.crudData.taal == 'nl') {
                    value = "Uw referentie";
                }
                else {
                    value = "Your reference:";
                }
                result += ("<td class=\"leftlabel\">" + value + "</td>");
                result += ("<td>");
                result += (res.crudData.row.KLANTREFERENTIE);
                result += ("</td>");
                result += ("</tr>");
                // Spatieregel
                result += ("<tr>");
                result += ("<td>&nbsp;</td>");
                result += ("</tr>");
                // Aan
                result += ("<tr>");
                result += ("<td class=\"leftmargin\">&nbsp;</td>");
                if (res.crudData.taal == 'nl') {
                    value = "Aan:";
                }
                else {
                    value = "To:";
                }
                result += ("<td class=\"leftlabel\">" + value + "</td>");
                result += ("<td>");
                if (String(res.crudData.rowklant.AFLEVERNAAM).trim() != '') {
                    result += (res.crudData.rowklant.AFLEVERNAAM);
                }
                else {
                    result += (res.crudData.rowklant.NAAM);
                }
                result += ("</td>");
                result += ("</tr>");
                // tav
                result += ("<tr>");
                result += ("<td class=\"leftmargin\">&nbsp;</td>");
                if (res.crudData.taal == 'nl') {
                    value = "T.a.v.:";
                }
                else {
                    value = "Attn.:";
                }
                result += ("<td class=\"leftlabel\">" + value + "</td>");
                result += ("<td>");
                result += (res.crudData.rowklant.CONTACT);
                result += ("</td>");
                result += ("</tr>");
                // email
                result += ("<tr>");
                result += ("<td class=\"leftmargin\">&nbsp;</td>");
                if (res.crudData.taal == 'nl') {
                    value = "Email:";
                }
                else {
                    value = "Email.:";
                }
                result += ("<td class=\"leftlabel\">" + value + "</td>");
                result += ("<td>");
                if (String(res.crudData.rowklant.AFLEVERNAAM).trim() != '') {
                    result += (res.crudData.rowklant.AFLEVEREMAIL);
                }
                else {
                    result += (res.crudData.rowklant.EMAIL);
                }
                result += ("</td>");
                result += ("</tr>");
                // Spatieregel
                result += ("<tr>");
                result += ("<td>&nbsp;</td>");
                result += ("</tr>");
                // Straat + nummer
                result += ("<tr>");
                result += ("<td class=\"leftmargin\">&nbsp;</td>");
                if (res.crudData.taal == 'nl') {
                    value = "Afleveradres:";
                }
                else {
                    value = "Shipping address:";
                }
                result += ("<td class=\"leftlabel\">" + value + "</td>");
                result += ("<td>");
                if (String(res.crudData.rowklant.AFLEVERNAAM).trim() != '') {
                    result += (res.crudData.rowklant.AFLEVERADRES);
                }
                else {
                    result += (res.crudData.rowklant.ADRES);
                }
                result += ("</td>");
                result += ("</tr>");
                // Postkode Woonplaats land
                result += ("<tr>");
                result += ("<td></td>");
                result += ("<td></td>");
                if (String(res.crudData.rowklant.AFLEVERNAAM).trim() != '') {
                    result += ("<td>");
                    if (res.crudData.rowklant.AFLEVERPOSTCODE != '') {
                        result += (res.crudData.rowklant.AFLEVERPOSTCODE);
                        result += ("&nbsp;");
                    }
                    result += (res.crudData.rowklant.AFLEVERWOONPLAATS);
                    result += ("&nbsp;");
                    result += ("</td>");
                    if (res.crudData.rowklant.AFLEVERLAND != '') {
                        result += ("<td>");
                        result += (res.crudData.rowklant.AFLEVERLAND);
                        result += ("</td>");
                    }
                }
                else {
                    result += ("<td>");
                    if (res.crudData.rowklant.POSTCODE != '') {
                        result += (res.crudData.rowklant.POSTCODE);
                        result += ("&nbsp;");
                    }
                    result += (res.crudData.rowklant.WOONPLAATS);
                    result += ("&nbsp;");
                    result += ("</td>");
                    if (res.crudData.rowklant.LAND != '') {
                        result += ("<td>");
                        result += (res.crudData.rowklant.LAND);
                        result += ("</td>");
                    }
                }
                result += ("</tr>");
                result += ("</table>");
                result += ("</div>");
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getKlantHeaderVerzend = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ('<div style="height:' + em + ';">');
                result += ('<table class="t">');
                // Aan
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Aan:";
                }
                else {
                    value = "To:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                if (res.crudData.rowklant.AFLEVERNAAM.trim() != '') {
                    result += (res.crudData.rowklant.AFLEVERNAAM);
                }
                else {
                    result += (res.crudData.rowklant.NAAM);
                }
                result += ('</td>');
                result += ('<td>');
                if (res.crudData.rowklant.AFLEVERDPDNUMMER.trim() != '') {
                    result += (res.crudData.rowklant.AFLEVERDPDNUMMER);
                }
                else {
                    result += ("&nbsp;");
                }
                result += ('</td>');
                result += ('</tr>');
                // tav
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "T.a.v.:";
                }
                else {
                    value = "Attn.:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.rowklant.CONTACT);
                result += ('</td>');
                result += ('</tr>');
                // email
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Email:";
                }
                else {
                    value = "Email.:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                if (res.crudData.rowklant.AFLEVERNAAM.trim() != '') {
                    result += (res.crudData.rowklant.AFLEVEREMAIL);
                }
                else {
                    result += (res.crudData.rowklant.EMAIL);
                }
                result += ('</td>');
                result += ('</tr>');
                // Straat + nummer
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Afleveradres:";
                }
                else {
                    value = "Shipping address:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                if (res.crudData.rowklant.AFLEVERNAAM.trim() != '') {
                    result += (res.crudData.rowklant.AFLEVERADRES);
                }
                else {
                    result += (res.crudData.rowklant.ADRES);
                }
                result += ('</td>');
                result += ('</tr>');
                // Postkode Woonplaats land
                result += ('<tr>');
                result += ('<td></td>');
                result += ('<td></td>');
                if (res.crudData.rowklant.AFLEVERNAAM.trim() != '') {
                    result += ('<td>');
                    if (res.crudData.rowklant.AFLEVERPOSTCODE != '') {
                        result += (res.crudData.rowklant.AFLEVERPOSTCODE);
                        result += ('&nbsp;');
                    }
                    result += (res.crudData.rowklant.AFLEVERWOONPLAATS);
                    result += ('&nbsp;');
                    result += ('</td>');
                    if (res.crudData.rowklant.AFLEVERLAND != '') {
                        result += ('<td>');
                        result += (res.crudData.rowklant.AFLEVERLAND);
                        result += ('</td>');
                    }
                }
                else {
                    result += ('<td>');
                    if (res.crudData.rowklant.POSTCODE != '') {
                        result += (res.crudData.rowklant.POSTCODE);
                        result += ('&nbsp;');
                    }
                    result += (res.crudData.rowklant.WOONPLAATS);
                    result += ('&nbsp;');
                    result += ('</td>');
                    if (res.crudData.rowklant.LAND != '') {
                        result += ('<td>');
                        result += (res.crudData.rowklant.LAND);
                        result += ('</td>');
                    }
                }
                result += ('</tr>');
                // Spatieregel
                result += ('<tr>');
                result += ('<td>&nbsp;</td>');
                result += ('</tr>');
                // Datum
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Datum:";
                }
                else {
                    value = "Date:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.row.GEREEDDATUM);
                result += ('</td>');
                result += ('</tr>');
                // Onze referentie
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Onze referentie";
                }
                else {
                    value = "Our reference:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.row.REFERENTIE);
                result += ('</td>');
                result += ('</tr>');
                // Uw referentie
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Uw referentie";
                }
                else {
                    value = "Your reference:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.row.KLANTREFERENTIE);
                result += ('</td>');
                result += ('</tr>');
                result += ('</table>');
                result += ('</div>');
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getLeverancierHeader = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ('<div style="height:' + em + ';">');
                result += ('<table class="t">');
                // Aan
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Aan:";
                }
                else {
                    value = "To:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.rowleverancier.NAAM);
                result += ('</td>');
                result += ('<td>');
                // dpdnummer niet beschikbaar bij leverancier
                result += ("&nbsp;");
                result += ('</td>');
                result += ('</tr>');
                // tav
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "T.a.v.:";
                }
                else {
                    value = "Attn.:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.rowleverancier.CONTACT);
                result += ('</td>');
                result += ('</tr>');
                // Straat + nummer
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Adres:";
                }
                else {
                    value = "Address:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.rowleverancier.ADRES);
                result += ('</td>');
                result += ('</tr>');
                // Postkode Woonplaats land
                result += ('<tr>');
                result += ('<td></td>');
                result += ('<td>');
                if (res.crudData.rowleverancier.POSTCODE != '') {
                    result += (res.crudData.rowleverancier.POSTCODE);
                    result += ('&nbsp;');
                }
                result += (res.crudData.rowleverancier.WOONPLAATS);
                result += ('&nbsp;');
                result += ('</td>');
                if (res.crudData.rowklant.LAND != '') {
                    result += ('<td>');
                    result += (res.crudData.rowleverancier.LAND);
                    result += ('</td>');
                }
                result += ('</tr>');
                // Spatieregel
                result += ('<tr>');
                result += ('<td>&nbsp;</td>');
                result += ('</tr>');
                // Datum
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Datum:";
                }
                else {
                    value = "Date:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.row.STARTDATUM);
                result += ('</td>');
                result += ('</tr>');
                // Onze referentie
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Onze referentie";
                }
                else {
                    value = "Our reference:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.row.REFERENTIE);
                result += ('</td>');
                result += ('</tr>');
                // Uw referentie
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Klant referentie";
                }
                else {
                    value = "Customer reference:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                result += ('<td>');
                result += (res.crudData.row.KLANTREFERENTIE);
                result += ('</td>');
                result += ('</tr>');
                result += ('</table>');
                result += ('</div>');
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getMidText = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ('<div style="height:' + em + ';">');
                result += ('<table class="t">');
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                result += ('<td>');
                if (res.crudData.taal == 'nl') {
                    value = 'Betreft:    Ontvangstbevestiging retour gezonden product(en).<br>'
                        + '<br>'
                        + 'Hierbij bevestigen wij de ontvangst van de door u retour gezonden producten.<br>'
                        + 'De onderstaande producten zijn in ons Retour Systeem opgenomen:';
                }
                else {
                    value = 'Concerns:    Confirmation of receipt returned product(s).<br>'
                        + '<br>'
                        + 'Hereby we confirm the receipt of your returned products.<br>'
                        + 'The products below are registered in our system:';
                }
                result += value;
                result += ('</td></tr>');
                result += ('</table>');
                result += ('</div>');
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getMidTextVerzend = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ('<div style="height:' + em + ';">');
                result += ('<table class="t">');
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                result += ('<td>');
                if (res.crudData.taal == 'nl') {
                    value = 'Betreft:    Verzendbon retour gezonden product(en).<br>'
                        + '<br>'
                        + 'Hierbij ontvangt u de volgende artikel(en)/reparatie(s) retour:<br>';
                }
                else {
                    value = 'Concerns:    Packing list of returned product(s).<br>'
                        + '<br>'
                        + 'Hereby you will receive the following product(s)/repair(s) in return:<br>';
                }
                result += value;
                result += ('</td></tr>');
                result += ('</table>');
                result += ('</div>');
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getMidTextLeverancier = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ('<div style="height:' + em + ';">');
                result += ('<table class="t">');
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                result += ('<td>');
                if (res.crudData.taal == 'nl') {
                    value = 'Betreft:    Verzendbon product(en) ter onderzoek / reparatie.<br>'
                        + '<br>'
                        + 'Hierbij ontvangt u de volgende artikel(en) ter onderzoek / reparatie:<br>';
                }
                else {
                    value = 'Concerns:    Packing list product(s) for analysis / repair.<br>'
                        + '<br>'
                        + 'Hereby you will receive the following product(s) for analysis / repair:<br>';
                }
                result += value;
                result += ('</td></tr>');
                result += ('</table>');
                result += ('</div>');
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getItems = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, value, referentie, sqlreg, rowsreg, irowreg, rowreg, sqlproduct, rowsproduct, rowproduct;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        result = '';
                        value = '';
                        referentie = query.referentie;
                        if (Number(query.copy) == 1) {
                            result += ('<div style="height:' + em + ';background-image: url(images/Copy_watermark.gif);">');
                        }
                        else {
                            result += ('<div style="height:' + em + ';">');
                        }
                        result += ('<div>');
                        // productregels:
                        result += ('<table class=t">');
                        result += ('<tr>');
                        result += ('<td class="leftmargin">&nbsp;</td>');
                        if (res.crudData.taal == 'nl') {
                            value = 'Aantal';
                        }
                        else {
                            value = 'Amount';
                        }
                        result += ('<td style="width:8em"><b>' + value + '</b></td>');
                        if (res.crudData.taal == 'nl') {
                            value = 'Artikelnummer';
                        }
                        else {
                            value = 'Article number';
                        }
                        result += ('<td style="width:8em"><b>' + value + '</b></td>');
                        if (res.crudData.taal == 'nl') {
                            value = 'Omschrijving';
                        }
                        else {
                            value = 'Description';
                        }
                        result += ('<td style="width:20em"><b>' + value + '</b></td>');
                        result += ('</tr>');
                        result += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td></tr>');
                        sqlreg = "\nselect *,\n date2screendate(productiedatumtijd) as PRODUCTIEDATUM\nfrom RETOURPRODUCT\nwhere referentie  = '" + query.referentie + "'\norder by klantproductnummer,serienummer,productiedatumtijd,productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlreg)];
                    case 1:
                        rowsreg = _a.sent();
                        irowreg = 0;
                        _a.label = 2;
                    case 2:
                        if (!(irowreg < rowsreg.length)) return [3 /*break*/, 5];
                        rowreg = rowsreg[irowreg];
                        sqlproduct = "\nselect *\nfrom PRODUCT\nwhere productnummer = '" + rowreg.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproduct)];
                    case 3:
                        rowsproduct = _a.sent();
                        rowproduct = {};
                        if (rowsproduct[0]) {
                            rowproduct = rowsproduct[0];
                        }
                        else {
                            rowproduct.PRODUCTNAAM = '???';
                        }
                        result += ('<tr>');
                        result += ('<td></td>');
                        result += ('<td style="text-align:left;">' + rowreg.AANTAL + '</td>');
                        result += ('<td>' + rowreg.PRODUCTNUMMER + '</td>');
                        result += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
                        result += ('</tr>');
                        _a.label = 4;
                    case 4:
                        irowreg++;
                        return [3 /*break*/, 2];
                    case 5:
                        result += ('</table>');
                        result += ('<br>');
                        result += ('</div>');
                        result += ('</div>');
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Retourtextfragmenten.getItemsVerzend = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var sqlproduct, rowsproduct, rowproduct, sqlreg, rowsreg, rowreg, query, result, value, referentie, irowreg, irowreg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sqlproduct = '';
                        sqlreg = '';
                        query = db_1.default.fixQuery(req.query);
                        result = '';
                        value = '';
                        referentie = query.referentie;
                        if (Number(query.copy) == 1) {
                            result += ('<div style="height:' + em + ';background-image: url(images/Copy_watermark.gif);">');
                        }
                        else {
                            result += ('<div style="height:' + em + ';">');
                        }
                        // Artikelregels
                        result += ('<table class="t">');
                        result += ('<tr>');
                        result += ('<td class="leftmargin">&nbsp;</td>');
                        if (res.crudData.taal == 'nl') {
                            result += ('<td style="width:10em;"><b>Aantal</b></td>');
                            result += ('<td style="width:10em"><b>Artikel<br>nummer.</b></td>');
                            result += ('<td style="width:20em"><b>Omschrijving</b></td>');
                        }
                        else {
                            result += ('<td style="width:10em;"><b>Quantity</b></td>');
                            result += ('<td style="width:10em"><b>Article<br>number.</b></td>');
                            result += ('<td style="width:20em"><b>Description</b></td>');
                        }
                        result += ('</tr>');
                        result += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td></tr>');
                        sqlreg = " \nselect *,\ndate2screendate(productiedatumtijd) as PRODUCTIEDATUM\nfrom RETOURPRODUCT\nwhere referentie  = '" + res.crudData.row.REFERENTIE + "'\norder by klantproductnummer,serienummer,productiedatumtijd,productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlreg)];
                    case 1:
                        rowsreg = _a.sent();
                        irowreg = 0;
                        _a.label = 2;
                    case 2:
                        if (!(irowreg < rowsreg.length)) return [3 /*break*/, 5];
                        rowreg = rowsreg[irowreg];
                        sqlproduct = "\nselect *\nfrom PRODUCT\nwhere productnummer = '" + rowreg.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproduct)];
                    case 3:
                        rowsproduct = _a.sent();
                        rowproduct = {};
                        if (rowsproduct[0]) {
                            rowproduct = rowsproduct[0];
                        }
                        else {
                            rowproduct.PRODUCTNAAM = '???';
                        }
                        result += ('<tr>');
                        result += ('<td></td>');
                        result += ('<td>' + rowreg.AANTAL + '</td>');
                        result += ('<td>' + rowreg.PRODUCTNUMMER + '</td>');
                        result += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
                        result += ('</tr>');
                        result += ('<tr>');
                        result += ('<td></td>');
                        result += ('<td></td>');
                        result += ('<td colspan=99>' + util_1.Util.decodeOpmerking(rowreg.OPMERKING, 80) + '</td>');
                        result += ('</tr>');
                        _a.label = 4;
                    case 4:
                        irowreg++;
                        return [3 /*break*/, 2];
                    case 5:
                        result += ('</table>');
                        // spatieregels:
                        result += ('<br>');
                        // actieregels:
                        result += ('<table class="t">');
                        result += ('<tr>');
                        result += ('<td class="leftmargin">&nbsp;</td>');
                        if (res.crudData.taal == 'nl') {
                            result += ('<td style="width:10em"><b>Afdeling</b></td>');
                            result += ('<td style="width:10em"><b>Actie</b></td>');
                            result += ('<td style="width:25em"><b>Opmerking</b></td>');
                        }
                        else {
                            result += ('<td style="width:10em"><b>Department</b></td>');
                            result += ('<td style="width:10em"><b>Action</b></td>');
                            result += ('<td style="width:25em"><b>Remark</b></td>');
                        }
                        result += ('</tr>');
                        result += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td></tr>');
                        sqlreg = "\nselect * from\n(select *,\ndate2screendate(gereeddatumtijd) as GEREEDDATUM,\n(select naam from RETOURGEBRUIKER \nwhere RETOURGEBRUIKER.gebruiker = RETOURACTIE.gebruiker) \nas AFDELING,\n(select naam from RETOURACTIETYPE \nwhere RETOURACTIETYPE.actie = RETOURACTIE.actie) \nas ACTIETYPE\nfrom RETOURACTIE\nwhere referentie  = '" + referentie + "'\n) base\norder by gebruiker,gereeddatumtijd,actie";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlreg)];
                    case 6:
                        rowsreg = _a.sent();
                        irowreg = 0;
                        _a.label = 7;
                    case 7:
                        if (!(irowreg < rowsreg.length)) return [3 /*break*/, 10];
                        rowreg = rowsreg[irowreg];
                        sqlproduct = "\nselect *\nfrom PRODUCT\nwhere productnummer = '" + rowreg.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproduct)];
                    case 8:
                        rowsproduct = _a.sent();
                        rowproduct = {};
                        if (rowsproduct[0]) {
                            rowproduct = rowsproduct[0];
                        }
                        else {
                            rowproduct.PRODUCTNAAM = '???';
                        }
                        result += ('<tr>');
                        result += ('<td></td>');
                        result += ('<td>' + rowreg.AFDELING + '</td>');
                        result += ('<td>' + rowreg.ACTIETYPE + '</td>');
                        result += ('<td>' + util_1.Util.decodeOpmerking(rowreg.OPMERKING, 80) + '</td>');
                        result += ('</tr>');
                        _a.label = 9;
                    case 9:
                        irowreg++;
                        return [3 /*break*/, 7];
                    case 10:
                        result += ('</table>');
                        //
                        result += ('</div>');
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Retourtextfragmenten.getItemsLeverancier = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, value, referentie, leverancier, sqlreg, rowsreg, rowreg, sqlproduct, rowsproduct, rowproduct, irowreg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        result = '';
                        value = '';
                        referentie = query.referentie;
                        leverancier = query.leverancier || '';
                        sqlreg = '';
                        sqlproduct = '';
                        if (Number(query.copy) == 1) {
                            result += ('<div style="height:' + em + ';background-image: url(images/Copy_watermark.gif);">');
                        }
                        else {
                            result += ('<div style="height:' + em + ';">');
                        }
                        // Artikelregels
                        result += ('<table class="t">');
                        result += ('<tr>');
                        result += ('<td class="leftmargin">&nbsp;</td>');
                        if (res.crudData.taal == 'nl') {
                            result += ('<td style="width:10em;"><b>Aantal</b></td>');
                            result += ('<td style="width:10em"><b>Artikel<br>nummer.</b></td>');
                            result += ('<td style="width:20em"><b>Omschrijving</b></td>');
                        }
                        else {
                            result += ('<td style="width:10em;"><b>Quantity</b></td>');
                            result += ('<td style="width:10em"><b>Article<br>number.</b></td>');
                            result += ('<td style="width:20em"><b>Description</b></td>');
                        }
                        result += ('</tr>');
                        result += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td></tr>');
                        sqlreg = "\nselect retourproduct.*,\ndate2screendate(productiedatumtijd) as PRODUCTIEDATUM\nfrom \n(retourproduct left join bestelling \non retourproduct.productnummer = bestelling.productnummer)\nleft join leverancier \non bestelling.leveranciernummer = leverancier.leveranciernummer\nwhere retourproduct.referentie  = '" + referentie + "'\nand bestelling.LEVERANCIERNUMMER = '" + leverancier + "'\norder by klantproductnummer,serienummer,productiedatumtijd,productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlreg)];
                    case 1:
                        rowsreg = _a.sent();
                        irowreg = 0;
                        _a.label = 2;
                    case 2:
                        if (!(irowreg < rowsreg.length)) return [3 /*break*/, 5];
                        rowreg = rowsreg[irowreg];
                        sqlproduct = "\nselect *\nfrom PRODUCT\nwhere productnummer = '" + rowreg.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproduct)];
                    case 3:
                        rowsproduct = _a.sent();
                        rowproduct = {};
                        if (rowsproduct[0]) {
                            rowproduct = rowsproduct[0];
                        }
                        else {
                            rowproduct.PRODUCTNAAM = '???';
                        }
                        result += ('<tr>');
                        result += ('<td></td>');
                        result += ('<td>' + rowreg.AANTAL + '</td>');
                        result += ('<td>' + rowreg.PRODUCTNUMMER + '</td>');
                        result += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
                        result += ('</tr>');
                        result += ('<tr>');
                        result += ('<td></td>');
                        result += ('<td></td>');
                        result += ('<td colspan=99>' + util_1.Util.decodeOpmerking(rowreg.OPMERKING, 80) + '</td>');
                        result += ('</tr>');
                        _a.label = 4;
                    case 4:
                        irowreg++;
                        return [3 /*break*/, 2];
                    case 5:
                        result += ('</table>');
                        //
                        result += ('</div>');
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Retourtextfragmenten.getGarantie = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ('<div style="height:' + em + ';">');
                result += ('<table class="t">');
                // Garantie
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Garantie:";
                }
                else {
                    value = "Guarantee:";
                }
                result += ('<td class="leftlabel">' + value + '</td>');
                if (res.crudData.row.GARANTIE == '01') {
                    if (res.crudData.taal == 'nl') {
                        value = "Ja";
                    }
                    else {
                        value = "Yes";
                    }
                }
                else {
                    if (res.crudData.taal == 'nl') {
                        value = "Nee";
                    }
                    else {
                        value = "No";
                    }
                }
                result += ('<td>' + value + '</td>');
                result += ('</tr>');
                // Kosten
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                if (res.crudData.taal == 'nl') {
                    value = "Kosten:";
                }
                else {
                    value = "Costs:";
                }
                result += ('<td>' + value + '</td>');
                if (Number(res.crudData.row.KOSTEN) > 0) {
                    value = Number(res.crudData.row.KOSTEN).toFixed(2) + ' Euro';
                }
                else {
                    if (res.crudData.taal == 'nl') {
                        value = "Geen";
                    }
                    else {
                        value = "None";
                    }
                }
                result += ('<td>' + value + '</td>');
                result += ('</tr>');
                result += "</table>";
                result += ('</div>');
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getBottomText = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ('<div style="height:' + em + ';">');
                result += ('<table class="t">');
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                result += ('<td>');
                if (res.crudData.taal == 'nl') {
                    value = 'Deze producten worden op korte termijn aan inspectie onderworpen. De uitkomsten krijgt u op later<br>'
                        + 'tijdstip van ons gecommuniceerd.<br><br>'
                        + 'Wij vertrouwen u hiermede voldoende te hebben geinformeerd.<br>'
                        + 'Zijn er echter nog vragen, dan verzoeken wij u contact met ons op te nemen.<br><br>';
                }
                else {
                    value = 'We hope to inform you as soon as possible about any results of examination.<br>'
                        + '<br>'
                        + 'If you have any questions, do not hesitate to contact us.<br><br>';
                }
                result += value;
                result += ('</td></tr>');
                result += ('</table>');
                result += ('</div>');
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getBottomTextVerzend = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ('<div style="height:' + em + ';">');
                result += ('<table class="t">');
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                result += ('<td>');
                if (res.crudData.taal == 'nl') {
                    value = 'Wij vertrouwen erop hiermee uw retour naar tevredenheid te hebben afgehandeld.<br>'
                        + 'Zijn er echter nog vragen, dan verzoeken wij u contact met ons op te nemen.';
                }
                else {
                    value = 'We trust that we have handled your repair sufficiently.<br>'
                        + 'If there are any questions, do not hesitate to contact us.';
                }
                result += value;
                result += ('</td></tr>');
                result += ('</table>');
                result += ('</div>');
                return [2 /*return*/, result];
            });
        });
    };
    Retourtextfragmenten.getBottomTextLeverancier = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_a) {
                result = '';
                value = '';
                result += ('<div style="height:' + em + ';">');
                result += ('<table class="t">');
                result += ('<tr>');
                result += ('<td class="leftmargin">&nbsp;</td>');
                result += ('<td>');
                if (res.crudData.taal == 'nl') {
                    value = 'Zijn er nog vragen, dan verzoeken wij u contact met ons op te nemen.';
                }
                else {
                    value = 'If there are any questions, do not hesitate to contact us.';
                }
                result += value;
                result += ('</td></tr>');
                result += ('</table>');
                result += ('</div>');
                return [2 /*return*/, result];
            });
        });
    };
    Retourtextfragmenten.getOnderschrift = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result, value, sqlhandtekening, rowshandtekening;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = '';
                        value = '';
                        result += ('<div style="height:' + em + ';">');
                        result += ('<table class="t">');
                        result += ('<tr>');
                        result += ('<td class="leftmargin">&nbsp;</td>');
                        result += ('<td>');
                        if (res.crudData.taal == 'nl') {
                            result +=
                                'Met vriendelijke groeten,<br>'
                                    + '<b>TASSERON B.V.</b><br><br>';
                        }
                        else {
                            result +=
                                'Best regards,<br>'
                                    + '<b>TASSERON B.V.</b><br><br>';
                        }
                        result += value;
                        result += ('</td></tr>');
                        result += ('<tr>');
                        result += ('<td class="leftmargin"></td>');
                        result += ('<td style="width:40em">');
                        result += (res.crudData.row.GEBRUIKER);
                        result += ('</td>');
                        result += ('');
                        result += '';
                        result += ('</td>');
                        result += ('</tr>');
                        result += "<tr><td>&nbsp;</td></tr>";
                        result += ('<tr>');
                        result += ('<td></td>');
                        result += ('<td style="height:6em;width:18em">');
                        sqlhandtekening = "\nselect getHandtekening('" + res.crudData.row.GEBRUIKER + "') as handtekening\nfrom dual";
                        value = '';
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlhandtekening)];
                    case 1:
                        rowshandtekening = _a.sent();
                        if (rowshandtekening[0]) {
                            value = rowshandtekening[0].HANDTEKENING;
                        }
                        result += '<img src="'
                            + value
                            + '" style="height:6em;width:18em">'
                            + '</img> ';
                        result += ('</td>');
                        result += ('</tr>');
                        result += ('</table>');
                        result += ('</div>');
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Retourtextfragmenten.getFooter = function (req, res, next, em) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = '';
                result = "\n<div style=\"height:" + em + "\">\n<table class=\"t\">\n<tr>\n</tr>\n</table>\n</div>";
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.setValues = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = '';
                result = ''
                    + '<div style="display:none">'
                    + '<div id="thisApp">' + config_1.Config.app + '</div>'
                    + '<div id="thisFilename">' + res.crudData.filename + '</div>'
                    + '<div id="thisDir">' + res.crudData.targetdir + '</div>'
                    + '<div id="thisUrl">' + res.crudData.targeturl + '</div>'
                    + '</div>';
                return [2 /*return*/, (result)];
            });
        });
    };
    Retourtextfragmenten.getRetour = function (req, res, next, type) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql, rows, row, sqlklant, rowsklant, rowklant;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = '';
                        sqlklant = '';
                        //
                        res.crudData.taal = '';
                        res.crudData.land = '';
                        sql = "\nselect *,\ndate2screendate(startdatumtijd) as STARTDATUM,\ndate2screendate(gereeddatumtijd) as GEREEDDATUM,\n(select min(productnummer) from RETOURPRODUCT \nwhere RETOURPRODUCT.referentie = RETOUR.referentie)\nas MIN_PROD\nfrom RETOUR  \nwhere referentie = '" + query.referentie + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        if (!rows[0]) return [3 /*break*/, 3];
                        row = rows[0];
                        res.crudData.row = rows[0];
                        sqlklant = "\nselect * \nfrom RETOURKLANT \nwhere referentie = '" + query.referentie + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlklant)];
                    case 2:
                        rowsklant = _a.sent();
                        rowklant = {};
                        if (rowsklant[0]) {
                            rowklant = rowsklant[0];
                        }
                        else {
                            rowklant.KLANTNUMMER = '';
                            rowklant.ZOEKCODE = '';
                            //
                            rowklant.NAAM = '';
                            rowklant.POSTCODE = '';
                            rowklant.WOONPLAATS = '';
                            rowklant.LAND = '';
                            rowklant.CONTACT = '';
                            rowklant.EMAIL = '';
                            rowklant.ADRES = '';
                            //
                            rowklant.AFLEVERDPDNUMMER = '';
                            //
                            rowklant.AFLEVERNAAM = '';
                            rowklant.AFLEVERPOSTCODE = '';
                            rowklant.AFLEVERWOONPLAATS = '';
                            rowklant.AFLEVERLAND = '';
                            rowklant.AFLEVEREMAIL = '';
                            rowklant.AFLEVERADRES = '';
                        }
                        res.crudData.rowklant = rowklant;
                        if (rowklant.AFLEVERNAAM != '') {
                            res.crudData.land = String(rowklant.AFLEVERLAND).toLowerCase().trim();
                        }
                        else {
                            res.crudData.land = String(rowklant.LAND).toLowerCase().trim();
                        }
                        if (res.crudData.land == 'nl' || res.crudData.land == '') {
                            res.crudData.taal = 'nl';
                        }
                        else {
                            res.crudData.taal = 'en';
                        }
                        // zoeknaam directory
                        // bestelnummer directory
                        res.crudData.targetdir = config_1.Config.retourendir;
                        if (res.crudData.targetdir == '') {
                            res.crudData.targetdir = 'f:/data/ak2/retouren';
                        }
                        res.crudData.targeturl = "toolbox.php?action=showpdf&filename=" + res.crudData.targetdir;
                        try {
                            if (!fs.existsSync(res.crudData.targetdir)) {
                                fs.mkdirSync(res.crudData.targetdir);
                            }
                        }
                        catch (error) {
                            logger_1.Logger.error(req, error);
                        }
                        if (rowklant.ZOEKCODE == '') {
                            res.crudData.targetdir += ('/' + util_1.Util.constructFilename(rowklant.KLANTNUMMER));
                            res.crudData.targeturl += ('/' + util_1.Util.constructFilename(rowklant.KLANTNUMMER));
                        }
                        else {
                            res.crudData.targetdir += ('/' + util_1.Util.constructFilename(rowklant.ZOEKCODE) + '_' + util_1.Util.constructFilename(rowklant.KLANTNUMMER));
                            res.crudData.targeturl += ('/' + util_1.Util.constructFilename(rowklant.ZOEKCODE) + '_' + util_1.Util.constructFilename(rowklant.KLANTNUMMER));
                        }
                        try {
                            if (!fs.existsSync(res.crudData.targetdir)) {
                                fs.mkdirSync(res.crudData.targetdir);
                            }
                        }
                        catch (error) {
                            logger_1.Logger.error(req, error);
                        }
                        res.crudData.targetdir += ('/' + util_1.Util.constructFilename(query.referentie) + '_' + util_1.Util.constructFilename(row.MIN_PROD));
                        res.crudData.targeturl += ('/' + util_1.Util.constructFilename(query.referentie) + '_' + util_1.Util.constructFilename(row.MIN_PROD));
                        try {
                            if (!fs.existsSync(res.crudData.targetdir)) {
                                fs.mkdirSync(res.crudData.targetdir);
                            }
                        }
                        catch (error) {
                            logger_1.Logger.error(req, error);
                        }
                        //
                        res.crudData.filename = res.crudData.targetdir + "/" + util_1.Util.constructFilename(query.referentie) + "_" + type + ".pdf";
                        res.crudData.targeturl += "/" + util_1.Util.constructFilename(query.referentie) + "_" + type + ".pdf";
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Retourtextfragmenten.getRetourleverancier = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, land, sql, rows, row, sqlklant, rowsklant, rowklant, sqlleverancier, rowsleverancier, rowleverancier;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        if (!query.leverancier) {
                            query.leverancier = '';
                        }
                        land = '';
                        sql = '';
                        sqlklant = '';
                        sqlleverancier = '';
                        sql = "\nselect *,\ndate2screendate(startdatumtijd) as STARTDATUM,\ndate2screendate(gereeddatumtijd) as GEREEDDATUM,\n(select min(productnummer) from RETOURPRODUCT \nwhere RETOURPRODUCT.referentie = RETOUR.referentie) \nas MIN_PROD\nfrom RETOUR  \nwhere referentie = '" + query.referentie + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        if (!rows[0]) return [3 /*break*/, 4];
                        row = rows[0];
                        res.crudData.row = rows[0];
                        sqlklant = "\nselect * \nfrom RETOURKLANT \nwhere referentie = '" + query.referentie + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlklant)];
                    case 2:
                        rowsklant = _a.sent();
                        rowklant = {};
                        if (rowsklant[0]) {
                            rowklant = rowsklant[0];
                        }
                        else {
                            rowklant.KLANTNUMMER = '';
                            rowklant.ZOEKCODE = '';
                            //
                            rowklant.NAAM = '';
                            rowklant.POSTCODE = '';
                            rowklant.WOONPLAATS = '';
                            rowklant.LAND = '';
                            rowklant.CONTACT = '';
                            rowklant.EMAIL = '';
                            rowklant.ADRES = '';
                            //
                            rowklant.AFLEVERDPDNUMMER = '';
                            //
                            rowklant.AFLEVERNAAM = '';
                            rowklant.AFLEVERPOSTCODE = '';
                            rowklant.AFLEVERWOONPLAATS = '';
                            rowklant.AFLEVERLAND = '';
                            rowklant.AFLEVEREMAIL = '';
                            rowklant.AFLEVERADRES = '';
                        }
                        res.crudData.rowklant = rowklant;
                        sqlleverancier = "\nselect \nretourproduct.referentie,\nretourproduct.productnummer,\nproduct.leveranciernummer,\nleverancier.*\nfrom \n(retourproduct left join product \non retourproduct.productnummer = product.productnummer)\nleft join leverancier \non product.leveranciernummer = leverancier.leveranciernummer\nwhere retourproduct.referentie  = '" + query.referentie + "'\nand product.leveranciernummer  = '" + query.leverancier + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlleverancier)];
                    case 3:
                        rowsleverancier = _a.sent();
                        rowleverancier = {};
                        if (rowsleverancier[0]) {
                            rowleverancier = rowsleverancier[0];
                        }
                        else {
                            rowleverancier.LAND = '';
                            rowleverancier.NAAM = '';
                            rowleverancier.CONTACT = '';
                            rowleverancier.ADRES = '';
                            rowleverancier.POSTCODE = '';
                            rowleverancier.WOONPLAATS = '';
                            rowleverancier.NAAM = '';
                        }
                        res.crudData.rowleverancier = rowleverancier;
                        land = rowleverancier.LAND;
                        if (land == 'nl' || land == '') {
                            res.crudData.taal = 'nl';
                        }
                        else {
                            res.crudData.taal = 'en';
                        }
                        // zoeknaam directory
                        // bestelnummer directory
                        res.crudData.targetdir = config_1.Config.retourendir;
                        if (res.crudData.targetdir == '') {
                            res.crudData.targetdir = 'f:/data/ak2/retouren';
                        }
                        res.crudData.targeturl = "toolbox.php?action=showpdf&filename="
                            + res.crudData.targetdir;
                        try {
                            if (!fs.existsSync(res.crudData.targetdir)) {
                                fs.mkdirSync(res.crudData.targetdir);
                            }
                        }
                        catch (error) {
                            logger_1.Logger.error(req, error);
                        }
                        if (rowklant.ZOEKCODE == '') {
                            res.crudData.targetdir += ('/' + util_1.Util.constructFilename(rowklant.KLANTNUMMER));
                            res.crudData.targeturl += ('/' + util_1.Util.constructFilename(rowklant.KLANTNUMMER));
                        }
                        else {
                            res.crudData.targetdir += ('/' + util_1.Util.constructFilename(rowklant.ZOEKCODE) + '_' + util_1.Util.constructFilename(rowklant.KLANTNUMMER));
                            res.crudData.targeturl += ('/' + util_1.Util.constructFilename(rowklant.ZOEKCODE) + '_' + util_1.Util.constructFilename(rowklant.KLANTNUMMER));
                        }
                        try {
                            if (!fs.existsSync(res.crudData.targetdir)) {
                                fs.mkdirSync(res.crudData.targetdir);
                            }
                        }
                        catch (error) {
                            logger_1.Logger.error(req, error);
                        }
                        res.crudData.targetdir += ('/' + util_1.Util.constructFilename(query.referentie));
                        res.crudData.targeturl += ('/' + util_1.Util.constructFilename(query.referentie));
                        try {
                            if (!fs.existsSync(res.crudData.targetdir)) {
                                fs.mkdirSync(res.crudData.targetdir);
                            }
                        }
                        catch (error) {
                            logger_1.Logger.error(req, error);
                        }
                        res.crudData.targetdir += ('/' + util_1.Util.constructFilename(query.leverancier) + '_' + util_1.Util.constructFilename(row.MIN_PROD));
                        res.crudData.targeturl += ('/' + util_1.Util.constructFilename(query.leverancier) + '_' + util_1.Util.constructFilename(row.MIN_PROD));
                        try {
                            if (!fs.existsSync(res.crudData.targetdir)) {
                                fs.mkdirSync(res.crudData.targetdir);
                            }
                        }
                        catch (error) {
                            logger_1.Logger.error(req, error);
                        }
                        //
                        res.crudData.filename = res.crudData.targetdir
                            + "/"
                            + util_1.Util.constructFilename(query.referentie)
                            + "_"
                            + util_1.Util.constructFilename(query.leverancier)
                            + "_verzend.pdf";
                        res.crudData.targeturl += "/"
                            + util_1.Util.constructFilename(query.referentie)
                            + "_"
                            + util_1.Util.constructFilename(query.leverancier)
                            + "_verzend.pdf";
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return Retourtextfragmenten;
}());
exports.Retourtextfragmenten = Retourtextfragmenten;
//# sourceMappingURL=retourtextfragmenten.js.map