import { Crud } from "../crud";

const dict: Dict = {
  table: "UITVAL",
  key: [
    {
      body: "UITVAL",
      sql: "UITVAL"
    }
  ],
  altKeys: [],
  select: {
    orderby: "UITVAL",
    where: [],
    fields: [
      {
        row: "ID",
        sql: "UITVAL as ID"
      },
      {
        row: "VALUE",
        sql: "concat(uitval,' ',naam) as VALUE"
      }
    ]
  },
  query: {
    orderby: "UITVAL",
    where: [
      {
        query: "naam",
        sql: "naam like ('%?%')"
      },
      {
        query: "uitval",
        sql: "uitval = '?'"
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "cast(Id as CHAR) as ID"
      },
      {
        row: "UITVAL",
        sql: "ifnull(Uitval,'') as UITVAL"
      },
      {
        row: "NAAM",
        sql: "ifnull(Naam,'') as NAAM"
      },
      {
        row: "KLEUR",
        sql: "ifnull(Kleur,'') as KLEUR"
      },
      {
        row: "UITVALSOORT",
        sql: "ifnull(Uitvalsoort,'') as UITVALSOORT"
      },
      {
        row: "LANGENAAM",
        sql: "RTRIM(ifnull(concat(uitval,' ',naam),'')) as LANGENAAM"
      }
    ]
  },
  update: {
    fields: [
      {
        body: "UITVAL",
        sql: "UITVAL",
        required: true,
        maxLength: 1,
        default: ""
      },
      {
        body: "NAAM",
        sql: "NAAM",
        required: true,
        maxLength: 50,
        default: ""
      },
      {
        body: "KLEUR",
        sql: "KLEUR",
        required: false,
        maxLength: 50,
        default: ""
      },
      {
        body: "UITVALSOORT",
        sql: "UITVALSOORT",
        required: true,
        maxLength: 50,
        default: ""
      }
    ]
  }
};

export class Uitval extends Crud {
  constructor() {
    super(dict);
  }
}
