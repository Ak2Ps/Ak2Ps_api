"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var util_1 = require("./util");
var logger_1 = require("./logger");
var config_1 = require("./config");
//
var template_1 = require("./providers/template");
var ecmtester_1 = require("./providers/ecmtester");
var patch_1 = require("./providers/patch");
var createcomparesql_1 = require("./providers/createcomparesql");
var schedule_1 = require("./providers/schedule");
//
var exactinterface_1 = require("./providers/exactinterface");
//
var janee_1 = require("./providers/janee");
var janeealle_1 = require("./providers/janeealle");
var soort_1 = require("./providers/soort");
//
var toolbox_1 = require("./providers/toolbox");
var exactclient_1 = require("./providers/exactclient");
var upload_1 = require("./providers/upload");
var bb_1 = require("./providers/bb");
var loginfo_1 = require("./providers/loginfo");
var mnl_1 = require("./providers/mnl");
var performance_1 = require("./providers/performance");
//
var gebruiker_1 = require("./providers/gebruiker");
var param_1 = require("./providers/param");
var menu_1 = require("./providers/menu");
var menuregel_1 = require("./providers/menuregel");
var logon_1 = require("./providers/logon");
//
var afdeling_1 = require("./providers/afdeling");
var uitval_1 = require("./providers/uitval");
var uitvalsoort_1 = require("./providers/uitvalsoort");
var product_1 = require("./providers/product");
var onderdeel_1 = require("./providers/onderdeel");
var productgroep_1 = require("./providers/productgroep");
var productlijn_1 = require("./providers/productlijn");
var lijn_1 = require("./providers/lijn");
var bewerkingsoort_1 = require("./providers/bewerkingsoort");
var layout_1 = require("./providers/layout");
var klant_1 = require("./providers/klant");
var leverancier_1 = require("./providers/leverancier");
var afleveradres_1 = require("./providers/afleveradres");
var contact_1 = require("./providers/contact");
var plansoort_1 = require("./providers/plansoort");
//
var retour_1 = require("./providers/retour");
var retouractie_1 = require("./providers/retouractie");
var retouractietype_1 = require("./providers/retouractietype");
var retourgarantie_1 = require("./providers/retourgarantie");
var retourgebruiker_1 = require("./providers/retourgebruiker");
var retourklant_1 = require("./providers/retourklant");
var retourtermijn_1 = require("./providers/retourtermijn");
var retourtype_1 = require("./providers/retourtype");
var retourproduct_1 = require("./providers/retourproduct");
var retourontvangst_1 = require("./providers/retourontvangst");
var retourrap_1 = require("./providers/retourrap");
var retourverzend_1 = require("./providers/retourverzend");
var retourverzendleverancier_1 = require("./providers/retourverzendleverancier");
//
var bestelling_1 = require("./providers/bestelling");
var bestellingkop_1 = require("./providers/bestellingkop");
var bestellingkoprap_1 = require("./providers/bestellingkoprap");
var bestellingproductgroep_1 = require("./providers/bestellingproductgroep");
var productgroepbestelling_1 = require("./providers/productgroepbestelling");
var bestellingtelaat_1 = require("./providers/bestellingtelaat");
var productvraag_1 = require("./providers/productvraag");
var productvoorraad_1 = require("./providers/productvoorraad");
var voorraad_1 = require("./providers/voorraad");
var inkoop_1 = require("./providers/inkoop");
var logistiek_1 = require("./providers/logistiek");
var planning_1 = require("./providers/planning");
var uitlever_1 = require("./providers/uitlever");
//
var gebruikertijd_1 = require("./providers/gebruikertijd");
var gebruikerrap_1 = require("./providers/gebruikerrap");
var gebruikershift_1 = require("./providers/gebruikershift");
var calender_1 = require("./providers/calender");
//
var bewerking_1 = require("./providers/bewerking");
var bewerkingflow_1 = require("./providers/bewerkingflow");
var bewerkingflowbewerk_1 = require("./providers/bewerkingflowbewerk");
var bewerkingfloweindcontrole_1 = require("./providers/bewerkingfloweindcontrole");
var bewerkingflowpick_1 = require("./providers/bewerkingflowpick");
var bewerkingrap_1 = require("./providers/bewerkingrap");
var bewerkingtijd_1 = require("./providers/bewerkingtijd");
var bewerkinguitval_1 = require("./providers/bewerkinguitval");
var bewerkinguitvalrap_1 = require("./providers/bewerkinguitvalrap");
var bewerkingverschil_1 = require("./providers/bewerkingverschil");
var productbewerkingrap_1 = require("./providers/productbewerkingrap");
var productuitvalrap_1 = require("./providers/productuitvalrap");
var Router = /** @class */ (function () {
    function Router(app) {
        this.app = app;
        //
        logger_1.Logger.info("Creating Router");
        //
        this.schedule = new schedule_1.Schedule();
        //
        this.exactinterface = new exactinterface_1.Exactinterface();
        //
        this.janee = new janee_1.Janee();
        this.janeealle = new janeealle_1.Janeealle();
        this.soort = new soort_1.Soort();
        //
        this.toolbox = new toolbox_1.Toolbox();
        this.exactclient = new exactclient_1.Exactclient();
        this.upload = new upload_1.Upload();
        this.bb = new bb_1.Bb();
        this.loginfo = new loginfo_1.Loginfo();
        this.mnl = new mnl_1.Mnl();
        this.performance = new performance_1.Performance();
        //
        this.gebruiker = new gebruiker_1.Gebruiker();
        this.param = new param_1.Param();
        this.menu = new menu_1.Menu();
        this.menuregel = new menuregel_1.Menuregel();
        this.logon = new logon_1.Logon();
        //
        this.afdeling = new afdeling_1.Afdeling();
        this.uitval = new uitval_1.Uitval();
        this.uitvalsoort = new uitvalsoort_1.Uitvalsoort();
        this.product = new product_1.Product();
        this.onderdeel = new onderdeel_1.Onderdeel();
        this.productgroep = new productgroep_1.Productgroep();
        this.productlijn = new productlijn_1.Productlijn();
        this.lijn = new lijn_1.Lijn();
        this.bewerkingsoort = new bewerkingsoort_1.Bewerkingsoort();
        this.layout = new layout_1.Layout();
        this.klant = new klant_1.Klant();
        this.leverancier = new leverancier_1.Leverancier();
        this.afleveradres = new afleveradres_1.Afleveradres();
        this.contact = new contact_1.Contact();
        this.plansoort = new plansoort_1.Plansoort();
        //
        this.retour = new retour_1.Retour();
        this.retouractie = new retouractie_1.Retouractie();
        this.retouractietype = new retouractietype_1.Retouractietype();
        this.retourgarantie = new retourgarantie_1.Retourgarantie();
        this.retourgebruiker = new retourgebruiker_1.Retourgebruiker();
        this.retourklant = new retourklant_1.Retourklant();
        this.retourtermijn = new retourtermijn_1.Retourtermijn();
        this.retourtype = new retourtype_1.Retourtype();
        this.retourproduct = new retourproduct_1.Retourproduct();
        this.retourontvangst = new retourontvangst_1.Retourontvangst();
        this.retourrap = new retourrap_1.Retourrap();
        this.retourverzend = new retourverzend_1.Retourverzend();
        this.retourverzendleverancier = new retourverzendleverancier_1.Retourverzendleverancier();
        //
        this.bestelling = new bestelling_1.Bestelling();
        this.bestellingkop = new bestellingkop_1.Bestellingkop();
        this.bestellingkoprap = new bestellingkoprap_1.Bestellingkoprap();
        this.bestellingproductgroep = new bestellingproductgroep_1.Bestellingproductgroep();
        this.productgroepbestelling = new productgroepbestelling_1.Productgroepbestelling();
        this.bestellingtelaat = new bestellingtelaat_1.Bestellingtelaat();
        this.productvraag = new productvraag_1.Productvraag();
        this.productvoorraad = new productvoorraad_1.Productvoorraad();
        this.voorraad = new voorraad_1.Voorraad();
        this.inkoop = new inkoop_1.Inkoop();
        this.logistiek = new logistiek_1.Logistiek();
        this.planning = new planning_1.Planning();
        this.uitlever = new uitlever_1.Uitlever();
        //
        this.gebruikertijd = new gebruikertijd_1.Gebruikertijd();
        this.gebruikerrap = new gebruikerrap_1.Gebruikerrap();
        this.gebruikershift = new gebruikershift_1.Gebruikershift();
        this.calender = new calender_1.Calender();
        //
        this.bewerking = new bewerking_1.Bewerking();
        this.bewerkingflow = new bewerkingflow_1.Bewerkingflow();
        this.bewerkingflowbewerk = new bewerkingflowbewerk_1.Bewerkingflowbewerk();
        this.bewerkingfloweindcontrole = new bewerkingfloweindcontrole_1.Bewerkingfloweindcontrole();
        this.bewerkingflowpick = new bewerkingflowpick_1.Bewerkingflowpick();
        this.bewerkingrap = new bewerkingrap_1.Bewerkingrap();
        this.bewerkingtijd = new bewerkingtijd_1.Bewerkingtijd();
        this.bewerkinguitval = new bewerkinguitval_1.Bewerkinguitval();
        this.bewerkinguitvalrap = new bewerkinguitvalrap_1.Bewerkinguitvalrap();
        this.bewerkingverschil = new bewerkingverschil_1.Bewerkingverschil();
        this.productbewerkingrap = new productbewerkingrap_1.Productbewerkingrap();
        this.productuitvalrap = new productuitvalrap_1.Productuitvalrap();
        //
        //
        this.reroute();
    }
    ;
    Router.prototype.reroute = function () {
        var _this = this;
        //
        //
        //
        this.app.route('/').all(util_1.Util.isRunning);
        this.app.route('/schedule').all(function (req, res, next) { return _this.schedule.routes(req, res, next); });
        this.app.route('/schedule.php').all(function (req, res, next) { return _this.schedule.routes(req, res, next); });
        //
        // Extra's
        //
        this.app.route('/generate').all(function (req, res, next) {
            var template = new template_1.Template();
            template.generate(req, res, next);
        });
        this.app.route('/ecmtester.php').all(function (req, res, next) {
            var ecmtester = new ecmtester_1.Ecmtester();
            ecmtester.routes(req, res, next);
        });
        this.app.route('/patch.php').all(function (req, res, next) {
            var patch = new patch_1.Patch();
            patch.routes(req, res, next);
        });
        this.app.route('/createcomparesql').all(function (req, res, next) {
            var createcomparesql = new createcomparesql_1.CreateCompareSql();
            createcomparesql.routes(req, res, next);
        });
        //
        // static serve some files
        //
        this.app.route('/handtekening/:filename').get(function (req, res, next) {
            res.sendFile(config_1.Config.appDir + "/handtekening/" + req.params.filename);
        });
        this.app.route('/favicon.ico').get(function (req, res, next) {
            res.sendFile("/Ak2Ps/Ak2Ps_build/favicon.ico");
        });
        this.app.route('/pdf/:filename').get(function (req, res, next) {
            res.sendFile(config_1.Config.appDir + "/pdf/" + req.params.filename);
        });
        //
        this.app.route('/setcode.php').all(function (req, res, next) { return _this.exactinterface.routes(req, res, next); });
        this.app.route('/getcode.php').all(function (req, res, next) { return _this.exactinterface.routes(req, res, next); });
        //
        this.app.route('/janee.php').all(function (req, res, next) { return _this.janee.routes(req, res, next); });
        this.app.route('/janeealle.php').all(function (req, res, next) { return _this.janeealle.routes(req, res, next); });
        this.app.route('/soort.php').all(function (req, res, next) { return _this.soort.routes(req, res, next); });
        //
        this.app.route('/toolbox.php').all(function (req, res, next) { return _this.toolbox.routes(req, res, next); });
        this.app.route('/exactclient.php').all(function (req, res, next) { return _this.exactclient.routes(req, res, next); });
        this.app.route('/upload.php').all(function (req, res, next) { return _this.upload.routes(req, res, next); });
        this.app.route('/bb.php').all(function (req, res, next) { return _this.bb.routes(req, res, next); });
        this.app.route('/loginfo.php').all(function (req, res, next) { return _this.loginfo.routes(req, res, next); });
        this.app.route('/mnl.php').all(function (req, res, next) { return _this.mnl.routes(req, res, next); });
        this.app.route('/performance.php').all(function (req, res, next) { return _this.performance.routes(req, res, next); });
        //
        this.app.route('/gebruiker.php').all(function (req, res, next) { return _this.gebruiker.routes(req, res, next); });
        this.app.route('/param.php').all(function (req, res, next) { return _this.param.routes(req, res, next); });
        this.app.route('/menu.php').all(function (req, res, next) { return _this.menu.routes(req, res, next); });
        this.app.route('/menuregel.php').all(function (req, res, next) { return _this.menuregel.routes(req, res, next); });
        this.app.route('/logon.php').all(function (req, res, next) { return _this.logon.routes(req, res, next); });
        //
        this.app.route('/afdeling.php').all(function (req, res, next) { return _this.afdeling.routes(req, res, next); });
        this.app.route('/uitval.php').all(function (req, res, next) { return _this.uitval.routes(req, res, next); });
        this.app.route('/uitvalsoort.php').all(function (req, res, next) { return _this.uitvalsoort.routes(req, res, next); });
        this.app.route('/product.php').all(function (req, res, next) { return _this.product.routes(req, res, next); });
        this.app.route('/onderdeel.php').all(function (req, res, next) { return _this.onderdeel.routes(req, res, next); });
        this.app.route('/productgroep.php').all(function (req, res, next) { return _this.productgroep.routes(req, res, next); });
        this.app.route('/productlijn.php').all(function (req, res, next) { return _this.productlijn.routes(req, res, next); });
        this.app.route('/lijn.php').all(function (req, res, next) { return _this.lijn.routes(req, res, next); });
        this.app.route('/bewerkingsoort.php').all(function (req, res, next) { return _this.bewerkingsoort.routes(req, res, next); });
        this.app.route('/layout.php').all(function (req, res, next) { return _this.layout.routes(req, res, next); });
        this.app.route('/klant.php').all(function (req, res, next) { return _this.klant.routes(req, res, next); });
        this.app.route('/leverancier.php').all(function (req, res, next) { return _this.leverancier.routes(req, res, next); });
        this.app.route('/afleveradres.php').all(function (req, res, next) { return _this.afleveradres.routes(req, res, next); });
        this.app.route('/contact.php').all(function (req, res, next) { return _this.contact.routes(req, res, next); });
        this.app.route('/plansoort.php').all(function (req, res, next) { return _this.plansoort.routes(req, res, next); });
        //
        this.app.route('/retour.php').all(function (req, res, next) { return _this.retour.routes(req, res, next); });
        this.app.route('/retouractie.php').all(function (req, res, next) { return _this.retouractie.routes(req, res, next); });
        this.app.route('/retouractietype.php').all(function (req, res, next) { return _this.retouractietype.routes(req, res, next); });
        this.app.route('/retourgarantie.php').all(function (req, res, next) { return _this.retourgarantie.routes(req, res, next); });
        this.app.route('/retourgebruiker.php').all(function (req, res, next) { return _this.retourgebruiker.routes(req, res, next); });
        this.app.route('/retourklant.php').all(function (req, res, next) { return _this.retourklant.routes(req, res, next); });
        this.app.route('/retourtermijn.php').all(function (req, res, next) { return _this.retourtermijn.routes(req, res, next); });
        this.app.route('/retourtype.php').all(function (req, res, next) { return _this.retourtype.routes(req, res, next); });
        this.app.route('/retourproduct.php').all(function (req, res, next) { return _this.retourproduct.routes(req, res, next); });
        this.app.route('/retourontvangst.php').all(function (req, res, next) { return _this.retourontvangst.routes(req, res, next); });
        this.app.route('/retourrap.php').all(function (req, res, next) { return _this.retourrap.routes(req, res, next); });
        this.app.route('/retourverzend.php').all(function (req, res, next) { return _this.retourverzend.routes(req, res, next); });
        this.app.route('/retourverzendleverancier.php').all(function (req, res, next) { return _this.retourverzendleverancier.routes(req, res, next); });
        //
        this.app.route('/bestelling.php').all(function (req, res, next) { return _this.bestelling.routes(req, res, next); });
        this.app.route('/bestellingkop.php').all(function (req, res, next) { return _this.bestellingkop.routes(req, res, next); });
        this.app.route('/bestellingkoprap.php').all(function (req, res, next) { return _this.bestellingkoprap.routes(req, res, next); });
        this.app.route('/bestellingproductgroep.php').all(function (req, res, next) { return _this.bestellingproductgroep.routes(req, res, next); });
        this.app.route('/productgroepbestelling.php').all(function (req, res, next) { return _this.productgroepbestelling.routes(req, res, next); });
        this.app.route('/bestellingtelaat.php').all(function (req, res, next) { return _this.bestellingtelaat.routes(req, res, next); });
        this.app.route('/productvraag.php').all(function (req, res, next) { return _this.productvraag.routes(req, res, next); });
        this.app.route('/productvoorraad.php').all(function (req, res, next) { return _this.productvoorraad.routes(req, res, next); });
        this.app.route('/voorraad.php').all(function (req, res, next) { return _this.voorraad.routes(req, res, next); });
        this.app.route('/inkoop.php').all(function (req, res, next) { return _this.inkoop.routes(req, res, next); });
        this.app.route('/logistiek.php').all(function (req, res, next) { return _this.logistiek.routes(req, res, next); });
        this.app.route('/planning.php').all(function (req, res, next) { return _this.planning.routes(req, res, next); });
        this.app.route('/uitlever.php').all(function (req, res, next) { return _this.uitlever.routes(req, res, next); });
        //
        this.app.route('/gebruikertijd.php').all(function (req, res, next) { return _this.gebruikertijd.routes(req, res, next); });
        this.app.route('/gebruikerrap.php').all(function (req, res, next) { return _this.gebruikerrap.routes(req, res, next); });
        this.app.route('/gebruikershift.php').all(function (req, res, next) { return _this.gebruikershift.routes(req, res, next); });
        this.app.route('/calender.php').all(function (req, res, next) { return _this.calender.routes(req, res, next); });
        //
        this.app.route('/bewerking.php').all(function (req, res, next) { return _this.bewerking.routes(req, res, next); });
        this.app.route('/bewerkingflow.php').all(function (req, res, next) { return _this.bewerkingflow.routes(req, res, next); });
        this.app.route('/bewerkingflowbewerk.php').all(function (req, res, next) { return _this.bewerkingflowbewerk.routes(req, res, next); });
        this.app.route('/bewerkingfloweindcontrole.php').all(function (req, res, next) { return _this.bewerkingfloweindcontrole.routes(req, res, next); });
        this.app.route('/bewerkingflowpick.php').all(function (req, res, next) { return _this.bewerkingflowpick.routes(req, res, next); });
        this.app.route('/bewerkingrap.php').all(function (req, res, next) { return _this.bewerkingrap.routes(req, res, next); });
        this.app.route('/bewerkingtijd.php').all(function (req, res, next) { return _this.bewerkingtijd.routes(req, res, next); });
        this.app.route('/bewerkinguitval.php').all(function (req, res, next) { return _this.bewerkinguitval.routes(req, res, next); });
        this.app.route('/bewerkinguitvalrap.php').all(function (req, res, next) { return _this.bewerkinguitvalrap.routes(req, res, next); });
        this.app.route('/bewerkingverschil.php').all(function (req, res, next) { return _this.bewerkingverschil.routes(req, res, next); });
        this.app.route('/productbewerkingrap.php').all(function (req, res, next) { return _this.productbewerkingrap.routes(req, res, next); });
        this.app.route('/productuitvalrap.php').all(function (req, res, next) { return _this.productuitvalrap.routes(req, res, next); });
        //
        this.app.route('*').all(util_1.Util.unknownOperation);
    };
    return Router;
}());
exports.Router = Router;
/*
todo:
mail
ecm
*/
//# sourceMappingURL=router.js.map