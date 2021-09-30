import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutTripComponent } from './checkout-trip.component';

describe('CheckoutTripComponent', () => {
  let component: CheckoutTripComponent;
  let fixture: ComponentFixture<CheckoutTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckoutTripComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
