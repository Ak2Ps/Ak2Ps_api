"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var logger_1 = require("./logger");
var Config = /** @class */ (function () {
    function Config() {
        //
        var thisApp = process.argv[2] || 'Tas';
        var json = {};
        //
        if (thisApp.toLowerCase() == "controls") {
            Config.ConfigFile = 'C:/Ak2Ps/Ak2Ps_server/CONTROLS/nodeapi.json';
            Config.app = 'C';
        }
        else if (thisApp.toLowerCase() == "ak2ps") {
            Config.ConfigFile = 'C:/Ak2Ps/Ak2Ps_server/AK2PS/nodeapi.json';
            Config.app = 'A';
        }
        else {
            Config.ConfigFile = 'C:/Ak2Ps/Ak2Ps_server/TAS/nodeapi.json';
            Config.app = 'T';
        }
        //
        json = Config.loadConfig();
        //
        // defaults
        //
        if (Config.app == "C") {
            //
            Config.server = "localhost";
            Config.serverPort = 9002;
            Config.runmode = "test" /* test */;
            Config.show_error = true;
            Config.show_warning = true;
            Config.show_info = true;
            Config.show_sql = false;
            //
            Config.ecmserver = "192.168.43.14";
            Config.ecmport = 8080;
            Config.ecmpath = "/ecm/CreateBatch.php";
            Config.ecmpath = "/ecm/CreateBatch.php";
            Config.bestellingendir = "f:/data/ak2/bestellingen/sensors";
            Config.retourendir = "f:/data/ak2/retouren";
            Config.appUrl = "/Ak2/CONTROLS";
            Config.appDir = "C:/Ak2Ps/Ak2Ps_server/CONTROLS";
            //
            Config.dbhost = "localhost";
            Config.dbuser = "controlsdata";
            Config.dbpassword = "antoon_ak2";
            Config.dbschema = "controlsdata";
            //
            Config.exactinterfaceapp = "nodeapi2tasseron";
            Config.exactdivision = "1751534";
            Config.exactdir = "/Ak2Ps/Ak2Ps_server/Exact";
            //
            Config.bbsmtp = "192.168.43.7";
            //
        }
        else if (Config.app == "A") {
            //
            Config.server = "localhost";
            Config.serverPort = 9003;
            Config.runmode = "test" /* test */;
            Config.show_error = true;
            Config.show_warning = true;
            Config.show_info = true;
            Config.show_sql = false;
            //
            Config.ecmserver = "localhost";
            Config.ecmport = 8080;
            Config.ecmpath = "/ecm/CreateBatch.php";
            Config.ecmpath = "/ecm/CreateBatch.php";
            Config.bestellingendir = "C:/Ak2Ps/Ak2Ps_server/AK2PS/bestellingen/sensors";
            Config.retourendir = "C:/Ak2Ps/Ak2Ps_server/AK2PS/retouren";
            Config.appUrl = "/Ak2/AK2PS";
            Config.appDir = "C:/Ak2Ps/Ak2Ps_server/AK2PS";
            //
            Config.dbhost = "localhost";
            Config.dbuser = "ak2psdata";
            Config.dbpassword = "antoon_ak2";
            Config.dbschema = "ak2psdata";
            //
            Config.exactinterfaceapp = "nodeapi2local";
            Config.exactdivision = "1716286";
            Config.exactdir = "/Ak2Ps/Ak2Ps_server/TAS/Exact";
            //
            Config.bbsmtp = "localhost";
            //
        }
        else {
            //
            Config.server = "localhost";
            Config.serverPort = 9001;
            Config.runmode = "test" /* test */;
            Config.show_error = true;
            Config.show_warning = true;
            Config.show_info = true;
            Config.show_sql = false;
            //
            Config.ecmserver = "192.168.43.14";
            Config.ecmport = 8080;
            Config.ecmpath = "/ecm/CreateBatch.php";
            Config.ecmpath = "/ecm/CreateBatch.php";
            Config.bestellingendir = "f:/data/ak2/bestellingen/sensors";
            Config.retourendir = "f:/data/ak2/retouren";
            Config.appUrl = "/Ak2/TAS";
            Config.appDir = "C:/Ak2Ps/Ak2Ps_server/TAS";
            //
            Config.dbhost = "localhost";
            Config.dbuser = "ak2";
            Config.dbpassword = "antoon_ak2";
            Config.dbschema = "ak2";
            //
            Config.exactinterfaceapp = "nodeapi2tasseron";
            Config.exactdivision = "1665922";
            Config.exactdir = "/Ak2Ps/Ak2Ps_server/Exact";
            //
            Config.bbsmtp = "192.168.43.7";
            //
        }
        //
        Config.appUrl = json.appUrl || Config.appUrl;
        Config.appDir = json.appDir || Config.appDir;
        //
        Config.server = json.server || Config.server;
        Config.serverPort = json.serverPort || Config.serverPort;
        Config.runmode = json.runmode || Config.runmode;
        Config.show_error = json.show_error || Config.show_error;
        Config.show_warning = json.show_warning || Config.show_warning;
        Config.show_info = json.show_info || Config.show_info;
        Config.show_sql = json.show_sql || Config.show_sql;
        //
        Config.ecmserver = json.ecmserver || Config.ecmserver;
        Config.ecmport = json.ecmport || Config.ecmport;
        Config.ecmpath = json.ecmpath || Config.ecmpath;
        Config.bestellingendir = json.bestellingendir || Config.bestellingendir;
        Config.retourendir = json.retourendir || Config.retourendir;
        //
        Config.dbhost = json.dbhost || Config.dbhost;
        Config.dbuser = json.dbuser || Config.dbuser;
        Config.dbpassword = json.dbpassword || Config.dbpassword;
        Config.dbschema = json.dbschema || Config.dbschema;
        //
        // Config.exactinterfaceapp = json.exactinterfaceapp || Config.exactinterfaceapp;
        // Config.exactdivision = json.exactdivision || Config.exactdivision;
        // Config.exactclientid = json.exactclientid || Config.exactclientid;
        // Config.exactclientsecret = json.exactclientsecret || Config.exactclientsecret;
        // Config.urlRedirect = json.urlRedirect || Config.urlRedirect;
        // Config.gatePort = json.gatePort || Config.gatePort;
        //
        Config.exactdir = json.exactdir || Config.exactdir;
        //
        Config.bbsmtp = json.bbsmtp;
        //
        // exact interface naar localhost 9001
        //
        Config.exactclientid = '{be855cb4-9f01-4c2a-809f-653750f7c679}';
        Config.exactclientsecret = 'zFD7wP3aNvZE';
        Config.urlRedirect = "http://localhost:9001/setcode.php";
        if (Config.exactinterfaceapp == "nodeapi2tasseron") {
            //
            // exact interface naar 192.168.43.43
            //
            Config.exactclientid = '{d7cc6408-fb9b-44d6-9034-817f07dcdb27}';
            Config.exactclientsecret = '516VytgFDnj2';
            Config.urlRedirect = "http://192.168.43.43/:9001/setcode.php";
        }
        //
        Config.saveConfig();
        //
        logger_1.Logger.info("Setting Config for " + thisApp + "...");
        //
    }
    //
    Config.loadConfig = function () {
        var buffer;
        var json = {};
        try {
            buffer = fs.readFileSync(this.ConfigFile);
            json = JSON.parse(String(buffer));
        }
        catch (error) {
            json = {};
        }
        return json;
    };
    Config.saveConfig = function () {
        var json = {
            appUrl: Config.appUrl,
            appDir: Config.appDir,
            //
            server: Config.server,
            serverPort: Config.serverPort,
            runmode: Config.runmode,
            show_error: Config.show_error,
            show_warning: Config.show_warning,
            show_info: Config.show_info,
            show_sql: Config.show_sql,
            //
            ecmserver: Config.ecmserver,
            ecmport: Config.ecmport,
            ecmpath: Config.ecmpath,
            bestellingendir: Config.bestellingendir,
            retourendir: Config.retourendir,
            //
            dbhost: Config.dbhost,
            dbuser: Config.dbuser,
            dbpassword: Config.dbpassword,
            dbschema: Config.dbschema,
            //
            exactinterfaceapp: Config.exactinterfaceapp,
            exactdir: Config.exactdir,
            //
            bbsmtp: Config.bbsmtp,
        };
        try {
            fs.writeFileSync(this.ConfigFile, JSON.stringify(json, null, 2));
        }
        catch (error) {
            console.log(error);
        }
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map