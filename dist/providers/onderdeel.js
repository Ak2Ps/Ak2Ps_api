"use strict";
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
    table: "ONDERDEEL",
    key: [
        {
            body: "PRODUCTNUMMER",
            sql: "PRODUCTNUMMER",
        },
        {
            body: "ONDERDEELNUMMER",
            sql: "ONDERDEELNUMMER",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(PRODUCTNUMMER), ucase(ONDERDEELNUMMER)",
        where: [
            {
                query: "value",
                sql: "ucase(PRODUCTNUMMER) like '%?%'",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "PRODUCTNUMMER as ID"
            },
            {
                row: "VALUE",
                sql: "ONDERDEELNUMMER AS VALUE"
            }
        ],
    },
    query: {
        orderby: "PRODUCTNUMMER,ONDERDEELNUMMER",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "productnummer",
                sql: "PRODUCTNUMMER like ('?%')",
            },
            {
                query: "onderdeelnummer",
                sql: "ONDERDEELNUMMER like ('%?%')",
            },
            {
                query: "faktor",
                sql: "FAKTOR = ?",
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
                row: "ONDERDEELNUMMER",
                sql: "ifnull(ONDERDEELNUMMER,'') as ONDERDEELNUMMER",
            },
            {
                row: "FAKTOR",
                sql: "ifnull(cast(FAKTOR as CHAR),'') as FAKTOR",
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
                body: "ONDERDEELNUMMER",
                sql: "ONDERDEELNUMMER = '?'",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "FAKTOR",
                sql: "FAKTOR = '?'",
                required: false,
                maxLength: 17,
                default: "",
            }
        ],
    },
};
var Onderdeel = /** @class */ (function (_super) {
    __extends(Onderdeel, _super);
    function Onderdeel() {
        return _super.call(this, dict) || this;
    }
    return Onderdeel;
}(crud_1.Crud));
exports.Onderdeel = Onderdeel;
//# sourceMappingURL=onderdeel.js.map