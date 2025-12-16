import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class EmailSenderService {
  private readonly logger = new Logger(EmailSenderService.name);
  private transporter: nodemailer.Transporter;
  private emailHtml: string;
  private emailText: string;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST', 'smtp.zoho.com'),
      port: this.configService.get<number>('SMTP_PORT', 587),
      secure: false, // true for 465, false for other ports
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASSWORD'),
      },
    });

    // Load email templates
    try {
      const emailPath = join(__dirname, '..', '..', 'public', 'email');
      this.emailHtml = readFileSync(join(emailPath, 'email.html'), 'utf-8');
      this.emailText = readFileSync(join(emailPath, 'email.txt'), 'utf-8');
    } catch (error) {
      this.logger.warn('Failed to load email templates, using fallback', error);
      this.emailHtml = '<p>Thank you for joining Reshh!</p>';
      this.emailText = 'Thank you for joining Reshh!';
    }
  }

  async sendWelcomeEmail(to: string): Promise<void> {
    try {
      const smtpUser = this.configService.get<string>('SMTP_USER') || '';
      const fromEmail = this.configService.get<string>('SMTP_FROM', smtpUser);

      // Read the image file
      const imagePath = join(__dirname, '..', '..', 'public', 'email', 'images', '4bade19a9fff8670da15d6121d6dda06.png');
      const imageBuffer = readFileSync(imagePath);

      // Replace image references with CID for inline attachment
      let htmlWithCid = this.emailHtml
        .replace(/href="images\/4bade19a9fff8670da15d6121d6dda06\.png"/g, 'href="cid:email-image"')
        .replace(/src="images\/4bade19a9fff8670da15d6121d6dda06\.png"/g, 'src="cid:email-image"');

      await this.transporter.sendMail({
        from: `Reshh <${fromEmail}>`,
        to,
        subject: 'Welcome to Reshh Early Access',
        html: htmlWithCid,
        text: this.emailText,
        attachments: [
          {
            filename: '4bade19a9fff8670da15d6121d6dda06.png',
            cid: 'email-image',
            content: imageBuffer,
          },
        ],
      });

      this.logger.log(`Welcome email sent to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}:`, error);
      // Don't throw - we don't want email failures to break the signup
    }
  }
}

