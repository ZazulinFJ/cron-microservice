import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import * as mongoose from 'mongoose';

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`${configService.get('RABBITMQ_CRON_URL')}`],
      queue: `${configService.get('RABBITMQ_CRON_NAME')}`,
      queueOptions: {
        durable: false,
      },
      prefetchCount: 50,
    },
  });
  await mongoose.connect(configService.get('MONGOOSE_URI'));
  await app.listen();
  console.log();
}
bootstrap();
