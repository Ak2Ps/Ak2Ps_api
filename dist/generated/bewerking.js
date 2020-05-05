"use strict";
/*
add to router:
import { Bewerking } from './providers/bewerking';
private bewerking: Bewerking;
this.bewerking = new Bewerking();
this.app.route('/bewerking.php').all((req, res, next) => this.bewerking.routes(req, res, next));
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
    table: "BEWERKING",
    key: [
        {
            body: "STATUS",
            sql: "STATUS",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(BEWERKINGSNUMMER)",
        where: [
            {
                query: "value",
                sql: "ucase(BEWERKINGSNUMMER) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "STATUS as ID"
            },
            {
                row: "VALUE",
                sql: "BEWERKINGSNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "STATUS",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "status",
                sql: "STATUS like ('%?%')",
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
                query: "productieaantal",
                sql: "PRODUCTIEAANTAL = ?",
            },
            {
                query: "startaantal",
                sql: "STARTAANTAL = ?",
            },
            {
                query: "initstartdatumtijd",
                sql: "INITSTARTDATUMTIJD > screendate2date('?')",
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
                query: "plandatumtijd",
                sql: "PLANDATUMTIJD > screendate2date('?')",
            },
            {
                query: "adviesplandatumtijd",
                sql: "ADVIESPLANDATUMTIJD > screendate2date('?')",
            },
            {
                query: "exactplandatumtijd",
                sql: "EXACTPLANDATUMTIJD > screendate2date('?')",
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
                row: "STATUS",
                sql: "ifnull(STATUS,'') as STATUS",
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
                row: "PRODUCTIEAANTAL",
                sql: "ifnull(cast(PRODUCTIEAANTAL as CHAR),'') as PRODUCTIEAANTAL",
            },
            {
                row: "STARTAANTAL",
                sql: "ifnull(cast(STARTAANTAL as CHAR),'') as STARTAANTAL",
            },
            {
                row: "INITSTARTDATUMTIJD",
                sql: "date2jsondate(INITSTARTDATUMTIJD) as INITSTARTDATUMTIJD",
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
                row: "PLANDATUMTIJD",
                sql: "date2jsondate(PLANDATUMTIJD) as PLANDATUMTIJD",
            },
            {
                row: "ADVIESPLANDATUMTIJD",
                sql: "date2jsondate(ADVIESPLANDATUMTIJD) as ADVIESPLANDATUMTIJD",
            },
            {
                row: "EXACTPLANDATUMTIJD",
                sql: "date2jsondate(EXACTPLANDATUMTIJD) as EXACTPLANDATUMTIJD",
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
                row: "OPMERKING",
                sql: "ifnull(OPMERKING,'') as OPMERKING",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "STATUS",
                sql: "STATUS = '?'",
                required: false,
                maxLength: 3,
                default: "",
            },
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
                body: "PRODUCTIEAANTAL",
                sql: "PRODUCTIEAANTAL = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "STARTAANTAL",
                sql: "STARTAANTAL = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "INITSTARTDATUMTIJD",
                sql: "INITSTARTDATUMTIJD = screendate2date('?')",
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
                body: "PLANDATUMTIJD",
                sql: "PLANDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "ADVIESPLANDATUMTIJD",
                sql: "ADVIESPLANDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "EXACTPLANDATUMTIJD",
                sql: "EXACTPLANDATUMTIJD = screendate2date('?')",
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
                body: "OPMERKING",
                sql: "OPMERKING = '?'",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Bewerking = /** @class */ (function (_super) {
    __extends(Bewerking, _super);
    function Bewerking() {
        return _super.call(this, dict) || this;
    }
    return Bewerking;
}(crud_1.Crud));
exports.Bewerking = Bewerking;
//# sourceMappingURL=bewerking.js.map