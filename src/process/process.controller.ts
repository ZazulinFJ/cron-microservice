import { EventPattern } from '@nestjs/microservices';
import { ProcessService } from './process.service';
import { Controller } from '@nestjs/common';
import { randomUUID } from 'crypto';
@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) {}

  @EventPattern('checkProcess')
  async checkProcess(process) {
    try {
      const rand = randomUUID();
      console.log(rand);
      return await this.processService.addJob(rand, process);
    } catch (e) {
      console.log(e);
    }
  }

  @EventPattern('test')
  async test(filter) {
    console.log(filter);
  }
}
