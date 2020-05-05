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
    table: "KLANT",
    key: [
        {
            body: "KLANTNUMMER",
            sql: "KLANTNUMMER"
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(concat(klantnummer, ': ' , zoekcode))",
        where: [
            {
                query: "value",
                sql: "ucase(concat(klantnummer, ': ' , zoekcode)) like '%?%'"
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "KLANTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "rtrim(concat(klantnummer, '(' , zoekcode, '): ', ucase(naam))) AS VALUE"
            }
        ]
    },
    query: {
        orderby: "cast(klantnummer as decimal)",
        where: [
            {
                query: "id",
                sql: "ID = ?"
            },
            {
                query: "klantnummer",
                sql: "KLANTNUMMER like ('?%')"
            },
            {
                query: "naam",
                sql: "NAAM like ('?%')"
            },
            {
                query: "zoekcode",
                sql: "ZOEKCODE like ('?%')"
            },
            {
                query: "adres",
                sql: "ADRES like ('?%')"
            },
            {
                query: "woonplaats",
                sql: "WOONPLAATS like ('?%')"
            },
            {
                query: "postcode",
                sql: "POSTCODE like ('?%')"
            },
            {
                query: "telefoon",
                sql: "TELEFOON like ('?%')"
            },
            {
                query: "fax",
                sql: "FAX like ('?%')"
            },
            {
                query: "email",
                sql: "EMAIL like ('?%')"
            },
            {
                query: "categorie",
                sql: "CATEGORIE like ('?%')"
            },
            {
                query: "contact",
                sql: "CONTACT like ('?%')"
            },
            {
                query: "land",
                sql: "LAND like ('?%')"
            },
            {
                query: "leverdagen",
                sql: "LEVERDAGEN = ?"
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "cast(ID as CHAR) as ID"
            },
            {
                row: "KLANTNUMMER",
                sql: "ifnull(KLANTNUMMER,'') as KLANTNUMMER"
            },
            {
                row: "NAAM",
                sql: "ifnull(NAAM,'') as NAAM"
            },
            {
                row: "ZOEKCODE",
                sql: "ifnull(ZOEKCODE,'') as ZOEKCODE"
            },
            {
                row: "ADRES",
                sql: "ifnull(ADRES,'') as ADRES"
            },
            {
                row: "WOONPLAATS",
                sql: "ifnull(WOONPLAATS,'') as WOONPLAATS"
            },
            {
                row: "POSTCODE",
                sql: "ifnull(POSTCODE,'') as POSTCODE"
            },
            {
                row: "TELEFOON",
                sql: "ifnull(TELEFOON,'') as TELEFOON"
            },
            {
                row: "FAX",
                sql: "ifnull(FAX,'') as FAX"
            },
            {
                row: "EMAIL",
                sql: "ifnull(EMAIL,'') as EMAIL"
            },
            {
                row: "CATEGORIE",
                sql: "ifnull(CATEGORIE,'') as CATEGORIE"
            },
            {
                row: "CONTACT",
                sql: "ifnull(CONTACT,'') as CONTACT"
            },
            {
                row: "LAND",
                sql: "ifnull(LAND,'') as LAND"
            },
            {
                row: "LEVERDAGEN",
                sql: "ifnull(cast(LEVERDAGEN as CHAR),'') as LEVERDAGEN"
            }
        ]
    },
    update: {
        fields: [
            {
                body: "KLANTNUMMER",
                sql: "KLANTNUMMER",
                required: false,
                maxLength: 50,
                default: ""
            },
            {
                body: "NAAM",
                sql: "NAAM",
                required: false,
                maxLength: 255,
                default: ""
            },
            {
                body: "ZOEKCODE",
                sql: "ZOEKCODE",
                required: false,
                maxLength: 50,
                default: ""
            },
            {
                body: "ADRES",
                sql: "ADRES",
                required: false,
                maxLength: 255,
                default: ""
            },
            {
                body: "WOONPLAATS",
                sql: "WOONPLAATS",
                required: false,
                maxLength: 255,
                default: ""
            },
            {
                body: "POSTCODE",
                sql: "POSTCODE",
                required: false,
                maxLength: 50,
                default: ""
            },
            {
                body: "TELEFOON",
                sql: "TELEFOON",
                required: false,
                maxLength: 50,
                default: ""
            },
            {
                body: "FAX",
                sql: "FAX",
                required: false,
                maxLength: 50,
                default: ""
            },
            {
                body: "EMAIL",
                sql: "EMAIL",
                required: false,
                maxLength: 50,
                default: ""
            },
            {
                body: "CATEGORIE",
                sql: "CATEGORIE",
                required: false,
                maxLength: 50,
                default: ""
            },
            {
                body: "CONTACT",
                sql: "CONTACT",
                required: false,
                maxLength: 255,
                default: ""
            },
            {
                body: "LAND",
                sql: "LAND",
                required: false,
                maxLength: 50,
                default: ""
            },
            {
                body: "LEVERDAGEN",
                sql: "LEVERDAGEN",
                required: false,
                maxLength: 10,
                default: ""
            }
        ]
    }
};
var Klant = /** @class */ (function (_super) {
    __extends(Klant, _super);
    function Klant() {
        return _super.call(this, dict) || this;
    }
    return Klant;
}(crud_1.Crud));
exports.Klant = Klant;
//# sourceMappingURL=klant.js.map