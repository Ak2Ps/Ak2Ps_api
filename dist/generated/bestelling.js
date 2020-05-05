"use strict";
/*
add to router:
import { Bestelling } from './providers/bestelling';
private bestelling: Bestelling;
this.bestelling = new Bestelling();
this.app.route('/bestelling.php').all((req, res, next) => this.bestelling.routes(req, res, next));
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
    table: "BESTELLING",
    key: [
        {
            body: "STATUS",
            sql: "STATUS",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(LIJSTSTATUS)",
        where: [
            {
                query: "value",
                sql: "ucase(LIJSTSTATUS) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "STATUS as ID"
            },
            {
                row: "VALUE",
                sql: "LIJSTSTATUS AS VALUE"
            }
        ],
    },
    query: {
        orderby: "STATUS",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "status",
                sql: "STATUS like ('%?%')",
            },
            {
                query: "lijststatus",
                sql: "LIJSTSTATUS like ('%?%')",
            },
            {
                query: "startdatumtijd",
                sql: "STARTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            },
            {
                query: "bestelling",
                sql: "BESTELLING = ?",
            },
            {
                query: "besteldatumtijd",
                sql: "BESTELDATUMTIJD > screendate2date('?')",
            },
            {
                query: "leveranciernummer",
                sql: "LEVERANCIERNUMMER like ('%?%')",
            },
            {
                query: "leveranciernaam",
                sql: "LEVERANCIERNAAM like ('%?%')",
            },
            {
                query: "leverancierproductnummer",
                sql: "LEVERANCIERPRODUCTNUMMER like ('%?%')",
            },
            {
                query: "bestelnummer",
                sql: "BESTELNUMMER like ('%?%')",
            },
            {
                query: "regelnummer",
                sql: "REGELNUMMER like ('%?%')",
            },
            {
                query: "geprintdatumtijd",
                sql: "GEPRINTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "gepickeddatumtijd",
                sql: "GEPICKEDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "verzondendatumtijd",
                sql: "VERZONDENDATUMTIJD > screendate2date('?')",
            },
            {
                query: "ontvangendatumtijd",
                sql: "ONTVANGENDATUMTIJD > screendate2date('?')",
            },
            {
                query: "contactpersoon",
                sql: "CONTACTPERSOON like ('%?%')",
            },
            {
                query: "inkoopprijs",
                sql: "INKOOPPRIJS = ?",
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
                row: "STATUS",
                sql: "ifnull(STATUS,'') as STATUS",
            },
            {
                row: "LIJSTSTATUS",
                sql: "ifnull(LIJSTSTATUS,'') as LIJSTSTATUS",
            },
            {
                row: "STARTDATUMTIJD",
                sql: "date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "BESTELLING",
                sql: "ifnull(cast(BESTELLING as CHAR),'') as BESTELLING",
            },
            {
                row: "BESTELDATUMTIJD",
                sql: "date2jsondate(BESTELDATUMTIJD) as BESTELDATUMTIJD",
            },
            {
                row: "LEVERANCIERNUMMER",
                sql: "ifnull(LEVERANCIERNUMMER,'') as LEVERANCIERNUMMER",
            },
            {
                row: "LEVERANCIERNAAM",
                sql: "ifnull(LEVERANCIERNAAM,'') as LEVERANCIERNAAM",
            },
            {
                row: "LEVERANCIERPRODUCTNUMMER",
                sql: "ifnull(LEVERANCIERPRODUCTNUMMER,'') as LEVERANCIERPRODUCTNUMMER",
            },
            {
                row: "BESTELNUMMER",
                sql: "ifnull(BESTELNUMMER,'') as BESTELNUMMER",
            },
            {
                row: "REGELNUMMER",
                sql: "ifnull(REGELNUMMER,'') as REGELNUMMER",
            },
            {
                row: "GEPRINTDATUMTIJD",
                sql: "date2jsondate(GEPRINTDATUMTIJD) as GEPRINTDATUMTIJD",
            },
            {
                row: "GEPICKEDDATUMTIJD",
                sql: "date2jsondate(GEPICKEDDATUMTIJD) as GEPICKEDDATUMTIJD",
            },
            {
                row: "VERZONDENDATUMTIJD",
                sql: "date2jsondate(VERZONDENDATUMTIJD) as VERZONDENDATUMTIJD",
            },
            {
                row: "ONTVANGENDATUMTIJD",
                sql: "date2jsondate(ONTVANGENDATUMTIJD) as ONTVANGENDATUMTIJD",
            },
            {
                row: "CONTACTPERSOON",
                sql: "ifnull(CONTACTPERSOON,'') as CONTACTPERSOON",
            },
            {
                row: "INKOOPPRIJS",
                sql: "ifnull(cast(INKOOPPRIJS as CHAR),'') as INKOOPPRIJS",
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
                body: "STATUS",
                sql: "STATUS = '?'",
                required: false,
                maxLength: 3,
                default: "",
            },
            {
                body: "LIJSTSTATUS",
                sql: "LIJSTSTATUS = '?'",
                required: false,
                maxLength: 3,
                default: "",
            },
            {
                body: "STARTDATUMTIJD",
                sql: "STARTDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
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
                body: "BESTELLING",
                sql: "BESTELLING = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "BESTELDATUMTIJD",
                sql: "BESTELDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "LEVERANCIERNUMMER",
                sql: "LEVERANCIERNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "LEVERANCIERNAAM",
                sql: "LEVERANCIERNAAM = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "LEVERANCIERPRODUCTNUMMER",
                sql: "LEVERANCIERPRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "BESTELNUMMER",
                sql: "BESTELNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "REGELNUMMER",
                sql: "REGELNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "GEPRINTDATUMTIJD",
                sql: "GEPRINTDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "GEPICKEDDATUMTIJD",
                sql: "GEPICKEDDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "VERZONDENDATUMTIJD",
                sql: "VERZONDENDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "ONTVANGENDATUMTIJD",
                sql: "ONTVANGENDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "CONTACTPERSOON",
                sql: "CONTACTPERSOON = '?'",
                required: false,
                maxLength: 254,
                default: "",
            },
            {
                body: "INKOOPPRIJS",
                sql: "INKOOPPRIJS = '?'",
                required: false,
                maxLength: 16,
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
var Bestelling = /** @class */ (function (_super) {
    __extends(Bestelling, _super);
    function Bestelling() {
        return _super.call(this, dict) || this;
    }
    return Bestelling;
}(crud_1.Crud));
exports.Bestelling = Bestelling;
//# sourceMappingURL=bestelling.js.map