import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDataApprovalComponent } from './card-data-approval.component';

describe('CardDataApprovalComponent', () => {
  let component: CardDataApprovalComponent;
  let fixture: ComponentFixture<CardDataApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardDataApprovalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDataApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
