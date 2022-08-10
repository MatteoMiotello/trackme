import { JwtAuthGuard } from './jwt-auth-guard.service';

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new JwtAuthGuard()).toBeDefined();
  });
});
