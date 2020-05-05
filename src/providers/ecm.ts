import { Request, Response, NextFunction } from "express";
import http from "http";
import { Util } from "../util";
import { Logger } from "../logger";
import { Config } from "../config";
import { parseString } from "xml2js"

export class Ecm {

  public static async waitEcm(req: Request, res: Response, next: NextFunction, options?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let result:any = false;
      let body = JSON.stringify(req.body);
      let thisHost = Config.ecmserver;
      let thisPath = Config.ecmpath;
      let data: any;
      let thisParams =
        "?app="+ Config.app
        + "&Product=" + encodeURIComponent(options.Product)
        + "&Size=" + options.Size
        + "&Date=" + options.Date
        + "&Bewerking=" + options.Bewerking;

      // dit moet een xml-response zijn
      //<?xml version="1.0" encoding="UTF-8" ..
      //<Batch>
      //<Number> </Number>
      //<ErrorCode></ErrorCode>
      //<ErrorDescription> </ErrorDesciption>
      //</Batch>

      let thisEcmRequest: http.ClientRequest = http.request(
        {
          host: thisHost,
          path: thisPath + thisParams,
          port: Config.ecmport,
          method: "GET"
        },
        (request) => {
          let responseString = "";
          request.on("data", function (data) {
            Logger.test(data);
            responseString += data;
          });
          request.on("end", function () {
            parseString(responseString,(err,xml)=>{
              if (err){
                Logger.error(req,JSON.stringify(err));
                resolve(result);
              } else {
                Logger.test(xml);
                result = {};
                result.Number = xml.Batch.Number[0];
                result.ErrorCode = xml.Batch.ErrorCode[0];
                result.ErrorDescription = xml.Batch.ErrorDescription[0];
                resolve(result);
              }
            })
          });
        }
      );
      thisEcmRequest.on("error", function (data) {
        Logger.error(req,JSON.stringify(data));
        resolve(false);
      });
      thisEcmRequest.end();
    });
  }

}
