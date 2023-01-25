import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Step } from './entities/step.entity';
import { StepsService } from './steps.service';

describe('StepsService', () => {
  let service: StepsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StepsService,
        {
          provide: getRepositoryToken(Step),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StepsService>(StepsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
