
import { Crud } from '../crud';

const dict: Dict = {
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
        orderby: "ucase(ACTIE)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
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
        orderby: "ucase(ACTIE)",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "actie",
                sql: "ucase(ACTIE) like ucase('?%')",
            },
            {
                query: "naam",
                sql: "ucase(NAAM) like ucase('?%')",
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
                sql: "ACTIE",
                required: false,
                maxLength: 50,
                default: "",
            },
            {
                body: "NAAM",
                sql: "NAAM",
                required: false,
                maxLength: 50,
                default: "",
            }
        ],
    },
}

export class Retouractietype extends Crud {
    constructor() {
        super(
            dict
        )
    }
}
