import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import * as fs from "fs";
import { Config } from "../config";

export class Loginfo {
  constructor() {
    Logger.info("Creating Loginfo");
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    let filename = `${Config.appDir}/log/nodeapi.log`;
    Logger.test(`loginfo: ${method}, ${action}`);
    //
    //
    if (action == "loadlog") {
      let data = "";
      try {
        data = String(fs.readFileSync(filename));
      } catch (error) {}
      let result = {
        success: "true",
        message: data,
        data: []
      }
      res.status(200).send(result);
      return;
    } else if (action == "clearlog") {
      try {
        fs.unlinkSync(filename);
      } catch (error) {}
      let result = {
        success: "true",
        message: ""
      }
      res.status(200).send(result);
      return;
    }
    Util.unknownOperation(req, res, next);
  }
}
