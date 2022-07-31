import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../common';
import { SubCategory } from './entities/subcategory.entity';

@Injectable()
export class SubcategoriesService extends BaseService<SubCategory> {
  constructor(
    @InjectRepository(SubCategory)
    repository: Repository<SubCategory>,
  ) {
    super(repository);
  }
}
