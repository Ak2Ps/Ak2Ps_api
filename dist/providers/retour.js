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
exports.Retour = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var dict = {
    table: "RETOUR",
    key: [
        {
            body: "REFERENTIE",
            sql: "REFERENTIE",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(REFERENTIE)",
        where: [
            {
                query: "value",
                sql: "ucase(REFERENTIE) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "REFERENTIE as ID"
            },
            {
                row: "VALUE",
                sql: "REFERENTIE AS VALUE"
            }
        ],
    },
    query: {
        orderby: "RETOUR",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "referentie",
                sql: "ucase(REFERENTIE) like ucase('%?%')",
            },
            {
                query: "klantreferentie",
                sql: "ucase(KLANTREFERENTIE) like ucase('%?%')",
            },
            {
                query: "klantnummer",
                sql: "KLANTNUMMER = '?'",
            },
            {
                query: "productnummer",
                sql: "ucase(PRODUCTNUMMER) like ucase('%?%')",
            },
        ],
    },
};
var Retour = /** @class */ (function (_super) {
    __extends(Retour, _super);
    function Retour() {
        return _super.call(this, dict) || this;
    }
    Retour.prototype.setGereed = function (referentie) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        sql = "\nupdate RETOUR set\ngereeddatumtijd = \n(select case\nwhen exists(select 1 from RETOURACTIE \nwhere gereeddatumtijd is NULL \nand referentie = '" + db_1.default.fix(referentie) + "')\nthen null\nelse\n(select max(gereeddatumtijd) from RETOURACTIE \nwhere referentie = '" + db_1.default.fix(referentie) + "')\nend)\nwhere referentie = '" + db_1.default.fix(referentie) + "';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        _a.sent();
                        connection.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    Retour.prototype.getReferentieLeverancier = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var referentie, sql, connection, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        referentie = req.query.referentie;
                        sql = "\nselect \nRETOURPRODUCT.referentie as REFERENTIE,\nRETOURPRODUCT.productnummer as PRODUCTNUMMER,\nPRODUCT.leveranciernummer as LEVERANCIERNUMMER\nfrom\n(RETOURPRODUCT left join PRODUCT on RETOURPRODUCT.productnummer = PRODUCT.productnummer)\nleft join LEVERANCIER on PRODUCT.leveranciernummer = LEVERANCIER.leveranciernummer\nwhere RETOURPRODUCT.referentie  = '" + referentie + "'\norder by PRODUCT.leveranciernummer, RETOURPRODUCT.productnummer;";
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
    Retour.prototype.createQuerySql = function (req, res, next, options) {
        var _a;
        //
        var sql = "\n select\n cast(Id as CHAR) as ID\n ,ifnull(Referentie,'') as REFERENTIE\n ,ifnull(Klantreferentie,'') as KLANTREFERENTIE\n ,date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD\n ,date2jsondate(GEREEDDATUMTIJD) as GEREEDDATUMTIJD\n ,ifnull(Gebruiker,'') as GEBRUIKER\n ,ifnull(Type,'') as TYPE\n ,ifnull(Termijn,'') as TERMIJN\n ,ifnull(Prijsopgave,'') as PRIJSOPGAVE\n ,ifnull(Garantie,'') as GARANTIE\n ,ifnull(Kosten,'') as KOSTEN\n ,ifnull(Opmerking,'') as OPMERKING\n ,ifnull(Status,'') as STATUS\n ,ifnull(START,'') as START\n ,ifnull(GEREED,'') as GEREED\n ,ifnull(cast(DUUR as char),'') as DUUR\n ,ifnull(cast(`OVER` as char),'') as `OVER`\n ,ifnull(KOSTEN_DESC,'') as KOSTEN_DESC\n ,ifnull(GARANTIE_DESC,'') as GARANTIE_DESC\n ,ifnull(TYPE_DESC,'') as TYPE_DESC\n ,ifnull(TERMIJN_DESC,'') as TERMIJN_DESC\n ,ifnull(PRIJSOPGAVE_DESC,'') as PRIJSOPGAVE_DESC\n ,ifnull(KLANT,'') as KLANT\n ,ifnull(KLANTNUMMER,'') as KLANTNUMMER\n ,case when producten <= 1 then ifnull(productnummer,'')\n else '...'\n end as PRODUCTNUMMER\n ,ifnull(AANTAL,'') as AANTAL\n ,ifnull(PRODUCTEN,'') as PRODUCTEN\n ,case when acties <= 1 then ifnull(actie,'')\n else '...'\n end as ACTIE\n ,ifnull(ACTIES,'') as ACTIES\n from (select *,\n date2screendate(startdatumtijd) as START,\n date2screendate(gereeddatumtijd) as GEREED,\n datediff(ifnull(gereeddatumtijd,sysdate()),startdatumtijd) as DUUR,\n cast(termijn as signed) - datediff(ifnull(gereeddatumtijd,sysdate()),startdatumtijd) as `OVER`,\n format(kosten,2) as KOSTEN_DESC,\n (select naam from RETOURGARANTIE where RETOUR.garantie = RETOURGARANTIE.garantie) as GARANTIE_DESC,\n (select naam from RETOURTYPE where RETOUR.type = RETOURTYPE.retourtype) as TYPE_DESC,\n (select naam from RETOURTERMIJN where RETOUR.termijn = RETOURTERMIJN.retourtermijn) as TERMIJN_DESC,\n (select case when RETOUR.prijsopgave = '1' then 'Ja' else 'Nee' end from DUAL) as PRIJSOPGAVE_DESC,\n (select min(zoekcode) from RETOURKLANT where RETOUR.referentie = RETOURKLANT.referentie) as KLANT,\n (select min(klantnummer) from RETOURKLANT where RETOUR.referentie = RETOURKLANT.referentie) as KLANTNUMMER,\n (select min(productnummer) from RETOURPRODUCT where RETOUR.referentie = RETOURPRODUCT.referentie) as PRODUCTNUMMER,\n (select sum(aantal) from RETOURPRODUCT where RETOUR.referentie = RETOURPRODUCT.referentie) as AANTAL,\n (select count(distinct productnummer) from RETOURPRODUCT where RETOUR.referentie = RETOURPRODUCT.referentie) as producten,\n (select min(RETOURACTIETYPE.naam) from RETOURACTIE,RETOURACTIETYPE where RETOURACTIE.actie = RETOURACTIETYPE.actie and RETOUR.referentie = RETOURACTIE.referentie) as ACTIE,\n (select count(*) from RETOURACTIE where RETOUR.referentie = RETOURACTIE.referentie) as acties\n from RETOUR) BASE ";
        var where = this.addWhere(req, res, next, (_a = dict === null || dict === void 0 ? void 0 : dict.query) === null || _a === void 0 ? void 0 : _a.where);
        if (req.query.open == "Nee") {
            if (where == '') {
                where += " where";
            }
            else {
                where += " and";
            }
            where += " not isnull(gereeddatumtijd)";
        }
        if (req.query.open == "Ja") {
            if (where == '') {
                where += " where";
            }
            else {
                where += " and";
            }
            where += " isnull(gereeddatumtijd)";
        }
        if (req.query.datum) {
            if (where == '') {
                where += " where";
            }
            else {
                where += " and";
            }
            where += " gereeddatumtijd >= screendate2date('" + req.query.datum + "')";
        }
        sql += "" + where;
        sql += " order by referentie,startdatumtijd";
        //
        return sql;
    };
    Retour.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, sql, rows, oldref, newref, result, prijsopgave;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // PUT
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        // PUT
                        _a.crudConnection = _b.sent();
                        id = db_1.default.getDataId(req);
                        // als referentie wijzigt
                        // dan ook : 
                        // update RETOURKLANT set referentie = $new where referentie = $old
                        // update RETOURPRODUCT set referentie = $new where referentie = $old
                        // update RETOURACTIE set referentie = $new where referentie = $old
                        // wat was het oude nummer
                        sql = "select referentie from RETOUR where id = " + id;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        if (!rows[0]) return [3 /*break*/, 6];
                        oldref = db_1.default.fix(rows[0].REFERENTIE);
                        newref = db_1.default.fix(req.body.REFERENTIE);
                        if (!(oldref != newref)) return [3 /*break*/, 6];
                        sql = "\nupdate RETOURKLANT set\nreferentie =  '" + newref + "'\nwhere referentie = '" + oldref + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        result = _b.sent();
                        sql = "\nupdate RETOURPRODUCT set\nreferentie =  '" + newref + "'\nwhere referentie = '" + oldref + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        result = _b.sent();
                        sql = "\nupdate RETOURACTIE set\nreferentie =  '" + newref + "'\nwhere referentie = '" + oldref + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        result = _b.sent();
                        _b.label = 6;
                    case 6:
                        prijsopgave = String(req.body.PRIJSOPGAVE_DESC);
                        prijsopgave = prijsopgave.toUpperCase();
                        prijsopgave = prijsopgave.substr(0, 1);
                        if (prijsopgave == 'J') {
                            prijsopgave = '1';
                        }
                        else {
                            prijsopgave = '0';
                        }
                        sql = "\nupdate RETOUR set\nreferentie = '" + db_1.default.fix(req.body.REFERENTIE) + "',\nklantreferentie = '" + db_1.default.fix(req.body.KLANTREFERENTIE) + "',\nStartdatumtijd = screendate2date('" + db_1.default.fix(req.body.START) + "'),\nGereeddatumtijd = screendate2date('" + db_1.default.fix(req.body.GEREED) + "'),\nGarantie = (select min(garantie) from RETOURGARANTIE where ucase(naam) like  ucase('" + db_1.default.fix(req.body.GARANTIE_DESC) + "%')),\nkosten = '" + db_1.default.fix(req.body.KOSTEN_DESC) + "',\nType = (select min(retourtype) from RETOURTYPE where ucase(naam) like  ucase('" + db_1.default.fix(req.body.TYPE_DESC) + "%')),\nTermijn = (select min(retourtermijn) from RETOURTERMIJN where ucase(naam) like  ucase('" + db_1.default.fix(req.body.TERMIJN_DESC) + "%')),\nPrijsopgave = '" + prijsopgave + "'\nwhere id = '" + db_1.default.fix(id) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 7:
                        result = _b.sent();
                        sql = "\nupdate RETOUR set\nGebruiker =  '" + db_1.default.fix(req.ak2_user) + "'\nwhere id = '" + db_1.default.fix(id) + "'\nand gebruiker = ''";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 8:
                        result = _b.sent();
                        //
                        return [4 /*yield*/, this.setGereed(req.body.REFERENTIE)];
                    case 9:
                        //
                        _b.sent();
                        //
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Retour.prototype.doInsert = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, prijsopgave, jaar, voorvoegsel, newref, sql, rows, _a, id, vlnr, strVlnr;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        id = db_1.default.getDataId(req);
                        prijsopgave = String(req.body.PRIJSOPGAVE_DESC);
                        prijsopgave = prijsopgave.toUpperCase();
                        prijsopgave = prijsopgave.substr(0, 1);
                        if (prijsopgave == 'J') {
                            prijsopgave = '1';
                        }
                        else {
                            prijsopgave = '0';
                        }
                        jaar = String(req.body.START);
                        // dd-mm-yyyy
                        // 0123456789
                        jaar = jaar.substr(6, 4);
                        // TRV_JJJJ_0000
                        // 0123456789012
                        voorvoegsel = req.ak2_app;
                        newref = jaar + '_0000';
                        sql = "\nselect max(referentie) as REF \nfrom RETOUR \nwhere ucase(referentie) like ucase('TR" + voorvoegsel + "_" + jaar + "_%')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        if (rows[0]) {
                            vlnr = Number(String(rows[0].REF).substr(9));
                            vlnr += 1;
                            strVlnr = String(vlnr);
                            while (strVlnr.length < 4) {
                                strVlnr = '0' + strVlnr;
                            }
                            newref = 'TR' + voorvoegsel + "_" + jaar + '_' + strVlnr;
                        }
                        sql = "\ninsert into RETOUR\n(referentie,klantreferentie,startdatumtijd,gereeddatumtijd,gebruiker,\nkosten,garantie,type,termijn,prijsopgave)\nvalues (\n'" + newref + "',\n'" + db_1.default.fix(req.body.KLANTREFERENTIE) + "',\nscreendate2date('" + db_1.default.fix(req.body.START) + "'),\nscreendate2date('" + db_1.default.fix(req.body.GEREED) + "'),\n'" + db_1.default.fix(req.ak2_user) + "',\n'" + db_1.default.fix(req.query.KOSTEN_DESC) + "',\n(select min(garantie) from RETOURGARANTIE where ucase(naam) like  ucase('" + db_1.default.fix(req.body.GARANTIE_DESC) + "%')),\n(select min(retourtype) from RETOURTYPE where ucase(naam) like  ucase('" + db_1.default.fix(req.body.TYPE_DESC) + "%')),\n(select min(retourtermijn) from RETOURTERMIJN where ucase(naam) like  ucase('" + db_1.default.fix(req.body.TERMIJN_DESC) + "%')),\nPrijsopgave = '" + prijsopgave + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _b.sent();
                        req.body.ID = rows.insertId;
                        req.body.REFERENTIE = newref;
                        req.body.GEBRUIKER = req.ak2_user;
                        //
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Retour.prototype.doAfterDelete = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, id, sql, rows, old;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = true;
                        id = db_1.default.fix(db_1.default.getDataId(req));
                        sql = "select REFERENTIE from RETOUR where id  = " + id;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        if (!rows[0]) return [3 /*break*/, 5];
                        old = rows[0].REFERENTIE;
                        sql = "delete from RETOURKLANT where referentie = '" + old + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _a.sent();
                        sql = "delete from RETOURPRODUCT where referentie = '" + old + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _a.sent();
                        sql = "delete from RETOURACTIE where referentie = '" + old + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        rows = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, (result)];
                }
            });
        });
    };
    Retour.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action;
            return __generator(this, function (_a) {
                method = req.method;
                action = db_1.default.fix(req.query.action || '');
                //
                logger_1.Logger.request(req);
                //
                if (action == "select") {
                    this.doSelect(req, res, next, this.dict);
                }
                else if (method == "GET") {
                    if (action == 'getreferentieleverancier') {
                        this.getReferentieLeverancier(req, res, next);
                    }
                    else {
                        this.doQuery(req, res, next, this.dict);
                    }
                }
                else if (method == "PUT") {
                    this.doUpdate(req, res, next, this.dict);
                }
                else if (method == "PUT" || method == "POST") {
                    this.doInsert(req, res, next, this.dict);
                }
                else if (method == "DELETE") {
                    this.doDelete(req, res, next, this.dict);
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Retour;
}(crud_1.Crud));
exports.Retour = Retour;
//# sourceMappingURL=retour.js.map