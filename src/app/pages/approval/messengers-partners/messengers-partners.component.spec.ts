import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengersPartnersComponent } from './messengers-partners.component';

describe('MessengersPartnersComponent', () => {
  let component: MessengersPartnersComponent;
  let fixture: ComponentFixture<MessengersPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengersPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengersPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
