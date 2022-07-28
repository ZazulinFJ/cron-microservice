import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { MongoWrapperModule } from '../mongo-wrapper/mongo-wrapper.module';

@Module({
  imports: [MongoWrapperModule],
  controllers: [ProcessController],
  providers: [ProcessService],
})
export class ProcessModule {}
