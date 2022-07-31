import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common';
import { Step } from './entities/step.entity';

@Injectable()
export class StepsService extends BaseService<Step> {
  constructor(
    @InjectRepository(Step)
    repository: Repository<Step>,
  ) {
    super(repository);
  }
}
