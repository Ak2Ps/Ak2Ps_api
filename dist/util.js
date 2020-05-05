"use strict";
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
var db_1 = __importDefault(require("./db"));
var http_1 = __importDefault(require("http"));
var fs = __importStar(require("fs"));
var config_1 = require("./config");
var logger_1 = require("./logger");
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.isRunning = function (req, res, next) {
        res.status(200).send("Ak2 is listening ...");
    };
    Util.getLast = function (obj) {
        var result = obj;
        if (typeof obj == "object") {
            result = obj[obj.length - 1];
        }
        return result;
    };
    Util.makeFilename = function (req_path) {
        var result = req_path;
        result = encodeURI(result);
        result = result.replace(/\./gi, "_");
        return result;
    };
    Util.compareWithPhp = function (rows, req, res, next) {
        if (config_1.Config.runmode != "test" /* test */) {
            return;
        }
        var comparetype = typeof rows;
        this.testPhp(req, res, next, function (responseString) {
            var result = "";
            var phpstring = "";
            var nodestring = "";
            var phpobj = {};
            if (comparetype == "string") {
                phpstring = responseString;
                nodestring = rows;
            }
            else {
                try {
                    phpobj = JSON.parse(responseString);
                }
                catch (e) {
                    phpobj = responseString;
                }
            }
            logger_1.Logger.test("    Comparing with " + req.path + " " + JSON.stringify(req.query) + " ...");
            try {
                if (comparetype == "string") {
                    if (String(phpstring).substr(0, 1) == '<') {
                        phpstring = String(phpstring).replace(/\n/g, '');
                        phpstring = String(phpstring).replace(/\r/g, '');
                        phpstring = String(phpstring).replace(/\t/g, '');
                        phpstring = String(phpstring).replace(/<\/tr>/gi, '</tr>\n');
                        phpstring = String(phpstring).replace(/<\/div>/gi, '</div>\n');
                        phpstring = String(phpstring).replace(/<\/table>/gi, '</table>\n');
                        nodestring = String(nodestring).replace(/\n/g, '');
                        nodestring = String(nodestring).replace(/\r/g, '');
                        nodestring = String(nodestring).replace(/\t/g, '');
                        nodestring = String(nodestring).replace(/<\/tr>/gi, '</tr>\n');
                        nodestring = String(nodestring).replace(/<\/div>/gi, '</div>\n');
                        nodestring = String(nodestring).replace(/<\/table>/gi, '</table>\n');
                    }
                }
                else {
                    phpstring = JSON.stringify(phpobj, null, 2);
                    nodestring = JSON.stringify(rows, null, 2);
                }
                if (phpstring != nodestring) {
                    fs.writeFileSync(config_1.Config.appDir + "/log" + Util.makeFilename(req.path) + ".phpdat", "" + phpstring);
                    fs.writeFileSync(config_1.Config.appDir + "/log" + Util.makeFilename(req.path) + ".nodedat", "" + nodestring);
                    logger_1.Logger.test("    *********************");
                    logger_1.Logger.test("    * Compare diffs found");
                    logger_1.Logger.test("    *********************");
                    fs.appendFileSync(config_1.Config.appDir + "/log/test.log", req.path + " diffs ...\n");
                }
                else {
                    logger_1.Logger.test("    Compare ok");
                    fs.appendFileSync(config_1.Config.appDir + "/log/test.log", req.path + " ok ...\n");
                }
            }
            catch (e) {
                console.log(phpobj);
                console.log(rows);
                logger_1.Logger.test(e);
                logger_1.Logger.test("    Compare failed ");
            }
        });
        return;
    };
    Util.testPhp = function (req, res, next, callback) {
        var body = JSON.stringify(req.body);
        var headers = req.headers;
        headers["Content-Type"] = "application/json";
        headers["Content-Length"] = body.length;
        var testreq = http_1.default.request({
            host: "localhost",
            path: "/" + config_1.Config.appUrl + req.originalUrl,
            method: req.method,
            headers: headers
        }, function (testres) {
            var responseString = "";
            testres.on("data", function (data) {
                responseString += data;
            });
            testres.on("end", function () {
                callback(responseString);
            });
        });
        testreq.write(body);
        testreq.end();
    };
    Util.exePhp = function (req, res, next) {
        var body = JSON.stringify(req.body);
        logger_1.Logger.test("    ********************************************************");
        logger_1.Logger.test("    * reroute to " + req.path + " " + JSON.stringify(req.query));
        logger_1.Logger.test("    ********************************************************");
        fs.appendFileSync(config_1.Config.appDir + "/log/test.log", req.path + " reroute ...\n");
        var headers = req.headers;
        headers["Content-Type"] = "application/json";
        headers["Content-Length"] = body.length;
        var exereq = http_1.default.request({
            host: "localhost",
            path: "/" + config_1.Config.appUrl + req.originalUrl,
            method: req.method,
            headers: headers
        }, function (exeres) {
            var responseString = "";
            exeres.on("error", function (error) {
                logger_1.Logger.test(error);
            });
            exeres.on("data", function (data) {
                responseString += data;
            });
            exeres.on("end", function () {
                res.status(200).send(responseString);
            });
        });
        exereq.write(body);
        exereq.end();
    };
    Util.decodeOpmerking = function (opmerking, maxlen) {
        var result = '';
        result = decodeURIComponent(opmerking.trim());
        result = result.replace(/\n/g, ", ");
        result = result.replace(/\c/g, "");
        result = result.replace(/</g, "&lt");
        result = result.replace(/>/, "&gt");
        result = result.replace(/0x3F/, "?");
        result = result.replace(/\&/, "&amp;");
        if (maxlen > 0) {
            if (maxlen > 4) {
                if (result.length > maxlen) {
                    result = result.substr(0, maxlen - 4) + " ...";
                }
                else {
                }
            }
            else {
                result = result.substr(0, maxlen);
            }
        }
        return result;
    };
    Util.MakeHHMM = function (minuten) {
        var result = '';
        var sign = '';
        if (minuten < 0) {
            minuten *= -1;
            sign = '-';
        }
        var uur = 0;
        while (minuten - 60 >= 0) {
            uur = uur + 1;
            minuten = minuten - 60;
        }
        var strminuten = String(minuten);
        while (strminuten.length < 2) {
            strminuten = '0' + strminuten;
        }
        var struur = String(uur);
        if (struur == '') {
            struur = '0';
        }
        result = sign + struur + ":" + strminuten;
        return result;
    };
    Util.unknownOperation = function (req, res, next) {
        logger_1.Logger.error(req, req.path + "  " + req.method + " " + JSON.stringify(req.query) + " not implemented");
        res.status(501).send(req.method + ": " + JSON.stringify(req.query) + "not implemented");
    };
    Util.waitParam = function (req, res, next, naam) {
        return __awaiter(this, void 0, void 0, function () {
            var result, connection, sql, rows, row;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        result = '';
                        return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        connection = _a.sent();
                        sql = "\nselect INHOUD\nfrom param\nwhere NAAM = '" + naam + "'";
                        return [4 /*yield*/, db_1.default.waitQuery(connection, sql)];
                    case 2:
                        rows = _a.sent();
                        if (rows[0]) {
                            row = rows[0];
                            result = row.INHOUD;
                        }
                        //
                        connection.release();
                        return [2 /*return*/, (result)];
                }
            });
        });
    };
    Util.addAnd = function (where) {
        var result = '';
        if (where == '') {
            result += '\nwhere ';
        }
        else {
            result += '\nand ';
        }
        return result;
    };
    Util.constructFilename = function (FileName) {
        FileName = FileName.replace(/\\/g, "_");
        FileName = FileName.replace(/\//g, "_");
        FileName = FileName.replace(/\?/g, "_");
        FileName = FileName.replace(/%/g, "_");
        FileName = FileName.replace(/\*/g, "_");
        FileName = FileName.replace(/"/g, "_");
        FileName = FileName.replace(/</g, "_");
        FileName = FileName.replace(/>/g, "_");
        return FileName;
    };
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=util.js.map