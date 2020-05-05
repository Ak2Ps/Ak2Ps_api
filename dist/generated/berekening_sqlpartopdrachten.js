"use strict";
/*
add to router:
import { Berekening_sqlpartopdrachten } from './providers/berekening_sqlpartopdrachten';
private berekening_sqlpartopdrachten: Berekening_sqlpartopdrachten;
this.berekening_sqlpartopdrachten = new Berekening_sqlpartopdrachten();
this.app.route('/berekening_sqlpartopdrachten.php').all((req, res, next) => this.berekening_sqlpartopdrachten.routes(req, res, next));
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
    table: "BEREKENING_SQLPARTOPDRACHTEN",
    key: [
        {
            body: "PRODUCTNUMMER",
            sql: "PRODUCTNUMMER",
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
                sql: "PRODUCTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: " AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTNUMMER",
        where: [
            {
                query: "sqlpartopdrachten",
                sql: "SQLPARTOPDRACHTEN = ?",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            }
        ],
        fields: [
            {
                row: "SQLPARTOPDRACHTEN",
                sql: "ifnull(cast(SQLPARTOPDRACHTEN as CHAR),'') as SQLPARTOPDRACHTEN",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "SQLPARTOPDRACHTEN",
                sql: "SQLPARTOPDRACHTEN",
                required: false,
                maxLength: 21,
                default: "",
            },
            {
                body: "PRODUCTNUMMER",
                sql: "PRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            }
        ],
    },
};
var Berekening_sqlpartopdrachten = /** @class */ (function (_super) {
    __extends(Berekening_sqlpartopdrachten, _super);
    function Berekening_sqlpartopdrachten() {
        return _super.call(this, dict) || this;
    }
    return Berekening_sqlpartopdrachten;
}(crud_1.Crud));
exports.Berekening_sqlpartopdrachten = Berekening_sqlpartopdrachten;
//# sourceMappingURL=berekening_sqlpartopdrachten.js.map