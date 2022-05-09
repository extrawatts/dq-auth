import { Test, TestingModule } from '@nestjs/testing';
import { CustomAuthService } from './custom-auth.service';

describe('CustomAuthService', () => {
  let service: CustomAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomAuthService],
    }).compile();

    service = module.get<CustomAuthService>(CustomAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
