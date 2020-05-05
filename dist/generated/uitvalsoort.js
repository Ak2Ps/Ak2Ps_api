"use strict";
/*
add to router:
import { Uitvalsoort } from './providers/uitvalsoort';
private uitvalsoort: Uitvalsoort;
this.uitvalsoort = new Uitvalsoort();
this.app.route('/uitvalsoort.php').all((req, res, next) => this.uitvalsoort.routes(req, res, next));
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var crud_1 = require("../crud");
//
var dict = {
    table: "UITVALSOORT",
    key: [
        {
            body: "",
            sql: "",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase()",
        where: [
            {
                query: "value",
                sql: "ucase() like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: " as ID"
            },
            {
                row: "VALUE",
                sql: " AS VALUE"
            }
        ],
    },
    query: {
        orderby: "",
        where: [
            {
                query: "value",
                sql: "VALUE like ('%?%')",
            }
        ],
        fields: [
            {
                row: "VALUE",
                sql: "ifnull(VALUE,'') as VALUE",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "VALUE",
                sql: "VALUE = '?'",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Uitvalsoort = /** @class */ (function (_super) {
    __extends(Uitvalsoort, _super);
    function Uitvalsoort() {
        return _super.call(this, dict) || this;
    }
    return Uitvalsoort;
}(crud_1.Crud));
exports.Uitvalsoort = Uitvalsoort;
//# sourceMappingURL=uitvalsoort.js.map