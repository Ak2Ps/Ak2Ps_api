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
//
var dict = {
    table: "retourrap",
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
var Retourrap = /** @class */ (function (_super) {
    __extends(Retourrap, _super);
    function Retourrap() {
        return _super.call(this, dict) || this;
    }
    Retourrap.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, sql, rows, row, result, _a, where, gereedwhere, startwhere, startwhere2, productgereedwhere, startgereed;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        sql = '';
                        result = '';
                        //
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        //
                        _a.crudConnection = _b.sent();
                        where = '';
                        gereedwhere = '';
                        startwhere = '';
                        startwhere2 = '';
                        productgereedwhere = '';
                        startgereed = '';
                        //
                        if (query.datumvanaf != '') {
                            if (startwhere != '') {
                                startwhere += '\nand ';
                            }
                            startwhere += "RETOUR.startdatumtijd >= screendate2date('" + query.datumvanaf + "')";
                        }
                        if (query.datumvanaf != '') {
                            if (gereedwhere != '') {
                                gereedwhere += '\nand ';
                            }
                            gereedwhere += "RETOUR.gereeddatumtijd >= screendate2date('" + query.datumvanaf + "')";
                        }
                        if (query.datumvanaf != '') {
                            if (productgereedwhere != '') {
                                productgereedwhere += '\nand ';
                            }
                            productgereedwhere += "BEWERKING.einddatumtijd >= screendate2date('" + query.datumvanaf + "')";
                        }
                        //
                        if (query.datumtm != '') {
                            if (startwhere != '') {
                                startwhere += '\nand ';
                            }
                            startwhere += "RETOUR.startdatumtijd <= screendate2date('" + query.datumtm + "')";
                        }
                        if (query.datumtm != '') {
                            if (productgereedwhere != '') {
                                productgereedwhere += '\nand ';
                            }
                            productgereedwhere += "BEWERKING.einddatumtijd <= screendate2date('" + query.datumtm + "')";
                        }
                        if (query.datumtm != '') {
                            if (gereedwhere != '') {
                                gereedwhere += '\nand ';
                            }
                            gereedwhere += "RETOUR.gereeddatumtijd <= screendate2date('" + query.datumtm + "')";
                        }
                        //
                        // RAP1 Afgehandeld per afdeling/actie/termijn
                        //
                        if (query.action == 'rap1') {
                            if (gereedwhere != '') {
                                gereedwhere = '\nand ' + gereedwhere;
                            }
                            sql = " \nselect *,\n(\nselect \ncount(*)\nfrom RETOURACTIE,RETOUR\nwhere RETOURACTIE.REFERENTIE = RETOUR.REFERENTIE\nand   RETOURACTIE.gebruiker  = basegebruiker.gebruiker\nand   RETOURACTIE.actie      = baseactie.actie \nand   isnull(RETOUR.gereeddatumtijd) = false \n" + gereedwhere + "\n) as aantal_gebruiker_actie,\n(\nselect \ncount(*)\nfrom RETOURACTIE,RETOUR\nwhere RETOURACTIE.REFERENTIE = RETOUR.REFERENTIE\nand   RETOURACTIE.gebruiker  = basegebruiker.gebruiker\nand   RETOUR.termijn         = basetermijn.retourtermijn \nand   isnull(RETOUR.gereeddatumtijd) = false \n" + gereedwhere + "\n) as aantal_gebruiker_termijn\nfrom\n(\nselect \nRETOURGEBRUIKER.gebruiker,\nRETOURGEBRUIKER.naam as gebruiker_naam\nfrom\nRETOURGEBRUIKER\nwhere exists (select 1 from RETOURACTIE \nwhere RETOURACTIE.gebruiker = RETOURGEBRUIKER.GEBRUIKER)\norder by RETOURGEBRUIKER.gebruiker\n) basegebruiker\n,\n(\nselect \nRETOURACTIETYPE.actie,\nRETOURACTIETYPE.naam as actie_naam\nfrom\nRETOURACTIETYPE\nwhere exists (select 1 from RETOURACTIE \nwhere RETOURACTIE.actie = RETOURACTIETYPE.ACTIE)\norder by RETOURACTIETYPE.actie\n) baseactie\n,\n(\nselect \nRETOURTERMIJN.retourtermijn,\nRETOURTERMIJN.naam as termijn_naam\nfrom\nRETOURTERMIJN\nwhere exists (select 1 from RETOUR \nwhere RETOUR.termijn = RETOURTERMIJN.retourtermijn)\norder by RETOURTERMIJN.retourtermijn\n) basetermijn\norder by gebruiker,actie,retourtermijn";
                            //
                            // RAP2 kosten van afgehandelde acties
                            //
                        }
                        else if (query.action == 'rap2') {
                            if (gereedwhere != '') {
                                gereedwhere = '\nand ' + gereedwhere;
                            }
                            sql = " \nselect *,\nformat(\ncase when aantal_referentie > 0 \nthen (retour_kosten * aantal_retour) / aantal_referentie \nelse 0 end\n,8) as kosten\nfrom (\nselect base.afdeling,\nformat(\n(select sum(kosten) from RETOUR \nwhere RETOUR.referentie = base.referentie)\n,8) as retour_kosten,\nsum(aantal) as aantal,\nmax(aantal) as aantal_retour,\n(select count(*) from RETOURACTIE \nwhere RETOURACTIE.referentie = base.referentie) as aantal_referentie,\nsum(garantie_ja) as garantie_ja,\nsum(garantie_nee) as garantie_nee,\nsum(garantie_misschien) as garantie_misschien\nfrom \n(\nselect \nRETOURGEBRUIKER.gebruiker,\nmin(RETOURGEBRUIKER.naam) as afdeling,\nbasera.referentie,\nsum((select 1 from RETOUR \nwhere RETOUR.referentie = basera.referentie)) as aantal,\nsum((select 1 from RETOUR \nwhere RETOUR.referentie = basera.referentie and RETOUR.garantie = 1)) \nas garantie_ja,\nsum((select 1 from RETOUR \nwhere RETOUR.referentie = basera.referentie and RETOUR.garantie = 2)) \nas garantie_nee,\nsum((select 1 from RETOUR \nwhere RETOUR.referentie = basera.referentie and RETOUR.garantie = '???')) \nas garantie_misschien\nfrom RETOURGEBRUIKER\nleft join (\nselect RETOURACTIE.* from RETOURACTIE inner join RETOUR \non RETOURACTIE.referentie = RETOUR.referentie \nwhere   isnull(RETOUR.gereeddatumtijd) = false \n" + gereedwhere + "\n) basera on RETOURGEBRUIKER.gebruiker = basera.gebruiker\ngroup by RETOURGEBRUIKER.gebruiker, basera.referentie\n) base\ngroup by base.gebruiker\t\n) base2";
                            //
                            // RAP3 binnengekomen referenties per afdeling
                            //
                        }
                        else if (query.action == "rap3") {
                            startwhere2 = '';
                            if (startwhere != '') {
                                startwhere2 = '\nand ' + startwhere;
                                startwhere = '\nwhere ' + startwhere;
                            }
                            sql = "\nselect\ncase when afdeling = '...' then afdeling \nelse (select min(naam) from RETOURGEBRUIKER where gebruiker = afdeling) end \nas afdeling,\nklantnummer,\nmin(naam) as naam,\ncount(distinct(referentie)) as aantal_retouren,\nmin(referentie),\nmax(referentie),\nmin(productnummer),\nmax(productnummer),\ncount(distinct(productnummer)),\nsum(aantal) as aantal_producten,\ncase when afdeling = '...' then '???' else\n(select count(*) from RETOURACTIE, RETOURKLANT, RETOUR\nwhere RETOURACTIE.referentie = RETOUR.referentie\nand   RETOUR.referentie = RETOURKLANT.referentie\nand   RETOURKLANT.klantnummer = base.klantnummer \nand   RETOURACTIE.gebruiker = base.afdeling \n" + startwhere2 + ")\nend\nas aantal_acties\nfrom\n(\nselect *,\ncase when afdeling1 = afdeling2 then afdeling1 else '...' end as afdeling\nfrom\n(select \nRETOUR.referentie,\nRETOUR.startdatumtijd,\nRETOURPRODUCT.productnummer,\nRETOURPRODUCT.aantal,\n(select min(RETOURACTIE.gebruiker) from RETOURACTIE \nwhere RETOURACTIE.referentie = RETOUR.referentie) as afdeling1,\n(select max(RETOURACTIE.gebruiker) from RETOURACTIE \nwhere RETOURACTIE.referentie = RETOUR.referentie) as afdeling2\nfrom RETOURPRODUCT inner join RETOUR \non RETOUR.referentie = RETOURPRODUCT.referentie \n" + startwhere + "\n) baseproduct\nleft join\n(select \nreferentie as klantreferentie, \nklantnummer, \nnaam from RETOURKLANT) baseklant \non baseproduct.referentie = baseklant.klantreferentie\n) base\ngroup by afdeling, klantnummer\norder by afdeling, klantnummer";
                            //
                            // RAP4A binnengekomen per afdeling/product
                            //
                        }
                        else if (query.action == "rap4a") {
                            startwhere2 = '';
                            if (startwhere != '') {
                                startwhere2 = '\nand ' + startwhere;
                                startwhere = '\nwhere ' + startwhere;
                            }
                            sql = " \nselect\n(select \nnaam \nfrom RETOURACTIETYPE \nwhere RETOURACTIETYPE.actie = baseactie.actie) as actietype,\nbaseactie.actie\nfrom\n(\nselect distinct \nactie\nfrom RETOURACTIE inner join RETOUR \non RETOURACTIE.referentie = RETOUR.referentie \n" + startwhere + "\n) baseactie\norder by baseactie.actie";
                            //
                            // RAP4B totaalregel
                            //
                        }
                        else if (query.action == "rap4b") {
                            startwhere2 = '';
                            if (startwhere != '') {
                                startwhere2 = '\nand ' + startwhere;
                                startwhere = '\nwhere ' + startwhere;
                            }
                            if (productgereedwhere != '') {
                                productgereedwhere = '\nand ' + productgereedwhere;
                            }
                            sql = "\nselect\n(select \nsum(startaantal) \nfrom BEWERKING \nwhere BEWERKING.productnummer = baseproduct.productnummer\n" + productgereedwhere + ") \nas aantal_gemaakt,\n(select min(naam) from RETOURGEBRUIKER \nwhere RETOURGEBRUIKER.gebruiker = baseactie.gebruiker) \nas afdeling,\nbaseproduct.productnummer,\n(select PRODUCT.productnaam from PRODUCT \nwhere PRODUCT.productnummer = baseproduct.productnummer) \nas omschrijving,\nbaseproduct.referentie,\n(select naam from RETOURACTIETYPE \nwhere RETOURACTIETYPE.actie = baseactie.actie) \nas actietype,\nbaseproduct.aantal_product,\nbaseactie.aantal_actie,\nbaseactie.gebruiker,\nbaseactie.actie\nfrom\n(\nselect \nRETOURACTIE.referentie,\nactie,\n1 as aantal_actie,\nRETOURACTIE.gebruiker\nfrom RETOURACTIE inner join RETOUR \non RETOURACTIE.referentie = RETOUR.referentie \n" + startwhere + "\n) baseactie\ninner join\n(\nselect referentie,\nproductnummer,\naantal as aantal_product\nfrom RETOURPRODUCT\n) baseproduct\non baseactie.referentie = baseproduct.referentie\norder by baseactie.gebruiker, baseproduct.productnummer, baseactie.referentie, baseactie.actie";
                            //
                            // RAP5 Afgehandeld per retourtype
                            //
                        }
                        else if (query.action == 'rap5') {
                            if (gereedwhere != '') {
                                gereedwhere = '\nand ' + gereedwhere;
                            }
                            sql = " \nselect *,\n(\nselect \ncount(*)\nfrom RETOUR\nwhere isnull(RETOUR.gereeddatumtijd) = false \n" + gereedwhere + "\n) as aantal,\n(\nselect \ncount(*)\nfrom RETOURTYPE, RETOUR\nwhere RETOURTYPE.retourtype = RETOUR.type\nand   RETOUR.type = basetype.retourtype \nand isnull(RETOUR.gereeddatumtijd) = false \n" + gereedwhere + "\n) as aantal_type,\n(\nselect \ncount(*)\nfrom RETOURTERMIJN, RETOUR\nwhere RETOURTERMIJN.retourtermijn = RETOUR.termijn\nand   RETOUR.termijn = basetermijn.retourtermijn \nand isnull(RETOUR.gereeddatumtijd) = false  \n" + gereedwhere + "\n) as aantal_termijn\nfrom\n(\nselect \nRETOURTYPE.retourtype,\nRETOURTYPE.naam as type_naam\nfrom\nRETOURTYPE\norder by RETOURTYPE.retourtype\n) basetype\n,\n(\nselect \nRETOURTERMIJN.retourtermijn,\nRETOURTERMIJN.naam as termijn_naam\nfrom\nRETOURTERMIJN\norder by RETOURTERMIJN.retourtermijn\n) basetermijn\norder by retourtype, retourtermijn";
                            //
                            // RAP6 Binnengekomen per retourtype
                            //
                        }
                        else if (query.action == 'rap6') {
                            if (startwhere != '') {
                                startwhere = '\nand ' + startwhere;
                            }
                            sql = "\nselect *,\n(\nselect \ncount(*)\nfrom RETOUR\nwhere isnull(startdatumtijd) = false \n" + startwhere + "\n) as aantal,\n(\nselect \ncount(*)\nfrom RETOURTYPE, RETOUR\nwhere RETOURTYPE.retourtype = RETOUR.type\nand   RETOUR.type = basetype.retourtype \n" + startwhere + "\n) as aantal_type,\n(\nselect \ncount(*)\nfrom RETOURTERMIJN, RETOUR\nwhere RETOURTERMIJN.retourtermijn = RETOUR.termijn\nand   RETOUR.termijn = basetermijn.retourtermijn \n" + startwhere + "\n) as aantal_termijn\nfrom\n(\nselect \nRETOURTYPE.retourtype,\nRETOURTYPE.naam as type_naam\nfrom\nRETOURTYPE\norder by RETOURTYPE.retourtype\n) basetype\n,\n(\nselect \nRETOURTERMIJN.retourtermijn,\nRETOURTERMIJN.naam as termijn_naam\nfrom\nRETOURTERMIJN\norder by RETOURTERMIJN.retourtermijn\n) basetermijn\norder by retourtype, retourtermijn";
                            //
                            // RAP7 Binnengekomen detail
                            //
                        }
                        else if (query.action == 'rap7') {
                            where = '';
                            if (startwhere != '') {
                                where = '\nwhere ' + startwhere;
                            }
                            sql = "\nselect \nid,\nreferentie,\nklantreferentie,\nstartdatumtijd,\ngereeddatumtijd,\ngebruiker,\ntype,\ntermijn,\nprijsopgave,\ngarantie,\nformat(kosten,8) as kosten,\nopmerking,\nstatus,\ntrim((select case when count(klantnummer) > 1 then '...'\nelse min(concat(RETOURKLANT.klantnummer, ' ',RETOURKLANT.naam)) end \nfrom RETOURKLANT where RETOURKLANT.referentie = RETOUR.referentie))\nas klant_oms,\n(select RETOURTYPE.naam from RETOURTYPE \nwhere RETOURTYPE.retourtype = RETOUR.type) as type_oms,\n(select RETOURTERMIJN.naam from RETOURTERMIJN \nwhere RETOURTERMIJN.retourtermijn = RETOUR.termijn) as termijn_oms,\ndate2screendate(startdatumtijd) as START,\ndate2screendate(gereeddatumtijd) as GEREED,\ndatediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) as DUUR\nfrom RETOUR\n" + where + "\norder by RETOUR.startdatumtijd, RETOUR.referentie";
                            //
                            // RAP8 Binnengekomen open binnen/buiten termijn
                            //
                        }
                        else if (query.action == 'rap8') {
                            where = '';
                            if (startwhere != '') {
                                if (where == '') {
                                    where = where + '\nwhere ';
                                }
                                where = where + startwhere;
                            }
                            sql = "\nselect\nsum(1) as aantal,\nsum(case when isnull(gereeddatumtijd) = false then 1 else 0 end) \nas aantal_afgehandeld,\nsum(case when isnull(gereeddatumtijd) = false \nand datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) \nthen 1 else 0 end) \nas aantal_gereed_binnen,\nsum(case when isnull(gereeddatumtijd) = false \nand datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) \nthen 1 else 0 end) \nas aantal_gereed_buiten,\nsum(case when isnull(gereeddatumtijd) then 1 else 0 end) \nas aantal_open,\nsum(case when isnull(gereeddatumtijd) \nand datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) \nthen 1 else 0 end) \nas aantal_binnen,\nsum(case when isnull(gereeddatumtijd) \nand datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) \nthen 1 else 0 end) \nas aantal_buiten\nfrom RETOUR\n" + where;
                            //
                            // RAP8b Afgehandeld totaal binnen/buiten termijn
                            //
                        }
                        else if (query.action == 'rap8b') {
                            where = '\nwhere isnull(RETOUR.gereeddatumtijd) = false';
                            if (gereedwhere != '') {
                                where = where + '\nand ' + gereedwhere;
                            }
                            sql = "\nselect\nsum(1) as aantal,\nsum(case when isnull(gereeddatumtijd) = false then 1 else 0 end) as aantal_afgehandeld,\nsum(case when isnull(gereeddatumtijd) = false and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) as aantal_gereed_binnen,\nsum(case when isnull(gereeddatumtijd) = false and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) as aantal_gereed_buiten,\nsum(case when isnull(gereeddatumtijd) then 1 else 0 end) as aantal_open,\nsum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) as aantal_binnen,\nsum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) as aantal_buiten\nfrom RETOUR\n" + where;
                            //
                            // RAP8c Open binnen/buiten termijn vanaf/tm
                            //
                        }
                        else if (query.action == 'rap8c') {
                            where = '\nwhere isnull(RETOUR.gereeddatumtijd) = true';
                            if (startgereed != '') {
                                if (where == '') {
                                    where = where + '\nand ';
                                }
                                where = where + startgereed;
                            }
                            sql = "\nselect\nsum(1) as aantal,\nsum(case when isnull(gereeddatumtijd) = false then 1 else 0 end) \nas aantal_afgehandeld,\nsum(case when isnull(gereeddatumtijd) = false \nand datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) \nas aantal_gereed_binnen,\nsum(case when isnull(gereeddatumtijd) = false\nand datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) \nas aantal_gereed_buiten,\nsum(case when isnull(gereeddatumtijd) then 1 else 0 end) \nas aantal_open,\nsum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) \nas aantal_binnen,\nsum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) \nas aantal_buiten\nfrom RETOUR\n" + where;
                            //
                            // RAP9 Afgehandeld detail
                            //
                        }
                        else if (query.action == 'rap9') {
                            where = '\nwhere isnull(RETOUR.gereeddatumtijd) = false';
                            if (gereedwhere != '') {
                                where = where + '\nand ' + gereedwhere;
                            }
                            sql = " \nselect \nid,\nreferentie,\nklantreferentie,\nstartdatumtijd,\ngereeddatumtijd,\ngebruiker,\ntype,\ntermijn,\nprijsopgave,\ngarantie,\nformat(kosten,8) as kosten,\nopmerking,\nstatus,\ntrim((select case when count(klantnummer) > 1 \nthen '...' else min(concat(RETOURKLANT.klantnummer, ' ',RETOURKLANT.naam)) end \nfrom RETOURKLANT \nwhere RETOURKLANT.referentie = RETOUR.referentie)) as klant_oms,\n(select RETOURTYPE.naam from RETOURTYPE \nwhere RETOURTYPE.retourtype = RETOUR.type) as type_oms,\n(select RETOURTERMIJN.naam from RETOURTERMIJN \nwhere RETOURTERMIJN.retourtermijn = RETOUR.termijn) as termijn_oms,\ndate2screendate(startdatumtijd) as START,\ndate2screendate(gereeddatumtijd) as GEREED,\ndatediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) as DUUR\nfrom RETOUR\n" + where + "\norder by RETOUR.gereeddatumtijd, RETOUR.referentie";
                            //
                            // RAP10 Open detail
                            //
                        }
                        else if (query.action == 'rap10') {
                            where = '\nwhere isnull(RETOUR.gereeddatumtijd) = true';
                            if (startwhere != '') {
                                where = where + '\nand ' + startwhere;
                            }
                            sql = " \nselect\nid,\nreferentie,\nklantreferentie,\nstartdatumtijd,\ngereeddatumtijd,\ngebruiker,\ntype,\ntermijn,\nprijsopgave,\ngarantie,\nformat(kosten,8) as kosten,\nopmerking,\nstatus,\ntrim((select case when count(klantnummer) > 1 then '...' \nelse min(concat(RETOURKLANT.klantnummer, ' ',RETOURKLANT.naam)) end \nfrom RETOURKLANT \nwhere RETOURKLANT.referentie = RETOUR.referentie)) as klant_oms,\n(select RETOURTYPE.naam from RETOURTYPE \nwhere RETOURTYPE.retourtype = RETOUR.type) as type_oms,\n(select RETOURTERMIJN.naam from RETOURTERMIJN \nwhere RETOURTERMIJN.retourtermijn = RETOUR.termijn) as termijn_oms,\ndate2screendate(startdatumtijd) as START,\ndate2screendate(gereeddatumtijd) as GEREED,\ndatediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) \nas DUUR\nfrom RETOUR\n" + where + "\norder by RETOUR.startdatumtijd, RETOUR.referentie";
                            //
                            // RAP11 Binnengekomen open binnen/buiten termijn in combinatie met totaal_open (overzichts rapport)
                            //
                        }
                        else if (query.action == 'rap11') {
                            where = '';
                            if (startwhere != '') {
                                if (where == '') {
                                    where = where + '\nwhere ';
                                }
                                where = where + startwhere;
                            }
                            sql = "\nselect\nsum(1) as aantal,\nsum(case when type = '01' then 1 else 0 end) as aantal_claim,\nsum(case when type = '04' then 1 else 0 end) as aantal_reparatie,\nsum(case when type != '01' and type != '04' then 1 else 0 end) as aantal_overig,\nsum(case when isnull(gereeddatumtijd) = false then 1 else 0 end) as aantal_afgehandeld,\nsum(case when isnull(gereeddatumtijd) = false and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) as aantal_gereed_binnen,\nsum(case when isnull(gereeddatumtijd) = false and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) as aantal_gereed_buiten,\nsum(case when isnull(gereeddatumtijd) then 1 else 0 end) as aantal_open,\nsum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end) as aantal_binnen,\nsum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end) as aantal_buiten,\n(select sum(case when isnull(gereeddatumtijd) then 1 else 0 end) from RETOUR) as totaal_aantal_open,\n(select sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) <= cast(termijn as signed) then 1 else 0 end)) as totaal_aantal_binnen,\n(select sum(case when isnull(gereeddatumtijd) and datediff(ifnull(gereeddatumtijd, sysdate()), startdatumtijd) > cast(termijn as signed) then 1 else 0 end)) as totaal_aantal_buiten\nfrom RETOUR\n" + where;
                        }
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        //
                        rows = _b.sent();
                        res.crudConnection.release();
                        res.status(200).send(rows);
                        return [2 /*return*/];
                }
            });
        });
    };
    Retourrap.prototype.routes = function (req, res, next) {
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
    return Retourrap;
}(crud_1.Crud));
exports.Retourrap = Retourrap;
//# sourceMappingURL=retourrap.js.map