import mysql, { PoolConnection } from "mysql";
import { Request, Response, NextFunction } from "express";
import { Util } from "./util";
import { Config } from "./config";
import { Logger } from "./logger";

class Db {
  private pool: mysql.Pool;

  constructor() {
    this.pool = <mysql.Pool><unknown>undefined;
  }

  public start() {
    this.pool = mysql.createPool({
      host: Config.dbhost,
      user: Config.dbuser,
      password: Config.dbpassword,
      database: Config.dbschema,
      multipleStatements: true
    });

  }

  public waitConnection(): Promise<PoolConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err: mysql.MysqlError, connection: mysql.PoolConnection) => {
        if (err) {
          Logger.error(JSON.stringify(err));
          reject(err);
        }
        resolve(connection);
      });
    });
  }

  public waitQuery(connection: mysql.PoolConnection, sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Logger.sql(sql);
      connection.query(sql, (err, rows) => {
        if (err) {
          Logger.error(JSON.stringify(err));
          Logger.error(sql);
          reject(err);
        }
        if (Array.isArray(rows)) {
          rows = this.fixRows(rows);
        }
        resolve(rows);
      });
    });
  }

  public waitDDL(connection: mysql.PoolConnection, sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Logger.sql(sql);
      connection.query(sql, (err, rows) => {
        if (err) {
          Logger.error(JSON.stringify(err));
          Logger.error(sql);
          resolve(err);
        }
        if (Array.isArray(rows)) {
          rows = this.fixRows(rows);
        }
        resolve(rows);
      });
    });
  }

  public waitQuerySilent(connection: mysql.PoolConnection, sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      connection.query(sql, (err, rows) => {
        if (err) {
          reject("Error in silent query ...");
        }
        if (Array.isArray(rows)) {
          rows = this.fixRows(rows);
        }
        resolve(rows);
      });
    });
  }

  public fix(instring: any): string {
    if (!instring) {
      return "";
    }
    instring = String(instring);
    if (instring.toUpperCase() == "UNDEFINED") {
      return "";
    }
    if (instring.toUpperCase() == "NULL") {
      return "";
    }
    return instring.replace(/'/gi, "''");
  }

  public editorfix(instring: any): string {
    if (!instring) {
      return "";
    }
    instring = String(instring);
    return instring;
  }

  public fixRows(rows: {}[]): {}[] {
    let result: {}[] = [];
    rows.forEach((element) => {
      result.push(this.fixRow(element));
    })
    return result;
  }

  public fixRow(row: any): {} {
    let result: any = {};
    for (let key in row) {
      let value = row[key];
      if (value == null) {
        value = "";
      }
      if (typeof value == "string") {
        value = value.trimRight();
      } else if (typeof value == "number") {
        value = String(value);
        value = value.trimRight();
      } else {
        try {
          let yyyy = String(value.getFullYear());
          let mm = String(Number(value.getMonth()) + 1);
          while (mm.length < 2) {
            mm = "0" + mm;
          }
          let dd = String(value.getDate());
          while (dd.length < 2) {
            dd = "0" + dd;
          }
          let hh = String(value.getHours());
          while (hh.length < 2) {
            hh = "0" + hh;
          }
          let mi = String(value.getMinutes());
          while (mi.length < 2) {
            mi = "0" + mi;
          }
          let ss = String(value.getSeconds());
          while (ss.length < 2) {
            ss = "0" + ss;
          }
          value = yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mi + ":" + ss;
        } catch (error) {
          Logger.error(<Request><unknown>undefined, "fixRow error: " + JSON.stringify(error, null, 2));
          Logger.error(<Request><unknown>undefined, `key: [${key}=${String(value)}]`);
          Logger.error(<Request><unknown>undefined, 'row: ' + JSON.stringify(row, null, 2));
        }
      }
      value = String(value);
      result[String(key).toUpperCase()] = value;
    }
    return result;
  }

  public fixQuery(query: any): any {
    for (let key in query) {
      let value = query[key];
      if (value == null) {
        value = "";
      }
      value = this.fix(value);
      query[key] = value;
    }
    return query;
  }

  public fixBody(body: any): any {
    for (let key in body) {
      let value = body[key];
      if (value == null) {
        value = "";
      }
      value = this.fix(value);
      body[key] = value;
    }
    return body;
  }

  public getDataId(req: Request): string {
    const words = String(req.url).split("/");
    return words[words.length - 1];
  }

  public getInsertId(result: any): string {
    let id = result.insertId;
    return id;
  }
}

export default new Db();
