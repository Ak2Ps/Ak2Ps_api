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
var Bewerkingflowperformance = /** @class */ (function (_super) {
    __extends(Bewerkingflowperformance, _super);
    function Bewerkingflowperformance() {
        return _super.call(this, dict) || this;
    }
    Bewerkingflowperformance.query = function (req, res, next, bewerkingsnummer, productnummer) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, rows, row, norm, target, besteed, faktor, irow, row, swfirstrow, irow, row, HHMMNORMAAL, HHMMBESTEED, HHMMOVER;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = '';
                        req.query.performancestart = "01-01-2016";
                        sql = "\nselect * \nfrom PARAM \nwhere naam = 'PERFORMANCESTART'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        if (rows[0]) {
                            row = rows[0];
                            req.query.performancestart = row.INHOUD;
                        }
                        norm = 0;
                        target = 0;
                        besteed = 0;
                        sql = this.createSql(req, res, next);
                        faktor = 1;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _a.sent();
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (row.BEWERKINGSOORT == "Totaal") {
                                if (Number(row.NORM) != 0) {
                                    if (Number(row.GEMIDDELD) != 0) {
                                        faktor = Number(row.NORM) / Number(row.GEMIDDELD);
                                    }
                                }
                            }
                        }
                        //
                        // print de info
                        //
                        result += '[';
                        swfirstrow = 1;
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (swfirstrow == 1) {
                                swfirstrow = 0;
                                result += "\n";
                            }
                            else {
                                result += ",\n";
                            }
                            //
                            //
                            //
                            if (row.BEWERKINGSOORT == "Totaal") {
                                norm = Number(row.NORM);
                                if (norm == 0) {
                                    norm = Number(row.GEMIDDELD);
                                    row.NORM = norm.toFixed(0);
                                }
                            }
                            else {
                                norm = Number(row.GEMIDDELD) * faktor;
                                row.NORM = norm.toFixed(0);
                            }
                            target = Number((Number(row.TODO) / norm * 60).toFixed(0));
                            besteed = Number(row.BESTEED);
                            HHMMNORMAAL = util_1.Util.MakeHHMM(target);
                            HHMMBESTEED = util_1.Util.MakeHHMM(besteed);
                            HHMMOVER = util_1.Util.MakeHHMM(target - besteed);
                            row.HHMMNORMAAL = HHMMNORMAAL;
                            row.HHMMBESTEED = HHMMBESTEED;
                            row.HHMMOVER = HHMMOVER;
                            result += JSON.stringify(row);
                        }
                        result += ']';
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Bewerkingflowperformance.print = function (req, res, next, bewerkingsnummer, productnummer) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, rows, row, faktor, irow, row, tlrow, irow, row, performance_1, norm, target, besteed, real;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = '';
                        req.query.performancestart = "01-01-2016";
                        req.query.bewerkingsnummer = bewerkingsnummer;
                        req.query.productnummer = productnummer;
                        sql = "\nselect * \nfrom PARAM \nwhere naam = 'PERFORMANCESTART'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        if (rows[0]) {
                            row = rows[0];
                            req.query.performancestart = row.INHOUD;
                        }
                        //
                        sql = this.createSql(req, res, next);
                        faktor = 1;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _a.sent();
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (row.BEWERKINGSOORT == "Totaal") {
                                if (Number(row.NORM) != 0) {
                                    if (Number(row.GEMIDDELD) != 0) {
                                        faktor = Number(row.NORM) / Number(row.GEMIDDELD);
                                    }
                                }
                            }
                        }
                        tlrow = 0;
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (tlrow == 0) {
                                result += '<table class="t" style="margin 5px 0px 0px 0px">';
                                result += '<tr>';
                                result += '<td class="lth">';
                                result += 'Bewerking';
                                result += '</td>';
                                result += '<td class="th">';
                                result += 'Aantal/uur';
                                result += '</td>';
                                result += '<td class="th">';
                                result += 'Norm';
                                result += '</td>';
                                result += '<td class="th">';
                                result += 'Te doen';
                                result += '</td>';
                                result += '<td class="th">';
                                result += 'Tijd nodig';
                                result += '</td>';
                                result += '<td class="th">';
                                result += '';
                                result += '</td>';
                                result += '<td class="th">';
                                result += 'Besteed';
                                result += '</td>';
                                result += '<td class="th">';
                                result += 'Aantal/uur';
                                result += '</td>';
                                result += '<td class="th">';
                                result += 'Tijd over';
                                result += '</td>';
                                result += "</tr>\n";
                                result += '<tr>';
                            }
                            tlrow++;
                            result += '<tr>';
                            // bewerking
                            result += '<td class="ltr">';
                            result += row.NAAM;
                            result += '</td>';
                            // aantal per uur
                            result += '<td class="tr">';
                            performance_1 = row.UURPERFORMANCE;
                            result += performance_1;
                            result += '</td>';
                            // norm
                            result += '<td class="tr">';
                            norm = '';
                            if (row.BEWERKINGSOORT == "Totaal") {
                                norm = row.NORM;
                                if (Number(norm) == 0) {
                                    norm = row.GEMIDDELD;
                                    row.NORM = norm;
                                }
                            }
                            else {
                                norm = String((Number(row.GEMIDDELD) * faktor).toFixed(0));
                                row.NORM = norm;
                            }
                            result += norm;
                            result += '</td>';
                            // te doen
                            result += '<td class="tr">';
                            result += row.TODO;
                            result += '</td>';
                            // tijd nodig
                            result += '<td class="tr">';
                            target = '';
                            norm = row.NORM;
                            if (Number(norm) != 0) {
                                target = String((Number(row.TODO) / Number(norm) * 60).toFixed(0));
                            }
                            result += util_1.Util.MakeHHMM(Number(target));
                            result += '</td>';
                            // splitter
                            result += '<td class="tr"</td>';
                            // besteed
                            result += '<td class="tr">';
                            result += util_1.Util.MakeHHMM(Number(row.BESTEED));
                            result += '</td>';
                            // aantal/uur
                            result += '<td class="tr">';
                            besteed = '';
                            real = '';
                            if (Number(row.BESTEED) == 0) {
                                besteed = '0';
                                real = '0';
                                result += "?";
                            }
                            else {
                                besteed = row.BESTEED;
                                real = String((Number(row.TODO) / Number(row.BESTEED) * 60).toFixed(0));
                                result += real;
                            }
                            result += '</td>';
                            // tijd over
                            result += '<td class="tr">';
                            result += util_1.Util.MakeHHMM(Number(target) - Number(besteed));
                            result += '</td>';
                            //
                            result += "</tr>\n";
                        }
                        if (tlrow == 0) {
                            result += '<p>(Nog) geen historische informatie beschikbaar.</p>';
                        }
                        else {
                            result += '</table>';
                        }
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Bewerkingflowperformance.createSql = function (req, res, next) {
        var performancestart = req.query.performancestart;
        var bewerkingsnummer = db_1.default.fix(req.query.bewerkingsnummer || '');
        var productnummer = db_1.default.fix(req.query.productnummer || '');
        var sql = "\n        select \n        productnummer,\n        '' as norm,\n        bewerkingsoort,\n        naam,\n        (select sum(bewerkingaantal) from bewerkingflow \n        where bewerkingflow.bewerkingsnummer = '" + bewerkingsnummer + "' \n        and bewerkingflow.bewerkingsoort = BASE.bewerkingsoort) \n        as todo,\n        (select ifnull(sum(tijd),0) from bewerkingflow, bewerkingtijd \n        where bewerkingtijd.bewerkingflowid = bewerkingflow.id \n        and bewerkingflow.bewerkingsnummer = '" + bewerkingsnummer + "' \n        and bewerkingflow.bewerkingsoort = BASE.bewerkingsoort) \n        as besteed,\n        sum(bewerkingaantal) as aantal,\n        sum(tijd) as minuten,\n        round(sum(bewerkingaantal)/sum(tijd)*60) as gemiddeld, \n        concat(round(sum(bewerkingaantal)/sum(tijd)*60),' uit ',count(*)) \n        as uurperformance \n        from (\n        select \n        bewerking.productnummer, \n        bewerking.startdatumtijd as bwk_startdatumtijd,\n        bewerking.einddatumtijd as bwk_einddatumtijd,\n        bewerkingsoort.naam,\n        bewerkingsoort.layout,\n        bewerkingflow.bewerkingsnummer, \n        bewerkingflow.volgnummer, \n        bewerkingflow.bewerkingsoort, \n        bewerkingflow.einddatumtijd , \n        bewerkingflow.bewerkingaantal,\n        (select sum(tijd) from bewerkingtijd \n        where bewerkingtijd.bewerkingsnummer = bewerking.bewerkingsnummer \n        and bewerkingtijd.bewerkingflowid = bewerkingflow.id) \n        as tijd\n        from bewerkingflow,bewerking, bewerkingsoort\n        where BEWERKING.startdatumtijd >= screendate2date('" + performancestart + "')\n        and BEWERKING.einddatumtijd is not null\n        and bewerking.productnummer = '" + productnummer + "'\n        and bewerkingflow.bewerkingsnummer = bewerking.bewerkingsnummer\n        and bewerkingsoort.bewerkingsoort = bewerkingflow.bewerkingsoort\n        and bewerkingsoort.layout in ('rapBEWERKINGFLOWBEWERK.php','rapBEWERKINGFLOWEINDCONTROLE.php')\n        and bewerkingsoort.reparatie = 0 \n        ) BASE\n        group by productnummer,bewerkingsoort,naam\n        union \n        select \n        productnummer,\n        performance as norm,\n        bewerkingsoort,\n        naam,\n        todo,\n        besteed,\n        aantal,\n        tijd,\n        round(sum(startaantal) * 60 / sum(tijd)) as gemiddeld,\n        concat (round(sum(startaantal) * 60 / sum(tijd)), ' uit ', aantal_bewerkingen) as uurperformance\n        \n        from (\n        \n        select \n        productnummer,\n        performance,\n        'Totaal' as bewerkingsoort,\n        'Totaal' as naam ,\n        (select startaantal from bewerking where bewerking.bewerkingsnummer = '" + bewerkingsnummer + "')  as todo,\n        (select sum(tijd) from bewerkingtijd where bewerkingtijd.bewerkingsnummer = '" + bewerkingsnummer + "') as besteed,\n        (select sum(bewerkingaantal) from bewerkingflow inner join\n        (select distinct bewerkingsnummer from bewerking \n        where bewerking.productnummer = '" + productnummer + "' \n        and bewerking.einddatumtijd is not null \n        and bewerking.startdatumtijd >= screendate2date('" + performancestart + "')) a \n        on bewerkingflow.bewerkingsnummer = a.bewerkingsnummer\n        where exists (select 1 from bewerkingsoort \n        where bewerkingflow.bewerkingsoort = bewerkingsoort.bewerkingsoort\n        and bewerkingsoort.voortgang = 1)\n        and exists (select 1 from bewerkingtijd\n        where bewerkingflow.id = bewerkingtijd.bewerkingflowid)\n        ) as aantal,\n        (select sum(startaantal) from bewerking\n        where bewerking.productnummer = '" + productnummer + "' \n        and bewerking.einddatumtijd is not null \n        and bewerking.startdatumtijd >= screendate2date('" + performancestart + "'))\n        as startaantal,\n        (select sum(tijd) from bewerkingtijd  inner join\n        ( select distinct bewerkingsnummer from bewerking\n        where bewerking.productnummer = '" + productnummer + "'\n        and bewerking.einddatumtijd is not null \n        and bewerking.startdatumtijd >= screendate2date('" + performancestart + "')) b\n        on bewerkingtijd.bewerkingsnummer = b.bewerkingsnummer\n        where exists (select 1 from bewerkingflow\n        where bewerkingflow.id = bewerkingtijd.bewerkingflowid)\n        ) as tijd,\n        (select count(*) from bewerking\n        where bewerking.productnummer ='" + productnummer + "'\n        and bewerking.einddatumtijd is not null \n        and bewerking.startdatumtijd >= screendate2date('" + performancestart + "'))  as aantal_bewerkingen\n        from product where productnummer = '" + productnummer + "'\n        ) basetot";
        return sql;
    };
    return Bewerkingflowperformance;
}(crud_1.Crud));
exports.Bewerkingflowperformance = Bewerkingflowperformance;
//# sourceMappingURL=bewerkingflowperformance.js.map