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
var action_1 = require("../action");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
//
var CreateCompareSql = /** @class */ (function (_super) {
    __extends(CreateCompareSql, _super);
    function CreateCompareSql() {
        return _super.call(this, "CreateCompareSql") || this;
    }
    CreateCompareSql.prototype.doQuery = function (req, res, next) {
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
                        sql = '';
                        //
                        //
                        //
                        if (query.action == 'leverancier' || query.action == 'all') {
                            sql += "\n-- delete from ak2.leverancier;\nselect * from \n(SELECT ak2.leverancier.* FROM ak2.leverancier) TAS\nright join\n(select ak2psdata.leverancier.* from ak2psdata.leverancier) SAV\non TAS.LEVERANCIERNUMMER = SAV.LEVERANCIERNUMMER\nwhere TAS.id is not null\nand (\nTAS.NAAM != SAV.NAAM\nor TAS.ZOEKCODE != SAV.ZOEKCODE\nor TAS.Adres != SAV.adres\nor TAS.woonplaats != SAV.woonplaats\nor TAS.postcode != SAV.postcode\nor TAS.telefoon != SAV.telefoon\nor TAS.fax != SAV.fax\nor TAS.email != SAV.email\nor TAS.categorie != SAV.categorie\nor ifnull(TAS.leverdagen,0) != ifnull(SAV.leverdagen,0)\n)\norder by sav.leveranciernummer;\n";
                        }
                        //
                        //
                        //
                        if (query.action == 'klant' || query.action == 'all') {
                            sql += "\n-- delete from ak2.klant;\nselect * from \n(SELECT * FROM ak2.klant) TAS\nright join\n(select * from ak2psdata.klant) SAV\non TAS.klantnummer = SAV.klantnummer\nwhere \nTAS.id is not null\nand (\nTAS.NAAM != SAV.NAAM\nor TAS.ZOEKCODE != SAV.ZOEKCODE\nor TAS.Adres != SAV.adres\nor TAS.woonplaats != SAV.woonplaats\nor TAS.postcode != SAV.postcode\nor TAS.telefoon != SAV.telefoon\nor TAS.fax != SAV.fax\nor TAS.email != SAV.email\nor TAS.categorie != SAV.categorie\nor TAS.contact != SAV.contact\nor TAS.land != SAV.land\nor ifnull(TAS.leverdagen,0) != ifnull(SAV.leverdagen,0)\n)\norder by sav.klantnummer\n";
                        }
                        //
                        //
                        //
                        if (query.action == 'product' || query.action == 'all') {
                            sql += "\n-- delete from ak2.product;\nselect * from \n(SELECT * FROM ak2.product) TAS\nright join\n(select * from ak2psdata.product) SAV\non TAS.productnummer = SAV.productnummer\nwhere \nTAS.id is not null\nand (\nifnull(TAS.productnaam,'') != ifnull(SAV.productnaam,'')\nor ifnull(TAS.voorraad,0) != ifnull(SAV.voorraad,0)\nor ifnull(TAS.voorraaddatumtijd,'') != ifnull(SAV.voorraaddatumtijd,'')\nor ifnull(TAS.eindvoorraad,0) != ifnull(SAV.eindvoorraad,0)\nor ifnull(TAS.tepicken,0) != ifnull(SAV.tepicken,0)\nor ifnull(TAS.tebestellen,0) != ifnull(SAV.tebestellen,0)\nor ifnull(TAS.soort,0) != ifnull(SAV.soort,0)\nor ifnull(TAS.lijn,'') != ifnull(SAV.lijn,'')\nor ifnull(TAS.performance,0) != ifnull(SAV.performance,0)\nor ifnull(TAS.inkoopprijs,0) != ifnull(SAV.inkoopprijs,0)\nor ifnull(TAS.inkoopprijsgemiddeld,0) != ifnull(SAV.inkoopprijsgemiddeld,0)\nor ifnull(TAS.leverdagen,0) != ifnull(SAV.leverdagen,0)\nor ifnull(TAS.locatie,'') != ifnull(SAV.locatie,'')\nor ifnull(TAS.leveranciernummer,'') != ifnull(SAV.leveranciernummer,'')\nor ifnull(TAS.leverancierproductnummer,'') != ifnull(SAV.leverancierproductnummer,'')\n)\norder by sav.productnummer\n";
                        }
                        //
                        //
                        //
                        if (query.action == 'onderdeel' || query.action == 'all') {
                            sql += "\n-- delete from ak2.onderdeel;\nselect * from \n(SELECT * FROM ak2.onderdeel) TAS\nright join\n(select * from ak2psdata.onderdeel) SAV\non TAS.productnummer = SAV.productnummer\nand TAS.onderdeelnummer = SAV.onderdeelnummer\nwhere \nTAS.id is not null\nand (\nifnull(TAS.faktor,0) != ifnull(SAV.faktor,0)\n)\norder by sav.productnummer,sav.onderdeelnummer\n";
                        }
                        //
                        //
                        //
                        if (query.action == 'bestelling' || query.action == 'all') {
                            sql += "\n-- delete from ak2.bestelling;\nselect * from \n(SELECT * FROM ak2.bestelling) TAS\nright join\n(select * from ak2psdata.bestelling) SAV\non TAS.bestelnummer = SAV.bestelnummer\nand TAS.regelnummer = SAV.regelnummer\nwhere \nTAS.id is not null\nand (\nifnull(TAS.Startdatumtijd,'') != ifnull(SAV.Startdatumtijd,'')\nor ifnull(TAS.productnummer,'') != ifnull(SAV.productnummer,'')\nor ifnull(TAS.bestelling,0) != ifnull(SAV.bestelling,0)\nor ifnull(TAS.besteldatumtijd,'') != ifnull(SAV.besteldatumtijd,'')\nor ifnull(TAS.leveranciernummer,'') != ifnull(SAV.leveranciernummer,'')\nor ifnull(TAS.leverancierproductnummer,'') != ifnull(SAV.leverancierproductnummer,'')\nor ifnull(TAS.geprintdatumtijd,0) != ifnull(SAV.geprintdatumtijd,0)\nor ifnull(TAS.gepickeddatumtijd,0) != ifnull(SAV.gepickeddatumtijd,0)\nor ifnull(TAS.verzondendatumtijd,0) != ifnull(SAV.verzondendatumtijd,0)\nor ifnull(TAS.ontvangendatumtijd,0) != ifnull(SAV.ontvangendatumtijd,0)\nor ifnull(TAS.contactpersoon,'') != ifnull(SAV.contactpersoon,'')\nor ifnull(TAS.inkoopprijs,0) != ifnull(SAV.inkoopprijs,0)\nor ifnull(TAS.opmerking,'') != ifnull(SAV.opmerking,'')\n)\norder by sav.bestelnummer,sav.regelnummer\n";
                        }
                        //
                        //
                        //
                        //let rows = await db.waitQuery(res.crudConnection, sql);
                        res.crudConnection.release();
                        res.status(200).send(sql);
                        return [2 /*return*/];
                }
            });
        });
    };
    CreateCompareSql.prototype.routes = function (req, res, next) {
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
                    this.doQuery(req, res, next);
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
    return CreateCompareSql;
}(action_1.Action));
exports.CreateCompareSql = CreateCompareSql;
//# sourceMappingURL=createcomparesql.js.map