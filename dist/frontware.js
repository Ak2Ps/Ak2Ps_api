"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Frontware = void 0;
var config_1 = require("./config");
var Frontware = /** @class */ (function () {
    function Frontware() {
    }
    Frontware.frontware = function (req, res, next) {
        req.ak2_app = String(req.query.app);
        delete req.query.callnr;
        req.ak2_token = String(req.query.token);
        delete req.query.token;
        req.ak2_user = String(req.query.user);
        delete req.query.user;
        //
        res.crudResult = { success: true, messages: [] };
        //
        if (req.path.indexOf("/handtekening/") == 0) {
        }
        else if (req.path.indexOf("/favicon.ico") == 0) {
        }
        else if (req.path.indexOf("/pdf/") == 0) {
        }
        else if (req.path.indexOf("/ecmtester") == 0) {
        }
        else if (req.path.indexOf("/setcode") == 0) {
        }
        else if (req.path.indexOf("/getcode") == 0) {
        }
        else if (req.path.indexOf("/status") == 0) {
        }
        else {
            if (req.ak2_app != config_1.Config.app) {
                res.status(401).send("Unauthorized");
                return;
            }
        }
        next();
    };
    return Frontware;
}());
exports.Frontware = Frontware;
//# sourceMappingURL=frontware.js.map