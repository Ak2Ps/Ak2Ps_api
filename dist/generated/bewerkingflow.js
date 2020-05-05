"use strict";
/*
add to router:
import { Bewerkingflow } from './providers/bewerkingflow';
private bewerkingflow: Bewerkingflow;
this.bewerkingflow = new Bewerkingflow();
this.app.route('/bewerkingflow.php').all((req, res, next) => this.bewerkingflow.routes(req, res, next));
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
    table: "BEWERKINGFLOW",
    key: [
        {
            body: "BEWERKINGSNUMMER",
            sql: "BEWERKINGSNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(VOLGNUMMER)",
        where: [
            {
                query: "value",
                sql: "ucase(VOLGNUMMER) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "BEWERKINGSNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "VOLGNUMMER AS VALUE"
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
                query: "volgnummer",
                sql: "VOLGNUMMER = ?",
            },
            {
                query: "bewerkingsoort",
                sql: "BEWERKINGSOORT like ('%?%')",
            },
            {
                query: "bewerkingaantal",
                sql: "BEWERKINGAANTAL = ?",
            },
            {
                query: "startdatumtijd",
                sql: "STARTDATUMTIJD > screendate2date('?')",
            },
            {
                query: "lijn",
                sql: "LIJN like ('%?%')",
            },
            {
                query: "geprint",
                sql: "GEPRINT like ('%?%')",
            },
            {
                query: "plandatumtijd",
                sql: "PLANDATUMTIJD > screendate2date('?')",
            },
            {
                query: "einddatumtijd",
                sql: "EINDDATUMTIJD > screendate2date('?')",
            },
            {
                query: "eindcontrolenummer",
                sql: "EINDCONTROLENUMMER like ('%?%')",
            },
            {
                query: "uitval",
                sql: "UITVAL = ?",
            },
            {
                query: "tekeningnummer",
                sql: "TEKENINGNUMMER like ('%?%')",
            },
            {
                query: "tekeningrevisie",
                sql: "TEKENINGREVISIE like ('%?%')",
            },
            {
                query: "tekeningdatumtijd",
                sql: "TEKENINGDATUMTIJD > screendate2date('?')",
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
                row: "VOLGNUMMER",
                sql: "ifnull(cast(VOLGNUMMER as CHAR),'') as VOLGNUMMER",
            },
            {
                row: "BEWERKINGSOORT",
                sql: "ifnull(BEWERKINGSOORT,'') as BEWERKINGSOORT",
            },
            {
                row: "BEWERKINGAANTAL",
                sql: "ifnull(cast(BEWERKINGAANTAL as CHAR),'') as BEWERKINGAANTAL",
            },
            {
                row: "STARTDATUMTIJD",
                sql: "date2jsondate(STARTDATUMTIJD) as STARTDATUMTIJD",
            },
            {
                row: "LIJN",
                sql: "ifnull(LIJN,'') as LIJN",
            },
            {
                row: "GEPRINT",
                sql: "ifnull(GEPRINT,'') as GEPRINT",
            },
            {
                row: "PLANDATUMTIJD",
                sql: "date2jsondate(PLANDATUMTIJD) as PLANDATUMTIJD",
            },
            {
                row: "EINDDATUMTIJD",
                sql: "date2jsondate(EINDDATUMTIJD) as EINDDATUMTIJD",
            },
            {
                row: "EINDCONTROLENUMMER",
                sql: "ifnull(EINDCONTROLENUMMER,'') as EINDCONTROLENUMMER",
            },
            {
                row: "UITVAL",
                sql: "ifnull(cast(UITVAL as CHAR),'') as UITVAL",
            },
            {
                row: "TEKENINGNUMMER",
                sql: "ifnull(TEKENINGNUMMER,'') as TEKENINGNUMMER",
            },
            {
                row: "TEKENINGREVISIE",
                sql: "ifnull(TEKENINGREVISIE,'') as TEKENINGREVISIE",
            },
            {
                row: "TEKENINGDATUMTIJD",
                sql: "date2jsondate(TEKENINGDATUMTIJD) as TEKENINGDATUMTIJD",
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
                body: "VOLGNUMMER",
                sql: "VOLGNUMMER",
                required: false,
                maxLength: 10,
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
                body: "BEWERKINGAANTAL",
                sql: "BEWERKINGAANTAL = '?'",
                required: false,
                maxLength: 10,
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
                body: "LIJN",
                sql: "LIJN = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "GEPRINT",
                sql: "GEPRINT = '?'",
                required: false,
                maxLength: 1,
                default: "",
            },
            {
                body: "PLANDATUMTIJD",
                sql: "PLANDATUMTIJD = screendate2date('?')",
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
                body: "EINDCONTROLENUMMER",
                sql: "EINDCONTROLENUMMER = '?'",
                required: false,
                maxLength: 10,
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
                body: "TEKENINGNUMMER",
                sql: "TEKENINGNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "TEKENINGREVISIE",
                sql: "TEKENINGREVISIE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "TEKENINGDATUMTIJD",
                sql: "TEKENINGDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Bewerkingflow = /** @class */ (function (_super) {
    __extends(Bewerkingflow, _super);
    function Bewerkingflow() {
        return _super.call(this, dict) || this;
    }
    return Bewerkingflow;
}(crud_1.Crud));
exports.Bewerkingflow = Bewerkingflow;
//# sourceMappingURL=bewerkingflow.js.map