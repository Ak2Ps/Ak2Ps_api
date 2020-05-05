"use strict";
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
            body: "LEVERANCIERNUMMER",
            sql: "LEVERANCIERNUMMER",
        },
        {
            body: "BESTELNUMMER",
            sql: "BESTELNUMMER",
        },
        {
            body: "REGELNUMMER",
            sql: "REGELNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "PRODUCTNUMMER",
        where: [
            {
                query: "value",
                sql: "PRODUCTNUMMER like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "leveranciernummer,besteldatumtijd,bestelnummer,productnummer,regelnummer",
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
                sql: "PRODUCTNUMMER like ('?%')",
            },
            {
                query: "bestelling",
                sql: "BESTELLING = ?",
            },
            {
                query: "sel_vanaf",
                sql: "BESTELDATUMTIJD >= screendate2date('?')",
            },
            {
                query: "sel_tm",
                sql: "BESTELDATUMTIJD <= screendate2date('?')",
            },
            {
                query: "leveranciernummer",
                sql: "LEVERANCIERNUMMER = '?'",
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
                sql: "BESTELNUMMER = '?'",
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
            //{
            //    row: "STATUS",
            //    sql: "ifnull(STATUS,'') as STATUS",
            //},
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "BESTELLING",
                sql: "ifnull(cast(BESTELLING as CHAR),'') as BESTELLING",
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
                row: "INKOOPPRIJS",
                sql: "ifnull(cast(INKOOPPRIJS as CHAR),'') as INKOOPPRIJS",
            },
            {
                row: "STARTDATUMTIJD",
                sql: "date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD",
            },
            {
                row: "BESTELDATUMTIJD",
                sql: "date2jsondate(BESTELDATUMTIJD) as BESTELDATUMTIJD",
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
                row: "LIJSTSTATUS",
                sql: "ifnull(LIJSTSTATUS,'') as LIJSTSTATUS",
            },
            //
            {
                row: "STARTDATUM",
                sql: "date2screendate(STARTDATUMTIJD) as STARTDATUM",
            },
            {
                row: "BESTELDATUM",
                sql: "date2screendate(BESTELDATUMTIJD) as BESTELDATUM",
            },
            {
                row: "GEPRINTDATUM",
                sql: "date2screendate(GEPRINTDATUMTIJD) as GEPRINTDATUM",
            },
            {
                row: "GEPICKEDDATUM",
                sql: "date2screendate(GEPICKEDDATUMTIJD) as GEPICKEDDATUM",
            },
            {
                row: "VERZONDENDATUM",
                sql: "date2screendate(VERZONDENDATUMTIJD) as VERZONDENDATUM",
            },
            {
                row: "ONTVANGENDATUM",
                sql: "date2screendate(ONTVANGENDATUMTIJD) as ONTVANGENDATUM",
            },
            {
                row: "ZOEKKODE",
                sql: "ifnull((select Zoekcode from LEVERANCIER where LEVERANCIER.leveranciernummer = BESTELLING.leveranciernummer),'') as ZOEKKODE",
            },
        ],
    },
    update: {
        fields: [
            //{
            //    body: "STATUS",
            //    sql: "STATUS = '?'",
            //    required: false,
            //    maxLength: 3,
            //    default: "",
            //},
            {
                body: "PRODUCTNUMMER",
                sql: "PRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "STARTDATUM",
                sql: "STARTDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "BESTELDATUM",
                sql: "BESTELDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "GEPRINTDATUM",
                sql: "GEPRINTDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "GEPICKEDDATUM",
                sql: "GEPICKEDDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "VERZONDENDATUM",
                sql: "VERZONDENDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "ONTVANGENDATUM",
                sql: "ONTVANGENDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
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
                body: "INKOOPPRIJS",
                sql: "INKOOPPRIJS = '?'",
                required: false,
                maxLength: 16,
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
                body: "LIJSTSTATUS",
                sql: "LIJSTSTATUS = '?'",
                required: false,
                maxLength: 3,
                default: "",
            },
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