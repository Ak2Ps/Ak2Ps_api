"use strict";
/*
add to router:
import { Afdeling } from './providers/afdeling';
private afdeling: Afdeling;
this.afdeling = new Afdeling();
this.app.route('/afdeling.php').all((req, res, next) => this.afdeling.routes(req, res, next));
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
    table: "AFDELING",
    key: [
        {
            body: "AFDELING",
            sql: "AFDELING",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(NAAM)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like '%?%'",
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
        ],
    },
    query: {
        orderby: "AFDELING",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "afdeling",
                sql: "AFDELING like ('%?%')",
            },
            {
                query: "naam",
                sql: "NAAM like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "AFDELING",
                sql: "ifnull(AFDELING,'') as AFDELING",
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
                body: "AFDELING",
                sql: "AFDELING = '?'",
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
var Afdeling = /** @class */ (function (_super) {
    __extends(Afdeling, _super);
    function Afdeling() {
        return _super.call(this, dict) || this;
    }
    return Afdeling;
}(crud_1.Crud));
exports.Afdeling = Afdeling;
//# sourceMappingURL=afdeling.js.map