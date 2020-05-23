import db from "./db";
import { Request, Response, NextFunction } from "express";
import { Logger } from "./logger";
import * as nodemailer from 'nodemailer'
import { Config } from "./config";

export class Mailer {
  host = '';
  from = '';
  port = 25;
  transporter: any = {};
  constructor() {
    //
    Logger.info("Creating Mailer");
    //
    this.init();
  }

  async init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let connection = await db.waitConnection();
      this.host = Config.bbsmtp;
      this.from = Config.bbadmin;
      //
      connection.release();
      //
      if ((Config.bbgmailuser || '') != '') {
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: Config.bbgmailuser,
            pass: Config.bbgmailpassword
          }
        });
        } else {
        this.transporter = nodemailer.createTransport({
          host: this.host,
          port: this.port,
        });
      }
      resolve();
    });
  }

  public send(to: string, subject: string, html: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      let options: nodemailer.SendMailOptions = {
        from: this.from,
        to: to,
        subject: subject,
        html: html
      }
      //
      let transporter = this.transporter;
      transporter.sendMail(options, function (error: any, info: any) {
        if (error) {
          Logger.error(<Request><unknown>undefined, error);
          resolve(false);
        } else {
          Logger.info('Email sent: ' + info.response);
          resolve(true);
        }
      });
    })
  }

}

