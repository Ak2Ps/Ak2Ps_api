   import { Crud } from '../crud';

   const dict: Dict = {
table: "RETOURGARANTIE",
key: [
 {
   body:"GARANTIE",
   sql:"GARANTIE",
 }
],
altKeys: [],
foreignKeys: [],
select: {
   orderby: "ucase(GARANTIE)",
   where: [
       {
           query: "value",
           sql: "ucase(NAAM) like ucase('%?%')",
       }
   ],
   fields: [
       {
           row: "ID",
           sql: "GARANTIE as ID"
       },
       {
           row: "VALUE",
           sql: "NAAM AS VALUE"
       }
   ],
},
query: {
   orderby: "ucase(GARANTIE)",
   where: [
       {
       query: "id",
       sql: "ID = ?",
       },
       {
       query: "garantie",
       sql: "ucase(GARANTIE) like ucase('?%')",
       },
       {
       query: "naam",
       sql: "ucase(NAAM) like ucase('?%')",
       }
   ],
   fields: [
       {
       row: "ID",
       sql: "ifnull(cast(ID as CHAR),'') as ID",
       },
       {
       row: "GARANTIE",
       sql: "ifnull(GARANTIE,'') as GARANTIE",
       },
       {
       row: "NAAM",
       sql: "ifnull(NAAM,'') as NAAM",
       }
   ],},
update: {
   fields: [
       {
       body: "GARANTIE",
       sql: "GARANTIE",
       required: false,
       maxLength: 50,
       default: "",
       },
       {
       body: "NAAM",
       sql: "NAAM",
       required: false,
       maxLength: 50,
       default: "",
       }
   ],},
}
   
   export class Retourgarantie extends Crud {
       constructor() {
         super(
           dict
         )
       }
     }
   