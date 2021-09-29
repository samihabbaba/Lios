import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeDiscountComponent } from './overtime-discount.component';

describe('OvertimeDiscountComponent', () => {
  let component: OvertimeDiscountComponent;
  let fixture: ComponentFixture<OvertimeDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
