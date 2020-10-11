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
exports.Bewerkingverschil = void 0;
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var Bewerkingverschil = /** @class */ (function () {
    function Bewerkingverschil() {
        logger_1.Logger.info("Creating Bewerkingverschil");
    }
    Bewerkingverschil.prototype.doQuery = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var where, bewerkingsnummer, productnummer, lijn, sel_vanaf, sql, connection, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        where = "";
                        bewerkingsnummer = req.query.bewerkingsnummer;
                        productnummer = req.query.productnummer;
                        lijn = req.query.lijn;
                        sel_vanaf = req.query.sel_vanaf;
                        sql = "\nselect *,\ndate2screendate(initstartdatumtijd) as STARTDATUM,\ndate2screendate(einddatumtijd) as EINDDATUM,\ndate2screendate(ak2einddatumtijd) as AK2EINDDATUM,\nDATEDIFF( einddatumtijd, ak2einddatumtijd ) as WACHTDAGENEXACT\nfrom \n(\n  select *,\n  startaantal - gemiddeldflowaantal as flowverschil,\n  startaantal - gemiddeldvoortgangflowaantal as voortgangverschil,\n  startaantal - gemiddeldlogistiekflowaantal as logistiekverschil,\n  abs(startaantal - gemiddeldflowaantal) as absflowverschil,\n  abs(startaantal - gemiddeldvoortgangflowaantal) as absvoortgangverschil,\n  abs(startaantal - gemiddeldlogistiekflowaantal) as abslogistiekverschil\n  from\n  (\n  SELECT *,\n  case when ifnull(flowaantalbewerkingen,0) > 0 \n  then round((ifnull(flowaantal,0) / flowaantalbewerkingen),0)\n  else 0 end \n  as gemiddeldflowaantal,\n  case when ifnull(voortgangflowaantalbewerkingen,0) > 0 \n  then round((ifnull(voortgangflowaantal,0) / voortgangflowaantalbewerkingen),0)\n  else 0 end \n  as gemiddeldvoortgangflowaantal,\n  case when ifnull(logistiekflowaantalbewerkingen,0) > 0 \n  then round((ifnull(logistiekflowaantal,0) / logistiekflowaantalbewerkingen),0) \n  else 0 end \n  as gemiddeldlogistiekflowaantal\n   FROM\n  (\n  SELECT\n     BEWERKING.id,\n       BEWERKING.Bewerkingsnummer,\n       BEWERKING.Productnummer,\n       BEWERKING.Einddatumtijd,\n       BEWERKING.Productieaantal,\n       BEWERKING.Startaantal,\n     BEWERKING.Initstartdatumtijd,\n       if ((select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer) is not null,\n          (select max(lijn) from BEWERKING lijnbwk where lijnbwk.bewerkingsnummer = BEWERKING.bewerkingsnummer),\n         if ((select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)) is not null,\t\n           (select max(productielijn) from PRODUCTLIJN lijnprdl where lijnprdl.productlijn = (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer)),     \n              if ((select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer) is not null,\n              (select max(lijn) from PRODUCT lijnprd where lijnprd.productnummer = BEWERKING.productnummer),\n               null\n              )\n         )\n     ) as lijn,\n     ( SELECT sum( bewerkingaantal) FROM BEWERKINGFLOW \n         WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer ) as flowaantal,\n       ( SELECT count( distinct(bewerkingsoort)) FROM BEWERKINGFLOW \n         WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer ) as flowaantalbewerkingen,\n       ( SELECT sum( bewerkingaantal) FROM BEWERKINGFLOW,BEWERKINGSOORT \n         WHERE BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort \n         and BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \n         and BEWERKINGSOORT.voortgang = 1) as voortgangflowaantal,\n       ( SELECT count( distinct(BEWERKINGFLOW.bewerkingsoort)) FROM BEWERKINGFLOW,BEWERKINGSOORT\n         WHERE BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort \n         and BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \n         and BEWERKINGSOORT.voortgang = 1 ) as voortgangflowaantalbewerkingen,\n       ( SELECT sum( bewerkingaantal) FROM BEWERKINGFLOW,BEWERKINGSOORT\n         WHERE BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort \n         and BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \n         and ucase(BEWERKINGSOORT.naam) like ucase('logistiek%')) as logistiekflowaantal,\n       ( SELECT count( distinct(BEWERKINGFLOW.bewerkingsoort)) FROM BEWERKINGFLOW,BEWERKINGSOORT\n         WHERE bewerkingflow.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort \n         and BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \n         and ucase(BEWERKINGSOORT.naam) like ucase('logistiek%')) as logistiekflowaantalbewerkingen,\n       ( SELECT max( BEWERKINGFLOW.einddatumtijd) FROM BEWERKINGFLOW\n         WHERE BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \n       AND NOT EXISTS (select 1 from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \n       AND BEWERKINGFLOW.einddatumtijd is null)) as ak2einddatumtijd\n      FROM\n       bewerking) base\n  ) som\n  ) verschil\n  ";
                        if (req.query.bewerkingsnummer) {
                            if (where == '') {
                                where += " where ";
                            }
                            else {
                                where += " and ";
                            }
                            where += " bewerkingsnummer = '" + req.query.bewerkingsnummer + "'";
                        }
                        if (req.query.productnummer) {
                            if (where == '') {
                                where += " where ";
                            }
                            else {
                                where += " and ";
                            }
                            where += " ucase(productnummer) like ucase('%" + req.query.productnummer + "%')";
                        }
                        if (req.query.lijn) {
                            if (where == '') {
                                where += " where ";
                            }
                            else {
                                where += " and ";
                            }
                            where += " lijn = '" + req.query.lijn + "'";
                        }
                        //
                        if (sel_vanaf) {
                            if (where == '') {
                                where += " where ";
                            }
                            else {
                                where += " and ";
                            }
                            where += "initstartdatumtijd >= screendate2date('" + sel_vanaf + "')";
                        }
                        sql += where;
                        sql += "\norder by cast(voortgangverschil as decimal) desc, initstartdatumtijd, cast(id as decimal)";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingverschil.prototype.doUpdate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var row, id, sql, connection, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        row = req.body;
                        id = db_1.default.getDataId(req);
                        sql = "\nupdate BEWERKING set\nStartaantal = '" + db_1.default.fix(row.STARTAANTAL) + "'\nwhere id = " + db_1.default.fix(id) + ";\n";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(row);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bewerkingverschil.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action, result;
            return __generator(this, function (_a) {
                method = req.method;
                action = db_1.default.fix(req.query.action || '');
                //
                if (method == "GET") {
                    this.doQuery(req, res, next);
                }
                else if (method == "PUT") {
                    result = true;
                    if (result) {
                        this.doUpdate(req, res, next);
                    }
                }
                else if (method == "POST") {
                }
                else if (method == "DELETE") {
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Bewerkingverschil;
}());
exports.Bewerkingverschil = Bewerkingverschil;
//# sourceMappingURL=bewerkingverschil.js.map