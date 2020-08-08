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
exports.Retouractietype = void 0;
var crud_1 = require("../crud");
var dict = {
    table: "RETOURACTIETYPE",
    key: [
        {
            body: "ACTIE",
            sql: "ACTIE",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(ACTIE)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ACTIE as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "ucase(ACTIE)",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "actie",
                sql: "ucase(ACTIE) like ucase('?%')",
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
                row: "ACTIE",
                sql: "ifnull(ACTIE,'') as ACTIE",
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
                body: "ACTIE",
                sql: "ACTIE",
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
var Retouractietype = /** @class */ (function (_super) {
    __extends(Retouractietype, _super);
    function Retouractietype() {
        return _super.call(this, dict) || this;
    }
    return Retouractietype;
}(crud_1.Crud));
exports.Retouractietype = Retouractietype;
//# sourceMappingURL=retouractietype.js.map