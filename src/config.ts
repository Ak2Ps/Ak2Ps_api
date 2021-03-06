import * as fs from "fs";
import { Logger } from "./logger";
import mysql, { PoolConnection } from "mysql";
declare global {
  namespace Express {
    //
    // worden gezet in middleware
    //
    export interface Request {
      ak2_app: string;
      ak2_user: string;
      ak2_token: string;
    }
    export interface Response {
      crudConnection: mysql.PoolConnection;
      crudResult: {
        success: boolean;
        messages: Array<{
          field: string;
          message: string;
        }>;
      };
      crudData: any;
    }
  }
}

declare global {
  export const enum runmode {
    production = "production",
    test = "test"
  }
}

declare global {
  export interface Dict {
    table: string;
    //
    // typisch sb:
    //
    autoKey?: {
      body: string;
      sql: string;
    };
    mandant?: {
      body: string;
      sql: string;
    };
    //
    key: Array<{
      body: string;
      sql: string;
      sqlCheck?: string;
    }>;
    altKeys?: Array<
      Array<{
        body: string;
        sql: string;
        sqlCheck?: string;
      }>
    >;
    foreignKeys?: Array<{
      key: Array<{
        body: string;
        sql: string;
        sqlCheck?: string;
      }>;
    }>;
    select?: {
      orderby?: string;
      where?: Array<{
        query?: string;
        body?: string;
        sql: string;
      }>;
      fields: Array<{
        row: string;
        sql: string;
      }>;
    };
    query?: {
      orderby?: string;
      where?: Array<{
        query: string;
        sql: string;
      }>;
      fields?: Array<{
        row: string;
        sql: string;
      }>;
    };
    update?: {
      fields?: Array<{
        body: string;
        sql: string;
        required?: boolean;
        maxLength?: number;
        minValue?: number;
        maxValue?: number;
        default?: string;
      }>;
    };
  }
}

export class Config {
  //
  private static ConfigFile: string;
  //
  public static app: string;
  public static appnaam: string;
  //
  public static server: string;
  public static serverPort: number;
  public static appUrl: string;
  public static appDir: string;
  public static runmode: runmode;
  public static show_error: boolean;
  public static show_warning: boolean;
  public static show_info: boolean;
  public static show_sql: boolean;
  public static scheduleinterval: number;
  public static backuptime: string;
  public static exacttime: string;
  //
  public static ecmserver: string;
  public static ecmport: number;
  public static ecmpath: string;
  public static bestellingendir: string;
  public static retourendir: string;
  //
  public static dbhost: string;
  public static dbport: number;
  public static dbuser: string;
  public static dbpassword: string;
  public static dbschema: string;
  //
  public static bbadmin: string;
  public static bbmod: string;
  public static bbsmtp: string;
  public static bbgmailuser: string;
  public static bbgmailpassword: string;
  //
  public static exactinterfaceapp: string;
  public static exactclientid: string;
  public static exactclientsecret: string;
  public static urlRedirect: string;
  public static exactdivision: string;
  public static exactdir: string;
  //
  public static loadConfig(): any {
    let buffer: Buffer;
    let json: any = {};
    try {
      buffer = fs.readFileSync(this.ConfigFile);
      json = JSON.parse(String(buffer));
    } catch (error) {
      json = {};
    }
    return json;
  }

  public static saveConfig() {
    let json = {
      //
      app: Config.app,
      appnaam: Config.appnaam,
      //
      server: Config.server,
      serverPort: Config.serverPort,
      appUrl: Config.appUrl,
      appDir: Config.appDir,
      runmode: Config.runmode,
      show_error: Config.show_error,
      show_warning: Config.show_warning,
      show_info: Config.show_info,
      show_sql: Config.show_sql,
      scheduleinterval: Config.scheduleinterval,
      //
      ecmserver: Config.ecmserver,
      ecmport: Config.ecmport,
      ecmpath: Config.ecmpath,
      bestellingendir: Config.bestellingendir,
      retourendir: Config.retourendir,
      //
      dbhost: Config.dbhost,
      dbport: Config.dbport,
      dbuser: Config.dbuser,
      dbpassword: Config.dbpassword,
      dbschema: Config.dbschema,
      //
      bbadmin: Config.bbadmin,
      bbmod: Config.bbmod,
      bbstmtp: Config.bbsmtp,
      bbgmailuser: Config.bbgmailuser,
      bbgmailpassword: Config.bbgmailpassword,
      //
      exactinterfaceapp: Config.exactinterfaceapp,
      exactdir: Config.exactdir,
      //
      backuptime: Config.backuptime,
      exacttime: Config.exacttime,
    };
    try {
      fs.writeFileSync(this.ConfigFile, JSON.stringify(json, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  constructor() {
    //
    let json: any = {};
    //
    if (process.argv[2] == "--inspect") {
      Config.appnaam = process.argv[4] || 'Tas';
    } else {
      Config.appnaam = process.argv[2] || 'Tas';
    }
    if (Config.appnaam.toLowerCase() == "controls") {
      Config.ConfigFile = 'C:/Ak2Ps/Ak2Ps_server/CONTROLS/api.json';
      Config.app = 'C';
    } else {
      Config.ConfigFile = 'C:/Ak2Ps/Ak2Ps_server/TAS/api.json';
      Config.app = 'T';
    }
    //
    json = Config.loadConfig();
    //
    // defaults
    //
    if (Config.app == "C") {
      //
      Config.appnaam = "Controls";
      //
      Config.server = "localhost";
      Config.serverPort = 9002;
      Config.runmode = runmode.test;
      Config.show_error = true;
      Config.show_warning = true;
      Config.show_info = true;
      Config.show_sql = false;
      Config.scheduleinterval = 60;
      Config.backuptime = "01:30";
      Config.exacttime = "01:50";
      //
      Config.ecmserver = "192.168.43.14";
      Config.ecmport = 8080;
      Config.ecmpath = "/ecm/CreateBatch.php";
      Config.bestellingendir = "f:/data/ak2/bestellingen/sensors";
      Config.retourendir = "f:/data/ak2/retouren";
      Config.appUrl = "/Ak2/CONTROLS";
      Config.appDir = "C:/Ak2Ps/Ak2Ps_server/CONTROLS";
      //
      Config.dbhost = "localhost";
      Config.dbport = 3306;
      Config.dbuser = "controlsdata";
      Config.dbpassword = "antoon_ak2";
      Config.dbschema = "controlsdata";
      //
      Config.bbadmin = "ak2@tasseron.nl";
      Config.bbmod = "tkragten@tasseron.nl";
      Config.bbsmtp = "192.168.43.7";
      Config.bbgmailuser = '';
      Config.bbgmailpassword = '';
      //
      Config.exactinterfaceapp = "nodeapi2tasseron";
      Config.exactdivision = "1751534";
      Config.exactdir = "/Ak2Ps/Ak2Ps_server/ak2nl/exacttasseron";
      //
    } else {
      //
      Config.appnaam = "Sensors";
      //
      Config.server = "localhost";
      Config.serverPort = 9001;
      Config.runmode = runmode.test;
      Config.show_error = true;
      Config.show_warning = true;
      Config.show_info = true;
      Config.show_sql = false;
      Config.scheduleinterval = 60;
      Config.backuptime = "00:30";
      Config.exacttime = "00:50";
      //
      Config.ecmserver = "192.168.43.14";
      Config.ecmport = 8080;
      Config.ecmpath = "/ecm/CreateBatch.php";
      //
      // settings tbv test
      //
      // Config.ecmserver = "localhost";
      // Config.ecmport = 9001;
      // Config.ecmpath = "/ecmtester.php";
      //
      Config.bestellingendir = "f:/data/ak2/bestellingen/sensors";
      Config.retourendir = "f:/data/ak2/retouren";
      Config.appUrl = "/Ak2/TAS";
      Config.appDir = "C:/Ak2Ps/Ak2Ps_server/TAS";
      //
      Config.dbhost = "localhost";
      Config.dbport = 3306;
      Config.dbuser = "ak2";
      Config.dbpassword = "antoon_ak2";
      Config.dbschema = "ak2";
      //
      Config.bbadmin = "ak2@tasseron.nl";
      Config.bbmod = "tkragten@tasseron.nl";
      Config.bbsmtp = "192.168.43.7";
      Config.bbgmailuser = '';
      Config.bbgmailpassword = '';
      //
      Config.exactinterfaceapp = "nodeapi2tasseron";
      Config.exactdivision = "1665922";
      Config.exactdir = "/Ak2Ps/Ak2Ps_server/ak2nl/exacttasseron";
      //
    }
    //
    Config.appnaam = json.appnaam || Config.appnaam;
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
    Config.scheduleinterval = json.scheduleinterval || Config.scheduleinterval;
    Config.backuptime = json.backuptime || Config.backuptime;
    Config.exacttime = json.exacttime || Config.exacttime;
    //
    Config.ecmserver = json.ecmserver || Config.ecmserver;
    Config.ecmport = json.ecmport || Config.ecmport;
    Config.ecmpath = json.ecmpath || Config.ecmpath;
    Config.bestellingendir = json.bestellingendir || Config.bestellingendir;
    Config.retourendir = json.retourendir || Config.retourendir;
    //
    Config.dbhost = json.dbhost || Config.dbhost;
    if (json.dbport) {
      Config.dbport = Number(json.dbport);
    } else {
      Config.dbport = Config.dbport;
    }
    Config.dbuser = json.dbuser || Config.dbuser;
    Config.dbpassword = json.dbpassword || Config.dbpassword;
    Config.dbschema = json.dbschema || Config.dbschema;
    //
    Config.bbadmin = json.bbadmin || Config.bbadmin;
    Config.bbmod = json.bbmod || Config.bbmod;
    Config.bbsmtp = json.bbsmtp || Config.bbsmtp;
    Config.bbgmailuser = json.bbgmailuser || Config.bbgmailuser;
    Config.bbgmailpassword = json.bbgmailpassword || Config.bbgmailpassword;
    //
    Config.exactdir = json.exactdir || Config.exactdir;
    //
    // exact interface naar localhost 9001
    //
    Config.exactinterfaceapp = json.exactinterfaceapp || Config.exactinterfaceapp;
    if (Config.exactinterfaceapp == "nodeapi2local") {
      //
      // exact interface naar localhost
      //
      Config.exactclientid = '{be855cb4-9f01-4c2a-809f-653750f7c679}';
      Config.exactclientsecret = 'zFD7wP3aNvZE';
      Config.urlRedirect = `http://localhost:9001/setcode.php`;
    } else if (Config.exactinterfaceapp == "nodeapi2tasseron") {
      //
      // exact interface naar 192.168.43.43
      //
      // Test NodeApiTasseron
      Config.exactclientid = '{d7cc6408-fb9b-44d6-9034-817f07dcdb27}';
      Config.exactclientsecret = '516VytgFDnj2';
      // productie ImportNaarTasseron
      // Config.exactclientid = '{d2792cd4-b1af-4e95-92b4-afc560741d8d}';
      // Config.exactclientsecret = 'tLrwvCG81Dqe';
      Config.urlRedirect = `http://192.168.43.43:9001/setcode.php`;
    }
    //
    Config.saveConfig();
    //
    Logger.info(`Setting Config for ${Config.appnaam}...`);
    //
  }
}
