import { CronJob } from 'cron';
import { ProcessEntity } from './entity/process.entity';
import { DBFactory } from '../mongo-wrapper/mongo-wrapper.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Logger } from '@nestjs/common';

export class ProcessService {
  private schedulerRegistry = new SchedulerRegistry();

  private readonly logger = new Logger();

  async addJob(name, process) {
    const processModel = DBFactory.getModel('Process', ProcessEntity);
    const job = new CronJob(`* * * * * *`, async () => {
      const proc = await processModel.findOne({ _id: process._id });
      if (
        proc.total ===
          proc.unvalid + proc.duplicate + proc.updated + proc.created &&
        proc.endIn === null
      ) {
        await processModel.updateOne(
          { _id: proc._id },
          { status: 'end', endIn: new Date() },
        );
        job.stop();
      }
    });
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
    this.logger.log('началось', name);
    return 'крон пошел';
  }
}
