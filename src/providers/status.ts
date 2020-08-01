import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import { Config } from "../config";

export class Status {
  constructor() {
    Logger.info("Creating Status");
  }

  private async getStatus(req: Request, res: Response, next: NextFunction) {
    let connection = await db.waitConnection();
    let poolstatus = await db.waitPoolstatus()
    let result = {
      poolstatus: poolstatus
    };
    connection.release();
    res.status(200).send(result);
    return;
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = Util.getLast(req.query.action);
    //
    Logger.request(req);
    //
    if (action == "get") {
      this.getStatus(req, res, next);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }
}
