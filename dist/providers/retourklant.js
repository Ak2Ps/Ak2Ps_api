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
var dict = {
    table: "RETOURKLANT",
    key: [
        {
            body: "REFERENTIE",
            sql: "REFERENTIE",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(KLANTNUMMER)",
        where: [
            {
                query: "value",
                sql: "ucase(KLANTNUMMER) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "REFERENTIE as ID"
            },
            {
                row: "VALUE",
                sql: "KLANTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "REFERENTIE",
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
                query: "klantnummer",
                sql: "ucase(KLANTNUMMER) like ucase('%?%')",
            },
            {
                query: "naam",
                sql: "ucase(NAAM) like ucase('%?%')",
            },
            {
                query: "zoekcode",
                sql: "ucase(ZOEKCODE) like ucase('%?%')",
            },
            {
                query: "adres",
                sql: "ucase(ADRES) like ucase('%?%')",
            },
            {
                query: "woonplaats",
                sql: "ucase(WOONPLAATS) like ucase('%?%')",
            },
            {
                query: "postcode",
                sql: "ucase(POSTCODE) like ucase('%?%')",
            },
            {
                query: "land",
                sql: "ucase(LAND) like ucase('%?%')",
            },
            {
                query: "telefoon",
                sql: "ucase(TELEFOON) like ucase('%?%')",
            },
            {
                query: "fax",
                sql: "ucase(FAX) like ucase('%?%')",
            },
            {
                query: "email",
                sql: "ucase(EMAIL) like ucase('%?%')",
            },
            {
                query: "aflevernaam",
                sql: "ucase(AFLEVERNAAM) like ucase('%?%')",
            },
            {
                query: "afleveradres",
                sql: "ucase(AFLEVERADRES) like ucase('%?%')",
            },
            {
                query: "afleverwoonplaats",
                sql: "ucase(AFLEVERWOONPLAATS) like ucase('%?%')",
            },
            {
                query: "afleverpostcode",
                sql: "ucase(AFLEVERPOSTCODE) like ucase('%?%')",
            },
            {
                query: "afleverland",
                sql: "ucase(AFLEVERLAND) like ucase('%?%')",
            },
            {
                query: "afleverdpdnummer",
                sql: "ucase(AFLEVERDPDNUMMER) like ucase('%?%')",
            },
            {
                query: "aflevertelefoon",
                sql: "ucase(AFLEVERTELEFOON) like ucase('%?%')",
            },
            {
                query: "afleverfax",
                sql: "ucase(AFLEVERFAX) like ucase('%?%')",
            },
            {
                query: "afleveremail",
                sql: "ucase(AFLEVEREMAIL) like ucase('%?%')",
            },
            {
                query: "contact",
                sql: "ucase(CONTACT) like ucase('%?%')",
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
                row: "KLANTNUMMER",
                sql: "ifnull(KLANTNUMMER,'') as KLANTNUMMER",
            },
            {
                row: "NAAM",
                sql: "ifnull(NAAM,'') as NAAM",
            },
            {
                row: "ZOEKCODE",
                sql: "ifnull(ZOEKCODE,'') as ZOEKCODE",
            },
            {
                row: "ADRES",
                sql: "ifnull(ADRES,'') as ADRES",
            },
            {
                row: "WOONPLAATS",
                sql: "ifnull(WOONPLAATS,'') as WOONPLAATS",
            },
            {
                row: "POSTCODE",
                sql: "ifnull(POSTCODE,'') as POSTCODE",
            },
            {
                row: "LAND",
                sql: "ifnull(LAND,'') as LAND",
            },
            {
                row: "TELEFOON",
                sql: "ifnull(TELEFOON,'') as TELEFOON",
            },
            {
                row: "FAX",
                sql: "ifnull(FAX,'') as FAX",
            },
            {
                row: "EMAIL",
                sql: "ifnull(EMAIL,'') as EMAIL",
            },
            {
                row: "AFLEVERNAAM",
                sql: "ifnull(AFLEVERNAAM,'') as AFLEVERNAAM",
            },
            {
                row: "AFLEVERADRES",
                sql: "ifnull(AFLEVERADRES,'') as AFLEVERADRES",
            },
            {
                row: "AFLEVERWOONPLAATS",
                sql: "ifnull(AFLEVERWOONPLAATS,'') as AFLEVERWOONPLAATS",
            },
            {
                row: "AFLEVERPOSTCODE",
                sql: "ifnull(AFLEVERPOSTCODE,'') as AFLEVERPOSTCODE",
            },
            {
                row: "AFLEVERLAND",
                sql: "ifnull(AFLEVERLAND,'') as AFLEVERLAND",
            },
            {
                row: "AFLEVERDPDNUMMER",
                sql: "ifnull(AFLEVERDPDNUMMER,'') as AFLEVERDPDNUMMER",
            },
            {
                row: "AFLEVERTELEFOON",
                sql: "ifnull(AFLEVERTELEFOON,'') as AFLEVERTELEFOON",
            },
            {
                row: "AFLEVERFAX",
                sql: "ifnull(AFLEVERFAX,'') as AFLEVERFAX",
            },
            {
                row: "AFLEVEREMAIL",
                sql: "ifnull(AFLEVEREMAIL,'') as AFLEVEREMAIL",
            },
            {
                row: "CONTACT",
                sql: "ifnull(CONTACT,'') as CONTACT",
            },
            {
                row: "OPMERKING",
                sql: "ifnull(OPMERKING,'') as OPMERKING",
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
                body: "KLANTNUMMER",
                sql: "KLANTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "NAAM",
                sql: "NAAM = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "ZOEKCODE",
                sql: "ZOEKCODE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "ADRES",
                sql: "ADRES = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "WOONPLAATS",
                sql: "WOONPLAATS = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "POSTCODE",
                sql: "POSTCODE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "LAND",
                sql: "LAND = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "TELEFOON",
                sql: "TELEFOON = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "FAX",
                sql: "FAX = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "EMAIL",
                sql: "EMAIL = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "AFLEVERNAAM",
                sql: "AFLEVERNAAM = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "AFLEVERADRES",
                sql: "AFLEVERADRES = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "AFLEVERWOONPLAATS",
                sql: "AFLEVERWOONPLAATS = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "AFLEVERPOSTCODE",
                sql: "AFLEVERPOSTCODE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "AFLEVERLAND",
                sql: "AFLEVERLAND = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "AFLEVERDPDNUMMER",
                sql: "AFLEVERDPDNUMMER = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "AFLEVERTELEFOON",
                sql: "AFLEVERTELEFOON = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "AFLEVERFAX",
                sql: "AFLEVERFAX = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "AFLEVEREMAIL",
                sql: "AFLEVEREMAIL = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "CONTACT",
                sql: "CONTACT = '?'",
                required: false,
                maxLength: 255,
                default: "",
            }
        ],
    },
};
var Retourklant = /** @class */ (function (_super) {
    __extends(Retourklant, _super);
    function Retourklant() {
        return _super.call(this, dict) || this;
    }
    Retourklant.prototype.doInit = function (req, res, next, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sql = "\ninsert into RETOURKLANT (referentie)\nselect '" + db_1.default.fix(req.query.referentie) + "' from DUAL\nwhere not exists (select 1 from RETOURKLANT where referentie = '" + db_1.default.fix(req.query.referentie) + "')";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _c.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _c.sent();
                        //
                        sql = "select";
                        sql += this.addSelectFields(req, res, next, (_b = (_a = this.dict) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.fields);
                        sql += "\nfrom " + dict.table;
                        sql += "\nwhere REFERENTIE = '" + db_1.default.fix(req.query.referentie) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _c.sent();
                        connection.release();
                        res.status(200).send(rows[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Retourklant.prototype.doOvernemen = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\ninsert into RETOURKLANT (referentie)\nselect '" + db_1.default.fix(req.query.referentie) + "' from DUAL\nwhere not exists (select 1 from RETOURKLANT where referentie = '" + db_1.default.fix(req.query.referentie) + "')";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        //
                        sql = "\nselect\ncast(Id as CHAR) as ID\n,ifnull(Klantnummer,'') as KLANTNUMMER\n,ifnull(Naam,'') as NAAM\n,ifnull(Zoekcode,'') as ZOEKCODE\n,ifnull(Adres,'') as ADRES\n,ifnull(Woonplaats,'') as WOONPLAATS\n,ifnull(Postcode,'') as POSTCODE\n,ifnull(Telefoon,'') as TELEFOON\n,ifnull(Fax,'') as FAX\n,ifnull(EMail,'') as EMAIL\n,ifnull(Categorie,'') as CATEGORIE\n,ifnull(Contact,'') as CONTACT\n,ifnull(Land,'') as LAND\n,ifnull(cast(Leverdagen as CHAR),'') as LEVERDAGEN\nfrom KLANT\nwhere id = '" + db_1.default.fix(req.query.klantid) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _a.sent();
                        connection.release();
                        res.status(200).send(rows[0]);
                        return [2 /*return*/];
                }
            });
        });
    };
    Retourklant.prototype.routes = function (req, res, next) {
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
    return Retourklant;
}(crud_1.Crud));
exports.Retourklant = Retourklant;
//# sourceMappingURL=retourklant.js.map