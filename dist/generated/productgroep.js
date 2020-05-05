"use strict";
/*
add to router:
import { Productgroep } from './providers/productgroep';
private productgroep: Productgroep;
this.productgroep = new Productgroep();
this.app.route('/productgroep.php').all((req, res, next) => this.productgroep.routes(req, res, next));
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
    table: "PRODUCTGROEP",
    key: [
        {
            body: "PRODUCTGROEP",
            sql: "PRODUCTGROEP",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(METONDERDELEN)",
        where: [
            {
                query: "value",
                sql: "ucase(METONDERDELEN) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTGROEP as ID"
            },
            {
                row: "VALUE",
                sql: "METONDERDELEN AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTGROEP",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "productgroep",
                sql: "PRODUCTGROEP like ('%?%')",
            },
            {
                query: "metonderdelen",
                sql: "METONDERDELEN like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "PRODUCTGROEP",
                sql: "ifnull(PRODUCTGROEP,'') as PRODUCTGROEP",
            },
            {
                row: "METONDERDELEN",
                sql: "ifnull(METONDERDELEN,'') as METONDERDELEN",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "PRODUCTGROEP",
                sql: "PRODUCTGROEP = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "METONDERDELEN",
                sql: "METONDERDELEN = '?'",
                required: false,
                maxLength: 1,
                default: "",
            }
        ],
    },
};
var Productgroep = /** @class */ (function (_super) {
    __extends(Productgroep, _super);
    function Productgroep() {
        return _super.call(this, dict) || this;
    }
    return Productgroep;
}(crud_1.Crud));
exports.Productgroep = Productgroep;
//# sourceMappingURL=productgroep.js.map