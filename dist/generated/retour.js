"use strict";
/*
add to router:
import { Retour } from './providers/retour';
private retour: Retour;
this.retour = new Retour();
this.app.route('/retour.php').all((req, res, next) => this.retour.routes(req, res, next));
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
    table: "RETOUR",
    key: [
        {
            body: "REFERENTIE",
            sql: "REFERENTIE",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(KLANTREFERENTIE)",
        where: [
            {
                query: "value",
                sql: "ucase(KLANTREFERENTIE) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "REFERENTIE as ID"
            },
            {
                row: "VALUE",
                sql: "KLANTREFERENTIE AS VALUE"
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
                query: "klantreferentie",
                sql: "KLANTREFERENTIE like ('%?%')",
            },
            {
                query: "startdatumtijd",
                sql: "STARTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "gereeddatumtijd",
                sql: "GEREEDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "gebruiker",
                sql: "GEBRUIKER like ('%?%')",
            },
            {
                query: "type",
                sql: "TYPE like ('%?%')",
            },
            {
                query: "termijn",
                sql: "TERMIJN like ('%?%')",
            },
            {
                query: "prijsopgave",
                sql: "PRIJSOPGAVE like ('%?%')",
            },
            {
                query: "garantie",
                sql: "GARANTIE like ('%?%')",
            },
            {
                query: "kosten",
                sql: "KOSTEN = ?",
            },
            {
                query: "opmerking",
                sql: "OPMERKING like ('%?%')",
            },
            {
                query: "status",
                sql: "STATUS like ('%?%')",
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
                row: "KLANTREFERENTIE",
                sql: "ifnull(KLANTREFERENTIE,'') as KLANTREFERENTIE",
            },
            {
                row: "STARTDATUMTIJD",
                sql: "date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD",
            },
            {
                row: "GEREEDDATUMTIJD",
                sql: "date2jsondate(GEREEDDATUMTIJD) as GEREEDDATUMTIJD",
            },
            {
                row: "GEBRUIKER",
                sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
            },
            {
                row: "TYPE",
                sql: "ifnull(TYPE,'') as TYPE",
            },
            {
                row: "TERMIJN",
                sql: "ifnull(TERMIJN,'') as TERMIJN",
            },
            {
                row: "PRIJSOPGAVE",
                sql: "ifnull(PRIJSOPGAVE,'') as PRIJSOPGAVE",
            },
            {
                row: "GARANTIE",
                sql: "ifnull(GARANTIE,'') as GARANTIE",
            },
            {
                row: "KOSTEN",
                sql: "ifnull(cast(KOSTEN as CHAR),'') as KOSTEN",
            },
            {
                row: "OPMERKING",
                sql: "ifnull(OPMERKING,'') as OPMERKING",
            },
            {
                row: "STATUS",
                sql: "ifnull(STATUS,'') as STATUS",
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
                body: "KLANTREFERENTIE",
                sql: "KLANTREFERENTIE = '?'",
                required: false,
                maxLength: 50,
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
                body: "GEREEDDATUMTIJD",
                sql: "GEREEDDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "GEBRUIKER",
                sql: "GEBRUIKER = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "TYPE",
                sql: "TYPE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "TERMIJN",
                sql: "TERMIJN = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "PRIJSOPGAVE",
                sql: "PRIJSOPGAVE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "GARANTIE",
                sql: "GARANTIE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "KOSTEN",
                sql: "KOSTEN = '?'",
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
            },
            {
                body: "STATUS",
                sql: "STATUS = '?'",
                required: false,
                maxLength: 3,
                default: "",
            }
        ],
    },
};
var Retour = /** @class */ (function (_super) {
    __extends(Retour, _super);
    function Retour() {
        return _super.call(this, dict) || this;
    }
    return Retour;
}(crud_1.Crud));
exports.Retour = Retour;
//# sourceMappingURL=retour.js.map