   import { Crud } from '../crud';

   const dict: Dict = {
table: "RETOURGEBRUIKER",
key: [
 {
   body:"GEBRUIKER",
   sql:"GEBRUIKER",
 }
],
altKeys: [],
foreignKeys: [],
select: {
   orderby: "ucase(GEBRUIKER)",
   where: [
       {
           query: "value",
           sql: "ucase(NAAM) like ucase('%?%')",
       }
   ],
   fields: [
       {
           row: "ID",
           sql: "GEBRUIKER as ID"
       },
       {
           row: "VALUE",
           sql: "NAAM AS VALUE"
       }
   ],
},
query: {
   orderby: "GEBRUIKER",
   where: [
       {
       query: "id",
       sql: "ID = ?",
       },
       {
       query: "gebruiker",
       sql: "ucase(GEBRUIKER) like ucase('?%')",
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
       row: "GEBRUIKER",
       sql: "ifnull(GEBRUIKER,'') as GEBRUIKER",
       },
       {
       row: "NAAM",
       sql: "ifnull(NAAM,'') as NAAM",
       }
   ],},
update: {
   fields: [
       {
       body: "GEBRUIKER",
       sql: "GEBRUIKER",
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
   
   export class Retourgebruiker extends Crud {
       constructor() {
         super(
           dict
         )
       }
     }
   