import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayShipComponent } from './pay-ship.component';

describe('PayShipComponent', () => {
  let component: PayShipComponent;
  let fixture: ComponentFixture<PayShipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayShipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayShipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
