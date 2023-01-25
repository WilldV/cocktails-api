import { Test, TestingModule } from '@nestjs/testing';
import { CocktailsController } from './cocktails.controller';
import { CocktailsService } from './cocktails.service';
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
      ],
    }).compile();

    controller = module.get<CocktailsController>(CocktailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
