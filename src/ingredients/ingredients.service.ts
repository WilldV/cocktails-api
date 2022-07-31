import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common';
import { Ingredient } from './entities/ingredient.entity';

@Injectable()
export class IngredientsService extends BaseService<Ingredient> {
  constructor(
    @InjectRepository(Ingredient)
    repository: Repository<Ingredient>,
  ) {
    super(repository);
  }
}
