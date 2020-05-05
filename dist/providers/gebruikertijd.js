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
//
var dict = {
    table: "BEWERKINGTIJD",
    key: [
        {
            body: "BEWERKINGSNUMMER",
            sql: "BEWERKINGSNUMMER",
        },
        {
            body: "PRODUCTNUMMER",
            sql: "PRODUCTNUMMER",
        },
        {
            body: "BEWERKINGFLOWID",
            sql: "BEWERKINGFLOWID",
        },
        {
            body: "STARTDATUMTIJD",
            sql: "STARTDATUMTIJD",
        },
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "BEWERKINGSNUMMER",
        where: [
            {
                query: "value",
                sql: "ucase(BEWERKINGSNUMMER) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "BEWERKINGSNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "Gebruiker,startdatumtijd,bewerkingsnummer",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "open",
                sql: "case when '?' = '1' then tijd = 0 else true end",
            },
            {
                query: "bewerkingsnummer",
                sql: "BEWERKINGSNUMMER like ('%?%')",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            },
            {
                query: "bewerkingflowid",
                sql: "BEWERKINGFLOWID = ?",
            },
            {
                query: "afdeling",
                sql: "AFDELING like ('%?%')",
            },
            {
                query: "gebruiker",
                sql: "GEBRUIKER = '?'",
            },
            {
                query: "bewerkingsoort",
                sql: "BEWERKINGSOORT like ('%?%')",
            },
            {
                query: "startdatumtijd",
                sql: "STARTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "einddatumtijd",
                sql: "EINDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "aantalgemaakt",
                sql: "AANTALGEMAAKT = ?",
            },
            {
                query: "aantaluitval",
                sql: "AANTALUITVAL like ('%?%')",
            },
            {
                query: "tijd",
                sql: "TIJD = ?",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "BEWERKINGSNUMMER",
                sql: "ifnull(BEWERKINGSNUMMER,'') as BEWERKINGSNUMMER",
            },
            {
                row: "BEWERKINGFLOWID",
                sql: "ifnull(cast(BEWERKINGFLOWID as CHAR),'') as BEWERKINGFLOWID",
            },
            {
                row: "GEBRUIKER",
                sql: "(select min(naam) from GEBRUIKER where GEBRUIKER.Gebruiker = BEWERKINGTIJD.gebruiker) as GEBRUIKER",
            },
            {
                row: "STARTDATUMTIJD",
                sql: "date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD",
            },
            {
                row: "EINDDATUMTIJD",
                sql: "date2jsondate(EINDDATUMTIJD) as EINDDATUMTIJD",
            },
            {
                row: "DATUM",
                sql: "date2screendate(STARTDATUMTIJD) as DATUM",
            },
            {
                row: "START",
                sql: "date2screentime(STARTDATUMTIJD) as START",
            },
            {
                row: "EIND",
                sql: "date2screentime(EINDDATUMTIJD) as EIND",
            },
            {
                row: "BON",
                sql: "(\nselect concat(bewerkingsnummer,'-',volgnummer)\nfrom BEWERKINGFLOW\nwhere BEWERKINGFLOW.id = BEWERKINGTIJD.bewerkingflowid) as BON"
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "PRODUCTNUMMERX",
                sql: "(\nselect productnummer from BEWERKING\nwhere BEWERKING.bewerkingsnummer = BEWERKINGTIJD.bewerkingsnummer)\nas PRODUCTNUMMERX",
            },
            {
                row: "BEWERKINGSOORT",
                sql: "\n(select naam from BEWERKINGSOORT,BEWERKINGFLOW\nwhere BEWERKINGFLOW.id = BEWERKINGTIJD.bewerkingflowid\nand BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) as BEWERKINGSOORT\n"
            },
            {
                row: "TIJD",
                sql: "ifnull(cast(TIJD as CHAR),'') as TIJD",
            },
        ],
    },
    update: {
        fields: [
            {
                body: "BEWERKINGSNUMMER",
                sql: "BEWERKINGSNUMMER = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "BEWERKINGFLOWID",
                sql: "BEWERKINGFLOWID",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "PRODUCTNUMMER",
                sql: "PRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
        ],
    },
};
var Gebruikertijd = /** @class */ (function (_super) {
    __extends(Gebruikertijd, _super);
    function Gebruikertijd() {
        return _super.call(this, dict) || this;
    }
    Gebruikertijd.prototype.addWhere = function (req, res, next, where) {
        var result = _super.prototype.addWhere.call(this, req, res, next, where);
        if (req.query.year && req.query.month && req.query.day) {
            var screendate = db_1.default.fix(req.query.day) + "-" + db_1.default.fix(req.query.month) + "-" + db_1.default.fix(req.query.year);
            if (result == "") {
                result += "\nwhere ";
            }
            else {
                result += "\nand ";
            }
            result += "date2screendate(startdatumtijd) = '" + screendate + "'";
        }
        return result;
    };
    Gebruikertijd.prototype.doAfterUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, sqlgebruiker, startdatumtijd, einddatumtijd, sql, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        result = true;
                        startdatumtijd = req.body.DATUM + " " + req.body.START;
                        einddatumtijd = req.body.DATUM + " " + req.body.EIND;
                        if (req.body.GEBRUIKER) {
                            sqlgebruiker = "\ngebruiker = (select min(gebruiker) from GEBRUIKER where naam = '" + db_1.default.fix(req.body.GEBRUIKER) + "')";
                        }
                        else {
                            sqlgebruiker = "\ngebruiker = '" + db_1.default.fix(req.ak2_user) + "'";
                        }
                        sql = "\nupdate BEWERKINGTIJD set\n" + sqlgebruiker + ",\nstartdatumtijd = screendatetime2date('" + startdatumtijd + "'),\neinddatumtijd = screendatetime2date('" + einddatumtijd + "'),\ntijd = '" + db_1.default.fix(req.body.TIJD) + "'\nwhere id = " + db_1.default.fix(req.body.ID);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        _a.crudResult = _c.sent();
                        sql = "\nupdate BEWERKINGTIJD set\ntijd = TIMESTAMPDIFF(MINUTE,startdatumtijd,einddatumtijd)\nwhere id = " + db_1.default.fix(req.body.ID);
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _b.crudResult = _c.sent();
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    return Gebruikertijd;
}(crud_1.Crud));
exports.Gebruikertijd = Gebruikertijd;
//# sourceMappingURL=gebruikertijd.js.map