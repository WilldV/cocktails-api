import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../categories';
import { SubCategory } from './entities/subcategory.entity';
import { SubcategoriesController } from './subcategories.controller';
import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesController', () => {
  let controller: SubcategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubcategoriesController],
      providers: [
        {
          provide: SubcategoriesService,
          useValue: {},
        },
        {
          provide: getRepositoryToken(SubCategory),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SubcategoriesController>(SubcategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
