import { Test, TestingModule } from '@nestjs/testing';
import { GrammarsService } from './grammars.service';

describe('GrammarsService', () => {
  let service: GrammarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrammarsService],
    }).compile();

    service = module.get<GrammarsService>(GrammarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
