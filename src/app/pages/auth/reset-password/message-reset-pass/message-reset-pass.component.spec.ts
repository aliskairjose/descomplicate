import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageResetPassComponent } from './message-reset-pass.component';

describe('MessageResetPassComponent', () => {
  let component: MessageResetPassComponent;
  let fixture: ComponentFixture<MessageResetPassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageResetPassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageResetPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
