"use strict";
/*
add to router:
import { Bewerkinguitval } from './providers/bewerkinguitval';
private bewerkinguitval: Bewerkinguitval;
this.bewerkinguitval = new Bewerkinguitval();
this.app.route('/bewerkinguitval.php').all((req, res, next) => this.bewerkinguitval.routes(req, res, next));
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
    table: "BEWERKINGUITVAL",
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
                query: "uitval",
                sql: "UITVAL like ('%?%')",
            },
            {
                query: "aantalafkeur",
                sql: "AANTALAFKEUR = ?",
            },
            {
                query: "aantalreparatie",
                sql: "AANTALREPARATIE = ?",
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
                row: "UITVAL",
                sql: "ifnull(UITVAL,'') as UITVAL",
            },
            {
                row: "AANTALAFKEUR",
                sql: "ifnull(cast(AANTALAFKEUR as CHAR),'') as AANTALAFKEUR",
            },
            {
                row: "AANTALREPARATIE",
                sql: "ifnull(cast(AANTALREPARATIE as CHAR),'') as AANTALREPARATIE",
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
                body: "UITVAL",
                sql: "UITVAL = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "AANTALAFKEUR",
                sql: "AANTALAFKEUR = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "AANTALREPARATIE",
                sql: "AANTALREPARATIE = '?'",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Bewerkinguitval = /** @class */ (function (_super) {
    __extends(Bewerkinguitval, _super);
    function Bewerkinguitval() {
        return _super.call(this, dict) || this;
    }
    return Bewerkinguitval;
}(crud_1.Crud));
exports.Bewerkinguitval = Bewerkinguitval;
//# sourceMappingURL=bewerkinguitval.js.map