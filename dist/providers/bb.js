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
var Bb = /** @class */ (function () {
    function Bb() {
        logger_1.Logger.info("Creating Bb");
    }
    Bb.prototype.getQuery = function (where, orderby) {
        if (!orderby) {
            orderby = "date,id";
        }
        //
        var sql = "\nselect \ncast(IdMaster as CHAR) as IDMASTER,\ncast(Id as CHAR) as ID,\nBb as BB,\nAuthor as AUTHOR,\nEmail as EMAIL,\ndate2screendate(date) as DATUM,\ncast(Moderated as CHAR) as MODERATED,\nHeader as HEADER,\nInhoud as INHOUD\nfrom BBMSG";
        if (where) {
            sql += " where " + where;
        }
        sql += " order by " + orderby + ";";
        //
        return sql;
    };
    Bb.prototype.addMsg = function (bb, datum, author, email, header, inhoud, moderated) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, result, sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        result = null;
                        sql = "\ndelete from BBMSG\nwhere bb='" + bb + "';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        sql = "\ninsert into BBMSG (\nbb,date,\nauthor,email,header,\ninhoud,\nmoderated) \nvalues (\n'" + bb + "',screendate2date('" + datum + "'),\n'" + db_1.default.fix(author) + "','" + db_1.default.fix(email) + "','" + db_1.default.fix(header) + "',\n'" + db_1.default.fix(db_1.default.editorfix(inhoud)) + "',\n'" + db_1.default.fix(moderated) + "'\n);";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _a.sent();
                        connection.release();
                        result = { items: [{ msg: "" }] };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Bb.prototype.getMsg = function (bb) {
        return __awaiter(this, void 0, void 0, function () {
            var where, result, connection, sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        where = "";
                        result = "";
                        where = "bb='" + bb + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        sql = this.getQuery(where, "");
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        result = {
                            items: [
                                {
                                    msg: "",
                                    id: rows[0].ID,
                                    datum: rows[0].DATUM,
                                    author: rows[0].AUTHOR,
                                    email: rows[0].EMAIL,
                                    header: rows[0].HEADER,
                                    inhoud: rows[0].INHOUD,
                                    moderated: rows[0].MODERATED
                                }
                            ]
                        };
                        connection.release();
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Bb.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action, bb, bbmod_1, bbadmin_1, bbsmtp_1, msg, connection, sql, rows, result, bbmod, bbadmin, bbsmtp, connection, result, sql, rows, connection, where, orderby, sql, result_1, rows, result, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = req.method;
                        action = util_1.Util.getLast(req.query.action);
                        bb = req.query.bb;
                        //
                        logger_1.Logger.test("bb: " + method + ", " + action);
                        if (!(action == "getsettings")) return [3 /*break*/, 3];
                        bbmod_1 = "";
                        bbadmin_1 = "";
                        bbsmtp_1 = "";
                        msg = "";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        sql = "\nselect \ncast(id as CHAR) as ID,\nnaam as NAAM,\ninhoud as INHOUD\nfrom PARAM\nwhere naam in ('BBSMTP','BBADMIN','BBMOD')";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        rows.forEach(function (row) {
                            if (row.NAAM == "BBSMTP") {
                                bbsmtp_1 = row.INHOUD;
                            }
                            else if (row.NAAM == "BBADMIN") {
                                bbadmin_1 = row.INHOUD;
                            }
                            else if (row.NAAM == "BBMOD") {
                                bbmod_1 = row.INHOUD;
                            }
                        });
                        connection.release();
                        result = {
                            items: [{ MSG: msg, BBADMIN: bbadmin_1, BBMOD: bbmod_1, BBSMTP: bbsmtp_1 }]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 3:
                        if (!(action == "setsettings")) return [3 /*break*/, 6];
                        bbmod = "";
                        if (req.query.bbmod) {
                            bbmod = String(req.query.bbmod);
                        }
                        else {
                            bbmod = String(req.body.bbmod);
                        }
                        bbadmin = "";
                        if (req.query.bbadmin) {
                            bbadmin = String(req.query.bbadmin);
                        }
                        else {
                            bbadmin = String(req.body.bbadmin);
                        }
                        bbsmtp = "";
                        if (req.query.bbsmtp) {
                            bbsmtp = String(req.query.bbsmtp);
                        }
                        else {
                            bbsmtp = String(req.body.bbsmtp);
                        }
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 4:
                        connection = _a.sent();
                        result = null;
                        sql = "\ninsert into PARAM (naam) select 'BBSMTP' from DUAL where not exists (select 1 from PARAM where naam = 'BBSMTP');\ninsert into PARAM (naam) select 'BBADMIN' from DUAL where not exists (select 1 from PARAM where naam = 'BBADMIN');\ninsert into PARAM (naam) select 'BBMOD' from DUAL where not exists (select 1 from PARAM where naam = 'BBMOD');\nupdate PARAM set inhoud = '" + db_1.default.fix(bbsmtp) + "' where naam = 'BBSMTP';\nupdate PARAM set inhoud = '" + db_1.default.fix(bbadmin) + "' where naam = 'BBADMIN';\nupdate PARAM set inhoud = '" + db_1.default.fix(bbmod) + "' where naam = 'BBMOD';\n";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 5:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [{ MSG: "", BBADMIN: bbadmin, BBMOD: bbmod, BBSMTP: bbsmtp }]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 6:
                        if (!(action == "showbb")) return [3 /*break*/, 9];
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 7:
                        connection = _a.sent();
                        where = "BB = '" + bb + "' and IdMaster is null";
                        orderby = "date desc, id desc";
                        sql = this.getQuery(where, orderby);
                        result_1 = "";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 8:
                        rows = _a.sent();
                        //
                        result_1 += "<br>";
                        result_1 += '<div style="margin-left: 8px;border: 1px solid lightgray;width: 60em">';
                        rows.forEach(function (row) {
                            result_1 += "<div>";
                            if (bb != "Home") {
                                result_1 += "<b>" + row.AUTHOR;
                                if (row.EMAIL != "") {
                                    result_1 += '&nbsp;(</b><a href="mailto:' + row.EMAIL + '">' + row.EMAIL + "</a><b>)";
                                }
                                result_1 += "&nbsp;zegt op &nbsp;" + row.DATUM + ":</b>";
                            }
                            result_1 += "</div>";
                            if (row.HEADER != "") {
                                result_1 += '<br><div style="padding-left: 20px;"><b>' + row.HEADER + "</b></div><br>";
                            }
                            result_1 += '<div style="padding-left: 40px; ">' + decodeURIComponent(row.INHOUD) + "</div>";
                            result_1 += "<br>";
                            result_1 += "<br><br>";
                        });
                        result_1 += "</div>";
                        result_1 += "<br>";
                        connection.release();
                        res.status(200).send(result_1);
                        return [2 /*return*/];
                    case 9:
                        if (!(action == "addmsg")) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.addMsg(String(bb), req.query.datum || req.body.datum, req.query.author || req.body.author, req.query.email || req.body.email, req.query.header || req.body.header, req.query.inhoud || req.body.inhoud, req.query.moderated || req.body.moderated)];
                    case 10:
                        result = _a.sent();
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 11:
                        if (!(action == "getmsg")) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.getMsg(req.query.bb || req.body.bb)];
                    case 12:
                        result = _a.sent();
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 13:
                        if (action == "updatemsg") {
                            // nvt
                            util_1.Util.unknownOperation(req, res, next);
                            return [2 /*return*/];
                        }
                        else if (action == "deletemsg") {
                            // nvt
                            util_1.Util.unknownOperation(req, res, next);
                            return [2 /*return*/];
                        }
                        _a.label = 14;
                    case 14:
                        util_1.Util.unknownOperation(req, res, next);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Bb;
}());
exports.Bb = Bb;
//# sourceMappingURL=bb.js.map