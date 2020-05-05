import db from "./db";
import { Request, Response, NextFunction } from "express";
import { Util } from "./util";
import { Logger } from "./logger";
import * as nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer";

export class Mailer {
  host = '';
  from = '';
  port = 25;
  smtptransporter: any = {};
  gmailtransporter: any = {}
  constructor() {
    //
    Logger.info("Creating Mailer");
    //
    this.init();
  }

  async init(): Promise<void> {
    return new Promise(async (resolve, reject) => {
      let connection = await db.waitConnection();
      let sql = `
select INHOUD 
from PARAM
where NAAM = 'BBSMTP'`;
      let rows = await db.waitQuerySilent(connection, sql);
      if (rows[0]) {
        this.host = rows[0].INHOUD;
      }
      //
      sql = `
select INHOUD 
from PARAM
where NAAM = 'BBADMIN'`;
      rows = await db.waitQuerySilent(connection, sql);
      if (rows[0]) {
        this.from = rows[0].INHOUD;
      }
      //
      connection.release();
      //
      this.smtptransporter = nodemailer.createTransport({
        host: this.host,
        port: this.port,
      });
      this.gmailtransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'antoon.kragten@gmail.com',
          pass: 'AK2PS_aug12'
        }
      });
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
      // TODO
      //
      let transporter = this.gmailtransporter;
      //
      transporter.sendMail(options, function (error: any, info: any) {
        if (error) {
          Logger.error(<Request><unknown>undefined,error);
          resolve(false);
        } else {
          Logger.test('Email sent: ' + info.response);
          resolve(true);
        }
      });
    })
  }

}

