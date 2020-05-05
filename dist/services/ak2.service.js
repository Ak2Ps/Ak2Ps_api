"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ak2Service = /** @class */ (function () {
    function Ak2Service() {
    }
    Ak2Service.prototype.welcomeMessage = function (req, res) {
        return res.status(200).send("Ak2 API is listening ...");
    };
    return Ak2Service;
}());
exports.Ak2Service = Ak2Service;
