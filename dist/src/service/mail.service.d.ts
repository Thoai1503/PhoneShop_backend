export interface SendMailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
export declare class MailService {
    private transporter;
    constructor();
    sendMail(options: SendMailOptions): Promise<void>;
}
