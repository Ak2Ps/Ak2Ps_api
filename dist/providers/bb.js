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
var mailer_1 = require("../mailer");
var config_1 = require("../config");
var Bb = /** @class */ (function () {
    function Bb() {
        this.mailer = new mailer_1.Mailer();
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
    Bb.prototype.addMsg = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var bb, datum, author, email, header, inhoud, moderated, connection, result, sql, rows, bbmod, to, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bb = String(req.query.bb || req.body.bb);
                        datum = String(req.query.datum || req.body.datum);
                        author = String(req.query.author || req.body.author);
                        email = String(req.query.email || req.body.email);
                        header = String(req.query.header || req.body.header);
                        inhoud = String(req.query.inhoud || req.body.inhoud);
                        moderated = String(req.query.moderated || req.body.moderated);
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        result = null;
                        sql = '';
                        bbmod = config_1.Config.bbmod;
                        if (!(bbmod != '')) return [3 /*break*/, 3];
                        to = bbmod;
                        message = decodeURIComponent(inhoud).replace(/<br>/gi, '').replace(/\n/gi, '<br>');
                        return [4 /*yield*/, this.mailer.send(to, header, message)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(bb == "Home")) return [3 /*break*/, 5];
                        sql = "\ndelete from BBMSG\nwhere bb='" + bb + "';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 4:
                        rows = _a.sent();
                        _a.label = 5;
                    case 5:
                        sql = "\ninsert into BBMSG (\nbb,date,\nauthor,email,header,\ninhoud,\nmoderated) \nvalues (\n'" + bb + "',screendate2date('" + datum + "'),\n'" + db_1.default.fix(author) + "',\n'" + db_1.default.fix(email) + "',\n'" + db_1.default.fix(header) + "',\n'" + db_1.default.fix(db_1.default.editorfix(inhoud)) + "',\n'" + db_1.default.fix(moderated) + "'\n);";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 6:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                { msg: "" }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bb.prototype.getMsg = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var bb, where, result, row, connection, sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bb = req.query.bb || req.body.bb;
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
                        if (rows[0]) {
                            row = rows[0];
                        }
                        else {
                            row.ID = '';
                            row.DATUM = '';
                            row.AUTHOR = '';
                            row.HEADER = '';
                            row.INHOUD = '';
                            row.MODERATED = '';
                        }
                        result = {
                            items: [
                                {
                                    msg: "",
                                    id: row.ID,
                                    datum: row.DATUM,
                                    author: row.AUTHOR,
                                    email: row.EMAIL,
                                    header: row.HEADER,
                                    inhoud: row.INHOUD,
                                    moderated: row.MODERATED
                                }
                            ]
                        };
                        connection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bb.prototype.showBb = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var bb, connection, where, orderby, sql, result, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bb = String(req.query.bb || req.body.bb);
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        where = "BB = '" + bb + "' and IdMaster is null";
                        orderby = "date desc, id desc";
                        sql = this.getQuery(where, orderby);
                        result = "";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        //
                        result += "<br>";
                        result += '<div style="margin-left: 8px;border: 1px solid lightgray;width: 60em">';
                        rows.forEach(function (row) {
                            result += "<div>";
                            if (bb != "Home") {
                                result += "<b>" + row.AUTHOR;
                                if (row.EMAIL != "") {
                                    result += '&nbsp;(</b><a href="mailto:' + row.EMAIL + '">' + row.EMAIL + "</a><b>)";
                                }
                                result += "&nbsp;zegt op &nbsp;" + row.DATUM + ":</b>";
                            }
                            result += "</div>";
                            if (row.HEADER != "") {
                                result += '<br><div style="padding-left: 20px;"><b>' + row.HEADER + "</b></div><br>";
                            }
                            result += '<div style="padding-left: 40px; ">' + decodeURIComponent(row.INHOUD) + "</div>";
                            result += "<br>";
                            result += "<br><br>";
                        });
                        result += "</div>";
                        result += "<br>";
                        connection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Bb.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action;
            return __generator(this, function (_a) {
                method = req.method;
                action = util_1.Util.getLast(req.query.action);
                //
                logger_1.Logger.request(req);
                //
                if (action == "showbb") {
                    this.showBb(req, res, next);
                }
                else if (action == "addmsg") {
                    this.addMsg(req, res, next);
                }
                else if (action == "getmsg") {
                    this.getMsg(req, res, next);
                }
                else if (action == "updatemsg") {
                    util_1.Util.unknownOperation(req, res, next);
                }
                else if (action == "deletemsg") {
                    util_1.Util.unknownOperation(req, res, next);
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Bb;
}());
exports.Bb = Bb;
//# sourceMappingURL=bb.js.map