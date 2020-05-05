
    /* 
    add to router:
    import { Productvoorraad } from './providers/productvoorraad';
    private productvoorraad: Productvoorraad;
    this.productvoorraad = new Productvoorraad();
    this.app.route('/productvoorraad.php').all((req, res, next) => this.productvoorraad.routes(req, res, next));
    */

    import { Crud } from '../crud';
    //
    import { Request, Response, NextFunction } from "express";
    import db from "../db";
    import { Util } from "../util";
    import { Logger } from "../logger";
    //
    const dict: Dict = {
table: "PRODUCTVOORRAAD",
key: [
  {
    body:"STATUS",
    sql:"STATUS",
  }
],
altKeys: [],
foreignKeys: [],
select: {
    orderby: "ucase(PRODUCTNUMMER)",
    where: [
        {
            query: "value",
            sql: "ucase(PRODUCTNUMMER) like '%?%'",
        }
    ],
    fields: [
        {
            row: "ID",
            sql: "STATUS as ID"
        },
        {
            row: "VALUE",
            sql: "PRODUCTNUMMER AS VALUE"
        }
    ],
},
query: {
    orderby: "STATUS",
    where: [
        {
        query: "id",
        sql: "ID = ?",
        },
        {
        query: "status",
        sql: "STATUS like ('%?%')",
        },
        {
        query: "productnummer",
        sql: "PRODUCTNUMMER like ('%?%')",
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
        query: "actie",
        sql: "ACTIE like ('%?%')",
        },
        {
        query: "actieomschrijving",
        sql: "ACTIEOMSCHRIJVING like ('%?%')",
        },
        {
        query: "actiedatumtijd",
        sql: "ACTIEDATUMTIJD > screendate2date('?')",
        },
        {
        query: "actievoorraad",
        sql: "ACTIEVOORRAAD = ?",
        },
        {
        query: "actienummer",
        sql: "ACTIENUMMER like ('%?%')",
        },
        {
        query: "tebestellen",
        sql: "TEBESTELLEN = ?",
        },
        {
        query: "besteld",
        sql: "BESTELD = ?",
        },
        {
        query: "onderdelen",
        sql: "ONDERDELEN = ?",
        },
        {
        query: "expanded",
        sql: "EXPANDED = ?",
        },
        {
        query: "beperkstatus",
        sql: "BEPERKSTATUS like ('%?%')",
        },
        {
        query: "beperknummer",
        sql: "BEPERKNUMMER like ('%?%')",
        },
        {
        query: "beperkdatumtijd",
        sql: "BEPERKDATUMTIJD > screendate2date('?')",
        },
        {
        query: "initdatumtijd",
        sql: "INITDATUMTIJD > screendate2date('?')",
        }
    ],
    fields: [
        {
        row: "ID",
        sql: "ifnull(cast(ID as CHAR),'') as ID",
        },
        {
        row: "STATUS",
        sql: "ifnull(STATUS,'') as STATUS",
        },
        {
        row: "PRODUCTNUMMER",
        sql: "ifnull(PRODUCTNUMMER,'') as PRODUCTNUMMER",
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
        row: "ACTIE",
        sql: "ifnull(ACTIE,'') as ACTIE",
        },
        {
        row: "ACTIEOMSCHRIJVING",
        sql: "ifnull(ACTIEOMSCHRIJVING,'') as ACTIEOMSCHRIJVING",
        },
        {
        row: "ACTIEDATUMTIJD",
        sql: "date2jsondate(ACTIEDATUMTIJD) as ACTIEDATUMTIJD",
        },
        {
        row: "ACTIEVOORRAAD",
        sql: "ifnull(cast(ACTIEVOORRAAD as CHAR),'') as ACTIEVOORRAAD",
        },
        {
        row: "ACTIENUMMER",
        sql: "ifnull(ACTIENUMMER,'') as ACTIENUMMER",
        },
        {
        row: "TEBESTELLEN",
        sql: "ifnull(cast(TEBESTELLEN as CHAR),'') as TEBESTELLEN",
        },
        {
        row: "BESTELD",
        sql: "ifnull(cast(BESTELD as CHAR),'') as BESTELD",
        },
        {
        row: "ONDERDELEN",
        sql: "ifnull(cast(ONDERDELEN as CHAR),'') as ONDERDELEN",
        },
        {
        row: "EXPANDED",
        sql: "ifnull(cast(EXPANDED as CHAR),'') as EXPANDED",
        },
        {
        row: "BEPERKSTATUS",
        sql: "ifnull(BEPERKSTATUS,'') as BEPERKSTATUS",
        },
        {
        row: "BEPERKNUMMER",
        sql: "ifnull(BEPERKNUMMER,'') as BEPERKNUMMER",
        },
        {
        row: "BEPERKDATUMTIJD",
        sql: "date2jsondate(BEPERKDATUMTIJD) as BEPERKDATUMTIJD",
        },
        {
        row: "INITDATUMTIJD",
        sql: "date2jsondate(INITDATUMTIJD) as INITDATUMTIJD",
        }
    ],},
update: {
    fields: [
        {
        body: "STATUS",
        sql: "STATUS = '?'",
        required: false,
        maxLength: 3,
        default: "",
        },
        {
        body: "PRODUCTNUMMER",
        sql: "PRODUCTNUMMER = '?'",
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
        body: "ACTIE",
        sql: "ACTIE = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "ACTIEOMSCHRIJVING",
        sql: "ACTIEOMSCHRIJVING = '?'",
        required: false,
        maxLength: 255,
        default: "",
        },
        {
        body: "ACTIEDATUMTIJD",
        sql: "ACTIEDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "ACTIEVOORRAAD",
        sql: "ACTIEVOORRAAD = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "ACTIENUMMER",
        sql: "ACTIENUMMER = '?'",
        required: false,
        maxLength: 50,
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
        body: "BESTELD",
        sql: "BESTELD = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "ONDERDELEN",
        sql: "ONDERDELEN = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "EXPANDED",
        sql: "EXPANDED = '?'",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "BEPERKSTATUS",
        sql: "BEPERKSTATUS = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "BEPERKNUMMER",
        sql: "BEPERKNUMMER = '?'",
        required: false,
        maxLength: 50,
        default: "",
        },
        {
        body: "BEPERKDATUMTIJD",
        sql: "BEPERKDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        },
        {
        body: "INITDATUMTIJD",
        sql: "INITDATUMTIJD = screendate2date('?')",
        required: false,
        maxLength: 10,
        default: "",
        }
    ],},
}
    
    export class Productvoorraad extends Crud {
        constructor() {
          super(
            dict
          )
        }
      }
    