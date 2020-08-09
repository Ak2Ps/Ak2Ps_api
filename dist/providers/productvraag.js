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
exports.Productvraag = void 0;
var crud_1 = require("../crud");
//
var dict = {
    table: "PRODUCTVRAAG",
    key: [
        {
            body: "ID",
            sql: "ID",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ordernummer",
        where: [
            {
                query: "value",
                sql: "ucase(ORDERNUMMER) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ORDERNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "REFERENTIE AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTNUMMER,ORDERNUMMER,REGELNUMMER",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "ordernummer",
                sql: "ORDERNUMMER = '?'",
            },
            {
                query: "regelnummer",
                sql: "ucase(REGELNUMMER) like ucase('%?%')",
            },
            {
                query: "orderreferentie",
                sql: "ucase(ORDERREFERENTIE) like ucase('%?%')",
            },
            {
                query: "orderdatumtijd",
                sql: "ORDERDATUMTIJD > screendate2date('?')",
            },
            {
                query: "productnummer",
                sql: "ucase(PRODUCTNUMMER) like ucase('?%')",
            },
            {
                query: "initvraag",
                sql: "INITVRAAG = ?",
            },
            {
                query: "vraag",
                sql: "VRAAG = ?",
            },
            {
                query: "initvraagdatumtijd",
                sql: "INITVRAAGDATUMTIJD > screendate2date('?')",
            },
            {
                query: "acceptdatumtijd",
                sql: "ACCEPTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "klant",
                sql: "KLANTNUMMER = '?'",
            },
            {
                query: "klantnaam",
                sql: "ucase(KLANTNAAM) like ucase('%?%')",
            },
            {
                query: "einddatumtijd",
                sql: "EINDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "opmerking",
                sql: "ucase(OPMERKING) like ucase('%?%')",
            },
            {
                query: "vraagdatumtijd",
                sql: "VRAAGDATUMTIJD > screendate2date('?')",
            },
            {
                query: "productgroep",
                sql: "PRODUCTNUMMER in (select productnummer from PRODUCTGROEPREGEL where productgroep = '?')",
            },
            {
                query: "sel44",
                sql: "(\ncase when '?' = 'Ja' then\ninitvraagdatumtijd >= screendate2date('01-01-2044')\nand initvraagdatumtijd <= screendate2date('31-12-2044')\nwhen '?' = 'Nee' then\ninitvraagdatumtijd < screendate2date('01-01-2044')\nor initvraagdatumtijd > screendate2date('31-12-2044')\nelse true end)",
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
                row: "VRAAG",
                sql: "ifnull(cast(VRAAG as CHAR),'') as VRAAG",
            },
            {
                row: "VRAAGDATUM",
                sql: "date2screendate(VRAAGDATUMTIJD) as VRAAGDATUM",
            },
            {
                row: "INITVRAAGDATUM",
                sql: "date2screendate(INITVRAAGDATUMTIJD) as INITVRAAGDATUM",
            },
            {
                row: "ACCEPTDATUM",
                sql: "date2screendate(ACCEPTDATUMTIJD) as ACCEPTDATUM",
            },
            {
                row: "ORDERDATUM",
                sql: "date2screendate(ORDERDATUMTIJD) as ORDERDATUM",
            },
            {
                row: "KLANTNUMMER",
                sql: "ifnull(KLANTNUMMER,'') as KLANTNUMMER",
            },
            {
                row: "KLANTNAAM",
                sql: "ifnull(KLANTNAAM,'') as KLANTNAAM",
            },
            {
                row: "ORDERNUMMER",
                sql: "ifnull(ORDERNUMMER,'') as ORDERNUMMER",
            },
            {
                row: "REGELNUMMER",
                sql: "ifnull(REGELNUMMER,'') as REGELNUMMER",
            },
            {
                row: "ORDERREFERENTIE",
                sql: "ifnull(ORDERREFERENTIE,'') as ORDERREFERENTIE",
            },
            //{
            //    row: "INITVRAAG",
            //    sql: "ifnull(cast(INITVRAAG as CHAR),'') as INITVRAAG",
            //},
            //{
            //    row: "EINDDATUMTIJD",
            //    sql: "date2jsondate(EINDDATUMTIJD) as EINDDATUMTIJD",
            //},
            //{
            //    row: "OPMERKING",
            //    sql: "ifnull(OPMERKING,'') as OPMERKING",
            //},
            {
                row: "VRAAG_OMS",
                sql: "ifnull((select OPMERKING from VRAAG where VRAAG.ordernummer = PRODUCTVRAAG.ordernummer),'') as VRAAG_OMS",
            },
            {
                row: "PRODUCT_OMS",
                sql: "ifnull((select Productnaam from PRODUCT where PRODUCTVRAAG.productnummer = PRODUCT.productnummer),'') as PRODUCT_OMS",
            },
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
                body: "VRAAGDATUM",
                sql: "VRAAGDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "ORDERDATUM",
                sql: "ORDERDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "INITVRAAGDATUM",
                sql: "INITVRAAGDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "ACCEPTDATUM",
                sql: "ACCEPTDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "VRAAG",
                sql: "VRAAG = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "KLANTNUMMER",
                sql: "KLANTNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "KLANTNAAM",
                sql: "KLANTNAAM = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "ORDERNUMMER",
                sql: "ORDERNUMMER = '?'",
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
                body: "ORDERREFERENTIE",
                sql: "ORDERREFERENTIE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
        ],
    },
};
var Productvraag = /** @class */ (function (_super) {
    __extends(Productvraag, _super);
    function Productvraag() {
        return _super.call(this, dict) || this;
    }
    return Productvraag;
}(crud_1.Crud));
exports.Productvraag = Productvraag;
//# sourceMappingURL=productvraag.js.map