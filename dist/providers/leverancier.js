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
var dict = {
    table: "LEVERANCIER",
    key: [
        {
            body: "LEVERANCIERNUMMER",
            sql: "LEVERANCIERNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "cast (leveranciernummer as decimal)",
        where: [
            {
                query: "value",
                sql: "ucase(concat(leveranciernummer,': ',naam)) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "LEVERANCIERNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "concat(leveranciernummer,': ',naam) AS VALUE"
            }
        ],
    },
    query: {
        orderby: "cast (leveranciernummer as decimal)",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "leveranciernummer",
                sql: "ucase(LEVERANCIERNUMMER) like ucase('?%')",
            },
            {
                query: "naam",
                sql: "ucase(NAAM) like ucase('?%')",
            },
            {
                query: "zoekcode",
                sql: "ucase(ZOEKCODE) like ucase('?%')",
            },
            {
                query: "adres",
                sql: "ucase(ADRES) like ucase('?%')",
            },
            {
                query: "woonplaats",
                sql: "ucase(WOONPLAATS) like ucase('?%')",
            },
            {
                query: "postcode",
                sql: "ucase(POSTCODE) like ucase('?%')",
            },
            {
                query: "telefoon",
                sql: "ucase(TELEFOON) like ucase('?%')",
            },
            {
                query: "fax",
                sql: "ucase(FAX) like ucase('?%')",
            },
            {
                query: "email",
                sql: "ucase(EMAIL) like ucase('?%')",
            },
            {
                query: "categorie",
                sql: "ucase(CATEGORIE) like ucase('?%')",
            },
            {
                query: "contact",
                sql: "ucase(CONTACT) like ucase('?%')",
            },
            {
                query: "land",
                sql: "ucase(LAND) like ucase('?%')",
            },
            {
                query: "leverdagen",
                sql: "LEVERDAGEN = ?",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "cast(ID as CHAR) as ID",
            },
            {
                row: "LEVERANCIERNUMMER",
                sql: "ifnull(LEVERANCIERNUMMER,'') as LEVERANCIERNUMMER",
            },
            {
                row: "NAAM",
                sql: "ifnull(NAAM,'') as NAAM",
            },
            {
                row: "ZOEKCODE",
                sql: "ifnull(ZOEKCODE,'') as ZOEKCODE",
            },
            {
                row: "ADRES",
                sql: "ifnull(ADRES,'') as ADRES",
            },
            {
                row: "WOONPLAATS",
                sql: "ifnull(WOONPLAATS,'') as WOONPLAATS",
            },
            {
                row: "POSTCODE",
                sql: "ifnull(POSTCODE,'') as POSTCODE",
            },
            {
                row: "TELEFOON",
                sql: "ifnull(TELEFOON,'') as TELEFOON",
            },
            {
                row: "FAX",
                sql: "ifnull(FAX,'') as FAX",
            },
            {
                row: "EMAIL",
                sql: "ifnull(EMAIL,'') as EMAIL",
            },
            {
                row: "CATEGORIE",
                sql: "ifnull(CATEGORIE,'') as CATEGORIE",
            },
            {
                row: "CONTACT",
                sql: "ifnull(CONTACT,'') as CONTACT",
            },
            {
                row: "LAND",
                sql: "ifnull(LAND,'') as LAND",
            },
            {
                row: "LEVERDAGEN",
                sql: "ifnull(cast(LEVERDAGEN as CHAR),'') as LEVERDAGEN",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "LEVERANCIERNUMMER",
                sql: "LEVERANCIERNUMMER",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "NAAM",
                sql: "NAAM",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "ZOEKCODE",
                sql: "ZOEKCODE",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "ADRES",
                sql: "ADRES",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "WOONPLAATS",
                sql: "WOONPLAATS",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "POSTCODE",
                sql: "POSTCODE",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "TELEFOON",
                sql: "TELEFOON",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "FAX",
                sql: "FAX",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "EMAIL",
                sql: "EMAIL",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "CATEGORIE",
                sql: "CATEGORIE",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "CONTACT",
                sql: "CONTACT",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "LAND",
                sql: "LAND",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "LEVERDAGEN",
                sql: "LEVERDAGEN",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Leverancier = /** @class */ (function (_super) {
    __extends(Leverancier, _super);
    function Leverancier() {
        return _super.call(this, dict) || this;
    }
    return Leverancier;
}(crud_1.Crud));
exports.Leverancier = Leverancier;
//# sourceMappingURL=leverancier.js.map