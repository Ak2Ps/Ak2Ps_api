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
exports.Retourproduct = void 0;
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
//
var dict = {
    table: "RETOURPRODUCT",
    key: [
        {
            body: "ID",
            sql: "ID",
        },
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(PRODUCTNUMMER)",
        where: [
            {
                query: "value",
                sql: "ucase(PRODUCTNUMMER) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "REFERENTIE as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "referentie,productnummer",
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
                query: "productnummer",
                sql: "ucase(PRODUCTNUMMER) like ucase('%?%')",
            },
            {
                query: "aantal",
                sql: "AANTAL = ?",
            },
            {
                query: "klantproductnummer",
                sql: "ucase(KLANTPRODUCTNUMMER) like ucase('%?%')",
            },
            {
                query: "serienummer",
                sql: "ucase(SERIENUMMER) like ucase('%?%')",
            },
            {
                query: "productiedatumtijd",
                sql: "PRODUCTIEDATUMTIJD > screendate2date('?')",
            },
            {
                query: "opmerking",
                sql: "ucase(OPMERKING) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "REFERENTIE",
                sql: "ifnull(REFERENTIE,'') as REFERENTIE",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "AANTAL",
                sql: "ifnull(cast(AANTAL as CHAR),'') as AANTAL",
            },
            {
                row: "KLANTPRODUCTNUMMER",
                sql: "ifnull(KLANTPRODUCTNUMMER,'') as KLANTPRODUCTNUMMER",
            },
            {
                row: "SERIENUMMER",
                sql: "ifnull(SERIENUMMER,'') as SERIENUMMER",
            },
            {
                row: "PRODUCTIEDATUMTIJD",
                sql: "date2jsondate(PRODUCTIEDATUMTIJD) as PRODUCTIEDATUMTIJD",
            },
            {
                row: "OPMERKING",
                sql: "ifnull(OPMERKING,'') as OPMERKING",
            },
            {
                row: "PRODUCTIEDATUM",
                sql: "date2screendate(PRODUCTIEDATUMTIJD) as PRODUCTIEDATUM",
            },
            {
                row: "PRODUCTNAAM",
                sql: "ifnull((select productnaam from PRODUCT where PRODUCT.productnummer = RETOURPRODUCT.productnummer),'') as PRODUCTNAAM",
            },
            {
                row: "LEVERANCIERPRODUCTNUMMER",
                sql: "ifnull((select leverancierproductnummer from PRODUCT where PRODUCT.productnummer = RETOURPRODUCT.productnummer),'') as LEVERANCIERPRODUCTNUMMER",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "REFERENTIE",
                sql: "REFERENTIE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRODUCTNUMMER",
                sql: "PRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "AANTAL",
                sql: "AANTAL = '?'",
                required: false,
                maxLength: 16,
                default: "",
            },
            {
                body: "KLANTPRODUCTNUMMER",
                sql: "KLANTPRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "SERIENUMMER",
                sql: "SERIENUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRODUCTIEDATUM",
                sql: "PRODUCTIEDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
        ],
    },
};
var Retourproduct = /** @class */ (function (_super) {
    __extends(Retourproduct, _super);
    function Retourproduct() {
        return _super.call(this, dict) || this;
    }
    Retourproduct.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, _a, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sql = this.createQuerySql(req, res, next, options);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
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
    Retourproduct.prototype.doInit = function (req, res, next, options) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, _b, rows;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        result = true;
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _b.crudConnection = _c.sent();
                        sql = "\ninsert into RETOURPRODUCT (referentie)\nselect '" + req.query.referentie + "' from DUAL\nwhere not exists (select 1 from RETOURPRODUCT where referentie = '" + req.query.referentie + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _c.sent();
                        //
                        sql = "select";
                        sql += this.addSelectFields(req, res, next, (_a = dict === null || dict === void 0 ? void 0 : dict.query) === null || _a === void 0 ? void 0 : _a.fields);
                        sql += " from " + (dict === null || dict === void 0 ? void 0 : dict.table);
                        sql += " where referentie = '" + req.query.referentie + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _c.sent();
                        //
                        res.crudConnection.release();
                        res.status(200).send(rows[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Retourproduct.prototype.doOvernemen = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, _a, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        result = true;
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        sql = "\nselect *,\n'" + req.query.rowindex + "' as rowindex\nfrom PRODUCT \nwhere id =  '" + req.query.productid + "'";
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
    Retourproduct.prototype.routes = function (req, res, next) {
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
                else if (action == "init") {
                    this.doInit(req, res, next, this.dict);
                }
                else if (action == "update") {
                    util_1.Util.unknownOperation(req, res, next);
                }
                else if (action == "overnemen") {
                    this.doOvernemen(req, res, next, this.dict);
                }
                else if (method == "GET") {
                    this.doQuery(req, res, next, this.dict);
                }
                else if (method == "PUT" || method == "POST") {
                    this.doUpdate(req, res, next, this.dict);
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
    return Retourproduct;
}(crud_1.Crud));
exports.Retourproduct = Retourproduct;
//# sourceMappingURL=retourproduct.js.map