import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Crud } from "../crud";

const dict: Dict = {
  key: [
    {
      body: "VOLGNR",
      sql: "VOLGNR"
    }
  ],
  table: `
(
select 1 as VOLGNR, 'Voorraad' as ID, 'Voorraad' as VALUE from DUAL
union
select 2 as VOLGNR, 'Maak' as ID, 'Maak' as VALUE from DUAL
union
select 3 as VOLGNR, 'Alle' as ID, 'Alle.php' as VALUE from DUAL
) Soort`,
  select: {
    orderby: "VOLGNR",
    where: [],
    fields: [
      {
        row: "ID",
        sql: "ID"
      },
      {
        row: "VALUE",
        sql: "VALUE"
      }
    ]
  },
  query: {
    orderby: "VOLGNR",
    where: [],
    fields: [
      {
        row: "ID",
        sql: "ID"
      },
      {
        row: "SOORT",
        sql: "VALUE"
      }
    ]
  },
};

export class Soort extends Crud {
  static desc: any;

  constructor() {
    super(dict);
  }

  public async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
    Util.unknownOperation(req, res, next);
  }

  public async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
    Util.unknownOperation(req, res, next);
  }
}
