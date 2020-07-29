import { Request, Response, NextFunction } from "express";
import * as child from "child_process";
import http from "http";
import * as fs from "fs";
import { Config } from "./config";

export class Logger {

  private static add(message: any): void {
    if (typeof message == "object") {
      message = JSON.stringify(message, null, 2);
    }
    try {
      fs.appendFileSync(`${Config.appDir}/log/api.log`, `${message}\n`);
    } catch (error) {
      console.log(error);
    }
  }

  public static reset(): void {
    try {
      fs.mkdirSync(`${Config.appDir}/log`);
    } catch (error) { }
    try {
      fs.unlinkSync(`${Config.appDir}/log/api.log`);
    } catch (error) { }
  }

  public static error(message: string): void;
  public static error(req: Request, message: string): void;
  public static error(req: Request | string, message?: string): void {
    if (Config.show_error) {
      let thisMessage: any;
      let thisPath: any;
      if (typeof req == "string") {
        thisMessage = req;
        thisPath = '';
      } else {
        thisMessage = message;
        try {
          thisPath = req.path;
        } catch(error){
          thisPath = '???';
        }
      }
      console.log(thisMessage);
      this.add(thisMessage);
      if (req !== undefined) {
        try {
          fs.appendFileSync(`${Config.appDir}/log/test.log`, `${thisPath} error ...\n`);
        } catch (error) {
          console.log(error);
        }
      }
    }
  }

  public static warning(message: any): void {
    if (Config.show_warning) {
      console.log(message);
      this.add(message);
    }
  }

  public static info(message: any): void {
    if (Config.show_info) {
      console.log(message);
      this.add(message);
    }
  }

  public static sql(message: any): void {
    if (Config.show_sql) {
      console.log(`\n<sql>\n${message}\n</sql>\n`);
      this.add(`\n<sql>\n${message}\n</sql>\n`);
    }
  }

  public static test(message: any): void {
    if (Config.runmode == runmode.test) {
      console.log(message);
      this.add(message);
    }
  }

  public static request(req: Request): void {
    if (Config.runmode == runmode.test) {
      let message = `${req.method} ${req.path} ${req.query.action || ''}`;
      console.log(message);
      this.add(message);
    }
  }
}
