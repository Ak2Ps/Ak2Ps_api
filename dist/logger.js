"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var config_1 = require("./config");
var util_1 = require("./util");
var Logger = /** @class */ (function () {
    function Logger() {
    }
    Logger.getTime = function () {
        return util_1.Util.Date2Screendatetimeseconds(new Date());
    };
    Logger.show = function (message) {
        if (typeof message == "object") {
            message = JSON.stringify(message, null, 2);
        }
        message = this.getTime() + " " + message;
        console.log(message);
    };
    Logger.add = function (message) {
        if (typeof message == "object") {
            message = JSON.stringify(message, null, 2);
        }
        try {
            fs.appendFileSync(config_1.Config.appDir + "/log/api.log", this.getTime() + " " + message + "\n");
        }
        catch (error) {
            console.log(error);
        }
    };
    Logger.reset = function () {
        try {
            fs.mkdirSync(config_1.Config.appDir + "/log");
        }
        catch (error) { }
        try {
            fs.unlinkSync(config_1.Config.appDir + "/log/api.log");
        }
        catch (error) { }
    };
    Logger.error = function (req, message) {
        if (config_1.Config.show_error) {
            var thisMessage = void 0;
            var thisPath = void 0;
            if (typeof req == "string") {
                thisMessage = req;
                thisPath = '';
            }
            else {
                thisMessage = message;
                try {
                    thisPath = req.path;
                }
                catch (error) {
                    thisPath = '???';
                }
            }
            this.show(thisMessage);
            this.add(thisMessage);
            if (req !== undefined) {
                try {
                    fs.appendFileSync(config_1.Config.appDir + "/log/error.log", this.getTime() + " " + thisMessage + "\n");
                }
                catch (error) {
                    console.log(error);
                }
            }
        }
    };
    Logger.warning = function (message) {
        if (config_1.Config.show_warning) {
            this.show(message);
            this.add(message);
        }
    };
    Logger.info = function (message) {
        if (config_1.Config.show_info) {
            this.show(message);
            this.add(message);
        }
    };
    Logger.sql = function (message) {
        if (config_1.Config.show_sql) {
            this.show("\n<sql>\n" + message + "\n</sql>\n");
            this.add("\n<sql>\n" + message + "\n</sql>\n");
        }
    };
    Logger.test = function (message) {
        if (config_1.Config.runmode == "test" /* test */) {
            this.show(message);
            this.add(message);
        }
    };
    Logger.request = function (req) {
        if (config_1.Config.runmode == "test" /* test */) {
            var swadd = 1;
            var message = req.method + " " + req.path + " " + (req.query.action || '');
            switch (req.path) {
                case "/gebruikertijd.php":
                    swadd = 0;
                    break;
                default:
                    break;
            }
            this.show(message);
            if (swadd == 1) {
                this.add(message);
            }
        }
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map