import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoWrapperModule } from './mongo-wrapper/mongo-wrapper.module';
import { ConfigModule } from '@nestjs/config';
import { ProcessModule } from './process/process.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongoWrapperModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ProcessModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
