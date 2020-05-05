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
select 1 as VOLGNR, 'rapBEWERKINGFLOWPICK.php' as VALUE from DUAL
union
select 2 as VOLGNR, 'rapBEWERKINGFLOWBEWERK.php' as VALUE from DUAL
union
select 3 as VOLGNR, 'rapBEWERKINGFLOWEINDCONTROLE.php' as VALUE from DUAL
) Layout`,
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

export class Layout extends Crud {
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
