"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.Toolbox = void 0;
var db_1 = __importDefault(require("../db"));
var util_1 = require("../util");
var logger_1 = require("../logger");
var mailer_1 = require("../mailer");
var fs = __importStar(require("fs"));
var html_pdf_1 = __importDefault(require("html-pdf"));
var config_1 = require("../config");
var klok_1 = require("../klok");
var child = __importStar(require("child_process"));
var Toolbox = /** @class */ (function () {
    function Toolbox() {
        this.mailer = new mailer_1.Mailer();
        logger_1.Logger.info("Creating Toolbox");
    }
    Toolbox.prototype.getBewerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var bewerkingsnummer, sql, result, rows, row, msg, connection, reparatie, sqlrep, rowsrep;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bewerkingsnummer = req.query.bewerkingsnummer || req.body.bewerkingsnummer;
                        msg = '';
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        sql = "\n  select BEWERKING.*,\n  (select min(Productnaam) as PRODUCTNAAM from PRODUCT where PRODUCT.productnummer = BEWERKING.productnummer) as Productnaam,\n  (select sum(ifnull(uitval,0)) from BEWERKINGFLOW where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) as aantaluitval\n  from BEWERKING\n  where BEWERKING.bewerkingsnummer = '" + bewerkingsnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        if (!rows[0]) {
                            msg = 'Productienummer onbekend';
                            result = {
                                items: [
                                    {
                                        msg: msg,
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        BEWERKINGSNUMMER: "",
                                        PRODUCTIEAANTAL: "",
                                        STARTAANTAL: "",
                                        AANTALUITVAL: '',
                                        PRODUCTNUMMER: '',
                                        PRODUCTNAAM: '',
                                        OPMERKING: '',
                                        REPARATIE: '',
                                        EINDCONTROLENUMMER: ''
                                    }
                                ]
                            };
                            connection.release();
                            res.status(200).send(result);
                            return [2 /*return*/];
                        }
                        row = rows[0];
                        reparatie = '';
                        sqlrep = "\nselect NAAM \nfrom BEWERKINGSOORT \nwhere REPARATIE = '1' \norder by BEWERKINGSOORT";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sqlrep)];
                    case 3:
                        rowsrep = _a.sent();
                        if (rowsrep[0]) {
                            reparatie = rowsrep[0].NAAM;
                        }
                        result = {
                            items: [
                                {
                                    msg: msg,
                                    GEBRUIKER: req.ak2_user,
                                    GEBRUIKERNAAM: req.ak2_user,
                                    BEWERKINGSNUMMER: row.BEWERKINGSNUMMER,
                                    PRODUCTIEAANTAL: row.PRODUCTIEAANTAL,
                                    STARTAANTAL: row.STARTAANTAL,
                                    AANTALUITVAL: row.AANTALUITVAL,
                                    PRODUCTNUMMER: row.PRODUCTNUMMER,
                                    PRODUCTNAAM: row.PRODUCTNAAM,
                                    OPMERKING: row.OPMERKING,
                                    REPARATIE: reparatie,
                                    EINDCONTROLENUMMER: row.EINDCONTROLENUMMER
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
    Toolbox.prototype.getVraag = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ordernummer, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ordernummer = req.query.ordernummer || req.body.ordernummer;
                        sql = "\nselect \nifnull(ORDERNUMMER,'') as ORDERNUMMER,\nifnull(OPMERKING,'') as OPMERKING,\nifnull(OPMERKING2,'') as OPMERKING2\nFROM VRAAG\nWHERE ORDERNUMMER = '" + ordernummer + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {};
                        if (rows.length <= 0) {
                            result = {
                                items: [
                                    {
                                        msg: "Ordernummer onbekend",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        ORDERNUMMER: ordernummer,
                                        OPMERKING: "",
                                        OPMERKING2: ""
                                    }
                                ]
                            };
                        }
                        else {
                            result = {
                                items: [
                                    {
                                        msg: "",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        ORDERNUMMER: ordernummer,
                                        OPMERKING: rows[0].OPMERKING,
                                        OPMERKING2: rows[0].OPMERKING2
                                    }
                                ]
                            };
                        }
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getVraagProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var ordernummer, productnummer, id, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        ordernummer = "";
                        productnummer = "";
                        id = req.query.id || req.body.id;
                        try {
                            ordernummer = String(id).split("_")[0];
                            productnummer = String(id).split("_")[1];
                        }
                        catch (error) {
                        }
                        sql = "\nselect \nifnull(ORDERNUMMER,'') as ORDERNUMMER,\nifnull(OPMERKING,'') as OPMERKING\nFROM PRODUCTVRAAG\nWHERE ORDERNUMMER = '" + ordernummer + "'\nand PRODUCTNUMMER = '" + productnummer + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {};
                        if (rows.length <= 0) {
                            result = {
                                items: [
                                    {
                                        msg: "Orderproductnummer onbekend",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        ORDERNUMMER: ordernummer,
                                        ID: "",
                                        OPMERKING: ""
                                    }
                                ]
                            };
                        }
                        else {
                            result = {
                                items: [
                                    {
                                        msg: "",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        ID: rows[0].ORDERNUMMER + "_" + rows[0].PRODUCTNUMMER,
                                        OPMERKING: rows[0].OPMERKING
                                    }
                                ]
                            };
                        }
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getBewerkingflow = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var bewerkingflowid, connection, result, row, sql, rows;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        bewerkingflowid = req.query.bewerkingflowid || req.body.bewerkingflowid;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        sql = "\nselect \nBEWERKING.*,\nBEWERKINGFLOW.VOLGNUMMER,\n(select min(Productnaam) from PRODUCT where PRODUCT.productnummer = BEWERKING.productnummer) as Productnaam,\n(select min(naam) from BEWERKINGSOORT where BEWERKINGSOORT.bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) as Bewerkingsoortnaam,\n(select min(kleur) from BEWERKINGSOORT where BEWERKINGSOORT.Bewerkingsoort = BEWERKINGFLOW.bewerkingsoort) as kleur,\nsum(ifnull(uitval,0)) as aantaluitval\nfrom BEWERKING,BEWERKINGFLOW\nwhere BEWERKINGFLOW.id = '" + bewerkingflowid + "'\nand BEWERKING.bewerkingsnummer = 'BEWERKINGFLOW.bewerkingsnummer'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        if (!rows[0]) {
                            result = {
                                items: [
                                    {
                                        msg: "Productienummer onbekend",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        BEWERKINGSNUMMER: '',
                                        VOLGNUMMER: '',
                                        BEWERKINGSOORT: '',
                                        PRODUCTIEAANTAL: '',
                                        STARTAANTAL: '',
                                        AANTALUITVAL: '',
                                        PRODUCTNUMMER: '',
                                        PRODUCTNAAM: '',
                                        OPMERKING: '',
                                        KLEUR: ''
                                    }
                                ]
                            };
                            connection.release();
                            res.status(200).send(result);
                            return [2 /*return*/];
                        }
                        row = rows[0];
                        result = {
                            items: [
                                {
                                    msg: "",
                                    GEBRUIKER: req.ak2_user,
                                    GEBRUIKERNAAM: req.ak2_user,
                                    BEWERKINGSNUMMER: row.BEWERKINGSNUMMER,
                                    VOLGNUMMER: row.VOLGNUMMER,
                                    BEWERKINGSOORT: row.BEWERKINGSOORTNAAM,
                                    PRODUCTIEAANTAL: row.PRODUCTIEAANTAL,
                                    STARTAANTAL: row.STARTAANTAL,
                                    AANTALUITVAL: row.AANTALUITVAL,
                                    PRODUCTNUMMER: row.PRODUCTNUMMER,
                                    PRODUCTNAAM: row.PRODUCTNAAM,
                                    OPMERKING: row.OPMERKING,
                                    KLEUR: row.KLEUR
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getRetour = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var referentie, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        referentie = req.query.referentie;
                        if (!referentie) {
                            referentie = req.body.referentie;
                        }
                        sql = "\nselect \nifnull(OPMERKING,'') as OPMERKING\nFROM RETOUR\nWHERE REFERENTIE = '" + referentie + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {};
                        if (rows.length <= 0) {
                            result = {
                                items: [
                                    {
                                        msg: "Referentie onbekend",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        OPMERKING: ""
                                    }
                                ]
                            };
                        }
                        else {
                            result = {
                                items: [
                                    {
                                        msg: "",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        OPMERKING: rows[0].OPMERKING
                                    }
                                ]
                            };
                        }
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getRetourKlant = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var referentie, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        referentie = req.query.referentie;
                        if (!referentie) {
                            referentie = req.body.referentie;
                        }
                        sql = "\nselect ifnull(OPMERKING,'') as OPMERKING\nFROM RETOURKLANT\nWHERE REFERENTIE = '" + referentie + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {};
                        if (rows.length <= 0) {
                            result = {
                                items: [
                                    {
                                        msg: "Referentie onbekend",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        OPMERKING: ""
                                    }
                                ]
                            };
                        }
                        else {
                            result = {
                                items: [
                                    {
                                        msg: "",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        OPMERKING: rows[0].OPMERKING
                                    }
                                ]
                            };
                        }
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getRetourActie = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id || req.body.id;
                        sql = "\nselect ifnull(OPMERKING,'') as OPMERKING\nFROM RETOURACTIE\nWHERE ID = '" + id + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {};
                        if (rows.length <= 0) {
                            result = {
                                items: [
                                    {
                                        msg: "Referentie onbekend",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        OPMERKING: ""
                                    }
                                ]
                            };
                        }
                        else {
                            result = {
                                items: [
                                    {
                                        msg: "",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        OPMERKING: rows[0].OPMERKING
                                    }
                                ]
                            };
                        }
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getRetourProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.query.id || req.body.id;
                        sql = "\nselect ifnull(OPMERKING,'') as OPMERKING\nFROM RETOURPRODUCT\nWHERE ID = '" + id + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {};
                        if (rows.length <= 0) {
                            result = {
                                items: [
                                    {
                                        msg: "Referentie onbekend",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        OPMERKING: ""
                                    }
                                ]
                            };
                        }
                        else {
                            result = {
                                items: [
                                    {
                                        msg: "",
                                        GEBRUIKER: req.ak2_user,
                                        GEBRUIKERNAAM: req.ak2_user,
                                        OPMERKING: rows[0].OPMERKING
                                    }
                                ]
                            };
                        }
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.saveRetourOpmerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var referentie, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        referentie = req.query.referentie || req.body.referentie || "";
                        sql = "\nupdate RETOUR\nset opmerking = '" + req.body.opmerking + "'\nWHERE REFERENTIE = '" + referentie + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    msg: ""
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.saveRetourKlantOpmerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\nupdate RETOURKLANT\nset opmerking = '" + req.body.opmerking + "'\nWHERE ID = '" + req.body.id + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    msg: ""
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.saveRetourProductOpmerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\nupdate RETOURPRODUCT\nset opmerking = '" + req.body.opmerking + "'\nWHERE ID = '" + req.body.id + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    msg: ""
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.saveRetourActieOpmerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\nupdate RETOURACTIE\nset opmerking = '" + req.body.opmerking + "'\nWHERE ID = '" + req.body.id + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    msg: ""
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.saveBewerkingOpmerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\nupdate BEWERKING\nset opmerking = '" + req.body.opmerking + "'\nWHERE bewerkingsnummer = '" + req.body.bewerkingsnummer + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    msg: ""
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.saveVraagproductOpmerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\nupdate PRODUCTVRAAG\nset opmerking = '" + req.body.opmerking + "'\nWHERE ordernummer = '" + req.body.ordernummer + "'\nAND productnummer = '" + req.body.productnummer + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    msg: ""
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.saveVraagOpmerking2 = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\nupdate VRAAG\nset opmerking2 = '" + req.body.opmerking + "'\nWHERE ordernummernummer = '" + req.body.ordernummer + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    msg: ""
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.saveVraagOpmerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\nupdate VRAAG\nset opmerking = '" + req.body.opmerking + "'\nWHERE ordernummer = '" + req.body.ordernummer + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    msg: ""
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getProductOpmerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, _a, rows, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _b.sent();
                        //
                        sql = "\ninsert into PRODUCTOPMERKING\n(productnummer,bron,opmerking)\nselect \n'" + db_1.default.fix(req.body.productnummer) + "',\n'" + db_1.default.fix(req.body.bron) + "',\n'" + db_1.default.fix(req.body.opmerking || '') + "' from dual\nwhere not exists\n(\nselect 1 from PRODUCTOPMERKING\nwhere productnummer = '" + db_1.default.fix(req.body.productnummer) + "'\nand bron = '" + db_1.default.fix(req.body.bron) + "'\n)";
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        _a.crudResult = _b.sent();
                        sql = "\nselect *\nFROM PRODUCTOPMERKING\nWHERE productnummer = '" + db_1.default.fix(req.body.productnummer) + "'\nand bron = '" + db_1.default.fix(req.body.bron) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _b.sent();
                        connection.release();
                        result = {};
                        if (!rows[0]) {
                            result = {
                                items: [
                                    {
                                        msg: "Productopmerking onbekend",
                                        OPMERKING: ""
                                    }
                                ]
                            };
                        }
                        else {
                            result = {
                                items: [
                                    {
                                        msg: "",
                                        OPMERKING: rows[0].OPMERKING,
                                    }
                                ]
                            };
                        }
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.saveProductOpmerking = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sql = "\nupdate PRODUCTOPMERKING\nset opmerking = '" + db_1.default.fix(req.body.opmerking) + "'\nWHERE productnummer = '" + db_1.default.fix(req.body.productnummer) + "'\nAND bron = '" + db_1.default.fix(req.body.bron) + "'";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    msg: ""
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getUurtarief = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, result, uurtarief, connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uurtarief = '';
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        //
                        sql = "\nselect INHOUD \nfrom PARAM \nwhere naam = 'UURTARIEF';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        if (rows[0]) {
                            uurtarief = rows[0].INHOUD;
                        }
                        result = {
                            items: [
                                {
                                    msg: '', UURTARIEF: uurtarief
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
    Toolbox.prototype.setUurtarief = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var uurtarief, sql, rows, result, connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uurtarief = req.body.uurtarief || '';
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        //
                        sql = "\ninsert into PARAM (naam) \nselect 'UURTARIEF' from DUAL\nwhere not exists \n(select 1 from PARAM where naam = 'UURTARIEF')";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        sql = "\nupdate PARAM set\ninhoud = '" + db_1.default.fix(uurtarief) + "' \nwhere naam = 'UURTARIEF';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _a.sent();
                        result = {
                            items: [
                                {
                                    msg: ''
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
    Toolbox.prototype.getStartstatistiek = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var startstatistiek, sql, connection, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startstatistiek = "01-01-2011";
                        sql = "\nselect INHOUD \nfrom PARAM \nwhere naam = 'STARTSTATISTIEK';";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        if (rows.length > 0) {
                            startstatistiek = rows[0].INHOUD;
                        }
                        result = { items: [{ MSG: "", STARTSTATISTIEK: startstatistiek }] };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.setStartstatistiek = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, connection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        //
                        sql = "\ninsert into PARAM (NAAM)\nselect 'STARTSTATISTIEK' from DUAL\nwhere not exists (\nselect 1 from PARAM where naam = 'STARTSTATISTIEK'\n)";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        sql = "\nupdate PARAM set\nINHOUD = '" + req.body.startstatistiek + "' \nwhere naam = 'STARTSTATISTIEK';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _a.sent();
                        //
                        connection.release(); //
                        result = {
                            items: [{ MSG: "" }]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var vrijgegeven, table, key, to, msg, email, sql, rows, result, connection, parname;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vrijgegeven = req.query.vrijgegeven || req.body.vrijgegeven;
                        table = req.query.table || req.body.table;
                        key = req.query.key || req.body.key;
                        to = '';
                        msg = '';
                        email = '';
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        parname = vrijgegeven;
                        if (!parname) return [3 /*break*/, 3];
                        sql = "\nselect INHOUD \nfrom PARAM \nwhere naam = '" + parname + "';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        if (rows[0]) {
                            to = rows[0].INHOUD;
                        }
                        result = {
                            items: [{ msg: msg, parname: parname, to: to }]
                        };
                        connection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 3:
                        if (!(table == 'leverancier')) return [3 /*break*/, 5];
                        sql = "\nselect EMAIL\nfrom LEVERANCIER \nwhere leveranciernummer = '" + key + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 4:
                        rows = _a.sent();
                        if (rows[0]) {
                            email = rows[0].EMAIL;
                        }
                        else {
                            msg = "onbekende leverancier: " + key;
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        msg = "onbekende table: " + table;
                        _a.label = 6;
                    case 6:
                        result = {
                            items: [{ MSG: msg, EMAIL: email }]
                        };
                        connection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.setEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var vrijgegeven, table, key, to, email, msg, sql, rows, result, connection, parname;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        vrijgegeven = req.query.vrijgegeven || req.body.vrijgegeven;
                        table = req.query.table || req.body.table;
                        key = req.query.key || req.body.key;
                        to = req.query.to || req.body.to;
                        email = req.query.email || req.body.email;
                        msg = '';
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        parname = vrijgegeven;
                        if (!parname) return [3 /*break*/, 4];
                        sql = "\ninsert into PARAM (naam) \nselect '" + parname + "' from DUAL\nwhere not exists \n(select 1 from PARAM where naam = '" + parname + "')";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        sql = "\nupdate PARAM set\ninhoud = '" + db_1.default.fix(to) + "' \nwhere naam = '" + parname + "';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _a.sent();
                        result = {
                            items: [{ msg: msg, parname: parname, to: to }]
                        };
                        connection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                    case 4:
                        if (!(table == 'leverancier')) return [3 /*break*/, 6];
                        sql = "\nupdate LEVERANCIER set\nemail = '" + email + "'\nwhere leveranciernummer = '" + key + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 5:
                        rows = _a.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        msg = "onbekende table: " + table;
                        _a.label = 7;
                    case 7:
                        result = {
                            items: [{ MSG: msg, EMAIL: email }]
                        };
                        connection.release();
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.clearLeverancierNieuw = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, connection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        //
                        sql = "\nupdate BESTELLING \nset lijststatus = 'PRT'\nwhere leveranciernummer = '" + db_1.default.fix(req.query.leverancier) + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        connection.release();
                        result = {
                            items: [
                                {
                                    MSG: "De regels van leverancier " + db_1.default.fix(req.query.leverancier) + " zijn van op 'Geprint' gezet ...",
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.getPauze = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var start, eind, connection, sql, rows, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        start = "12:00";
                        eind = "12:30";
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        sql = "\nselect INHOUD \nfrom PARAM \nwhere naam = 'PAUZESTART';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        if (rows[0]) {
                            start = rows[0].INHOUD;
                        }
                        //
                        sql = "\nselect INHOUD \nfrom PARAM \nwhere naam = 'PAUZEEIND';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _a.sent();
                        if (rows[0]) {
                            eind = rows[0].INHOUD;
                        }
                        //
                        connection.release(); //
                        result = {
                            items: [{ MSG: "", START: start, EIND: eind }]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.setPauze = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, rows, connection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        //
                        sql = "\ninsert into PARAM (NAAM)\nselect 'PAUZESTART' from DUAL\nwhere not exists (\nselect 1 from PARAM where naam = 'PAUZESTART'\n)";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        sql = "\nupdate PARAM set\nINHOUD = '" + req.body.start + "' \nwhere naam = 'PAUZESTART';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _a.sent();
                        //
                        //
                        //
                        sql = "\ninsert into PARAM (NAAM)\nselect 'PAUZEEIND' from DUAL\nwhere not exists (\nselect 1 from PARAM where naam = 'PAUZEEIND'\n)";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 4:
                        rows = _a.sent();
                        sql = "\nupdate PARAM set\nINHOUD = '" + req.body.eind + "' \nwhere naam = 'PAUZEEIND';";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 5:
                        rows = _a.sent();
                        //
                        connection.release(); //
                        result = {
                            items: [{ MSG: "", START: req.body.start, EIND: req.body.eind }]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.addLogistiek = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, sql, sqlinsert, rows, row, rowspf, rowpf, tlrow, connection, idbw, productnummer, lijn, datum, irow, _a, _b, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        msg = '';
                        tlrow = 0;
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _c.sent();
                        idbw = -1;
                        productnummer = req.query.productnummer || '';
                        lijn = req.query.lijn || '';
                        datum = req.query.datum || '';
                        //
                        sql = "\nselect * from BEWERKINGSOORT\nwhere layout = 'rapBEWERKINGFLOWPICK.php'\norder by bewerkingsoort";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _c.sent();
                        if (rows[0]) {
                            row = rows[0];
                            idbw = Number(row.ID);
                        }
                        else {
                            idbw = -1;
                            msg = 'Geen bewerkingsoort met logistieklijst aanwezig (instellingen)';
                        }
                        if (!(idbw != -1)) return [3 /*break*/, 11];
                        sql = "\nselect * from BEWERKING\nwhere einddatumtijd is null\nand not exists (select 1 from BEWERKINGFLOW,BEWERKINGSOORT\nwhere BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer\nand BEWERKINGFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\nand BEWERKINGSOORT.layout = 'rapBEWERKINGFLOWPICK.php')";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _c.sent();
                        irow = 0;
                        _c.label = 4;
                    case 4:
                        if (!(irow < rows.length)) return [3 /*break*/, 10];
                        row = rows[irow];
                        tlrow++;
                        if (row.PRODUCTIEAANTAL == '') {
                            row.PRODUCTIEAANTAL = '0';
                        }
                        if (row.STARTAANTAL == '') {
                            row.STARTAANTAL = '0';
                        }
                        //
                        // Bestaat er een productflowregel voor?
                        //
                        sql = "\nselect *,\nPRODUCTFLOW.id as PFID\nfrom PRODUCTFLOW,BEWERKINGSOORT\nwhere PRODUCTFLOW.productnummer = '" + row.PRODUCTNUMMER + "'\nand PRODUCTFLOW.bewerkingsoort = BEWERKINGSOORT.bewerkingsoort\nand BEWERKINGSOORT.layout = 'rapBEWERKINGFLOWPICK.php'\norder by PRODUCTFLOW.volgnummer";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 5:
                        rowspf = _c.sent();
                        if (!rowspf[0]) return [3 /*break*/, 7];
                        rowpf = rowspf[0];
                        sqlinsert = "\ninsert into BEWERKINGFLOW\n(Bewerkingsnummer,Bewerkingsoort,Volgnummer,\nBewerkingaantal, Startdatumtijd, Geprint, Plandatumtijd, Einddatumtijd)\nselect \n'" + row.BEWERKINGSNUMMER + "', \nbewerkingsoort, \nvolgnummer,\n'" + row.PRODUCTIEAANTAL + "',\nnull,null,null,null\nfrom PRODUCTFLOW\nwhere id = '" + rowpf.PFID + "'";
                        _a = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sqlinsert)];
                    case 6:
                        _a.crudResult = _c.sent();
                        return [3 /*break*/, 9];
                    case 7:
                        sqlinsert = "\ninsert into BEWERKINGFLOW\n(Bewerkingsnummer,Bewerkingsoort,Volgnummer,\nBewerkingaantal, Startdatumtijd, Geprint, Plandatumtijd, Einddatumtijd)\nselect \n'" + row.BEWERKINGSNUMMER + "', \nbewerkingsoort,\n1,\n'" + row.PRODUCTIEAANTAL + "',\nnull,null,null,null\nfrom BEWERKINGSOORT\nwhere id = '" + idbw + "'";
                        _b = res;
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sqlinsert)];
                    case 8:
                        _b.crudResult = _c.sent();
                        _c.label = 9;
                    case 9:
                        irow++;
                        return [3 /*break*/, 4];
                    case 10:
                        if (tlrow == 0) {
                            msg = 'Logistiekbewerkingen waren compleet, geen toevoegingen nodig ...';
                        }
                        else {
                            msg = tlrow + " logistiekbewerkingen toegevoegd ...";
                        }
                        _c.label = 11;
                    case 11:
                        //
                        //
                        //
                        connection.release();
                        result = {
                            items: [
                                {
                                    MSG: msg,
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.cleanBackup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var sql, msg, rows, connection, saveDate, savedays, tlUnlink, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        saveDate = new Date();
                        savedays = 7;
                        saveDate.setTime(saveDate.getTime() - (24 * 60 * 60 * 1000 * savedays));
                        tlUnlink = 0;
                        //
                        // Log bbmsg
                        //
                        sql = "\ndelete from BBMSG \nwhere bb = 'Log' \nand date <  DATE_SUB(SYSDATE(),INTERVAL " + savedays + " DAY)";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        //
                        // backup/*.sql
                        //
                        fs.readdirSync(config_1.Config.appDir + "/backup").map(function (filename) {
                            if (filename.endsWith(".sql")) {
                                var path = config_1.Config.appDir + "/backup/" + filename;
                                var file = fs.statSync(path);
                                if (file.mtime < saveDate) {
                                    fs.unlinkSync(path);
                                    tlUnlink++;
                                    logger_1.Logger.info("Clean " + path + " ...");
                                }
                            }
                        });
                        //
                        // backup/*.7z
                        //
                        fs.readdirSync(config_1.Config.appDir + "/backup").map(function (filename) {
                            if (filename.endsWith(".7z")) {
                                var path = config_1.Config.appDir + "/backup/" + filename;
                                var file = fs.statSync(path);
                                if (file.mtime < saveDate) {
                                    fs.unlinkSync(path);
                                    tlUnlink++;
                                    logger_1.Logger.info("Clean " + path + " ...");
                                }
                            }
                        });
                        //
                        // import/*.log
                        //
                        fs.readdirSync(config_1.Config.appDir + "/import").map(function (filename) {
                            if (filename.endsWith(".log")) {
                                var path = config_1.Config.appDir + "/import/" + filename;
                                var file = fs.statSync(path);
                                if (file.mtime < saveDate) {
                                    fs.unlinkSync(path);
                                    tlUnlink++;
                                    logger_1.Logger.info("Clean " + path + " ...");
                                }
                            }
                        });
                        //
                        connection.release();
                        //
                        msg = tlUnlink + " backups opgeschoond ...";
                        result = {
                            items: [
                                {
                                    MSG: msg,
                                }
                            ]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Toolbox.prototype.sendVrijMail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, subject, message, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        if (!((req.body.to || '') == '')) return [3 /*break*/, 1];
                        msg = "Email is niet verzonden";
                        return [3 /*break*/, 3];
                    case 1:
                        subject = "Vrijgave van " + req.body.datum;
                        if ((req.body.productgroep || '') != '') {
                            subject += " van " + req.body.productgroep;
                        }
                        subject += " is uitgevoerd";
                        message = "http://" + config_1.Config.server + ":" + config_1.Config.serverPort + "/" + req.body.filename + ".pdf";
                        return [4 /*yield*/, this.mailer.send(req.body.to, subject, message)];
                    case 2:
                        _a.sent();
                        msg = "Email is verzonden naar " + req.body.to;
                        _a.label = 3;
                    case 3:
                        result = {
                            items: [{
                                    msg: msg,
                                    filename: req.body.filename
                                }]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/, (true)];
                }
            });
        });
    };
    Toolbox.prototype.makePdf = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var scherm, filename, orientation, papersize, sourcedir, targetdir, html, options;
            return __generator(this, function (_a) {
                scherm = req.body.html || '';
                filename = req.body.filename || 'todo';
                orientation = req.body.orientation || 'portrait';
                papersize = req.body.papersize || 'A4';
                sourcedir = config_1.Config.appDir + "/html";
                targetdir = config_1.Config.appDir + "/pdf";
                try {
                    fs.mkdirSync(sourcedir);
                }
                catch (error) {
                    // already exists
                }
                try {
                    fs.mkdirSync(targetdir);
                }
                catch (error) {
                    // already exists
                }
                fs.writeFileSync(sourcedir + "/" + filename + ".html", scherm);
                html = fs.readFileSync(sourcedir + "/" + filename + ".html", 'utf8');
                options = {
                    format: papersize,
                    orientation: orientation,
                    base: "http://localhost/ak2ps/build/",
                    header: {
                        height: "10mm"
                    },
                    footer: {
                        height: "10mm"
                    }
                };
                html_pdf_1.default.create(html, options).toFile(targetdir + "/" + filename + ".pdf", function (pdferr, pdfres) {
                    var msg = filename + ".pfd has been generated successfully!";
                    if (pdferr) {
                        logger_1.Logger.error(req, JSON.stringify(pdferr));
                        msg = JSON.stringify(pdferr);
                    }
                    var result = {
                        items: [
                            {
                                msg: msg,
                                filename: "pdf/" + filename
                            }
                        ]
                    };
                    res.status(200).send(result);
                    return;
                });
                return [2 /*return*/];
            });
        });
    };
    Toolbox.prototype.makePdfBestelling = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var scherm, filename, orientation, papersize, sourcedir, targetdir, html, options;
            return __generator(this, function (_a) {
                scherm = req.body.html || '';
                filename = req.body.filename || 'test.pdf';
                orientation = req.body.orientation || 'portrait';
                papersize = req.body.papersize || 'A4';
                sourcedir = config_1.Config.appDir + "/html";
                targetdir = config_1.Config.appDir + "/pdf";
                try {
                    fs.mkdirSync(sourcedir);
                }
                catch (error) {
                    // already exists
                }
                try {
                    fs.mkdirSync(targetdir);
                }
                catch (error) {
                    // already exists
                }
                fs.writeFileSync(sourcedir + "/" + filename + ".html", scherm);
                html = fs.readFileSync(sourcedir + "/" + filename + ".html", 'utf8');
                options = {
                    format: papersize,
                    orientation: orientation,
                    base: "http://localhost/ak2ps/build/",
                    header: {
                        height: "10mm"
                    },
                    footer: {
                        height: "10mm"
                    }
                };
                html_pdf_1.default.create(html, options).toFile(targetdir + "/" + filename + ".pdf", function (pdferr, pdfres) {
                    var msg = filename + ".pdf has been generated successfully!";
                    if (pdferr) {
                        logger_1.Logger.error(req, JSON.stringify(pdferr));
                        msg = JSON.stringify(pdferr);
                    }
                    var result = {
                        items: [
                            {
                                msg: msg,
                                filename: "pdf/" + filename
                            }
                        ]
                    };
                    res.status(200).send(result);
                    return;
                });
                return [2 /*return*/];
            });
        });
    };
    Toolbox.prototype.makeExcel = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var scherm, filename, targetdir, msg, result;
            return __generator(this, function (_a) {
                scherm = req.body.html || '';
                filename = req.body.filename || 'temp.xls';
                targetdir = config_1.Config.appDir + "/tmpxls";
                try {
                    fs.mkdirSync(targetdir);
                }
                catch (error) {
                    // already exists
                }
                fs.writeFileSync(targetdir + "/" + filename + ".xls", scherm);
                msg = filename + ".xls has been generated successfully!";
                result = {
                    items: [
                        {
                            msg: msg,
                            filename: "" + filename
                        }
                    ]
                };
                res.status(200).send(result);
                return [2 /*return*/];
            });
        });
    };
    Toolbox.prototype.showPdf = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var filename;
            return __generator(this, function (_a) {
                filename = req.body.filename || req.query.filename;
                res.status(200).sendFile(config_1.Config.appDir + "/pdf/" + filename);
                return [2 /*return*/];
            });
        });
    };
    Toolbox.prototype.showExcel = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, result;
            return __generator(this, function (_a) {
                filename = req.body.filename || req.query.filename;
                res.setHeader('Content-Description', 'File Transfer');
                res.setHeader('Content-type', 'application/excel');
                res.setHeader('Content-Disposition: attachment', "filename=" + filename);
                result = "\n<html xmlns:x=\"urn:schemas-microsoft-com:office:excel\">\n<head>\n<!--[if gte mso 9]>\n<xml>\n<x:ExcelWorkbook>\n<x:ExcelWorksheets>\n<x:ExcelWorksheet>\n<x:Name>Sheet 1</x:Name>\n<x:WorksheetOptions>\n<x:Print>\n<x:ValidPrinterInfo/>\n</x:Print>\n</x:WorksheetOptions>\n</x:ExcelWorksheet>\n</x:ExcelWorksheets>\n</x:ExcelWorkbook>\n</xml>\n<![endif]-->\n</head>\n<body>";
                result += fs.readFileSync(filename);
                result += "\n</body>\n</html>";
                if (Number(req.query.delete) == 1) {
                    fs.unlinkSync(filename);
                }
                res.status(200).send(result);
                return [2 /*return*/];
            });
        });
    };
    Toolbox.prototype.sendMail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        if (!((req.body.to || '') == '')) return [3 /*break*/, 1];
                        msg = "Email is niet verzonden";
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.mailer.send(req.body.to, req.body.header, req.body.message)];
                    case 2:
                        _a.sent();
                        msg = "Email is verzonden naar " + req.body.to;
                        _a.label = 3;
                    case 3:
                        result = {
                            items: [{
                                    msg: msg,
                                    filename: req.body.filename
                                }]
                        };
                        res.status(200).send(result);
                        return [2 /*return*/, (true)];
                }
            });
        });
    };
    Toolbox.prototype.getVrijgegeven = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var productgroep, msg, scandir, result;
            return __generator(this, function (_a) {
                productgroep = req.query.productgroep || req.body.productgroep || "";
                msg = 'Nog niet';
                scandir = config_1.Config.appDir + "/pdf";
                try {
                    fs.readdirSync(scandir).forEach(function (file) {
                        var ext = String(file).split('.').pop();
                        if ((ext === null || ext === void 0 ? void 0 : ext.toUpperCase()) == "PDF") {
                            if (file.toUpperCase().indexOf("MNL_") == 0) {
                                var jaar = Number(file.substr(4, 4));
                                var maand = Number(file.substr(8, 2));
                                var dag = Number(file.substr(10, 2));
                                var today = new Date();
                                if (jaar == today.getFullYear()
                                    && maand == today.getMonth() + 1
                                    && dag == today.getDate()) {
                                    if (productgroep == "") {
                                        if (file.substr(12, 1) == ".") {
                                            msg = "Ja";
                                        }
                                    }
                                    else {
                                        if (file.substr(13, productgroep.length) == productgroep) {
                                            msg = "Ja";
                                        }
                                    }
                                }
                            }
                        }
                    });
                }
                catch (error) {
                    logger_1.Logger.error(req, error);
                }
                result = {
                    items: [{ msg: msg }]
                };
                res.status(200).send(result);
                return [2 /*return*/];
            });
        });
    };
    Toolbox.prototype.makeTekening = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var msg, error, shellresult, sql, rows, row, infile, outfile, tekeningnummer, bewerkingsoort, productnummer, bestelnummer, type, tekdir, outdir, curdir, dwg, indir, cmd, test, url, url2, url3, url4, url5, url6, url7, url8, url9, url10, connection, irow, thisStart_1, thisEnd_1, thisFiles, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        msg = '';
                        error = '';
                        sql = '';
                        infile = '';
                        outfile = '';
                        tekeningnummer = req.body.tekeningnummer || '';
                        bewerkingsoort = req.body.bewerkingsoort || '';
                        productnummer = req.body.productnummer || req.query.productnummer || '';
                        bestelnummer = req.body.bestelnummer || '';
                        type = '';
                        tekdir = 'F:/acltwin/DRAWINGS';
                        outdir = req.body.outdir || '';
                        curdir = config_1.Config.appDir;
                        dwg = 'dwg2pdf.cmd';
                        indir = '';
                        cmd = '';
                        test = 0;
                        url = '';
                        url2 = '';
                        url3 = '';
                        url4 = '';
                        url5 = '';
                        url6 = '';
                        url7 = '';
                        url8 = '';
                        url9 = '';
                        url10 = '';
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        //
                        sql = "\nselect\nINHOUD\nfrom PARAM\nwhere naam = 'TEKENINGDIR'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        if (rows[0]) {
                            row = rows[0];
                            tekdir = row.INHOUD;
                        }
                        //
                        tekdir = tekdir.replace(/\//g, '\\');
                        outdir = outdir.replace(/\//g, '\\');
                        curdir = curdir.replace(/\//g, '\\');
                        if (!(bewerkingsoort == "INKOOP")) return [3 /*break*/, 4];
                        sql = "\nselect \ndistinct(productnummer) as productnummer \nfrom BESTELLING \nwhere bestelnummer = '" + bestelnummer + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 3:
                        rows = _a.sent();
                        for (irow = 0; irow < rows.length; irow++) {
                            row = rows[irow];
                            if (row.PRODUCTNUMMER != "") {
                                productnummer = row.PRODUCTNUMMER;
                                type = productnummer.substr(0, 1).toUpperCase();
                                if (type == 'T') {
                                    indir = tekdir + "\\PRODUCTS";
                                    tekeningnummer = productnummer;
                                }
                                else if ((type == 'M') || (type == 'S')) {
                                    tekeningnummer = productnummer;
                                    indir = tekdir + "\\MATERIALS";
                                }
                                else {
                                    tekeningnummer = productnummer;
                                    indir = tekdir + "\\ASSEMBLY";
                                }
                                infile = indir + "\\" + tekeningnummer + ".DWG";
                                outfile = outdir + "\\" + tekeningnummer + ".pdf";
                                if (fs.existsSync(outfile)) {
                                    fs.unlinkSync(outfile);
                                }
                                if (fs.existsSync(infile) === false && test == 0) {
                                    error += "DWG " + infile + " onbekend ...\n";
                                }
                                else {
                                    cmd = curdir + "\\" + dwg + " \"" + infile + "\" \"" + outfile + "\"";
                                    try {
                                        shellresult = child.execSync(cmd, {
                                            cwd: curdir,
                                        });
                                    }
                                    catch (error) {
                                        //Logger.error(req, JSON.stringify(error));
                                    }
                                    if (fs.existsSync(outfile) === false) {
                                        error += "PDF " + outfile + " is niet aangemaakt ...\n";
                                    }
                                    else {
                                        msg += outfile + "\n";
                                    }
                                }
                                if (url == '') {
                                    url = outfile;
                                }
                                else if (url2 == '') {
                                    url2 = outfile;
                                }
                                else if (url3 == '') {
                                    url3 = outfile;
                                }
                                else if (url4 == '') {
                                    url4 = outfile;
                                }
                                else if (url5 == '') {
                                    url5 = outfile;
                                }
                                else if (url6 == '') {
                                    url6 = outfile;
                                }
                                else if (url7 == '') {
                                    url7 = outfile;
                                }
                                else if (url8 == '') {
                                    url8 = outfile;
                                }
                                else if (url9 == '') {
                                    url9 = outfile;
                                }
                                else if (url10 == '') {
                                    url10 = outfile;
                                }
                            }
                        }
                        return [3 /*break*/, 6];
                    case 4:
                        sql = "\nselect * \nfrom BEWERKINGSOORT \nwhere naam = '" + bewerkingsoort + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 5:
                        rows = _a.sent();
                        if (rows[0]) {
                            row = rows[0];
                            if (row.BEWERKINGSOORT != "") {
                                bewerkingsoort = row.BEWERKINGSOORT;
                            }
                        }
                        //
                        type = productnummer.substr(0, 1).toUpperCase();
                        // T
                        if (type == 'T') {
                            if ((bewerkingsoort == '3')
                                || (bewerkingsoort == '4')
                                || (bewerkingsoort == '7')
                                || (bewerkingsoort == 'C')
                                || (bewerkingsoort == 'G')
                                || (bewerkingsoort == 'N')) {
                                tekeningnummer = 'D' + productnummer;
                            }
                            else {
                                tekeningnummer = 'A' + productnummer;
                            }
                            indir = tekdir + "\\ASSEMBLY";
                            infile = indir + "\\" + tekeningnummer + ".DWG";
                            outfile = curdir + "\\tekening\\" + tekeningnummer + ".pdf";
                            if (fs.existsSync(outfile)) {
                                fs.unlinkSync(outfile);
                            }
                            url = "http://" + config_1.Config.server + config_1.Config.appUrl + "/tekening/" + tekeningnummer + ".pdf";
                            if (fs.existsSync(infile) === false && test == 0) {
                                msg += "DWG " + infile + " onbekend ...\n";
                            }
                            else {
                                cmd = curdir + "\\" + dwg + " \"" + infile + "\" \"" + outfile + "\"";
                                try {
                                    shellresult = child.execSync(cmd, {
                                        cwd: curdir,
                                    });
                                }
                                catch (error) {
                                    //Logger.error(req, JSON.stringify(error));
                                }
                                if (fs.existsSync(outfile) === false) {
                                    msg += "PDF " + outfile + " is niet aangemaakt ...\n";
                                }
                            }
                            if ((bewerkingsoort == '3')
                                || (bewerkingsoort == '4')
                                || (bewerkingsoort == '7')
                                || (bewerkingsoort == 'C')
                                || (bewerkingsoort == 'G')
                                || (bewerkingsoort == 'N')) {
                                tekeningnummer = productnummer;
                                indir = tekdir + "\\PRODUCTS";
                                infile = indir + "\\" + tekeningnummer + ".DWG";
                                outfile = curdir + "\\tekening\\" + tekeningnummer + ".pdf";
                                if (fs.existsSync(outfile)) {
                                    fs.unlinkSync(outfile);
                                }
                                url2 = "http://" + config_1.Config.server + config_1.Config.appUrl + "/tekening/" + tekeningnummer + ".pdf";
                                if (fs.existsSync(infile) === false && test == 0) {
                                    msg += "DWG " + infile + " onbekend ...\n";
                                }
                                else {
                                    cmd = curdir + "\\" + dwg + " \"" + infile + "\" \"" + outfile + "\"";
                                    try {
                                        shellresult = child.execSync(cmd, {
                                            cwd: curdir,
                                        });
                                    }
                                    catch (error) {
                                        //Logger.error(req, JSON.stringify(error));
                                    }
                                    if (fs.existsSync(outfile) === false) {
                                        msg += "PDF " + outfile + " is niet aangemaakt ...\n";
                                    }
                                }
                            }
                        }
                        else if ((type == 'M') || (type == 'S')) {
                            tekeningnummer = productnummer;
                            indir = tekdir + "\\MATERIALS";
                            infile = indir + "\\" + tekeningnummer + ".DWG";
                            outfile = curdir + "\\tekening\\" + tekeningnummer + ".pdf";
                            if (fs.existsSync(outfile)) {
                                fs.unlinkSync(outfile);
                            }
                            url2 = "http://" + config_1.Config.server + config_1.Config.appUrl + "/tekening/" + tekeningnummer + ".pdf";
                            if (fs.existsSync(infile) === false && test == 0) {
                                msg += "DWG " + infile + " onbekend ...\n";
                            }
                            else {
                                cmd = curdir + "\\" + dwg + " \"" + infile + "\" \"" + outfile + "\"";
                                try {
                                    shellresult = child.execSync(cmd, {
                                        cwd: curdir,
                                    });
                                }
                                catch (error) {
                                    //Logger.error(req, JSON.stringify(error));
                                }
                                if (fs.existsSync(outfile) === false) {
                                    msg += "PDF " + outfile + " is niet aangemaakt ...\n";
                                }
                            }
                        }
                        else {
                            tekeningnummer = productnummer;
                            indir = tekdir + "\\ASSEMBLY";
                            infile = indir + "\\" + tekeningnummer + ".DWG";
                            outfile = curdir + "\\tekening\\" + tekeningnummer + ".pdf";
                            if (fs.existsSync(outfile)) {
                                fs.unlinkSync(outfile);
                            }
                            url = "http://" + config_1.Config.server + config_1.Config.appUrl + "/tekening/" + tekeningnummer + ".pdf";
                            if (fs.existsSync(infile) === false && test == 0) {
                                msg += "DWG " + infile + " onbekend ...\n";
                            }
                            else {
                                cmd = curdir + "\\" + dwg + " \"" + infile + "\" \"" + outfile + "\"";
                                try {
                                    shellresult = child.execSync(cmd, {
                                        cwd: curdir,
                                    });
                                }
                                catch (error) {
                                    //Logger.error(req, JSON.stringify(error));
                                }
                                if (fs.existsSync(outfile) === false) {
                                    msg += "PDF " + outfile + " is niet aangemaakt ...\n";
                                }
                            }
                        }
                        // + W
                        tekeningnummer = 'W' + productnummer;
                        indir = "F:\\data\\ak2\\werkvoorbereiding";
                        infile = indir + "\\" + tekeningnummer + ".pdf";
                        url3 = encodeURI("http://" + config_1.Config.server + config_1.Config.appUrl + "/toolbox.php?action=showpdf&filename=" + infile);
                        if (fs.existsSync(infile) === false && test == 0) {
                            url3 = '';
                        }
                        // + O
                        tekeningnummer = 'O' + productnummer;
                        indir = "F:\\acltwin\\REMARKS";
                        infile = indir + "\\" + tekeningnummer + ".pdf";
                        url4 = encodeURI("http://" + config_1.Config.server + config_1.Config.appUrl + "/toolbox.php?action=showpdf&filename=" + infile);
                        if (fs.existsSync(infile) === false && test == 0) {
                            url4 = '';
                        }
                        thisStart_1 = '';
                        thisEnd_1 = '';
                        thisFiles = void 0;
                        indir = "F:\\data\\ak2\\werkvoorbereiding";
                        thisStart_1 = indir + "\\I" + productnummer + "_";
                        thisEnd_1 = ".pdf";
                        try {
                            thisFiles = fs.readdirSync(indir).filter(function (element) {
                                if (!element.startsWith(thisStart_1)) {
                                    return false;
                                }
                                if (!element.endsWith(thisEnd_1)) {
                                    return false;
                                }
                                return true;
                            });
                        }
                        catch (error) {
                            return [2 /*return*/, false];
                        }
                        //
                        if (thisFiles[0]) {
                            infile = thisFiles[0];
                            url5 = encodeURI("http://" + config_1.Config.server + config_1.Config.appUrl + "/toolbox.php?action=showpdf&filename=" + infile);
                        }
                        if (thisFiles[1]) {
                            infile = thisFiles[1];
                            url6 = encodeURI("http://" + config_1.Config.server + config_1.Config.appUrl + "/toolbox.php?action=showpdf&filename=" + infile);
                        }
                        if (thisFiles[2]) {
                            infile = thisFiles[2];
                            url7 = encodeURI("http://" + config_1.Config.server + config_1.Config.appUrl + "/toolbox.php?action=showpdf&filename=" + infile);
                        }
                        if (thisFiles[3]) {
                            infile = thisFiles[3];
                            url8 = encodeURI("http://" + config_1.Config.server + config_1.Config.appUrl + "/toolbox.php?action=showpdf&filename=" + infile);
                        }
                        if (thisFiles[4]) {
                            infile = thisFiles[4];
                            url9 = encodeURI("http://" + config_1.Config.server + config_1.Config.appUrl + "/toolbox.php?action=showpdf&filename=" + infile);
                        }
                        if (thisFiles[5]) {
                            infile = thisFiles[5];
                            url10 = encodeURI("http://" + config_1.Config.server + config_1.Config.appUrl + "/toolbox.php?action=showpdf&filename=" + infile);
                        }
                        _a.label = 6;
                    case 6:
                        result = {
                            items: [{
                                    msg: msg,
                                    error: error,
                                    url: url,
                                    url2: url2,
                                    url3: url3,
                                    url4: url4,
                                    url5: url5,
                                    url6: url6,
                                    url7: url7,
                                    url8: url8,
                                    url9: url9,
                                    url10: url10,
                                    filename: req.body.filename
                                }]
                        };
                        connection.release();
                        res.status(200).send(result);
                        return [2 /*return*/, (true)];
                }
            });
        });
    };
    Toolbox.prototype.routes = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var method, action;
            return __generator(this, function (_a) {
                method = req.method;
                action = db_1.default.fix(req.query.action || '');
                logger_1.Logger.request(req);
                //
                if (action == "getbewerking") {
                    this.getBewerking(req, res, next);
                }
                else if (action == "getvraag") {
                    this.getVraag(req, res, next);
                }
                else if (action == "getvraagproduct") {
                    this.getVraagProduct(req, res, next);
                }
                else if (action == "getbewerkingflow") {
                    this.getBewerkingflow(req, res, next);
                    //
                }
                else if (action == "getretour") {
                    this.getRetour(req, res, next);
                }
                else if (action == "getretourklant") {
                    this.getRetourKlant(req, res, next);
                }
                else if (action == "getretouractie") {
                    this.getRetourActie(req, res, next);
                }
                else if (action == "getretourproduct") {
                    this.getRetourProduct(req, res, next);
                    //
                }
                else if (action == "saveretouropmerking") {
                    this.saveRetourOpmerking(req, res, next);
                }
                else if (action == "saveretourklantopmerking") {
                    this.saveRetourKlantOpmerking(req, res, next);
                }
                else if (action == "saveretourproductopmerking") {
                    this.saveRetourProductOpmerking(req, res, next);
                }
                else if (action == "saveretouractieopmerking") {
                    this.saveRetourActieOpmerking(req, res, next);
                }
                else if (action == "savebewerkingopmerking") {
                    this.saveBewerkingOpmerking(req, res, next);
                }
                else if (action == "savevraagopmerking") {
                    this.saveVraagOpmerking(req, res, next);
                }
                else if (action == "savevraagproductopmerking") {
                    this.saveVraagproductOpmerking(req, res, next);
                }
                else if (action == "savevraagopmerking2") {
                    //
                    this.saveVraagOpmerking2(req, res, next);
                    //
                }
                else if (action == "getproductopmerking") {
                    this.getProductOpmerking(req, res, next);
                }
                else if (action == "saveproductopmerking") {
                    this.saveProductOpmerking(req, res, next);
                    //
                }
                else if (action == "getuurtarief") {
                    this.getUurtarief(req, res, next);
                }
                else if (action == "setuurtarief") {
                    this.setUurtarief(req, res, next);
                    //
                }
                else if (action == "getstartstatistiek") {
                    this.getStartstatistiek(req, res, next);
                }
                else if (action == "setstartstatistiek") {
                    this.setStartstatistiek(req, res, next);
                }
                else if (action == "getemail") {
                    this.getEmail(req, res, next);
                }
                else if (action == "setemail") {
                    this.setEmail(req, res, next);
                }
                else if (action == "clearleveranciernieuw") {
                    this.clearLeverancierNieuw(req, res, next);
                }
                else if (action == "getpauze") {
                    this.getPauze(req, res, next);
                }
                else if (action == "setpauze") {
                    this.setPauze(req, res, next);
                }
                else if (action == "addlogistiek") {
                    this.addLogistiek(req, res, next);
                }
                else if (action == "cleanbackup") {
                    this.cleanBackup(req, res, next);
                }
                else if (action == "sendvrijmail") {
                    this.sendVrijMail(req, res, next);
                }
                else if (action == "makepdf") {
                    this.makePdf(req, res, next);
                }
                else if (action == "makepdfbestelling") {
                    this.makePdfBestelling(req, res, next);
                }
                else if (action == "makeexcel") {
                    this.makeExcel(req, res, next);
                }
                else if (action == "showpdf") {
                    this.showPdf(req, res, next);
                }
                else if (action == "showexcel") {
                    this.showExcel(req, res, next);
                }
                else if (action == "sendmail") {
                    this.sendMail(req, res, next);
                }
                else if (action == "getvrijgegeven") {
                    this.getVrijgegeven(req, res, next);
                }
                else if (action == "maketekening") {
                    this.makeTekening(req, res, next);
                }
                else if (action == "scan") {
                    klok_1.Klok.scan(req, res, next);
                }
                else {
                    util_1.Util.unknownOperation(req, res, next);
                }
                return [2 /*return*/];
            });
        });
    };
    return Toolbox;
}());
exports.Toolbox = Toolbox;
//# sourceMappingURL=toolbox.js.map