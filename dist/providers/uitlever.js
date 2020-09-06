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
exports.Uitlever = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
//
var dict = {
    table: "uitlever",
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
var Uitlever = /** @class */ (function (_super) {
    __extends(Uitlever, _super);
    function Uitlever() {
        return _super.call(this, dict) || this;
    }
    Uitlever.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, vraagwhere, sql, where, rows, row, sqlbase, sqlupdate, irow;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        query.startvoorraad = {};
                        if (query.assets == "") {
                            query.assets = "images/";
                        }
                        else {
                            query.assets = "assets/image/";
                        }
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        vraagwhere = '';
                        sql = '';
                        where = '';
                        sqlbase = '';
                        sqlupdate = '';
                        //
                        if (query.klant != '') {
                            vraagwhere += util_1.Util.addAnd(vraagwhere);
                            vraagwhere += "klantnummer = " + query.klant;
                        }
                        if (query.productnummer != '') {
                            vraagwhere += util_1.Util.addAnd(vraagwhere);
                            vraagwhere += "ucase(productnummer) like ucase('" + query.productnummer + "%')";
                        }
                        if (query.einddatum != '') {
                            vraagwhere += util_1.Util.addAnd(vraagwhere);
                            vraagwhere += "vraagdatumtijd <= screendate2date('" + query.einddatum + "')";
                        }
                        sql = "\nselect * from (\nselect *,\ndate2screendate(vraagdatumtijd) as VRAAGDATUM,\ndate2screendate(initvraagdatumtijd) as INITVRAAGDATUM,\ndate2screendate(acceptdatumtijd) as ACCEPTDATUM,\ndate2screendate(orderdatumtijd) as ORDERDATUM,\n(select ZOEKCODE from KLANT \nwhere PRODUCTVRAAG.klantnummer = KLANT.klantnummer) \nas KLANTZOEKCODE,\n(select VOORRAAD from PRODUCT \nwhere PRODUCTVRAAG.productnummer = PRODUCT.productnummer)\nas VOORRAAD,\t\n(select sum(productieaantal) from BEWERKING \nwhere bewerking.productnummer = productvraag.productnummer \nand isnull(einddatumtijd)) \nas OPENPRODUCTIEAANTAL,\ngetLijn(PRODUCTVRAAG.productnummer) as lijn,\n(select OPMERKING from VRAAG \nwhere VRAAG.ordernummer = PRODUCTVRAAG.ordernummer) \nas VRAAG_OMS,           \nOPMERKING as INTERN_OMS,\n(select Productnaam from PRODUCT \nwhere PRODUCTVRAAG.productnummer = PRODUCT.productnummer) \nas PRODUCT_OMS,\ngetOpenStand(PRODUCTVRAAG.productnummer,'" + query.assets + "') as STAND,\ngetKurk(PRODUCTVRAAG.productnummer,PRODUCTVRAAG.vraagdatumtijd) as KURK\nfrom PRODUCTVRAAG\n" + vraagwhere + "\n) BASE";
                        //
                        //
                        //
                        if (query.productnummer != '') {
                            where += util_1.Util.addAnd(where);
                            where += "ucase(productnummer) like ucase('" + query.productnummer + "%')";
                        }
                        if (query.productgroep != '') {
                            where += util_1.Util.addAnd(where);
                            where += "productnummer in (\nselect productnummer \nfrom PRODUCTGROEPREGEL \nwhere productgroep = '" + query.productgroep + "')";
                        }
                        if (query.einddatum != '') {
                            where += util_1.Util.addAnd(where);
                            where += "date(vraagdatumtijd) <= screendate2date('" + query.einddatum + "')";
                        }
                        if (query.lijn != '') {
                            where += util_1.Util.addAnd(where);
                            where += "base.lijn  = '" + query.lijn + "'";
                        }
                        //
                        sql += "\n" + where + "\norder by vraagdatumtijd,klantzoekcode,productnummer";
                        //
                        //
                        //
                        sqlbase = "\nDROP TEMPORARY TABLE IF EXISTS TABLE_UITLEVER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlbase)];
                    case 2:
                        _b.sent();
                        //
                        sqlbase = "\nCREATE TEMPORARY TABLE TABLE_UITLEVER \n(TMPID int(10) NOT NULL AUTO_INCREMENT,\nPRIMARY KEY (TMPID), INDEX(TMPID)) \n" + sql;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlbase)];
                    case 3:
                        _b.sent();
                        //
                        //
                        //
                        sql = "\nselect * from TABLE_UITLEVER";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        rows = _b.sent();
                        irow = 0;
                        _b.label = 5;
                    case 5:
                        if (!(irow < rows.length)) return [3 /*break*/, 8];
                        row = rows[irow];
                        query.productnummer = row.PRODUCTNUMMER;
                        if (!query.startvoorraad[query.productnummer]) {
                            query.startvoorraad[query.productnummer] = Number(row.VOORRAAD);
                        }
                        query.startvoorraad[query.productnummer] = query.startvoorraad[query.productnummer] - Number(row.VRAAG);
                        sqlupdate = "\nupdate TABLE_UITLEVER set\nVOORRAAD = " + query.startvoorraad[query.productnummer] + "\nwhere TMPID = '" + row.TMPID + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7:
                        irow++;
                        return [3 /*break*/, 5];
                    case 8:
                        sql = "\nselect *,\ngetOpenAantal(productnummer) as openaantal,\ncase when \ninitvraagdatumtijd >= screendate2date('01-01-2044')\nand initvraagdatumtijd <= screendate2date('31-12-2044')\nthen concat('(44) ', ORDERREFERENTIE) \nelse ORDERREFERENTIE end \nas ORDERREFERENTIE\nfrom TABLE_UITLEVER";
                        where = '';
                        where += util_1.Util.addAnd(where);
                        where += "vraag != 0";
                        if (query.sel44 == 'Nee') {
                            where += util_1.Util.addAnd(where);
                            where += "(initvraagdatumtijd < screendate2date('01-01-2044')\nor initvraagdatumtijd > screendate2date('31-12-2044'))";
                        }
                        else if (query.sel44 == "Ja") {
                            where += util_1.Util.addAnd(where);
                            where = "initvraagdatumtijd >= screendate2date('01-01-2044')\nand initvraagdatumtijd <= screendate2date('31-12-2044')";
                        }
                        if (query.klant != '') {
                            where += util_1.Util.addAnd(where);
                            where += "klantnummer = '" + query.klant + "'";
                        }
                        if (query.zoekcode) {
                            if (query.zoekcode != '') {
                                where += util_1.Util.addAnd(where);
                                where = "ucase(klantzoekcode) like ucase('" + query.zoekcode + "%')";
                            }
                        }
                        sql += "\n" + where;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 9:
                        //
                        rows = _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Uitlever.prototype.routes = function (req, res, next) {
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
    return Uitlever;
}(crud_1.Crud));
exports.Uitlever = Uitlever;
//# sourceMappingURL=uitlever.js.map