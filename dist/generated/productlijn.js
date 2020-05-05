"use strict";
/*
add to router:
import { Productlijn } from './providers/productlijn';
private productlijn: Productlijn;
this.productlijn = new Productlijn();
this.app.route('/productlijn.php').all((req, res, next) => this.productlijn.routes(req, res, next));
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
    table: "PRODUCTLIJN",
    key: [
        {
            body: "PRODUCTLIJN",
            sql: "PRODUCTLIJN",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(PRODUCTLIJNNAAM)",
        where: [
            {
                query: "value",
                sql: "ucase(PRODUCTLIJNNAAM) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTLIJN as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTLIJNNAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTLIJN",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "productlijn",
                sql: "PRODUCTLIJN like ('%?%')",
            },
            {
                query: "productlijnnaam",
                sql: "PRODUCTLIJNNAAM like ('%?%')",
            },
            {
                query: "productielijn",
                sql: "PRODUCTIELIJN like ('%?%')",
            },
            {
                query: "productielijnnaam",
                sql: "PRODUCTIELIJNNAAM like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "PRODUCTLIJN",
                sql: "ifnull(PRODUCTLIJN,'') as PRODUCTLIJN",
            },
            {
                row: "PRODUCTLIJNNAAM",
                sql: "ifnull(PRODUCTLIJNNAAM,'') as PRODUCTLIJNNAAM",
            },
            {
                row: "PRODUCTIELIJN",
                sql: "ifnull(PRODUCTIELIJN,'') as PRODUCTIELIJN",
            },
            {
                row: "PRODUCTIELIJNNAAM",
                sql: "ifnull(PRODUCTIELIJNNAAM,'') as PRODUCTIELIJNNAAM",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "PRODUCTLIJN",
                sql: "PRODUCTLIJN = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRODUCTLIJNNAAM",
                sql: "PRODUCTLIJNNAAM = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRODUCTIELIJN",
                sql: "PRODUCTIELIJN = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRODUCTIELIJNNAAM",
                sql: "PRODUCTIELIJNNAAM = '?'",
                required: false,
                maxLength: 50,
                default: "",
            }
        ],
    },
};
var Productlijn = /** @class */ (function (_super) {
    __extends(Productlijn, _super);
    function Productlijn() {
        return _super.call(this, dict) || this;
    }
    return Productlijn;
}(crud_1.Crud));
exports.Productlijn = Productlijn;
//# sourceMappingURL=productlijn.js.map