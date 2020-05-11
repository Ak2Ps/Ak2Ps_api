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
    table: "BESTELLING",
    key: [
        {
            body: "LEVERANCIERNUMMER",
            sql: "LEVERANCIERNUMMER",
        },
        {
            body: "BESTELNUMMER",
            sql: "BESTELNUMMER",
        },
        {
            body: "REGELNUMMER",
            sql: "REGELNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "PRODUCTNUMMER",
        where: [
            {
                query: "value",
                sql: "PRODUCTNUMMER like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "leveranciernummer,bestelnummer,productnummer,startdatumtijd",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "status",
                sql: "STATUS like ('%?%')",
            },
            {
                query: "lijststatus",
                sql: "LIJSTSTATUS like ('%?%')",
            },
            {
                query: "startdatumtijd",
                sql: "STARTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('?%')",
            },
            {
                query: "bestelling",
                sql: "BESTELLING = ?",
            },
            {
                query: "sel_vanaf",
                sql: "BESTELDATUMTIJD >= screendate2date('?')",
            },
            {
                query: "sel_tm",
                sql: "BESTELDATUMTIJD <= screendate2date('?')",
            },
            {
                query: "leveranciernummer",
                sql: "LEVERANCIERNUMMER = '?'",
            },
            {
                query: "leveranciernaam",
                sql: "LEVERANCIERNAAM like ('%?%')",
            },
            {
                query: "leverancierproductnummer",
                sql: "LEVERANCIERPRODUCTNUMMER like ('%?%')",
            },
            {
                query: "bestelnummer",
                sql: "BESTELNUMMER = '?'",
            },
            {
                query: "regelnummer",
                sql: "REGELNUMMER like ('%?%')",
            },
            {
                query: "geprintdatumtijd",
                sql: "GEPRINTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "gepickeddatumtijd",
                sql: "GEPICKEDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "verzondendatumtijd",
                sql: "VERZONDENDATUMTIJD > screendate2date('?')",
            },
            {
                query: "ontvangendatumtijd",
                sql: "ONTVANGENDATUMTIJD > screendate2date('?')",
            },
            {
                query: "contactpersoon",
                sql: "CONTACTPERSOON like ('%?%')",
            },
            {
                query: "inkoopprijs",
                sql: "INKOOPPRIJS = ?",
            },
            {
                query: "opmerking",
                sql: "OPMERKING like ('%?%')",
            }
        ],
        fields: [],
    },
    update: {
        fields: [],
    },
};
var Bestellingkop = /** @class */ (function (_super) {
    __extends(Bestellingkop, _super);
    function Bestellingkop() {
        return _super.call(this, dict) || this;
    }
    Bestellingkop.prototype.createQuerySql = function (req, res, next, options) {
        var _a, _b;
        var sql = "\nselect *,\ndate2screendate(startdatumtijd) as STARTDATUM,\ncase when producten <= 1 then productnummer else '...' end as PRODUCTNUMMER,\ncase when besteldatumtijden <= 1 then date2screendate(besteldatumtijd) else '...' end as BESTELDATUM,\ndate2screendate(geprintdatumtijd) as GEPRINTDATUM,\ncase when geprintdatumtijd is null then NULL else 1 end as GEPRINT,\ndate2screendate(gepickeddatumtijd) as GEPICKEDDATUM,\ncase when gepickeddatumtijd is null then NULL else 1 end as GEPICKED,\ndate2screendate(verzondendatumtijd) as VERZONDENDATUM,\ncase when verzondendatumtijd is null then NULL else 1 end as VERZONDEN,\ndate2screendate(ontvangendatumtijd) as ONTVANGENDATUM,\ncase when ontvangendatumtijd is null then NULL else 1 end as ONTVANGEN,\n(select Zoekcode from LEVERANCIER \nwhere LEVERANCIER.leveranciernummer = BASE.leveranciernummer) as ZOEKKODE,\n(select naam from LEVERANCIER \nwhere LEVERANCIER.leveranciernummer = BASE.leveranciernummer) as LEVERANCIERNAAM\nfrom (\nselect bestelnummer,\nbestelnummer as ID,\nmin(startdatumtijd) as startdatumtijd,\nmin(besteldatumtijd) as besteldatumtijd,\ncount(distinct(besteldatumtijd)) as besteldatumtijden,\nmin(geprintdatumtijd) as geprintdatumtijd,\nmin(gepickeddatumtijd) as gepickeddatumtijd,\nmin(verzondendatumtijd) as verzondendatumtijd,\nmin(ontvangendatumtijd) as ontvangendatumtijd,\nmin(productnummer) as productnummer,\ncount(distinct(productnummer)) as producten,\nsum(bestelling) as bestelling,\nmin(leveranciernummer) as leveranciernummer\nfrom BESTELLING group by bestelnummer) BASE\n";
        sql += this.addWhere(req, res, next, (_a = options === null || options === void 0 ? void 0 : options.query) === null || _a === void 0 ? void 0 : _a.where);
        if (req.query.geprint == 'Nee') {
            sql += " having geprint is null";
        }
        else if (req.query.geprint == 'Ja') {
            sql += " having geprint = 1";
        }
        sql += this.addOrderby(req, res, next, (_b = options === null || options === void 0 ? void 0 : options.query) === null || _b === void 0 ? void 0 : _b.orderby);
        return sql;
    };
    Bestellingkop.prototype.doUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, _a, bestelnummer;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        bestelnummer = db_1.default.getDataId(req);
                        if (Number(req.body.GEPRINT) == 1) {
                            sql = "\nupdate BESTELLING set \ngeprintdatumtijd = sysdate() \nwhere geprintdatumtijd is null \nand bestelnummer = '" + bestelnummer + "'";
                        }
                        else {
                            sql = "\nupdate BESTELLING \nset geprintdatumtijd = null \nwhere geprintdatumtijd is not null \nand bestelnummer = '" + bestelnummer + "'";
                        }
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        rows = _b.sent();
                        //
                        res.crudConnection.release();
                        res.status(200).send(req.body);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Bestellingkop;
}(crud_1.Crud));
exports.Bestellingkop = Bestellingkop;
//# sourceMappingURL=bestellingkop.js.map