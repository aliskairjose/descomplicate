import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TramitadoresPartnersComponent } from './tramitadores-partners.component';

describe('TramitadoresPartnersComponent', () => {
  let component: TramitadoresPartnersComponent;
  let fixture: ComponentFixture<TramitadoresPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TramitadoresPartnersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TramitadoresPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
