"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cors_1 = __importDefault(require("cors"));
var controller_1 = require("./controller");
var App = /** @class */ (function () {
    function App() {
        this.app = express_1.default();
        this.setConfig();
        //
        this.controller = new controller_1.Controller(this.app);
    }
    App.prototype.setConfig = function () {
        //Allows us to receive requests with data in json format
        this.app.use(body_parser_1.default.json({ limit: '50mb' }));
        //Allows us to receive requests with data in x-www-form-urlencoded format
        this.app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true }));
        //Enables cors   
        this.app.use(cors_1.default());
    };
    return App;
}());
exports.default = new App().app;
