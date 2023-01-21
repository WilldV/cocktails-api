import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SubCategory } from '../subcategories';
import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';
import { Cocktail } from './entities/cocktail.entity';
import { CreateCocktail, DeleteCocktail, UpdateCocktail } from './use-cases';

describe('CocktailsController', () => {
  let controller: CocktailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CocktailsController],
      providers: [
        {
          provide: CocktailsService,
          useValue: {},
        },
        {
          provide: CreateCocktail,
          useValue: {},
        },
        {
          provide: DeleteCocktail,
          useValue: {},
        },
        {
          provide: UpdateCocktail,
          useValue: {},
        },
        {
          provide: getRepositoryToken(SubCategory),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Cocktail),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<CocktailsController>(CocktailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
