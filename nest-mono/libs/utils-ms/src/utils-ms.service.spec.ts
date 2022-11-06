import { Test, TestingModule } from '@nestjs/testing';
import { UtilsMsService } from './utils-ms.service';

describe('UtilsMsService', () => {
  let service: UtilsMsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UtilsMsService],
    }).compile();

    service = module.get<UtilsMsService>(UtilsMsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
