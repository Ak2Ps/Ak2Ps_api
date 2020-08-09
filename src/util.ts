import { Request, Response, NextFunction } from "express";
import db from "./db";
import * as child from "child_process";
import http from "http";
import * as fs from "fs";
import { Config } from "./config";
import { Logger } from "./logger";

export class Util {
  public static isRunning(req: Request, res: Response, next: NextFunction) {
    res.status(200).send("Ak2 is listening ...");
  }

  public static sleep(seconds: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      },
        1000 * seconds);
    })
  }

  public static milisleep(milis: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      },
        milis);
    })
  }

  public static getLast(obj: any): string {
    let result: any = obj;
    if (typeof obj == "object") {
      result = obj[obj.length - 1];
    }
    return result;
  }

  public static makeFilename(req_path: string): string {
    let result = req_path;
    result = encodeURI(result);
    result = result.replace(/\./gi, "_");
    return result;
  }

  public static decodeOpmerking(opmerking: string, maxlen: number): string {
    let result = '';
    result = decodeURIComponent(opmerking.trim());
    result = result.replace(/\n/g, ", ");
    result = result.replace(/\c/g, "");
    result = result.replace(/</g, "&lt");
    result = result.replace(/>/, "&gt");
    result = result.replace(/0x3F/, "?");
    result = result.replace(/\&/, "&amp;");
    if (maxlen > 0) {
      if (maxlen > 4) {
        if (result.length > maxlen) {
          result = result.substr(0, maxlen - 4) + " ...";
        } else {
        }
      } else {
        result = result.substr(0, maxlen);
      }
    }
    return result;
  }

  public static MakeHHMM(minuten: number): string {
    let result = '';
    let sign = '';
    if (minuten < 0) {
      minuten *= -1;
      sign = '-';
    }
    let uur = 0;
    while (minuten - 60 >= 0) {
      uur = uur + 1;
      minuten = minuten - 60;
    }
    let strminuten = String(minuten);
    while (strminuten.length < 2) {
      strminuten = '0' + strminuten;
    }
    let struur = String(uur);
    if (struur == '') {
      struur = '0';
    }
    result = sign + struur + ":" + strminuten;
    return result;
  }

  public static Date2Screentime(date: Date): string {
    let result = '';
    let uren = String(date.getHours());
    while (uren.length < 2) {
      uren = '0' + uren;
    }
    let minuten = String(date.getMinutes());
    while (minuten.length < 2) {
      minuten = '0' + minuten;
    }
    result = `${uren}:${minuten}`;
    return result;
  }

  public static Date2Screendate(date: Date): string {
    let result = '';
    //
    let jaar = String(date.getFullYear());
    while (jaar.length < 4) {
      jaar = '0' + jaar;
    }
    let maand = String(date.getMonth() + 1);
    while (maand.length < 2) {
      maand = '0' + maand;
    }
    let dag = String(date.getDate());
    while (dag.length < 2) {
      dag = '0' + dag;
    }
    result = `${dag}-${maand}-${jaar}`;
    return result;
  }

  public static Date2Screendatetime(date: Date): string {
    let result = '';
    //
    let jaar = String(date.getFullYear());
    while (jaar.length < 4) {
      jaar = '0' + jaar;
    }
    let maand = String(date.getMonth() + 1);
    while (maand.length < 2) {
      maand = '0' + maand;
    }
    let dag = String(date.getDate());
    while (dag.length < 2) {
      dag = '0' + dag;
    }
    result = `${dag}-${maand}-${jaar}`;
    //
    let uren = String(date.getHours());
    while (uren.length < 2) {
      uren = '0' + uren;
    }
    let minuten = String(date.getMinutes());
    while (minuten.length < 2) {
      minuten = '0' + minuten;
    }
    result = `${dag}-${maand}-${jaar} ${uren}:${minuten}`;
    return result;
  }

  public static Date2Screendatetimeseconds(date: Date): string {
    let result = '';
    //
    let jaar = String(date.getFullYear());
    while (jaar.length < 4) {
      jaar = '0' + jaar;
    }
    let maand = String(date.getMonth() + 1);
    while (maand.length < 2) {
      maand = '0' + maand;
    }
    let dag = String(date.getDate());
    while (dag.length < 2) {
      dag = '0' + dag;
    }
    result = `${dag}-${maand}-${jaar}`;
    //
    let uren = String(date.getHours());
    while (uren.length < 2) {
      uren = '0' + uren;
    }
    let minuten = String(date.getMinutes());
    while (minuten.length < 2) {
      minuten = '0' + minuten;
    }
    let seconds = String(date.getSeconds());
    while (seconds.length < 2) {
      seconds = '0' + seconds;
    }
    result = `${dag}-${maand}-${jaar} ${uren}:${minuten}:${seconds}`;
    return result;
  }

  public static unknownOperation(req: Request, res: Response, next: NextFunction): void {
    Logger.error(req, `${req.path}  ${req.method} ${JSON.stringify(req.query)} not implemented`);
    res.status(501).send(req.method + ": " + JSON.stringify(req.query) + "not implemented");
  }

  public static async waitParam(req: Request, res: Response, next: NextFunction, naam: string) {
    let result = '';
    let connection = await db.waitConnection();
    let sql = `
select INHOUD
from param
where NAAM = '${naam}'`;
    let rows = await db.waitQuery(connection, sql);
    if (rows[0]) {
      let row = rows[0];
      result = row.INHOUD;
    }
    //
    connection.release();
    return (result);
  }

  public static addAnd(where: string): string {
    let result = '';
    if (where == '') {
      result += '\nwhere ';
    } else {
      result += '\nand ';
    }
    return result;
  }

  public static constructFilename(FileName: string): string {
    FileName = FileName.replace(/\\/g, "_");
    FileName = FileName.replace(/\//g, "_");
    FileName = FileName.replace(/\?/g, "_");
    FileName = FileName.replace(/%/g, "_");
    FileName = FileName.replace(/\*/g, "_");
    FileName = FileName.replace(/"/g, "_");
    FileName = FileName.replace(/</g, "_");
    FileName = FileName.replace(/>/g, "_");
    return FileName;
  }


  public static postInfo(url: string, body?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let thisLength = 0;
      let headers: any = {};
      let thisBody = '';
      if (body) {
        thisBody = JSON.stringify(body);
        thisLength = thisBody.length;
        headers = {
          "Content-Type": "application/json",
          "Content-Length": thisLength,
          "Accept": '*/*',
        }
      }
      let result: any = {};
      let ak2req = http.request(
        {
          host: Config.server,
          path: url,
          method: 'POST',
          port: Config.serverPort,
          headers: headers,
          protocol: 'http:'
        },
        ak2res => {
          let responseString = "";
          ak2res.on("data", (data) => {
            responseString += data;
          });
          ak2res.on("end", () => {
            try {
              result = JSON.parse(responseString);
            } catch (error) {
              result = responseString;
            }
            resolve(result);
          });
          ak2res.on("error", (error) => {
            Logger.error(JSON.stringify(error));
            reject(error);
          });
        }
      );
      ak2req.on("error", (error) => {
        Logger.error(JSON.stringify(error));
        reject(false);
      })
      if (body) {
        ak2req.write(thisBody);
      }
      ak2req.end();
    })
  }

  public static getInfo(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = {};
      let result: any;
      let ak2req = http.request(
        {
          host: Config.server,
          path: url,
          method: 'GET',
          port: Config.serverPort,
          headers: headers,
          protocol: 'http:'
        },
        ak2res => {
          let responseString = "";
          ak2res.on("data", (data) => {
            responseString += data;
          });
          ak2res.on("end", () => {
            try {
              result = JSON.parse(responseString);
            } catch (error) {
              result = responseString;
            }
            resolve(result);
          });
          ak2res.on("error", (error) => {
            Logger.error(JSON.stringify(error));
            reject(error);
          });
        }
      );
      ak2req.on("error", (error) => {
        Logger.error(JSON.stringify(error));
        reject(false);
      })
      ak2req.end();
    })
  }


}
