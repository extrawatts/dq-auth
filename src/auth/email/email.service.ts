import { Inject, Injectable } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

@Injectable()
export class EmailService {
  protected mailProvider: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor(@Inject() private config: ConfigService) {
    this.mailProvider = nodemailer.createTransport({
      host: config.get('EMAIL_HOST'),
      port: config.get('EMAIL_PORT'),
      secure: true,
      auth: {
        pass: config.get('EMAIL_PASSWORD'),
        user: config.get('EMAIL_USER'),
      },
    });
  }

  getMailProvider(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
    return this.mailProvider;
  }

  sendSuperTokensEmail(
    url: string,
    userInputCode: string,
    codeLifetimeMs: number,
    email: string,
  ): Promise<any> {
    return this.mailProvider.sendMail({
      from: this.config.get('EMAIL_USER'),
      to: email,
      subject: 'DreamQuest Passwordless Login',
      text: `${url}
      Valid for ${codeLifetimeMs / 1000} seconds.
      Your Input code: ${userInputCode}`,
    });
  }
}
