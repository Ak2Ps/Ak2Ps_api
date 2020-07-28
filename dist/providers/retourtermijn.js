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
exports.Retourtermijn = void 0;
var crud_1 = require("../crud");
var dict = {
    table: "RETOURTERMIJN",
    key: [
        {
            body: "RETOURTERMIJN",
            sql: "RETOURTERMIJN",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(RETOURTERMIJN)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "RETOURTERMIJN as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "RETOURTERMIJN",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "retourtermijn",
                sql: "ucase(RETOURTERMIJN) like ucase('%?%')",
            },
            {
                query: "naam",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "RETOURTERMIJN",
                sql: "ifnull(RETOURTERMIJN,'') as RETOURTERMIJN",
            },
            {
                row: "NAAM",
                sql: "ifnull(NAAM,'') as NAAM",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "RETOURTERMIJN",
                sql: "RETOURTERMIJN = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "NAAM",
                sql: "NAAM = '?'",
                required: false,
                maxLength: 50,
                default: "",
            }
        ],
    },
};
var Retourtermijn = /** @class */ (function (_super) {
    __extends(Retourtermijn, _super);
    function Retourtermijn() {
        return _super.call(this, dict) || this;
    }
    return Retourtermijn;
}(crud_1.Crud));
exports.Retourtermijn = Retourtermijn;
//# sourceMappingURL=retourtermijn.js.map