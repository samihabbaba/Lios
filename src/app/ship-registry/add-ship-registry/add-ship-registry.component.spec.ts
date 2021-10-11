import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShipRegistryComponent } from './add-ship-registry.component';

describe('AddShipRegistryComponent', () => {
  let component: AddShipRegistryComponent;
  let fixture: ComponentFixture<AddShipRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShipRegistryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShipRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
