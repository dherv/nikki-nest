import { Test, TestingModule } from '@nestjs/testing';
import { GrammarsController } from './grammars.controller';

describe('Grammars Controller', () => {
  let controller: GrammarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrammarsController],
    }).compile();

    controller = module.get<GrammarsController>(GrammarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
