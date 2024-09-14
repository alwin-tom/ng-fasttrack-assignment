import { TestBed } from '@angular/core/testing';

import { HttpHelperService } from './http-helper.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HttpHelperService', () => {
  let service: HttpHelperService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HttpHelperService);
    
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
