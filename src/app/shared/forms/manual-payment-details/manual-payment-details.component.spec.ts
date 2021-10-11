import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualPaymentDetailsComponent } from './manual-payment-details.component';

describe('ManualPaymentDetailsComponent', () => {
  let component: ManualPaymentDetailsComponent;
  let fixture: ComponentFixture<ManualPaymentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManualPaymentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
