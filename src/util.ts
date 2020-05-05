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

  public static compareWithPhp(rows: any, req: Request, res: Response, next: NextFunction): void {
    if (Config.runmode != runmode.test) {
      return;
    }
    let comparetype = typeof rows;
    this.testPhp(req, res, next, (responseString: any) => {
      let result = "";
      let phpstring: any = "";
      let nodestring: any = "";
      let phpobj = {};
      if (comparetype == "string") {
        phpstring = responseString;
        nodestring = rows;
      } else {
        try {
          phpobj = JSON.parse(responseString);
        } catch (e) {
          phpobj = responseString;
        }
      }
      Logger.test(`    Comparing with ${req.path} ${JSON.stringify(req.query)} ...`);
      try {
        if (comparetype == "string") {
          if (String(phpstring).substr(0, 1) == '<') {
            phpstring = String(phpstring).replace(/\n/g, '');
            phpstring = String(phpstring).replace(/\r/g, '');
            phpstring = String(phpstring).replace(/\t/g, '');
            phpstring = String(phpstring).replace(/<\/tr>/gi, '</tr>\n');
            phpstring = String(phpstring).replace(/<\/div>/gi, '</div>\n');
            phpstring = String(phpstring).replace(/<\/table>/gi, '</table>\n');
            nodestring = String(nodestring).replace(/\n/g, '');
            nodestring = String(nodestring).replace(/\r/g, '');
            nodestring = String(nodestring).replace(/\t/g, '');
            nodestring = String(nodestring).replace(/<\/tr>/gi, '</tr>\n');
            nodestring = String(nodestring).replace(/<\/div>/gi, '</div>\n');
            nodestring = String(nodestring).replace(/<\/table>/gi, '</table>\n');
          }
        } else {
          phpstring = JSON.stringify(phpobj, null, 2);
          nodestring = JSON.stringify(rows, null, 2);
        }
        if (phpstring != nodestring) {
          fs.writeFileSync(`${Config.appDir}/log${Util.makeFilename(req.path)}.phpdat`, `${phpstring}`);
          fs.writeFileSync(`${Config.appDir}/log${Util.makeFilename(req.path)}.nodedat`, `${nodestring}`);
          Logger.test("    *********************");
          Logger.test("    * Compare diffs found");
          Logger.test("    *********************");
          fs.appendFileSync(`${Config.appDir}/log/test.log`, `${req.path} diffs ...\n`);
        } else {
          Logger.test("    Compare ok");
          fs.appendFileSync(`${Config.appDir}/log/test.log`, `${req.path} ok ...\n`);
        }
      } catch (e) {
        console.log(phpobj);
        console.log(rows);
        Logger.test(e);
        Logger.test("    Compare failed ");
      }
    });
    return;
  }

  public static testPhp(req: Request, res: Response, next: NextFunction, callback: any): void {
    let body = JSON.stringify(req.body);
    let headers: any = req.headers;
    headers["Content-Type"] = "application/json";
    headers["Content-Length"] = body.length;
    let testreq: http.ClientRequest = http.request(
      {
        host: "localhost",
        path: "/" + Config.appUrl + req.originalUrl,
        method: req.method,
        headers: headers
      },
      testres => {
        let responseString = "";
        testres.on("data", function (data) {
          responseString += data;
        });
        testres.on("end", function () {
          callback(responseString);
        });
      }
    );
    testreq.write(body);
    testreq.end();
  }

  public static exePhp(req: Request, res: Response, next: NextFunction): void {
    let body = JSON.stringify(req.body);
    Logger.test(`    ********************************************************`);
    Logger.test(`    * reroute to ${req.path} ${JSON.stringify(req.query)}`);
    Logger.test(`    ********************************************************`);
    fs.appendFileSync(`${Config.appDir}/log/test.log`, `${req.path} reroute ...\n`);
    let headers: any = req.headers;
    headers["Content-Type"] = "application/json";
    headers["Content-Length"] = body.length;
    let exereq: http.ClientRequest = http.request(
      {
        host: "localhost",
        path: "/" + Config.appUrl + req.originalUrl,
        method: req.method,
        headers: headers
      },
      exeres => {
        let responseString = "";
        exeres.on("error", error => {
          Logger.test(error);
        });
        exeres.on("data", data => {
          responseString += data;
        });
        exeres.on("end", () => {
          res.status(200).send(responseString);
        });
      }
    );
    exereq.write(body);
    exereq.end();
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

  public static unknownOperation(req: Request, res: Response, next: NextFunction): void {
    Logger.error(req,`${req.path}  ${req.method} ${JSON.stringify(req.query)} not implemented`);
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
      return(result);
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


}
