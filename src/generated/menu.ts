
    /* 
    add to router:
    import { Menu } from './providers/menu';
    private menu: Menu;
    this.menu = new Menu();
    this.app.route('/menu.php').all((req, res, next) => this.menu.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "MENU",
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
    
    export class Menu extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    