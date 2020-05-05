"use strict";
/*
add to router:
import { Productopmerking } from './providers/productopmerking';
private productopmerking: Productopmerking;
this.productopmerking = new Productopmerking();
this.app.route('/productopmerking.php').all((req, res, next) => this.productopmerking.routes(req, res, next));
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
    table: "PRODUCTOPMERKING",
    key: [
        {
            body: "PRODUCTNUMMER",
            sql: "PRODUCTNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(BRON)",
        where: [
            {
                query: "value",
                sql: "ucase(BRON) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "BRON AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTNUMMER",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            },
            {
                query: "bron",
                sql: "BRON like ('%?%')",
            },
            {
                query: "opmerking",
                sql: "OPMERKING like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "BRON",
                sql: "ifnull(BRON,'') as BRON",
            },
            {
                row: "OPMERKING",
                sql: "ifnull(OPMERKING,'') as OPMERKING",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "PRODUCTNUMMER",
                sql: "PRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "BRON",
                sql: "BRON = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "OPMERKING",
                sql: "OPMERKING = '?'",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Productopmerking = /** @class */ (function (_super) {
    __extends(Productopmerking, _super);
    function Productopmerking() {
        return _super.call(this, dict) || this;
    }
    return Productopmerking;
}(crud_1.Crud));
exports.Productopmerking = Productopmerking;
//# sourceMappingURL=productopmerking.js.map