import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipMovementsComponent } from './ship-movements.component';

describe('ShipMovementsComponent', () => {
  let component: ShipMovementsComponent;
  let fixture: ComponentFixture<ShipMovementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipMovementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipMovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
