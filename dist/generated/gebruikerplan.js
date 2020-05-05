"use strict";
/*
add to router:
import { Gebruikerplan } from './providers/gebruikerplan';
private gebruikerplan: Gebruikerplan;
this.gebruikerplan = new Gebruikerplan();
this.app.route('/gebruikerplan.php').all((req, res, next) => this.gebruikerplan.routes(req, res, next));
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
    table: "GEBRUIKERPLAN",
    key: [
        {
            body: "GEBRUIKER",
            sql: "GEBRUIKER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(STARTDATUMTIJD)",
        where: [
            {
                query: "value",
                sql: "ucase(STARTDATUMTIJD) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "GEBRUIKER as ID"
            },
            {
                row: "VALUE",
                sql: "STARTDATUMTIJD AS VALUE"
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
                query: "startdatumtijd",
                sql: "STARTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "einddatumtijd",
                sql: "EINDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "plansoort",
                sql: "PLANSOORT like ('%?%')",
            },
            {
                query: "tijd",
                sql: "TIJD = ?",
            },
            {
                query: "pauze",
                sql: "PAUZE = ?",
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
                row: "STARTDATUMTIJD",
                sql: "date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD",
            },
            {
                row: "EINDDATUMTIJD",
                sql: "date2jsondate(EINDDATUMTIJD) as EINDDATUMTIJD",
            },
            {
                row: "PLANSOORT",
                sql: "ifnull(PLANSOORT,'') as PLANSOORT",
            },
            {
                row: "TIJD",
                sql: "ifnull(cast(TIJD as CHAR),'') as TIJD",
            },
            {
                row: "PAUZE",
                sql: "ifnull(cast(PAUZE as CHAR),'') as PAUZE",
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
                body: "STARTDATUMTIJD",
                sql: "STARTDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "EINDDATUMTIJD",
                sql: "EINDDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "PLANSOORT",
                sql: "PLANSOORT = '?'",
                required: false,
                maxLength: 3,
                default: "",
            },
            {
                body: "TIJD",
                sql: "TIJD = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "PAUZE",
                sql: "PAUZE = '?'",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Gebruikerplan = /** @class */ (function (_super) {
    __extends(Gebruikerplan, _super);
    function Gebruikerplan() {
        return _super.call(this, dict) || this;
    }
    return Gebruikerplan;
}(crud_1.Crud));
exports.Gebruikerplan = Gebruikerplan;
//# sourceMappingURL=gebruikerplan.js.map