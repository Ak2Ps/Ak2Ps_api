"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var express_1 = __importDefault(require("express"));
var router_1 = require("./router");
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var db_1 = __importDefault(require("./db"));
var logger_1 = require("./logger");
var frontware_1 = require("./frontware");
var express_fileUpload_1 = __importDefault(require("express-fileUpload"));
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors_1.default());
        this.app.use(express_fileUpload_1.default());
        //
        // Ak2
        //
        this.config = new config_1.Config();
        db_1.default.start();
        logger_1.Logger.reset();
        this.app.use(frontware_1.Frontware.frontware);
        this.router = new router_1.Router(this.app);
        //
        var server = this.app.listen(config_1.Config.serverPort, function () {
            logger_1.Logger.info("Ak2 is listening for " + config_1.Config.appUrl + " on port " + config_1.Config.serverPort + " ...");
            process.title = "Ak2: " + config_1.Config.appUrl + ", " + config_1.Config.serverPort;
        });
        server.setTimeout(3600000);
    }
    return App;
}());
//
// start
//
new App();
//# sourceMappingURL=server.js.map