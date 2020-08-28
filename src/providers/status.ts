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

  private async setLogger(req: Request, res: Response, next: NextFunction) {
    let query = db.fixQuery(req.query);
    if (query.show_error){
      if (query.show_error == "false"){
        Config.show_error = false;
      } else {
        Config.show_error = true;
      }
    }
    if (query.show_warning){
      if (query.show_warning == "false"){
        Config.show_warning = false;
      } else {
        Config.show_warning = true;
      }
    }
    if (query.show_info){
      if (query.show_info == "false"){
        Config.show_info = false;
      } else {
        Config.show_info = true;
      }
    }
    if (query.show_sql){
      if (query.show_sql == "false"){
        Config.show_sql = false;
      } else {
        Config.show_sql = true;
      }
    }
    let result = {
      show_error: Config.show_error,
      show_warning: Config.show_warning,
      show_info: Config.show_info,
      show_sql: Config.show_sql,
    };
    res.status(200).send(result);
    return;
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
    let thisErrorLines:any = [];
    try {
      thisErrorLines = String(fs.readFileSync(thisErrorName)).split("\n");
    } catch (error) {
      // no errors
    }
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
    let thisApiLines:any = [];
    try {
      thisApiLines = String(fs.readFileSync(thisApiName)).split("\n");
    } catch (error) {
      // no log
    }
    for (let iLine = thisApiLines.length - 50; iLine < thisApiLines.length; iLine++) {
      if (iLine >= 0) {
        thisLog.push(String(iLine) + ": " + thisApiLines[iLine]);
      }
    }
    //
    // database backup
    //
    let thisDb:any = [];
    fs.readdirSync(Config.appDir + "/backup").map(filename => {
      if (filename.endsWith(".sql")) {
        let path = Config.appDir + "/backup/" + filename;
        let file = fs.statSync(path);
        thisDb.push(filename + ": (" + file.size + ")");
      }
    })
    //
    // data backup
    //
    let thisData:any = [];
    fs.readdirSync(Config.appDir + "/backup").map(filename => {
      if (filename.endsWith(".7z")) {
        let path = Config.appDir + "/backup/" + filename;
        let file = fs.statSync(path);
        thisData.push(filename + ": (" + file.size + ")");
      }
    })
    //
    // import
    //
    let thisImport: any = [];
    fs.readdirSync(Config.appDir + "/import").map(filename => {
      if (filename.endsWith(".log")) {
        let path = Config.appDir + "/import/" + filename;
        let file = fs.statSync(path);
        thisImport.push(filename);
      }
    })
    //
    //
    //
    connection.release();
    let result = {
      versie: thisParam,
      show_error: Config.show_error,
      show_warning: Config.show_warning,
      show_info: Config.show_info,
      show_sql: Config.show_sql,
      poolstatus: poolstatus,
      dbbackupstatus: thisDb,
      databackupstatus: thisData,
      importstatus: thisImport,
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
    } else if (action == "setLogger"){
      this.setLogger(req,res,next);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }
}
