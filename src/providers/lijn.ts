import { Crud } from '../crud';

const dict: Dict = {
  table: `
(
select distinct 
ID,
rtrim(VALUE) as VALUE from (
select ifnull(productlijn,'') as ID, concat(ifnull(productlijn,''),' ', ifnull(productlijnnaam,'')) as VALUE
from PRODUCTLIJN
union
select ifnull(productielijn,'') , max(concat(ifnull(productielijn,''),' ', ifnull(productielijnnaam,'')))
from PRODUCTLIJN 
group by productielijn
) base ) lijn`,
  key: [
    {
      body: "ID",
      sql: "ID",
    }
  ],
  altKeys: [],
  foreignKeys: [],
  select: {
    orderby: "ID",
    where: [
      {
        query: "value",
        sql: "ucase(PRODUCTLIJNNAAM) like ucase('%?%')",
      }
    ],
    fields: [
      {
        row: "ID",
        sql: "ID"
      },
      {
        row: "VALUE",
        sql: "VALUE"
      }
    ],
  },
  query: {
    orderby: "ID",
    where: [
      {
        query: "id",
        sql: "ID = ?",
      },
      {
        query: "value",
        sql: "ucase(value) like ucase('%?%')",
      },
    ],
    fields: [
      {
        row: "ID",
        sql: "ifnull(ID,'') as ID",
      },
      {
        row: "VALUE",
        sql: "ifnull(VALUE,'') as VALUE",
      },
    ],
  },
}

export class Lijn extends Crud {
  constructor() {
    super(
      dict
    )
  }
}

