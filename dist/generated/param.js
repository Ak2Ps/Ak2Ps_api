"use strict";
/*
add to router:
import { Param } from './providers/param';
private param: Param;
this.param = new Param();
this.app.route('/param.php').all((req, res, next) => this.param.routes(req, res, next));
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
    table: "PARAM",
    key: [
        {
            body: "NAAM",
            sql: "NAAM",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(INHOUD)",
        where: [
            {
                query: "value",
                sql: "ucase(INHOUD) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "NAAM as ID"
            },
            {
                row: "VALUE",
                sql: "INHOUD AS VALUE"
            }
        ],
    },
    query: {
        orderby: "NAAM",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "naam",
                sql: "NAAM like ('%?%')",
            },
            {
                query: "inhoud",
                sql: "INHOUD like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "NAAM",
                sql: "ifnull(NAAM,'') as NAAM",
            },
            {
                row: "INHOUD",
                sql: "ifnull(INHOUD,'') as INHOUD",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "NAAM",
                sql: "NAAM = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "INHOUD",
                sql: "INHOUD = '?'",
                required: false,
                maxLength: 255,
                default: "",
            }
        ],
    },
};
var Param = /** @class */ (function (_super) {
    __extends(Param, _super);
    function Param() {
        return _super.call(this, dict) || this;
    }
    return Param;
}(crud_1.Crud));
exports.Param = Param;
//# sourceMappingURL=param.js.map