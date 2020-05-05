
    /* 
    add to router:
    import { Menuregel_2015 } from './providers/menuregel_2015';
    private menuregel_2015: Menuregel_2015;
    this.menuregel_2015 = new Menuregel_2015();
    this.app.route('/menuregel_2015.php').all((req, res, next) => this.menuregel_2015.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "MENUREGEL_2015",
key: [
  {
    body:"MENU",
    sql:"MENU",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(VOLGNUMMER)",
    where: [
        {
            query: "value",
            sql: "ucase(VOLGNUMMER) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "MENU as ID"
        },
        {
            row: "VALUE",
            sql: "VOLGNUMMER AS VALUE"
        }
    ],
},
query: {
    orderby: "MENU",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "menu",
        sql: "MENU like ('%?%')",
        },
        {
        query: "volgnummer",
        sql: "VOLGNUMMER = ?",
        },
        {
        query: "omschrijving",
        sql: "OMSCHRIJVING like ('%?%')",
        },
        {
        query: "submenu",
        sql: "SUBMENU like ('%?%')",
        },
        {
        query: "link",
        sql: "LINK like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "MENU",
        sql: "ifnull(MENU,'') as MENU",
        },
        {
        row: "VOLGNUMMER",
        sql: "ifnull(cast(VOLGNUMMER as CHAR),'') as VOLGNUMMER",
        },
        {
        row: "OMSCHRIJVING",
        sql: "ifnull(OMSCHRIJVING,'') as OMSCHRIJVING",
        },
        {
        row: "SUBMENU",
        sql: "ifnull(SUBMENU,'') as SUBMENU",
        },
        {
        row: "LINK",
        sql: "ifnull(LINK,'') as LINK",
        }
    ],},
update: {
    fields: [
        {
        body: "MENU",
        sql: "MENU = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "VOLGNUMMER",
        sql: "VOLGNUMMER",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "OMSCHRIJVING",
        sql: "OMSCHRIJVING = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "SUBMENU",
        sql: "SUBMENU = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "LINK",
        sql: "LINK = '?'",
        required: false,
        maxLength: 255,
        default: "",
        }
    ],},
}
    
    export class Menuregel_2015 extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    