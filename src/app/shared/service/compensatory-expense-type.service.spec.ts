import { TestBed } from '@angular/core/testing';

import { CompensatoryExpenseTypeService } from './compensatory-expense-type.service';

describe('CompensatoryExpenseTypeService', () => {
  let service: CompensatoryExpenseTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompensatoryExpenseTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
