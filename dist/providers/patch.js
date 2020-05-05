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
var config_1 = require("../config");
//
var dict = {
    table: "patch",
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
var Patch = /** @class */ (function (_super) {
    __extends(Patch, _super);
    function Patch() {
        return _super.call(this, dict) || this;
    }
    Patch.prototype.getVersion = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, result, sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        result = '2016.1';
                        sql = "select inhoud from PARAM where naam = 'VERSIE'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        if (rows[0]) {
                            result = rows[0].INHOUD;
                        }
                        //
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Patch.prototype.setVersion = function (req, res, next, version) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = '';
                        //
                        sql = "\ninsert into PARAM\n(NAAM,INHOUD)\nselect\n'VERSIE',\n'" + db_1.default.fix(version) + "'\nfrom DUAL \nwhere not exists (\nselect 1 from PARAM\nwhere NAAM= 'VERSIE')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        _a.sent();
                        //
                        sql = "\nupdate PARAM set \nINHOUD = '" + version + "'\nwhere NAAM = 'VERSIE'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _a.sent();
                        //
                        return [2 /*return*/, version];
                }
            });
        });
    };
    Patch.prototype.addBb = function (req, res, next, bb, omschrijving) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = "\ninsert into BB \n(Bb,Omschrijving)\nselect\n'" + bb + "',\n'" + db_1.default.fix(omschrijving) + "'\nfrom DUAL \nwhere not exists (\nselect 1 from BB \nwhere Bb = '" + db_1.default.fix(bb) + "')";
                        //
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        //
                        _a.sent();
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.addUser = function (req, res, next, gebruiker, naam, menu, wachtwoord) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = "\ninsert into GEBRUIKER \n(Gebruiker,Naam,Menu,Wachtwoord,aktief)\nselect\n'" + db_1.default.fix(gebruiker) + "',\n'" + db_1.default.fix(naam) + "',\n'" + db_1.default.fix(menu) + "',\n'" + db_1.default.fix(wachtwoord) + "',\n'1'\nfrom DUAL where not exists \n(select 1 from GEBRUIKER \nwhere gebruiker = '" + db_1.default.fix(gebruiker) + "') ";
                        //
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        //
                        _a.sent();
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.addMenu = function (req, res, next, menu) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = "\ninsert into MENU_2015 \n(Menu)\nvalues\n(\n'" + db_1.default.fix(menu) + "'\n)";
                        //
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        //
                        _a.sent();
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.addOption = function (req, res, next, menu, volgnummer, omschrijving, submenu, link) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = "\ninsert into MENUREGEL_2015 \n(Menu,Volgnummer,Omschrijving,Submenu,Link)\nvalues (\n'" + db_1.default.fix(menu) + "',\n'" + String(volgnummer) + "',\n'" + db_1.default.fix(omschrijving) + "',\n'" + db_1.default.fix(submenu) + "',\n'" + db_1.default.fix(link) + "'\n)";
                        //
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        //
                        _a.sent();
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        res.crudResult.success = true;
                        if (!(query.action == "init")) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.doInit(req, res, next)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 3:
                        if (!(query.action == "p1")) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.doP1(req, res, next)];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 11];
                    case 5: return [4 /*yield*/, this.doUtf(req, res, next)];
                    case 6:
                        _b.sent();
                        return [4 /*yield*/, this.doAlter(req, res, next)];
                    case 7:
                        _b.sent();
                        return [4 /*yield*/, this.doMenu(req, res, next)];
                    case 8:
                        _b.sent();
                        return [4 /*yield*/, this.doView(req, res, next)];
                    case 9:
                        _b.sent();
                        return [4 /*yield*/, this.doProcedure(req, res, next)];
                    case 10:
                        _b.sent();
                        _b.label = 11;
                    case 11:
                        //
                        res.crudConnection.release();
                        res.status(200).send(res.crudResult);
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.doInit = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = db_1.default.fixQuery(req.query);
                //
                res.crudResult.messages.push({ field: "Init", message: "Init is niet van toepassing" });
                //
                return [2 /*return*/];
            });
        });
    };
    Patch.prototype.doUtf = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql, rows, row, sqldetail, irow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = '';
                        sqldetail = '';
                        sql = "\nSELECT \ntable_name,\nCONCAT('ALTER TABLE ',  table_name, ' CONVERT TO CHARACTER SET utf8 COLLATE utf8_bin;')\nas reorganize\nFROM information_schema.tables\nWHERE table_schema='" + config_1.Config.dbschema + "'\nAND table_collation != 'utf8_bin'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        irow = 0;
                        _a.label = 2;
                    case 2:
                        if (!(irow < rows.length)) return [3 /*break*/, 5];
                        row = rows[irow];
                        sqldetail = "\n" + row.REORGANIZE;
                        logger_1.Logger.info(sqldetail);
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqldetail)];
                    case 3:
                        _a.sent();
                        res.crudResult.messages.push({ field: row.TABLE_NAME, message: sqldetail });
                        _a.label = 4;
                    case 4:
                        irow++;
                        return [3 /*break*/, 2];
                    case 5:
                        //
                        res.crudResult.messages.push({ field: "Utf", message: "doUtf uitgevoerd ..." });
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.doP1 = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql, rows, row, sqldetail, irow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = '';
                        sqldetail = '';
                        sql = "\n\t\tselect \n\t\tbewerking.bewerkingsnummer,\n\t\tbewerking.einddatumtijd,productieaantal, \n\t\tmin(bewerkingaantal) as minaantal,\n\t\tmax(bewerkingaantal) as maxaantal from\n\t\t\tbewerking,\n\t\t\t(\n\t\t\tselect \n\t\t\t\tbewerkingsnummer,bewerkingsoort,\n\t\t\t\tsum(bewerkingaantal) as bewerkingaantal from \n\t\t\t\t\tBEWERKINGFLOW group by bewerkingsnummer, bewerkingsoort\n\t\t\t) s1\n\t\twhere bewerking.bewerkingsnummer = s1.bewerkingsnummer\n\t\tgroup by bewerkingsnummer\n\t\thaving (productieaantal < min(bewerkingaantal) or productieaantal > max(bewerkingaantal))\n\t\tand productieaantal < 0\n\t\torder by einddatumtijd,bewerkingsnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        rows = _a.sent();
                        irow = 0;
                        _a.label = 2;
                    case 2:
                        if (!(irow < rows.length)) return [3 /*break*/, 5];
                        row = rows[irow];
                        sqldetail = "\nupdate bewerking \nset productieaantal =  '" + row.MAXAANTAL + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqldetail)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        irow++;
                        return [3 /*break*/, 2];
                    case 5:
                        //
                        res.crudResult.messages.push({ field: "P1", message: "P1 uitgevoerd ..." });
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.doAlter = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql, rows, row, sqldetail, thisVersion, irow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = "";
                        sqldetail = '';
                        return [4 /*yield*/, this.getVersion(req, res, next)];
                    case 1:
                        thisVersion = _a.sent();
                        if (!(thisVersion == '2016.1')) return [3 /*break*/, 13];
                        sql = "\n            select *, \n            upper(table_name) as new_name \n            from information_schema.tables\n            where table_schema = '" + config_1.Config.dbschema + "'";
                        rows = db_1.default.waitQuery(res.crudConnection, sql);
                        irow = 0;
                        _a.label = 2;
                    case 2:
                        if (!(irow < rows.length)) return [3 /*break*/, 11];
                        row = rows[irow];
                        if (!(row.TABLE_NAME != row.NEW_NAME)) return [3 /*break*/, 4];
                        sqldetail = 'alter table '
                            + row.TABLE_NAME
                            + ' rename '
                            + row.NEW_NAME + ' ';
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqldetail)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(String(row.ENGINE).toUpperCase() != 'INNODB')) return [3 /*break*/, 6];
                        sqldetail = 'alter table '
                            + row.TABLE_NAME
                            + ' engine = InnoDB ';
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqldetail)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        if (!(String(row.TABLE_COLLATION).toUpperCase() != 'utf8_general_ci'.toUpperCase())) return [3 /*break*/, 8];
                        sqldetail = 'alter table '
                            + row.TABLE_NAME
                            + ' CHARACTER SET utf8 ';
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqldetail)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        sqldetail = 'alter table '
                            + row.TABLE_NAME
                            + ' convert to CHARACTER SET utf8 ';
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sqldetail)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        irow++;
                        return [3 /*break*/, 2];
                    case 11: return [4 /*yield*/, this.setVersion(req, res, next, '2020.1')];
                    case 12:
                        thisVersion = _a.sent();
                        _a.label = 13;
                    case 13:
                        if (!(thisVersion == '2020.1')) return [3 /*break*/, 16];
                        sql = "\ninsert into PARAM \n(inhoud,naam) \nselect \n'01-01-2019',\n'EXACTSTART' \nfrom dual\nwhere not exists (\nselect 1 from PARAM \nwhere naam = 'EXACTSTART')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, this.setVersion(req, res, next, '2020.2')];
                    case 15:
                        thisVersion = _a.sent();
                        _a.label = 16;
                    case 16:
                        if (!(thisVersion == '2020.2')) return [3 /*break*/, 19];
                        //thisVersion = await this.setVersion(req,res,next, '2020.3');
                        sql = "\ndrop table menu";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 17:
                        _a.sent();
                        sql = "\ndrop table menuregel";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 18:
                        _a.sent();
                        _a.label = 19;
                    case 19:
                        //
                        res.crudResult.messages.push({ field: "Patch", message: "database upgraded to version " + thisVersion + " ..." });
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.doMenu = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        res.crudResult.success = true;
                        sql = '';
                        //
                        // default gebruikers
                        //
                        return [4 /*yield*/, this.addUser(req, res, next, 'Gast', 'Gast', 'Gast', '')];
                    case 1:
                        //
                        // default gebruikers
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'Admin', 'Admin', 'Admin', '')];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'Super', 'Super', 'Super', 'super')];
                    case 3:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addUser(req, res, next, 'Inkoop', 'Inkoop', 'Inkoop', 'inkoop')];
                    case 4:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'Verkoop', 'Verkoop', 'Verkoop', 'verkoop')];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'Orderdesk', 'Orderdesk', 'Orderdesk', 'orderdesk')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'Magazijn', 'Magazijn', 'Magazijn', 'magazijn')];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'Productie', 'Productie', 'Productie', 'productie')];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'RenD', 'RenD', 'RenD', 'rend')];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'Planning', 'Planning', 'Planning', 'planning')];
                    case 10:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addUser(req, res, next, 'HoofdVerkoop', 'HoofdVerkoop', 'HoofdVerkoop', 'hoofdVerkoop')];
                    case 11:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'HoofdInkoop', 'HoofdInkoop', 'HoofdInkoop', 'hoofdInkoop')];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'HoofdOrderdesk', 'HoofdOrderdesk', 'HoofdOrderdesk', 'hoofdOrderdesk')];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, this.addUser(req, res, next, 'HoofdRenD', 'HoofdRenD', 'HoofdRenD', 'hoofdrend')];
                    case 14:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addUser(req, res, next, 'Zegwaard', 'Zegwaard', 'Zegwaard', 'zegwaard')];
                    case 15:
                        //
                        _a.sent();
                        //
                        // Menu inhoud
                        //
                        sql = "delete from MENU_2015";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 16:
                        _a.sent();
                        sql = "delete from MENUREGEL_2015";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 17:
                        _a.sent();
                        //
                        // Menus
                        //
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Gast')];
                    case 18:
                        //
                        // Menus
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Admin')];
                    case 19:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Super')];
                    case 20:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Verkoop')];
                    case 21:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Inkoop')];
                    case 22:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Orderdesk')];
                    case 23:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Magazijn')];
                    case 24:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Productie')];
                    case 25:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'RenD')];
                    case 26:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Planning')];
                    case 27:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'HoofdVerkoop')];
                    case 28:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'HoofdInkoop')];
                    case 29:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'HoofdOrderdesk')];
                    case 30:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'HoofdRenD')];
                    case 31:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'Zegwaard')];
                    case 32:
                        _a.sent();
                        return [4 /*yield*/, this.addMenu(req, res, next, 'User')];
                    case 33:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Gast', 1, 'Home', 'SubGastAfmelden', '')];
                    case 34:
                        //
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 1, 'Home', 'SubAdminAfmelden', '')];
                    case 35:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 2, 'Beheer', 'SubBeheer', '')];
                    case 36:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 3, 'Klok', 'SubKlok', '')];
                    case 37:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 4, 'Importeren', 'SubImport', '')];
                    case 38:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 5, 'Overzichten', 'SubLijst', '')];
                    case 39:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 6, 'Productie', 'SubProductie', '')];
                    case 40:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 7, 'Inkoop', 'SubInkoop', '')];
                    case 41:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 8, 'Orderadministratie', 'SubOrder', '')];
                    case 42:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 9, 'Retouren', 'SubRetouren', '')];
                    case 43:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Admin', 10, 'Rapportage', 'SubRapportage', '')];
                    case 44:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 1, 'Home', 'SubAfmelden', '')];
                    case 45:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 2, 'Beheer', 'SubSuperBeheer', '')];
                    case 46:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 3, 'Klok', 'SubKlok', '')];
                    case 47:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 4, 'Importeren', 'SubImport', '')];
                    case 48:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 6, 'Overzichten', 'SubLijst', '')];
                    case 49:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 7, 'Productie', 'SubProductie', '')];
                    case 50:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 8, 'Inkoop', 'SubInkoop', '')];
                    case 51:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 9, 'Orderadministratie', 'SubOrder', '')];
                    case 52:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 9, 'Retouren', 'SubRetouren', '')];
                    case 53:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Super', 10, 'Rapportage', 'SubRapportage', '')];
                    case 54:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Verkoop', 1, 'Home', 'SubAfmelden', '')];
                    case 55:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Verkoop', 4, 'Overzichten', 'SubVerkoopLijst', '')];
                    case 56:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Verkoop', 7, 'Orderadministratie', 'SubOrder', '')];
                    case 57:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Verkoop', 9, 'Rapportage', 'SubVerkoopRapportage', '')];
                    case 58:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Inkoop', 1, 'Home', 'SubAfmelden', '')];
                    case 59:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Inkoop', 4, 'Overzichten', 'SubLijst', '')];
                    case 60:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Inkoop', 6, 'Inkoop', 'SubInkoop', '')];
                    case 61:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Inkoop', 7, 'Orderadministratie', 'SubOrder', '')];
                    case 62:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Orderdesk', 1, 'Home', 'SubAfmelden', '')];
                    case 63:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Orderdesk', 4, 'Overzichten', 'SubOrderdeskLijst', '')];
                    case 64:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Orderdesk', 6, 'Inkoop', 'SubInkoop', '')];
                    case 65:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Orderdesk', 7, 'Orderadministratie', 'SubOrder', '')];
                    case 66:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Magazijn', 1, 'Home', 'SubAfmelden', '')];
                    case 67:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Magazijn', 3, 'Klok', 'SubKlok', '')];
                    case 68:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Magazijn', 5, 'Productie', 'SubProductie', '')];
                    case 69:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Productie', 1, 'Home', 'SubAfmelden', '')];
                    case 70:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Productie', 3, 'Klok', 'SubKlok', '')];
                    case 71:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Productie', 4, 'Productie', 'SubProductieProductie', '')];
                    case 72:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'RenD', 1, 'Home', 'SubAfmelden', '')];
                    case 73:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'RenD', 5, 'Productie', 'SubRenDProductie', '')];
                    case 74:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'RenD', 8, 'Retouren', 'SubRetouren', '')];
                    case 75:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'RenD', 9, 'Rapportage', 'SubRenDRapportage', '')];
                    case 76:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Planning', 1, 'Home', 'SubAfmelden', '')];
                    case 77:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Planning', 2, 'Klok', 'SubKlok', '')];
                    case 78:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Planning', 3, 'Beheer', 'SubPlanningBeheer', '')];
                    case 79:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Planning', 4, 'Overzichten', 'SubLijst', '')];
                    case 80:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Planning', 5, 'Productie', 'SubProductie', '')];
                    case 81:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Planning', 9, 'Rapportage', 'SubPlanningRapportage', '')];
                    case 82:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdVerkoop', 1, 'Home', 'SubAfmelden', '')];
                    case 83:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdVerkoop', 4, 'Overzichten', 'SubLijst', '')];
                    case 84:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdVerkoop', 5, 'Productie', 'SubProductie', '')];
                    case 85:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdVerkoop', 6, 'Inkoop', 'SubInkoop', '')];
                    case 86:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdVerkoop', 7, 'Orderadministratie', 'SubOrder', '')];
                    case 87:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdVerkoop', 8, 'Retouren', 'SubZegwaardRetouren', '')];
                    case 88:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdVerkoop', 9, 'Rapportage', 'SubHoofdVerkoopRapportage', '')];
                    case 89:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdInkoop', 1, 'Home', 'SubAfmelden', '')];
                    case 90:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdInkoop', 4, 'Overzichten', 'SubLijst', '')];
                    case 91:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdInkoop', 5, 'Productie', 'SubProductie', '')];
                    case 92:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdInkoop', 6, 'Inkoop', 'SubInkoop', '')];
                    case 93:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdInkoop', 7, 'Orderadministratie', 'SubOrder', '')];
                    case 94:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdInkoop', 9, 'Rapportage', 'SubHoofdInkoopRapportage', '')];
                    case 95:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdOrderdesk', 1, 'Home', 'SubAfmelden', '')];
                    case 96:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdOrderdesk', 4, 'Overzichten', 'SubLijst', '')];
                    case 97:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdOrderdesk', 5, 'Productie', 'SubProductie', '')];
                    case 98:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdOrderdesk', 6, 'Inkoop', 'SubInkoop', '')];
                    case 99:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdOrderdesk', 7, 'Orderadministratie', 'SubOrder', '')];
                    case 100:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdOrderdesk', 8, 'Retouren', 'SubZegwaardRetouren', '')];
                    case 101:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdOrderdesk', 9, 'Rapportage', 'SubHoofdOrderdeskRapportage', '')];
                    case 102:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdRenD', 1, 'Home', 'SubAfmelden', '')];
                    case 103:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdRenD', 2, 'Beheer', 'SubRenDBeheer', '')];
                    case 104:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdRenD', 4, 'Overzichten', 'SubLijst', '')];
                    case 105:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdRenD', 5, 'Productie', 'SubProductie', '')];
                    case 106:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdRenD', 6, 'Inkoop', 'SubInkoop', '')];
                    case 107:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdRenD', 7, 'Orderadministratie', 'SubOrder', '')];
                    case 108:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdRenD', 8, 'Retouren', 'SubRetouren', '')];
                    case 109:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'HoofdRenD', 9, 'Rapportage', 'SubHoofdRenDRapportage', '')];
                    case 110:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'Zegwaard', 1, 'Home', 'SubAfmelden', '')];
                    case 111:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Zegwaard', 2, 'Klok', 'SubKlok', '')];
                    case 112:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Zegwaard', 5, 'Productie', 'SubProductie', '')];
                    case 113:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'Zegwaard', 8, 'Retouren', 'SubZegwaardRetouren', '')];
                    case 114:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'User', 1, 'Home', 'SubAfmelden', '')];
                    case 115:
                        //
                        _a.sent();
                        //
                        // Hoofdmenu
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubGastAfmelden', 1, 'Dashboard', '', 'showBb("Home")')];
                    case 116:
                        //
                        // Hoofdmenu
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubGastAfmelden', 2, 'Afmelden', '', 'navigate("index.html")')];
                    case 117:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubAfmelden', 1, 'Dashboard', '', 'showBb("Home")')];
                    case 118:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubAfmelden', 2, 'Afmelden', '', 'navigate("index.html")')];
                    case 119:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubAfmelden', 3, 'Mijn gegevens', '', 'showPage("gebruikerinfo.html")')];
                    case 120:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubAdminAfmelden', 1, 'Dashboard', '', 'showBb("Home")')];
                    case 121:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubAdminAfmelden', 2, 'Afmelden', '', 'navigate("index.html")')];
                    case 122:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubAdminAfmelden', 3, 'Mijn gegevens', '', 'showPage("gebruikerinfo.html")')];
                    case 123:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubAdminAfmelden', 4, 'Dashboard bericht', '', 'insertBb("Home")')];
                    case 124:
                        _a.sent();
                        //
                        // Beheer
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 1, 'Gebruikers', '', 'showPage("gebruiker.html")')];
                    case 125:
                        //
                        // Beheer
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 2, 'Berichtinstellingen', '', 'showPage("bbsettings.html")')];
                    case 126:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 3, 'Menuregels', '', 'showPage("menuregel.html")')];
                    case 127:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 4, 'Parameters', '', 'showPage("param.html")')];
                    case 128:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 6, 'Log Info', '', 'showPage("loginfo.html")')];
                    case 129:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 7, 'Uitvalcodes', '', 'showPage("uitval.html")')];
                    case 130:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 8, 'Bewerkingsoorten', '', 'showPage("bewerkingsoort.html")')];
                    case 131:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 9, 'Standaard uurtarief', '', 'showPage("uurtarief.html")')];
                    case 132:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 10, 'Pauze', '', 'showPage("pauze.html")')];
                    case 133:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 11, 'Afdelingen', '', 'showPage("afdeling.html")')];
                    case 134:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 12, 'Productgroepen', '', 'showPage("productgroep.html")')];
                    case 135:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 13, 'Productlijnen', '', 'showPage("productlijn.html")')];
                    case 136:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 14, 'Startaantal verschil', '', 'showPage("bewerkingverschil.html")')];
                    case 137:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 15, 'Retourtypes', '', 'showPage("retourtype.html")')];
                    case 138:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 16, 'Retourtermijnen', '', 'showPage("retourtermijn.html")')];
                    case 139:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 17, 'RetourUitvoerders', '', 'showPage("retourgebruiker.html")')];
                    case 140:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 18, 'RetourGarantieopties', '', 'showPage("retourgarantie.html")')];
                    case 141:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 19, 'RetourActietypes', '', 'showPage("retouractietype.html")')];
                    case 142:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 20, 'Plansoorten', '', 'showPage("plansoort.html")')];
                    case 143:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubBeheer', 21, 'Update versie', '', 'showWindow("patch.php")')];
                    case 144:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 1, 'Gebruikers', '', 'showPage("gebruiker.html")')];
                    case 145:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 7, 'Uitvalcodes', '', 'showPage("uitval.html")')];
                    case 146:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 8, 'Bewerkingsoorten', '', 'showPage("bewerkingsoort.html")')];
                    case 147:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 9, 'Standaard uurtarief', '', 'showPage("uurtarief.html")')];
                    case 148:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 10, 'Pauze', '', 'showPage("pauze.html")')];
                    case 149:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 11, 'Afdelingen', '', 'showPage("afdeling.html")')];
                    case 150:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 12, 'Productgroepen', '', 'showPage("productgroep.html")')];
                    case 151:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 13, 'Productlijnen', '', 'showPage("productlijn.html")')];
                    case 152:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 16, 'Retourtypes', '', 'showPage("retourtype.html")')];
                    case 153:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 17, 'Retourtermijnen', '', 'showPage("retourtermijn.html")')];
                    case 154:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 18, 'RetourUitvoerders', '', 'showPage("retourgebruiker.html")')];
                    case 155:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 19, 'RetourGarantieopties', '', 'showPage("retourgarantie.html")')];
                    case 156:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubSuperBeheer', 20, 'RetourActietypes', '', 'showPage("retouractietype.html")')];
                    case 157:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubPlanningBeheer', 1, 'Gebruikers', '', 'showPage("gebruiker.html")')];
                    case 158:
                        //
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRenDBeheer', 9, 'Standaard uurtarief', '', 'showPage("uurtarief.html")')];
                    case 159:
                        //
                        _a.sent();
                        //
                        // klok
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubKlok', 1, 'Klok', '', 'showPage("gebruikertijd.html")')];
                    case 160:
                        //
                        // klok
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubKlok', 2, 'Calender', '', 'showPage("calender.html")')];
                    case 161:
                        _a.sent();
                        //
                        // Import
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubImport', 1, 'Herstel verbinding met Exact deel1', '', 'showPage("exact.html?getcode=1")')];
                    case 162:
                        //
                        // Import
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubImport', 2, 'Herstel verbinding met Exact deel2', '', 'showPage("exact2.html?getfirstrefresh=1")')];
                    case 163:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubImport', 11, 'Alle gegevens importeren en doorrekenen', '', 'showPage("upload.html")')];
                    case 164:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubImport', 12, 'Operationele gegevens importeren', '', 'showPage("upload.html?OperationalOnly=1")')];
                    case 165:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubImport', 13, 'Bestellingen importeren', '', 'showPage("upload.html?OperationalOnly=2")')];
                    case 166:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubImport', 14, 'Bewerkingen importeren', '', 'showPage("upload.html?OperationalOnly=3")')];
                    case 167:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubImport', 15, 'Orders importeren', '', 'showPage("upload.html?OperationalOnly=4")')];
                    case 168:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubImport', 16, 'Doorrekenen', '', 'showPage("calc.html")')];
                    case 169:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubImport', 17, 'Logging', '', 'showBb("Log")')];
                    case 170:
                        _a.sent();
                        //
                        // Lijst
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubLijst', 1, 'Leveranciers', '', 'showPage("leverancier.html")')];
                    case 171:
                        //
                        // Lijst
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubLijst', 2, 'Klanten', '', 'showPage("klant.html")')];
                    case 172:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubLijst', 3, 'Producten/startvoorraad', '', 'showPage("product.html")')];
                    case 173:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubLijst', 4, 'Stuklijst', '', 'showPage("onderdeel.html")')];
                    case 174:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubLijst', 5, 'Bestellingen', '', 'showPage("bestelling.html")')];
                    case 175:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubLijst', 6, 'Orders', '', 'showPage("productvraag.html?sel44=Alle")')];
                    case 176:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubLijst', 7, 'Productie', '', 'showPage("bewerking.html")')];
                    case 177:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubLijst', 8, 'Voorraad', '', 'showPage("productvoorraad.html")')];
                    case 178:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubLijst', 9, 'Vrijgegeven dagen', '', 'showPage("mnl.html")')];
                    case 179:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubVerkoopLijst', 2, 'Klanten', '', 'showPage("klant.html")')];
                    case 180:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubVerkoopLijst', 6, 'Orders', '', 'showPage("productvraag.html?sel44=Alle")')];
                    case 181:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubVerkoopLijst', 8, 'Voorraad', '', 'showPage("productvoorraad.html")')];
                    case 182:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubOrderdeskLijst', 1, 'Leveranciers', '', 'showPage("leverancier.html")')];
                    case 183:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubOrderdeskLijst', 2, 'Klanten', '', 'showPage("klant.html")')];
                    case 184:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubOrderdeskLijst', 5, 'Bestellingen', '', 'showPage("bestelling.html")')];
                    case 185:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubOrderdeskLijst', 6, 'Orders', '', 'showPage("productvraag.html?sel44=Alle")')];
                    case 186:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubOrderdeskLijst', 9, 'Vrijgegeven dagen', '', 'showPage("mnl.html")')];
                    case 187:
                        _a.sent();
                        //
                        // Productie
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductie', 1, 'Logistiek', '', 'showPage("logistiek.html")')];
                    case 188:
                        //
                        // Productie
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductie', 2, 'Overzicht', '', 'showPage("bewerking.html")')];
                    case 189:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductie', 3, 'Werkvoorbereiding', '', 'showPage("planning.html?sel44=Nee&action=werkvoorbereiding")')];
                    case 190:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductie', 4, 'Planning', '', 'showPage("planning.html?sel44=Nee&action=planning")')];
                    case 191:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductie', 5, 'Lijnplanning', '', 'showPage("planning.html?sel44=Nee&action=lijnplanning")')];
                    case 192:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductie', 6, 'Lijnplanning2', '', 'showPage("planning.html?sel44=Nee&action=lijnplanning2")')];
                    case 193:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductie', 7, 'Uitleverlijst', '', 'showPage("uitlever.html?productie=1")')];
                    case 194:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductieProductie', 2, 'Overzicht', '', 'showPage("bewerking.html")')];
                    case 195:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductieProductie', 3, 'Werkvoorbereiding', '', 'showPage("planning.html?sel44=Nee&action=werkvoorbereiding")')];
                    case 196:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductieProductie', 4, 'Planning', '', 'showPage("planning.html?sel44=Nee&action=planning")')];
                    case 197:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductieProductie', 5, 'lijnplanning', '', 'showPage("planning.html?sel44=Nee&action=lijnplanning")')];
                    case 198:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubProductieProductie', 6, 'lijnplanning2', '', 'showPage("planning.html?sel44=Nee&action=lijnplanning2")')];
                    case 199:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRenDProductie', 3, 'Werkvoorbereiding', '', 'showPage("planning.html?sel44=Nee&action=werkvoorbereiding")')];
                    case 200:
                        //
                        _a.sent();
                        //
                        // Inkoop
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubInkoop', 1, 'Voorraad', '', 'showPage("productvoorraad.html")')];
                    case 201:
                        //
                        // Inkoop
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubInkoop', 2, 'Voorraadbeoordeling', '', 'showPage("voorraad.html")')];
                    case 202:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubInkoop', 3, 'Productgroep', '', 'showPage("bestellingproductgroep.html")')];
                    case 203:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubInkoop', 5, 'Bestellijst', '', 'showPage("inkoop.html")')];
                    case 204:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubInkoop', 6, 'Bestellingen', '', 'showPage("bestellingkop.html")')];
                    case 205:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubInkoop', 7, 'Open bestellingen', '', 'showPage("bestelling.html?inkoop=Ja")')];
                    case 206:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubInkoop', 8, 'Bestellingen die te laat zijn', '', 'showPage("bestellingtelaat.html")')];
                    case 207:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubInkoop', 9, '44 Orders', '', 'showPage("productvraag.html?sel44=Ja")')];
                    case 208:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubInkoop', 10, 'Uitleverlijst', '', 'showPage("uitlever.html")')];
                    case 209:
                        _a.sent();
                        //
                        // Order
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubOrder', 1, '44 Orders', '', 'showPage("productvraag.html?selRo=Ja&sel44=Ja&1=1")')];
                    case 210:
                        //
                        // Order
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubOrder', 2, 'Uitleverlijst', '', 'showPage("uitlever.html")')];
                    case 211:
                        _a.sent();
                        //
                        // Retouren
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 1, 'Overzichts rapport', '', 'showPage("retourrap.html?rap=rap11")')];
                    case 212:
                        //
                        // Retouren
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 2, 'Overzicht R bewerkingen', '', 'showPage("bewerking.html?selR=Ja")')];
                    case 213:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 3, 'Retouren', '', 'showPage("retour.html")')];
                    case 214:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 4, 'Totaal binnengekomen', '', 'showPage("retourrap.html?rap=rap8")')];
                    case 215:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 5, 'Binnengekomen', '', 'showPage("retourrap.html?rap=rap6")')];
                    case 216:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 6, 'Details binnengekomen', '', 'showPage("retourrap.html?rap=rap7")')];
                    case 217:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 7, 'Totaal afgehandeld', '', 'showPage("retourrap.html?rap=rap8b")')];
                    case 218:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 8, 'Afgehandeld', '', 'showPage("retourrap.html?rap=rap5")')];
                    case 219:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 9, 'Details afgehandeld', '', 'showPage("retourrap.html?rap=rap9")')];
                    case 220:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 10, 'Totaal open', '', 'showPage("retourrap.html?rap=rap8c")')];
                    case 221:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 11, 'Details open', '', 'showPage("retourrap.html?rap=rap10")')];
                    case 222:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRetouren', 12, 'Alle rapporten', '', 'showPage("retourrap.html")')];
                    case 223:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubZegwaardRetouren', 3, 'Retouren', '', 'showPage("retour.html")')];
                    case 224:
                        //
                        _a.sent();
                        //
                        // Rapportage
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRapportage', 1, 'Medewerkers', '', 'showPage("gebruikerrap.html")')];
                    case 225:
                        //
                        // Rapportage
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")')];
                    case 226:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRapportage', 3, 'Product uitval', '', 'showPage("productuitvalrap.html")')];
                    case 227:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRapportage', 4, 'Productie uitval', '', 'showPage("bewerkinguitvalrap.html")')];
                    case 228:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubVerkoopRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")')];
                    case 229:
                        //
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRenDRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")')];
                    case 230:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRenDRapportage', 3, 'Product uitval', '', 'showPage("productuitvalrap.html")')];
                    case 231:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubRenDRapportage', 4, 'Productie uitval', '', 'showPage("bewerkinguitvalrap.html")')];
                    case 232:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubPlanningRapportage', 1, 'Medewerkers', '', 'showPage("gebruikerrap.html")')];
                    case 233:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubPlanningRapportage', 3, 'Product uitval', '', 'showPage("productuitvalrap.html")')];
                    case 234:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubPlanningRapportage', 4, 'Productie uitval', '', 'showPage("bewerkinguitvalrap.html")')];
                    case 235:
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubHoofdVerkoopRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")')];
                    case 236:
                        //
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubHoofdInkoopRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")')];
                    case 237:
                        //
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubHoofdOrderdeskRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")')];
                    case 238:
                        //
                        _a.sent();
                        //
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubHoofdRenDRapportage', 2, 'Producten', '', 'showPage("productbewerkingrap.html")')];
                    case 239:
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubHoofdRenDRapportage', 3, 'Product uitval', '', 'showPage("productuitvalrap.html")')];
                    case 240:
                        _a.sent();
                        return [4 /*yield*/, this.addOption(req, res, next, 'SubHoofdRenDRapportage', 4, 'Productie uitval', '', 'showPage("bewerkinguitvalrap.html")')];
                    case 241:
                        _a.sent();
                        //
                        // bb
                        //
                        return [4 /*yield*/, this.addBb(req, res, next, 'Home', 'Home')];
                    case 242:
                        //
                        // bb
                        //
                        _a.sent();
                        return [4 /*yield*/, this.addBb(req, res, next, 'Log', 'Log')];
                    case 243:
                        _a.sent();
                        //
                        res.crudResult.messages.push({ field: "Menu", message: "Menu uitgevoerd ..." });
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.doView = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = '';
                        sql = "\ndrop view if exists uitvalsoort";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        _a.sent();
                        sql = "create view uitvalsoort as\nselect * from \n(select 'Electrisch' as VALUE\nunion\nselect 'Mechanisch'\nunion\nselect 'Overig') base;";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _a.sent();
                        //
                        res.crudResult.messages.push({ field: "View", message: "View uitgevoerd ..." });
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.doProcedure = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, sql;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        sql = "";
                        //
                        //
                        // date2screendate: DD-MM-YYYY
                        //
                        sql = "drop function if exists date2screendate";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _b.sent();
                        sql = "\nCREATE FUNCTION date2screendate( parDate datetime )\n    RETURNS varchar(10)\nBEGIN\n    return \n    case \n    when parDate is null then ''\n    when parDate = '0000-00-00 00:00:00' then ''\n    else DATE_FORMAT(parDate,'%d-%m-%Y')\n    end;\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _b.sent();
                        //
                        // date2screentime HH24:MI
                        //
                        sql = "drop function if exists date2screentime";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        _b.sent();
                        sql = "\nCREATE FUNCTION date2screentime( parDate datetime )\n    RETURNS varchar(5)\nBEGIN\n    return \n    case \n    when parDate is null then ''\n    when parDate = '0000-00-00 00:00:00' then ''\n    else DATE_FORMAT(parDate,'%H:%i')\n    end;\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        _b.sent();
                        //
                        // date2screendatetime DD-MM-YYYY HH24:MI
                        //
                        sql = "drop function if exists date2screendatetime";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        _b.sent();
                        sql = "\nCREATE FUNCTION date2screendatetime( parDate datetime )\n    RETURNS varchar(16)\nBEGIN\n    return \n    case \n    when parDate is null  then ''\n    when parDate = '0000-00-00 00:00:00' then ''\n    else DATE_FORMAT(parDate,'%d-%m-%Y %H:%i')\n    end;\nEND\n";
                        //
                        // date2jsondate YYYY-MM-DD HH24:MI:SS
                        //
                        sql = "drop function if exists date2jsondate";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 7:
                        _b.sent();
                        sql = "\nCREATE FUNCTION date2jsondate( parDate datetime )\n    RETURNS varchar(19)\nBEGIN\n    return \n    case \n    when parDate is null  then ''\n    when parDate = '0000-00-00 00:00:00' then ''\n    else DATE_FORMAT(parDate,'%Y-%m-%d %H:%i:%s')\n    end;\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 8:
                        _b.sent();
                        //
                        // screendate2date
                        //
                        sql = "drop function if exists screendate2date";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 9:
                        _b.sent();
                        sql = "\nCREATE FUNCTION screendate2date( parDate varchar(10) )\n    RETURNS datetime\nBEGIN\n    return \n    case \n    when parDate is null then null\n    when trim(parDate) = '' then null\n    else STR_TO_DATE(parDate,'%d-%m-%Y')\n    end;\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 10:
                        _b.sent();
                        //
                        // screentime2date
                        //
                        sql = "drop function if exists screentime2date";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 11:
                        _b.sent();
                        sql = "\nCREATE FUNCTION screentime2date( parDate varchar(5) )\n    RETURNS datetime\nBEGIN\n    return \n    case \n    when parDate is null then null\n    when trim(parDate) = '' then null\n    else STR_TO_DATE(parDate,'%H:%i')\n    end;\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 12:
                        _b.sent();
                        //
                        // screendatetime2date
                        //
                        sql = "drop function if exists screendatetime2date";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 13:
                        _b.sent();
                        sql = "\nCREATE FUNCTION screendatetime2date( parDate varchar(16) )\n    RETURNS datetime\nBEGIN\n    return \n    case \n    when parDate is null then null\n    when trim(parDate) = '' then null\n    else STR_TO_DATE(parDate,'%d-%m-%Y %H:%i')\n    end;\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 14:
                        _b.sent();
                        //
                        // jsondate2date
                        //
                        sql = "drop function if exists jsondate2date";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 15:
                        _b.sent();
                        sql = "\nCREATE FUNCTION jsondate2date( parDate varchar(19) )\n    RETURNS datetime\nBEGIN\n    return \n    case \n    when parDate is null then null\n    when trim(parDate) = '' then null\n    else STR_TO_DATE(parDate,'%Y-%m-%d %H:%i:%s')\n    end;\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 16:
                        _b.sent();
                        //
                        // getOpenStand
                        //
                        sql = "drop function if exists getOpenStand";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 17:
                        _b.sent();
                        sql = "\nCREATE FUNCTION getOpenStand(\n    parProductnummer varchar(50) ,\n    parAssets varchar(255) ) \n    RETURNS varchar(1000)\nBEGIN\n    DECLARE thisProductnummer varchar(50);\n    DECLARE thisBewerkingsnummer varchar(10);\n    DECLARE thisStand varchar(1000);\n    select '' into thisStand;\n    select parProductnummer into thisProductnummer;\n    select bewerkingsnummer\n    into thisBewerkingsnummer\n    from bewerking \n        where productnummer = thisProductnummer \n        and (\n            isnull(einddatumtijd)\n            or \n            exists(\n                select 1 from bewerkingflow\n                where bewerking.bewerkingsnummer = bewerkingflow.bewerkingsnummer\n                and isnull(bewerkingflow.einddatumtijd)\n                )\n            )\n        order by startdatumtijd\n        limit 1;\n    if ifnull(thisBewerkingsnummer,'') = '' then\n        return '';\n    end if;\n    select\n    group_concat(\n        concat(\n            '<span style=`white-space:nowrap;color:black;background-color:',BEWERKINGSOORT.kleur,'`>',\n            BEWERKINGSOORT.afkorting,\n            '(',\n            (select SUM(case when BF.einddatumtijd is null then 0 else BF.bewerkingaantal end) \n                from BEWERKINGFLOW BF,BEWERKING BW\n                where BW.bewerkingsnummer = thisBewerkingsnummer\n                and BF.bewerkingsnummer = thisBewerkingsnummer\n                and BF.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n                and exists (select 1 from BEWERKINGFLOW\n                    where BEWERKINGFLOW.bewerkingsnummer = thisBewerkingsnummer\n                    and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n                    and BEWERKINGFLOW.einddatumtijd is null)\n                ),\n            ')',\n            '</span>',\n            (select case when MIN(case when BF.einddatumtijd is null then 0 else 1 end) = 0 \n            then concat('<img src=`' , parAssets , 'bewerkingopen.png`></img>')\n            else concat('<img src=`' , parAssets , 'bewerkingclosed.png`>/img>')\n            end\n            from BEWERKINGFLOW BF,BEWERKING BW\n            where BW.bewerkingsnummer = thisBewerkingsnummer\n            and BF.bewerkingsnummer = thisBewerkingsnummer\n            and BF.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n            and exists (select 1 from BEWERKINGFLOW\n                where BEWERKINGFLOW.bewerkingsnummer = thisBewerkingsnummer\n                and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n                and BEWERKINGFLOW.einddatumtijd is null)\n                )\n            ) \n            ORDER BY BEWERKINGSOORT.VOLGORDE,BEWERKINGSOORT.BEWERKINGSOORT\n            )\n        from BEWERKINGSOORT\n        into thisStand;\n    select concat( thisBewerkingsnummer,': ',ifnull(thisStand,'')) into thisStand from dual;\n\n    RETURN ifnull(thisStand,'');\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 18:
                        _b.sent();
                        //
                        // getStand
                        //
                        sql = "drop function if exists getStand";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 19:
                        _b.sent();
                        sql = "\nCREATE FUNCTION getStand(\n    parBewerkingsnummer  varchar(10) , \n    parAssets varchar(255) ) \n    RETURNS varchar(1000)\nBEGIN\n    DECLARE thisBewerkingsnummer varchar(10);\n    DECLARE thisStand varchar(1000);\n    select '' into thisStand;\n    select parBewerkingsnummer into thisBewerkingsnummer;\n    if ifnull(thisBewerkingsnummer,'') = '' then\n        return '';\n    end if;\n    select\n    group_concat(\n        concat(\n            '<span style=`white-space:nowrap;color:black;background-color:',BEWERKINGSOORT.kleur,'`>',\n            BEWERKINGSOORT.afkorting,\n            '(',\n            (select SUM(case when BF.einddatumtijd is null then 0 else BF.bewerkingaantal end) \n                from BEWERKINGFLOW BF,BEWERKING BW\n                where BW.bewerkingsnummer = thisBewerkingsnummer\n                and BF.bewerkingsnummer = thisBewerkingsnummer\n                and BF.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n                and exists (select 1 from BEWERKINGFLOW\n                    where BEWERKINGFLOW.bewerkingsnummer = thisBewerkingsnummer\n                    and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n                    and BEWERKINGFLOW.einddatumtijd is null)\n                ),\n            ')',\n            '</span>',\n            (select case when MIN(case when BF.einddatumtijd is null then 0 else 1 end) = 0 \n            then concat('<img src=`' , parAssets , 'bewerkingopen.png`></img>')\n            else concat('<img src=`' , parAssets , 'bewerkingclosed.png`>/img>')\n            end\n            from BEWERKINGFLOW BF,BEWERKING BW\n            where BW.bewerkingsnummer = thisBewerkingsnummer\n            and BF.bewerkingsnummer = thisBewerkingsnummer\n            and BF.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n            and exists (select 1 from BEWERKINGFLOW\n                where BEWERKINGFLOW.bewerkingsnummer = thisBewerkingsnummer\n                and BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\n                and BEWERKINGFLOW.einddatumtijd is null)\n                )\n            ) \n            ORDER BY BEWERKINGSOORT.VOLGORDE,BEWERKINGSOORT.BEWERKINGSOORT\n            )\n        from BEWERKINGSOORT\n        into thisStand;\n    RETURN ifnull(thisStand,'');\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 20:
                        _b.sent();
                        //
                        // getLijn
                        //
                        sql = "drop function if exists getLijn";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 21:
                        _b.sent();
                        sql = "\nCREATE FUNCTION getLijn(\n    parProductnummer  varchar(50) )\n    RETURNS varchar(50)\nBEGIN\n    DECLARE thisProductnummer varchar(50);\n    DECLARE thisLijn varchar(50);\n    select '' into thisLijn;\n    select parProductnummer into thisProductnummer;\n    if ifnull(thisProductnummer,'') = '' then\n        return '';\n    end if;\n    select max(productielijn) into thisLijn \n        from PRODUCTLIJN lijnprdl \n        where lijnprdl.productlijn = \n            (select max(lijn) from PRODUCT lijnprd \n                where lijnprd.productnummer = thisProductnummer);\n    if ifnull(thisLijn,'') = '' then\n        select max(lijn) into thisLijn from PRODUCT lijnprd\n            where lijnprd.productnummer = thisProductnummer;\n    end if;                \n    RETURN ifnull(thisLijn,'');\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 22:
                        _b.sent();
                        //
                        // getKurk
                        //
                        sql = "drop function if exists getKurk";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 23:
                        _b.sent();
                        sql = "\nCREATE FUNCTION getKurk(\n    parProductnummer  varchar(50) ,\n    parDatumtijd datetime )\n    RETURNS varchar(255)\nBEGIN\n    DECLARE thisProductnummer varchar(50);\n    DECLARE thisKurk varchar(255);\n    DECLARE thisDatumtijd datetime;\n    select '' into thisKurk;\n    select parProductnummer into thisProductnummer;\n    select parDatumtijd into thisDatumtijd;\n    if ifnull(thisProductnummer,'') = '' then\n        return '';\n    end if;\n    if ifnull(thisDatumtijd,'') = '' then\n        return '';\n    end if;\n    select concat(date2screendate(PRODUCTVOORRAAD.beperkdatumtijd),\n        ' ',beperknummer) \n        into thisKurk\n        from PRODUCTVOORRAAD\n        where PRODUCTVOORRAAD.id = \n            (select min(PRODUCTVOORRAAD.id) from PRODUCTVOORRAAD\n                where PRODUCTVOORRAAD.productnummer = thisProductnummer\n                and PRODUCTVOORRAAD.beperkdatumtijd = \n                    (select min(PRODUCTVOORRAAD.beperkdatumtijd) from PRODUCTVOORRAAD\n                        where PRODUCTVOORRAAD.productnummer = thisProductnummer\n                        and PRODUCTVOORRAAD.beperkdatumtijd <= thisDatumtijd));\n    RETURN ifnull(thisKurk,'');\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 24:
                        _b.sent();
                        //
                        // getOpenAantal
                        //
                        sql = "drop function if exists getOpenAantal";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 25:
                        _b.sent();
                        sql = "\nCREATE FUNCTION getOpenAantal(\n    parProductnummer varchar(50)) \n    RETURNS varchar(1000)\nBEGIN\n    DECLARE thisProductnummer varchar(50);\n    DECLARE thisOpenAantal varchar(1000);\n    select '' into thisOpenAantal;\n    select parProductnummer into thisProductnummer;\n    select group_concat(\n        concat(\n            '<span style=`white-space:nowrap;color:black;background-color:',\n            kleur,\n            '`>',\n            afkorting,\n            '(', \n            open_aantal,\n            ')', \n            '</span>'\n            )\n        order by volgorde,bewerkingsoort\n        separator ', ')\n        into thisOpenAantal from (\n        select \n            bewerking.productnummer,\n            bewerkingsoort.bewerkingsoort as bewerkingsoort,\n            bewerkingsoort.afkorting as afkorting,\n            bewerkingsoort.volgorde as volgorde,\n            bewerkingsoort.kleur as kleur,\n            sum(bewerkingaantal) as open_aantal \n            from bewerking,bewerkingflow,bewerkingsoort\n        where bewerking.bewerkingsnummer = bewerkingflow.bewerkingsnummer\n        and bewerkingflow.bewerkingsoort = bewerkingsoort.bewerkingsoort\n        and bewerking.productnummer = thisProductnummer\n        and isnull(bewerkingflow.Einddatumtijd)\n        and bewerkingsoort.volgorde != 0\n        group by bewerking.productnummer,bewerkingsoort.bewerkingsoort\n        order by bewerking.productnummer,bewerkingsoort.bewerkingsoort\n        ) base\n        group by productnummer;\n    RETURN ifnull(thisOpenAantal,'');\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 26:
                        _b.sent();
                        //
                        // getHandtekening
                        //
                        sql = "drop function if exists getHandtekening";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 27:
                        _b.sent();
                        sql = "\nCREATE FUNCTION getHandtekening(\n    parContactpersoon varchar(50)) \n    RETURNS varchar(1000)\nBEGIN\n    select '' into @thisResult;\n    select '' into @thisHandtekening;\n    select parContactpersoon into @thisContactpersoon;\n    select ifnull(min(handtekening),'')\n        into @thisHandtekening \n        from gebruiker\n        where upper(naam) = upper(@thisContactpersoon);\n    if @thisHandtekening = '' then\n        select ifnull(min(handtekening),'')\n            into @thisHandtekening \n            from gebruiker\n            where upper(gebruiker) = upper(@thisContactpersoon);\n        if @thisHandtekening = '' then\n            select ifnull(min(handtekening),'')\n            into @thisHandtekening \n                from gebruiker\n                where upper(contactpersoon) = upper(@thisContactpersoon);\n        end if;\n    end if;\n    select @thisHandtekening into @thisResult;\n    return @thisResult;\nEND\n";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 28:
                        _b.sent();
                        //
                        res.crudResult.messages.push({ field: "Procedure", message: "Procedure uitgevoerd ..." });
                        //
                        return [2 /*return*/];
                }
            });
        });
    };
    Patch.prototype.routes = function (req, res, next) {
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
                    this.doQuery(req, res, next, dict);
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
    return Patch;
}(crud_1.Crud));
exports.Patch = Patch;
//# sourceMappingURL=patch.js.map