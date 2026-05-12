import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';

export interface SendMailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}
@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure =
      process.env.SMTP_SECURE === 'true' || smtpPort === 465 || false;

    if (smtpUser && smtpPass) {
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
      return;
    }

    // Dev fallback: keep app running even when SMTP env is not configured.
    this.transporter = nodemailer.createTransport({
      jsonTransport: true,
    });
  }

  async sendMail(options: SendMailOptions): Promise<void> {
    const mailOptions = {
      from:
        process.env.MAIL_FROM ||
        process.env.SMTP_USER ||
        'no-reply@phoneshop.local',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };
    await this.transporter.sendMail(mailOptions);
  }
}
