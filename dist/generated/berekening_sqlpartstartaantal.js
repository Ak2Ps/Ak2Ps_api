"use strict";
/*
add to router:
import { Berekening_sqlpartstartaantal } from './providers/berekening_sqlpartstartaantal';
private berekening_sqlpartstartaantal: Berekening_sqlpartstartaantal;
this.berekening_sqlpartstartaantal = new Berekening_sqlpartstartaantal();
this.app.route('/berekening_sqlpartstartaantal.php').all((req, res, next) => this.berekening_sqlpartstartaantal.routes(req, res, next));
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
    table: "BEREKENING_SQLPARTSTARTAANTAL",
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
                query: "sqlpartstartaantal",
                sql: "SQLPARTSTARTAANTAL = ?",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            }
        ],
        fields: [
            {
                row: "SQLPARTSTARTAANTAL",
                sql: "ifnull(cast(SQLPARTSTARTAANTAL as CHAR),'') as SQLPARTSTARTAANTAL",
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
                body: "SQLPARTSTARTAANTAL",
                sql: "SQLPARTSTARTAANTAL = '?'",
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
var Berekening_sqlpartstartaantal = /** @class */ (function (_super) {
    __extends(Berekening_sqlpartstartaantal, _super);
    function Berekening_sqlpartstartaantal() {
        return _super.call(this, dict) || this;
    }
    return Berekening_sqlpartstartaantal;
}(crud_1.Crud));
exports.Berekening_sqlpartstartaantal = Berekening_sqlpartstartaantal;
//# sourceMappingURL=berekening_sqlpartstartaantal.js.map