import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagePassRecoveryComponent } from './message-pass-recovery.component';

describe('MessagePassRecoveryComponent', () => {
  let component: MessagePassRecoveryComponent;
  let fixture: ComponentFixture<MessagePassRecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagePassRecoveryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagePassRecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
