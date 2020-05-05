import { Crud } from "../crud";

const dict: Dict = {
  table: "AFDELING",
  key: [
    {
      body: "AFDELING",
      sql: "AFDELING"
    }
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "AFDELING",
    where: [
      {
        query: "value",
        sql: "ucase(NAAM) like '%?%'"
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "AFDELING as ID"
      },
      {
        row: "VALUE",
        sql: "NAAM AS VALUE"
      }
    ]
  },
  query: {
    orderby: "AFDELING",
    where: [
      {
        query: "ID",
        sql: "ID = ?"
      },
      {
        query: "afdeling",
        sql: "AFDELING like ('%?%')"
      },
      {
        query: "naam",
        sql: "NAAM like ('%?%')"
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "cast(ID as CHAR) as ID"
      },
      {
        row: "AFDELING",
        sql: "ifnull(AFDELING,'') as AFDELING"
      },
      {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM"
      }
    ]
  },
  update: {
    fields: [
      {
        body: "AFDELING",
        sql: "AFDELING",
        required: true,
        maxLength: 3,
        default: ""
      },
      {
        body: "NAAM",
        sql: "NAAM",
        required: true,
        maxLength: 50,
        default: ""
      }
    ]
  }
};

export class Afdeling extends Crud {
  constructor() {
    super(dict);
  }
}
