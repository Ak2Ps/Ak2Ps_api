"use strict";
/*
add to router:
import { Bb } from './providers/bb';
private bb: Bb;
this.bb = new Bb();
this.app.route('/bb.php').all((req, res, next) => this.bb.routes(req, res, next));
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
    table: "BB",
    key: [
        {
            body: "BB",
            sql: "BB",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(OMSCHRIJVING)",
        where: [
            {
                query: "value",
                sql: "ucase(OMSCHRIJVING) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "BB as ID"
            },
            {
                row: "VALUE",
                sql: "OMSCHRIJVING AS VALUE"
            }
        ],
    },
    query: {
        orderby: "BB",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "bb",
                sql: "BB like ('%?%')",
            },
            {
                query: "omschrijving",
                sql: "OMSCHRIJVING like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "BB",
                sql: "ifnull(BB,'') as BB",
            },
            {
                row: "OMSCHRIJVING",
                sql: "ifnull(OMSCHRIJVING,'') as OMSCHRIJVING",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "BB",
                sql: "BB = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "OMSCHRIJVING",
                sql: "OMSCHRIJVING = '?'",
                required: false,
                maxLength: 255,
                default: "",
            }
        ],
    },
};
var Bb = /** @class */ (function (_super) {
    __extends(Bb, _super);
    function Bb() {
        return _super.call(this, dict) || this;
    }
    return Bb;
}(crud_1.Crud));
exports.Bb = Bb;
//# sourceMappingURL=bb.js.map