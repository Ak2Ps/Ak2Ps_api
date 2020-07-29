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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Bestellingkoprap = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var fs = __importStar(require("fs"));
var config_1 = require("../config");
//
var dict = {
    table: "BESTELLING",
    key: [
        {
            body: "LEVERANCIERNUMMER",
            sql: "LEVERANCIERNUMMER",
        },
        {
            body: "BESTELNUMMER",
            sql: "BESTELNUMMER",
        },
        {
            body: "REGELNUMMER",
            sql: "REGELNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "PRODUCTNUMMER",
        where: [
            {
                query: "value",
                sql: "ucase(PRODUCTNUMMER) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "leveranciernummer,bestelnummer,productnummer,startdatumtijd",
        where: [],
        fields: [],
    },
    update: {
        fields: [],
    },
};
var Bestellingkoprap = /** @class */ (function (_super) {
    __extends(Bestellingkoprap, _super);
    function Bestellingkoprap() {
        var _this = _super.call(this, dict) || this;
        _this.info = '';
        _this.msg = '';
        _this.html = '';
        _this.script = '';
        _this.defs = '';
        return _this;
    }
    Bestellingkoprap.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var bestelnummer, row, rowlev, rowreg, rowproduct, swfound, sqlupdate, sql, _a, rows, sqllev, rowslev, filename, targetdir, targeturl, sqlreg, rowsreg, irowreg, sqlproduct, rowsproduct, sqlcommentaar, rowscommentaar, icommentaar, rowcommentaar, sqlpick, rowspick, irowpick, rowpick, sqlonderdeel, rowsonderdeel, irowonderdeel, rowonderdeel, irowpick, rowpick, sqlproduct, rowsproduct, thisHandtekening;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        bestelnummer = req.query.bestelnummer;
                        row = {};
                        rowlev = {};
                        rowreg = {};
                        rowproduct = {};
                        swfound = 0;
                        sql = "\nselect *,\ndate2screendate(startdatumtijd) as STARTDATUM,\ncase when producten <= 1 then productnummer\nelse '...'\nend as PRODUCTNUMMER,\ncase when besteldatumtijden <= 1 then date2screendate(besteldatumtijd)\nelse '...'\nend as BESTELDATUM,\nmin(productnummer) as min_prod,\ndate2screendate(geprintdatumtijd) as GEPRINTDATUM,\ndate2screendate(gepickeddatumtijd) as GEPICKEDDATUM,\ndate2screendate(verzondendatumtijd) as VERZONDENDATUM,\ndate2screendate(ontvangendatumtijd) as ONTVANGENDATUM,\ngetHandtekening(contactpersoon) as handtekening\nfrom (\nselect \nbestelnummer,\nmin(startdatumtijd) as startdatumtijd,\nmin(besteldatumtijd) as besteldatumtijd,\ncount(distinct(besteldatumtijd)) as besteldatumtijden,\nmin(geprintdatumtijd) as geprintdatumtijd,\nmin(gepickeddatumtijd) as gepickeddatumtijd,\nmin(verzondendatumtijd) as verzondendatumtijd,\nmin(ontvangendatumtijd) as ontvangendatumtijd,\nmin(productnummer) as productnummer,\nmin(leverancierproductnummer) as leverancierproductnummer,\ncount(distinct(productnummer)) as producten,\nsum(bestelling) as bestelling,\nmin(contactpersoon) as contactpersoon,\nmin(leveranciernummer) as leveranciernummer\nfrom BESTELLING group by bestelnummer) BASE\nwhere bestelnummer = '" + bestelnummer + "'\norder by leveranciernummer,bestelnummer,productnummer,besteldatumtijd;";
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        if (!rows[0]) return [3 /*break*/, 4];
                        row = rows[0];
                        sqllev = "\nselect * \nfrom LEVERANCIER \nwhere leveranciernummer = '" + row.LEVERANCIERNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqllev)];
                    case 3:
                        rowslev = _b.sent();
                        if (rowslev[0]) {
                            rowlev = rowslev[0];
                        }
                        _b.label = 4;
                    case 4:
                        filename = '';
                        targetdir = config_1.Config.bestellingendir;
                        targeturl = "toolbox.php?action=showpdf&filename=" + targetdir;
                        try {
                            fs.mkdirSync(targetdir);
                        }
                        catch (error) {
                        }
                        if (rowlev.ZOEKCODE == '') {
                            targetdir += ('/' + util_1.Util.constructFilename(rowlev.LEVERANCIERNUMMER));
                            targeturl += ('/' + util_1.Util.constructFilename(rowlev.LEVERANCIERNUMMER));
                        }
                        else {
                            targetdir += ('/' + util_1.Util.constructFilename(rowlev.ZOEKCODE + '_' + rowlev.LEVERANCIERNUMMER));
                            targeturl += ('/' + util_1.Util.constructFilename(rowlev.ZOEKCODE + '_' + rowlev.LEVERANCIERNUMMER));
                        }
                        try {
                            fs.mkdirSync(targetdir);
                        }
                        catch (error) {
                        }
                        targetdir += ('/' + util_1.Util.constructFilename(bestelnummer + '_' + row.MIN_PROD));
                        targeturl += ('/' + util_1.Util.constructFilename(bestelnummer + '_' + row.MIN_PROD));
                        try {
                            fs.mkdirSync(targetdir);
                        }
                        catch (error) {
                        }
                        //
                        filename = targetdir + "/" + util_1.Util.constructFilename(bestelnummer + "_bestelling.pdf");
                        targeturl += "/" + util_1.Util.constructFilename(bestelnummer + "_bestelling.pdf");
                        this.html = '';
                        this.html += ('<div style="height:7em;">');
                        this.html += ('<table class="t">');
                        this.html += ('<tr>');
                        this.html += ('<td class="leftmargin">&nbsp;</td>');
                        this.html += ('<td class="leftmargin">&nbsp;</td>');
                        this.html += ('<td>');
                        this.html += (rowlev.NAAM);
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        if (rowlev.CONTACT != '') {
                            this.html += ('<tr>');
                            this.html += ('<td></td>');
                            this.html += ('<td></td>');
                            this.html += ('<td>');
                            this.html += (rowlev.CONTACT);
                            this.html += ('</td>');
                            this.html += ('</tr>');
                        }
                        this.html += ('<tr>');
                        this.html += ('<td></td>');
                        this.html += ('<td></td>');
                        this.html += ('<td>');
                        this.html += (rowlev.ADRES);
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        this.html += ('<tr>');
                        this.html += ('<td></td>');
                        this.html += ('<td></td>');
                        this.html += ('<td>');
                        if (rowlev.POSTCODE != '') {
                            this.html += (rowlev.POSTCODE);
                            this.html += ('&nbsp;');
                        }
                        this.html += (rowlev.WOONPLAATS);
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        if (rowlev.LAND != '') {
                            this.html += ('<tr>');
                            this.html += ('<td></td>');
                            this.html += ('<td></td>');
                            this.html += ('<td>');
                            this.html += (rowlev.LAND);
                            this.html += ('</td>');
                            this.html += ('</tr>');
                        }
                        if (rowlev.FAX != '') {
                            this.html += ('<tr>');
                            this.html += ('<td></td>');
                            this.html += ('<td></td>');
                            this.html += ('<td>');
                            this.html += ('<b>Fax nr:</b> &nbsp;&nbsp;&nbsp;&nbsp;' + rowlev.FAX);
                            this.html += ('</td>');
                            this.html += ('</tr>');
                        }
                        if (rowlev.EMAIL != '') {
                            this.html += ('<tr>');
                            this.html += ('<td></td>');
                            this.html += ('<td></td>');
                            this.html += ('<td>');
                            this.html += ('<b>E Mail</b> &nbsp;&nbsp;&nbsp;&nbsp;' + rowlev.EMAIL);
                            this.html += ('</td>');
                            this.html += ('</tr>');
                        }
                        this.html += ('</table>');
                        this.html += ('</div>');
                        this.html += ('<div style="height:3em;">');
                        this.html += ('<table class="t">');
                        this.html += ('<tr>');
                        this.html += ('<td class="leftmargin">&nbsp;</td>');
                        this.html += ('<td style="width:37em">');
                        this.html += ('<b>PURCHASE ORDER: &nbsp;&nbsp;&nbsp;&nbsp;** </b>' + row.BESTELNUMMER + ' / ');
                        if (config_1.Config.app == 'T') {
                            this.html += ('Sensors');
                        }
                        else if (config_1.Config.app == 'C') {
                            this.html += ('Controls');
                        }
                        else {
                            this.html += ('???? ' + config_1.Config.app + ' ????');
                        }
                        this.html += ('<b> **</b>');
                        this.html += ('</td>');
                        this.html += ('<td style="width:17em;text-align:right">');
                        this.html += ('<b>Date: </b>' + row.STARTDATUM);
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        this.html += ('<tr>');
                        this.html += ('<td></td>');
                        this.html += ('<td>');
                        this.html += ('<b>OUR V.A.T. Id.Nr:&nbsp;&nbsp;&nbsp;&nbsp; </b>NL.8079.974.19.B01');
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        this.html += ('</table>');
                        this.html += ('</div>');
                        if (Number(req.query.copy) == 1) {
                            this.html += ('<div style="height:30em;background-image: url(images/Copy_watermark.gif);">');
                        }
                        else {
                            this.html += ('<div style="height:30em;">');
                        }
                        this.html += ('<div>');
                        // regels:
                        this.html += ('<table class="t">');
                        this.html += ('<tr>');
                        this.html += ('<td class="leftmargin">&nbsp;</td>');
                        this.html += ('<td style="width:5em;"><b>Quantity</b></td>');
                        this.html += ('<td style="width:10em"><b>Your art.no.</b></td>');
                        this.html += ('<td style="width:10em"><b>Our art.no.</b></td>');
                        this.html += ('<td style="width:20em"><b>Description</b></td>');
                        this.html += ('<td style="width:8em;text-align:right"><b>Delivery</b></td>');
                        this.html += ('</tr>');
                        this.html += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td><td><hr></td></tr>');
                        sqlreg = " \n            select *,\ndate2screendate(besteldatumtijd) as BESTELDATUM\nfrom BESTELLING\nwhere bestelnummer = '" + bestelnummer + "'\norder by besteldatumtijd, productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlreg)];
                    case 5:
                        rowsreg = _b.sent();
                        irowreg = 0;
                        _b.label = 6;
                    case 6:
                        if (!(irowreg < rowsreg.length)) return [3 /*break*/, 10];
                        rowreg = rowsreg[irowreg];
                        sqlproduct = " \nselect *\nfrom PRODUCT\nwhere productnummer = '" + rowreg.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproduct)];
                    case 7:
                        rowsproduct = _b.sent();
                        if (!rowsproduct[0]) {
                            rowproduct = {};
                            rowproduct.PRODUCTNAAM = '???';
                        }
                        else {
                            rowproduct = rowsproduct[0];
                        }
                        this.html += ('<tr>');
                        this.html += ('<td></td>');
                        this.html += ('<td style="text-align:right;padding:0px 10px 0px 0px;">' + rowreg.BESTELLING + '</td>');
                        this.html += ('<td>' + rowreg.LEVERANCIERPRODUCTNUMMER + '</td>');
                        this.html += ('<td>' + rowreg.PRODUCTNUMMER + '</td>');
                        this.html += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
                        this.html += ('<td style="text-align:right;">' + rowreg.BESTELDATUM + '</td>');
                        this.html += ('</tr>');
                        sqlcommentaar = "\nselect *\nfrom BESTELLINGCOMMENTAAR\nwhere bestellingid = '" + rowreg.ID + "'\norder by regelnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlcommentaar)];
                    case 8:
                        rowscommentaar = _b.sent();
                        for (icommentaar = 0; icommentaar < rowscommentaar.length; icommentaar++) {
                            rowcommentaar = rowscommentaar[icommentaar];
                            this.html += ('<tr>');
                            this.html += ('<td></td>');
                            this.html += ('<td></td>');
                            this.html += ('<td></td>');
                            this.html += ('<td></td>');
                            this.html += ('<td>' + rowcommentaar.COMMENTAAR + '</td>');
                            this.html += ('<td></td>');
                            this.html += ('</tr>');
                        }
                        _b.label = 9;
                    case 9:
                        irowreg++;
                        return [3 /*break*/, 6];
                    case 10:
                        this.html += ('</table>');
                        this.html += ('</div>');
                        this.html += ('<div>');
                        //Picklijst
                        sqlupdate = "\nupdate BESTELLINGPICK \nset status = 'OLD' \nwhere bestelnummer = '" + bestelnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 11:
                        _b.sent();
                        sqlpick = "\nselect\nbestelnummer,\nsum(bestelling) as BESTELLING,\nproductnummer\nfrom BESTELLING\nwhere bestelnummer = '" + bestelnummer + "'\ngroup by productnummer\norder by productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlpick)];
                    case 12:
                        rowspick = _b.sent();
                        irowpick = 0;
                        _b.label = 13;
                    case 13:
                        if (!(irowpick < rowspick.length)) return [3 /*break*/, 20];
                        rowpick = rowspick[irowpick];
                        sqlonderdeel = "\nselect *\nfrom ONDERDEEL\nwhere productnummer = '" + rowpick.PRODUCTNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlonderdeel)];
                    case 14:
                        rowsonderdeel = _b.sent();
                        irowonderdeel = 0;
                        _b.label = 15;
                    case 15:
                        if (!(irowonderdeel < rowsonderdeel.length)) return [3 /*break*/, 19];
                        rowonderdeel = rowsonderdeel[irowonderdeel];
                        sqlupdate = "\ninsert into BESTELLINGPICK (status,bestelnummer,productnummer,onderdeelnummer) \nselect\n'NEW',\n'" + rowpick.BESTELNUMMER + "',\n'" + rowpick.PRODUCTNUMMER + "',\n'" + rowonderdeel.ONDERDEELNUMMER + "'\nfrom DUAL\nwhere not exists (select 1 from BESTELLINGPICK\nwhere bestelnummer =  '" + rowpick.BESTELNUMMER + "'\nand productnummer = '" + rowpick.PRODUCTNUMMER + "'\nand onderdeelnummer = '" + rowonderdeel.ONDERDEELNUMMER + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 16:
                        _b.sent();
                        //
                        sqlupdate = "\nupdate BESTELLINGPICK set\nstatus = 'NEW',\nbestelling = '" + rowpick.BESTELLING + "',\nfaktor = '" + rowonderdeel.FAKTOR + "'\nwhere bestelnummer =  '" + rowpick.BESTELNUMMER + "'\nand productnummer = '" + rowpick.PRODUCTNUMMER + "'\nand onderdeelnummer = '" + rowonderdeel.ONDERDEELNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 17:
                        _b.sent();
                        _b.label = 18;
                    case 18:
                        irowonderdeel++;
                        return [3 /*break*/, 15];
                    case 19:
                        irowpick++;
                        return [3 /*break*/, 13];
                    case 20:
                        swfound = 0;
                        sqlupdate = "\ndelete from  BESTELLINGPICK \nwhere status = 'OLD'\nand bestelnummer = '" + bestelnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 21:
                        _b.sent();
                        sqlpick = "\nselect \nround(sum(faktor * bestelling)) as aantal,\nonderdeelnummer\nfrom BESTELLINGPICK\nwhere bestelnummer = '" + bestelnummer + "'\ngroup by onderdeelnummer\nhaving round(sum(faktor * bestelling)) > 0\norder by onderdeelnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlpick)];
                    case 22:
                        rowspick = _b.sent();
                        irowpick = 0;
                        _b.label = 23;
                    case 23:
                        if (!(irowpick < rowspick.length)) return [3 /*break*/, 26];
                        rowpick = rowspick[irowpick];
                        if (swfound == 0) {
                            swfound = 1;
                            this.html += ('<table class="t">');
                            this.html += ('<tr>');
                            this.html += ('<td class="leftmargin"></td>');
                            this.html += ('<td style="width:10em;">&nbsp;</td>');
                            this.html += ('<td style="width:20em"></td>');
                            this.html += ('<td style="width:10em;text-align:right;"></td>');
                            this.html += ('<td style="width:10em;text-align:right;"></td>');
                            this.html += ('<td style="width:10em;text-align:right;"></td>');
                            this.html += ('</tr>');
                            this.html += ('<tr>');
                            this.html += ('<td class="leftmargin"></td>');
                            this.html += ('<td><b>SUPPLIED PARTS</b></td>');
                            this.html += ('<td></td>');
                            this.html += ('<td style="text-align:right;"></td>');
                            this.html += ('<td style="text-align:right;"></td>');
                            this.html += ('<td style="text-align:right;"></td>');
                            this.html += ('</tr>');
                            this.html += ('<tr>');
                            this.html += ('<td></td>');
                            this.html += ('<td><b>Part</b></td>');
                            this.html += ('<td><b>Description</b></td>');
                            this.html += ('<td style="text-align:right;"><b>Amount</b></td>');
                            this.html += ('<td style="text-align:right;"></td>');
                            this.html += ('<td style="text-align:right;"></td>');
                            this.html += ('</tr>');
                            this.html += ('<tr><td></td><td><hr></td><td><hr></td><td><hr></td></tr>');
                        }
                        sqlproduct = "\nselect *\nfrom PRODUCT\nwhere productnummer = '" + rowpick.ONDERDEELNUMMER + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlproduct)];
                    case 24:
                        rowsproduct = _b.sent();
                        if (rowsproduct[0]) {
                            rowproduct = rowsproduct[0];
                        }
                        else {
                            rowproduct.PRODUCTNAAM = '???';
                        }
                        this.html += ('<tr>');
                        this.html += ('<td >&nbsp;</td>');
                        this.html += ('<td>' + rowpick.ONDERDEELNUMMER + '</td>');
                        this.html += ('<td>' + rowproduct.PRODUCTNAAM + '</td>');
                        this.html += ('<td style="text-align:right;">' + rowpick.AANTAL + '</td>');
                        this.html += ('<td style="text-align:right;"></td>');
                        this.html += ('<td style="text-align:right;"></td>');
                        this.html += ('</tr>');
                        _b.label = 25;
                    case 25:
                        irowpick++;
                        return [3 /*break*/, 23];
                    case 26:
                        if (swfound == 1) {
                            this.html += ('</table>');
                        }
                        this.html += ('</div>');
                        this.html += ('</div>');
                        this.html += ('<div style="height:5em">');
                        //Footer
                        this.html += ('<table class="t">');
                        this.html += ('<tr>');
                        this.html += ('<td class="leftmargin"></td>');
                        this.html += ('<td style="width:40em">');
                        this.html += ('<b>DEALT BY:</b>&nbsp;&nbsp;&nbsp;&nbsp; ' + row.CONTACTPERSOON);
                        this.html += ('</td>');
                        this.html += ('<td rowspan="2" style="height:6em;width:18em">');
                        thisHandtekening = '&nbsp;';
                        if (row.HANDTEKENING != '') {
                            thisHandtekening = "<img src=\"" + row.HANDTEKENING + "\" style=\"height:6em;width:18em\"></img>";
                        }
                        this.html += thisHandtekening;
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        this.html += ('<tr>');
                        this.html += ('<td></td>');
                        this.html += ('<td>');
                        this.html += ('PLEASE CONFIRM WITHIN 5 DAYS.');
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        this.html += ('</table>');
                        this.html += ('</div>');
                        this.html += ('<div style="height:3em">');
                        this.html += ('<table class="t">');
                        this.html += ('<tr>');
                        this.html += ('<td class="leftmargin">&nbsp;</td>');
                        this.html += ('<td style="width:20em">');
                        this.html += ('<b>INVOICE TO :</b> TASSERON BV');
                        this.html += ('</td>');
                        this.html += ('<td style="width:20em">&nbsp;</td>');
                        this.html += ('<td style="width:20em">');
                        this.html += ('<b>GOODS TO :</b> TASSERON BV');
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        this.html += ('<td>&nbsp;</td>');
                        this.html += ('<td>');
                        this.html += ('AMBACHTSHOF 50');
                        this.html += ('</td>');
                        this.html += ('<td>&nbsp;</td>');
                        this.html += ('<td>');
                        this.html += ('AMBACHTSHOF 50');
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        this.html += ('<td>&nbsp;</td>');
                        this.html += ('<td>');
                        this.html += ('NL-2632 BB NOOTDORP');
                        this.html += ('</td>');
                        this.html += ('<td>&nbsp;</td>');
                        this.html += ('<td>');
                        this.html += ('NL-2632 BB NOOTDORP');
                        this.html += ('</td>');
                        this.html += ('</tr>');
                        this.html += ('</table>');
                        this.html += ('</div>');
                        this.defs = '<div style="display:none">'
                            + '<div id="thisFilename">' + filename + '</div>'
                            + '<div id="thisDir">' + targetdir + '</div>'
                            + '<div id="thisUrl">' + targeturl + '</div>'
                            + '<div id="thisApp">' + config_1.Config.app + '</div>'
                            + '<div id="thisBestelnummer">' + row.BESTELNUMMER + '</div>'
                            + '</div>';
                        this.script = "\n"
                            + '<script>thisFilename="' + filename + '";thisDir="' + targetdir + '";thisUrl="' + targeturl +
                            '";</script>';
                        //
                        this.info = "{\n\"thisFilename\":\"" + filename + "\",\n\"thisDir\":\"" + targetdir + "\",\n\"thisUrl\":\"" + targeturl + "\",\n\"thisApp\":\"" + config_1.Config.app + "\",\n\"thisBestelnummer\":\"" + row.BESTELNUMMER + "\"\n}";
                        return [2 /*return*/];
                }
            });
        });
    };
    Bestellingkoprap.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = req.method;
                        action = db_1.default.fix(req.query.action || '');
                        result = '';
                        //
                        logger_1.Logger.request(req);
                        if (!(action == "getinfo")) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.doQuery(req, res, next, this.dict)];
                    case 1:
                        _a.sent();
                        result = this.info;
                        res.status(200).send(result);
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(action == "getpage")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.doQuery(req, res, next, this.dict)];
                    case 3:
                        _a.sent();
                        result = this.msg + this.html;
                        res.status(200).send(result);
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.doQuery(req, res, next, this.dict)];
                    case 5:
                        _a.sent();
                        result = this.msg + this.html + this.script + this.defs;
                        res.status(200).send(result);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Bestellingkoprap;
}(crud_1.Crud));
exports.Bestellingkoprap = Bestellingkoprap;
//# sourceMappingURL=bestellingkoprap.js.map