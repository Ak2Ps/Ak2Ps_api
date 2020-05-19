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
var dict = {
    table: "AFDELING",
    key: [
        {
            body: "AFDELING",
            sql: "AFDELING"
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "AFDELING",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')"
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "AFDELING as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ]
    },
    query: {
        orderby: "AFDELING",
        where: [
            {
                query: "ID",
                sql: "ID = ?"
            },
            {
                query: "afdeling",
                sql: "ucase(AFDELING) like ucase('%?%')"
            },
            {
                query: "naam",
                sql: "ucase(NAAM) like ucase('%?%')"
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "cast(ID as CHAR) as ID"
            },
            {
                row: "AFDELING",
                sql: "ifnull(AFDELING,'') as AFDELING"
            },
            {
                row: "NAAM",
                sql: "ifnull(NAAM,'') as NAAM"
            }
        ]
    },
    update: {
        fields: [
            {
                body: "AFDELING",
                sql: "AFDELING",
                required: true,
                maxLength: 3,
                default: ""
            },
            {
                body: "NAAM",
                sql: "NAAM",
                required: true,
                maxLength: 50,
                default: ""
            }
        ]
    }
};
var Afdeling = /** @class */ (function (_super) {
    __extends(Afdeling, _super);
    function Afdeling() {
        return _super.call(this, dict) || this;
    }
    return Afdeling;
}(crud_1.Crud));
exports.Afdeling = Afdeling;
//# sourceMappingURL=afdeling.js.map