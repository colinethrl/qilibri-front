import { TestBed } from '@angular/core/testing';

import { CrsfInterceptor } from './crsf.interceptor';

describe('CrsfInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      CrsfInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: CrsfInterceptor = TestBed.inject(CrsfInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
