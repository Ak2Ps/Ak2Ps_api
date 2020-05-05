"use strict";
/*
add to router:
import { Retourproduct } from './providers/retourproduct';
private retourproduct: Retourproduct;
this.retourproduct = new Retourproduct();
this.app.route('/retourproduct.php').all((req, res, next) => this.retourproduct.routes(req, res, next));
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
    table: "RETOURPRODUCT",
    key: [
        {
            body: "REFERENTIE",
            sql: "REFERENTIE",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(PRODUCTNUMMER)",
        where: [
            {
                query: "value",
                sql: "ucase(PRODUCTNUMMER) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "REFERENTIE as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "REFERENTIE",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "referentie",
                sql: "REFERENTIE like ('%?%')",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            },
            {
                query: "aantal",
                sql: "AANTAL = ?",
            },
            {
                query: "klantproductnummer",
                sql: "KLANTPRODUCTNUMMER like ('%?%')",
            },
            {
                query: "serienummer",
                sql: "SERIENUMMER like ('%?%')",
            },
            {
                query: "productiedatumtijd",
                sql: "PRODUCTIEDATUMTIJD > screendate2date('?')",
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
                row: "REFERENTIE",
                sql: "ifnull(REFERENTIE,'') as REFERENTIE",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "AANTAL",
                sql: "ifnull(cast(AANTAL as CHAR),'') as AANTAL",
            },
            {
                row: "KLANTPRODUCTNUMMER",
                sql: "ifnull(KLANTPRODUCTNUMMER,'') as KLANTPRODUCTNUMMER",
            },
            {
                row: "SERIENUMMER",
                sql: "ifnull(SERIENUMMER,'') as SERIENUMMER",
            },
            {
                row: "PRODUCTIEDATUMTIJD",
                sql: "date2jsondate(PRODUCTIEDATUMTIJD) as PRODUCTIEDATUMTIJD",
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
                body: "REFERENTIE",
                sql: "REFERENTIE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRODUCTNUMMER",
                sql: "PRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "AANTAL",
                sql: "AANTAL = '?'",
                required: false,
                maxLength: 16,
                default: "",
            },
            {
                body: "KLANTPRODUCTNUMMER",
                sql: "KLANTPRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "SERIENUMMER",
                sql: "SERIENUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRODUCTIEDATUMTIJD",
                sql: "PRODUCTIEDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
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
var Retourproduct = /** @class */ (function (_super) {
    __extends(Retourproduct, _super);
    function Retourproduct() {
        return _super.call(this, dict) || this;
    }
    return Retourproduct;
}(crud_1.Crud));
exports.Retourproduct = Retourproduct;
//# sourceMappingURL=retourproduct.js.map