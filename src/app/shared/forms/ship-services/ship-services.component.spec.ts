import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipServicesComponent } from './ship-services.component';

describe('ShipServicesComponent', () => {
  let component: ShipServicesComponent;
  let fixture: ComponentFixture<ShipServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
