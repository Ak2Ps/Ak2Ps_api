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
var db_1 = __importDefault(require("./db"));
var util_1 = require("./util");
var logger_1 = require("./logger");
var Crud = /** @class */ (function () {
    function Crud(dict) {
        this.dict = dict;
        logger_1.Logger.info("Creating " + this.dict.table);
    }
    Crud.prototype.mergeRowToBody = function (req, res, next, fields, row) {
        var value = "";
        fields.forEach(function (element) {
            if (!req.body[element.row]) {
                value = row[element.row];
                req.body[element.row] = value;
            }
        });
    };
    Crud.prototype.addSelectFields = function (req, res, next, fields) {
        var result = "";
        fields.forEach(function (element) {
            if (result != "") {
                result += ",";
            }
            result += "\n";
            result += element.sql;
        });
        return result;
    };
    Crud.prototype.addWhere = function (req, res, next, where) {
        var result = "";
        where.forEach(function (element) {
            if (req.query[element.query]) {
                var thisString = db_1.default.fix(req.query[element.query]);
                if (result == "") {
                    result += "\nwhere ";
                }
                else {
                    result += "\nand ";
                }
                result += element.sql.replace("?", "" + thisString);
            }
        });
        return result;
    };
    Crud.prototype.addOrderby = function (req, res, next, orderby) {
        var result = "";
        if (orderby) {
            result = "\norder by " + orderby;
        }
        return result;
    };
    Crud.prototype.addUpdateFields = function (req, res, next, fields) {
        var result = "";
        var value = "";
        var sql = "";
        fields.forEach(function (element) {
            if (result != "") {
                result += ",";
            }
            result += "\n";
            value = db_1.default.fix(req.body[element.body]);
            //
            sql = String(element.sql);
            if (sql.indexOf('?') >= 0) {
                sql = sql.replace(/\?/g, value);
                result += sql;
            }
            else {
                result += sql + " = '" + value + "'";
            }
        });
        return result;
    };
    Crud.prototype.addInsertKeyList = function (req, res, next, fields) {
        var result = "";
        fields.forEach(function (element) {
            if (result == "") {
                result += "\n(";
            }
            else {
                result += ",\n";
            }
            result += "" + element.sql;
        });
        if (result != "") {
            result += ")";
        }
        return result;
    };
    Crud.prototype.addInsertKeyValues = function (req, res, next, fields) {
        var result = "";
        var value = "";
        fields.forEach(function (element) {
            if (result == "") {
                result += "\n";
            }
            else {
                result += ",\n";
            }
            value = db_1.default.fix(req.body[element.body]);
            result += "'" + value + "'";
        });
        return result;
    };
    Crud.prototype.addInsertKeyWhere = function (req, res, next, fields) {
        var result = "";
        var value = "";
        fields.forEach(function (element) {
            if (result == "") {
                result += "\n";
            }
            else {
                result += "\n and ";
            }
            value = db_1.default.fix(req.body[element.body]);
            result += element.sql + " = '" + value + "'";
        });
        return result;
    };
    Crud.prototype.createSelectSql = function (req, res, next, options) {
        var _a, _b, _c;
        var sql = "select";
        sql += this.addSelectFields(req, res, next, (_a = options === null || options === void 0 ? void 0 : options.select) === null || _a === void 0 ? void 0 : _a.fields);
        sql += "\nfrom " + (options === null || options === void 0 ? void 0 : options.table);
        sql += this.addWhere(req, res, next, (_b = options === null || options === void 0 ? void 0 : options.select) === null || _b === void 0 ? void 0 : _b.where);
        sql += this.addOrderby(req, res, next, (_c = options === null || options === void 0 ? void 0 : options.select) === null || _c === void 0 ? void 0 : _c.orderby);
        return sql;
    };
    Crud.prototype.createQuerySql = function (req, res, next, options) {
        var _a, _b, _c;
        var sql = "select";
        sql += this.addSelectFields(req, res, next, (_a = options === null || options === void 0 ? void 0 : options.query) === null || _a === void 0 ? void 0 : _a.fields);
        sql += "\nfrom " + (options === null || options === void 0 ? void 0 : options.table);
        sql += this.addWhere(req, res, next, (_b = options === null || options === void 0 ? void 0 : options.query) === null || _b === void 0 ? void 0 : _b.where);
        sql += this.addOrderby(req, res, next, (_c = options === null || options === void 0 ? void 0 : options.query) === null || _c === void 0 ? void 0 : _c.orderby);
        return sql;
    };
    Crud.prototype.doCheckField = function (req, res, next, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var result, value;
            return __generator(this, function (_c) {
                result = true;
                value = "";
                (_b = (_a = options === null || options === void 0 ? void 0 : options.update) === null || _a === void 0 ? void 0 : _a.fields) === null || _b === void 0 ? void 0 : _b.forEach(function (element) {
                    value = req.body[element.body];
                    if (element.default !== undefined) {
                        if (!value || String(value).trim() == "") {
                            req.body[element.body] = element.default;
                            value = req.body[element.body];
                        }
                    }
                    if (element.required) {
                        if (String(value).trim() == "") {
                            res.crudResult.messages.push({
                                field: element.sql,
                                message: "verplicht invullen",
                            });
                            res.crudResult.success = false;
                            result = false;
                        }
                    }
                    if (element.maxLength) {
                        if (String(value).length > element.maxLength) {
                            res.crudResult.messages.push({
                                field: element.sql,
                                message: "[" + value + "] te lang",
                            });
                            res.crudResult.success = false;
                            result = false;
                        }
                    }
                    if (element.minValue) {
                        if (Number(value) < element.minValue) {
                            res.crudResult.messages.push({
                                field: element.sql,
                                message: "[" + value + "] te klein",
                            });
                            res.crudResult.success = false;
                            result = false;
                        }
                    }
                    if (element.maxValue) {
                        if (Number(value) > element.maxValue) {
                            res.crudResult.messages.push({
                                field: element.sql,
                                message: "[" + value + "] te groot",
                            });
                            res.crudResult.success = false;
                        }
                    }
                });
                return [2 /*return*/, (result)];
            });
        });
    };
    Crud.prototype.doCheckRecord = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = true;
                return [2 /*return*/, (result)];
            });
        });
    };
    Crud.prototype.doCheckDatabase = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = true;
                return [2 /*return*/, (result)];
            });
        });
    };
    Crud.prototype.doUpdateInsert = function (req, res, next, options) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, _d, result;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        //
                        _d = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _d.crudConnection = _e.sent();
                        //
                        // Haal de oude gegevens op
                        //
                        sql = "select";
                        sql += this.addSelectFields(req, res, next, (_a = options === null || options === void 0 ? void 0 : options.query) === null || _a === void 0 ? void 0 : _a.fields);
                        sql += "\n  from " + (options === null || options === void 0 ? void 0 : options.table) + "\n  where ";
                        sql += this.addInsertKeyWhere(req, res, next, options === null || options === void 0 ? void 0 : options.key);
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _e.sent();
                        //
                        // Merge 
                        //
                        if (rows[0]) {
                            this.mergeRowToBody(req, res, next, (_b = this.dict.select) === null || _b === void 0 ? void 0 : _b.fields, rows[0]);
                        }
                        result = true;
                        return [4 /*yield*/, this.doCheckField(req, res, next, options)];
                    case 3:
                        if ((_e.sent()) === false) {
                            result = false;
                        }
                        return [4 /*yield*/, this.doCheckRecord(req, res, next, options)];
                    case 4:
                        if ((_e.sent()) === false) {
                            result = false;
                        }
                        return [4 /*yield*/, this.doCheckDatabase(req, res, next, options)];
                    case 5:
                        if ((_e.sent()) === false) {
                            result = false;
                        }
                        if (result == false) {
                            logger_1.Logger.sql(JSON.stringify(res.crudResult, null, 2));
                            res.crudConnection.release();
                            res.status(200).send(res.crudResult);
                            return [2 /*return*/];
                        }
                        if (!(Number(req.body.ID) < 0)) return [3 /*break*/, 7];
                        sql = "\nselect ifnull(max(ID),0) + 1 as last_id\nfrom " + (options === null || options === void 0 ? void 0 : options.table);
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        rows = _e.sent();
                        req.body.ID = rows[0].last_id;
                        _e.label = 7;
                    case 7:
                        //
                        // mogelijk moet deze key ingevoegd worden
                        //
                        sql = "insert into " + (options === null || options === void 0 ? void 0 : options.table);
                        sql += this.addInsertKeyList(req, res, next, options === null || options === void 0 ? void 0 : options.key);
                        sql += "\nselect";
                        sql += this.addInsertKeyValues(req, res, next, options === null || options === void 0 ? void 0 : options.key);
                        sql += "\nfrom dual where not exists \n(select 1 from  " + (options === null || options === void 0 ? void 0 : options.table) + "\nwhere ";
                        sql += this.addInsertKeyWhere(req, res, next, options === null || options === void 0 ? void 0 : options.key);
                        sql += " )";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 8:
                        rows = _e.sent();
                        //
                        // en daarna de update
                        //
                        sql = "update " + (options === null || options === void 0 ? void 0 : options.table) + " set";
                        sql += this.addUpdateFields(req, res, next, (_c = options === null || options === void 0 ? void 0 : options.update) === null || _c === void 0 ? void 0 : _c.fields);
                        sql += "\nwhere id = " + db_1.default.fix(req.body.ID);
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 9:
                        rows = _e.sent();
                        //
                        // en daarna de afterupdate
                        //
                        return [4 /*yield*/, this.doAfterUpdate(req, res, next, options)];
                    case 10:
                        //
                        // en daarna de afterupdate
                        //
                        _e.sent();
                        //
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Crud.prototype.doAfterUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = true;
                return [2 /*return*/, (result)];
            });
        });
    };
    Crud.prototype.createDelete = function (req, res, next, options) {
        var id = db_1.default.getDataId(req);
        var sql = "\ndelete from " + (options === null || options === void 0 ? void 0 : options.table) + " \nwhere id = " + id + ";";
        return sql;
    };
    Crud.prototype.doCheckDelete = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = true;
                return [2 /*return*/, (result)];
            });
        });
    };
    Crud.prototype.doAfterDelete = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = true;
                return [2 /*return*/, (result)];
            });
        });
    };
    Crud.prototype.doSelect = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sql, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        sql = this.createSelectSql(req, res, next, options);
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
    Crud.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, sql, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        sql = this.createQuerySql(req, res, next, options);
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
    Crud.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doUpdateInsert(req, res, next, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Crud.prototype.doInsert = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.doUpdateInsert(req, res, next, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Crud.prototype.doDelete = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sql, _a, rows;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.doCheckDelete(req, res, next, options)];
                    case 1:
                        result = _b.sent();
                        if (result == false) {
                            res.status(200).send(res.crudResult);
                            return [2 /*return*/];
                        }
                        sql = this.createDelete(req, res, next, options);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 2:
                        _a.crudConnection = _b.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rows = _b.sent();
                        //
                        // en daarna de afterdelete
                        //
                        return [4 /*yield*/, this.doAfterDelete(req, res, next, options)];
                    case 4:
                        //
                        // en daarna de afterdelete
                        //
                        _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    Crud.prototype.routes = function (req, res, next) {
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
                else if (method == "PUT") {
                    this.doUpdate(req, res, next, this.dict);
                }
                else if (method == "POST") {
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
    return Crud;
}());
exports.Crud = Crud;
//# sourceMappingURL=crud.js.map