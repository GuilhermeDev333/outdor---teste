import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate user', () => {
    const result = service.login('admin@outdoor.com', 'admin123');
    expect(result).toBeTruthy();
  });
});