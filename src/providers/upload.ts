
import { Crud } from '../crud';
//
import { Request, Response, NextFunction } from "express";
import db from "../db";
import { Util } from "../util";
import { Logger } from "../logger";
import * as fs from 'fs';
import { Config } from "../config";
//
const dict: Dict = {
    table: "upload",
    key: [
    ],
    altKeys: [],
    foreignKeys: [],
    select: {
        orderby: "",
        where: [
        ],
        fields: [
        ],
    },
    query: {
        orderby: "",
        where: [
        ],
        fields: [
        ],
    },
    update: {
        fields: [
        ],
    },
}

export class Upload extends Crud {
    constructor() {
        super(
            dict
        )
    }

    protected getNow(): string {
        let result = '';
        let today = new Date();
        let dd = String(today.getDate());
        let mm = String(today.getMonth() + 1);
        let yyyy = String(today.getFullYear());
        if (Number(dd) < 10) {
            dd = '0' + dd;
        }
        if (Number(mm) < 10) {
            mm = '0' + mm;
        }
        // dd-mm-yyyy
        // 01 34 6789
        result = dd + '-' + mm + '-' + yyyy;
        return db.fix(result);
    }

    protected get44Vraagdatum(datum: string): string {
        let vraagdatum = datum;
        //
        let dag = datum.substr(0, 2);
        let maand = datum.substr(3, 2);
        let jaar = datum.substr(6, 4);
        //
        if (Number(jaar) == 2044) {
            let vraagdag = vraagdatum.substr(0, 2);
            let vraagmaand = vraagdatum.substr(3, 2);
            let vraagjaar = vraagdatum.substr(6, 4);
            //
            let thisdatum = this.getNow();
            let thisdag = thisdatum.substr(0, 2);
            let thismaand = thisdatum.substr(3, 2);
            let thisjaar = thisdatum.substr(6, 4);
            //
            let numvraagddmm = Number(vraagdag) + Number(vraagmaand) * 100;
            let numthisddmm = Number(thisdag) + Number(thismaand) * 100;
            //
            if (numvraagddmm < numthisddmm) {
                vraagjaar = String(Number(thisjaar) + 1);
                if (vraagdag == '29' && vraagmaand == '02') {
                    vraagdag = '28';
                }
            } else {
                vraagjaar = thisjaar;
            }
            vraagdatum = `${vraagdag}-${vraagmaand}-${vraagjaar}`;
        }
        return vraagdatum;
    }

    protected getDate(exactdate: string): string {
        let result = '';
        // yyyy-mm-dd
        // 0123456789
        let thisDate = exactdate.trim();
        thisDate = thisDate.replace(/"/g, '');
        if (thisDate == '') {
            return db.fix(result);
        }
        let dag = thisDate.substr(8, 2);
        let maand = thisDate.substr(5, 2);
        let jaar = thisDate.substr(2, 2);
        result = dag + '-' + maand + '-20' + jaar;
        return db.fix(result);
    }

    protected getField(object: any, ...index: string[]): string {
        let result = '';
        let thisObject = object;
        for (let iobj = 0; iobj < index.length; iobj++) {
            if (index[iobj] == '$') {
                thisObject = thisObject[index[iobj]];
                if (!thisObject) {
                    break;
                }
                iobj++;
                thisObject = thisObject[index[iobj]];
                if (!thisObject) {
                    break;
                }
            } else {
                thisObject = thisObject[index[iobj]];
                if (!thisObject) {
                    break;
                }
                thisObject = thisObject[0];
                if (!thisObject) {
                    break;
                }
            }
        }
        if (thisObject) {
            result = String(thisObject);
        }
        return db.fix(result);
    }

    protected getJson(filename: string): any {
        return new Promise((resolve, reject) => {
            let data = "{}";
            let result: any = {};
            try {
                data = String(fs.readFileSync(Config.appDir + "/" + filename));
            } catch (error) {
                Logger.error(JSON.stringify(error));
            }
            try {
                result = JSON.parse(data);
            } catch (error) {
                Logger.error(JSON.stringify(error));
                result = {};
            }
            resolve(result);
        });
    }

    protected async loadHandtekening(req: Request, res: Response, next: NextFunction, filename: string, gebruiker: string): Promise<string> {
        return new Promise(async (resolve, reject) => {
            let result: any = {};
            let handtekening = '';
            let extension = '';
            let sql = '';
            let msg = '';
            //
            try {
                if (!fs.existsSync(Config.appDir + "/handtekening")) {
                    fs.mkdirSync(Config.appDir + "/handtekening");
                }
            } catch (error) {
                Logger.error(req, error);
            }
            //
            if (!req.files || Object.keys(req.files).length == 0) {
                msg += ('<p>Geen bestand gekozen ...</p>');
                resolve(msg);
            }
            let importfile: any = req.files?.userfile;
            extension = importfile.name.split('.').pop();
            switch (extension.toLowerCase()) {
                case "jpg":
                    break;
                case "png":
                    break;
                default:
                    msg += importfile.name + ' is geen handtekening (jpg/png) ...<br>';
                    resolve(msg);
            }
            handtekening = Config.appDir + "/handtekening/" + gebruiker + '.' + extension;
            msg += "<p>Importeren " + handtekening + " ...<br>";
            importfile.mv(Config.appDir + "/handtekening/" + gebruiker + '.' + extension, async (err: any) => {
                if (err) {
                    msg += ('<p>Fout ' + importfile.name + ' in bestand ... </p>');
                    resolve(msg);
                }
                handtekening = "./handtekening/" + gebruiker + '.' + extension;
                sql = `
update gebruiker set 
handtekening = '${handtekening}'
where gebruiker = '${gebruiker}'`;
                await db.waitQuery(res.crudConnection, sql);
                resolve(msg);
            });

        });
    }
    //
    // Leverancier
    //
    protected async loadExactLeverancier(req: Request, res: Response, next: NextFunction, json: any) {
        let msg = '';
        let sql = '';
        let tlupdate = 0;
        let thisArray = json.Account;
        if (thisArray) {
            for (let iAccount = 0; iAccount < thisArray.length; iAccount++) {
                let account = thisArray[iAccount];
                if (Number(this.getField(account, 'IsSupplier')) == 1) {
                    let leveranciernummer = this.getField(account, '$', 'code');
                    let naam = this.getField(account, 'Name');
                    let zoekcode = this.getField(account, '$', 'searchcode');
                    let adres = this.getField(account, 'Address', 'AddressLine1');
                    let woonplaats = this.getField(account, 'Address', 'City');
                    let postcode = this.getField(account, 'Address', 'PostalCode');
                    let telefoon = this.getField(account, 'Phone');
                    let fax = this.getField(account, 'Fax');
                    let email = this.getField(account, 'Email');
                    let categorie = this.getField(account, '$', 'status');
                    let contact = this.getField(account, 'Contact', 'FirstName');
                    let land = this.getField(account, 'Address', 'Country', '$', 'code');
                    //
                    sql = `
insert into LEVERANCIER 
(leveranciernummer)
select '${leveranciernummer}' 
from DUAL
where not exists (
select 1 from LEVERANCIER 
where leveranciernummer =  '${leveranciernummer}')`;
                    await db.waitQuery(res.crudConnection, sql);
                    sql = `
update LEVERANCIER set 
naam = '${naam}',
zoekcode = '${zoekcode}',
adres = '${adres}',
woonplaats = '${woonplaats}',
postcode = '${postcode}',
telefoon = '${telefoon}',
fax = '${fax}',
email = '${email}',
categorie = '${categorie}',
contact = '${contact}',
land = '${land}'
where leveranciernummer =  '${leveranciernummer}'`;
                    await db.waitQuery(res.crudConnection, sql);
                    tlupdate++;
                }
            }
        }
        msg += tlupdate + ' leverancierregels ingelezen ...<br>';
        return msg;
    }
    //
    // Klant
    //
    protected async loadExactKlant(req: Request, res: Response, next: NextFunction, json: any) {
        let msg = '';
        let tlupdate = 0;
        let sql = '';
        let thisArray = json.Account;
        if (thisArray) {
            for (let iAccount = 0; iAccount < thisArray.length; iAccount++) {
                let account = thisArray[iAccount];
                if (Number(this.getField(account, 'IsPurchase')) == 1) {
                    let klantnummer = this.getField(account, '$', 'code');
                    let naam = this.getField(account, 'Name');
                    let zoekcode = this.getField(account, '$', 'searchcode');
                    let adres = this.getField(account, 'Address', 'AddressLine1');
                    let woonplaats = this.getField(account, 'Address', 'City');
                    let postcode = this.getField(account, 'Address', 'PostalCode');
                    let telefoon = this.getField(account, 'Phone');
                    let fax = this.getField(account, 'Fax');
                    let email = this.getField(account, 'Email');
                    let categorie = this.getField(account, '$', 'status');
                    let contact = this.getField(account, 'Contact', 'FirstName');
                    let land = this.getField(account, 'Address', 'Country', '$', 'code');
                    sql = `
insert into KLANT 
(klantnummer)
select '${klantnummer}' 
from DUAL
where not exists (
select 1 from KLANT 
where klantnummer =  '${klantnummer}')`;
                    await db.waitQuery(res.crudConnection, sql);
                    sql = `
update KLANT set 
naam = '${naam}',
zoekcode = '${zoekcode}',
adres = '${adres}',
woonplaats = '${woonplaats}',
postcode = '${postcode}',
telefoon = '${telefoon}',
fax = '${fax}',
email = '${email}',
categorie = '${categorie}',
contact = '${contact}',
land = '${land}'
where klantnummer =  '${klantnummer}'`;
                    await db.waitQuery(res.crudConnection, sql);
                    tlupdate++;
                }
            }
        }
        msg += tlupdate + ' klantregels ingelezen ...<br>';
        return msg;
    }
    //
    // Product
    //
    protected async loadExactProduct(req: Request, res: Response, next: NextFunction, json: any) {
        let msg = '';
        let tlupdate = 0;
        let sql = '';
        let thisArray = json.Item;
        if (thisArray) {
            //
            sql = `
update PRODUCT set soort = 'DEL'`;
            await db.waitQuery(res.crudConnection, sql);
            //
            for (let iRow = 0; iRow < thisArray.length; iRow++) {
                let ITEM = thisArray[iRow];
                let productnummer = this.getField(ITEM, '$', 'code');
                let productnaam = this.getField(ITEM, 'Description');
                let maak = this.getField(ITEM, 'IsMakeItem');
                let lijn = '';
                let locatie = '';
                let thisClass = '';
                let code = '';
                if (ITEM.ItemCategory) {
                    for (let iCat = 0; iCat < ITEM.ItemCategory.length; iCat++) {
                        let CAT = ITEM.ItemCategory[iCat];
                        thisClass = this.getField(CAT, '$', 'class');
                        code = this.getField(CAT, '$', 'code');;
                        if (thisClass == 'productielijn' || thisClass == 'Productielijn') {
                            lijn = code;
                        }
                    }
                }
                if (lijn == '0.000') {
                    lijn = '';
                }
                if (ITEM.ItemWarehouses) {
                    for (let iIw = 0; iIw < ITEM.ItemWarehouses.length; iIw++) {
                        let IW = ITEM.ItemWarehouses[iIw];
                        locatie = this.getField(IW, 'ItemWarehouse', 'StorageLocation', '$', 'code');
                    }
                }
                let ink = 0;
                //foreach($ITEM->Costs as $COST){
                //	$ink = impnumber($COST->Price->Value);
                //}
                //
                // inkgemiddeld wordt gebruikt voor de kostprijs-berekening
                // exact-online heeft geen inkgemiddeld
                // dus gebruiken we de laatste gebruikte inkoopprijs 
                //
                let inkgemiddeld = 0;
                let leverancierproductnummer = '';
                if (ITEM.ItemAccounts) {
                    for (let iAcc = 0; iAcc < ITEM.ItemAccounts.length; iAcc++) {
                        let ACC = ITEM.ItemAccounts[iAcc];
                        if (ACC.ItemAccount) {
                            for (let iAccItem = 0; iAccItem < ACC.ItemAccount.length; iAccItem++) {
                                let ACCITEM = ACC.ItemAccount[iAccItem];
                                inkgemiddeld = Number(this.getField(ACCITEM, 'Purchase', 'Price', 'Value'));
                                leverancierproductnummer = this.getField(ACCITEM, 'SupplierItemCode');
                            }
                        }
                    }
                }
                sql = `
insert into PRODUCT 
(productnummer,productnaam)
select 
'${productnummer}',
'${productnaam}'
from DUAL
where not exists (
select 1 from PRODUCT 
where productnummer ='${productnummer}')`;
                await db.waitQuery(res.crudConnection, sql);
                sql = `
update PRODUCT set
productnaam = '${productnaam}',
lijn = '${lijn}',
locatie = '${locatie}',
inkoopprijs = '${ink}',
inkoopprijsgemiddeld = '${inkgemiddeld}',
leverancierproductnummer = '${leverancierproductnummer}',
soort = '${maak}'
where productnummer ='${productnummer}'`;
                await db.waitQuery(res.crudConnection, sql);
                //
                tlupdate++;
            }
            //
            sql = `
delete from PRODUCT 
where soort = 'DEL'`;
            await db.waitQuery(res.crudConnection, sql);
            //
        }
        msg += tlupdate + ' productregels ingelezen ...<br>';
        return msg;
    }
    //
    // Stuklijst
    //
    protected async loadExactStuklijst(req: Request, res: Response, next: NextFunction, json: any) {
        let msg = '';
        let tlupdate = 0;
        let sql = '';
        let thisArray = json.ManufacturedBillofMaterial;
        if (thisArray) {
            sql = `
delete from ONDERDEEL`;
            await db.waitQuery(res.crudConnection, sql);
            //
            for (let iBom = 0; iBom < thisArray.length; iBom++) {
                let BOM = thisArray[iBom];
                let productnummer = this.getField(BOM, 'Item', '$', 'code');
                let productnaam = this.getField(BOM, 'Item', 'Description');
                let faktor = Number(this.getField(BOM, 'BatchQuantity'));
                let value: any = undefined;
                if (BOM.ManufacturedBillofMaterialItemDetails) {
                    if (BOM.ManufacturedBillofMaterialItemDetails[0]) {
                        if (BOM.ManufacturedBillofMaterialItemDetails[0].ManufacturedBillofMaterialItemDetail) {
                            value = BOM.ManufacturedBillofMaterialItemDetails[0].ManufacturedBillofMaterialItemDetail;
                        }
                    }
                }
                if (value) {
                    for (let iDet = 0; iDet < value.length; iDet++) {
                        let DET = value[iDet];
                        let onderdeelnummer = this.getField(DET, 'Item', '$', 'code');
                        let onderdeelnaam = this.getField(DET, 'Description');
                        let detfaktor = Number(this.getField(DET, 'Quantity'));
                        if (faktor == 0) {
                            detfaktor = 0;
                        } else {
                            detfaktor = detfaktor / faktor;
                        }
                        if ((onderdeelnummer != '????') && (onderdeelnummer != productnummer)) {
                            sql = `
insert into ONDERDEEL 
(productnummer,onderdeelnummer)
select 
'${productnummer}',
'${onderdeelnummer}'
from DUAL
where not exists (
select 1 from ONDERDEEL 
where productnummer = '${productnummer}'
and onderdeelnummer = '${onderdeelnummer}')`;
                            await db.waitQuery(res.crudConnection, sql);
                            sql = `
update ONDERDEEL set 
faktor = '${detfaktor}'
where productnummer = '${productnummer}'
and onderdeelnummer = '${onderdeelnummer}'`;
                            await db.waitQuery(res.crudConnection, sql);
                        }
                        //
                        tlupdate++;
                    }
                }
            }
        }
        msg += tlupdate + ' stuklijstregels ingelezen ...<br>';
        return msg;
    }

    //
    // Leverancierproduct
    //
    protected async loadExactLeverancierproduct(req: Request, res: Response, next: NextFunction, json: any) {
        let msg = '';
        let tlupdate = 0;
        let sql = '';
        let rowsleverancier: any;
        let rowleverancier: any;
        let rowsproduct: any;
        let rowproduct: any;
        //
        let thisArray = json.PurchaseOrder;
        if (thisArray) {
            for (let iBestel = 0; iBestel < thisArray.length; iBestel++) {
                let BESTEL = thisArray[iBestel];
                let leveranciernummer = this.getField(BESTEL, 'Supplier', '$', 'code');
                if (BESTEL.PurchaseOrderLine) {
                    for (let iLine = 0; iLine < BESTEL.PurchaseOrderLine.length; iLine++) {
                        let LINE = BESTEL.PurchaseOrderLine[iLine];
                        let productnummer = this.getField(LINE, 'Item', '$', 'code');
                        let leverancierproductnummer = this.getField(LINE, 'SupplierItemCode');
                        let swimport = 1;
                        if (leveranciernummer == '') {
                            swimport = 0;
                        }
                        if (productnummer == '????') {
                            swimport = 0;
                        }
                        if (swimport == 1) {
                            sql = `
select * from  LEVERANCIER 
where leveranciernummer = '${leveranciernummer}'`;
                            rowsleverancier = await db.waitQuery(res.crudConnection, sql);
                            if (!rowsleverancier[0]) {
                                msg += `Leverancier ${leveranciernummer} onbekend<br>`;
                            }
                            sql = `
select * from  PRODUCT 
where productnummer = '${productnummer}'`;
                            rowsproduct = await db.waitQuery(res.crudConnection, sql);
                            if (!rowsproduct[0])
                                msg += `Product ${productnummer} onbekend<br>`;
                        }
                        sql = `
update PRODUCT set 
leveranciernummer = '${leveranciernummer}',
leverancierproductnummer = '${leverancierproductnummer}'
where productnummer = '${productnummer}'`;
                        await db.waitQuery(res.crudConnection, sql);
                    }
                    tlupdate++;
                }
            }
        }
        msg += tlupdate + ' leverancierproductregels ingelezen ...<br>';
        return msg;
    }

    //
    // Voorraad
    //
    protected async loadExactVoorraad(req: Request, res: Response, next: NextFunction, json: any, datum: string) {
        let msg = '';
        let tlupdate = 0;
        let sql = '';
        let thisArray = json.StockPosition;
        if (thisArray) {
            sql = `
update PRODUCT set 
voorraad = 0, 
voorraaddatumtijd = screendate2date('${datum}')`;
            await db.waitQuery(res.crudConnection, sql);
            //
            for (let iStock = 0; iStock < thisArray.length; iStock++) {
                let Stock = thisArray[iStock];
                let productnummer = this.getField(Stock, 'Item', '$', 'code');
                let productnaam = this.getField(Stock, 'Item', 'Description');
                let voorraad = Number(this.getField(Stock, 'CurrentQuantity'));
                //
                sql = `
update PRODUCT set`;
                if (productnaam != '') {
                    sql += `
productnaam = '${productnaam}',`;
                }
                //
                sql += `
voorraad = '${voorraad}',
voorraaddatumtijd = screendate2date('${datum}')
where productnummer = '${productnummer}'`;
                await db.waitQuery(res.crudConnection, sql);
                //
                tlupdate++;
            }
            //
            sql = `
update PRODUCT set 
lijn = null 
where lijn in ('0.00','')`;
            await db.waitQuery(res.crudConnection, sql);
            //
            // productlijn bijwerken
            //
            sql = `
insert into PRODUCTLIJN 
(productlijn)
select distinct lijn as productlijn
from PRODUCT
having  productlijn is not null
and not exists (
select 1 from PRODUCTLIJN 
where productlijn = PRODUCTLIJN.productlijn)`;
            await db.waitQuery(res.crudConnection, sql);
        }
        msg += tlupdate + ' voorraadregels ingelezen ...<br>';
        if (tlupdate > 0) {
            msg += ' en productlijn bijgewerkt ...<br>';
        }
        return msg;
    }

    //
    // Bestelling
    //
    protected async loadExactBestelling(req: Request, res: Response, next: NextFunction, json: any) {
        let msg = '';
        let tlupdate = 0;
        let sql = '';
        let rowsleverancier: any;
        let rowleverancier: any;
        let rowsproduct: any;
        let rowproduct: any;
        let rowsbestelling: any;
        let rowbestelling: any;
        let thisArray = json.PurchaseOrder;
        if (thisArray) {
            sql = `
update BESTELLING set 
status = 'OLD'`;
            await db.waitQuery(res.crudConnection, sql);
            for (let iBestel = 0; iBestel < thisArray.length; iBestel++) {
                let BESTEL = thisArray[iBestel];
                let leveranciernummer = this.getField(BESTEL, 'Supplier', '$', 'code');
                let leveranciernaam = this.getField(BESTEL, 'Supplier', 'Name');
                let bestelnummer = this.getField(BESTEL, '$', 'ordernumber');
                let datum = this.getDate(this.getField(BESTEL, 'OrderDate'));
                let leverdatum = this.getDate(this.getField(BESTEL, 'ReceiptDate'));
                let startdatum = this.getNow();
                if (BESTEL.PurchaseOrderLine) {
                    for (let iLine = 0; iLine < BESTEL.PurchaseOrderLine.length; iLine++) {
                        let LINE = BESTEL.PurchaseOrderLine[iLine];
                        let regelnummer = this.getField(LINE, '$','line');
                        let productnummer = this.getField(LINE, 'Item', '$', 'code');
                        let bestelling = Number(this.getField(LINE, 'Quantity'));
                        let leverancierproductnummer = this.getField(LINE, 'SupplierItemCode');
                        let regelleverdatum = this.getDate(this.getField(LINE, 'ReceiptDate'));
                        let swimport = 1;
                        if (leveranciernummer == '') {
                            swimport = 0;
                        }
                        if (productnummer == '????') {
                            swimport = 0;
                        }
                        if (swimport == 1) {
                            sql = `
select * 
from LEVERANCIER 
where leveranciernummer = '${leveranciernummer}'`;
                            rowsleverancier = await db.waitQuery(res.crudConnection, sql);
                            if (!rowsleverancier[0]) {
                                msg += `Leverancier ${leveranciernummer} onbekend<br>`;

                            }
                            sql = `
select * 
from PRODUCT 
where productnummer = '${productnummer}'`;
                            rowsproduct = await db.waitQuery(res.crudConnection, sql);
                            if (!rowsproduct[0]) {
                                msg += `Product ${productnummer} onbekend<br>`;

                            }
                            if (bestelling != 0) {
                                sql = `
select * from BESTELLING
where status = 'OLD'
and bestelnummer = '${bestelnummer}'
and productnummer = '${productnummer}'
and regelnummer = '${regelnummer}'`;
                                rowsbestelling = await db.waitQuery(res.crudConnection, sql);
                                if (!rowsbestelling[0]) {
                                    sql = `
insert into BESTELLING 
(status,bestelling,startdatumtijd,besteldatumtijd,
productnummer,leveranciernummer,leveranciernaam,bestelnummer,regelnummer)
select  
'NEW',
'${bestelling}',
screendate2date('${startdatum}'),
screendate2date('${regelleverdatum}'),
'${productnummer}',
'${leveranciernummer}',
'${leveranciernaam}',
'${bestelnummer}',
'${regelnummer}'
from DUAL`;
                                    await db.waitQuery(res.crudConnection, sql);
                                } else {
                                    sql = `
update BESTELLING set
status = 'NEW',
bestelling = '${bestelling}',
leveranciernummer = '${leveranciernummer}',
leveranciernaam = '${leveranciernaam}',
regelnummer = '${regelnummer}',
besteldatumtijd = screendate2date('${regelleverdatum}')
where id = '${rowsbestelling[0].ID}'`;
                                    await db.waitQuery(res.crudConnection, sql);
                                }
                                tlupdate++;
                            }
                        }
                    }
                }
            }
            // Ak: Geprint bijwerken ...
            sql = `
delete from BESTELLING 
where status = 'OLD'`;
            await db.waitQuery(res.crudConnection, sql);
        }
        msg += tlupdate + ' bestellingregels ingelezen ...<br>';
        return msg;
    }

    //
    // Ontvangsten op bestellingen
    //
    protected async loadExactReceipt(req: Request, res: Response, next: NextFunction, json: any) {
        let msg = '';
        let tlupdate = 0;
        let sql = '';
        let thisArray = json.Receipt;
        if (thisArray) {
            for (let iReceipt = 0; iReceipt < thisArray.length; iReceipt++) {
                let RECEIPT = thisArray[iReceipt];
                if (RECEIPT.ReceiptLine) {
                    for (let iLine = 0; iLine < RECEIPT.ReceiptLine.length; iLine++) {
                        let LINE = RECEIPT.ReceiptLine[iLine];
                        let bestelnummer = this.getField(LINE, '$', 'PurchaseOrderNumber');
                        let regelnummer = this.getField(LINE, '$', 'PurchaseOrderLine');
                        let aantal = Number(this.getField(LINE, '$', 'Quantity'));
                        let productnummer = this.getField(LINE, 'Item', '$', 'code');
                        let swfound = 0;
                        if (bestelnummer != '') {
                            sql = `
update BESTELLING set
bestelling = bestelling - ${aantal}
where bestelnummer = '${bestelnummer}'
and   regelnummer = '${regelnummer}'`;
                            await db.waitQuery(res.crudConnection, sql);
                            tlupdate++;
                        }
                    }
                }
            }
        }
        msg = tlupdate + ' ontvangst ingelezen ...<br>';
        return msg;
    }
    //
    // Orders
    //
    protected async loadExactProductvraag(req: Request, res: Response, next: NextFunction, json: any) {
        let msg = '';
        let tlupdate = 0;
        let sql = '';
        let rowsproductvraag: any;
        let rowproductvraag: any;
        let thisArray = json.SalesOrder;
        if (thisArray) {
            sql = `
update VRAAG set 
einddatumtijd = sysdate(),
vraagdatumtijd = null`;
            await db.waitQuery(res.crudConnection, sql);
            sql = `
update PRODUCTVRAAG set 
einddatumtijd = sysdate(), 
vraagdatumtijd = null, 
acceptdatumtijd = null`;
            await db.waitQuery(res.crudConnection, sql);
            //
            for (let iOrder = 0; iOrder < thisArray.length; iOrder++) {
                let ORDER = thisArray[iOrder];
                let datum = this.getDate(this.getField(ORDER, 'DeliveryDate'));
                let klantnaam = this.getField(ORDER, 'OrderedBy', 'Name');
                let klantnummer = this.getField(ORDER, 'OrderedBy', '$', 'code');
                let ordernummer = this.getField(ORDER, '$', 'salesordernumber');
                let orderreferentie = this.getField(ORDER, 'YourRef');
                let orderdatum = this.getDate(this.getField(ORDER, 'OrderDate'));
                if (ORDER.SalesOrderLine) {
                    for (let iLine = 0; iLine < ORDER.SalesOrderLine.length; iLine++) {
                        let LINE = ORDER.SalesOrderLine[iLine];
                        let regelnummer = this.getField(LINE, '$', 'line');
                        let productnummer = this.getField(LINE, 'Item', '$', 'code');
                        let aantal = Number(this.getField(LINE, 'Quantity'));
                        let datum = this.getDate(this.getField(LINE, 'DeliveryDate'));
                        let swfound = 0;
                        if (ordernummer != '') {
                            sql = `
select * from PRODUCTVRAAG
where ordernummer = '${ordernummer}'
and regelnummer = '${regelnummer}'
and einddatumtijd is not null`;
                            rowsproductvraag = await db.waitQuery(res.crudConnection, sql);
                            if (rowsproductvraag[0]) {
                                swfound = 1;
                            }
                            //
                            // 44 vraagdatum eventueel aanpassen
                            //
                            let vraagdatum = this.get44Vraagdatum(datum);
                            if (swfound == 0) {
                                sql = `
insert into PRODUCTVRAAG (
vraag,initvraagdatumtijd,vraagdatumtijd,
productnummer,klantnummer,klantnaam, ordernummer, regelnummer, 
orderreferentie, orderdatumtijd)
select
'${aantal}',
screendate2date('${datum}'),
screendate2date('${vraagdatum}'),
'${productnummer}',
'${klantnummer}',
'${klantnaam}',
'${ordernummer}',
'${regelnummer}',
'${orderreferentie}',
screendate2date('${orderdatum}')
from DUAL`;
                                await db.waitQuery(res.crudConnection, sql);
                            } else {
                                sql = `
update PRODUCTVRAAG set
einddatumtijd = null,
productnummer = '${productnummer} ',
initvraagdatumtijd = screendate2date('${datum}'),
Vraagdatumtijd = screendate2date('${vraagdatum}'),
Vraag = '${aantal}',
klantnummer = '${klantnummer}',
klantnaam = '${klantnaam}',
ordernummer = '${ordernummer}',
regelnummer = '${regelnummer}',
orderreferentie = '${orderreferentie}',
orderdatumtijd = screendate2date('${orderdatum}')
where id = '${rowsproductvraag[0].ID}'`;
                                await db.waitQuery(res.crudConnection, sql);
                            }
                            //
                            // VRAAG
                            //
                            if (ordernummer != '') {
                                sql = `
insert into VRAAG 
(initvraagdatumtijd,vraagdatumtijd,klantnummer,klantnaam, 
ordernummer, orderreferentie)
select 
screendate2date('${datum}'),
screendate2date('${vraagdatum}'),
'${klantnummer}',
'${klantnaam}',
'${ordernummer}',
'${orderreferentie}'
from DUAL
where not exists (
select 1 from VRAAG 
where ordernummer = '${ordernummer}')`;
                                await db.waitQuery(res.crudConnection, sql);
                                sql = `
update VRAAG set 
vraagdatumtijd = screendate2date('${vraagdatum}'),
einddatumtijd = null
where ordernummer = '${ordernummer}'`;
                                await db.waitQuery(res.crudConnection, sql);
                            }
                        }
                    }
                    tlupdate++;
                }
            }
            //
            sql = `
delete from VRAAG 
where einddatumtijd is not null`;
            await db.waitQuery(res.crudConnection, sql);
            sql = `
delete from PRODUCTVRAAG 
where einddatumtijd is not null`;
            await db.waitQuery(res.crudConnection, sql);
            //
        }
        msg = tlupdate + ' orderregels ingelezen ...<br>';
        return msg;
    }

    //
    // Uitleveringen van orders
    //
    protected async loadExactDelivery(req: Request, res: Response, next: NextFunction, json: any) {
        let msg = '';
        let tlupdate = 0;
        let thisArray = json.Delivery;
        let sql = '';
        if (thisArray) {
            for (let iDelivery = 0; iDelivery < thisArray.length; iDelivery++) {
                let DELIVERY = thisArray[iDelivery];
                if (DELIVERY.DeliveryLine) {
                    for (let iLine = 0; iLine < DELIVERY.DeliveryLine.length; iLine++) {
                        let LINE = DELIVERY.DeliveryLine[iLine];
                        let ordernummer = this.getField(LINE, '$', 'SalesOrderNumber');
                        let regelnummer = this.getField(LINE, '$', 'SalesOrderLine');
                        let aantal = Number(this.getField(LINE, '$', 'Quantity'));
                        let productnummer = this.getField(LINE, 'Item', '$', 'code');
                        let swfound = 0;
                        if (ordernummer != '') {
                            sql = `
update PRODUCTVRAAG set
Vraag = Vraag - ${aantal}
where ordernummer = '${ordernummer}'
and  regelnummer = '${regelnummer}'`;
                            await db.waitQuery(res.crudConnection, sql);
                        }
                    }
                    tlupdate++;
                }
            }
        }
        msg = tlupdate + ' orderafleveringregels ingelezen ...<br>';
        return msg;
    }

    //
    // Bewerkingen
    //
    protected async loadExactBewerking(req: Request, res: Response, next: NextFunction, json: any, datum: string) {
        let msg = '';
        let tlupdate = 0;
        let sql = '';
        let rows: any;
        let row: any;
        let rowsdubbel: any;
        let rowdubbel: any;
        let rowsopen: any;
        let rowopen: any;
        let thisDate = '';
        //
        let adviesdagen = Number(await Util.waitParam(req, res, next, "ADVIESDAGEN"));
        //
        let thisArray = json.ShopOrder;
        if (thisArray) {
            sql = `
update BEWERKING set 
status = 'OLD' 
where ifnull(status,'') != 'OLD'`;
            await db.waitQuery(res.crudConnection, sql);
            //
            // dubbele regels verwijderen
            //
            sql = `
update BEWERKING set 
bewerkingsnummer = trim(bewerkingsnummer) 
where bewerkingsnummer != trim(bewerkingsnummer)`;
            await db.waitQuery(res.crudConnection, sql);
            sql = `
select max(id) as id 
from BEWERKING 
group by trim(bewerkingsnummer) 
having count(*) > 1`;
            rowsdubbel = await db.waitQuery(res.crudConnection, sql);
            //
            // Alle bewerkingen zijn gereed tot het tegendeel bewezen is
            //
            sql = `
update BEWERKING 
set einddatumtijd = now()
where (einddatumtijd is null 
or DATE_FORMAT(einddatumtijd,'%Y') = '0000')
and exists (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer)`;
            await db.waitQuery(res.crudConnection, sql);
            //
            for (let iDubbel = 0; iDubbel < rowsdubbel.length; iDubbel++) {
                rowdubbel = rowsdubbel[iDubbel];
                sql = `
delete from BEWERKING 
where id = '${rowdubbel.ID}'`;
                await db.waitQuery(res.crudConnection, sql);
            }
            //
            for (let iOrder = 0; iOrder < thisArray.length; iOrder++) {
                let SHO = thisArray[iOrder];
                let bewerkingsnummer = this.getField(SHO, '$', 'number');
                let productnummer = this.getField(SHO, 'Item', '$', 'code');
                let aantal = Number(this.getField(SHO, 'PlannedQuantity'));
                let entrydate = this.getDate(this.getField(SHO, 'EntryDate'));
                let datum = this.getDate(this.getField(SHO, 'PlannedStartDate'));
                let plandatum = this.getDate(this.getField(SHO, 'PlannedDate'));
                let adviesdatum = this.getDate(this.getField(SHO, 'PlannedDate'));
                if (adviesdagen > 0) {
                    thisDate = adviesdatum;
                    sql = `
select
date2screendate(
date_sub(
screendate2date('${thisDate}'), 
interval ${adviesdagen} day))
as adviesdatum
from dual`;
                    rows = await db.waitQuery(res.crudConnection, sql);
                    adviesdatum = rows[0].ADVIESDATUM;
                }
                // Initstartdatum wordt door Import bepaald
                // Startdatumtijd wordt door AK2 bepaald, initieel door Import
                // Plandatumtijd wordt door AK2 bepaald, initieel door Import
                // Exactplandatumtijd = PlannedDate
                // Adviesdatum = PlannedDate - param.adviesdagen
                sql = `
insert into BEWERKING (bewerkingsnummer,productnummer,
initstartdatumtijd,startdatumtijd,plandatumtijd,
startaantal)
select 
'${bewerkingsnummer}',
'${productnummer}',
screendate2date('${entrydate}'),
screendate2date('${datum}'),
screendate2date('${adviesdatum}'),
'${aantal}'
from DUAL
where not exists (
select 1 from BEWERKING 
where bewerkingsnummer = '${bewerkingsnummer}')`;
                await db.waitQuery(res.crudConnection, sql);
                sql = `
update BEWERKING set
Productieaantal = '${aantal}',
Startdatumtijd = screendate2date('${datum}'),
Exactplandatumtijd = screendate2date('${plandatum}'),
Adviesplandatumtijd = screendate2date('${adviesdatum}'),
Einddatumtijd = null,
status = 'NEW'
where bewerkingsnummer = '${bewerkingsnummer}'`;
                await db.waitQuery(res.crudConnection, sql);
                sql = `
update BEWERKING set
InitStartdatumtijd = screendate2date('${entrydate}')
where bewerkingsnummer = '${bewerkingsnummer}'
and InitStartdatumtijd is null`;
                await db.waitQuery(res.crudConnection, sql);
                //
                tlupdate++;
            }
            //
            // Degenen waarvan nu nog een bewerking in Ak2 openstaan zijn toch niet gereed.
            // Welke bewerkingen zijn nog niet gereed in Ak2
            // Waar een bewerking zonder einddatum bestaat
            //
            let tlopen = 0;
            sql = `
select *,
date2screendate(initstartdatumtijd) as INITDATUM,
(select max(Bewerkingaantal) from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer) 
as AANTALOPEN
from BEWERKING
where einddatumtijd is not null
and exists (
select 1 from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer 
and (BEWERKINGFLOW.einddatumtijd is null or DATE_FORMAT(BEWERKINGFLOW.einddatumtijd,'%Y') = '0000' ))`;
            rowsopen = await db.waitQuery(res.crudConnection, sql);
            for (let iOpen = 0; iOpen < rowsopen.length; iOpen++) {
                rowopen = rowsopen[iOpen];
                // Een logregel wegschrijven + productieaantal aanpassen
                tlopen += 1;
                sql = `
update BEWERKING set
productieaantal =
(select max(Bewerkingaantal) from BEWERKINGFLOW 
where BEWERKINGFLOW.bewerkingsnummer = BEWERKING.bewerkingsnummer
and (BEWERKINGFLOW.einddatumtijd is null or DATE_FORMAT(BEWERKINGFLOW.einddatumtijd,'%Y') = '0000' )),
Einddatumtijd = null
where id = '${rowopen.ID}'`;
                await db.waitQuery(res.crudConnection, sql);
                msg += String(tlopen)
                    + ' Bewerking: '
                    + rowopen.BEWERKINGSNUMMER
                    + '  '
                    + rowopen.INITDATUM
                    + ' '
                    + rowopen.PRODUCTNUMMER
                    + ' is gereed in Exact, maar is nog niet gereed in AK2 (Aantal open: '
                    + rowopen.AANTALOPEN
                    + ') ...<br>\n';
            }
        }
        msg += tlupdate + ' bewerkingregels ingelezen ...<br>';
        return msg;
    }

    //
    // Ontvangsten van bewerkingen die gereed of gedeeltelijk gereed zijn
    //
    protected async loadExactBewerkingontvangst(req: Request, res: Response, next: NextFunction, json: any, datum: string) {
        let msg = '';
        let sql = '';
        let tlupdate = 0;
        let thisArray = json.ShopOrderStockReceipt;
        if (thisArray) {
            //
            // Alleen maar bewerkingen aanpassen als ze hiervoor zijn binnengekomen (open en gedeeltelijk open)
            //
            for (let iHor = 0; iHor < thisArray.length; iHor++) {
                let HOR = thisArray[iHor];
                let bewerkingsnummer = this.getField(HOR, 'ShopOrderNumber');
                let productnummer = this.getField(HOR, 'ItemCode');
                let aantal = this.getField(HOR, 'Quantity');
                if (Number(aantal) == 0) {
                    aantal = this.getField(HOR, 'SplitShopOrderStock', '$', 'Quantity');
                }
                if (Number(aantal) == 0) {
                    aantal = '0';
                }
                let datum = this.getDate(this.getField(HOR, 'TransactionDate'));
                sql = `
update BEWERKING set
Productieaantal = Productieaantal - ${aantal},
Startdatumtijd = screendate2date('${datum}'),
Einddatumtijd = null
where bewerkingsnummer = '${bewerkingsnummer}'
and status = 'NEW'`;
                await db.waitQuery(res.crudConnection, sql);
                tlupdate++;
            }
            //
            sql = `
update BEWERKING set
status = 'OLD'
where ifnull(status,'') != 'OLD'`;
            await db.waitQuery(res.crudConnection, sql);
            //
        }
        msg = tlupdate + ' bewerkingontvangstregels ingelezen ...<br>';
        return msg;
    }

    protected async doQuery(req: Request, res: Response, next: NextFunction, options?: Dict) {
        //
        let query = db.fixQuery(req.query);
        if (!query.datum) {
            query.datum = '';
        }
        res.crudConnection = await db.waitConnection();
        let msg = '';
        let result: any;
        let data: any;
        let json: any;
        let filename = '';
        //
        if (query.action=="get,exactleverancier") {
            json = await this.getJson('import/exactaccounts.dat');
            msg = await this.loadExactLeverancier(req, res, next, json);
        } else if (query.action=="get,exactklant") {
            json = await this.getJson('import/exactaccounts.dat');
            msg = await this.loadExactKlant(req, res, next, json);
        } else if (query.action=="get,exactproduct") {
            json = await this.getJson('import/exactitems.dat');
            msg = await this.loadExactProduct(req, res, next, json);
        } else if (query.action=="get,exactstuklijst") {
            json = await this.getJson('import/exactmbom.dat');
            msg = await this.loadExactStuklijst(req, res, next, json);
        } else if (query.action=="get,exactleverancierproduct") {
            json = await this.getJson('import/exactpurchase.dat');
            msg = await this.loadExactLeverancierproduct(req, res, next, json);
        } else if (query.action=="get,exactvoorraad") {
            json = await this.getJson('import/exactstock.dat');
            msg = await this.loadExactVoorraad(req, res, next, json, query.datum);
        } else if (query.action=="get,exactbestelling") {
            json = await this.getJson('import/exactpurchase.dat');
            msg = await this.loadExactBestelling(req, res, next, json);
        } else if (query.action=="get,exactreceipt") {
            json = await this.getJson('import/exactreceipt.dat');
            msg = await this.loadExactReceipt(req, res, next, json);
        } else if (query.action=="get,exactorder") {
            json = await this.getJson('import/exactsales.dat');
            msg = await this.loadExactProductvraag(req, res, next, json);
        } else if (query.action=="get,exactdelivery") {
            json = await this.getJson('import/exactdeliveries.dat');
            msg = await this.loadExactDelivery(req, res, next, json);
        } else if (query.action=="get,exactbewerk") {
            json = await this.getJson('import/exactshoporders.dat');
            msg = await this.loadExactBewerking(req, res, next, json, query.datum);
        } else if (query.action=="get,exactbewerkontvangst") {
            json = await this.getJson('import/exactshoporderreceipts.dat');
            msg = await this.loadExactBewerkingontvangst(req, res, next, json, query.datum);
        } else if (query.action=="get,handtekening") {
            msg = await this.loadHandtekening(req, res, next, filename, query.gebruiker);
        } else {
            msg = ('<p>Onbekende actie: ' + query.action + '... </p>');
        }
        //
        result = {
            items: [
                {
                    msg: msg
                }
            ]
        }
        res.crudConnection.release();
        res.status(200).send(result);
        return;
    }


    public async routes(req: Request, res: Response, next: NextFunction) {
        //
        let method = req.method;
        let action = db.fix(req.query.action || '');
        //
        Logger.request(req);
        //
        if (action == "select") {
            Util.unknownOperation(req, res, next);
        } else if (method == "GET") {
            this.doQuery(req, res, next, this.dict);
        } else if (method == "PUT") {
            Util.unknownOperation(req, res, next);
        } else if (method == "POST") {
            this.doQuery(req, res, next, this.dict);
        } else if (method == "DELETE") {
            Util.unknownOperation(req, res, next);
        } else {
            Util.unknownOperation(req, res, next);
        }
    }

}
