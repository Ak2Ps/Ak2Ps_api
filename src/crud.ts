import db from "./db";
import { Request, Response, NextFunction } from "express";
import { Util } from "./util";
import { Logger } from "./logger";

export class Crud {
  dict: Dict;
  constructor(dict: Dict) {
    this.dict = dict;
    Logger.info(`Creating ${this.dict.table}`);
  }

  protected mergeRowToBody(req: Request, res: Response, next: NextFunction, fields: any, row: any): void {
    let value = "";
    fields.forEach((element: any) => {
      if (!req.body[element.row]) {
        value = row[element.row];
        req.body[element.row] = value;
      }
    });
  }

  protected addSelectFields(req: Request, res: Response, next: NextFunction, fields: any): string {
    let result = "";
    fields.forEach((element: any) => {
      if (result != "") {
        result += ",";
      }
      result += "\n";
      result += element.sql;
    });
    return result;
  }

  protected addWhere(req: Request, res: Response, next: NextFunction, where: any): string {
    let result = "";
    where.forEach((element: any) => {
      if (req.query[element.query]) {
        let thisString = db.fix(req.query[element.query]);
        if (result == "") {
          result += "\nwhere ";
        } else {
          result += "\nand ";
        }
        result += (element.sql as string).replace("?", `${thisString}`);
      }
    });
    return result;
  }

  protected addOrderby(req: Request, res: Response, next: NextFunction, orderby: any): string {
    let result = "";
    if (orderby) {
      result = "\norder by " + orderby;
    }
    return result;
  }

  protected addUpdateFields(req: Request, res: Response, next: NextFunction, fields: any): string {
    let result = "";
    let value = "";
    let sql = "";
    fields.forEach((element: any) => {
      if (result != "") {
        result += ",";
      }
      result += "\n";
      value = db.fix(req.body[element.body]);
      //
      sql = String(element.sql);
      if (sql.indexOf('?') >= 0) {
        sql = sql.replace(/\?/g, value);
        result += sql;
      } else {
        result += `${sql} = '${value}'`;
      }
    });
    return result;
  }

  protected addInsertKeyList(req: Request, res: Response, next: NextFunction, fields: any): string {
    let result = "";
    fields.forEach((element: any) => {
      if (result == "") {
        result += "\n(";
      } else {
        result += ",\n";
      }
      result += `${element.sql}`;
    });
    if (result != "") {
      result += ")";
    }
    return result;
  }

  protected addInsertKeyValues(req: Request, res: Response, next: NextFunction, fields: any): string {
    let result = "";
    let value = "";
    fields.forEach((element: any) => {
      if (result == "") {
        result += "\n";
      } else {
        result += ",\n";
      }
      value = db.fix(req.body[element.body]);
      result += `'${value}'`;
    });
    return result;
  }

  protected addInsertKeyWhere(req: Request, res: Response, next: NextFunction, fields: any): string {
    let result = "";
    let value = "";
    fields.forEach((element: any) => {
      if (result == "") {
        result += "\n";
      } else {
        result += "\n and ";
      }
      value = db.fix(req.body[element.body]);
      result += `${element.sql} = '${value}'`;
    });
    return result;
  }

  protected createSelectSql(req: Request, res: Response, next: NextFunction, options?: Dict): string {
    let sql = "select";
    sql += this.addSelectFields(req, res, next, options?.select?.fields);
    sql += `\nfrom ${options?.table}`;
    sql += this.addWhere(req, res, next, options?.select?.where);
    sql += this.addOrderby(req, res, next, options?.select?.orderby);
    return sql;
  }

  protected createQuerySql(req: Request, res: Response, next: NextFunction, options?: Dict): string {
    let sql = "select";
    sql += this.addSelectFields(req, res, next, options?.query?.fields);
    sql += `
from ${options?.table}`;
    sql += this.addWhere(req, res, next, options?.query?.where);
    sql += this.addOrderby(req, res, next, options?.query?.orderby);
    return sql;
  }

  protected async doCheckField(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let result = true;
    let value = "";

    options?.update?.fields?.forEach((element: any) => {
      value = req.body[element.body];
      if (element.default !== undefined) {
        if (!value || String(value).trim() == "") {
          req.body[element.body] = element.default;
          value = req.body[element.body];
        }
      }
      if (element.required) {
        if (String(value).trim() == "") {
          res.crudResult.messages.push({
            field: element.sql,
            message: "verplicht invullen",
          });
          res.crudResult.success = false;
          result = false;
        }
      }
      if (element.maxLength) {
        if (String(value).length > element.maxLength) {
          res.crudResult.messages.push({
            field: element.sql,
            message: `[${value}] te lang`,
          });
          res.crudResult.success = false;
          result = false;
        }
      }
      if (element.minValue) {
        if (Number(value) < element.minValue) {
          res.crudResult.messages.push({
            field: element.sql,
            message: `[${value}] te klein`,
          });
          res.crudResult.success = false;
          result = false;
        }
      }
      if (element.maxValue) {
        if (Number(value) > element.maxValue) {
          res.crudResult.messages.push({
            field: element.sql,
            message: `[${value}] te groot`,
          });
          res.crudResult.success = false;
        }
      }
    });
    return (result);
  }

  protected async doCheckRecord(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let result = true;
    return (result);
  }

  protected async doCheckDatabase(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let result = true;
    return (result);
  }

  protected async doUpdateInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let sql: any;
    let rows: any;
    //
    res.crudConnection = await db.waitConnection();
    //
    // Haal de oude gegevens op
    //
    sql = "select";
    sql += this.addSelectFields(req, res, next, options?.query?.fields);
    sql += `
  from ${options?.table}
  where `;
    sql += this.addInsertKeyWhere(req, res, next, options?.key);
    rows = await db.waitQuery(res.crudConnection, sql);
    //
    // Merge 
    //
    if (rows[0]) {
      this.mergeRowToBody(req, res, next, this.dict.select?.fields, rows[0]);
    }
    //
    // eerst maar eens checken
    //
    let result = true;
    if (await this.doCheckField(req, res, next, options) === false) {
      result = false;
    }
    if (await this.doCheckRecord(req, res, next, options) === false) {
      result = false;
    }
    if (await this.doCheckDatabase(req, res, next, options) === false) {
      result = false;
    }
    if (result == false) {
      Logger.sql(JSON.stringify(res.crudResult, null, 2));
      res.crudConnection.release();
      res.status(200).send(res.crudResult);
      return;
    }
    if (Number(req.body.ID) < 0) {
      sql = `
select ifnull(max(ID),0) + 1 as last_id
from ${options?.table}`;
      rows = await db.waitQuery(res.crudConnection, sql);
      req.body.ID = rows[0].last_id;
    }
    //
    // mogelijk moet deze key ingevoegd worden
    //
    sql = `insert into ${options?.table}`;
    sql += this.addInsertKeyList(req, res, next, options?.key);
    sql += "\nselect"
    sql += this.addInsertKeyValues(req, res, next, options?.key);
    sql += `
from dual where not exists 
(select 1 from  ${options?.table}
where `;
    sql += this.addInsertKeyWhere(req, res, next, options?.key);
    sql += ` )`;
    rows = await db.waitQuery(res.crudConnection, sql);
    //
    // en daarna de update
    //
    sql = `update ${options?.table} set`;
    sql += this.addUpdateFields(req, res, next, options?.update?.fields);
    sql += `
where id = '${db.fix(req.body.ID)}'`;
    rows = await db.waitQuery(res.crudConnection, sql);
    //
    // en daarna de afterupdate
    //
    await this.doAfterUpdate(req, res, next, options);
    //
    res.crudConnection.release();
    res.status(200).send(req.body);
    return;
  }

  protected async doAfterUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let result = true;
    return (result);
  }

  protected createDelete(req: Request, res: Response, next: NextFunction, options?: Dict): string {
    let id = db.getDataId(req);
    let sql = `
delete from ${options?.table} 
where id = '${id}';`;
    return sql;
  }

  protected async doCheckDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let result = true;
    return (result);
  }

  protected async doAfterDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
    let result = true;
    return (result);
  }

  protected async doSelect(req: Request, res: Response, next: NextFunction, options?: Dict) {
    res.crudConnection = await db.waitConnection();
    let sql = this.createSelectSql(req, res, next, options);
    let rows = await db.waitQuery(res.crudConnection, sql);
    res.crudConnection.release();
    res.status(200).send(rows);
    return ;
  }

  protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
    //
    res.crudConnection = await db.waitConnection();
    let sql = this.createQuerySql(req, res, next, options);
    let rows = await db.waitQuery(res.crudConnection, sql);
    res.crudConnection.release();
    res.status(200).send(rows);
    return ;
  }

  protected async doUpdate(req: Request, res: Response, next: NextFunction, options?: Dict) {
    return await this.doUpdateInsert(req, res, next, options);
  }

  protected async doInsert(req: Request, res: Response, next: NextFunction, options?: Dict) {
    return await this.doUpdateInsert(req, res, next, options);
  }

  protected async doDelete(req: Request, res: Response, next: NextFunction, options?: Dict) {
    //
    // eerst maar eens checken
    //
    let result = await this.doCheckDelete(req, res, next, options);
    if (result == false) {
      res.status(200).send(res.crudResult);
      return;
    }
    //
    let sql = this.createDelete(req, res, next, options);
    res.crudConnection = await db.waitConnection();
    let rows = await db.waitQuery(res.crudConnection, sql);
    //
    // en daarna de afterdelete
    //
    await this.doAfterDelete(req, res, next, options);

    res.crudConnection.release();
    res.status(200).send(req.body);
    return;
  }

  public async routes(req: Request, res: Response, next: NextFunction) {
    //
    let method = req.method;
    let action = db.fix(req.query.action||'');
    //
    Logger.request(req);
    //
    if (action == "select") {
      this.doSelect(req, res, next, this.dict);
    } else if (method == "GET") {
      this.doQuery(req, res, next, this.dict);
    } else if (method == "PUT") {
      this.doUpdate(req, res, next, this.dict);
    } else if (method == "POST") {
      this.doInsert(req, res, next, this.dict);
    } else if (method == "DELETE") {
      this.doDelete(req, res, next, this.dict);
    } else {
      Util.unknownOperation(req, res, next);
    }
  }
}
