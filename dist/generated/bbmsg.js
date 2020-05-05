"use strict";
/*
add to router:
import { Bbmsg } from './providers/bbmsg';
private bbmsg: Bbmsg;
this.bbmsg = new Bbmsg();
this.app.route('/bbmsg.php').all((req, res, next) => this.bbmsg.routes(req, res, next));
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
    table: "BBMSG",
    key: [
        {
            body: "ID",
            sql: "ID",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(BB)",
        where: [
            {
                query: "value",
                sql: "ucase(BB) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ID as ID"
            },
            {
                row: "VALUE",
                sql: "BB AS VALUE"
            }
        ],
    },
    query: {
        orderby: "ID",
        where: [
            {
                query: "idmaster",
                sql: "IDMASTER = ?",
            },
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "bb",
                sql: "BB like ('%?%')",
            },
            {
                query: "author",
                sql: "AUTHOR like ('%?%')",
            },
            {
                query: "email",
                sql: "EMAIL like ('%?%')",
            },
            {
                query: "date",
                sql: "DATE like ('%?%')",
            },
            {
                query: "moderated",
                sql: "MODERATED = ?",
            },
            {
                query: "header",
                sql: "HEADER like ('%?%')",
            },
            {
                query: "inhoud",
                sql: "INHOUD like ('%?%')",
            }
        ],
        fields: [
            {
                row: "IDMASTER",
                sql: "ifnull(cast(IDMASTER as CHAR),'') as IDMASTER",
            },
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "BB",
                sql: "ifnull(BB,'') as BB",
            },
            {
                row: "AUTHOR",
                sql: "ifnull(AUTHOR,'') as AUTHOR",
            },
            {
                row: "EMAIL",
                sql: "ifnull(EMAIL,'') as EMAIL",
            },
            {
                row: "DATE",
                sql: "DATE as DATE",
            },
            {
                row: "MODERATED",
                sql: "ifnull(cast(MODERATED as CHAR),'') as MODERATED",
            },
            {
                row: "HEADER",
                sql: "ifnull(HEADER,'') as HEADER",
            },
            {
                row: "INHOUD",
                sql: "ifnull(INHOUD,'') as INHOUD",
            }
        ],
    },
    update: {
        fields: [
            {
                body: "IDMASTER",
                sql: "IDMASTER",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "BB",
                sql: "BB = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "AUTHOR",
                sql: "AUTHOR = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "EMAIL",
                sql: "EMAIL = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "DATE",
                sql: "DATE = '?'",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "MODERATED",
                sql: "MODERATED",
                required: false,
                maxLength: 10,
                default: "",
            },
            {
                body: "HEADER",
                sql: "HEADER = '?'",
                required: false,
                maxLength: 255,
                default: "",
            },
            {
                body: "INHOUD",
                sql: "INHOUD = '?'",
                required: false,
                maxLength: 10,
                default: "",
            }
        ],
    },
};
var Bbmsg = /** @class */ (function (_super) {
    __extends(Bbmsg, _super);
    function Bbmsg() {
        return _super.call(this, dict) || this;
    }
    return Bbmsg;
}(crud_1.Crud));
exports.Bbmsg = Bbmsg;
//# sourceMappingURL=bbmsg.js.map