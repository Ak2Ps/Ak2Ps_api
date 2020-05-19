import { Crud } from "../crud";

const dict: Dict = {
  table: "BEWERKINGSOORT",
  key: [
    {
      body: "BEWERKINGSOORT",
      sql: "BEWERKINGSOORT"
    }
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "ucase(NAAM)",
    where: [
      {
        query: "value",
        sql: "ucase(NAAM) like ucase('%?%')"
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "BEWERKINGSOORT as ID"
      },
      {
        row: "VALUE",
        sql: "NAAM AS VALUE"
      }
    ]
  },
  query: {
    orderby: "BEWERKINGSOORT",
    where: [
      {
        query: "bewerkingsoort",
        sql: "ucase(BEWERKINGSOORT) like ucase('%?%')"
      },
      {
        query: "naam",
        sql: "ucase(NAAM) like ucase('%?%')"
      },
      {
        query: "kleur",
        sql: "ucase(KLEUR) like ucase('%?%')"
      },
      {
        query: "afkorting",
        sql: "ucase(AFKORTING) like ucase('%?%')"
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "cast(ID as CHAR) as ID"
      },
      {
        row: "BEWERKINGSOORT",
        sql: "ifnull(BEWERKINGSOORT,'') as BEWERKINGSOORT"
      },
      {
        row: "NAAM",
        sql: "ifnull(NAAM,'') as NAAM"
      },
      {
        row: "VOLGORDE",
        sql: "ifnull(VOLGORDE,'') as VOLGORDE"
      },
      {
        row: "KLEUR",
        sql: "ifnull(KLEUR,'') as KLEUR"
      },
      {
        row: "VOORTGANG",
        sql: "ifnull(VOORTGANG,'') as VOORTGANG"
      },
      {
        row: "AFKORTING",
        sql: "ifnull(AFKORTING,'') as AFKORTING"
      },
      {
        row: "LAYOUT",
        sql: "ifnull(LAYOUT,'') as LAYOUT"
      },
      {
        row: "REPARATIE",
        sql: "ifnull(REPARATIE,'') as REPARATIE"
      }
    ]
  },
  update: {
    fields: [
      {
        body: "BEWERKINGSOORT",
        sql: "BEWERKINGSOORT",
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
        body: "VOLGORDE",
        sql: "VOLGORDE",
        required: false,
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
        body: "VOORTGANG",
        sql: "VOORTGANG",
        required: false,
        maxLength: 1,
        default: ""
      },
      {
        body: "AFKORTING",
        sql: "AFKORTING",
        required: false,
        maxLength: 50,
        default: ""
      },
      {
        body: "LAYOUT",
        sql: "LAYOUT",
        required: false,
        maxLength: 50,
        default: ""
      },
      {
        body: "REPARATIE",
        sql: "REPARATIE",
        required: false,
        maxLength: 1,
        default: ""
      }
    ]
  }
};

export class Bewerkingsoort extends Crud {
  constructor() {
    super(dict);
  }
}
