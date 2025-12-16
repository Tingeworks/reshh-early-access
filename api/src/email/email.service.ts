import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './email.entity';
import { EmailSenderService } from './email-sender.service';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
    private emailSenderService: EmailSenderService,
  ) { }

  async saveEmail(email: string): Promise<Email> {
    try {
      const emailEntity = this.emailRepository.create({ email });
      const savedEmail = await this.emailRepository.save(emailEntity);

      // Send welcome email asynchronously (don't wait for it)
      this.emailSenderService.sendWelcomeEmail(email).catch((error) => {
        // Log error but don't fail the signup
        console.error('Failed to send welcome email:', error);
      });

      return savedEmail;
    } catch (error) {
      if (error.code === '23505') {
        // PostgreSQL unique constraint violation
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(): Promise<Email[]> {
    return this.emailRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
}

