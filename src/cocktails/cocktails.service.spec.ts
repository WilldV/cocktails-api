import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CocktailsService } from './cocktails.service';
import { Cocktail } from './entities/cocktail.entity';

describe('CocktailsService', () => {
  let service: CocktailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CocktailsService,
        {
          provide: getRepositoryToken(Cocktail),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CocktailsService>(CocktailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
