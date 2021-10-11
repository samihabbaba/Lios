import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddManualPaymentComponent } from './add-manual-payment.component';

describe('AddManualPaymentComponent', () => {
  let component: AddManualPaymentComponent;
  let fixture: ComponentFixture<AddManualPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddManualPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddManualPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
