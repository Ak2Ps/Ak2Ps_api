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
exports.Retourgebruiker = void 0;
var crud_1 = require("../crud");
var dict = {
    table: "RETOURGEBRUIKER",
    key: [
        {
            body: "GEBRUIKER",
            sql: "GEBRUIKER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(GEBRUIKER)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "GEBRUIKER as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "GEBRUIKER",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "gebruiker",
                sql: "ucase(GEBRUIKER) like ucase('?%')",
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
                row: "GEBRUIKER",
                sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
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
                body: "GEBRUIKER",
                sql: "GEBRUIKER",
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
var Retourgebruiker = /** @class */ (function (_super) {
    __extends(Retourgebruiker, _super);
    function Retourgebruiker() {
        return _super.call(this, dict) || this;
    }
    return Retourgebruiker;
}(crud_1.Crud));
exports.Retourgebruiker = Retourgebruiker;
//# sourceMappingURL=retourgebruiker.js.map