import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayTripFormComponent } from './pay-trip-form.component';

describe('PayTripFormComponent', () => {
  let component: PayTripFormComponent;
  let fixture: ComponentFixture<PayTripFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayTripFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayTripFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
