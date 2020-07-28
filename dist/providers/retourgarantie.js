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
exports.Retourgarantie = void 0;
var crud_1 = require("../crud");
var dict = {
    table: "RETOURGARANTIE",
    key: [
        {
            body: "GARANTIE",
            sql: "GARANTIE",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(GARANTIE)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "GARANTIE as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "ucase(GARANTIE)",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "garantie",
                sql: "ucase(GARANTIE) like ucase('?%')",
            },
            {
                query: "naam",
                sql: "ucase(NAAM) like ucase('?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "GARANTIE",
                sql: "ifnull(GARANTIE,'') as GARANTIE",
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
                body: "GARANTIE",
                sql: "GARANTIE",
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
var Retourgarantie = /** @class */ (function (_super) {
    __extends(Retourgarantie, _super);
    function Retourgarantie() {
        return _super.call(this, dict) || this;
    }
    return Retourgarantie;
}(crud_1.Crud));
exports.Retourgarantie = Retourgarantie;
//# sourceMappingURL=retourgarantie.js.map