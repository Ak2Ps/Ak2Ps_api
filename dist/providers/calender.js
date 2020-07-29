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
var Calender = /** @class */ (function () {
    function Calender() {
        logger_1.Logger.info("Creating Calender");
    }
    Calender.prototype.getDatumSql = function (vanaf, tm) {
        // vanaf,tm zijn YYYY-MM-DD
        var sql = '';
        sql = "\nselect \nselected_date as datum, \ndate2screendate(selected_date) as datum_oms,\nDAYOFWEEK(selected_date) as dag , \nWEEKOFYEAR(selected_date) as week from\n(\nselect adddate('1970-01-01',t4.i*10000 + t3.i*1000 + t2.i*100 + t1.i*10 + t0.i) selected_date\nfrom\n(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t0,\n(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t1,\n(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t2,\n(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t3,\n(select 0 i union select 1 union select 2 union select 3 union select 4 union select 5 union select 6 union select 7 union select 8 union select 9) t4\n) v\nwhere selected_date >= '" + vanaf + "'\nand selected_date <= '" + tm + "'";
        return sql;
    };
    Calender.prototype.getDagOms = function (dag) {
        var result = '?';
        if (dag == 2) {
            result = "ma";
        }
        else if (dag == 3) {
            result = "di";
        }
        else if (dag == 4) {
            result = "wo";
        }
        else if (dag == 5) {
            result = "do";
        }
        else if (dag == 6) {
            result = "vr";
        }
        else if (dag == 7) {
            result = "za";
        }
        else if (dag == 1) {
            result = "zo";
        }
        return result;
    };
    Calender.prototype.getColumns = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, result, header, field, row, vanaf, tm, _a, rows, irow, jsonresult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = '';
                        header = '';
                        field = '';
                        vanaf = String(req.query.vanaf || "2000-01-01");
                        tm = String(req.query.tm || "2999-12-31");
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        //
                        sql = this.getDatumSql(vanaf, tm);
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        result += '[';
                        result += "{";
                        header = "GEBRUIKER";
                        result += "\"HEADER\": \"" + header + "\"";
                        field = "GEBRUIKER";
                        result += ",\"FIELD\":\"" + field + "\"";
                        result += "}";
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            result += ",{";
                            header = this.getDagOms(row.DAG) + ' ' + row.DATUM_OMS;
                            result += "\"HEADER\":\"" + header + "\"";
                            field = "COLUMN_" + row.DATUM + "_DATUM";
                            result += ",\"FIELD\":\"" + field + "\"";
                            result += "}";
                            result += ",{";
                            header = "TOTTIJD";
                            result += "\"HEADER\":\"" + header + "\"";
                            field = "COLUMN_" + row.DATUM + "_TOTTIJD";
                            result += ",\"FIELD\":\"" + field + "\"";
                            result += "}";
                            result += ",{";
                            header = this.getDagOms(row.DAG) + ' ' + row.DATUM_OMS;
                            result += "\"HEADER\":\"" + header + "\"";
                            field = "COLUMN_" + row.DATUM + "_DAG";
                            result += ",\"FIELD\":\"" + field + "\"";
                            result += "}";
                            if (row.DAG == 1) {
                                header = "Week";
                                result += ",{\"HEADER\":\"" + header + "\"";
                                field = "COLUMN_" + row.DATUM + "_DATUM_WEEK";
                                result += ",\"FIELD\":\"" + field + "\"";
                                result += "}";
                                result += ",{";
                                header = "TOTTIJD";
                                result += "\"HEADER\":\"" + header + "\"";
                                field = "COLUMN_" + row.DATUM + "_TOTTIJD_WEEK";
                                result += ",\"FIELD\":\"" + field + "\"";
                                result += "}";
                                result += ",{";
                                header = "Week " + row.WEEK;
                                result += "\"HEADER\":\"" + header + "\"";
                                field = "COLUMN_" + row.DATUM + "_DAG_WEEK";
                                result += ",\"FIELD\":\"" + field + "\"";
                                result += "}";
                            }
                        }
                        result += ']';
                        jsonresult = [];
                        try {
                            jsonresult = JSON.parse(result);
                        }
                        catch (error) {
                            logger_1.Logger.error(req, error);
                            logger_1.Logger.error(req, result);
                            jsonresult = [];
                        }
                        //
                        //
                        res.crudConnection.release();
                        res.status(200).send(jsonresult);
                        return [2 /*return*/];
                }
            });
        });
    };
    Calender.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sqldatum, row, result, tottijd, swfirstrow, wigebruiker, key, val, inuittijd, bontijd, plantijd, pauzetijd, column, vanaf, tm, gebruiker, afdeling, _a, rows, irow, jsonresult;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = '';
                        tottijd = 0;
                        swfirstrow = 0;
                        wigebruiker = '';
                        key = "";
                        val = '';
                        inuittijd = 0;
                        bontijd = 0;
                        plantijd = 0;
                        pauzetijd = 0;
                        column = '';
                        vanaf = String(req.query.vanaf || "2000-01-01");
                        tm = String(req.query.tm || "2999-12-31");
                        gebruiker = req.query.gebruiker || "";
                        afdeling = req.query.afdeling || "";
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        //
                        sqldatum = this.getDatumSql(vanaf, tm);
                        //
                        sql = "\nselect\ngebruiker,\ndatum,\ndayofweek(datum) as dagnummer,\nweekofyear(datum) as weeknummer,\nsum(inuittijd) as inuittijd,\nsum(bontijd) as bontijd,\nsum(plantijd) as plantijd,\nsum(pauzetijd) as pauzetijd,\nconcat('<table class=\"caldata_table\">',\ngroup_concat(\ncase\nwhen soort = 'TIJD' then \ncase when productnummer = 'in' OR productnummer = 'uit' then\nconcat('<tr class=\"caldata_tr\">',\n'<td class=\"caldata_type\">inuit</td>',\n'<td class=\"caldata_start\">', start,'-', eind,'</td>',\n'<td class=\"caldata_tijd\"> (', inuittijd, ')</td></tr>')\nelse\nconcat('<tr class=\"caldata_tr\">',\n'<td  class=\"caldata_type\">bon</td>',\n'<td class=\"caldata_start\">', start,'-', eind, ' </td>',\n'<td class=\"caldata_tijd\">(', bontijd, ')</td>',\n'<td class=\"caldata_productnummer\">', productnummer, '</td>',\n'<td class=\"caldata_bon\">' , bewerkingsnummer, '-', bewerkingsoort, '</td></tr>')\nend\nwhen soort = 'DATUM' then\n''\nwhen soort = 'PLAN' then\nconcat('<tr class=\"caldata_tr\">',\n'<td class=\"caldata_type\">plan</td>',\n'<td class=\"caldata_start\">', start,'-', eind,'</td>',\n'<td class=\"caldata_tijd\">(', plantijd, '-' , pauzetijd, ')',\n'<td class=\"caldata_productnummer\">', productnummer, '</td>',\n'</td></tr>')\nend\norder by start asc, eind asc, bewerkingsnummer\nseparator ''\n),\n'</table>')\nas dag\nfrom\n(select\n'DATUM' as soort,\nb.gebruiker,\na.datum,\n'' as start,\n'' as eind,\n'' as bewerkingsnummer,\n'' as productnummer,\n'' as bewerkingsoort,\n0 as inuittijd,\n0 as bontijd,\n0 as plantijd,\n0 as pauzetijd\nfrom\n(" + sqldatum + ") a,\ngebruiker b\nwhere b.aktief = 1";
                        //
                        if (afdeling != '') {
                            sql += "\nand b.afdeling = '" + afdeling + "'";
                        }
                        if (gebruiker != '') {
                            sql += "\nand b.gebruiker = '" + gebruiker + "'";
                        }
                        //
                        // gebruikertijd
                        //
                        sql += "\nunion\nselect\n'TIJD' as soort,\nc.gebruiker,\ndate(c.startdatumtijd) as datum,\ndate2screentime(c.startdatumtijd) as start,\ndate2screentime(c.einddatumtijd) as eind,\nc.bewerkingsnummer,\nc.productnummer,\n(select max(bs.afkorting) from bewerkingflow bf, bewerkingsoort bs\nwhere c.bewerkingflowid = bf.id\nand bf.bewerkingsoort = bs.bewerkingsoort) as bewerkingsoort,\ncase when productnummer = 'in' OR productnummer = 'uit' then c.tijd else 0 end as inuittijd,\ncase when productnummer != 'in' AND productnummer != 'uit' then c.tijd else 0 end as bontijd,\n0 as plantijd,\n0 as pauzetijd\nfrom bewerkingtijd c FORCE INDEX(BEWERKINGTIJD_I4),\ngebruiker d\nwhere d.gebruiker = c.gebruiker\nand c.startdatumtijd >=  STR_TO_DATE('" + vanaf + "','%Y-%m-%d')\nand c.startdatumtijd <= STR_TO_DATE('" + (tm + " " + "23:59") + "','%Y-%m-%d %H:%i')\nand d.aktief = 1";
                        if (afdeling != '') {
                            sql += "\nand d.afdeling = '" + afdeling + "'";
                        }
                        if (gebruiker != '') {
                            sql += "\nand d.gebruiker = '" + gebruiker + "'";
                        }
                        //
                        // gebruikerplan
                        //
                        sql += "\nunion\nselect\n'PLAN' as soort,\np.gebruiker,\ndate(p.startdatumtijd) as datum,\ndate2screentime(p.startdatumtijd) as start,\ndate2screentime(p.einddatumtijd) as eind,\n0 as bewerkingsnummer,\nifnull(p.plansoort, '') as productnummer,\n'' as bewerkingsoort,\n0 as inuittijd,\n0 as bontijd,\np.tijd as plantijd,\np.pauze as pauzetijd\nfrom gebruikerplan p,\ngebruiker e\nwhere p.gebruiker = e.gebruiker\nand p.startdatumtijd >=  STR_TO_DATE('" + vanaf + "','%Y-%m-%d')\nand p.startdatumtijd <= STR_TO_DATE('" + (tm + " " + "23:59") + "','%Y-%m-%d %H:%i')\nand e.aktief = 1";
                        if (afdeling != '') {
                            sql += "\nand e.afdeling = '" + afdeling + "'";
                        }
                        if (gebruiker != '') {
                            sql += "\nand e.gebruiker = '" + gebruiker + "'";
                        }
                        //
                        //
                        //
                        sql += "\n    ) base ";
                        //
                        sql += "\ngroup by gebruiker, datum\norder by gebruiker, datum";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        //
                        tottijd = 0;
                        swfirstrow = 1;
                        wigebruiker = '---';
                        result += '[';
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (row.GEBRUIKER != wigebruiker) {
                                wigebruiker = row.GEBRUIKER;
                                if (swfirstrow == 1) {
                                    swfirstrow = 0;
                                    result += "\n";
                                }
                                else {
                                    result += "},\n";
                                }
                                result += '    {';
                                //
                                key = "GEBRUIKER";
                                val = wigebruiker;
                                if (val == '') {
                                    val = '??';
                                }
                                //
                                result += "\"" + key + "\":" + JSON.stringify(val);
                                //
                                tottijd = 0;
                                inuittijd = 0;
                                bontijd = 0;
                                plantijd = 0;
                                pauzetijd = 0;
                            }
                            //
                            inuittijd += Number(row.INUITTIJD);
                            bontijd += Number(row.BONTIJD);
                            plantijd += Number(row.PLANTIJD);
                            pauzetijd += Number(row.PAUZETIJD);
                            tottijd = inuittijd + bontijd + plantijd + pauzetijd;
                            //
                            for (key in row) {
                                val = row[key];
                                if (val == '') {
                                    val = '??';
                                }
                                if (key == "GEBRUIKER") {
                                }
                                else {
                                    if (key == "DATUM") {
                                        column = "COLUMN_" + val;
                                    }
                                    result += ',';
                                    key = column + "_" + key;
                                    result += "\"" + key + "\":" + JSON.stringify(val);
                                }
                            }
                            if (Number(row.DAGNUMMER) == 1) {
                                //
                                // weekregel tussenvoegen voor de maandag
                                result += ',';
                                key = column + "_DAG_WEEK";
                                //
                                if (tottijd == 0) {
                                    val = '  ';
                                }
                                else {
                                    val = "<table>";
                                    val += "<tr><td>inuit</td><td> " + util_1.Util.MakeHHMM(inuittijd) + "</td><td>(" + inuittijd + ")</td></tr>";
                                    val += "<tr><td>bon</td><td> " + util_1.Util.MakeHHMM(bontijd) + "</td><td>(" + bontijd + ")</td></tr>";
                                    val += "<tr><td>plan</td><td> " + util_1.Util.MakeHHMM(plantijd) + "</td><td>(" + plantijd + ")</td></tr>";
                                    val += "<tr><td>pauze</td><td> " + util_1.Util.MakeHHMM(pauzetijd) + "</td><td>(" + pauzetijd + ")</td></tr>";
                                    val += "</table>";
                                }
                                if (val == '') {
                                    val = '"??"';
                                }
                                result += "\"" + key + "\":" + JSON.stringify(val);
                                tottijd = 0;
                                inuittijd = 0;
                                bontijd = 0;
                                plantijd = 0;
                                pauzetijd = 0;
                            }
                        }
                        if (swfirstrow != 1) {
                            result += '}';
                        }
                        result += "\n]\n";
                        jsonresult = [];
                        try {
                            jsonresult = JSON.parse(result);
                        }
                        catch (error) {
                            logger_1.Logger.error(req, error);
                            logger_1.Logger.error(req, result);
                        }
                        res.crudConnection.release();
                        res.status(200).send(jsonresult);
                        return [2 /*return*/];
                }
            });
        });
    };
    Calender.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action;
            return __generator(this, function (_a) {
                method = req.method;
                action = db_1.default.fix(req.query.action || '');
                //
                if (action == "getColumns") {
                    this.getColumns(req, res, next);
                }
                else if (method == "GET") {
                    this.doQuery(req, res, next);
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
    return Calender;
}());
exports.Calender = Calender;
//# sourceMappingURL=calender.js.map