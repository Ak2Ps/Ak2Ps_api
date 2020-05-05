"use strict";
/*
add to router:
import { Gebruiker } from './providers/gebruiker';
private gebruiker: Gebruiker;
this.gebruiker = new Gebruiker();
this.app.route('/gebruiker.php').all((req, res, next) => this.gebruiker.routes(req, res, next));
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
    table: "GEBRUIKER",
    key: [
        {
            body: "GEBRUIKER",
            sql: "GEBRUIKER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(NAAM)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "GEBRUIKER as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "GEBRUIKER",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "gebruiker",
                sql: "GEBRUIKER like ('%?%')",
            },
            {
                query: "naam",
                sql: "NAAM like ('%?%')",
            },
            {
                query: "adres",
                sql: "ADRES like ('%?%')",
            },
            {
                query: "woonplaats",
                sql: "WOONPLAATS like ('%?%')",
            },
            {
                query: "land",
                sql: "LAND like ('%?%')",
            },
            {
                query: "email",
                sql: "EMAIL like ('%?%')",
            },
            {
                query: "contactpersoon",
                sql: "CONTACTPERSOON like ('%?%')",
            },
            {
                query: "telefoon",
                sql: "TELEFOON like ('%?%')",
            },
            {
                query: "menu",
                sql: "MENU like ('%?%')",
            },
            {
                query: "wachtwoord",
                sql: "WACHTWOORD like ('%?%')",
            },
            {
                query: "afdeling",
                sql: "AFDELING like ('%?%')",
            },
            {
                query: "aktief",
                sql: "AKTIEF like ('%?%')",
            },
            {
                query: "token",
                sql: "TOKEN like ('%?%')",
            },
            {
                query: "handtekening",
                sql: "HANDTEKENING like ('%?%')",
            },
            {
                query: "badge1",
                sql: "BADGE1 like ('%?%')",
            },
            {
                query: "badge2",
                sql: "BADGE2 like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "GEBRUIKER",
                sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
            },
            {
                row: "NAAM",
                sql: "ifnull(NAAM,'') as NAAM",
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
                row: "LAND",
                sql: "ifnull(LAND,'') as LAND",
            },
            {
                row: "EMAIL",
                sql: "ifnull(EMAIL,'') as EMAIL",
            },
            {
                row: "CONTACTPERSOON",
                sql: "ifnull(CONTACTPERSOON,'') as CONTACTPERSOON",
            },
            {
                row: "TELEFOON",
                sql: "ifnull(TELEFOON,'') as TELEFOON",
            },
            {
                row: "MENU",
                sql: "ifnull(MENU,'') as MENU",
            },
            {
                row: "WACHTWOORD",
                sql: "ifnull(WACHTWOORD,'') as WACHTWOORD",
            },
            {
                row: "AFDELING",
                sql: "ifnull(AFDELING,'') as AFDELING",
            },
            {
                row: "AKTIEF",
                sql: "ifnull(AKTIEF,'') as AKTIEF",
            },
            {
                row: "TOKEN",
                sql: "ifnull(TOKEN,'') as TOKEN",
            },
            {
                row: "HANDTEKENING",
                sql: "ifnull(HANDTEKENING,'') as HANDTEKENING",
            },
            {
                row: "BADGE1",
                sql: "ifnull(BADGE1,'') as BADGE1",
            },
            {
                row: "BADGE2",
                sql: "ifnull(BADGE2,'') as BADGE2",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "GEBRUIKER",
                sql: "GEBRUIKER = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "NAAM",
                sql: "NAAM = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "ADRES",
                sql: "ADRES = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "WOONPLAATS",
                sql: "WOONPLAATS = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "LAND",
                sql: "LAND = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "EMAIL",
                sql: "EMAIL = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "CONTACTPERSOON",
                sql: "CONTACTPERSOON = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "TELEFOON",
                sql: "TELEFOON = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "MENU",
                sql: "MENU = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "WACHTWOORD",
                sql: "WACHTWOORD = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "AFDELING",
                sql: "AFDELING = '?'",
                required: false,
                maxLength: 3,
                default: "",
            },
            {
                body: "AKTIEF",
                sql: "AKTIEF = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "TOKEN",
                sql: "TOKEN = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "HANDTEKENING",
                sql: "HANDTEKENING = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "BADGE1",
                sql: "BADGE1 = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "BADGE2",
                sql: "BADGE2 = '?'",
                required: false,
                maxLength: 50,
                default: "",
            }
        ],
    },
};
var Gebruiker = /** @class */ (function (_super) {
    __extends(Gebruiker, _super);
    function Gebruiker() {
        return _super.call(this, dict) || this;
    }
    return Gebruiker;
}(crud_1.Crud));
exports.Gebruiker = Gebruiker;
//# sourceMappingURL=gebruiker.js.map