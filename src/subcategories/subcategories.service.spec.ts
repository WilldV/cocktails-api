import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DEFAULT_LIMIT } from '../common';
import { SubCategory } from './entities/subcategory.entity';
import { SubcategoriesService } from './subcategories.service';

describe('SubcategoriesService', () => {
  let service: SubcategoriesService;

  const findAndCountResponse = [[{}], 1];

  const mockRepository = {
    findAndCount: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubcategoriesService,
        {
          provide: getRepositoryToken(SubCategory),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<SubcategoriesService>(SubcategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAndCount', () => {
    it('it should return a paginated response creating a default take and skip when anything is passed', async () => {
      mockRepository.findAndCount = jest
        .fn()
        .mockReturnValueOnce(findAndCountResponse);
      const response = await service.findAndCount();

      expect(response).toEqual({
        total: findAndCountResponse[1],
        limit: DEFAULT_LIMIT,
        offset: 0,
        data: findAndCountResponse[0],
      });
    });

    it('it should return a paginated response with a requested take and skip when data is passed', async () => {
      mockRepository.findAndCount = jest
        .fn()
        .mockReturnValueOnce(findAndCountResponse);
      const limit = 18,
        offset = 5;
      const response = await service.findAndCount({
        take: limit,
        skip: offset,
      });

      expect(response).toEqual({
        total: findAndCountResponse[1],
        limit,
        offset,
        data: findAndCountResponse[0],
      });
    });

    it('should return a BadRequestException when query returns an EntityPropertyNotFoundError error', async () => {
      mockRepository.findAndCount = jest.fn().mockRejectedValue({
        name: 'EntityPropertyNotFoundError',
        message: 'Something went wrong',
      });
      try {
        await service.findAndCount();
      } catch (error) {
        expect(error.response.error).toEqual('Bad Request');
        expect(error.message).toEqual('Something went wrong');
      }
    });
  });
});
