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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var crud_1 = require("../crud");
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var fs = __importStar(require("fs"));
var config_1 = require("../config");
//
var dict = {
    table: "upload",
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
var Upload = /** @class */ (function (_super) {
    __extends(Upload, _super);
    function Upload() {
        return _super.call(this, dict) || this;
    }
    Upload.prototype.getNow = function () {
        var result = '';
        var today = new Date();
        var dd = String(today.getDate());
        var mm = String(today.getMonth() + 1);
        var yyyy = String(today.getFullYear());
        if (Number(dd) < 10) {
            dd = '0' + dd;
        }
        if (Number(mm) < 10) {
            mm = '0' + mm;
        }
        // dd-mm-yyyy
        // 01 34 6789
        result = dd + '-' + mm + '-' + yyyy;
        return db_1.default.fix(result);
    };
    Upload.prototype.get44Vraagdatum = function (datum) {
        var vraagdatum = datum;
        //
        var dag = datum.substr(0, 2);
        var maand = datum.substr(3, 2);
        var jaar = datum.substr(6, 4);
        //
        if (Number(jaar) == 2044) {
            var vraagdag = vraagdatum.substr(0, 2);
            var vraagmaand = vraagdatum.substr(3, 2);
            var vraagjaar = vraagdatum.substr(6, 4);
            //
            var thisdatum = this.getNow();
            var thisdag = thisdatum.substr(0, 2);
            var thismaand = thisdatum.substr(3, 2);
            var thisjaar = thisdatum.substr(6, 4);
            //
            var numvraagddmm = Number(vraagdag) + Number(vraagmaand) * 100;
            var numthisddmm = Number(thisdag) + Number(thismaand) * 100;
            //
            if (numvraagddmm < numthisddmm) {
                vraagjaar = String(Number(thisjaar) + 1);
                if (vraagdag == '29' && vraagmaand == '02') {
                    vraagdag = '28';
                }
            }
            else {
                vraagjaar = thisjaar;
            }
            vraagdatum = vraagdag + "-" + vraagmaand + "-" + vraagjaar;
        }
        return vraagdatum;
    };
    Upload.prototype.getDate = function (exactdate) {
        var result = '';
        // yyyy-mm-dd
        // 0123456789
        var thisDate = exactdate.trim();
        thisDate = thisDate.replace(/"/g, '');
        if (thisDate == '') {
            return db_1.default.fix(result);
        }
        var dag = thisDate.substr(8, 2);
        var maand = thisDate.substr(5, 2);
        var jaar = thisDate.substr(2, 2);
        result = dag + '-' + maand + '-20' + jaar;
        return db_1.default.fix(result);
    };
    Upload.prototype.getField = function (object) {
        var index = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            index[_i - 1] = arguments[_i];
        }
        var result = '';
        var thisObject = object;
        for (var iobj = 0; iobj < index.length; iobj++) {
            if (index[iobj] == '$') {
                thisObject = thisObject[index[iobj]];
                if (!thisObject) {
                    break;
                }
                iobj++;
                thisObject = thisObject[index[iobj]];
                if (!thisObject) {
                    break;
                }
            }
            else {
                thisObject = thisObject[index[iobj]];
                if (!thisObject) {
                    break;
                }
                thisObject = thisObject[0];
                if (!thisObject) {
                    break;
                }
            }
        }
        if (thisObject) {
            result = String(thisObject);
        }
        return db_1.default.fix(result);
    };
    Upload.prototype.getJson = function (filename) {
        return new Promise(function (resolve, reject) {
            var data = "{}";
            var result = {};
            try {
                data = String(fs.readFileSync(config_1.Config.appDir + "/" + filename));
            }
            catch (error) {
                logger_1.Logger.error(JSON.stringify(error));
            }
            try {
                result = JSON.parse(data);
            }
            catch (error) {
                logger_1.Logger.error(JSON.stringify(error));
                result = {};
            }
            resolve(result);
        });
    };
    Upload.prototype.loadHandtekening = function (req, res, next, filename, gebruiker) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var result, handtekening, extension, sql, msg, importfile;
                        var _this = this;
                        var _a;
                        return __generator(this, function (_b) {
                            result = {};
                            handtekening = '';
                            extension = '';
                            sql = '';
                            msg = '';
                            //
                            try {
                                if (!fs.existsSync(config_1.Config.appDir + "/handtekening")) {
                                    fs.mkdirSync(config_1.Config.appDir + "/handtekening");
                                }
                            }
                            catch (error) {
                                logger_1.Logger.error(req, error);
                            }
                            //
                            if (!req.files || Object.keys(req.files).length == 0) {
                                msg += ('<p>Geen bestand gekozen ...</p>');
                                resolve(msg);
                            }
                            importfile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.userfile;
                            extension = importfile.name.split('.').pop();
                            switch (extension.toLowerCase()) {
                                case "jpg":
                                    break;
                                case "png":
                                    break;
                                default:
                                    msg += importfile.name + ' is geen handtekening (jpg/png) ...<br>';
                                    resolve(msg);
                            }
                            handtekening = config_1.Config.appDir + "/handtekening/" + gebruiker + '.' + extension;
                            msg += "<p>Importeren " + handtekening + " ...<br>";
                            importfile.mv(config_1.Config.appDir + "/handtekening/" + gebruiker + '.' + extension, function (err) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (err) {
                                                msg += ('<p>Fout ' + importfile.name + ' in bestand ... </p>');
                                                resolve(msg);
                                            }
                                            handtekening = "./handtekening/" + gebruiker + '.' + extension;
                                            sql = "\nupdate gebruiker set \nhandtekening = '" + handtekening + "'\nwhere gebruiker = '" + gebruiker + "'";
                                            return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                                        case 1:
                                            _a.sent();
                                            resolve(msg);
                                            return [2 /*return*/];
                                    }
                                });
                            }); });
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    //
    // Leverancier
    //
    Upload.prototype.loadExactLeverancier = function (req, res, next, json) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, sql, tlupdate, thisArray, iAccount, account, leveranciernummer, naam, zoekcode, adres, woonplaats, postcode, telefoon, fax, email, categorie, contact, land;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        sql = '';
                        tlupdate = 0;
                        thisArray = json.Account;
                        if (!thisArray) return [3 /*break*/, 5];
                        iAccount = 0;
                        _a.label = 1;
                    case 1:
                        if (!(iAccount < thisArray.length)) return [3 /*break*/, 5];
                        account = thisArray[iAccount];
                        if (!(Number(this.getField(account, 'IsSupplier')) == 1)) return [3 /*break*/, 4];
                        leveranciernummer = this.getField(account, '$', 'code');
                        naam = this.getField(account, 'Name');
                        zoekcode = this.getField(account, '$', 'searchcode');
                        adres = this.getField(account, 'Address', 'AddressLine1');
                        woonplaats = this.getField(account, 'Address', 'City');
                        postcode = this.getField(account, 'Address', 'PostalCode');
                        telefoon = this.getField(account, 'Phone');
                        fax = this.getField(account, 'Fax');
                        email = this.getField(account, 'Email');
                        categorie = this.getField(account, '$', 'status');
                        contact = this.getField(account, 'Contact', 'FirstName');
                        land = this.getField(account, 'Address', 'Country', '$', 'code');
                        //
                        sql = "\ninsert into LEVERANCIER \n(leveranciernummer)\nselect '" + leveranciernummer + "' \nfrom DUAL\nwhere not exists (\nselect 1 from LEVERANCIER \nwhere leveranciernummer =  '" + leveranciernummer + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _a.sent();
                        sql = "\nupdate LEVERANCIER set \nnaam = '" + naam + "',\nzoekcode = '" + zoekcode + "',\nadres = '" + adres + "',\nwoonplaats = '" + woonplaats + "',\npostcode = '" + postcode + "',\ntelefoon = '" + telefoon + "',\nfax = '" + fax + "',\nemail = '" + email + "',\ncategorie = '" + categorie + "',\ncontact = '" + contact + "',\nland = '" + land + "'\nwhere leveranciernummer =  '" + leveranciernummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _a.sent();
                        tlupdate++;
                        _a.label = 4;
                    case 4:
                        iAccount++;
                        return [3 /*break*/, 1];
                    case 5:
                        msg += tlupdate + ' leverancierregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Klant
    //
    Upload.prototype.loadExactKlant = function (req, res, next, json) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, sql, thisArray, iAccount, account, klantnummer, naam, zoekcode, adres, woonplaats, postcode, telefoon, fax, email, categorie, contact, land;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        sql = '';
                        thisArray = json.Account;
                        if (!thisArray) return [3 /*break*/, 5];
                        iAccount = 0;
                        _a.label = 1;
                    case 1:
                        if (!(iAccount < thisArray.length)) return [3 /*break*/, 5];
                        account = thisArray[iAccount];
                        if (!(Number(this.getField(account, 'IsPurchase')) == 1)) return [3 /*break*/, 4];
                        klantnummer = this.getField(account, '$', 'code');
                        naam = this.getField(account, 'Name');
                        zoekcode = this.getField(account, '$', 'searchcode');
                        adres = this.getField(account, 'Address', 'AddressLine1');
                        woonplaats = this.getField(account, 'Address', 'City');
                        postcode = this.getField(account, 'Address', 'PostalCode');
                        telefoon = this.getField(account, 'Phone');
                        fax = this.getField(account, 'Fax');
                        email = this.getField(account, 'Email');
                        categorie = this.getField(account, '$', 'status');
                        contact = this.getField(account, 'Contact', 'FirstName');
                        land = this.getField(account, 'Address', 'Country', '$', 'code');
                        sql = "\ninsert into KLANT \n(klantnummer)\nselect '" + klantnummer + "' \nfrom DUAL\nwhere not exists (\nselect 1 from KLANT \nwhere klantnummer =  '" + klantnummer + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _a.sent();
                        sql = "\nupdate KLANT set \nnaam = '" + naam + "',\nzoekcode = '" + zoekcode + "',\nadres = '" + adres + "',\nwoonplaats = '" + woonplaats + "',\npostcode = '" + postcode + "',\ntelefoon = '" + telefoon + "',\nfax = '" + fax + "',\nemail = '" + email + "',\ncategorie = '" + categorie + "',\ncontact = '" + contact + "',\nland = '" + land + "'\nwhere klantnummer =  '" + klantnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _a.sent();
                        tlupdate++;
                        _a.label = 4;
                    case 4:
                        iAccount++;
                        return [3 /*break*/, 1];
                    case 5:
                        msg += tlupdate + ' klantregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Product
    //
    Upload.prototype.loadExactProduct = function (req, res, next, json) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, sql, thisArray, iRow, ITEM, productnummer, productnaam, maak, lijn, locatie, thisClass, code, iCat, CAT, iIw, IW, ink, inkgemiddeld, leverancierproductnummer, iAcc, ACC, iAccItem, ACCITEM;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        sql = '';
                        thisArray = json.Item;
                        if (!thisArray) return [3 /*break*/, 8];
                        //
                        sql = "\nupdate PRODUCT set soort = 'DEL'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        _a.sent();
                        iRow = 0;
                        _a.label = 2;
                    case 2:
                        if (!(iRow < thisArray.length)) return [3 /*break*/, 6];
                        ITEM = thisArray[iRow];
                        productnummer = this.getField(ITEM, '$', 'code');
                        productnaam = this.getField(ITEM, 'Description');
                        maak = this.getField(ITEM, 'IsMakeItem');
                        lijn = '';
                        locatie = '';
                        thisClass = '';
                        code = '';
                        if (ITEM.ItemCategory) {
                            for (iCat = 0; iCat < ITEM.ItemCategory.length; iCat++) {
                                CAT = ITEM.ItemCategory[iCat];
                                thisClass = this.getField(CAT, '$', 'class');
                                code = this.getField(CAT, '$', 'code');
                                ;
                                if (thisClass == 'productielijn' || thisClass == 'Productielijn') {
                                    lijn = code;
                                }
                            }
                        }
                        if (lijn == '0.000') {
                            lijn = '';
                        }
                        if (ITEM.ItemWarehouses) {
                            for (iIw = 0; iIw < ITEM.ItemWarehouses.length; iIw++) {
                                IW = ITEM.ItemWarehouses[iIw];
                                locatie = this.getField(IW, 'ItemWarehouse', 'StorageLocation', '$', 'code');
                            }
                        }
                        ink = 0;
                        inkgemiddeld = 0;
                        leverancierproductnummer = '';
                        if (ITEM.ItemAccounts) {
                            for (iAcc = 0; iAcc < ITEM.ItemAccounts.length; iAcc++) {
                                ACC = ITEM.ItemAccounts[iAcc];
                                if (ACC.ItemAccount) {
                                    for (iAccItem = 0; iAccItem < ACC.ItemAccount.length; iAccItem++) {
                                        ACCITEM = ACC.ItemAccount[iAccItem];
                                        inkgemiddeld = Number(this.getField(ACCITEM, 'Purchase', 'Price', 'Value'));
                                        leverancierproductnummer = this.getField(ACCITEM, 'SupplierItemCode');
                                    }
                                }
                            }
                        }
                        sql = "\ninsert into PRODUCT \n(productnummer,productnaam)\nselect \n'" + productnummer + "',\n'" + productnaam + "'\nfrom DUAL\nwhere not exists (\nselect 1 from PRODUCT \nwhere productnummer ='" + productnummer + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _a.sent();
                        sql = "\nupdate PRODUCT set\nproductnaam = '" + productnaam + "',\nlijn = '" + lijn + "',\nlocatie = '" + locatie + "',\ninkoopprijs = '" + ink + "',\ninkoopprijsgemiddeld = '" + inkgemiddeld + "',\nleverancierproductnummer = '" + leverancierproductnummer + "',\nsoort = '" + maak + "'\nwhere productnummer ='" + productnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        _a.sent();
                        //
                        tlupdate++;
                        _a.label = 5;
                    case 5:
                        iRow++;
                        return [3 /*break*/, 2];
                    case 6:
                        //
                        sql = "\ndelete from PRODUCT \nwhere soort = 'DEL'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        msg += tlupdate + ' productregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Stuklijst
    //
    Upload.prototype.loadExactStuklijst = function (req, res, next, json) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, sql, thisArray, iBom, BOM, productnummer, productnaam, faktor, value, iDet, DET, onderdeelnummer, onderdeelnaam, detfaktor;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        sql = '';
                        thisArray = json.ManufacturedBillofMaterial;
                        if (!thisArray) return [3 /*break*/, 9];
                        sql = "\ndelete from ONDERDEEL";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        _a.sent();
                        iBom = 0;
                        _a.label = 2;
                    case 2:
                        if (!(iBom < thisArray.length)) return [3 /*break*/, 9];
                        BOM = thisArray[iBom];
                        productnummer = this.getField(BOM, 'Item', '$', 'code');
                        productnaam = this.getField(BOM, 'Item', 'Description');
                        faktor = Number(this.getField(BOM, 'BatchQuantity'));
                        value = undefined;
                        if (BOM.ManufacturedBillofMaterialItemDetails) {
                            if (BOM.ManufacturedBillofMaterialItemDetails[0]) {
                                if (BOM.ManufacturedBillofMaterialItemDetails[0].ManufacturedBillofMaterialItemDetail) {
                                    value = BOM.ManufacturedBillofMaterialItemDetails[0].ManufacturedBillofMaterialItemDetail;
                                }
                            }
                        }
                        if (!value) return [3 /*break*/, 8];
                        iDet = 0;
                        _a.label = 3;
                    case 3:
                        if (!(iDet < value.length)) return [3 /*break*/, 8];
                        DET = value[iDet];
                        onderdeelnummer = this.getField(DET, 'Item', '$', 'code');
                        onderdeelnaam = this.getField(DET, 'Description');
                        detfaktor = Number(this.getField(DET, 'Quantity'));
                        if (faktor == 0) {
                            detfaktor = 0;
                        }
                        else {
                            detfaktor = detfaktor / faktor;
                        }
                        if (!((onderdeelnummer != '????') && (onderdeelnummer != productnummer))) return [3 /*break*/, 6];
                        sql = "\ninsert into ONDERDEEL \n(productnummer,onderdeelnummer)\nselect \n'" + productnummer + "',\n'" + onderdeelnummer + "'\nfrom DUAL\nwhere not exists (\nselect 1 from ONDERDEEL \nwhere productnummer = '" + productnummer + "'\nand onderdeelnummer = '" + onderdeelnummer + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        _a.sent();
                        sql = "\nupdate ONDERDEEL set \nfaktor = '" + detfaktor + "'\nwhere productnummer = '" + productnummer + "'\nand onderdeelnummer = '" + onderdeelnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        //
                        tlupdate++;
                        _a.label = 7;
                    case 7:
                        iDet++;
                        return [3 /*break*/, 3];
                    case 8:
                        iBom++;
                        return [3 /*break*/, 2];
                    case 9:
                        msg += tlupdate + ' stuklijstregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Leverancierproduct
    //
    Upload.prototype.loadExactLeverancierproduct = function (req, res, next, json) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, sql, rowsleverancier, rowleverancier, rowsproduct, rowproduct, thisArray, iBestel, BESTEL, leveranciernummer, iLine, LINE, productnummer, leverancierproductnummer, swimport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        sql = '';
                        thisArray = json.PurchaseOrder;
                        if (!thisArray) return [3 /*break*/, 10];
                        iBestel = 0;
                        _a.label = 1;
                    case 1:
                        if (!(iBestel < thisArray.length)) return [3 /*break*/, 10];
                        BESTEL = thisArray[iBestel];
                        leveranciernummer = this.getField(BESTEL, 'Supplier', '$', 'code');
                        if (!BESTEL.PurchaseOrderLine) return [3 /*break*/, 9];
                        iLine = 0;
                        _a.label = 2;
                    case 2:
                        if (!(iLine < BESTEL.PurchaseOrderLine.length)) return [3 /*break*/, 8];
                        LINE = BESTEL.PurchaseOrderLine[iLine];
                        productnummer = this.getField(LINE, 'Item', '$', 'code');
                        leverancierproductnummer = this.getField(LINE, 'SupplierItemCode');
                        swimport = 1;
                        if (leveranciernummer == '') {
                            swimport = 0;
                        }
                        if (productnummer == '????') {
                            swimport = 0;
                        }
                        if (!(swimport == 1)) return [3 /*break*/, 5];
                        sql = "\nselect * from  LEVERANCIER \nwhere leveranciernummer = '" + leveranciernummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        rowsleverancier = _a.sent();
                        if (!rowsleverancier[0]) {
                            msg += "Leverancier " + leveranciernummer + " onbekend<br>";
                        }
                        sql = "\nselect * from  PRODUCT \nwhere productnummer = '" + productnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        rowsproduct = _a.sent();
                        if (!rowsproduct[0])
                            msg += "Product " + productnummer + " onbekend<br>";
                        _a.label = 5;
                    case 5:
                        sql = "\nupdate PRODUCT set \nleveranciernummer = '" + leveranciernummer + "',\nleverancierproductnummer = '" + leverancierproductnummer + "'\nwhere productnummer = '" + productnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        iLine++;
                        return [3 /*break*/, 2];
                    case 8:
                        tlupdate++;
                        _a.label = 9;
                    case 9:
                        iBestel++;
                        return [3 /*break*/, 1];
                    case 10:
                        msg += tlupdate + ' leverancierproductregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Voorraad
    //
    Upload.prototype.loadExactVoorraad = function (req, res, next, json, datum) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, sql, thisArray, iStock, Stock, productnummer, productnaam, voorraad;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        sql = '';
                        thisArray = json.StockPosition;
                        if (!thisArray) return [3 /*break*/, 8];
                        sql = "\nupdate PRODUCT set \nvoorraad = 0, \nvoorraaddatumtijd = screendate2date('" + datum + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        _a.sent();
                        iStock = 0;
                        _a.label = 2;
                    case 2:
                        if (!(iStock < thisArray.length)) return [3 /*break*/, 5];
                        Stock = thisArray[iStock];
                        productnummer = this.getField(Stock, 'Item', '$', 'code');
                        productnaam = this.getField(Stock, 'Item', 'Description');
                        voorraad = Number(this.getField(Stock, 'CurrentQuantity'));
                        //
                        sql = "\nupdate PRODUCT set";
                        if (productnaam != '') {
                            sql += "\nproductnaam = '" + productnaam + "',";
                        }
                        //
                        sql += "\nvoorraad = '" + voorraad + "',\nvoorraaddatumtijd = screendate2date('" + datum + "')\nwhere productnummer = '" + productnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _a.sent();
                        //
                        tlupdate++;
                        _a.label = 4;
                    case 4:
                        iStock++;
                        return [3 /*break*/, 2];
                    case 5:
                        //
                        sql = "\nupdate PRODUCT set \nlijn = null \nwhere lijn in ('0.00','')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        _a.sent();
                        //
                        // productlijn bijwerken
                        //
                        sql = "\ninsert into PRODUCTLIJN \n(productlijn)\nselect distinct lijn as productlijn\nfrom PRODUCT\nhaving  productlijn is not null\nand not exists (\nselect 1 from PRODUCTLIJN \nwhere productlijn = PRODUCTLIJN.productlijn)";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8:
                        msg += tlupdate + ' voorraadregels ingelezen ...<br>';
                        if (tlupdate > 0) {
                            msg += ' en productlijn bijgewerkt ...<br>';
                        }
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Bestelling
    //
    Upload.prototype.loadExactBestelling = function (req, res, next, json) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, sql, rowsleverancier, rowleverancier, rowsproduct, rowproduct, rowsbestelling, rowbestelling, thisArray, iBestel, BESTEL, leveranciernummer, leveranciernaam, bestelnummer, datum, leverdatum, startdatum, iLine, LINE, regelnummer, productnummer, bestelling, leverancierproductnummer, regelleverdatum, swimport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        sql = '';
                        thisArray = json.PurchaseOrder;
                        if (!thisArray) return [3 /*break*/, 15];
                        sql = "\nupdate BESTELLING set \nstatus = 'OLD'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        _a.sent();
                        iBestel = 0;
                        _a.label = 2;
                    case 2:
                        if (!(iBestel < thisArray.length)) return [3 /*break*/, 13];
                        BESTEL = thisArray[iBestel];
                        leveranciernummer = this.getField(BESTEL, 'Supplier', '$', 'code');
                        leveranciernaam = this.getField(BESTEL, 'Supplier', 'Name');
                        bestelnummer = this.getField(BESTEL, '$', 'ordernumber');
                        datum = this.getDate(this.getField(BESTEL, 'OrderDate'));
                        leverdatum = this.getDate(this.getField(BESTEL, 'ReceiptDate'));
                        startdatum = this.getNow();
                        if (!BESTEL.PurchaseOrderLine) return [3 /*break*/, 12];
                        iLine = 0;
                        _a.label = 3;
                    case 3:
                        if (!(iLine < BESTEL.PurchaseOrderLine.length)) return [3 /*break*/, 12];
                        LINE = BESTEL.PurchaseOrderLine[iLine];
                        regelnummer = this.getField(LINE, '$', 'line');
                        productnummer = this.getField(LINE, 'Item', '$', 'code');
                        bestelling = Number(this.getField(LINE, 'Quantity'));
                        leverancierproductnummer = this.getField(LINE, 'SupplierItemCode');
                        regelleverdatum = this.getDate(this.getField(LINE, 'ReceiptDate'));
                        swimport = 1;
                        if (leveranciernummer == '') {
                            swimport = 0;
                        }
                        if (productnummer == '????') {
                            swimport = 0;
                        }
                        if (!(swimport == 1)) return [3 /*break*/, 11];
                        sql = "\nselect * \nfrom LEVERANCIER \nwhere leveranciernummer = '" + leveranciernummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        rowsleverancier = _a.sent();
                        if (!rowsleverancier[0]) {
                            msg += "Leverancier " + leveranciernummer + " onbekend<br>";
                        }
                        sql = "\nselect * \nfrom PRODUCT \nwhere productnummer = '" + productnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        rowsproduct = _a.sent();
                        if (!rowsproduct[0]) {
                            msg += "Product " + productnummer + " onbekend<br>";
                        }
                        if (!(bestelling != 0)) return [3 /*break*/, 11];
                        sql = "\nselect * from BESTELLING\nwhere status = 'OLD'\nand bestelnummer = '" + bestelnummer + "'\nand productnummer = '" + productnummer + "'\nand regelnummer = '" + regelnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        rowsbestelling = _a.sent();
                        if (!!rowsbestelling[0]) return [3 /*break*/, 8];
                        sql = "\ninsert into BESTELLING \n(status,bestelling,startdatumtijd,besteldatumtijd,\nproductnummer,leveranciernummer,leveranciernaam,bestelnummer,regelnummer)\nselect  \n'NEW',\n'" + bestelling + "',\nscreendate2date('" + startdatum + "'),\nscreendate2date('" + regelleverdatum + "'),\n'" + productnummer + "',\n'" + leveranciernummer + "',\n'" + leveranciernaam + "',\n'" + bestelnummer + "',\n'" + regelnummer + "'\nfrom DUAL";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 10];
                    case 8:
                        sql = "\nupdate BESTELLING set\nstatus = 'NEW',\nbestelling = '" + bestelling + "',\nleveranciernummer = '" + leveranciernummer + "',\nleveranciernaam = '" + leveranciernaam + "',\nregelnummer = '" + regelnummer + "',\nbesteldatumtijd = screendate2date('" + regelleverdatum + "')\nwhere id = '" + rowsbestelling[0].ID + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 9:
                        _a.sent();
                        _a.label = 10;
                    case 10:
                        tlupdate++;
                        _a.label = 11;
                    case 11:
                        iLine++;
                        return [3 /*break*/, 3];
                    case 12:
                        iBestel++;
                        return [3 /*break*/, 2];
                    case 13:
                        // Ak: Geprint bijwerken ...
                        sql = "\ndelete from BESTELLING \nwhere status = 'OLD'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 14:
                        _a.sent();
                        _a.label = 15;
                    case 15:
                        msg += tlupdate + ' bestellingregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Ontvangsten op bestellingen
    //
    Upload.prototype.loadExactReceipt = function (req, res, next, json) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, sql, thisArray, iReceipt, RECEIPT, iLine, LINE, bestelnummer, regelnummer, aantal, productnummer, swfound;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        sql = '';
                        thisArray = json.Receipt;
                        if (!thisArray) return [3 /*break*/, 6];
                        iReceipt = 0;
                        _a.label = 1;
                    case 1:
                        if (!(iReceipt < thisArray.length)) return [3 /*break*/, 6];
                        RECEIPT = thisArray[iReceipt];
                        if (!RECEIPT.ReceiptLine) return [3 /*break*/, 5];
                        iLine = 0;
                        _a.label = 2;
                    case 2:
                        if (!(iLine < RECEIPT.ReceiptLine.length)) return [3 /*break*/, 5];
                        LINE = RECEIPT.ReceiptLine[iLine];
                        bestelnummer = this.getField(LINE, '$', 'PurchaseOrderNumber');
                        regelnummer = this.getField(LINE, '$', 'PurchaseOrderLine');
                        aantal = Number(this.getField(LINE, '$', 'Quantity'));
                        productnummer = this.getField(LINE, 'Item', '$', 'code');
                        swfound = 0;
                        if (!(bestelnummer != '')) return [3 /*break*/, 4];
                        sql = "\nupdate BESTELLING set\nbestelling = bestelling - " + aantal + "\nwhere bestelnummer = '" + bestelnummer + "'\nand   regelnummer = '" + regelnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _a.sent();
                        tlupdate++;
                        _a.label = 4;
                    case 4:
                        iLine++;
                        return [3 /*break*/, 2];
                    case 5:
                        iReceipt++;
                        return [3 /*break*/, 1];
                    case 6:
                        msg = tlupdate + ' ontvangst ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Orders
    //
    Upload.prototype.loadExactProductvraag = function (req, res, next, json) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, sql, rowsproductvraag, rowproductvraag, thisArray, iOrder, ORDER, datum, klantnaam, klantnummer, ordernummer, orderreferentie, orderdatum, iLine, LINE, regelnummer, productnummer, aantal, datum_1, swfound, vraagdatum;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        sql = '';
                        thisArray = json.SalesOrder;
                        if (!thisArray) return [3 /*break*/, 18];
                        sql = "\nupdate VRAAG set \neinddatumtijd = sysdate(),\nvraagdatumtijd = null";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 1:
                        _a.sent();
                        sql = "\nupdate PRODUCTVRAAG set \neinddatumtijd = sysdate(), \nvraagdatumtijd = null, \nacceptdatumtijd = null";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _a.sent();
                        iOrder = 0;
                        _a.label = 3;
                    case 3:
                        if (!(iOrder < thisArray.length)) return [3 /*break*/, 15];
                        ORDER = thisArray[iOrder];
                        datum = this.getDate(this.getField(ORDER, 'DeliveryDate'));
                        klantnaam = this.getField(ORDER, 'OrderedBy', 'Name');
                        klantnummer = this.getField(ORDER, 'OrderedBy', '$', 'code');
                        ordernummer = this.getField(ORDER, '$', 'salesordernumber');
                        orderreferentie = this.getField(ORDER, 'YourRef');
                        orderdatum = this.getDate(this.getField(ORDER, 'OrderDate'));
                        if (!ORDER.SalesOrderLine) return [3 /*break*/, 14];
                        iLine = 0;
                        _a.label = 4;
                    case 4:
                        if (!(iLine < ORDER.SalesOrderLine.length)) return [3 /*break*/, 13];
                        LINE = ORDER.SalesOrderLine[iLine];
                        regelnummer = this.getField(LINE, '$', 'line');
                        productnummer = this.getField(LINE, 'Item', '$', 'code');
                        aantal = Number(this.getField(LINE, 'Quantity'));
                        datum_1 = this.getDate(this.getField(LINE, 'DeliveryDate'));
                        swfound = 0;
                        if (!(ordernummer != '')) return [3 /*break*/, 12];
                        sql = "\nselect * from PRODUCTVRAAG\nwhere ordernummer = '" + ordernummer + "'\nand regelnummer = '" + regelnummer + "'\nand einddatumtijd is not null";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        rowsproductvraag = _a.sent();
                        if (rowsproductvraag[0]) {
                            swfound = 1;
                        }
                        vraagdatum = this.get44Vraagdatum(datum_1);
                        if (!(swfound == 0)) return [3 /*break*/, 7];
                        sql = "\ninsert into PRODUCTVRAAG (\nvraag,initvraagdatumtijd,vraagdatumtijd,\nproductnummer,klantnummer,klantnaam, ordernummer, regelnummer, \norderreferentie, orderdatumtijd)\nselect\n'" + aantal + "',\nscreendate2date('" + datum_1 + "'),\nscreendate2date('" + vraagdatum + "'),\n'" + productnummer + "',\n'" + klantnummer + "',\n'" + klantnaam + "',\n'" + ordernummer + "',\n'" + regelnummer + "',\n'" + orderreferentie + "',\nscreendate2date('" + orderdatum + "')\nfrom DUAL";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 6:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        sql = "\nupdate PRODUCTVRAAG set\neinddatumtijd = null,\nproductnummer = '" + productnummer + " ',\ninitvraagdatumtijd = screendate2date('" + datum_1 + "'),\nVraagdatumtijd = screendate2date('" + vraagdatum + "'),\nVraag = '" + aantal + "',\nklantnummer = '" + klantnummer + "',\nklantnaam = '" + klantnaam + "',\nordernummer = '" + ordernummer + "',\nregelnummer = '" + regelnummer + "',\norderreferentie = '" + orderreferentie + "',\norderdatumtijd = screendate2date('" + orderdatum + "')\nwhere id = '" + rowsproductvraag[0].ID + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 8:
                        _a.sent();
                        _a.label = 9;
                    case 9:
                        if (!(ordernummer != '')) return [3 /*break*/, 12];
                        sql = "\ninsert into VRAAG \n(initvraagdatumtijd,vraagdatumtijd,klantnummer,klantnaam, \nordernummer, orderreferentie)\nselect \nscreendate2date('" + datum_1 + "'),\nscreendate2date('" + vraagdatum + "'),\n'" + klantnummer + "',\n'" + klantnaam + "',\n'" + ordernummer + "',\n'" + orderreferentie + "'\nfrom DUAL\nwhere not exists (\nselect 1 from VRAAG \nwhere ordernummer = '" + ordernummer + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 10:
                        _a.sent();
                        sql = "\nupdate VRAAG set \nvraagdatumtijd = screendate2date('" + vraagdatum + "'),\neinddatumtijd = null\nwhere ordernummer = '" + ordernummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 11:
                        _a.sent();
                        _a.label = 12;
                    case 12:
                        iLine++;
                        return [3 /*break*/, 4];
                    case 13:
                        tlupdate++;
                        _a.label = 14;
                    case 14:
                        iOrder++;
                        return [3 /*break*/, 3];
                    case 15:
                        //
                        sql = "\ndelete from VRAAG \nwhere einddatumtijd is not null";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 16:
                        _a.sent();
                        sql = "\ndelete from PRODUCTVRAAG \nwhere einddatumtijd is not null";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 17:
                        _a.sent();
                        _a.label = 18;
                    case 18:
                        msg = tlupdate + ' orderregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Uitleveringen van orders
    //
    Upload.prototype.loadExactDelivery = function (req, res, next, json) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, thisArray, sql, iDelivery, DELIVERY, iLine, LINE, ordernummer, regelnummer, aantal, productnummer, swfound;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        thisArray = json.Delivery;
                        sql = '';
                        if (!thisArray) return [3 /*break*/, 7];
                        iDelivery = 0;
                        _a.label = 1;
                    case 1:
                        if (!(iDelivery < thisArray.length)) return [3 /*break*/, 7];
                        DELIVERY = thisArray[iDelivery];
                        if (!DELIVERY.DeliveryLine) return [3 /*break*/, 6];
                        iLine = 0;
                        _a.label = 2;
                    case 2:
                        if (!(iLine < DELIVERY.DeliveryLine.length)) return [3 /*break*/, 5];
                        LINE = DELIVERY.DeliveryLine[iLine];
                        ordernummer = this.getField(LINE, '$', 'SalesOrderNumber');
                        regelnummer = this.getField(LINE, '$', 'SalesOrderLine');
                        aantal = Number(this.getField(LINE, '$', 'Quantity'));
                        productnummer = this.getField(LINE, 'Item', '$', 'code');
                        swfound = 0;
                        if (!(ordernummer != '')) return [3 /*break*/, 4];
                        sql = "\nupdate PRODUCTVRAAG set\nVraag = Vraag - " + aantal + "\nwhere ordernummer = '" + ordernummer + "'\nand  regelnummer = '" + regelnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        iLine++;
                        return [3 /*break*/, 2];
                    case 5:
                        tlupdate++;
                        _a.label = 6;
                    case 6:
                        iDelivery++;
                        return [3 /*break*/, 1];
                    case 7:
                        msg = tlupdate + ' orderafleveringregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Bewerkingen
    //
    Upload.prototype.loadExactBewerking = function (req, res, next, json, datum) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, tlupdate, sql, rows, row, rowsdubbel, rowdubbel, rowsopen, rowopen, thisDate, adviesdagen, _a, thisArray, iDubbel, iOrder, SHO, bewerkingsnummer, productnummer, aantal, entrydate, datum_2, plandatum, adviesdatum, tlopen, iOpen;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        msg = '';
                        tlupdate = 0;
                        sql = '';
                        thisDate = '';
                        _a = Number;
                        return [4 /*yield*/, util_1.Util.waitParam(req, res, next, "ADVIESDAGEN")];
                    case 1:
                        adviesdagen = _a.apply(void 0, [_b.sent()]);
                        thisArray = json.ShopOrder;
                        if (!thisArray) return [3 /*break*/, 22];
                        sql = "\nupdate BEWERKING set \nstatus = 'OLD' \nwhere ifnull(status,'') != 'OLD'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _b.sent();
                        //
                        // dubbele regels verwijderen
                        //
                        sql = "\nupdate BEWERKING set \nbewerkingsnummer = trim(bewerkingsnummer) \nwhere bewerkingsnummer != trim(bewerkingsnummer)";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 3:
                        _b.sent();
                        sql = "\nselect max(id) as id \nfrom BEWERKING \ngroup by trim(bewerkingsnummer) \nhaving count(*) > 1";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 4:
                        rowsdubbel = _b.sent();
                        //
                        // Alle bewerkingen zijn gereed tot het tegendeel bewezen is
                        //
                        sql = "\nupdate BEWERKING \nset einddatumtijd = now()\nwhere (einddatumtijd is null \nor DATE_FORMAT(einddatumtijd,'%Y') = '0000')\nand exists (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer)";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        _b.sent();
                        iDubbel = 0;
                        _b.label = 6;
                    case 6:
                        if (!(iDubbel < rowsdubbel.length)) return [3 /*break*/, 9];
                        rowdubbel = rowsdubbel[iDubbel];
                        sql = "\ndelete from BEWERKING \nwhere id = '" + rowdubbel.ID + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 7:
                        _b.sent();
                        _b.label = 8;
                    case 8:
                        iDubbel++;
                        return [3 /*break*/, 6];
                    case 9:
                        iOrder = 0;
                        _b.label = 10;
                    case 10:
                        if (!(iOrder < thisArray.length)) return [3 /*break*/, 17];
                        SHO = thisArray[iOrder];
                        bewerkingsnummer = this.getField(SHO, '$', 'number');
                        productnummer = this.getField(SHO, 'Item', '$', 'code');
                        aantal = Number(this.getField(SHO, 'PlannedQuantity'));
                        entrydate = this.getDate(this.getField(SHO, 'EntryDate'));
                        datum_2 = this.getDate(this.getField(SHO, 'PlannedStartDate'));
                        plandatum = this.getDate(this.getField(SHO, 'PlannedDate'));
                        adviesdatum = this.getDate(this.getField(SHO, 'PlannedDate'));
                        if (!(adviesdagen > 0)) return [3 /*break*/, 12];
                        thisDate = adviesdatum;
                        sql = "\nselect\ndate2screendate(\ndate_sub(\nscreendate2date('" + thisDate + "'), \ninterval " + adviesdagen + " day))\nas adviesdatum\nfrom dual";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 11:
                        rows = _b.sent();
                        adviesdatum = rows[0].ADVIESDATUM;
                        _b.label = 12;
                    case 12:
                        // Initstartdatum wordt door Import bepaald
                        // Startdatumtijd wordt door AK2 bepaald, initieel door Import
                        // Plandatumtijd wordt door AK2 bepaald, initieel door Import
                        // Exactplandatumtijd = PlannedDate
                        // Adviesdatum = PlannedDate - param.adviesdagen
                        sql = "\ninsert into BEWERKING (bewerkingsnummer,productnummer,\ninitstartdatumtijd,startdatumtijd,plandatumtijd,\nstartaantal)\nselect \n'" + bewerkingsnummer + "',\n'" + productnummer + "',\nscreendate2date('" + entrydate + "'),\nscreendate2date('" + datum_2 + "'),\nscreendate2date('" + adviesdatum + "'),\n'" + aantal + "'\nfrom DUAL\nwhere not exists (\nselect 1 from BEWERKING \nwhere bewerkingsnummer = '" + bewerkingsnummer + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 13:
                        _b.sent();
                        sql = "\nupdate BEWERKING set\nProductieaantal = '" + aantal + "',\nStartdatumtijd = screendate2date('" + datum_2 + "'),\nExactplandatumtijd = screendate2date('" + plandatum + "'),\nAdviesplandatumtijd = screendate2date('" + adviesdatum + "'),\nEinddatumtijd = null,\nstatus = 'NEW'\nwhere bewerkingsnummer = '" + bewerkingsnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 14:
                        _b.sent();
                        sql = "\nupdate BEWERKING set\nInitStartdatumtijd = screendate2date('" + entrydate + "')\nwhere bewerkingsnummer = '" + bewerkingsnummer + "'\nand InitStartdatumtijd is null";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 15:
                        _b.sent();
                        //
                        tlupdate++;
                        _b.label = 16;
                    case 16:
                        iOrder++;
                        return [3 /*break*/, 10];
                    case 17:
                        tlopen = 0;
                        sql = "\nselect *,\ndate2screendate(initstartdatumtijd) as INITDATUM,\n(select max(Bewerkingaantal) from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) \nas AANTALOPEN\nfrom BEWERKING\nwhere einddatumtijd is not null\nand exists (\nselect 1 from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer \nand (BEWERKINGFLOW.einddatumtijd is null or DATE_FORMAT(BEWERKINGFLOW.einddatumtijd,'%Y') = '0000' ))";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 18:
                        rowsopen = _b.sent();
                        iOpen = 0;
                        _b.label = 19;
                    case 19:
                        if (!(iOpen < rowsopen.length)) return [3 /*break*/, 22];
                        rowopen = rowsopen[iOpen];
                        // Een logregel wegschrijven + productieaantal aanpassen
                        tlopen += 1;
                        sql = "\nupdate BEWERKING set\nproductieaantal =\n(select max(Bewerkingaantal) from BEWERKINGFLOW \nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer\nand (BEWERKINGFLOW.einddatumtijd is null or DATE_FORMAT(BEWERKINGFLOW.einddatumtijd,'%Y') = '0000' )),\nEinddatumtijd = null\nwhere id = '" + rowopen.ID + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 20:
                        _b.sent();
                        msg += String(tlopen)
                            + ' Bewerking: '
                            + rowopen.BEWERKINGSNUMMER
                            + '  '
                            + rowopen.INITDATUM
                            + ' '
                            + rowopen.PRODUCTNUMMER
                            + ' is gereed in Exact, maar is nog niet gereed in AK2 (Aantal open: '
                            + rowopen.AANTALOPEN
                            + ') ...<br>';
                        _b.label = 21;
                    case 21:
                        iOpen++;
                        return [3 /*break*/, 19];
                    case 22:
                        msg = tlupdate + ' bewerkingregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    //
    // Ontvangsten van bewerkingen die gereed of gedeeltelijk gereed zijn
    //
    Upload.prototype.loadExactBewerkingontvangst = function (req, res, next, json, datum) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, sql, tlupdate, thisArray, iHor, HOR, bewerkingsnummer, productnummer, aantal, datum_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        sql = '';
                        tlupdate = 0;
                        thisArray = json.ShopOrderStockReceipt;
                        if (!thisArray) return [3 /*break*/, 6];
                        iHor = 0;
                        _a.label = 1;
                    case 1:
                        if (!(iHor < thisArray.length)) return [3 /*break*/, 4];
                        HOR = thisArray[iHor];
                        bewerkingsnummer = this.getField(HOR, 'ShopOrderNumber');
                        productnummer = this.getField(HOR, 'ItemCode');
                        aantal = this.getField(HOR, 'Quantity');
                        if (Number(aantal) == 0) {
                            aantal = this.getField(HOR, 'SplitShopOrderStock', '$', 'Quantity');
                        }
                        if (Number(aantal) == 0) {
                            aantal = '0';
                        }
                        datum_3 = this.getDate(this.getField(HOR, 'TransactionDate'));
                        sql = "\nupdate BEWERKING set\nProductieaantal = Productieaantal - " + aantal + ",\nStartdatumtijd = screendate2date('" + datum_3 + "'),\nEinddatumtijd = null\nwhere bewerkingsnummer = '" + bewerkingsnummer + "'\nand status = 'NEW'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 2:
                        _a.sent();
                        tlupdate++;
                        _a.label = 3;
                    case 3:
                        iHor++;
                        return [3 /*break*/, 1];
                    case 4:
                        //
                        sql = "\nupdate BEWERKING set\nstatus = 'OLD'\nwhere ifnull(status,'') != 'OLD'";
                        return [4 /*yield*/, db_1.default.waitQuery(res.crudConnection, sql)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        msg = tlupdate + ' bewerkingontvangstregels ingelezen ...<br>';
                        return [2 /*return*/, msg];
                }
            });
        });
    };
    Upload.prototype.doQuery = function (req, res, next, options) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, msg, result, data, json, filename;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = db_1.default.fixQuery(req.query);
                        if (!query.datum) {
                            query.datum = '';
                        }
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        _a.crudConnection = _b.sent();
                        msg = '';
                        filename = '';
                        if (!(query.action == "get,exactleverancier")) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getJson('import/exactaccounts.dat')];
                    case 2:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactLeverancier(req, res, next, json)];
                    case 3:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 4:
                        if (!(query.action == "get,exactklant")) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.getJson('import/exactaccounts.dat')];
                    case 5:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactKlant(req, res, next, json)];
                    case 6:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 7:
                        if (!(query.action == "get,exactproduct")) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.getJson('import/exactitems.dat')];
                    case 8:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactProduct(req, res, next, json)];
                    case 9:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 10:
                        if (!(query.action == "get,exactstuklijst")) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.getJson('import/exactmbom.dat')];
                    case 11:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactStuklijst(req, res, next, json)];
                    case 12:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 13:
                        if (!(query.action == "get,exactleverancierproduct")) return [3 /*break*/, 16];
                        return [4 /*yield*/, this.getJson('import/exactpurchase.dat')];
                    case 14:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactLeverancierproduct(req, res, next, json)];
                    case 15:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 16:
                        if (!(query.action == "get,exactvoorraad")) return [3 /*break*/, 19];
                        return [4 /*yield*/, this.getJson('import/exactstock.dat')];
                    case 17:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactVoorraad(req, res, next, json, query.datum)];
                    case 18:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 19:
                        if (!(query.action == "get,exactbestelling")) return [3 /*break*/, 22];
                        return [4 /*yield*/, this.getJson('import/exactpurchase.dat')];
                    case 20:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactBestelling(req, res, next, json)];
                    case 21:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 22:
                        if (!(query.action == "get,exactreceipt")) return [3 /*break*/, 25];
                        return [4 /*yield*/, this.getJson('import/exactreceipt.dat')];
                    case 23:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactReceipt(req, res, next, json)];
                    case 24:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 25:
                        if (!(query.action == "get,exactorder")) return [3 /*break*/, 28];
                        return [4 /*yield*/, this.getJson('import/exactsales.dat')];
                    case 26:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactProductvraag(req, res, next, json)];
                    case 27:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 28:
                        if (!(query.action == "get,exactdelivery")) return [3 /*break*/, 31];
                        return [4 /*yield*/, this.getJson('import/exactdeliveries.dat')];
                    case 29:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactDelivery(req, res, next, json)];
                    case 30:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 31:
                        if (!(query.action == "get,exactbewerk")) return [3 /*break*/, 34];
                        return [4 /*yield*/, this.getJson('import/exactshoporders.dat')];
                    case 32:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactBewerking(req, res, next, json, query.datum)];
                    case 33:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 34:
                        if (!(query.action == "get,exactbewerkontvangst")) return [3 /*break*/, 37];
                        return [4 /*yield*/, this.getJson('import/exactshoporderreceipts.dat')];
                    case 35:
                        json = _b.sent();
                        return [4 /*yield*/, this.loadExactBewerkingontvangst(req, res, next, json, query.datum)];
                    case 36:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 37:
                        if (!(query.action == "get,handtekening")) return [3 /*break*/, 39];
                        return [4 /*yield*/, this.loadHandtekening(req, res, next, filename, query.gebruiker)];
                    case 38:
                        msg = _b.sent();
                        return [3 /*break*/, 40];
                    case 39:
                        msg = ('<p>Onbekende actie: ' + query.action + '... </p>');
                        _b.label = 40;
                    case 40:
                        //
                        result = {
                            items: [
                                {
                                    msg: msg
                                }
                            ]
                        };
                        res.crudConnection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Upload.prototype.routes = function (req, res, next) {
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
                    this.doQuery(req, res, next, this.dict);
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
    return Upload;
}(crud_1.Crud));
exports.Upload = Upload;
//# sourceMappingURL=upload.js.map