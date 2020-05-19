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
var logger_1 = require("../logger");
var onderdeelproductgroep_1 = require("./onderdeelproductgroep");
//
var dict = {
    table: "PRODUCTVOORRAAD",
    key: [
        {
            body: "STATUS",
            sql: "STATUS",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "",
        where: [],
        fields: [],
    },
    query: {
        orderby: "productnummer",
        where: [],
        fields: [],
    },
    update: {
        fields: [],
    },
};
var Bestellingproductgroep = /** @class */ (function (_super) {
    __extends(Bestellingproductgroep, _super);
    function Bestellingproductgroep() {
        return _super.call(this, dict) || this;
    }
    Bestellingproductgroep.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, productgroep, productnummer, onderdeel, metlijn, negatief, where, sql, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        productgroep = db_1.default.fix(req.query.productgroep || '');
                        productnummer = db_1.default.fix(req.query.productnummer || '');
                        onderdeel = db_1.default.fix(req.query.onderdeel || '');
                        metlijn = db_1.default.fix(req.query.metlijn || '');
                        negatief = db_1.default.fix(req.query.negatief || '');
                        where = '';
                        sql = "\nselect * from (\nselect *,\nvoorraad + inbestelling + inproductie + inbewerking + inorder as vrij,\ndate2screendate(mindatum) as MINDATUM_OMS\nfrom (\nselect id, productnummer, productnaam,\ngetLijn(PRODUCT.productnummer) as lijn,\n'" + productgroep + "' as productgroep,\nifnull((select 'Ja' from PRODUCTGROEPREGEL \nwhere PRODUCTGROEPREGEL.productgroep = '" + productgroep + "'\nand PRODUCT.Productnummer = PRODUCTGROEPREGEL.Productnummer),\n'Nee') \nas ingroep,\n(select IsOnderdeel\nfrom PRODUCTGROEPREGEL \nwhere PRODUCTGROEPREGEL.productgroep = '" + productgroep + "'\nand PRODUCT.Productnummer = PRODUCTGROEPREGEL.Productnummer) \nas IsOnderdeel,\nifnull(voorraad,0) as voorraad,\nifnull(leverdagen,0) as leverdagen,\nifnull((select sum(voorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and PRODUCTVOORRAAD.actie = 'VE'),0) as inorder,\nifnull((select sum(voorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and PRODUCTVOORRAAD.actie = 'BE'),0) as inproductie,\nifnull((select sum(voorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and PRODUCTVOORRAAD.actie = 'OP'),0) as inbewerking,\nifnull((select sum(voorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and PRODUCTVOORRAAD.actie = 'BES'),0) as inbestelling,\nifnull((select min(actievoorraad) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer),0) as minvoorraad,\nifnull((select min(voorraaddatumtijd) from PRODUCTVOORRAAD where PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer and actievoorraad < 0),0) as mindatum,\ndate2screendate(voorraaddatumtijd) as VOORRAADDATUM\nfrom PRODUCT";
                        if ((productgroep != '') && (productnummer != '')) {
                            if (where == '') {
                                where += ' where';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\n(productnummer in \n(select productnummer from PRODUCTGROEPREGEL\nwhere productgroep = '" + productgroep + "'\nor ucase(productnummer) like ucase('" + productnummer + "%'))";
                        }
                        else if (productgroep != '') {
                            if (where == '') {
                                where += ' where';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nproductnummer in \n(select productnummer from PRODUCTGROEPREGEL\nwhere productgroep = '" + productgroep + "')";
                        }
                        else if (productnummer != '') {
                            if (where == '') {
                                where += ' where';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nucase(productnummer) like ucase('" + productnummer + "%')";
                        }
                        else {
                            if (where == '') {
                                where += ' where';
                            }
                            else {
                                where += ' and ';
                            }
                            where += "\nproductnummer ='????'";
                        }
                        sql += "\n" + where;
                        sql += "\n) BASE ) BASE2";
                        //
                        where = '';
                        if (metlijn != 'on') {
                            if (where == '') {
                                where += ' where';
                            }
                            else {
                                where += ' and ';
                            }
                            where += " \nifnull(lijn,'') = ''";
                        }
                        if (negatief == 'on') {
                            if (where == '') {
                                where += ' where';
                            }
                            else {
                                where += ' and ';
                            }
                            where += " \nminvoorraad < 0";
                        }
                        sql += "\n" + where + "\norder by productnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bestellingproductgroep.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, sqlupdate, _a, sql_1, rows, row;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        if (!(req.body.PRODUCTGROEP != '')) return [3 /*break*/, 9];
                        sql_1 = "\nselect * \nfrom PRODUCTGROEP\nwhere productgroep = '" + db_1.default.fix(req.body.PRODUCTGROEP) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql_1)];
                    case 2:
                        rows = _b.sent();
                        if (!rows[0]) return [3 /*break*/, 9];
                        row = rows[0];
                        if (!(req.body.INGROEP == 'Nee')) return [3 /*break*/, 4];
                        sqlupdate = "\ndelete from PRODUCTGROEPREGEL\nwhere productgroep = '" + db_1.default.fix(req.body.PRODUCTGROEP) + "'\nand productnummer = '" + db_1.default.fix(req.body.PRODUCTNUMMER) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        sqlupdate = "\ninsert into PRODUCTGROEPREGEL \n(productgroep,productnummer) \nselect\n'" + db_1.default.fix(req.body.PRODUCTGROEP) + "',\n'" + db_1.default.fix(req.body.PRODUCTNUMMER) + "'\nfrom DUAL where not exists (\nselect 1 from PRODUCTGROEPREGEL\nwhere productgroep = '" + db_1.default.fix(req.body.PRODUCTGROEP) + "'\nand productnummer = '" + db_1.default.fix(req.body.PRODUCTNUMMER) + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqlupdate)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        if (!(Number(row.METONDERDELEN) == 1)) return [3 /*break*/, 9];
                        return [4 /*yield*/, onderdeelproductgroep_1.Onderdeelproductgroep.delete(req, res, next, req.body.PRODUCTGROEP)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, onderdeelproductgroep_1.Onderdeelproductgroep.add(req, res, next, req.body.PRODUCTGROEP, '', 0)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        //
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bestellingproductgroep.prototype.routes = function (req, res, next) {
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
                    this.doUpdate(req, res, next, this.dict);
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
    return Bestellingproductgroep;
}(crud_1.Crud));
exports.Bestellingproductgroep = Bestellingproductgroep;
//# sourceMappingURL=bestellingproductgroep.js.map