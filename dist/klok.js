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
var db_1 = __importDefault(require("./db"));
var logger_1 = require("./logger");
var Klok = /** @class */ (function () {
    function Klok() {
        logger_1.Logger.info("Creating Klok");
    }
    Klok.scan = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var gebruiker, bewerkingsnummer, volgnummer, msg, year, month, day, hour, minute, second, scan, naam, productnummer, bewerkingsoort, bewerkingsoortnaam, bewerkingflowid, swinsert, screendatetime, screendatetimestart, screendatetimeeind, connection, sql, rows, row, bonarr, _a, _b, _c, _d, _e, irow, time, _f, _g, _h, _j, _k, result;
            return __generator(this, function (_l) {
                switch (_l.label) {
                    case 0:
                        gebruiker = req.body.gebruiker;
                        bewerkingsnummer = req.body.bewerkingsnummer;
                        volgnummer = req.body.volgnummer;
                        msg = req.body.msg;
                        year = req.body.year;
                        month = req.body.month;
                        day = req.body.day;
                        hour = req.body.hour;
                        minute = req.body.minute;
                        second = req.body.second;
                        scan = '';
                        naam = '';
                        productnummer = '';
                        bewerkingsoort = '';
                        bewerkingsoortnaam = '';
                        bewerkingflowid = '';
                        swinsert = 0;
                        screendatetime = day + "-" + month + "-" + year + " " + hour + ":" + minute;
                        screendatetimestart = day + "-" + month + "-" + year + " 00:00";
                        screendatetimeeind = day + "-" + month + "-" + year + " 23:59";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _l.sent();
                        sql = '';
                        bonarr = msg.split('-');
                        if (!(scan == '')) return [3 /*break*/, 3];
                        if (!(bonarr[0].toUpperCase() == 'U')) return [3 /*break*/, 3];
                        //
                        // Bestaat de gebruiker?
                        //
                        sql = "\nselect * \nfrom GEBRUIKER \nwhere upper(gebruiker) = '" + bonarr[1].toUpperCase() + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _l.sent();
                        if (rows[0]) {
                            row = rows[0];
                            scan = 'gebruiker';
                            gebruiker = row.GEBRUIKER;
                            naam = row.NAAM;
                        }
                        _l.label = 3;
                    case 3:
                        //
                        //
                        //
                        if (scan == '') {
                            if (bonarr[0].toUpperCase() == 'UIT') {
                                scan = 'uit';
                            }
                        }
                        if (!(scan == '')) return [3 /*break*/, 5];
                        if (!(bonarr[0].length == 2
                            && bonarr[0].substr(0, 1).toUpperCase() == 'B')) return [3 /*break*/, 5];
                        if (!(bonarr[1].length >= 1
                            && bonarr[1].length < 9
                            && bonarr[2].length >= 1
                            && bonarr[2].length < 5)) return [3 /*break*/, 5];
                        sql = "\nselect \nBEWERKINGFLOW.ID, \nBEWERKINGFLOW.bewerkingsnummer,\nBEWERKINGFLOW.volgnummer,\nBEWERKING.productnummer,\nBEWERKINGSOORT.bewerkingsoort as bewerkingsoort,\nBEWERKINGSOORT.naam as bewerkingsoortnaam\nfrom BEWERKINGFLOW,BEWERKING,BEWERKINGSOORT\nwhere BEWERKINGFLOW.bewerkingsnummer = '" + bonarr[1] + "'\nand BEWERKINGFLOW.volgnummer = '" + bonarr[2] + "'\nand BEWERKING.bewerkingsnummer = BEWERKINGFLOW.bewerkingsnummer\nand BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 4:
                        rows = _l.sent();
                        if (rows[0]) {
                            row = rows[0];
                            scan = 'bon';
                            bewerkingsnummer = row.BEWERKINGSNUMMER;
                            bewerkingflowid = row.ID;
                            volgnummer = row.VOLGNUMMER;
                            productnummer = row.PRODUCTNUMMER;
                            bewerkingsoort = row.BEWERKINGSOORT;
                            bewerkingsoortnaam = row.BEWERKINGSOORTNAAM;
                        }
                        _l.label = 5;
                    case 5:
                        if (!(scan == '')) return [3 /*break*/, 7];
                        if (!(msg.trim() != '')) return [3 /*break*/, 7];
                        sql = "\nselect * \nfrom GEBRUIKER \nwhere badge1 = '" + msg + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 6:
                        rows = _l.sent();
                        if (rows[0]) {
                            row = rows[0];
                            scan = 'gebruiker';
                            gebruiker = row.GEBRUIKER;
                            naam = row.NAAM;
                        }
                        _l.label = 7;
                    case 7:
                        if (!(scan == '')) return [3 /*break*/, 9];
                        if (!(msg.trim() != '')) return [3 /*break*/, 9];
                        sql = "\nselect * \nfrom GEBRUIKER \nwhere badge2= '" + msg + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 8:
                        rows = _l.sent();
                        if (rows[0]) {
                            row = rows[0];
                            scan = 'gebruiker';
                            gebruiker = row.GEBRUIKER;
                            naam = row.NAAM;
                        }
                        _l.label = 9;
                    case 9:
                        if (!(scan == '')) return [3 /*break*/, 11];
                        sql = "\n        select * \n        from GEBRUIKER \n        where upper(gebruiker) = upper('" + msg + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 10:
                        rows = _l.sent();
                        if (rows[0]) {
                            row = rows[0];
                            scan = 'selectgebruiker';
                            gebruiker = row.GEBRUIKER;
                            naam = row.NAAM;
                        }
                        _l.label = 11;
                    case 11:
                        //
                        //
                        //
                        if (scan == 'selectgebruiker') {
                            bewerkingsnummer = '';
                            volgnummer = '';
                            productnummer = '';
                            bewerkingsoort = '';
                            bewerkingsoortnaam = '';
                        }
                        if (!(scan == 'gebruiker')) return [3 /*break*/, 19];
                        bewerkingsnummer = '';
                        volgnummer = '';
                        productnummer = '';
                        bewerkingsoort = '';
                        bewerkingsoortnaam = '';
                        //
                        // Alle open bewerkings-regels van deze gebruiker afsluiten
                        //
                        sql = "\nupdate BEWERKINGTIJD set\neinddatumtijd = screendatetime2date('" + screendatetime + "')\nwhere gebruiker = '" + gebruiker + "'\nand startdatumtijd >= screendatetime2date('" + screendatetimestart + "')\nand startdatumtijd <= screendatetime2date('" + screendatetimeeind + "')\nand einddatumtijd = screendatetime2date('" + screendatetimestart + "')";
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 12:
                        _a.crudResult = _l.sent();
                        sql = "\nupdate BEWERKINGTIJD set \ntijd= TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)\nwhere gebruiker = '" + gebruiker + "'\nand startdatumtijd >= screendatetime2date('" + screendatetimestart + "')\nand startdatumtijd <= screendatetime2date('" + screendatetimeeind + "')";
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 13:
                        _b.crudResult = _l.sent();
                        //
                        // Is er al een tijdregel voor vandaag
                        //     Vandaag regel open regel toevoegen
                        // of
                        //     Vandaag openen
                        //
                        sql = "\nselect * from BEWERKINGTIJD\nwhere gebruiker = '" + gebruiker + "'\nand startdatumtijd >= screendatetime2date('" + screendatetimestart + "')\nand startdatumtijd <= screendatetime2date('" + screendatetimeeind + "')\nand bewerkingsnummer = 0";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 14:
                        rows = _l.sent();
                        if (!rows[0]) return [3 /*break*/, 17];
                        row = rows[0];
                        sql = "\nupdate BEWERKINGTIJD set\neinddatumtijd = screendatetime2date('" + screendatetime + "'),\nproductnummer = 'in'\nwhere id = '" + row.ID + "'";
                        _c = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 15:
                        _c.crudResult = _l.sent();
                        sql = "\nupdate BEWERKINGTIJD set\ntijd = TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)\nwhere id = '" + row.ID + "'";
                        _d = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 16:
                        _d.crudResult = _l.sent();
                        return [3 /*break*/, 19];
                    case 17:
                        sql = "\ninsert into BEWERKINGTIJD\n(Bewerkingsnummer,Bewerkingflowid,Productnummer,Gebruiker,\nstartdatumtijd,einddatumtijd,tijd)\nvalues (\n'0',\n'0',\n'in',\n'" + gebruiker + "',\nscreendatetime2date('" + screendatetime + "'),\nscreendatetime2date('" + screendatetime + "'),\n'0'\n)";
                        _e = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 18:
                        _e.crudResult = _l.sent();
                        _l.label = 19;
                    case 19:
                        if (!(scan == 'bon')) return [3 /*break*/, 28];
                        if (!(gebruiker == '')) return [3 /*break*/, 20];
                        bewerkingsnummer = '';
                        volgnummer = '';
                        productnummer = '';
                        bewerkingsoort = '';
                        bewerkingsoortnaam = '';
                        return [3 /*break*/, 28];
                    case 20:
                        swinsert = 1;
                        sql = "\nselect * from BEWERKINGTIJD\nwhere gebruiker = '" + gebruiker + "'\nand startdatumtijd >= screendatetime2date('" + screendatetimestart + "')\nand startdatumtijd <= screendatetime2date('" + screendatetimeeind + "')\norder by startdatumtijd desc";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 21:
                        rows = _l.sent();
                        irow = 0;
                        _l.label = 22;
                    case 22:
                        if (!(irow < rows.lenght)) return [3 /*break*/, 25];
                        row = rows[irow];
                        if (!(row.BEWERKINGFLOWID == bewerkingflowid)) return [3 /*break*/, 24];
                        time = (hour * 60 + minute)
                            - Number(row.EINDDATUMTIJD.substr(11, 2)) * 60
                            + Number(row.EINDDATUMTIJD.substr(14, 2));
                        if (!((row.EINDDATUMTIJD == year + '-' + month + '-' + day + ' ' + '00:00:00')
                            || (time < 5))) return [3 /*break*/, 24];
                        swinsert = 0;
                        sql = "\nupdate BEWERKINGTIJD set\neinddatumtijd = screendatetime2date('" + screendatetimestart + "')\nwhere id = '" + row.ID + "'";
                        _f = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 23:
                        _f.crudResult = _l.sent();
                        _l.label = 24;
                    case 24:
                        irow++;
                        return [3 /*break*/, 22];
                    case 25:
                        if (!(swinsert == 1)) return [3 /*break*/, 27];
                        sql = "\ninsert into BEWERKINGTIJD\n(Bewerkingsnummer,Bewerkingsoort,Bewerkingflowid,Productnummer,Gebruiker,\nstartdatumtijd,einddatumtijd,tijd)\nvalues (\n'" + bewerkingsnummer + "',\n'" + bewerkingsoort + "',\n'" + bewerkingflowid + "',\n'" + productnummer + "',\n'" + gebruiker + "',\nscreendatetime2date('" + screendatetime + "'),\nscreendatetime2date('" + screendatetimestart + "'),\n'0'\n)";
                        _g = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 26:
                        _g.crudResult = _l.sent();
                        _l.label = 27;
                    case 27:
                        gebruiker = '';
                        naam = '';
                        _l.label = 28;
                    case 28:
                        if (!(scan == 'uit')) return [3 /*break*/, 33];
                        if (!(gebruiker == '')) return [3 /*break*/, 29];
                        bewerkingsnummer = '';
                        volgnummer = '';
                        productnummer = '';
                        bewerkingsoort = '';
                        bewerkingsoortnaam = '';
                        return [3 /*break*/, 33];
                    case 29:
                        //
                        // Alle open bewerkings-regels van deze gebruiker afsluiten
                        //
                        sql = "\nupdate BEWERKINGTIJD set \neinddatumtijd = screendatetime2date('" + screendatetime + "')\nwhere gebruiker = '" + gebruiker + "'\nand startdatumtijd >= screendatetime2date('" + screendatetimestart + "')\nand startdatumtijd <= screendatetime2date('" + screendatetimeeind + "')\nand einddatumtijd = screendatetime2date('" + screendatetimestart + "')";
                        _h = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 30:
                        _h.crudResult = _l.sent();
                        sql = "\nupdate BEWERKINGTIJD set\ntijd = TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)\nwhere gebruiker = '" + gebruiker + "'\nand startdatumtijd >= screendatetime2date('" + screendatetimestart + "')\nand startdatumtijd <= screendatetime2date('" + screendatetimeeind + "')";
                        _j = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 31:
                        _j.crudResult = _l.sent();
                        //
                        // De tijdregel op uit zetten
                        //
                        sql = "\nupdate BEWERKINGTIJD set\nproductnummer = 'uit'\nwhere gebruiker = '" + gebruiker + "'\nand startdatumtijd >= screendatetime2date('" + screendatetimestart + "')\nand startdatumtijd <= screendatetime2date('" + screendatetimeeind + "')\nand bewerkingsnummer = '0'";
                        _k = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 32:
                        _k.crudResult = _l.sent();
                        _l.label = 33;
                    case 33:
                        result = {
                            items: [
                                {
                                    msg: msg,
                                    SCAN: scan,
                                    GEBRUIKER: gebruiker,
                                    NAAM: naam,
                                    BEWERKINGSNUMMER: bewerkingsnummer,
                                    VOLGNUMMER: volgnummer,
                                    PRODUCTNUMMER: productnummer,
                                    BEWERKINGSOORT: bewerkingsoort,
                                    BEWERKINGSOORTNAAM: bewerkingsoortnaam
                                }
                            ]
                        };
                        connection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Klok;
}());
exports.Klok = Klok;
//# sourceMappingURL=klok.js.map