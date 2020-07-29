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
var dict = {
    table: "RETOURACTIE",
    key: [
        {
            body: "ID",
            sql: "ID",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(ACTIE)",
        where: [
            {
                query: "value",
                sql: "ucase(ACTIE) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ACTIE as ID"
            },
            {
                row: "VALUE",
                sql: "ACTIE AS VALUE"
            }
        ],
    },
    query: {
        orderby: "REFERENTIE,ACTIE,GEREEDDATUMTIJD",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "referentie",
                sql: "ucase(REFERENTIE) like ucase('?%')",
            },
            {
                query: "actie",
                sql: "ucase(ACTIE) like ucase('?%')",
            },
            {
                query: "gebruiker",
                sql: "ucase(GEBRUIKER) like ucase('?%')",
            },
            {
                query: "garantie",
                sql: "ucase(GARANTIE) like ucase('?%')",
            },
            {
                query: "kosten",
                sql: "KOSTEN = ?",
            },
            {
                query: "opmerking",
                sql: "ucase(OPMERKING) like ucase('?%')",
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
                row: "ACTIE",
                sql: "ifnull(ACTIE,'') as ACTIE",
            },
            {
                row: "GEBRUIKER",
                sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
            },
            {
                row: "GARANTIE",
                sql: "ifnull(GARANTIE,'') as GARANTIE",
            },
            {
                row: "KOSTEN",
                sql: "ifnull(cast(KOSTEN as CHAR),'') as KOSTEN",
            },
            {
                row: "GEREEDDATUMTIJD",
                sql: "date2jsondate(GEREEDDATUMTIJD) as GEREEDDATUMTIJD",
            },
            {
                row: "OPMERKING",
                sql: "ifnull(OPMERKING,'') as OPMERKING",
            },
            {
                row: "GEREED",
                sql: "date2screendate(GEREEDDATUMTIJD) as GEREED",
            },
            {
                row: "ACTIE_DESC",
                sql: "ifnull((select naam from RETOURACTIETYPE where RETOURACTIE.actie = RETOURACTIETYPE.actie),'') as ACTIE_DESC",
            },
            {
                row: "GEBRUIKER_DESC",
                sql: "ifnull((select naam from RETOURGEBRUIKER where RETOURACTIE.gebruiker = RETOURGEBRUIKER.gebruiker),'') as GEBRUIKER_DESC",
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
                body: "GEREED",
                sql: "GEREEDDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "ACTIE_DESC",
                sql: "ACTIE = (select min(actie) from RETOURACTIETYPE where naam = '?')",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "GEBRUIKER_DESC",
                sql: "GEBRUIKER = (select min(gebruiker) from RETOURGEBRUIKER where naam = '?')",
                required: false,
                maxLength: 255,
                default: "",
            },
        ],
    },
};
var Retouractie = /** @class */ (function (_super) {
    __extends(Retouractie, _super);
    function Retouractie() {
        return _super.call(this, dict) || this;
    }
    Retouractie.prototype.setGereedSql = function (req, res, next) {
        var sql = "\nupdate RETOUR set\ngereeddatumtijd = \n(select case \nwhen exists(select 1 from RETOURACTIE where gereeddatumtijd is NULL and referentie = '" + db_1.default.fix(req.body.REFERENTIE) + "')\nthen null\nelse\n(select max(gereeddatumtijd) from RETOURACTIE where referentie = '" + db_1.default.fix(req.body.REFERENTIE) + "')\nend)\nwhere referentie = '" + db_1.default.fix(req.body.REFERENTIE) + "';";
        return sql;
    };
    Retouractie.prototype.doAfterUpdate = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = true;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, this.setGereedSql(req, res, next))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Retouractie.prototype.doAfterDelete = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = true;
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, this.setGereedSql(req, res, next))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    return Retouractie;
}(crud_1.Crud));
exports.Retouractie = Retouractie;
//# sourceMappingURL=retouractie.js.map