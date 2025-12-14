import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

interface MailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  from?: string;
}

@Injectable()
export class MailService {
  private readonly transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('smtp.host'),
      port: this.configService.get<number>('smtp.port'),
      secure: this.configService.get<boolean>('smtp.secure'),
      auth: {
        user: this.configService.get<string>('smtp.user'),
        pass: this.configService.get<string>('smtp.pass'),
      },
    });
  }

  async sendMail(options: MailOptions) {
    const fromEmail = options.from || this.getDefaultFrom();

    try {
      await this.transporter.sendMail({
        from: fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });
    } catch (error: any) {
      this.logger.error(`Failed to send email to ${options.to}: ${error?.message}`);
      throw error;
    }
  }

  async sendOtpEmail(to: string, code: string) {
    const subject = 'Your Brighten Bangladesh verification code';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Verify your email</h2>
        <p>Use the code below to complete your registration:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
        <p>This code expires in 10 minutes.</p>
        <p>If you did not request this code, you can safely ignore this email.</p>
      </div>
    `;

    await this.sendMail({ to, subject, html, text: `Your verification code is ${code}` });
  }

  async sendApprovalEmail(to: string, name?: string) {
    const subject = 'Your Brighten Bangladesh membership is approved';
    const greeting = name ? `Hi ${name},` : 'Hello,';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <p>${greeting}</p>
        <p>Your membership application has been approved. You can now sign in and access your account.</p>
        <p>Thank you for being part of Brighten Bangladesh!</p>
      </div>
    `;

    await this.sendMail({ to, subject, html, text: 'Your membership application has been approved.' });
  }

  async sendPasswordResetEmail(to: string, code: string) {
    const subject = 'Reset your Brighten Bangladesh password';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Password reset request</h2>
        <p>Use this code to reset your password:</p>
        <p style="font-size: 24px; font-weight: bold; letter-spacing: 4px;">${code}</p>
        <p>This code expires in 10 minutes.</p>
        <p>If you did not request a reset, you can ignore this email.</p>
      </div>
    `;

    await this.sendMail({ to, subject, html, text: `Your password reset code is ${code}` });
  }

  async sendBlogApprovedEmail(to: string, name: string | undefined, title: string, link: string) {
    const subject = 'Your blog has been approved!';
    const greeting = name ? `Hi ${name},` : 'Hello,';
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto;">
        <p>${greeting}</p>
        <p>Your blog post <strong>${title}</strong> has been approved.</p>
        <p>You can review it here:</p>
        <p><a href="${link}" style="color: #0d9488;">${link}</a></p>
        <p>Thank you for contributing to Brighten Bangladesh!</p>
      </div>
    `;

    await this.sendMail({ to, subject, html, text: `Your blog "${title}" is approved. View: ${link}` });
  }

  private getDefaultFrom() {
    const fromName = this.configService.get<string>('smtp.fromName');
    const fromEmail = this.configService.get<string>('smtp.fromEmail') || this.configService.get<string>('smtp.user');
    return fromName ? `${fromName} <${fromEmail}>` : fromEmail;
  }
}
