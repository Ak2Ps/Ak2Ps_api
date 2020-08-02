import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import { Config } from "../config";
import * as fs from "fs";

export class Status {
  constructor() {
    Logger.info("Creating Status");
  }

  private async getStatus(req: Request, res: Response, next: NextFunction) {
    //
    // poolstatus
    //
    let poolstatus = await db.waitPoolstatus()
    //
    // haal versie
    //
    let connection = await db.waitConnection();
    let thisParam = await Util.waitParam(req, res, next, "VERSIE");
    //
    // tail error.log
    //
    let thisError = [];
    let thisErrorName = Config.appDir + "/log/error.log";
    let thisErrorLines = String(fs.readFileSync(thisErrorName)).split("\n");
    for (let iLine = thisErrorLines.length - 50; iLine < thisErrorLines.length; iLine++) {
      if (iLine >= 0) {
        thisError.push(String(iLine) + ": " + thisErrorLines[iLine]);
      }
    }
    //
    // tail api.log
    //
    let thisLog = [];
    let thisApiName = Config.appDir + "/log/api.log";
    let thisApiLines = String(fs.readFileSync(thisApiName)).split("\n");
    for (let iLine = thisApiLines.length - 50; iLine < thisApiLines.length; iLine++) {
      if (iLine >= 0) {
        thisLog.push(String(iLine) + ": " + thisApiLines[iLine]);
      }
    }
    //
    //
    //
    connection.release();
    let result = {
      poolstatus: poolstatus,
      versie: thisParam,
      error: thisError,
      log: thisLog,
    };
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
