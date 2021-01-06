import { Request, Response, NextFunction } from "express";
import { Config } from "./config";
import { Logger } from './logger';

export class Frontware {
  public static frontware(req: Request, res: Response, next: Function): void {
    req.ak2_app = String(req.query.app);
    delete req.query.callnr;
    req.ak2_token = String(req.query.token);
    delete req.query.token;
    req.ak2_user = String(req.query.user);
    delete req.query.user;
    //
    res.crudResult = {success: true,messages: []};
    //
    if (req.path.indexOf("/handtekening/")==0){

    } else if (req.path.indexOf("/favicon.ico")==0){

    } else if (req.path.indexOf("/pdf/")==0){
      
    } else if (req.path.endsWith(".pdf")==true){
        res.sendFile(`${req.path.substr(1)}`);
        return;
        
    } else if (req.path.indexOf("/ecmtester")==0){

    } else if (req.path.indexOf("/setcode")==0){

    } else if (req.path.indexOf("/getcode")==0){

    } else if (req.path.indexOf("/status")==0){

    } else {
      if (req.ak2_app != Config.app) {
        res.status(401).send("Unauthorized");
        return;
      }
    }
    next();
  }
}
