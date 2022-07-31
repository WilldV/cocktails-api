import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common';
import { IngredientStep } from './entities/ingredientsSteps.entity';

@Injectable()
export class IngredientsStepsService extends BaseService<IngredientStep> {
  constructor(
    @InjectRepository(IngredientStep)
    repository: Repository<IngredientStep>,
  ) {
    super(repository);
  }
}
