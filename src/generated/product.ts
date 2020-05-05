
    /* 
    add to router:
    import { Product } from './providers/product';
    private product: Product;
    this.product = new Product();
    this.app.route('/product.php').all((req, res, next) => this.product.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PRODUCT",
key: [
  {
    body:"PRODUCTNUMMER",
    sql:"PRODUCTNUMMER",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(PRODUCTNAAM)",
    where: [
        {
            query: "value",
            sql: "ucase(PRODUCTNAAM) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "PRODUCTNUMMER as ID"
        },
        {
            row: "VALUE",
            sql: "PRODUCTNAAM AS VALUE"
        }
    ],
},
query: {
    orderby: "PRODUCTNUMMER",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
        },
        {
        query: "productnaam",
        sql: "PRODUCTNAAM like ('%?%')",
        },
        {
        query: "voorraad",
        sql: "VOORRAAD = ?",
        },
        {
        query: "voorraaddatumtijd",
        sql: "VOORRAADDATUMTIJD > screendate2date('?')",
        },
        {
        query: "eindvoorraad",
        sql: "EINDVOORRAAD = ?",
        },
        {
        query: "tepicken",
        sql: "TEPICKEN = ?",
        },
        {
        query: "tebestellen",
        sql: "TEBESTELLEN = ?",
        },
        {
        query: "soort",
        sql: "SOORT like ('%?%')",
        },
        {
        query: "lijn",
        sql: "LIJN like ('%?%')",
        },
        {
        query: "performance",
        sql: "PERFORMANCE = ?",
        },
        {
        query: "inkoopprijs",
        sql: "INKOOPPRIJS = ?",
        },
        {
        query: "inkoopprijsgemiddeld",
        sql: "INKOOPPRIJSGEMIDDELD = ?",
        },
        {
        query: "leverdagen",
        sql: "LEVERDAGEN = ?",
        },
        {
        query: "locatie",
        sql: "LOCATIE like ('%?%')",
        },
        {
        query: "leveranciernummer",
        sql: "LEVERANCIERNUMMER like ('%?%')",
        },
        {
        query: "leverancierproductnummer",
        sql: "LEVERANCIERPRODUCTNUMMER like ('%?%')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
        },
        {
        row: "PRODUCTNAAM",
        sql: "ifnull(PRODUCTNAAM,'') as PRODUCTNAAM",
        },
        {
        row: "VOORRAAD",
        sql: "ifnull(cast(VOORRAAD as CHAR),'') as VOORRAAD",
        },
        {
        row: "VOORRAADDATUMTIJD",
        sql: "date2jsondate(VOORRAADDATUMTIJD) as VOORRAADDATUMTIJD",
        },
        {
        row: "EINDVOORRAAD",
        sql: "ifnull(cast(EINDVOORRAAD as CHAR),'') as EINDVOORRAAD",
        },
        {
        row: "TEPICKEN",
        sql: "ifnull(cast(TEPICKEN as CHAR),'') as TEPICKEN",
        },
        {
        row: "TEBESTELLEN",
        sql: "ifnull(cast(TEBESTELLEN as CHAR),'') as TEBESTELLEN",
        },
        {
        row: "SOORT",
        sql: "ifnull(SOORT,'') as SOORT",
        },
        {
        row: "LIJN",
        sql: "ifnull(LIJN,'') as LIJN",
        },
        {
        row: "PERFORMANCE",
        sql: "ifnull(cast(PERFORMANCE as CHAR),'') as PERFORMANCE",
        },
        {
        row: "INKOOPPRIJS",
        sql: "ifnull(cast(INKOOPPRIJS as CHAR),'') as INKOOPPRIJS",
        },
        {
        row: "INKOOPPRIJSGEMIDDELD",
        sql: "ifnull(cast(INKOOPPRIJSGEMIDDELD as CHAR),'') as INKOOPPRIJSGEMIDDELD",
        },
        {
        row: "LEVERDAGEN",
        sql: "ifnull(cast(LEVERDAGEN as CHAR),'') as LEVERDAGEN",
        },
        {
        row: "LOCATIE",
        sql: "ifnull(LOCATIE,'') as LOCATIE",
        },
        {
        row: "LEVERANCIERNUMMER",
        sql: "ifnull(LEVERANCIERNUMMER,'') as LEVERANCIERNUMMER",
        },
        {
        row: "LEVERANCIERPRODUCTNUMMER",
        sql: "ifnull(LEVERANCIERPRODUCTNUMMER,'') as LEVERANCIERPRODUCTNUMMER",
        }
    ],},
update: {
    fields: [
        {
        body: "PRODUCTNUMMER",
        sql: "PRODUCTNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "PRODUCTNAAM",
        sql: "PRODUCTNAAM = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "VOORRAAD",
        sql: "VOORRAAD = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "VOORRAADDATUMTIJD",
        sql: "VOORRAADDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "EINDVOORRAAD",
        sql: "EINDVOORRAAD = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "TEPICKEN",
        sql: "TEPICKEN = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "TEBESTELLEN",
        sql: "TEBESTELLEN = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "SOORT",
        sql: "SOORT = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "LIJN",
        sql: "LIJN = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "PERFORMANCE",
        sql: "PERFORMANCE = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "INKOOPPRIJS",
        sql: "INKOOPPRIJS = '?'",
        required: false,
        maxLength: 16,
        default: "",
        },
        {
        body: "INKOOPPRIJSGEMIDDELD",
        sql: "INKOOPPRIJSGEMIDDELD = '?'",
        required: false,
        maxLength: 16,
        default: "",
        },
        {
        body: "LEVERDAGEN",
        sql: "LEVERDAGEN = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "LOCATIE",
        sql: "LOCATIE = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "LEVERANCIERNUMMER",
        sql: "LEVERANCIERNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "LEVERANCIERPRODUCTNUMMER",
        sql: "LEVERANCIERPRODUCTNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        }
    ],},
}
    
    export class Product extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    