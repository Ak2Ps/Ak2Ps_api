"use strict";
/*
add to router:
import { Menuregel_2015 } from './providers/menuregel_2015';
private menuregel_2015: Menuregel_2015;
this.menuregel_2015 = new Menuregel_2015();
this.app.route('/menuregel_2015.php').all((req, res, next) => this.menuregel_2015.routes(req, res, next));
*/
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
        orderby: "ucase(VOLGNUMMER)",
        where: [
            {
                query: "value",
                sql: "ucase(VOLGNUMMER) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "MENU as ID"
            },
            {
                row: "VALUE",
                sql: "VOLGNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "MENU",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "menu",
                sql: "MENU like ('%?%')",
            },
            {
                query: "volgnummer",
                sql: "VOLGNUMMER = ?",
            },
            {
                query: "omschrijving",
                sql: "OMSCHRIJVING like ('%?%')",
            },
            {
                query: "submenu",
                sql: "SUBMENU like ('%?%')",
            },
            {
                query: "link",
                sql: "LINK like ('%?%')",
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
                sql: "MENU = '?'",
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
                sql: "OMSCHRIJVING = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "SUBMENU",
                sql: "SUBMENU = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "LINK",
                sql: "LINK = '?'",
                required: false,
                maxLength: 255,
                default: "",
            }
        ],
    },
};
var Menuregel_2015 = /** @class */ (function (_super) {
    __extends(Menuregel_2015, _super);
    function Menuregel_2015() {
        return _super.call(this, dict) || this;
    }
    return Menuregel_2015;
}(crud_1.Crud));
exports.Menuregel_2015 = Menuregel_2015;
//# sourceMappingURL=menuregel_2015.js.map