"use strict";
/*
add to router:
import { Bewerkingtijd } from './providers/bewerkingtijd';
private bewerkingtijd: Bewerkingtijd;
this.bewerkingtijd = new Bewerkingtijd();
this.app.route('/bewerkingtijd.php').all((req, res, next) => this.bewerkingtijd.routes(req, res, next));
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
    table: "BEWERKINGTIJD",
    key: [
        {
            body: "BEWERKINGSNUMMER",
            sql: "BEWERKINGSNUMMER",
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
                sql: "BEWERKINGSNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "BEWERKINGSNUMMER",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "bewerkingsnummer",
                sql: "BEWERKINGSNUMMER like ('%?%')",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            },
            {
                query: "bewerkingflowid",
                sql: "BEWERKINGFLOWID = ?",
            },
            {
                query: "afdeling",
                sql: "AFDELING like ('%?%')",
            },
            {
                query: "gebruiker",
                sql: "GEBRUIKER like ('%?%')",
            },
            {
                query: "bewerkingsoort",
                sql: "BEWERKINGSOORT like ('%?%')",
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
                query: "aantalgemaakt",
                sql: "AANTALGEMAAKT = ?",
            },
            {
                query: "aantaluitval",
                sql: "AANTALUITVAL like ('%?%')",
            },
            {
                query: "tijd",
                sql: "TIJD = ?",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "BEWERKINGSNUMMER",
                sql: "ifnull(BEWERKINGSNUMMER,'') as BEWERKINGSNUMMER",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "BEWERKINGFLOWID",
                sql: "ifnull(cast(BEWERKINGFLOWID as CHAR),'') as BEWERKINGFLOWID",
            },
            {
                row: "AFDELING",
                sql: "ifnull(AFDELING,'') as AFDELING",
            },
            {
                row: "GEBRUIKER",
                sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
            },
            {
                row: "BEWERKINGSOORT",
                sql: "ifnull(BEWERKINGSOORT,'') as BEWERKINGSOORT",
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
                row: "AANTALGEMAAKT",
                sql: "ifnull(cast(AANTALGEMAAKT as CHAR),'') as AANTALGEMAAKT",
            },
            {
                row: "AANTALUITVAL",
                sql: "ifnull(AANTALUITVAL,'') as AANTALUITVAL",
            },
            {
                row: "TIJD",
                sql: "ifnull(cast(TIJD as CHAR),'') as TIJD",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "BEWERKINGSNUMMER",
                sql: "BEWERKINGSNUMMER = '?'",
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
                body: "BEWERKINGFLOWID",
                sql: "BEWERKINGFLOWID",
                required: false,
                maxLength: 10,
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
                body: "GEBRUIKER",
                sql: "GEBRUIKER = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "BEWERKINGSOORT",
                sql: "BEWERKINGSOORT = '?'",
                required: false,
                maxLength: 1,
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
                body: "AANTALGEMAAKT",
                sql: "AANTALGEMAAKT = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "AANTALUITVAL",
                sql: "AANTALUITVAL = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "TIJD",
                sql: "TIJD = '?'",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Bewerkingtijd = /** @class */ (function (_super) {
    __extends(Bewerkingtijd, _super);
    function Bewerkingtijd() {
        return _super.call(this, dict) || this;
    }
    return Bewerkingtijd;
}(crud_1.Crud));
exports.Bewerkingtijd = Bewerkingtijd;
//# sourceMappingURL=bewerkingtijd.js.map