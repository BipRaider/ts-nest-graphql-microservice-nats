import { Test, TestingModule } from '@nestjs/testing';
import { ExchequerController } from './exchequer.controller';
import { ExchequerService } from './exchequer.service';

describe('ExchequerController', () => {
  let exchequerController: ExchequerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExchequerController],
      providers: [ExchequerService],
    }).compile();

    exchequerController = app.get<ExchequerController>(ExchequerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(exchequerController.getHello()).toBe('Hello World!');
    });
  });
});
