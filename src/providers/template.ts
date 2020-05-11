import db from "../db";
import { Request, Response, NextFunction } from "express";
import { Util } from "../util";
import { Logger } from "../logger";
import mysql from "mysql";
import * as fs from "fs";

export class Template {
  constructor() {
    Logger.info("Creating Template");
  }

  private static makeTs(parTable: string, parDict: string): string {
    let thisTableDisp = parTable.charAt(0).toUpperCase() + parTable.slice(1).toLowerCase();
    let thisTs: string = `
    /* 
    add to router:
    import { ${thisTableDisp} } from './providers/${parTable.toLowerCase()}';
    private ${parTable.toLowerCase()}: ${thisTableDisp};
    this.${parTable.toLowerCase()} = new ${thisTableDisp}();
    this.app.route('/${parTable.toLowerCase()}.php').all((req, res, next) => this.${parTable.toLowerCase()}.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = ${parDict}
    
    export class ${thisTableDisp} extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    `;
    return thisTs;
  }

  public async generate(req: Request, res: Response, next: NextFunction) {
    const thisConnection = await db.waitConnection();

    const getTables = new Promise<[string]>((resolve, reject) => {
      thisConnection.query("show tables", (error, tableResults) => {
        if (error) {
          reject(error);
        }
        resolve(tableResults.map((result: any) => result[`Tables_in_ak2`]));
      });
    });
    const thisTables = await getTables;
    //
    const getDescs = thisTables.map(
      table =>
        new Promise<any>((resolve, reject) => {
          thisConnection.query("desc " + table, (error, fieldResults) => {
            if (error) {
              reject(error);
            }
            resolve({ table, fieldResults });
          });
        })
    );
    const results = await Promise.all(getDescs);
    //
    let thisHtml = "";
    let swfirst = 1;
    results.forEach(({ table, fieldResults }) => {
      let thisDict = "";
      let thisSelect = "";
      let thisWhere = "";
      let thisUpdate = "";
      let thisQuery = "";
      let thisSecondField = "";
      let thisThirdField = "";
      thisHtml += `\n${table}`;
      //
      // secord/third field
      //
      swfirst = 3;
      fieldResults.forEach((field: any) => {
        if (swfirst == 3) {
          // ID
          swfirst = 2;
        } else if (swfirst == 2) {
          thisSecondField = `${String(field.Field).toUpperCase()}`;
          swfirst = 1;
        } else if (swfirst == 1) {
          thisThirdField = `${String(field.Field).toUpperCase()}`;
          swfirst = 0;
        }
      });
      //
      // select
      //
      thisSelect = `
        {
            row: "ID",
            sql: "${thisSecondField} as ID"
        },
        {
            row: "VALUE",
            sql: "${thisThirdField} AS VALUE"
        }`;
      //
      // query
      //
      swfirst = 1;
      fieldResults.forEach((field: any) => {
        let name = "";
        let expression = "";
        let thisField = `${String(field.Field).toUpperCase()}`;
        //
        if (swfirst == 1) {
          swfirst = 0;
        } else {
          thisQuery += `,`;
        }
        thisQuery += "\n        {";
        name = `${thisField}`;
        if (field.Type.indexOf("int") >= 0) {
          expression = `ifnull(cast(${thisField} as CHAR),'') as ${thisField}`;
        } else if (field.Type.indexOf("decimal") >= 0) {
          expression = `ifnull(cast(${thisField} as CHAR),'') as ${thisField}`;
        } else if (field.Type.indexOf("char") >= 0) {
          expression = `ifnull(${thisField},'') as ${thisField}`;
        } else if (field.Type.indexOf("text") >= 0) {
          expression = `ifnull(${thisField},'') as ${thisField}`;
        } else if (field.Type.indexOf("datetime") >= 0) {
          expression = `date2jsondate(${thisField}) as ${thisField}`;
        } else {
          expression = `${thisField} as ${thisField}`;
        }
        thisQuery += `\n        row: "${name}",`;
        thisQuery += `\n        sql: "${expression}",`;
        thisQuery += "\n        }";
      });
      //
      // where
      //
      swfirst = 1;
      fieldResults.forEach((field: any) => {
        let query = "";
        let expression = "";
        let thisField = `${String(field.Field).toUpperCase()}`;
        //
        if (swfirst == 1) {
          swfirst = 0;
        } else {
          thisWhere += `,`;
        }
        thisWhere += "\n        {";
        query = `${thisField}`;
        if (field.Type.indexOf("int") >= 0) {
          expression = `${thisField} = ?`;
        } else if (field.Type.indexOf("decimal") >= 0) {
          expression = `${thisField} = ?`;
        } else if (field.Type.indexOf("char") >= 0) {
          expression = `${thisField} like ('%?%')`;
        } else if (field.Type.indexOf("text") >= 0) {
          expression = `${thisField} like ('%?%')`;
        } else if (field.Type.indexOf("datetime") >= 0) {
          expression = `${thisField} > screendate2date('?')`;
        } else {
          expression = `${thisField} like ('%?%')`;
        }
        //
        thisWhere += `\n        query: "${query.toLowerCase()}",`;
        thisWhere += `\n        sql: "${expression}",`;
        thisWhere += "\n        }";
      });
      //
      // update
      //
      swfirst = 1;
      fieldResults.forEach((field: any) => {
        let name = "";
        let expression = "";
        let maxLength = "10";
        let thisField = `${String(field.Field).toUpperCase()}`;
        if (thisField != "ID") {
          let thisType: any = field.Type.split("(");
          if (thisType.length > 1) {
            thisType = thisType[1].split(")");
            if (thisType.length > 0) {
              maxLength = String(parseInt(thisType[0]));
            }
          }
          //
          if (swfirst == 1) {
            swfirst = 0;
          } else {
            thisUpdate += `,`;
          }
          thisUpdate += "\n        {";
          name = `${thisField}`;
          expression = `${thisField}`;
          //
          thisUpdate += `\n        body: "${name}",`;

          if (field.Type.indexOf("int") >= 0) {
            expression = `${thisField}`;
          } else if (field.Type.indexOf("decimal") >= 0) {
            expression = `${thisField} = '?'`;
          } else if (field.Type.indexOf("char") >= 0) {
            expression = `${thisField} = '?'`;
          } else if (field.Type.indexOf("text") >= 0) {
            expression = `${thisField} = '?'`;
          } else if (field.Type.indexOf("datetime") >= 0) {
            expression = `${thisField} = screendate2date('?')`;
          } else {
            expression = `${thisField} = '?'`;
          }

          thisUpdate += `\n        sql: "${expression}",`;
          thisUpdate += `\n        required: false,`;
          thisUpdate += `\n        maxLength: ${maxLength},`;
          thisUpdate += `\n        default: "",`;
          thisUpdate += "\n        }";
        }
      });
      //
      // dict
      //
      thisDict += "{";
      //
      thisDict += `\ntable: "${String(table).toUpperCase()}",`;
      thisDict += `\nkey: [
  {
    body:"${thisSecondField}",
    sql:"${thisSecondField}",
  }
],`;
      thisDict += `\naltKeys: [],`;
      thisDict += `\nforeignKeys: [],`;
      //
      thisDict += `\nselect: {`;
      thisDict += `\n    orderby: "ucase(${thisThirdField})",`;
      thisDict += `\n    where: [`;
      thisDict += `
        {
            query: "value",
            sql: "ucase(${thisThirdField}) like '%?%'",
        }`;
      thisDict += `\n    ],`;
      thisDict += `\n    fields: [`;
      thisDict += `${thisSelect}`;
      thisDict += `\n    ],`;
      thisDict += `\n},`;
      //
      thisDict += `\nquery: {`;
      thisDict += `\n    orderby: "${thisSecondField}",`;
      thisDict += `\n    where: [`;
      thisDict += `${thisWhere}`;
      thisDict += `\n    ],`;
      thisDict += `\n    fields: [`;
      thisDict += `${thisQuery}`;
      thisDict += `\n    ],`;
      thisDict += "},";
      //
      thisDict += `\nupdate: {`;
      thisDict += `\n    fields: [`;
      thisDict += `${thisUpdate}`;
      thisDict += `\n    ],`;
      thisDict += "},";
      //
      thisDict += "\n}";
      //
      console.log(`${table}`);
      //
      fs.writeFileSync(`C:/Ak2Ps/Ak2Ps_api/src/generated/${table}.ts`, Template.makeTs(table, thisDict));
    });
    //
    //
    res.status(200).send(thisHtml);
  }
}
