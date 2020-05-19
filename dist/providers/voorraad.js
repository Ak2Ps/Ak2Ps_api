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
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var Voorraad = /** @class */ (function () {
    function Voorraad() {
        logger_1.Logger.info("Creating Voorraad");
    }
    Voorraad.prototype.getParam = function (req, res, next, naam) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = "";
                        //
                        sql = "\nselect \nifnull(INHOUD,'') as INHOUD\nfrom param\nwhere naam = '" + naam + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        if (rows[0]) {
                            result = rows[0].INHOUD;
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Voorraad.prototype.fase0 = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, _a, _b, _c, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _d.sent();
                        //
                        // Opschonen
                        //
                        sql = "\nupdate PRODUCT \nset eindvoorraad = 0, \ntebestellen = 0";
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _b.crudResult = _d.sent();
                        sql = "\ndelete from PRODUCTVOORRAAD";
                        _c = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _c.crudResult = _d.sent();
                        //
                        res.crudConnection.release();
                        result = {
                            items: [
                                { msg: 'Gereed ...' }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Voorraad.prototype.fase1 = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sqlinsert, wiproductnummer, tlvoorraad, tltebestellen, swbestellen, bestellen, aantal, _a, orderdagen, besteldagen, rows, irow, row, _b, _c, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        wiproductnummer = '';
                        tlvoorraad = 0;
                        tltebestellen = 0;
                        swbestellen = 0;
                        bestellen = 0;
                        aantal = 0;
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _d.sent();
                        return [4 /*yield*/, this.getParam(req, res, next, "ORDERDAGEN")];
                    case 2:
                        orderdagen = _d.sent();
                        return [4 /*yield*/, this.getParam(req, res, next, "BESTELDAGEN")];
                    case 3:
                        besteldagen = _d.sent();
                        //
                        // Alle vraagregels op artikel,datum doorlopen en voorraadregels maken (voorraad = delta)
                        // Te bestellen: als er een negatieve voorraad optreedt voor een artikel met onderdelen -> het verschil
                        //
                        sql = "\nselect * from (\nselect\nactie,\nactie_oms,\nproductnummer,\ndatum,\ninitdatum,\nstartdatum,\naantal,\ngeproduceerd,\nuitval,\nactienummer,\ndate2screendate(initdatum) as INITDATUM_OMS,\ndate2screendate(datum) as DATUM_OMS,\ndate2screendate(startdatum) as STARTDATUM_OMS,\n(select min(Voorraaddatumtijd) from PRODUCT where BASE.productnummer = PRODUCT.Productnummer) as VOORRAADDATUM,\n(select min(Productnaam) from PRODUCT where BASE.productnummer = PRODUCT.Productnummer) as PRODUCTNAAM,\n(select count(*) from ONDERDEEL where BASE.productnummer = ONDERDEEL.productnummer and ONDERDEEL.onderdeelnummer != BASE.productnummer and faktor > 0) as onderdelen\nfrom (";
                        // BE: Openstaande Bewerkingen
                        sql += "\nSELECT \n'BE' as actie,\nconcat('Eindproduct ', Bewerkingsnummer, ' van ', date2screendate(startdatumtijd)) as actie_oms,\nproductnummer,\nbewerkingsnummer as actienummer,\nnull as initdatum,\nifnull(plandatumtijd,startdatumtijd) as datum,\nstartdatumtijd as startdatum,\nproductieaantal as aantal,\n(select sum(AantalGemaakt) from BEWERKINGTIJD where BEWERKINGTIJD.bewerkingsnummer = BEWERKING.bewerkingsnummer) as geproduceerd,\n(select sum(AantalAfkeur) + sum(AantalReparatie) from BEWERKINGUITVAL where BEWERKINGUITVAL.bewerkingsnummer = BEWERKING.bewerkingsnummer) as uitval\nfrom BEWERKING \nwhere einddatumtijd is null";
                        // VE: Orders
                        sql += "\n    union all\nSELECT\n'VE',\na.Orderreferentie, \na.productnummer,\na.ordernummer,\na.initvraagdatumtijd,";
                        if (Number(orderdagen) == 1) {
                            //voorraaddatum (x dagen eerder op voorraad dan nodig)
                            sql += "\nDATE_SUB(a.vraagdatumtijd,INTERVAL ifnull(p.leverdagen,0) DAY),";
                        }
                        else {
                            sql += "\na.vraagdatumtijd,";
                        }
                        sql += "\na.vraagdatumtijd,\na.vraag * -1,\nnull, \nnull\nfrom PRODUCTVRAAG a left join PRODUCT p\non a.productnummer = p.productnummer";
                        // BES: Bestelling
                        sql += "\nunion all\nSELECT \n'BES',\n'Bestelling',\na.productnummer,\nnull,\nnull,\na.besteldatumtijd,";
                        if (Number(besteldagen) == 1) {
                            //actiedatum (x dagen eerder bestellen dan nodig)
                            sql += "\nDATE_SUB(a.besteldatumtijd,INTERVAL ifnull(p.leverdagen,0) DAY),";
                        }
                        else {
                            sql += "\na.besteldatumtijd,";
                        }
                        sql += "\na.bestelling,\nnull,\nnull\nfrom BESTELLING a left join PRODUCT p \non a.productnummer = p.productnummer";
                        // VRD: Startvoorraad
                        sql += "\nunion all\nSELECT \n'VRD',\n'Startvoorraad',\nproductnummer, \nnull,\nnull,\nnull,\nnull,\nvoorraad,\nnull,\nnull\nfrom PRODUCT";
                        sql += "\n) BASE\n) BASE2\norder by productnummer, datum, aantal desc";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        rows = _d.sent();
                        wiproductnummer = '';
                        tlvoorraad = 0;
                        tltebestellen = 0;
                        swbestellen = 0;
                        aantal = 0;
                        irow = 0;
                        _d.label = 5;
                    case 5:
                        if (!(irow < rows.length)) return [3 /*break*/, 10];
                        row = rows[irow];
                        if (wiproductnummer != row.PRODUCTNUMMER) {
                            wiproductnummer = row.PRODUCTNUMMER;
                            tlvoorraad = 0;
                            tltebestellen = 0;
                            swbestellen = 0;
                        }
                        aantal = Number(row.AANTAL);
                        tlvoorraad = tlvoorraad + aantal;
                        tltebestellen = tltebestellen - aantal;
                        //
                        // Pas bijmaken als er iets nodig is (VE/OP)
                        // Anders wachten (VRD/BE/BES)
                        //
                        if (row.ACTIE == 'VE') {
                            swbestellen = 1;
                        }
                        else if (row.ACTIE == 'OP') {
                            // Deze actie wordt pas in fase 2 aangemaakt: dus nu eigenlijk een overbodige uitvraag
                            swbestellen = 1;
                        }
                        if (!(swbestellen == 0)) return [3 /*break*/, 7];
                        sqlinsert = "\ninsert into PRODUCTVOORRAAD (\nproductnummer,\nactienummer,\nvoorraad, \ninitdatumtijd,\nactiedatumtijd,\nvoorraaddatumtijd,\ntebestellen,\nbesteld,\nactie,\nactieomschrijving,\nonderdelen,\nexpanded)\nvalues (\ntrim('" + db_1.default.fix(row.PRODUCTNUMMER) + "'),\nnull,\n'" + String(aantal) + "',\nscreendate2date('" + row.INITDATUM_OMS + "'),\nscreendate2date('" + row.STARTDATUM_OMS + "'),\nscreendate2date('" + row.DATUM_OMS + "'),\n0,\n0,\ntrim('" + db_1.default.fix(row.ACTIE) + "'),\ntrim('" + db_1.default.fix(row.ACTIE_OMS) + "'),\n'" + row.ONDERDELEN + "',\n0\n)";
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlinsert)];
                    case 6:
                        _b.crudResult = _d.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        bestellen = 0;
                        if ((tltebestellen > 0) && (Number(row.ONDERDELEN) > 0)) {
                            bestellen = tltebestellen;
                            tltebestellen = 0;
                        }
                        sqlinsert = "\ninsert into PRODUCTVOORRAAD (\nproductnummer,\nactienummer,\nvoorraad,\ninitdatumtijd,\nactiedatumtijd,\nvoorraaddatumtijd,\ntebestellen,\nbesteld,\nactie,\nactieomschrijving,\nonderdelen,\nexpanded)\nvalues (\ntrim('" + db_1.default.fix(row.PRODUCTNUMMER) + "'),\ntrim('" + db_1.default.fix(row.ACTIENUMMER) + "'),\n'" + aantal + "',\nscreendate2date('" + row.INITDATUM_OMS + "'),\nscreendate2date('" + row.STARTDATUM_OMS + "'),\nscreendate2date('" + row.DATUM_OMS + "'),\n'" + bestellen + "',\n0,\ntrim('" + db_1.default.fix(row.ACTIE) + "'),\ntrim('" + db_1.default.fix(row.ACTIE_OMS) + "'),\n'" + row.ONDERDELEN + "',\n0\n)";
                        _c = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlinsert)];
                    case 8:
                        _c.crudResult = _d.sent();
                        _d.label = 9;
                    case 9:
                        irow++;
                        return [3 /*break*/, 5];
                    case 10:
                        //
                        res.crudConnection.release();
                        result = {
                            items: [
                                { msg: 'Gereed ...' }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Voorraad.prototype.fase2 = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tlregels, tlvoorraad, sql, sqlonderdeel, sqlinsert, sqlupdate, _a, rows, irow, row, rowsonderdeel, irowonderdeel, rowonderdeel, _b, _c, irow, row, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tlregels = 0;
                        tlvoorraad = 0;
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _d.sent();
                        //
                        // Alle voorraad regels met tebestellen > 0 (producten met een onderdeel waar een tekort voor was)
                        // Een voorraadregel toevoegen voor elk onderdeel met benodigd aantal en indicatie: artikel nog beoordelen
                        //
                        sql = "\nselect PRODUCTVOORRAAD.*,\ndate2screendate(voorraaddatumtijd)  as DATUM_OMS\nfrom PRODUCTVOORRAAD\nwhere tebestellen > 0\nand expanded = 0\norder by productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _d.sent();
                        irow = 0;
                        _d.label = 3;
                    case 3:
                        if (!(irow < rows.length)) return [3 /*break*/, 11];
                        row = rows[irow];
                        tlregels = tlregels + 1;
                        tlvoorraad = Number(row.TEBESTELLEN) * -1;
                        //
                        // Voor elk onderdeel een voorraad-vermindering-regel toevoegen
                        // (Elk onderdeel kan weer onderdelen hebben)
                        //
                        sqlonderdeel = "\nselect *\nfrom ONDERDEEL\nwhere productnummer = trim('" + row.PRODUCTNUMMER + "')\nand productnummer != onderdeelnummer\nand faktor > 0";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlonderdeel)];
                    case 4:
                        rowsonderdeel = _d.sent();
                        irowonderdeel = 0;
                        _d.label = 5;
                    case 5:
                        if (!(irowonderdeel < rowsonderdeel.length)) return [3 /*break*/, 8];
                        rowonderdeel = rowsonderdeel[irowonderdeel];
                        sqlinsert = "\ninsert into PRODUCTVOORRAAD\n(productnummer,actienummer,\nvoorraad, initdatumtijd,voorraaddatumtijd,tebestellen,besteld,actie,actieomschrijving,onderdelen,expanded)\nvalues (\ntrim('" + db_1.default.fix(rowonderdeel.ONDERDEELNUMMER) + "'),\ntrim('" + db_1.default.fix(rowonderdeel.PRODUCTNUMMER) + "'),\n" + Number(rowonderdeel.FAKTOR) * tlvoorraad + ",\nscreendate2date('" + row.DATUM_OMS + "'),\nscreendate2date('" + row.DATUM_OMS + "'),\n0,\n0,\n'OP',\n'Onderdeel voor " + db_1.default.fix(row.PRODUCTNUMMER) + "',\n-1,\n0\n)";
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlinsert)];
                    case 6:
                        _b.crudResult = _d.sent();
                        _d.label = 7;
                    case 7:
                        irowonderdeel++;
                        return [3 /*break*/, 5];
                    case 8:
                        sqlupdate = "\nupdate PRODUCTVOORRAAD set\ntebestellen = 0,\nexpanded = 1\nwhere id = trim('" + row.ID + "')";
                        _c = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 9:
                        _c.crudResult = _d.sent();
                        _d.label = 10;
                    case 10:
                        irow++;
                        return [3 /*break*/, 3];
                    case 11:
                        //
                        // Voorraad en aantal onderdelen van de zojuist toegevoegde regels opnieuw beoordelen per artikel
                        // Om eventueel een nieuwe 'tebestellen' te bepalen
                        //
                        sql = "\nselect distinct PRODUCTNUMMER\nfrom PRODUCTVOORRAAD\nwhere onderdelen = -1\norder by productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 12:
                        rows = _d.sent();
                        irow = 0;
                        _d.label = 13;
                    case 13:
                        if (!(irow < rows.length)) return [3 /*break*/, 16];
                        row = rows[irow];
                        return [4 /*yield*/, this.beoordeelProduct(req, res, next, row.PRODUCTNUMMER)];
                    case 14:
                        _d.sent();
                        _d.label = 15;
                    case 15:
                        irow++;
                        return [3 /*break*/, 13];
                    case 16:
                        result = {
                            items: [
                                { msg: tlregels + " regels afgeboekt ...", regelsbesteld: tlregels }
                            ]
                        };
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Voorraad.prototype.fase3 = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tlregels, sql, sqlupdate, aantal, swbestellen, tlvoorraad, wiproductnummer, _a, rows, irow, row, _b, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        tlregels = 0;
                        aantal = 0;
                        swbestellen = 0;
                        tlvoorraad = 0;
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _c.sent();
                        //
                        sql = "\nselect * from PRODUCTVOORRAAD\norder by productnummer, voorraaddatumtijd, voorraad desc";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _c.sent();
                        wiproductnummer = "";
                        irow = 0;
                        _c.label = 3;
                    case 3:
                        if (!(irow < rows.length)) return [3 /*break*/, 6];
                        row = rows[irow];
                        tlregels = tlregels + 1;
                        if (row.PRODUCTNUMMER != wiproductnummer) {
                            wiproductnummer = row.PRODUCTNUMMER;
                            swbestellen = 0;
                            tlvoorraad = 0;
                        }
                        aantal = Number(row.VOORRAAD);
                        tlvoorraad = tlvoorraad + aantal;
                        if (row.ACTIE == 'VE') {
                            swbestellen = 1;
                        }
                        else if (row.ACTIE == 'OP') {
                            swbestellen = 1;
                        }
                        sqlupdate = "\nupdate PRODUCTVOORRAAD set\nactievoorraad = '" + tlvoorraad + "'\nwhere id = trim('" + row.ID + "')";
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 4:
                        _b.crudResult = _c.sent();
                        _c.label = 5;
                    case 5:
                        irow++;
                        return [3 /*break*/, 3];
                    case 6:
                        result = {
                            items: [
                                { msg: tlregels + " regels bijgewerkt ...", regelsbijgewerkt: tlregels }
                            ]
                        };
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Voorraad.prototype.fase4 = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var tlregels, sql, sqlupdate, wiproductnummer, widatum, _a, rows, irow, row, _b, _c, result;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        tlregels = 0;
                        wiproductnummer = '';
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _d.sent();
                        //
                        sql = "\nselect \nDET.productnummer, \nDET.actievoorraad,\nDET.voorraaddatumtijd,\ndate2screendate(voorraaddatumtijd) as DATUM_OMS\nfrom PRODUCTVOORRAAD DET,\n(\nselect \nmin(voorraaddatumtijd) as mindat, \nproductnummer\nfrom PRODUCTVOORRAAD\nwhere actievoorraad < 0\ngroup by productnummer\n) BASE\nwhere BASE.productnummer = DET.productnummer\nand   BASE.mindat = DET.voorraaddatumtijd\nand   ifnull(DET.beperkstatus,'---') = '---'\norder by DET.productnummer, DET.actievoorraad";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _d.sent();
                        wiproductnummer = "";
                        irow = 0;
                        _d.label = 3;
                    case 3:
                        if (!(irow < rows.length)) return [3 /*break*/, 7];
                        row = rows[irow];
                        tlregels = tlregels + 1;
                        if (tlregels >= 150) {
                            return [3 /*break*/, 7];
                        }
                        if (!(row.PRODUCTNUMMER != wiproductnummer)) return [3 /*break*/, 6];
                        wiproductnummer = row.PRODUCTNUMMER;
                        widatum = row.DATUM_OMS;
                        sqlupdate = "\nupdate PRODUCTVOORRAAD set\nbeperkdatumtijd = screendate2date('" + widatum + "'),\nbeperknummer = '" + db_1.default.fix(wiproductnummer) + "'\nwhere PRODUCTVOORRAAD.productnummer in\n(\nselect productnummer from ONDERDEEL\nwhere onderdeelnummer = '" + db_1.default.fix(wiproductnummer) + "'\n)\nand actievoorraad < 0\nand ifnull(beperkdatumtijd,screendate2date('31-12-2999')) \n> screendate2date('" + widatum + "')";
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 4:
                        _b.crudResult = _d.sent();
                        sqlupdate = "\nupdate PRODUCTVOORRAAD set\nbeperkstatus = '1'\nwhere PRODUCTVOORRAAD.productnummer = '" + db_1.default.fix(wiproductnummer) + "'";
                        _c = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 5:
                        _c.crudResult = _d.sent();
                        _d.label = 6;
                    case 6:
                        irow++;
                        return [3 /*break*/, 3];
                    case 7:
                        result = {
                            items: [
                                { msg: tlregels + " regels bijgewerkt ...", regels: tlregels }
                            ]
                        };
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Voorraad.prototype.getOnderdeelVoorraad = function (req, res, next, productnummer) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sqlOV, rowsOV, irowOV, rowOV;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = '';
                        sqlOV = "\nselect\n'OV' as TYPE,\nPRODUCTVOORRAAD.*,\ndate2screendate(voorraaddatumtijd) as DATUM_OMS,\n(select count(*) from ONDERDEEL where PRODUCTVOORRAAD.productnummer = ONDERDEEL.productnummer and ONDERDEEL.onderdeelnummer != PRODUCTVOORRAAD.productnummer and faktor > 0) as ONDERDELEN\nfrom PRODUCTVOORRAAD\nwhere productnummer = trim('" + productnummer + "')\norder by voorraaddatumtijd, voorraad desc, id";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlOV)];
                    case 1:
                        rowsOV = _a.sent();
                        for (irowOV = 0; irowOV < rowsOV.length; irowOV++) {
                            rowOV = rowsOV[irowOV];
                            result += ",\n";
                            result += JSON.stringify(rowOV);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Voorraad.prototype.beoordeelProduct = function (req, res, next, productnummer) {
        return __awaiter(this, void 0, void 0, function () {
            var tlvoorraad, tltebestellen, swbestellen, bestellen, sqlupdate, aantal, sql, rows, irow, row, _a, _b, _c, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        tlvoorraad = 0;
                        tltebestellen = 0;
                        swbestellen = 0;
                        bestellen = 0;
                        aantal = 0;
                        sql = "\nselect PRODUCTVOORRAAD.*,\ndate2screendate(voorraaddatumtijd) as DATUM_OMS,\n(select count(*) from ONDERDEEL\nwhere PRODUCTVOORRAAD.productnummer = ONDERDEEL.productnummer and ONDERDEEL.onderdeelnummer != PRODUCTVOORRAAD.productnummer and faktor > 0) as ONDERDEEL_ONDERDELEN\nfrom PRODUCTVOORRAAD\nwhere productnummer = trim('" + productnummer + "')\norder by voorraaddatumtijd, voorraad desc";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _e.sent();
                        irow = 0;
                        _e.label = 2;
                    case 2:
                        if (!(irow < rows.length)) return [3 /*break*/, 11];
                        row = rows[irow];
                        aantal = Number(row.VOORRAAD);
                        tlvoorraad = tlvoorraad + aantal;
                        tltebestellen = tltebestellen - aantal;
                        if (!(Number(row.ONDERDEEL_ONDERDELEN) <= 0)) return [3 /*break*/, 4];
                        //
                        // Geen onderdelen, hoeft niet meer verder beoordeeld te worden
                        //			
                        sqlupdate = "\nupdate PRODUCTVOORRAAD set\ntebestellen = 0,\nonderdelen = 0\nwhere id = trim('" + row.ID + "')";
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 3:
                        _a.crudResult = _e.sent();
                        return [3 /*break*/, 10];
                    case 4:
                        if (!(tltebestellen <= 0)) return [3 /*break*/, 6];
                        //
                        // Er is genoeg, hoeft niet meer verder beoordeeld te worden
                        //
                        sqlupdate = "\nupdate PRODUCTVOORRAAD set\ntebestellen = 0,\nonderdelen = '" + row.ONDERDEEL_ONDERDELEN + "'\nwhere id = trim('" + row.ID + "')";
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 5:
                        _b.crudResult = _e.sent();
                        return [3 /*break*/, 10];
                    case 6:
                        //
                        // Pas bestellen als er iets nodig is (VE/OP)
                        // Anders wachten (VRD/BE/BES
                        //
                        if (row.ACTIE == 'VE') {
                            swbestellen = 1;
                        }
                        else if (row.ACTIE == 'OP') {
                            swbestellen = 1;
                        }
                        if (!(swbestellen == 0)) return [3 /*break*/, 8];
                        sqlupdate = "\nupdate PRODUCTVOORRAAD set\ntebestellen = 0,\nonderdelen = '" + row.ONDERDEEL_ONDERDELEN + "'\nwhere id = trim('" + row.ID + "')";
                        _c = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 7:
                        _c.crudResult = _e.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        //
                        // Er is te weinig, het artikel heeft onderdelen en moet opnieuw beoordeeld worden
                        //
                        bestellen = tltebestellen;
                        tltebestellen = 0;
                        sqlupdate = "\nupdate PRODUCTVOORRAAD set\ntebestellen = '" + bestellen + "',\nonderdelen = '" + row.ONDERDEEL_ONDERDELEN + "'\nwhere id = trim('" + row.ID + "')";
                        _d = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 9:
                        _d.crudResult = _e.sent();
                        _e.label = 10;
                    case 10:
                        irow++;
                        return [3 /*break*/, 2];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    Voorraad.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var productnummer, soort, lijn, klant, datum, like, result, sql, sql99, where, _a, rows, wiproductnummer, swfirst, tlart, irow, row, rows99, sqlO1, rowsO1, irowO1, rowO1, _b, sqlO2, rowsO2, irowO2, rowO2, _c, sqlO3, rowsO3, irowO3, rowO3, _d, sqlO4, rowsO4, irowO4, rowO4, _e, sqlO5, rowsO5, irowO5, rowO5, _f, sqlO6, rowsO6, irowO6, rowO6, _g, sql99_1, rows99, irow99, row99;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        productnummer = req.query.productnummer || "";
                        soort = req.query.soort || "";
                        lijn = req.query.lijn || "";
                        klant = req.query.klant || "";
                        datum = req.query.datum || "";
                        like = req.query.like || "";
                        result = "";
                        where = '';
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _h.sent();
                        //
                        sql = "\nselect * from(\nselect 'P' as TYPE,\nPRODUCTVOORRAAD.*,\ngetLijn(PRODUCT.productnummer) as LIJN,\nPRODUCT.SOORT,\nPRODUCT.PRODUCTNAAM,\ndate2screendate(PRODUCTVOORRAAD.initdatumtijd) as INITDATUM_OMS,\ndate2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as DATUM_OMS,\ndate2screendate(PRODUCTVOORRAAD.actiedatumtijd) as ACTIEDATUM_OMS\nfrom PRODUCTVOORRAAD left join PRODUCT \non PRODUCTVOORRAAD.PRODUCTNUMMER = PRODUCT.PRODUCTNUMMER";
                        if (productnummer != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            if (like == '1') {
                                where += "\nucase(PRODUCTVOORRAAD.productnummer) like ucase('" + productnummer + "%')";
                            }
                            else {
                                where += "\nPRODUCTVOORRAAD.productnummer = ('" + productnummer + "')";
                            }
                        }
                        if (String(klant).trim() != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "PRODUCTVOORRAAD.productnummer in (select productnummer from PRODUCTVRAAG where klantnaam = '" + String(klant).trim() + "')";
                        }
                        if (String(soort).substr(0, 1) == 'M') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "PRODUCT.soort = 'M'";
                        }
                        if (String(soort).substr(0, 1) == 'V') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "PRODUCT.soort = 'V'";
                        }
                        if (datum != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\n(\nISNULL(PRODUCTVOORRAAD.voorraaddatumtijd) \nor PRODUCTVOORRAAD.voorraaddatumtijd <= screendate2date('" + datum + "')\n)";
                        }
                        sql += where;
                        sql += ' ) base ';
                        where = "";
                        if (String(lijn).trim() != '') {
                            if (where == '') {
                                where += ' where ';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "base.lijn = '" + String(lijn).trim() + "'";
                        }
                        sql += where;
                        sql += " order by ifnull(lijn,''),productnummer, voorraaddatumtijd, voorraad desc, actieomschrijving, actiedatumtijd, actievoorraad, id";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _h.sent();
                        wiproductnummer = "";
                        swfirst = 1;
                        tlart = 0;
                        result += "[\n";
                        irow = 0;
                        _h.label = 3;
                    case 3:
                        if (!(irow < rows.length)) return [3 /*break*/, 32];
                        row = rows[irow];
                        tlart++;
                        if (!((productnummer != '') && (tlart == 1001))) return [3 /*break*/, 5];
                        sql99 = "\nselect\n'99' as TYPE,\n'Meer dan 1000 producten opgevraagd ...' as MSG\nfrom DUAL";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql99)];
                    case 4:
                        rows99 = _h.sent();
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rows99[0]);
                        return [3 /*break*/, 32];
                    case 5:
                        //
                        //
                        //
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(row);
                        if (!((productnummer != '') && (row.PRODUCTNUMMER != wiproductnummer))) return [3 /*break*/, 31];
                        wiproductnummer = row.PRODUCTNUMMER;
                        sqlO1 = "\nselect\n'O1' as TYPE,\nPRODUCTNUMMER,\ncast(FAKTOR as char) as FAKTOR,\nONDERDEELNUMMER\nfrom ONDERDEEL\nwhere PRODUCTNUMMER = '" + row.PRODUCTNUMMER + "'\nand ONDERDEELNUMMER != '" + row.PRODUCTNUMMER + "'\nand FAKTOR > 0\norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO1)];
                    case 6:
                        rowsO1 = _h.sent();
                        irowO1 = 0;
                        _h.label = 7;
                    case 7:
                        if (!(irowO1 < rowsO1.length)) return [3 /*break*/, 31];
                        rowO1 = rowsO1[irowO1];
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO1);
                        // Voorraadstand onderdeel 1
                        _b = result;
                        return [4 /*yield*/, this.getOnderdeelVoorraad(req, res, next, rowO1.ONDERDEELNUMMER)];
                    case 8:
                        // Voorraadstand onderdeel 1
                        result = _b + _h.sent();
                        sqlO2 = "\nselect\n'O2' as TYPE,\nPRODUCTNUMMER,\ncast(FAKTOR as char) as FAKTOR,\nONDERDEELNUMMER\nfrom ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO1.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER != '" + rowO1.ONDERDEELNUMMER + "'\nand FAKTOR > 0\norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO2)];
                    case 9:
                        rowsO2 = _h.sent();
                        irowO2 = 0;
                        _h.label = 10;
                    case 10:
                        if (!(irowO2 < rowsO2.length)) return [3 /*break*/, 30];
                        rowO2 = rowsO2[irowO2];
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO2);
                        // Voorraadstand onderdeel 2
                        _c = result;
                        return [4 /*yield*/, this.getOnderdeelVoorraad(req, res, next, rowO2.ONDERDEELNUMMER)];
                    case 11:
                        // Voorraadstand onderdeel 2
                        result = _c + _h.sent();
                        sqlO3 = "\nselect\n'O3' as TYPE,\nPRODUCTNUMMER,\ncast(FAKTOR as char) as FAKTOR,\nONDERDEELNUMMER\nfrom ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO2.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER != '" + rowO2.ONDERDEELNUMMER + "'\nand FAKTOR > 0\norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO3)];
                    case 12:
                        rowsO3 = _h.sent();
                        irowO3 = 0;
                        _h.label = 13;
                    case 13:
                        if (!(irowO3 < rowsO3.length)) return [3 /*break*/, 29];
                        rowO3 = rowsO3[irowO3];
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO3);
                        // Voorraadstand onderdeel 3
                        _d = result;
                        return [4 /*yield*/, this.getOnderdeelVoorraad(req, res, next, rowO3.ONDERDEELNUMMER)];
                    case 14:
                        // Voorraadstand onderdeel 3
                        result = _d + _h.sent();
                        sqlO4 = "\nselect\n'O4' as TYPE,\nPRODUCTNUMMER,\ncast(FAKTOR as char) as FAKTOR,\nONDERDEELNUMMER\nfrom ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO3.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER != '" + rowO3.ONDERDEELNUMMER + "'\nand FAKTOR > 0\norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO4)];
                    case 15:
                        rowsO4 = _h.sent();
                        irowO4 = 0;
                        _h.label = 16;
                    case 16:
                        if (!(irowO4 < rowsO4.length)) return [3 /*break*/, 28];
                        rowO4 = rowsO4[irowO4];
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO4);
                        // Voorraadstand onderdeel 4
                        _e = result;
                        return [4 /*yield*/, this.getOnderdeelVoorraad(req, res, next, rowO4.ONDERDEELNUMMER)];
                    case 17:
                        // Voorraadstand onderdeel 4
                        result = _e + _h.sent();
                        sqlO5 = "\nselect\n'O5' as TYPE,\nPRODUCTNUMMER,\ncast(FAKTOR as char) as FAKTOR,\nONDERDEELNUMMER\nfrom ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO4.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER != '" + rowO4.ONDERDEELNUMMER + "'\nand FAKTOR > 0\norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO5)];
                    case 18:
                        rowsO5 = _h.sent();
                        irowO5 = 0;
                        _h.label = 19;
                    case 19:
                        if (!(irowO5 < rowsO5.length)) return [3 /*break*/, 27];
                        rowO5 = rowsO5[irowO5];
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO5);
                        // Voorraadstand onderdeel 5
                        _f = result;
                        return [4 /*yield*/, this.getOnderdeelVoorraad(req, res, next, rowO5.ONDERDEELNUMMER)];
                    case 20:
                        // Voorraadstand onderdeel 5
                        result = _f + _h.sent();
                        sqlO6 = "\nselect\n'O6' as TYPE,\nPRODUCTNUMMER,\ncast(FAKTOR as char) as FAKTOR,\nONDERDEELNUMMER\nfrom ONDERDEEL\nwhere PRODUCTNUMMER = '" + rowO5.ONDERDEELNUMMER + "'\nand ONDERDEELNUMMER != '" + rowO5.ONDERDEELNUMMER + "'\nand FAKTOR > 0\norder by ONDERDEELNUMMER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlO6)];
                    case 21:
                        rowsO6 = _h.sent();
                        irowO6 = 0;
                        _h.label = 22;
                    case 22:
                        if (!(irowO6 < rowsO6.length)) return [3 /*break*/, 26];
                        rowO6 = rowsO6[irowO6];
                        if (swfirst == 1) {
                            swfirst = 0;
                        }
                        else {
                            result += ",\n";
                        }
                        result += JSON.stringify(rowO6);
                        // Voorraadstand onderdeel 6
                        _g = result;
                        return [4 /*yield*/, this.getOnderdeelVoorraad(req, res, next, rowO6.ONDERDEELNUMMER)];
                    case 23:
                        // Voorraadstand onderdeel 6
                        result = _g + _h.sent();
                        sql99_1 = "\nselect\n'99' as TYPE,\n'Onderdeel van Onderdeel probleem' as MSG\nfrom DUAL";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql99_1)];
                    case 24:
                        rows99 = _h.sent();
                        for (irow99 = 0; irow99 < rows99.length; irow99++) {
                            row99 = rows99[irow99];
                            if (swfirst == 1) {
                                swfirst = 0;
                            }
                            else {
                                result += ",\n";
                            }
                            result += JSON.stringify(row99);
                        }
                        return [3 /*break*/, 26];
                    case 25:
                        irowO6++;
                        return [3 /*break*/, 22];
                    case 26:
                        irowO5++;
                        return [3 /*break*/, 19];
                    case 27:
                        irowO4++;
                        return [3 /*break*/, 16];
                    case 28:
                        irowO3++;
                        return [3 /*break*/, 13];
                    case 29:
                        irowO2++;
                        return [3 /*break*/, 10];
                    case 30:
                        irowO1++;
                        return [3 /*break*/, 7];
                    case 31:
                        irow++;
                        return [3 /*break*/, 3];
                    case 32:
                        result += "]\n";
                        //
                        res.crudConnection.release();
                        try {
                            rows = JSON.parse(result);
                        }
                        catch (error) {
                            rows = error;
                        }
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Voorraad.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action;
            return __generator(this, function (_a) {
                method = req.method;
                action = db_1.default.fix(req.query.action || '');
                logger_1.Logger.request(req);
                //
                if (action == "fase0") {
                    this.fase0(req, res, next);
                }
                else if (action == "fase1") {
                    this.fase1(req, res, next);
                }
                else if (action == "fase2") {
                    this.fase2(req, res, next);
                }
                else if (action == "fase3") {
                    this.fase3(req, res, next);
                }
                else if (action == "fase4") {
                    this.fase4(req, res, next);
                }
                else if (method == "GET") {
                    this.doQuery(req, res, next);
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Voorraad;
}());
exports.Voorraad = Voorraad;
//# sourceMappingURL=voorraad.js.map