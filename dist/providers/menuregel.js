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
exports.Menuregel = void 0;
var crud_1 = require("../crud");
var dict = {
    table: "MENUREGEL_2015",
    key: [
        {
            body: "MENU",
            sql: "MENU",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "menu,cast(volgnummer as decimal)",
        where: [
            {
                query: "value",
                sql: "ucase(menu) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "MENU as ID"
            },
            {
                row: "VALUE",
                sql: "OMSCHRIJVING AS VALUE"
            }
        ],
    },
    query: {
        orderby: "menu,cast(volgnummer as decimal)",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "menu",
                sql: "ucase(MENU) like ucase('?%')",
            },
            {
                query: "volgnummer",
                sql: "VOLGNUMMER = ?",
            },
            {
                query: "omschrijving",
                sql: "ucase(OMSCHRIJVING) like ucase('?%')",
            },
            {
                query: "submenu",
                sql: "ucase(SUBMENU) like ucase('?%')",
            },
            {
                query: "link",
                sql: "ucase(LINK) like ucase('?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "MENU",
                sql: "ifnull(MENU,'') as MENU",
            },
            {
                row: "VOLGNUMMER",
                sql: "ifnull(cast(VOLGNUMMER as CHAR),'') as VOLGNUMMER",
            },
            {
                row: "OMSCHRIJVING",
                sql: "ifnull(OMSCHRIJVING,'') as OMSCHRIJVING",
            },
            {
                row: "SUBMENU",
                sql: "ifnull(SUBMENU,'') as SUBMENU",
            },
            {
                row: "LINK",
                sql: "ifnull(LINK,'') as LINK",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "MENU",
                sql: "MENU",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "VOLGNUMMER",
                sql: "VOLGNUMMER",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "OMSCHRIJVING",
                sql: "OMSCHRIJVING",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "SUBMENU",
                sql: "SUBMENU",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "LINK",
                sql: "LINK",
                required: false,
                maxLength: 255,
                default: "",
            }
        ],
    },
};
var Menuregel = /** @class */ (function (_super) {
    __extends(Menuregel, _super);
    function Menuregel() {
        return _super.call(this, dict) || this;
    }
    return Menuregel;
}(crud_1.Crud));
exports.Menuregel = Menuregel;
//# sourceMappingURL=menuregel.js.map