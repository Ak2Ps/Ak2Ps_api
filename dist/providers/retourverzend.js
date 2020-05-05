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
var retourtextfragmenten_1 = require("./retourtextfragmenten");
//
var dict = {
    table: "retourverzend",
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
var Retourverzend = /** @class */ (function (_super) {
    __extends(Retourverzend, _super);
    function Retourverzend() {
        return _super.call(this, dict) || this;
    }
    Retourverzend.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, result, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w;
            return __generator(this, function (_x) {
                switch (_x.label) {
                    case 0:
                        //
                        res.crudData = {};
                        res.crudData.html = '';
                        res.crudData.taal = "";
                        res.crudData.row = {};
                        res.crudData.rowklant = {};
                        res.crudData.filename = "";
                        res.crudData.targetdir = "";
                        res.crudData.targeturl = "";
                        query = db_1.default.fixQuery(req.query);
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _x.sent();
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getRetour(req, res, next, "verzend")];
                    case 2:
                        result = _x.sent();
                        //
                        if (String(query.action).indexOf('getfile') >= 0) {
                            res.crudData.result = {
                                success: "true",
                                filename: res.crudData.filename,
                            };
                            res.status(200).send(res.crudData.result);
                            res.crudConnection.release();
                            return [2 /*return*/];
                        }
                        //
                        _b = res.crudData;
                        //
                        _c = _b.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getBarcode(req, res, next, '8em')];
                    case 3:
                        //
                        _b.html = _c + _x.sent(); //(alleen als zichtbaar)
                        _d = res.crudData;
                        _e = _d.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getHeader(req, res, next, '3em')];
                    case 4:
                        _d.html = _e + _x.sent();
                        _f = res.crudData;
                        _g = _f.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getKlantHeaderVerzend(req, res, next, '15em')];
                    case 5:
                        _f.html = _g + _x.sent();
                        _h = res.crudData;
                        _j = _h.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getMidTextVerzend(req, res, next, '5em')];
                    case 6:
                        _h.html = _j + _x.sent();
                        _k = res.crudData;
                        _l = _k.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getItemsVerzend(req, res, next, '20em')];
                    case 7:
                        _k.html = _l + _x.sent();
                        _m = res.crudData;
                        _o = _m.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getGarantie(req, res, next, '4em')];
                    case 8:
                        _m.html = _o + _x.sent();
                        _p = res.crudData;
                        _q = _p.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getBottomTextVerzend(req, res, next, '6em')];
                    case 9:
                        _p.html = _q + _x.sent();
                        _r = res.crudData;
                        _s = _r.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getOnderschrift(req, res, next, '12em')];
                    case 10:
                        _r.html = _s + _x.sent();
                        _t = res.crudData;
                        _u = _t.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.getFooter(req, res, next, '2em')];
                    case 11:
                        _t.html = _u + _x.sent();
                        _v = res.crudData;
                        _w = _v.html;
                        return [4 /*yield*/, retourtextfragmenten_1.Retourtextfragmenten.setValues(req, res, next)];
                    case 12:
                        _v.html = _w + _x.sent();
                        //
                        res.status(200).send(res.crudData.html);
                        res.crudConnection.release();
                        return [2 /*return*/];
                }
            });
        });
    };
    Retourverzend.prototype.routes = function (req, res, next) {
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
                    this.doQuery(req, res, next, this.dict);
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
    return Retourverzend;
}(crud_1.Crud));
exports.Retourverzend = Retourverzend;
//# sourceMappingURL=retourverzend.js.map