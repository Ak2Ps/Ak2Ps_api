"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mysql_1 = __importDefault(require("mysql"));
var config_1 = require("./config");
var logger_1 = require("./logger");
var Db = /** @class */ (function () {
    function Db() {
        this.pool = undefined;
    }
    Db.prototype.start = function () {
        this.pool = mysql_1.default.createPool({
            host: config_1.Config.dbhost,
            user: config_1.Config.dbuser,
            password: config_1.Config.dbpassword,
            database: config_1.Config.dbschema,
            connectionLimit: 100,
            multipleStatements: true
        });
    };
    Db.prototype.waitPoolstatus = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var thisLimit = _this.pool.config.connectionLimit;
            var thisCount = _this.pool._allConnections.length;
            var thisFree = _this.pool._freeConnections.length;
            var result = {
                max: thisLimit,
                created: thisCount,
                free: thisFree,
            };
            var thisMessage = "Connectionpool max: " + thisLimit + ", created: " + thisCount + " free: " + thisFree;
            logger_1.Logger.info(thisMessage);
            resolve(result);
        });
    };
    Db.prototype.waitConnection = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var thisLimit = _this.pool.config.connectionLimit;
            var thisCount = _this.pool._allConnections.length;
            var thisFree = _this.pool._freeConnections.length;
            if (thisCount >= (thisLimit - 5)) {
                var thisMessage = "Connectionpool warning: max: " + thisLimit + ", created: " + thisCount + " free: " + thisFree;
                console.log(thisMessage);
                logger_1.Logger.warning(thisMessage);
            }
            if (thisCount >= thisLimit && thisFree <= 0) {
                var thisMessage = "Connectionpool overflow: max: " + thisLimit + ", created: " + thisCount + " free: " + thisFree;
                console.log(thisMessage);
                logger_1.Logger.error(thisMessage);
            }
            _this.pool.getConnection(function (err, connection) {
                if (err) {
                    logger_1.Logger.error(JSON.stringify(err));
                    reject(err);
                }
                resolve(connection);
            });
        });
    };
    Db.prototype.waitQuery = function (connection, sql) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            logger_1.Logger.sql(sql);
            connection.query(sql, function (err, rows) {
                if (err) {
                    logger_1.Logger.error(JSON.stringify(err));
                    logger_1.Logger.error(sql);
                    reject(err);
                }
                if (Array.isArray(rows)) {
                    rows = _this.fixRows(rows);
                }
                resolve(rows);
            });
        });
    };
    Db.prototype.waitDDL = function (connection, sql) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            logger_1.Logger.sql(sql);
            connection.query(sql, function (err, rows) {
                if (err) {
                    logger_1.Logger.error(JSON.stringify(err));
                    logger_1.Logger.error(sql);
                    resolve(err);
                }
                if (Array.isArray(rows)) {
                    rows = _this.fixRows(rows);
                }
                resolve(rows);
            });
        });
    };
    Db.prototype.waitQuerySilent = function (connection, sql) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            connection.query(sql, function (err, rows) {
                if (err) {
                    reject("Error in silent query ...");
                }
                if (Array.isArray(rows)) {
                    rows = _this.fixRows(rows);
                }
                resolve(rows);
            });
        });
    };
    Db.prototype.fix = function (instring) {
        if (!instring) {
            return "";
        }
        instring = String(instring);
        if (instring.toUpperCase() == "UNDEFINED") {
            return "";
        }
        if (instring.toUpperCase() == "NULL") {
            return "";
        }
        return instring.replace(/'/gi, "''");
    };
    Db.prototype.editorfix = function (instring) {
        if (!instring) {
            return "";
        }
        instring = String(instring);
        return instring;
    };
    Db.prototype.fixRows = function (rows) {
        var _this = this;
        var result = [];
        rows.forEach(function (element) {
            result.push(_this.fixRow(element));
        });
        return result;
    };
    Db.prototype.fixRow = function (row) {
        var result = {};
        for (var key in row) {
            var value = row[key];
            if (value == null) {
                value = "";
            }
            if (typeof value == "string") {
                value = value.trimRight();
            }
            else if (typeof value == "number") {
                value = String(value);
                value = value.trimRight();
            }
            else {
                try {
                    var yyyy = String(value.getFullYear());
                    var mm = String(Number(value.getMonth()) + 1);
                    while (mm.length < 2) {
                        mm = "0" + mm;
                    }
                    var dd = String(value.getDate());
                    while (dd.length < 2) {
                        dd = "0" + dd;
                    }
                    var hh = String(value.getHours());
                    while (hh.length < 2) {
                        hh = "0" + hh;
                    }
                    var mi = String(value.getMinutes());
                    while (mi.length < 2) {
                        mi = "0" + mi;
                    }
                    var ss = String(value.getSeconds());
                    while (ss.length < 2) {
                        ss = "0" + ss;
                    }
                    value = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + ss;
                }
                catch (error) {
                    logger_1.Logger.error(undefined, "fixRow error: " + JSON.stringify(error, null, 2));
                    logger_1.Logger.error(undefined, "key: [" + key + "=" + String(value) + "]");
                    logger_1.Logger.error(undefined, 'row: ' + JSON.stringify(row, null, 2));
                }
            }
            value = String(value);
            result[String(key).toUpperCase()] = value;
        }
        return result;
    };
    Db.prototype.fixQuery = function (query) {
        for (var key in query) {
            var value = query[key];
            if (value == null) {
                value = "";
            }
            value = this.fix(value);
            query[key] = value;
        }
        return query;
    };
    Db.prototype.fixBody = function (body) {
        for (var key in body) {
            var value = body[key];
            if (value == null) {
                value = "";
            }
            value = this.fix(value);
            body[key] = value;
        }
        return body;
    };
    Db.prototype.getDataId = function (req) {
        var words = String(req.url).split("/");
        return words[words.length - 1];
    };
    Db.prototype.getInsertId = function (result) {
        var id = result.insertId;
        return id;
    };
    return Db;
}());
exports.default = new Db();
//# sourceMappingURL=db.js.map