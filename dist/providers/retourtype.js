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
exports.Retourtype = void 0;
var crud_1 = require("../crud");
var dict = {
    table: "RETOURTYPE",
    key: [
        {
            body: "RETOURTYPE",
            sql: "RETOURTYPE",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(RETOURTYPE)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "RETOURTYPE as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "RETOURTYPE",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "retourtype",
                sql: "ucase(RETOURTYPE) like ucase('%?%')",
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
                row: "RETOURTYPE",
                sql: "ifnull(RETOURTYPE,'') as RETOURTYPE",
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
                body: "RETOURTYPE",
                sql: "RETOURTYPE",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "NAAM",
                sql: "NAAM",
                required: false,
                maxLength: 50,
                default: "",
            }
        ],
    },
};
var Retourtype = /** @class */ (function (_super) {
    __extends(Retourtype, _super);
    function Retourtype() {
        return _super.call(this, dict) || this;
    }
    return Retourtype;
}(crud_1.Crud));
exports.Retourtype = Retourtype;
//# sourceMappingURL=retourtype.js.map