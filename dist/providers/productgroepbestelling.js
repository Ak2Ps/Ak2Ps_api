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
exports.Productgroepbestelling = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var onderdeelproductgroep_1 = require("./onderdeelproductgroep");
//
var dict = {
    table: "productgroepbestelling",
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
var Productgroepbestelling = /** @class */ (function (_super) {
    __extends(Productgroepbestelling, _super);
    function Productgroepbestelling() {
        return _super.call(this, dict) || this;
    }
    Productgroepbestelling.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, where, sql, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        where = '';
                        sql = "\nselect * from \n(select *, \nvoorraad + inbestelling + inproductie + inbewerking + inorder as vrij,\ndate2screendate(mindatum) as MINDATUM_OMS\nfrom (\nselect \nid, \nproductnummer, \nproductnaam,\nlijn,\n'" + query.productgroep + "' as productgroep,\nifnull((select 'Ja' from PRODUCTGROEPREGEL \nwhere PRODUCTGROEPREGEL.productgroep = '' . query.productgroep . '' \nand PRODUCT.Productnummer = PRODUCTGROEPREGEL.Productnummer),'Nee') \nas ingroep,\n(select IsOnderdeel from PRODUCTGROEPREGEL \nwhere PRODUCTGROEPREGEL.productgroep = '" + query.productgroep + "' \nand PRODUCT.Productnummer = PRODUCTGROEPREGEL.Productnummer) \nas IsOnderdeel,\nifnull(voorraad,0) as voorraad,\nifnull(leverdagen,0) as leverdagen,\nifnull((select sum(voorraad) from PRODUCTVOORRAAD\nwhere PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer \nand PRODUCTVOORRAAD.actie = 'VE'),0) \nas inorder,\nifnull((select sum(voorraad) from PRODUCTVOORRAAD \nwhere PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer \nand PRODUCTVOORRAAD.actie = 'BE'),0) \nas inproductie,\nifnull((select sum(voorraad) from PRODUCTVOORRAAD \nwhere PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer \nand PRODUCTVOORRAAD.actie = 'OP'),0) \nas inbewerking,\nifnull((select sum(voorraad) from PRODUCTVOORRAAD \nwhere PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer \nand PRODUCTVOORRAAD.actie = 'BES'),0) \nas inbestelling,\nifnull((select min(actievoorraad) from PRODUCTVOORRAAD \nwhere PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer),0) \nas minvoorraad,\nifnull((select min(voorraaddatumtijd) from PRODUCTVOORRAAD \nwhere PRODUCT.productnummer = PRODUCTVOORRAAD.productnummer \nand actievoorraad < 0),0) \nas mindatum,\ndate2screendate(voorraaddatumtijd) as VOORRAADDATUM\nfrom PRODUCT";
                        if ((query.productgroep != '') && (query.productnummer != '')) {
                            where += util_1.Util.addAnd(where);
                            where += "(productnummer in (select productnummer from PRODUCTGROEPREGEL \nwhere productgroep = '" + query.productgroep + "')\nor ucase(productnummer) like ucase('" + query.productnummer + "%'))";
                        }
                        else if (query.productgroep != '') {
                            where += util_1.Util.addAnd(where);
                            where += "productnummer in (select productnummer from PRODUCTGROEPREGEL \nwhere productgroep = '" + query.productgroep + "')";
                        }
                        else if (query.productnummer != '') {
                            where += util_1.Util.addAnd(where);
                            where += "ucase(productnummer) like ucase('" + query.productnummer + "%')";
                        }
                        else {
                            where += util_1.Util.addAnd(where);
                            where += "productnummer ='????'";
                        }
                        sql += "\n" + where + "\n) BASE ) BASE2\n";
                        //
                        where = '';
                        if (query.metlijn != 'on') {
                            where += util_1.Util.addAnd(where);
                            where += "ifnull(lijn,'') = ''";
                        }
                        if (query.negatief == 'on') {
                            where += util_1.Util.addAnd(where);
                            where += "minvoorraad  < 0";
                        }
                        sql += "\n" + where + "\norder by productnummer\n";
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
    Productgroepbestelling.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var body, _a, id, sql, rows, row;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        body = db_1.default.fixBody(req.body);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        id = db_1.default.fix(db_1.default.getDataId(req));
                        if (!(body.PRODUCTGROEP != '')) return [3 /*break*/, 9];
                        sql = "\nselect * \nfrom PRODUCTGROEP \nwhere productgroep = '" + body.PRODUCTGROEP + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        if (!rows[0]) return [3 /*break*/, 9];
                        row = rows[0];
                        if (!(body.INGROEP == 'Nee')) return [3 /*break*/, 4];
                        sql = "\ndelete from PRODUCTGROEPREGEL\nwhere productgroep = '" + body.PRODUCTGROEP + "'\nand productnummer = '" + body.PRODUCTNUMMER + "'";
                        ;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        sql = "\ninsert into PRODUCTGROEPREGEL (productgroep,productnummer) \nselect\n'" + body.PRODUCTGROEP + "',\n'" + body.PRODUCTNUMMER + "'\nfrom DUAL \nwhere not exists \n(select 1 from PRODUCTGROEPREGEL\nwhere productgroep = '" + body.PRODUCTGROEP + "'\nand productnummer = '" + body.PRODUCTNUMMER + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        _b.sent();
                        _b.label = 6;
                    case 6:
                        if (!(row['METONDERDELEN'] == '1')) return [3 /*break*/, 9];
                        return [4 /*yield*/, onderdeelproductgroep_1.Onderdeelproductgroep.delete(req, res, next, body.PRODUCTGROEP)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, onderdeelproductgroep_1.Onderdeelproductgroep.add(req, res, next, body.PRODUCTGROEP, '', 0)];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9:
                        //
                        res.crudConnection.release();
                        res.status(200).send(body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Productgroepbestelling.prototype.routes = function (req, res, next) {
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
    return Productgroepbestelling;
}(crud_1.Crud));
exports.Productgroepbestelling = Productgroepbestelling;
//# sourceMappingURL=productgroepbestelling.js.map