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
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var Gebruiker = /** @class */ (function () {
    function Gebruiker() {
        logger_1.Logger.info("Creating Gebruiker");
    }
    Gebruiker.prototype.getQuery = function (where, orderby) {
        if (!orderby) {
            orderby = "GEBRUIKER";
        }
        //
        var sql = "\nselect \ncast(id as CHAR) as ID,\ngebruiker as GEBRUIKER,\nmenu as MENU,\ntelefoon as TELEFOON,\nemail as EMAIL,\ncontactpersoon as CONTACTPERSOON,\nland as LAND,\nwoonplaats as WOONPLAATS,\nadres as ADRES,\nnaam as NAAM,\nhandtekening as HANDTEKENING,\naktief as AKTIEF,\nifnull(afdeling,'') as AFDELING,\n'' as HANDTEKENING_OMS,\nifnull(badge1,'') as BADGE1,\nifnull(badge2,'') as BADGE2,\nifnull((select naam from AFDELING where AFDELING.AFDELING = GEBRUIKER.AFDELING),'') as AFDELING_OMS\nfrom GEBRUIKER\nwhere gebruiker not in ('Admin','Gast','Mod')";
        if (where) {
            sql += " and " + where;
        }
        sql += " order by " + orderby + ";";
        return sql;
    };
    Gebruiker.prototype.getSelectQuery = function (value) {
        var sql = "\nselect \ngebruiker as ID,\nnaam as VALUE \nfrom GEBRUIKER\nwhere gebruiker not in ('Admin','Gast','Mod')\nand aktief = 1";
        if (value) {
            sql += " and ucase(naam) like '" + value + "'";
        }
        sql += " order by ucase(naam);";
        return sql;
    };
    Gebruiker.prototype.getMyInfoQuery = function (user) {
        var sql = "\nselect \ngebruiker as GEBRUIKER,\nmenu as MENU,\ntelefoon as TELEFOON,\nemail as EMAIL,\ncontactpersoon as CONTACTPERSOON,\nland as LAND,\nwoonplaats as WOONPLAATS,\nadres as ADRES,\nnaam as NAAM,\nhandtekening as HANDTEKENING,\n'' as HANDTEKENING_OMS,\n(select naam from AFDELING where AFDELING.AFDELING = GEBRUIKER.AFDELING) as AFDELING_OMS\nfrom GEBRUIKER\nwhere ucase(gebruiker) = ucase('" + user + "');";
        return sql;
    };
    Gebruiker.prototype.getKaartjeQuery = function (gebruiker) {
        var sql = "\nselect \nNAAM,\nGEBRUIKER \nfrom GEBRUIKER \nwhere ucase(gebruiker) = ucase('" + gebruiker + "');";
        return sql;
    };
    Gebruiker.prototype.getKaartjedataQuery = function (gebruiker) {
        var sql = "\nselect \nNAAM,\nGEBRUIKER,\n\"???\"as BARCODE \nfrom GEBRUIKER \nwhere ucase(gebruiker) = ucase('" + gebruiker + "');";
        return sql;
    };
    Gebruiker.prototype.getInsert = function (params) {
        var sql = "\ninsert into GEBRUIKER\n(menu,telefoon,email,contactpersoon,\nland,woonplaats,adres,\nnaam,handtekening,gebruiker,aktief,badge1,badge2)\nvalues (\n'" + db_1.default.fix(params.MENU) + "',\n'" + db_1.default.fix(params.TELEFOON) + "',\n'" + db_1.default.fix(params.EMAIL) + "',\n'" + db_1.default.fix(params.CONTACTPERSOON) + "',\n'" + db_1.default.fix(params.LAND) + "',\n'" + db_1.default.fix(params.WOONPLAATS) + "',\n'" + db_1.default.fix(params.ADRES) + "',\n'" + db_1.default.fix(params.NAAM) + "',\n'" + db_1.default.fix(params.HANDTEKENING) + "',\n'" + db_1.default.fix(params.GEBRUIKER) + "',\n'" + db_1.default.fix(params.AKTIEF) + "',\n'" + db_1.default.fix(params.BADGE1) + "',\n'" + db_1.default.fix(params.BADGE2) + "'\n);\nselect last_insert_id() as last_id;";
        return sql;
    };
    Gebruiker.prototype.getUpdate = function (params) {
        var sql = "\nupdate GEBRUIKER set\nmenu = '" + db_1.default.fix(params.MENU) + "',\ntelefoon = '" + db_1.default.fix(params.TELEFOON) + "',\nemail = '" + db_1.default.fix(params.EMAIL) + "',\ncontactpersoon = '" + db_1.default.fix(params.CONTACTPERSOON) + "',\nland = '" + db_1.default.fix(params.LAND) + "',\nwoonplaats = '" + db_1.default.fix(params.WOONPLAATS) + "',\nadres = '" + db_1.default.fix(params.ADRES) + "',\nnaam = '" + db_1.default.fix(params.NAAM) + "',\nhandtekening = '" + db_1.default.fix(params.HANDTEKENING) + "',\ngebruiker = '" + db_1.default.fix(params.GEBRUIKER) + "',\nafdeling = (select min(afdeling) from AFDELING where naam = '" + db_1.default.fix(params.AFDELING_OMS) + "'),\naktief = '" + db_1.default.fix(params.AKTIEF) + "',\nbadge1 = '" + db_1.default.fix(params.BADGE1) + "',\nbadge2 = '" + db_1.default.fix(params.BADGE2) + "'\nwhere id = " + db_1.default.fix(params.ID) + ";";
        return sql;
    };
    Gebruiker.prototype.getDelete = function (Id) {
        var sql = "\ndelete from GEBRUIKER\nwhere id = " + Id + ";";
        return sql;
    };
    Gebruiker.prototype.getMyInfoUpdate = function (params) {
        var sql = "\nupdate GEBRUIKER set\nemail =  '" + db_1.default.fix(params.email) + "',\nwoonplaats =  '" + db_1.default.fix(params.woonplaats) + "',\nadres = '" + db_1.default.fix(params.adres) + "',\nnaam =  '" + db_1.default.fix(params.naam) + "'\nwhere ucase(gebruiker) = ucase('" + db_1.default.fix(params.gebruiker) + "');";
        return sql;
    };
    Gebruiker.prototype.getMyPasswordUpdate = function (params) {
        var sql = "\nupdate GEBRUIKER set\nwachtwoord =  '" + db_1.default.fix(params.wachtwoord) + "'\nwhere ucase(gebruiker) = ucase('" + db_1.default.fix(params.gebruiker) + "');";
        return sql;
    };
    Gebruiker.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action, value, connection, sql, rows, connection, sql, rows, connection, sql, rows, connection, sql, rows, where, connection, sql, rows, connection, sql, rows, rows_1, connection, sql, rows, result, connection, sql, rows, connection, sql, rows, last_id, where, connection, sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = req.method;
                        action = db_1.default.fix(req.query.action || '');
                        value = db_1.default
                            .fix(req.query.value)
                            .toUpperCase()
                            .replace(/\*/gi, "%");
                        logger_1.Logger.test("Gebruiker: " + method + ", " + action + ", " + value);
                        if (!(method == "GET")) return [3 /*break*/, 10];
                        if (!(action == "select")) return [3 /*break*/, 3];
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        sql = this.getSelectQuery(value);
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                    case 3:
                        if (!(action == "getall")) return [3 /*break*/, 6];
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 4:
                        connection = _a.sent();
                        sql = this.getQuery("", "");
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 5:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                    case 6: return [4 /*yield*/, db_1.default.waitConnection()];
                    case 7:
                        connection = _a.sent();
                        sql = this.getQuery("Aktief = 1", "");
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 8:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                    case 9: return [3 /*break*/, 37];
                    case 10:
                        if (!(method == "PUT")) return [3 /*break*/, 14];
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 11:
                        connection = _a.sent();
                        sql = this.getUpdate(req.body);
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 12:
                        rows = _a.sent();
                        where = "ID = " + db_1.default.fix(req.body.ID) + " ";
                        sql = this.getQuery(where, "");
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 13:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                    case 14:
                        if (!(method == "POST")) return [3 /*break*/, 34];
                        if (!(action == "getmyinfo")) return [3 /*break*/, 17];
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 15:
                        connection = _a.sent();
                        sql = this.getMyInfoQuery(db_1.default.fix(req.ak2_user));
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 16:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                    case 17:
                        if (!(action == "setmyinfo")) return [3 /*break*/, 23];
                        req.body.gebruiker = req.ak2_user;
                        if (req.body.wachtwoord != req.body.herhaalwachtwoord) {
                            res.status(200).send("[{\"msg\":\"Wachtwoorden komen niet overeen\"}]");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 18:
                        connection = _a.sent();
                        sql = this.getMyInfoUpdate(req.body);
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 19:
                        rows = _a.sent();
                        if (!req.body.wachtwoord) return [3 /*break*/, 21];
                        sql = this.getMyPasswordUpdate(db_1.default.fix(req.body.gebruiker));
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 20:
                        rows_1 = _a.sent();
                        connection.release();
                        res.status(200).send("[{}]");
                        return [2 /*return*/];
                    case 21:
                        connection.release();
                        res.status(200).send("[{}]");
                        _a.label = 22;
                    case 22: return [2 /*return*/];
                    case 23:
                        if (!(action == "kaartje")) return [3 /*break*/, 26];
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 24:
                        connection = _a.sent();
                        sql = this.getKaartjeQuery(String(req.query.gebruiker));
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 25:
                        rows = _a.sent();
                        connection.release();
                        result = "<table><tr>\n<td>" + rows[0].NAAM + "</td>\n</tr></table><br>\n<table><tr>\n<td id=\"b_barcode\"></td>\n</tr></table><br>\n";
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 26:
                        if (!(action == "kaartjedata")) return [3 /*break*/, 29];
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 27:
                        connection = _a.sent();
                        sql = this.getKaartjedataQuery(String(req.query.gebruiker));
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 28:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                    case 29: return [4 /*yield*/, db_1.default.waitConnection()];
                    case 30:
                        connection = _a.sent();
                        sql = this.getInsert(req.body);
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 31:
                        rows = _a.sent();
                        last_id = rows[1][0].last_id;
                        where = "ID = " + last_id + " ";
                        sql = this.getQuery(where, "");
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 32:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                    case 33: return [3 /*break*/, 37];
                    case 34:
                        if (!(method == "DELETE")) return [3 /*break*/, 37];
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 35:
                        connection = _a.sent();
                        sql = this.getDelete(db_1.default.getDataId(req));
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 36:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send("[{}]");
                        return [2 /*return*/];
                    case 37:
                        util_1.Util.unknownOperation(req, res, next);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Gebruiker;
}());
exports.Gebruiker = Gebruiker;
//# sourceMappingURL=gebruiker.js.map