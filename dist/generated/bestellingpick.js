"use strict";
/*
add to router:
import { Bestellingpick } from './providers/bestellingpick';
private bestellingpick: Bestellingpick;
this.bestellingpick = new Bestellingpick();
this.app.route('/bestellingpick.php').all((req, res, next) => this.bestellingpick.routes(req, res, next));
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
    table: "BESTELLINGPICK",
    key: [
        {
            body: "BESTELNUMMER",
            sql: "BESTELNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(BESTELREGEL)",
        where: [
            {
                query: "value",
                sql: "ucase(BESTELREGEL) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "BESTELNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "BESTELREGEL AS VALUE"
            }
        ],
    },
    query: {
        orderby: "BESTELNUMMER",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "bestelnummer",
                sql: "BESTELNUMMER like ('%?%')",
            },
            {
                query: "bestelregel",
                sql: "BESTELREGEL like ('%?%')",
            },
            {
                query: "status",
                sql: "STATUS like ('%?%')",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            },
            {
                query: "onderdeelnummer",
                sql: "ONDERDEELNUMMER like ('%?%')",
            },
            {
                query: "bestelling",
                sql: "BESTELLING = ?",
            },
            {
                query: "faktor",
                sql: "FAKTOR = ?",
            },
            {
                query: "gepickeddatumtijd",
                sql: "GEPICKEDDATUMTIJD > screendate2date('?')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "BESTELNUMMER",
                sql: "ifnull(BESTELNUMMER,'') as BESTELNUMMER",
            },
            {
                row: "BESTELREGEL",
                sql: "ifnull(BESTELREGEL,'') as BESTELREGEL",
            },
            {
                row: "STATUS",
                sql: "ifnull(STATUS,'') as STATUS",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "ONDERDEELNUMMER",
                sql: "ifnull(ONDERDEELNUMMER,'') as ONDERDEELNUMMER",
            },
            {
                row: "BESTELLING",
                sql: "ifnull(cast(BESTELLING as CHAR),'') as BESTELLING",
            },
            {
                row: "FAKTOR",
                sql: "ifnull(cast(FAKTOR as CHAR),'') as FAKTOR",
            },
            {
                row: "GEPICKEDDATUMTIJD",
                sql: "date2jsondate(GEPICKEDDATUMTIJD) as GEPICKEDDATUMTIJD",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "BESTELNUMMER",
                sql: "BESTELNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "BESTELREGEL",
                sql: "BESTELREGEL = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "STATUS",
                sql: "STATUS = '?'",
                required: false,
                maxLength: 3,
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
                body: "ONDERDEELNUMMER",
                sql: "ONDERDEELNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "BESTELLING",
                sql: "BESTELLING = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "FAKTOR",
                sql: "FAKTOR = '?'",
                required: false,
                maxLength: 17,
                default: "",
            },
            {
                body: "GEPICKEDDATUMTIJD",
                sql: "GEPICKEDDATUMTIJD = screendate2date('?')",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Bestellingpick = /** @class */ (function (_super) {
    __extends(Bestellingpick, _super);
    function Bestellingpick() {
        return _super.call(this, dict) || this;
    }
    return Bestellingpick;
}(crud_1.Crud));
exports.Bestellingpick = Bestellingpick;
//# sourceMappingURL=bestellingpick.js.map