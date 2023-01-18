import { TestBed } from '@angular/core/testing';

import { ModalCoreService } from './modal-core.service';

describe('ModalCoreService', () => {
  let service: ModalCoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalCoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
