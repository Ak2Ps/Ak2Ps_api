"use strict";
/*
add to router:
import { Berekening_sqlpartbewerkingen } from './providers/berekening_sqlpartbewerkingen';
private berekening_sqlpartbewerkingen: Berekening_sqlpartbewerkingen;
this.berekening_sqlpartbewerkingen = new Berekening_sqlpartbewerkingen();
this.app.route('/berekening_sqlpartbewerkingen.php').all((req, res, next) => this.berekening_sqlpartbewerkingen.routes(req, res, next));
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
    table: "BEREKENING_SQLPARTBEWERKINGEN",
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
                query: "sqlpartbewerkingen",
                sql: "SQLPARTBEWERKINGEN = ?",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            }
        ],
        fields: [
            {
                row: "SQLPARTBEWERKINGEN",
                sql: "ifnull(cast(SQLPARTBEWERKINGEN as CHAR),'') as SQLPARTBEWERKINGEN",
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
                body: "SQLPARTBEWERKINGEN",
                sql: "SQLPARTBEWERKINGEN",
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
var Berekening_sqlpartbewerkingen = /** @class */ (function (_super) {
    __extends(Berekening_sqlpartbewerkingen, _super);
    function Berekening_sqlpartbewerkingen() {
        return _super.call(this, dict) || this;
    }
    return Berekening_sqlpartbewerkingen;
}(crud_1.Crud));
exports.Berekening_sqlpartbewerkingen = Berekening_sqlpartbewerkingen;
//# sourceMappingURL=berekening_sqlpartbewerkingen.js.map