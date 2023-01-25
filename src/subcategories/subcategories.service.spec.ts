import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SubCategory } from './entities/subcategory.entity';
import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesService', () => {
  let service: SubcategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubcategoriesService,
        {
          provide: getRepositoryToken(SubCategory),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SubcategoriesService>(SubcategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
