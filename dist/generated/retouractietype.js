"use strict";
/*
add to router:
import { Retouractietype } from './providers/retouractietype';
private retouractietype: Retouractietype;
this.retouractietype = new Retouractietype();
this.app.route('/retouractietype.php').all((req, res, next) => this.retouractietype.routes(req, res, next));
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
    table: "RETOURACTIETYPE",
    key: [
        {
            body: "ACTIE",
            sql: "ACTIE",
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
                sql: "ACTIE as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "ACTIE",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "actie",
                sql: "ACTIE like ('%?%')",
            },
            {
                query: "naam",
                sql: "NAAM like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "ACTIE",
                sql: "ifnull(ACTIE,'') as ACTIE",
            },
            {
                row: "NAAM",
                sql: "ifnull(NAAM,'') as NAAM",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "ACTIE",
                sql: "ACTIE = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "NAAM",
                sql: "NAAM = '?'",
                required: false,
                maxLength: 50,
                default: "",
            }
        ],
    },
};
var Retouractietype = /** @class */ (function (_super) {
    __extends(Retouractietype, _super);
    function Retouractietype() {
        return _super.call(this, dict) || this;
    }
    return Retouractietype;
}(crud_1.Crud));
exports.Retouractietype = Retouractietype;
//# sourceMappingURL=retouractietype.js.map