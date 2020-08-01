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
var crud_1 = require("../crud");
//
var dict = {
    table: "PLANSOORT",
    key: [
        {
            body: "SOORT",
            sql: "SOORT",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(NAAM)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "SOORT as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "SOORT",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "soort",
                sql: "ucase(SOORT) like ucase('%?%')",
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
                row: "SOORT",
                sql: "ifnull(SOORT,'') as SOORT",
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
                body: "SOORT",
                sql: "SOORT = '?'",
                required: false,
                maxLength: 3,
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
var Plansoort = /** @class */ (function (_super) {
    __extends(Plansoort, _super);
    function Plansoort() {
        return _super.call(this, dict) || this;
    }
    return Plansoort;
}(crud_1.Crud));
exports.Plansoort = Plansoort;
//# sourceMappingURL=plansoort.js.map