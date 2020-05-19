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
var db_1 = __importDefault(require("../db"));
var logger_1 = require("../logger");
var fs = __importStar(require("fs"));
var Template = /** @class */ (function () {
    function Template() {
        logger_1.Logger.info("Creating Template");
    }
    Template.makeTs = function (parTable, parDict) {
        var thisTableDisp = parTable.charAt(0).toUpperCase() + parTable.slice(1).toLowerCase();
        var thisTs = "\n    /* \n    add to router:\n    import { " + thisTableDisp + " } from './providers/" + parTable.toLowerCase() + "';\n    private " + parTable.toLowerCase() + ": " + thisTableDisp + ";\n    this." + parTable.toLowerCase() + " = new " + thisTableDisp + "();\n    this.app.route('/" + parTable.toLowerCase() + ".php').all((req, res, next) => this." + parTable.toLowerCase() + ".routes(req, res, next));\n    */\n\n    import { Crud } from '../crud';\n    //\n    import { Request, Response, NextFunction } from \"express\";\n    import db from \"../db\";\n    import { Util } from \"../util\";\n    import { Logger } from \"../logger\";\n    //\n    const dict: Dict = " + parDict + "\n    \n    export class " + thisTableDisp + " extends Crud {\n        constructor() {\n          super(\n            dict\n          )\n        }\n      }\n    ";
        return thisTs;
    };
    Template.prototype.generate = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var thisConnection, getTables, thisTables, getDescs, results, thisHtml, swfirst;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.default.waitConnection()];
                    case 1:
                        thisConnection = _a.sent();
                        getTables = new Promise(function (resolve, reject) {
                            thisConnection.query("show tables", function (error, tableResults) {
                                if (error) {
                                    reject(error);
                                }
                                resolve(tableResults.map(function (result) { return result["Tables_in_ak2"]; }));
                            });
                        });
                        return [4 /*yield*/, getTables];
                    case 2:
                        thisTables = _a.sent();
                        getDescs = thisTables.map(function (table) {
                            return new Promise(function (resolve, reject) {
                                thisConnection.query("desc " + table, function (error, fieldResults) {
                                    if (error) {
                                        reject(error);
                                    }
                                    resolve({ table: table, fieldResults: fieldResults });
                                });
                            });
                        });
                        return [4 /*yield*/, Promise.all(getDescs)];
                    case 3:
                        results = _a.sent();
                        thisHtml = "";
                        swfirst = 1;
                        results.forEach(function (_a) {
                            var table = _a.table, fieldResults = _a.fieldResults;
                            var thisDict = "";
                            var thisSelect = "";
                            var thisWhere = "";
                            var thisUpdate = "";
                            var thisQuery = "";
                            var thisSecondField = "";
                            var thisThirdField = "";
                            thisHtml += "\n" + table;
                            //
                            // secord/third field
                            //
                            swfirst = 3;
                            fieldResults.forEach(function (field) {
                                if (swfirst == 3) {
                                    // ID
                                    swfirst = 2;
                                }
                                else if (swfirst == 2) {
                                    thisSecondField = "" + String(field.Field).toUpperCase();
                                    swfirst = 1;
                                }
                                else if (swfirst == 1) {
                                    thisThirdField = "" + String(field.Field).toUpperCase();
                                    swfirst = 0;
                                }
                            });
                            //
                            // select
                            //
                            thisSelect = "\n        {\n            row: \"ID\",\n            sql: \"" + thisSecondField + " as ID\"\n        },\n        {\n            row: \"VALUE\",\n            sql: \"" + thisThirdField + " AS VALUE\"\n        }";
                            //
                            // query
                            //
                            swfirst = 1;
                            fieldResults.forEach(function (field) {
                                var name = "";
                                var expression = "";
                                var thisField = "" + String(field.Field).toUpperCase();
                                //
                                if (swfirst == 1) {
                                    swfirst = 0;
                                }
                                else {
                                    thisQuery += ",";
                                }
                                thisQuery += "\n        {";
                                name = "" + thisField;
                                if (field.Type.indexOf("int") >= 0) {
                                    expression = "ifnull(cast(" + thisField + " as CHAR),'') as " + thisField;
                                }
                                else if (field.Type.indexOf("decimal") >= 0) {
                                    expression = "ifnull(cast(" + thisField + " as CHAR),'') as " + thisField;
                                }
                                else if (field.Type.indexOf("char") >= 0) {
                                    expression = "ifnull(" + thisField + ",'') as " + thisField;
                                }
                                else if (field.Type.indexOf("text") >= 0) {
                                    expression = "ifnull(" + thisField + ",'') as " + thisField;
                                }
                                else if (field.Type.indexOf("datetime") >= 0) {
                                    expression = "date2jsondate(" + thisField + ") as " + thisField;
                                }
                                else {
                                    expression = thisField + " as " + thisField;
                                }
                                thisQuery += "\n        row: \"" + name + "\",";
                                thisQuery += "\n        sql: \"" + expression + "\",";
                                thisQuery += "\n        }";
                            });
                            //
                            // where
                            //
                            swfirst = 1;
                            fieldResults.forEach(function (field) {
                                var query = "";
                                var expression = "";
                                var thisField = "" + String(field.Field).toUpperCase();
                                //
                                if (swfirst == 1) {
                                    swfirst = 0;
                                }
                                else {
                                    thisWhere += ",";
                                }
                                thisWhere += "\n        {";
                                query = "" + thisField;
                                if (field.Type.indexOf("int") >= 0) {
                                    expression = thisField + " = ?";
                                }
                                else if (field.Type.indexOf("decimal") >= 0) {
                                    expression = thisField + " = ?";
                                }
                                else if (field.Type.indexOf("char") >= 0) {
                                    expression = "ucase(" + thisField + ") like ucase('%?%')";
                                }
                                else if (field.Type.indexOf("text") >= 0) {
                                    expression = "ucase(" + thisField + ") like ucase('%?%')";
                                }
                                else if (field.Type.indexOf("datetime") >= 0) {
                                    expression = thisField + " > screendate2date('?')";
                                }
                                else {
                                    expression = "ucase(" + thisField + ") like ucase('%?%')";
                                }
                                //
                                thisWhere += "\n        query: \"" + query.toLowerCase() + "\",";
                                thisWhere += "\n        sql: \"" + expression + "\",";
                                thisWhere += "\n        }";
                            });
                            //
                            // update
                            //
                            swfirst = 1;
                            fieldResults.forEach(function (field) {
                                var name = "";
                                var expression = "";
                                var maxLength = "10";
                                var thisField = "" + String(field.Field).toUpperCase();
                                if (thisField != "ID") {
                                    var thisType = field.Type.split("(");
                                    if (thisType.length > 1) {
                                        thisType = thisType[1].split(")");
                                        if (thisType.length > 0) {
                                            maxLength = String(parseInt(thisType[0]));
                                        }
                                    }
                                    //
                                    if (swfirst == 1) {
                                        swfirst = 0;
                                    }
                                    else {
                                        thisUpdate += ",";
                                    }
                                    thisUpdate += "\n        {";
                                    name = "" + thisField;
                                    expression = "" + thisField;
                                    //
                                    thisUpdate += "\n        body: \"" + name + "\",";
                                    if (field.Type.indexOf("int") >= 0) {
                                        expression = "" + thisField;
                                    }
                                    else if (field.Type.indexOf("decimal") >= 0) {
                                        expression = thisField + " = '?'";
                                    }
                                    else if (field.Type.indexOf("char") >= 0) {
                                        expression = thisField + " = '?'";
                                    }
                                    else if (field.Type.indexOf("text") >= 0) {
                                        expression = thisField + " = '?'";
                                    }
                                    else if (field.Type.indexOf("datetime") >= 0) {
                                        expression = thisField + " = screendate2date('?')";
                                    }
                                    else {
                                        expression = thisField + " = '?'";
                                    }
                                    thisUpdate += "\n        sql: \"" + expression + "\",";
                                    thisUpdate += "\n        required: false,";
                                    thisUpdate += "\n        maxLength: " + maxLength + ",";
                                    thisUpdate += "\n        default: \"\",";
                                    thisUpdate += "\n        }";
                                }
                            });
                            //
                            // dict
                            //
                            thisDict += "{";
                            //
                            thisDict += "\ntable: \"" + String(table).toUpperCase() + "\",";
                            thisDict += "\nkey: [\n  {\n    body:\"" + thisSecondField + "\",\n    sql:\"" + thisSecondField + "\",\n  }\n],";
                            thisDict += "\naltKeys: [],";
                            thisDict += "\nforeignKeys: [],";
                            //
                            thisDict += "\nselect: {";
                            thisDict += "\n    orderby: \"ucase(" + thisThirdField + ")\",";
                            thisDict += "\n    where: [";
                            thisDict += "\n        {\n            query: \"value\",\n            sql: \"ucase(" + thisThirdField + ") like '%?%'\",\n        }";
                            thisDict += "\n    ],";
                            thisDict += "\n    fields: [";
                            thisDict += "" + thisSelect;
                            thisDict += "\n    ],";
                            thisDict += "\n},";
                            //
                            thisDict += "\nquery: {";
                            thisDict += "\n    orderby: \"" + thisSecondField + "\",";
                            thisDict += "\n    where: [";
                            thisDict += "" + thisWhere;
                            thisDict += "\n    ],";
                            thisDict += "\n    fields: [";
                            thisDict += "" + thisQuery;
                            thisDict += "\n    ],";
                            thisDict += "},";
                            //
                            thisDict += "\nupdate: {";
                            thisDict += "\n    fields: [";
                            thisDict += "" + thisUpdate;
                            thisDict += "\n    ],";
                            thisDict += "},";
                            //
                            thisDict += "\n}";
                            //
                            console.log("" + table);
                            //
                            fs.writeFileSync("C:/Ak2Ps/Ak2Ps_api/src/generated/" + table + ".ts", Template.makeTs(table, thisDict));
                        });
                        //
                        //
                        res.status(200).send(thisHtml);
                        return [2 /*return*/];
                }
            });
        });
    };
    return Template;
}());
exports.Template = Template;
//# sourceMappingURL=template.js.map