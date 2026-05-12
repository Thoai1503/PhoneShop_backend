var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
let MailService = class MailService {
    transporter;
    constructor() {
        const smtpHost = process.env.SMTP_HOST;
        const smtpPort = Number(process.env.SMTP_PORT || 587);
        const smtpUser = process.env.SMTP_USER;
        const smtpPass = process.env.SMTP_PASS;
        const smtpSecure = process.env.SMTP_SECURE === 'true' || smtpPort === 465 || false;
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
        this.transporter = nodemailer.createTransport({
            jsonTransport: true,
        });
    }
    async sendMail(options) {
        const mailOptions = {
            from: process.env.MAIL_FROM ||
                process.env.SMTP_USER ||
                'no-reply@phoneshop.local',
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };
        await this.transporter.sendMail(mailOptions);
    }
};
MailService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [])
], MailService);
export { MailService };
//# sourceMappingURL=mail.service.js.map