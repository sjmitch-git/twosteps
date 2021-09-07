import { TestBed } from '@angular/core/testing';

import { ScrolltoService } from './scrollto.service';

describe('ScrolltoService', () => {
  let service: ScrolltoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrolltoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
