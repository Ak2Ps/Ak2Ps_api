"use strict";
/*
add to router:
import { Productgroepregel } from './providers/productgroepregel';
private productgroepregel: Productgroepregel;
this.productgroepregel = new Productgroepregel();
this.app.route('/productgroepregel.php').all((req, res, next) => this.productgroepregel.routes(req, res, next));
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
    table: "PRODUCTGROEPREGEL",
    key: [
        {
            body: "PRODUCTGROEP",
            sql: "PRODUCTGROEP",
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
                sql: "PRODUCTGROEP as ID"
            },
            {
                row: "VALUE",
                sql: "PRODUCTNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTGROEP",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "productgroep",
                sql: "PRODUCTGROEP like ('%?%')",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            },
            {
                query: "isonderdeel",
                sql: "ISONDERDEEL like ('%?%')",
            },
            {
                query: "volgnummer",
                sql: "VOLGNUMMER = ?",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "PRODUCTGROEP",
                sql: "ifnull(PRODUCTGROEP,'') as PRODUCTGROEP",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "ISONDERDEEL",
                sql: "ifnull(ISONDERDEEL,'') as ISONDERDEEL",
            },
            {
                row: "VOLGNUMMER",
                sql: "ifnull(cast(VOLGNUMMER as CHAR),'') as VOLGNUMMER",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "PRODUCTGROEP",
                sql: "PRODUCTGROEP = '?'",
                required: false,
                maxLength: 50,
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
                body: "ISONDERDEEL",
                sql: "ISONDERDEEL = '?'",
                required: false,
                maxLength: 1,
                default: "",
            },
            {
                body: "VOLGNUMMER",
                sql: "VOLGNUMMER",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Productgroepregel = /** @class */ (function (_super) {
    __extends(Productgroepregel, _super);
    function Productgroepregel() {
        return _super.call(this, dict) || this;
    }
    return Productgroepregel;
}(crud_1.Crud));
exports.Productgroepregel = Productgroepregel;
//# sourceMappingURL=productgroepregel.js.map