import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common';
import { Cocktail } from './entities/cocktail.entity';

@Injectable()
export class CocktailsService extends BaseService<Cocktail> {
  constructor(
    @InjectRepository(Cocktail)
    repository: Repository<Cocktail>,
  ) {
    super(repository);
  }
}
