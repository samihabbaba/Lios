import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipRegistryComponent } from './ship-registry.component';

describe('ShipRegistryComponent', () => {
  let component: ShipRegistryComponent;
  let fixture: ComponentFixture<ShipRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipRegistryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
