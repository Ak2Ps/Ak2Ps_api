"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ak2_service_1 = require("./services/ak2.service");
var Controller = /** @class */ (function () {
    function Controller(app) {
        this.app = app;
        this.ak2Service = new ak2_service_1.Ak2Service();
        this.routes();
    }
    Controller.prototype.routes = function () {
        this.app.route('/').get(this.ak2Service.welcomeMessage);
        this.app.route('/gebruiker.php');
    };
    return Controller;
}());
exports.Controller = Controller;
