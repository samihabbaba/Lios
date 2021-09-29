import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipDiscountComponent } from './ship-discount.component';

describe('ShipDiscountComponent', () => {
  let component: ShipDiscountComponent;
  let fixture: ComponentFixture<ShipDiscountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipDiscountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
