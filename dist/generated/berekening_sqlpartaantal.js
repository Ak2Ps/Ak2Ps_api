"use strict";
/*
add to router:
import { Berekening_sqlpartaantal } from './providers/berekening_sqlpartaantal';
private berekening_sqlpartaantal: Berekening_sqlpartaantal;
this.berekening_sqlpartaantal = new Berekening_sqlpartaantal();
this.app.route('/berekening_sqlpartaantal.php').all((req, res, next) => this.berekening_sqlpartaantal.routes(req, res, next));
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
    table: "BEREKENING_SQLPARTAANTAL",
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
                query: "sqlpartaantal",
                sql: "SQLPARTAANTAL = ?",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            }
        ],
        fields: [
            {
                row: "SQLPARTAANTAL",
                sql: "ifnull(cast(SQLPARTAANTAL as CHAR),'') as SQLPARTAANTAL",
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
                body: "SQLPARTAANTAL",
                sql: "SQLPARTAANTAL = '?'",
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
var Berekening_sqlpartaantal = /** @class */ (function (_super) {
    __extends(Berekening_sqlpartaantal, _super);
    function Berekening_sqlpartaantal() {
        return _super.call(this, dict) || this;
    }
    return Berekening_sqlpartaantal;
}(crud_1.Crud));
exports.Berekening_sqlpartaantal = Berekening_sqlpartaantal;
//# sourceMappingURL=berekening_sqlpartaantal.js.map