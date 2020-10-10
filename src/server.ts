import { Config } from "./config";
import express, { Application } from 'express';
import { Router } from './router';
import bodyParser from 'body-parser';
import cors from 'cors';

import db from "./db";
import { Logger } from "./logger";
import { Frontware } from './frontware';

import fileUpload from 'express-fileUpload';

class App {
    public app: Application;
    public router: Router;
    private config: Config;

    constructor() {
        this.app = express();
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(cors());
        this.app.use(fileUpload());
        //
        // Ak2
        //
        this.config = new Config();
        db.start();
        Logger.reset();
        this.app.use(Frontware.frontware)
        this.router = new Router(this.app);
        //
        let server = this.app.listen(Config.serverPort, () => {
            Logger.info(`Ak2 is listening for ${Config.appUrl} on port ${Config.serverPort} ...`);
            process.title = `Ak2: ${Config.appUrl}, ${Config.serverPort}`;
        });
        server.setTimeout(3600000);
    }
}

//
// start
//
new App();

