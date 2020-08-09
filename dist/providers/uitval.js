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
exports.Uitval = void 0;
var crud_1 = require("../crud");
var dict = {
    table: "UITVAL",
    key: [
        {
            body: "UITVAL",
            sql: "UITVAL"
        }
    ],
    altKeys: [],
    select: {
        orderby: "UITVAL",
        where: [],
        fields: [
            {
                row: "ID",
                sql: "UITVAL as ID"
            },
            {
                row: "VALUE",
                sql: "concat(uitval,' ',naam) as VALUE"
            }
        ]
    },
    query: {
        orderby: "UITVAL",
        where: [
            {
                query: "naam",
                sql: "ucase(naam) like ucase('%?%')"
            },
            {
                query: "uitval",
                sql: "uitval = '?'"
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "cast(Id as CHAR) as ID"
            },
            {
                row: "UITVAL",
                sql: "ifnull(Uitval,'') as UITVAL"
            },
            {
                row: "NAAM",
                sql: "ifnull(Naam,'') as NAAM"
            },
            {
                row: "KLEUR",
                sql: "ifnull(Kleur,'') as KLEUR"
            },
            {
                row: "UITVALSOORT",
                sql: "ifnull(Uitvalsoort,'') as UITVALSOORT"
            },
            {
                row: "LANGENAAM",
                sql: "RTRIM(ifnull(concat(uitval,' ',naam),'')) as LANGENAAM"
            }
        ]
    },
    update: {
        fields: [
            {
                body: "UITVAL",
                sql: "UITVAL",
                required: true,
                maxLength: 1,
                default: ""
            },
            {
                body: "NAAM",
                sql: "NAAM",
                required: true,
                maxLength: 50,
                default: ""
            },
            {
                body: "KLEUR",
                sql: "KLEUR",
                required: false,
                maxLength: 50,
                default: ""
            },
            {
                body: "UITVALSOORT",
                sql: "UITVALSOORT",
                required: true,
                maxLength: 50,
                default: ""
            }
        ]
    }
};
var Uitval = /** @class */ (function (_super) {
    __extends(Uitval, _super);
    function Uitval() {
        return _super.call(this, dict) || this;
    }
    return Uitval;
}(crud_1.Crud));
exports.Uitval = Uitval;
//# sourceMappingURL=uitval.js.map