import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipRegistryDetailsComponent } from './ship-registry-details.component';

describe('ShipRegistryDetailsComponent', () => {
  let component: ShipRegistryDetailsComponent;
  let fixture: ComponentFixture<ShipRegistryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipRegistryDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipRegistryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
