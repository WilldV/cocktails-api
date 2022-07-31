import { Test, TestingModule } from '@nestjs/testing';
import { IngredientsStepsService } from './ingredients-steps.service';

describe('IngredientsStepsService', () => {
  let service: IngredientsStepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientsStepsService],
    }).compile();

    service = module.get<IngredientsStepsService>(IngredientsStepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
