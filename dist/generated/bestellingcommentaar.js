"use strict";
/*
add to router:
import { Bestellingcommentaar } from './providers/bestellingcommentaar';
private bestellingcommentaar: Bestellingcommentaar;
this.bestellingcommentaar = new Bestellingcommentaar();
this.app.route('/bestellingcommentaar.php').all((req, res, next) => this.bestellingcommentaar.routes(req, res, next));
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
    table: "BESTELLINGCOMMENTAAR",
    key: [
        {
            body: "BESTELLINGID",
            sql: "BESTELLINGID",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(REGELNUMMER)",
        where: [
            {
                query: "value",
                sql: "ucase(REGELNUMMER) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "BESTELLINGID as ID"
            },
            {
                row: "VALUE",
                sql: "REGELNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "BESTELLINGID",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "bestellingid",
                sql: "BESTELLINGID = ?",
            },
            {
                query: "regelnummer",
                sql: "REGELNUMMER = ?",
            },
            {
                query: "commentaar",
                sql: "COMMENTAAR like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "BESTELLINGID",
                sql: "ifnull(cast(BESTELLINGID as CHAR),'') as BESTELLINGID",
            },
            {
                row: "REGELNUMMER",
                sql: "ifnull(cast(REGELNUMMER as CHAR),'') as REGELNUMMER",
            },
            {
                row: "COMMENTAAR",
                sql: "ifnull(COMMENTAAR,'') as COMMENTAAR",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "BESTELLINGID",
                sql: "BESTELLINGID",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "REGELNUMMER",
                sql: "REGELNUMMER",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "COMMENTAAR",
                sql: "COMMENTAAR = '?'",
                required: false,
                maxLength: 254,
                default: "",
            }
        ],
    },
};
var Bestellingcommentaar = /** @class */ (function (_super) {
    __extends(Bestellingcommentaar, _super);
    function Bestellingcommentaar() {
        return _super.call(this, dict) || this;
    }
    return Bestellingcommentaar;
}(crud_1.Crud));
exports.Bestellingcommentaar = Bestellingcommentaar;
//# sourceMappingURL=bestellingcommentaar.js.map