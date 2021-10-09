import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipMovementsFormComponent } from './ship-movements-form.component';

describe('ShipMovementsFormComponent', () => {
  let component: ShipMovementsFormComponent;
  let fixture: ComponentFixture<ShipMovementsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipMovementsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipMovementsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
