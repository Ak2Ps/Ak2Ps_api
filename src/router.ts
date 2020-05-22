
import { Application } from 'express';
import { Util } from './util';
import { Logger } from './logger';

import { Config } from './config';
//
import { Template } from "./providers/template";
import { Ecmtester } from "./providers/ecmtester";
import { Patch } from "./providers/patch";
import { CreateCompareSql } from "./providers/createcomparesql";
import { Schedule } from "./providers/schedule";
//
import { Exactinterface } from "./providers/exactinterface";
//
import { Janee } from "./providers/janee";
import { Janeealle } from "./providers/janeealle";
import { Soort } from "./providers/soort";
//
import { Toolbox } from './providers/toolbox';
import { Exactclient } from './providers/exactclient';
import { Upload } from './providers/upload';
import { Bb } from './providers/bb';
import { Loginfo } from './providers/loginfo';
import { Mnl } from './providers/mnl';
import { Performance } from './providers/performance';
//
import { Gebruiker } from './providers/gebruiker';
import { Param } from './providers/param';
import { Menu } from './providers/menu';
import { Menuregel } from './providers/menuregel';
import { Logon } from './providers/logon';
//
import { Afdeling } from './providers/afdeling';
import { Uitval } from './providers/uitval';
import { Uitvalsoort } from './providers/uitvalsoort';
import { Product } from './providers/product';
import { Onderdeel } from './providers/onderdeel';
import { Productgroep } from './providers/productgroep';
import { Productlijn } from './providers/productlijn';
import { Lijn } from './providers/lijn';
import { Bewerkingsoort } from './providers/bewerkingsoort';
import { Layout } from './providers/layout';
import { Klant } from './providers/klant';
import { Leverancier } from './providers/leverancier';
import { Afleveradres } from './providers/afleveradres';
import { Contact } from './providers/contact';
import { Plansoort } from './providers/plansoort';
//
import { Retour } from './providers/retour';
import { Retouractie } from './providers/retouractie';
import { Retouractietype } from './providers/retouractietype';
import { Retourgarantie } from './providers/retourgarantie';
import { Retourgebruiker } from './providers/retourgebruiker';
import { Retourklant } from './providers/retourklant';
import { Retourtermijn } from './providers/retourtermijn';
import { Retourtype } from './providers/retourtype';
import { Retourproduct } from './providers/retourproduct';
import { Retourontvangst } from './providers/retourontvangst';
import { Retourrap } from './providers/retourrap';
import { Retourverzend } from './providers/retourverzend';
import { Retourverzendleverancier } from './providers/retourverzendleverancier';
//
import { Bestelling } from './providers/bestelling';
import { Bestellingkop } from './providers/bestellingkop';
import { Bestellingkoprap } from './providers/bestellingkoprap';
import { Bestellingproductgroep } from './providers/bestellingproductgroep';
import { Productgroepbestelling } from './providers/productgroepbestelling';
import { Bestellingtelaat } from './providers/bestellingtelaat';
import { Productvraag } from './providers/productvraag';
import { Productvoorraad } from './providers/productvoorraad';
import { Voorraad } from './providers/voorraad';
import { Inkoop } from './providers/inkoop';
import { Logistiek } from './providers/logistiek';
import { Planning } from './providers/planning';
import { Uitlever } from './providers/uitlever';
//
import { Gebruikertijd } from './providers/gebruikertijd';
import { Gebruikerrap } from './providers/gebruikerrap';
import { Gebruikershift } from './providers/gebruikershift';
import { Calender } from './providers/calender';
//
import { Bewerking } from './providers/bewerking';
import { Bewerkingflow } from './providers/bewerkingflow';
import { Bewerkingflowbewerk } from './providers/bewerkingflowbewerk';
import { Bewerkingfloweindcontrole } from './providers/bewerkingfloweindcontrole';
import { Bewerkingflowpick } from './providers/bewerkingflowpick';
import { Bewerkingrap } from './providers/bewerkingrap';
import { Bewerkingtijd } from './providers/bewerkingtijd';
import { Bewerkinguitval } from './providers/bewerkinguitval';
import { Bewerkinguitvalrap } from './providers/bewerkinguitvalrap';
import { Bewerkingverschil } from './providers/bewerkingverschil';
import { Productbewerkingrap } from './providers/productbewerkingrap';
import { Productuitvalrap } from './providers/productuitvalrap';
export class Router {
  //
  private schedule: Schedule;
  //
  private exactinterface: Exactinterface;
  //
  private janee: Janee;
  private janeealle: Janeealle;
  private soort: Soort;
  //
  private toolbox: Toolbox;
  private exactclient: Exactclient;
  private upload: Upload;
  private bb: Bb;
  private loginfo: Loginfo;
  private mnl: Mnl;
  private performance: Performance;
  //
  private gebruiker: Gebruiker;
  private param: Param;
  private menu: Menu;
  private menuregel: Menuregel;;
  private logon: Logon;
  //
  private afdeling: Afdeling;
  private uitval: Uitval;
  private uitvalsoort: Uitvalsoort;
  private product: Product;
  private onderdeel: Onderdeel;
  private productgroep: Productgroep;
  private productlijn: Productlijn;
  private lijn: Lijn;
  private bewerkingsoort: Bewerkingsoort;
  private layout: Layout;
  private klant: Klant;
  private leverancier: Leverancier;
  private afleveradres: Afleveradres;
  private contact: Contact;
  private plansoort: Plansoort;
  //
  private retour: Retour;
  private retouractie: Retouractie;
  private retouractietype: Retouractietype;
  private retourgarantie: Retourgarantie;
  private retourgebruiker: Retourgebruiker;
  private retourklant: Retourklant;
  private retourtermijn: Retourtermijn;
  private retourtype: Retourtype;
  private retourproduct: Retourproduct;
  private retourontvangst: Retourontvangst;
  private retourrap: Retourrap;
  private retourverzend: Retourverzend;
  private retourverzendleverancier: Retourverzendleverancier;
  //
  private bestelling: Bestelling;
  private bestellingkop: Bestellingkop;
  private bestellingkoprap: Bestellingkoprap;
  private bestellingproductgroep: Bestellingproductgroep;
  private productgroepbestelling: Productgroepbestelling;
  private bestellingtelaat: Bestellingtelaat;
  private productvraag: Productvraag;
  private productvoorraad: Productvoorraad;
  private voorraad: Voorraad;
  private inkoop: Inkoop;
  private logistiek: Logistiek;
  private planning: Planning;
  private uitlever: Uitlever;
  //
  private gebruikertijd: Gebruikertijd;
  private gebruikerrap: Gebruikerrap;
  private gebruikershift: Gebruikershift;
  private calender: Calender;
  //
  private bewerking: Bewerking;
  private bewerkingflow: Bewerkingflow;
  private bewerkingflowbewerk: Bewerkingflowbewerk;
  private bewerkingfloweindcontrole: Bewerkingfloweindcontrole;
  private bewerkingflowpick: Bewerkingflowpick;
  private bewerkingrap: Bewerkingrap;
  private bewerkingtijd: Bewerkingtijd;
  private bewerkinguitval: Bewerkinguitval;
  private bewerkinguitvalrap: Bewerkinguitvalrap;
  private bewerkingverschil: Bewerkingverschil;
  private productbewerkingrap: Productbewerkingrap;
  private productuitvalrap: Productuitvalrap;

  constructor(private app: Application) {
    //
    Logger.info("Creating Router");
    //
    this.schedule = new Schedule();
    //
    this.exactinterface = new Exactinterface();
    //
    this.janee = new Janee();
    this.janeealle = new Janeealle();
    this.soort = new Soort();
    //
    this.toolbox = new Toolbox();
    this.exactclient = new Exactclient();
    this.upload = new Upload();
    this.bb = new Bb();
    this.loginfo = new Loginfo();
    this.mnl = new Mnl();
    this.performance = new Performance();
    //
    this.gebruiker = new Gebruiker();
    this.param = new Param();
    this.menu = new Menu();
    this.menuregel = new Menuregel();
    this.logon = new Logon();
    //
    this.afdeling = new Afdeling();
    this.uitval = new Uitval();
    this.uitvalsoort = new Uitvalsoort();
    this.product = new Product();
    this.onderdeel = new Onderdeel();
    this.productgroep = new Productgroep();
    this.productlijn = new Productlijn();
    this.lijn = new Lijn();
    this.bewerkingsoort = new Bewerkingsoort();
    this.layout = new Layout();
    this.klant = new Klant();
    this.leverancier = new Leverancier();
    this.afleveradres = new Afleveradres();
    this.contact = new Contact();
    this.plansoort = new Plansoort();
    //
    this.retour = new Retour();
    this.retouractie = new Retouractie();
    this.retouractietype = new Retouractietype();
    this.retourgarantie = new Retourgarantie();
    this.retourgebruiker = new Retourgebruiker();
    this.retourklant = new Retourklant();
    this.retourtermijn = new Retourtermijn();
    this.retourtype = new Retourtype();
    this.retourproduct = new Retourproduct();
    this.retourontvangst = new Retourontvangst();
    this.retourrap = new Retourrap();
    this.retourverzend = new Retourverzend();
    this.retourverzendleverancier = new Retourverzendleverancier();
    //
    this.bestelling = new Bestelling();
    this.bestellingkop = new Bestellingkop();
    this.bestellingkoprap = new Bestellingkoprap();
    this.bestellingproductgroep = new Bestellingproductgroep();
    this.productgroepbestelling = new Productgroepbestelling();
    this.bestellingtelaat = new Bestellingtelaat();
    this.productvraag = new Productvraag();
    this.productvoorraad = new Productvoorraad();
    this.voorraad = new Voorraad();
    this.inkoop = new Inkoop();
    this.logistiek = new Logistiek();
    this.planning = new Planning();
    this.uitlever = new Uitlever();
    //
    this.gebruikertijd = new Gebruikertijd();
    this.gebruikerrap = new Gebruikerrap();
    this.gebruikershift = new Gebruikershift();
    this.calender = new Calender();
    //
    this.bewerking = new Bewerking();
    this.bewerkingflow = new Bewerkingflow();
    this.bewerkingflowbewerk = new Bewerkingflowbewerk();
    this.bewerkingfloweindcontrole = new Bewerkingfloweindcontrole();
    this.bewerkingflowpick = new Bewerkingflowpick();
    this.bewerkingrap = new Bewerkingrap();
    this.bewerkingtijd = new Bewerkingtijd();
    this.bewerkinguitval = new Bewerkinguitval();
    this.bewerkinguitvalrap = new Bewerkinguitvalrap();
    this.bewerkingverschil = new Bewerkingverschil();
    this.productbewerkingrap = new Productbewerkingrap();
    this.productuitvalrap = new Productuitvalrap();
    //
    //
    this.reroute();
  }

  public reroute() {
    //
    //
    //
    this.app.route('/').all(Util.isRunning);
    this.app.route('/schedule').all((req, res, next) => this.schedule.routes(req, res, next));
    this.app.route('/schedule.php').all((req, res, next) => this.schedule.routes(req, res, next));
    //
    // Extra's
    //
    this.app.route('/generate').all((req, res, next) => {
      let template = new Template();
      template.generate(req, res, next)
    });
    this.app.route('/ecmtester.php').all((req, res, next) => {
      let ecmtester = new Ecmtester();
      ecmtester.routes(req, res, next)
    });
    this.app.route('/patch.php').all((req, res, next) => {
      let patch = new Patch();
      patch.routes(req, res, next)
    });
    this.app.route('/createcomparesql').all((req, res, next) => {
      let createcomparesql = new CreateCompareSql();
      createcomparesql.routes(req, res, next);
    });
    //
    // static serve some files
    //
    this.app.route('/handtekening/:filename').get((req, res, next) => {
      res.sendFile(`${Config.appDir}/handtekening/${req.params.filename}`);
    });
    this.app.route('/favicon.ico').get((req, res, next) => {
      res.sendFile(`/Ak2Ps/Ak2Ps_build/favicon.ico`);
    });
    this.app.route('/pdf/:filename').get((req, res, next) => {
      res.sendFile(`${Config.appDir}/pdf/${req.params.filename}`);
    });
    //
    this.app.route('/setcode.php').all((req, res, next) => this.exactinterface.routes(req, res, next));
    this.app.route('/getcode.php').all((req, res, next) => this.exactinterface.routes(req, res, next));
    //
    this.app.route('/janee.php').all((req, res, next) => this.janee.routes(req, res, next));
    this.app.route('/janeealle.php').all((req, res, next) => this.janeealle.routes(req, res, next));
    this.app.route('/soort.php').all((req, res, next) => this.soort.routes(req, res, next));
    //
    this.app.route('/toolbox.php').all((req, res, next) => this.toolbox.routes(req, res, next));
    this.app.route('/exactclient.php').all((req, res, next) => this.exactclient.routes(req, res, next));
    this.app.route('/upload.php').all((req, res, next) => this.upload.routes(req, res, next));
    this.app.route('/bb.php').all((req, res, next) => this.bb.routes(req, res, next));
    this.app.route('/loginfo.php').all((req, res, next) => this.loginfo.routes(req, res, next));
    this.app.route('/mnl.php').all((req, res, next) => this.mnl.routes(req, res, next));
    this.app.route('/performance.php').all((req, res, next) => this.performance.routes(req, res, next));
    //
    this.app.route('/gebruiker.php').all((req, res, next) => this.gebruiker.routes(req, res, next));
    this.app.route('/param.php').all((req, res, next) => this.param.routes(req, res, next));
    this.app.route('/menu.php').all((req, res, next) => this.menu.routes(req, res, next));
    this.app.route('/menuregel.php').all((req, res, next) => this.menuregel.routes(req, res, next));
    this.app.route('/logon.php').all((req, res, next) => this.logon.routes(req, res, next));
    //
    this.app.route('/afdeling.php').all((req, res, next) => this.afdeling.routes(req, res, next));
    this.app.route('/uitval.php').all((req, res, next) => this.uitval.routes(req, res, next));
    this.app.route('/uitvalsoort.php').all((req, res, next) => this.uitvalsoort.routes(req, res, next));
    this.app.route('/product.php').all((req, res, next) => this.product.routes(req, res, next));
    this.app.route('/onderdeel.php').all((req, res, next) => this.onderdeel.routes(req, res, next));
    this.app.route('/productgroep.php').all((req, res, next) => this.productgroep.routes(req, res, next));
    this.app.route('/productlijn.php').all((req, res, next) => this.productlijn.routes(req, res, next));
    this.app.route('/lijn.php').all((req, res, next) => this.lijn.routes(req, res, next));
    this.app.route('/bewerkingsoort.php').all((req, res, next) => this.bewerkingsoort.routes(req, res, next));
    this.app.route('/layout.php').all((req, res, next) => this.layout.routes(req, res, next));
    this.app.route('/klant.php').all((req, res, next) => this.klant.routes(req, res, next));
    this.app.route('/leverancier.php').all((req, res, next) => this.leverancier.routes(req, res, next));
    this.app.route('/afleveradres.php').all((req, res, next) => this.afleveradres.routes(req, res, next));
    this.app.route('/contact.php').all((req, res, next) => this.contact.routes(req, res, next));
    this.app.route('/plansoort.php').all((req, res, next) => this.plansoort.routes(req, res, next));
    //
    this.app.route('/retour.php').all((req, res, next) => this.retour.routes(req, res, next));
    this.app.route('/retouractie.php').all((req, res, next) => this.retouractie.routes(req, res, next));
    this.app.route('/retouractietype.php').all((req, res, next) => this.retouractietype.routes(req, res, next));
    this.app.route('/retourgarantie.php').all((req, res, next) => this.retourgarantie.routes(req, res, next));
    this.app.route('/retourgebruiker.php').all((req, res, next) => this.retourgebruiker.routes(req, res, next));
    this.app.route('/retourklant.php').all((req, res, next) => this.retourklant.routes(req, res, next));
    this.app.route('/retourtermijn.php').all((req, res, next) => this.retourtermijn.routes(req, res, next));
    this.app.route('/retourtype.php').all((req, res, next) => this.retourtype.routes(req, res, next));
    this.app.route('/retourproduct.php').all((req, res, next) => this.retourproduct.routes(req, res, next));
    this.app.route('/retourontvangst.php').all((req, res, next) => this.retourontvangst.routes(req, res, next));
    this.app.route('/retourrap.php').all((req, res, next) => this.retourrap.routes(req, res, next));
    this.app.route('/retourverzend.php').all((req, res, next) => this.retourverzend.routes(req, res, next));
    this.app.route('/retourverzendleverancier.php').all((req, res, next) => this.retourverzendleverancier.routes(req, res, next));
    //
    this.app.route('/bestelling.php').all((req, res, next) => this.bestelling.routes(req, res, next));
    this.app.route('/bestellingkop.php').all((req, res, next) => this.bestellingkop.routes(req, res, next));
    this.app.route('/bestellingkoprap.php').all((req, res, next) => this.bestellingkoprap.routes(req, res, next));
    this.app.route('/bestellingproductgroep.php').all((req, res, next) => this.bestellingproductgroep.routes(req, res, next));
    this.app.route('/productgroepbestelling.php').all((req, res, next) => this.productgroepbestelling.routes(req, res, next));
    this.app.route('/bestellingtelaat.php').all((req, res, next) => this.bestellingtelaat.routes(req, res, next));
    this.app.route('/productvraag.php').all((req, res, next) => this.productvraag.routes(req, res, next));
    this.app.route('/productvoorraad.php').all((req, res, next) => this.productvoorraad.routes(req, res, next));
    this.app.route('/voorraad.php').all((req, res, next) => this.voorraad.routes(req, res, next));
    this.app.route('/inkoop.php').all((req, res, next) => this.inkoop.routes(req, res, next));
    this.app.route('/logistiek.php').all((req, res, next) => this.logistiek.routes(req, res, next));
    this.app.route('/planning.php').all((req, res, next) => this.planning.routes(req, res, next));
    this.app.route('/uitlever.php').all((req, res, next) => this.uitlever.routes(req, res, next));
    //
    this.app.route('/gebruikertijd.php').all((req, res, next) => this.gebruikertijd.routes(req, res, next));
    this.app.route('/gebruikerrap.php').all((req, res, next) => this.gebruikerrap.routes(req, res, next));
    this.app.route('/gebruikershift.php').all((req, res, next) => this.gebruikershift.routes(req, res, next));
    this.app.route('/calender.php').all((req, res, next) => this.calender.routes(req, res, next));
    //
    this.app.route('/bewerking.php').all((req, res, next) => this.bewerking.routes(req, res, next));
    this.app.route('/bewerkingflow.php').all((req, res, next) => this.bewerkingflow.routes(req, res, next));
    this.app.route('/bewerkingflowbewerk.php').all((req, res, next) => this.bewerkingflowbewerk.routes(req, res, next));
    this.app.route('/bewerkingfloweindcontrole.php').all((req, res, next) => this.bewerkingfloweindcontrole.routes(req, res, next));
    this.app.route('/bewerkingflowpick.php').all((req, res, next) => this.bewerkingflowpick.routes(req, res, next));
    this.app.route('/bewerkingrap.php').all((req, res, next) => this.bewerkingrap.routes(req, res, next));
    this.app.route('/bewerkingtijd.php').all((req, res, next) => this.bewerkingtijd.routes(req, res, next));
    this.app.route('/bewerkinguitval.php').all((req, res, next) => this.bewerkinguitval.routes(req, res, next));
    this.app.route('/bewerkinguitvalrap.php').all((req, res, next) => this.bewerkinguitvalrap.routes(req, res, next));
    this.app.route('/bewerkingverschil.php').all((req, res, next) => this.bewerkingverschil.routes(req, res, next));
    this.app.route('/productbewerkingrap.php').all((req, res, next) => this.productbewerkingrap.routes(req, res, next));
    this.app.route('/productuitvalrap.php').all((req, res, next) => this.productuitvalrap.routes(req, res, next));
    //
    this.app.route('*').all(Util.unknownOperation);
  }
}
/*
todo:
exactclient.php
frmUpload.php
//
totest:
relatieve verwijzingen (inclusief assets)
mail
ecm
exact
pdf's en rapporten
tekeningen
//
tokens exact
*/
