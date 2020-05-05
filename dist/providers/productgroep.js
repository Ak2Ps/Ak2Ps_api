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
var dict = {
    table: "PRODUCTGROEP",
    key: [
        {
            body: "PRODUCTGROEP",
            sql: "PRODUCTGROEP",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(PRODUCTGROEP)",
        where: [
            {
                query: "value",
                sql: "ucase(PRODUCTGROEP) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTGROEP as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTGROEP AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTGROEP",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "productgroep",
                sql: "PRODUCTGROEP like ('?%')",
            },
            {
                query: "metonderdelen",
                sql: "METONDERDELEN like ('?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "PRODUCTGROEP",
                sql: "ifnull(PRODUCTGROEP,'') as PRODUCTGROEP",
            },
            {
                row: "METONDERDELEN",
                sql: "ifnull(METONDERDELEN,'') as METONDERDELEN",
            },
            {
                row: "AANTAL",
                sql: "\ncast(\n(select count(*) from PRODUCTGROEPREGEL\nwhere PRODUCTGROEPREGEL.PRODUCTGROEP = PRODUCTGROEP.PRODUCTGROEP) as char) as AANTAL",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "PRODUCTGROEP",
                sql: "PRODUCTGROEP",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "METONDERDELEN",
                sql: "METONDERDELEN",
                required: false,
                maxLength: 1,
                default: "",
            }
        ],
    },
};
var Productgroep = /** @class */ (function (_super) {
    __extends(Productgroep, _super);
    function Productgroep() {
        return _super.call(this, dict) || this;
    }
    Productgroep.prototype.doDelete9 = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var productgroep, all, msg, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productgroep = db_1.default.fix(req.body.productgroep);
                        all = db_1.default.fix(req.body.all);
                        msg = "";
                        //
                        if (!productgroep) {
                            msg = "Productgroep verplicht invullen";
                            res.status(200).send({
                                items: [{ msg: msg }]
                            });
                            return [2 /*return*/];
                        }
                        sql = "\nselect * from PRODUCTGROEP\nwhere productgroep = '" + productgroep + "';";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        if (!(rows.length <= 0)) return [3 /*break*/, 3];
                        msg = "Productgroep bestaat niet";
                        return [3 /*break*/, 8];
                    case 3:
                        sql = "\ndelete from PRODUCTGROEPREGEL\nwhere productgroep = '" + productgroep + "'";
                        if (all != "all") {
                            sql += " and cast(PRODUCTNUMMER as decimal) > 0";
                        }
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 4:
                        result = _a.sent();
                        if (!(rows[0].METONDERDELEN == "1")) return [3 /*break*/, 7];
                        return [4 /*yield*/, onderdeelproductgroep_1.Onderdeelproductgroep.delete(req, res, next, productgroep)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, onderdeelproductgroep_1.Onderdeelproductgroep.add(req, res, next, productgroep, "", 0)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        res.status(200).send({
                            items: [{ msg: msg }]
                        });
                        _a.label = 8;
                    case 8:
                        connection.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    Productgroep.prototype.doInsert9 = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var productgroep, all, msg, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        productgroep = db_1.default.fix(req.body.productgroep);
                        all = db_1.default.fix(req.body.all);
                        msg = "";
                        //
                        if (!productgroep) {
                            msg = "Productgroep verplicht invullen";
                            res.status(200).send({
                                items: [{ msg: msg }]
                            });
                            return [2 /*return*/];
                        }
                        sql = "select * from PRODUCTGROEP\nwhere productgroep = '" + productgroep + "';";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        if (!(rows.length <= 0)) return [3 /*break*/, 3];
                        msg = "Productgroep bestaat niet";
                        return [3 /*break*/, 7];
                    case 3:
                        sql = "\ninsert into PRODUCTGROEPREGEL (productgroep,productnummer,IsOnderdeel)\nselect '" + productgroep + "',productnummer,null from PRODUCT\nwhere not exists (select 1 from PRODUCTGROEPREGEL\nwhere productgroep = '" + productgroep + "'\nand PRODUCTGROEPREGEL.productnummer = PRODUCT.productnummer)";
                        if (all != "all") {
                            sql += " and cast(PRODUCTNUMMER as decimal) > 0";
                        }
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 4:
                        result = _a.sent();
                        if (!(rows[0].METONDERDELEN == "1")) return [3 /*break*/, 6];
                        return [4 /*yield*/, onderdeelproductgroep_1.Onderdeelproductgroep.add(req, res, next, productgroep, "", 0)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        res.status(200).send({
                            items: [{ msg: msg }]
                        });
                        _a.label = 7;
                    case 7:
                        connection.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    Productgroep.prototype.routes = function (req, res, next) {
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
                    this.doQuery(req, res, next, this.dict);
                }
                else if (method == "PUT" || method == "POST") {
                    if (action == "delete9") {
                        this.doDelete9(req, res, next, this.dict);
                    }
                    else if (action == "insert9") {
                        this.doInsert9(req, res, next, this.dict);
                    }
                    else {
                        this.doUpdate(req, res, next, this.dict);
                    }
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
    return Productgroep;
}(crud_1.Crud));
exports.Productgroep = Productgroep;
//# sourceMappingURL=productgroep.js.map