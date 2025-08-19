import { TestBed } from '@angular/core/testing';
import { OutdoorService } from './outdoor';

describe('OutdoorService', () => {
  let service: OutdoorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutdoorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should list outdoors', () => {
    const outdoors = service.listarOutdoors();
    expect(outdoors.length).toBeGreaterThan(0);
  });
});