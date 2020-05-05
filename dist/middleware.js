"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var Middelware = /** @class */ (function () {
    function Middelware() {
    }
    Middelware.middleware = function (req, res, next) {
        req.ak2_app = req.query.app;
        req.query.callnr = undefined;
        req.ak2_token = req.query.token;
        req.query.token = undefined;
        req.ak2_user = req.query.user;
        req.query.user = undefined;
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
        else {
            if (req.ak2_app != config_1.Config.app) {
                res.status(401).send("Unauthorized");
                return;
            }
        }
        next();
    };
    return Middelware;
}());
exports.Middelware = Middelware;
//# sourceMappingURL=middleware.js.map