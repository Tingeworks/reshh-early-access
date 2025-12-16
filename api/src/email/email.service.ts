import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './email.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {}

  async saveEmail(email: string): Promise<Email> {
    try {
      const emailEntity = this.emailRepository.create({ email });
      return await this.emailRepository.save(emailEntity);
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

