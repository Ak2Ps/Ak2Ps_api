"use strict";
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
exports.Lijn = void 0;
var crud_1 = require("../crud");
var dict = {
    table: "\n(\nselect distinct \nID,\nrtrim(VALUE) as VALUE from (\nselect ifnull(productlijn,'') as ID, concat(ifnull(productlijn,''),' ', ifnull(productlijnnaam,'')) as VALUE\nfrom PRODUCTLIJN\nunion\nselect ifnull(productielijn,'') , max(concat(ifnull(productielijn,''),' ', ifnull(productielijnnaam,'')))\nfrom PRODUCTLIJN \ngroup by productielijn\n) base ) lijn",
    key: [
        {
            body: "ID",
            sql: "ID",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ID",
        where: [
            {
                query: "value",
                sql: "ucase(PRODUCTLIJNNAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ID"
            },
            {
                row: "VALUE",
                sql: "VALUE"
            }
        ],
    },
    query: {
        orderby: "ID",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "value",
                sql: "ucase(value) like ucase('%?%')",
            },
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(ID,'') as ID",
            },
            {
                row: "VALUE",
                sql: "ifnull(VALUE,'') as VALUE",
            },
        ],
    },
};
var Lijn = /** @class */ (function (_super) {
    __extends(Lijn, _super);
    function Lijn() {
        return _super.call(this, dict) || this;
    }
    return Lijn;
}(crud_1.Crud));
exports.Lijn = Lijn;
//# sourceMappingURL=lijn.js.map