"use strict";
/*
add to router:
import { Productflow } from './providers/productflow';
private productflow: Productflow;
this.productflow = new Productflow();
this.app.route('/productflow.php').all((req, res, next) => this.productflow.routes(req, res, next));
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
    table: "PRODUCTFLOW",
    key: [
        {
            body: "PRODUCTNUMMER",
            sql: "PRODUCTNUMMER",
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
                sql: "PRODUCTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "VOLGNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTNUMMER",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('%?%')",
            },
            {
                query: "volgnummer",
                sql: "VOLGNUMMER = ?",
            },
            {
                query: "bewerkingsoort",
                sql: "BEWERKINGSOORT like ('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "PRODUCTNUMMER",
                sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
            },
            {
                row: "VOLGNUMMER",
                sql: "ifnull(cast(VOLGNUMMER as CHAR),'') as VOLGNUMMER",
            },
            {
                row: "BEWERKINGSOORT",
                sql: "ifnull(BEWERKINGSOORT,'') as BEWERKINGSOORT",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "PRODUCTNUMMER",
                sql: "PRODUCTNUMMER = '?'",
                required: false,
                maxLength: 50,
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
            }
        ],
    },
};
var Productflow = /** @class */ (function (_super) {
    __extends(Productflow, _super);
    function Productflow() {
        return _super.call(this, dict) || this;
    }
    return Productflow;
}(crud_1.Crud));
exports.Productflow = Productflow;
//# sourceMappingURL=productflow.js.map