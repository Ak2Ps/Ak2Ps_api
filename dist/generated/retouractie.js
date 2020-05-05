"use strict";
/*
add to router:
import { Retouractie } from './providers/retouractie';
private retouractie: Retouractie;
this.retouractie = new Retouractie();
this.app.route('/retouractie.php').all((req, res, next) => this.retouractie.routes(req, res, next));
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
    table: "RETOURACTIE",
    key: [
        {
            body: "REFERENTIE",
            sql: "REFERENTIE",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(ACTIE)",
        where: [
            {
                query: "value",
                sql: "ucase(ACTIE) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "REFERENTIE as ID"
            },
            {
                row: "VALUE",
                sql: "ACTIE AS VALUE"
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
                query: "actie",
                sql: "ACTIE like ('%?%')",
            },
            {
                query: "gebruiker",
                sql: "GEBRUIKER like ('%?%')",
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
                query: "gereeddatumtijd",
                sql: "GEREEDDATUMTIJD > screendate2date('?')",
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
                row: "ACTIE",
                sql: "ifnull(ACTIE,'') as ACTIE",
            },
            {
                row: "GEBRUIKER",
                sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
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
                row: "GEREEDDATUMTIJD",
                sql: "date2jsondate(GEREEDDATUMTIJD) as GEREEDDATUMTIJD",
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
                body: "ACTIE",
                sql: "ACTIE = '?'",
                required: false,
                maxLength: 50,
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
                body: "GEREEDDATUMTIJD",
                sql: "GEREEDDATUMTIJD = screendate2date('?')",
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
var Retouractie = /** @class */ (function (_super) {
    __extends(Retouractie, _super);
    function Retouractie() {
        return _super.call(this, dict) || this;
    }
    return Retouractie;
}(crud_1.Crud));
exports.Retouractie = Retouractie;
//# sourceMappingURL=retouractie.js.map