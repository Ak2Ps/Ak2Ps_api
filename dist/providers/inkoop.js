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
//
var dict = {
    table: "inkoop",
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
var Inkoop = /** @class */ (function (_super) {
    __extends(Inkoop, _super);
    function Inkoop() {
        return _super.call(this, dict) || this;
    }
    Inkoop.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var productnummer, productgroep, leverancier, swlijn, datum, details, negatief, _a, where, result, sql, rows, wiproductnummer, wirow, swfirst, irow, row;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        productnummer = db_1.default.fix(req.query.productnummer || '');
                        productgroep = db_1.default.fix(req.query.productgroep || '');
                        leverancier = db_1.default.fix(req.query.leverancier || '');
                        swlijn = db_1.default.fix(req.query.swlijn || '');
                        datum = db_1.default.fix(req.query.datum || '');
                        details = db_1.default.fix(req.query.details || '');
                        negatief = db_1.default.fix(req.query.negatief || '');
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        where = '';
                        result = '';
                        sql = "\nselect *, \ncase when leveranciercount = 1 then leveranciermin else '...' end as leverancier,\ndate2screendate(mindatumtijd) as MINDATUM\n\nfrom (\nselect concat('V_',PRODUCTVOORRAAD.actie) \nas type,\n(select OPMERKING from PRODUCTOPMERKING \nwhere PRODUCT.productnummer = PRODUCTOPMERKING.productnummer \nand PRODUCTOPMERKING.bron = 'INKOOP') \nas PRODUCTOPMERKING,\nPRODUCTVOORRAAD.id, \nPRODUCTVOORRAAD.productnummer, \nPRODUCT.productnaam,\ngetLijn(PRODUCT.productnummer)\nas lijn,\ncase when PRODUCTVOORRAAD.actie = 'VRD' then PRODUCTVOORRAAD.voorraad else null end \nas voorraad,\nifnull(PRODUCT.leverdagen,0) as leverdagen,\ncase when PRODUCTVOORRAAD.actie = 'VE' then PRODUCTVOORRAAD.voorraad else null end \nas inorder,\ncase when PRODUCTVOORRAAD.actie = 'BE' then PRODUCTVOORRAAD.voorraad else null end \nas inproductie,\ncase when PRODUCTVOORRAAD.actie = 'OP' then PRODUCTVOORRAAD.voorraad else null end \nas inbewerking,\ncase when PRODUCTVOORRAAD.actie = 'BES' then PRODUCTVOORRAAD.voorraad else null end \nas inbestelling,\nPRODUCTVOORRAAD.actievoorraad as vrij,\n(select min(actievoorraad) from PRODUCTVOORRAAD MA \nwhere MA.productnummer = PRODUCTVOORRAAD.productnummer) as minvrd,\n(select min(voorraaddatumtijd) from PRODUCTVOORRAAD MA \nwhere MA.productnummer = PRODUCTVOORRAAD.productnummer \nand MA.actievoorraad < 0) as mindatumtijd,\n(select count(*) from BESTELLING \nwhere BESTELLING.productnummer = PRODUCTVOORRAAD.productnummer) \nas leveranciercount,\n(select min(leveranciernummer) from BESTELLING \nwhere BESTELLING.productnummer = PRODUCTVOORRAAD.productnummer) \nas leveranciermin,\ndate2screendate(PRODUCTVOORRAAD.voorraaddatumtijd) as VOORRAADDATUM,\nPRODUCTVOORRAAD.voorraaddatumtijd\nfrom PRODUCTVOORRAAD,PRODUCT\nwhere PRODUCTVOORRAAD.productnummer = PRODUCT.productnummer";
                        if ((productgroep != '') && (productnummer != '')) {
                            where += "\nand (PRODUCT.productnummer in \n(select productnummer from PRODUCTGROEPREGEL \nwhere productgroep = '" + productgroep + "')\nor PRODUCT.productnummer like ('" + productnummer + "%'))";
                        }
                        else if (productgroep != '') {
                            where += "\nand PRODUCT.productnummer in \n(select productnummer from PRODUCTGROEPREGEL \nwhere productgroep = '" + productgroep + "')";
                        }
                        else if (productnummer != '') {
                            where += "\nand PRODUCT.productnummer like ('" + productnummer + "%')";
                        }
                        //
                        if (leverancier != '') {
                            where += "\nand PRODUCT.productnummer in \n(select productnummer from BESTELLING \nwhere Leveranciernummer = '" + leverancier + "')";
                        }
                        if (swlijn == 'Ja') {
                            where += "\nand PRODUCT.lijn is not null";
                        }
                        else if (swlijn == "Nee") {
                            where += "\nand PRODUCT.lijn is null";
                        }
                        if (datum != '') {
                            where += "\nand PRODUCTVOORRAAD.voorraaddatumtijd <= screendate2date('" + datum + "')";
                        }
                        sql += "\n" + where + "\n) BASE";
                        //
                        // Algemeen
                        //
                        if (negatief == 'on') {
                            sql += "\nwhere minvrd < 0";
                        }
                        sql += "\n            order by mindatumtijd,productnummer,voorraaddatumtijd,vrij desc";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        //
                        if (details == 'on') {
                            res.status(200).send(rows);
                        }
                        else {
                            wiproductnummer = '';
                            wirow = '';
                            swfirst = 1;
                            for (irow = 0; irow < rows.length; irow++) {
                                row = rows[irow];
                                if (row.PRODUCTNUMMER != wiproductnummer) {
                                    if (wirow != '') {
                                        if (swfirst == 1) {
                                            swfirst = 0;
                                            result += "\n[";
                                        }
                                        else {
                                            result += "\n,";
                                        }
                                        //$db -> jsonRow($wirow);
                                        result += JSON.stringify(wirow);
                                    }
                                    wirow = row;
                                    wirow.VOORRAADDATUM = wirow.MINDATUM;
                                    wiproductnummer = row.PRODUCTNUMMER;
                                }
                                else {
                                    wirow.INORDER = String(Number(wirow.INORDER) + Number(row.INORDER));
                                    wirow.INPRODUCTIE = String(Number(wirow.INPRODUCTIE) + Number(row.INPRODUCTIE));
                                    wirow.INBEWERKING = String(Number(wirow.INBEWERKING) + Number(row.INBEWERKING));
                                    wirow.INBESTELLING = String(Number(wirow.INBESTELLING) + Number(row.INBESTELLING));
                                    wirow.VOORRAADDATUM = wirow.MINDATUM;
                                    wirow.VRIJ = row.VRIJ;
                                }
                            }
                            if (wirow != '') {
                                if (swfirst == 1) {
                                    swfirst = 0;
                                    result += "[";
                                }
                                else {
                                    result += ",";
                                }
                                //$db -> jsonRow($wirow);
                                result += JSON.stringify(wirow);
                                result += ']';
                            }
                            else {
                                result += '[]';
                            }
                            res.status(200).send(result);
                            logger_1.Logger.test("Ignore diffs because of JSON.stringify versus db.jsonRow");
                        }
                        //
                        res.crudConnection.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    Inkoop.prototype.routes = function (req, res, next) {
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
    return Inkoop;
}(crud_1.Crud));
exports.Inkoop = Inkoop;
//# sourceMappingURL=inkoop.js.map