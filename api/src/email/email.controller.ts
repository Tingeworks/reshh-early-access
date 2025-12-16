import { Controller, Post, Body, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { Email } from './email.entity';

@Controller('early')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  async saveEmail(@Body() body: { email: string }): Promise<{ success: boolean; message: string }> {
    await this.emailService.saveEmail(body.email);
    return { success: true, message: 'Email saved successfully' };
  }

  @Get()
  async getAllEmails(): Promise<Email[]> {
    return this.emailService.findAll();
  }
}

