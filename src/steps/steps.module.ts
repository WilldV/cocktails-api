import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { StepsService } from './steps.service';

@Module({
  imports: [TypeOrmModule.forFeature([Step])],
  providers: [StepsService],
})
export class StepsModule {}
