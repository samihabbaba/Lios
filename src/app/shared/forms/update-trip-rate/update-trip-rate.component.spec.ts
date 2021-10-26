import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTripRateComponent } from './update-trip-rate.component';

describe('UpdateTripRateComponent', () => {
  let component: UpdateTripRateComponent;
  let fixture: ComponentFixture<UpdateTripRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTripRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTripRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
