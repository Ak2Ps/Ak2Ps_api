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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
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
    Logger.test = function (req, message) {
        var thisStack = '';
        var thisPath = '';
        var thisBody = '';
        var thisQuery = '';
        try {
            throw new Error('');
        }
        catch (error) {
            thisStack = "stack: " + error.stack + "\n";
        }
        if (typeof req == "string") {
            thisPath = '';
            thisBody = '';
            thisQuery = '';
        }
        else {
            try {
                thisPath = "path: " + req.path + "\n";
                thisBody = "body: " + JSON.stringify(req.body) + "\n";
                thisQuery = "query: " + JSON.stringify(req.query) + "\n";
            }
            catch (error) {
                thisPath = '???';
                thisBody = '???';
                thisQuery = '???';
            }
        }
        message += "\n" + thisPath + thisQuery + thisBody + thisStack;
        this.show(message);
        this.add(message);
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