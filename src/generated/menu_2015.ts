
    /* 
    add to router:
    import { Menu_2015 } from './providers/menu_2015';
    private menu_2015: Menu_2015;
    this.menu_2015 = new Menu_2015();
    this.app.route('/menu_2015.php').all((req, res, next) => this.menu_2015.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "MENU_2015",
key: [
  {
    body:"MENU",
    sql:"MENU",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase()",
    where: [
        {
            query: "value",
            sql: "ucase() like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "MENU as ID"
        },
        {
            row: "VALUE",
            sql: " AS VALUE"
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
        }
    ],},
}
    
    export class Menu_2015 extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    