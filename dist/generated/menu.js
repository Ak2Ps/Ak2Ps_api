"use strict";
/*
add to router:
import { Menu } from './providers/menu';
private menu: Menu;
this.menu = new Menu();
this.app.route('/menu.php').all((req, res, next) => this.menu.routes(req, res, next));
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
    table: "MENU",
    key: [
        {
            body: "MENU",
            sql: "MENU",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase()",
        where: [
            {
                query: "value",
                sql: "ucase() like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "MENU as ID"
            },
            {
                row: "VALUE",
                sql: " AS VALUE"
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
            }
        ],
    },
};
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        return _super.call(this, dict) || this;
    }
    return Menu;
}(crud_1.Crud));
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map