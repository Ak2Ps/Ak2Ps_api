
import { Crud } from '../crud';

const dict: Dict = {
    table: "RETOURTERMIJN",
    key: [
        {
            body: "RETOURTERMIJN",
            sql: "RETOURTERMIJN",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(RETOURTERMIJN)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "RETOURTERMIJN as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "RETOURTERMIJN",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "retourtermijn",
                sql: "ucase(RETOURTERMIJN) like ucase('%?%')",
            },
            {
                query: "naam",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "ifnull(cast(ID as CHAR),'') as ID",
            },
            {
                row: "RETOURTERMIJN",
                sql: "ifnull(RETOURTERMIJN,'') as RETOURTERMIJN",
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
                body: "RETOURTERMIJN",
                sql: "RETOURTERMIJN = '?'",
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
}

export class Retourtermijn extends Crud {
    constructor() {
        super(
            dict
        )
    }
}
