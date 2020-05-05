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
select 1 as VOLGNR, 'Ja' as VALUE from DUAL
union
select 2 as VOLGNR, 'Nee' as VALUE from DUAL
) JaNee`,
  select: {
    orderby: "VOLGNR",
    where: [],
    fields: [
      {
        row: "VALUE",
        sql: "VALUE"
      }
    ]
  }
};

export class Janee extends Crud {
  static desc: any;

  constructor() {
    super(dict);
  }

  public async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
    Util.unknownOperation(req, res, next);
  }

  public async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
    Util.unknownOperation(req, res, next);
  }

  public async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
    Util.unknownOperation(req, res, next);
  }
}
