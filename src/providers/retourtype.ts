import { Crud } from '../crud';

const dict: Dict = {
    table: "RETOURTYPE",
    key: [
        {
            body: "RETOURTYPE",
            sql: "RETOURTYPE",
        }
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "ucase(RETOURTYPE)",
        where: [
            {
                query: "value",
                sql: "ucase(NAAM) like ucase('%?%')",
            }
        ],
        fields: [
            {
                row: "ID",
                sql: "RETOURTYPE as ID"
            },
            {
                row: "VALUE",
                sql: "NAAM AS VALUE"
            }
        ],
    },
    query: {
        orderby: "RETOURTYPE",
        where: [
            {
                query: "id",
                sql: "ID = ?",
            },
            {
                query: "retourtype",
                sql: "ucase(RETOURTYPE) like ucase('%?%')",
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
                row: "RETOURTYPE",
                sql: "ifnull(RETOURTYPE,'') as RETOURTYPE",
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
                body: "RETOURTYPE",
                sql: "RETOURTYPE",
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

export class Retourtype extends Crud {
    constructor() {
        super(
            dict
        )
    }
}
