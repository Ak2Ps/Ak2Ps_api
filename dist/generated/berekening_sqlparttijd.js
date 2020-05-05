"use strict";
/*
add to router:
import { Berekening_sqlparttijd } from './providers/berekening_sqlparttijd';
private berekening_sqlparttijd: Berekening_sqlparttijd;
this.berekening_sqlparttijd = new Berekening_sqlparttijd();
this.app.route('/berekening_sqlparttijd.php').all((req, res, next) => this.berekening_sqlparttijd.routes(req, res, next));
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
    table: "BEREKENING_SQLPARTTIJD",
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
                query: "sqlparttijd",
                sql: "SQLPARTTIJD = ?",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            }
        ],
        fields: [
            {
                row: "SQLPARTTIJD",
                sql: "ifnull(cast(SQLPARTTIJD as CHAR),'') as SQLPARTTIJD",
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
                body: "SQLPARTTIJD",
                sql: "SQLPARTTIJD = '?'",
                required: false,
                maxLength: 32,
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
var Berekening_sqlparttijd = /** @class */ (function (_super) {
    __extends(Berekening_sqlparttijd, _super);
    function Berekening_sqlparttijd() {
        return _super.call(this, dict) || this;
    }
    return Berekening_sqlparttijd;
}(crud_1.Crud));
exports.Berekening_sqlparttijd = Berekening_sqlparttijd;
//# sourceMappingURL=berekening_sqlparttijd.js.map