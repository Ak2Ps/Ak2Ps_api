
import { Util } from "../util";
import { Request, Response, NextFunction } from "express";
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
select 1 as VOLGNR, 'Electrisch' as ID, 'Electrisch' as VALUE from DUAL
union
select 2 as VOLGNR, 'Mechanisch' as ID, 'Mechanisch' as VALUE from DUAL
union
select 3 as VOLGNR, 'Overig' as ID, 'Overig' as VALUE from DUAL
) Uitvalsoort`,
  select: {
    orderby: "VOLGNR",
    where: [],
    fields: [
      {
        row: "VALUE",
        sql: "VALUE"
      }
    ]
  },
};

export class Uitvalsoort extends Crud {
  static desc: any;

  constructor() {
    super(dict);
  }

  protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
    Util.unknownOperation(req, res, next);
  }

  protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
    Util.unknownOperation(req, res, next);
  }

  protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
    Util.unknownOperation(req, res, next);
  }
}
