import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT || '5432'),
      username: process.env.DATABASE_USER || 'indb',
      password: process.env.DATABASE_PASSWORD || 'indb',
      database: process.env.DATABASE_NAME || 'indb',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || process.env.NODE_ENV !== 'production',
    }),
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
