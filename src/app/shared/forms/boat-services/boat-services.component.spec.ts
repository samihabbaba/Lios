import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatServicesComponent } from './boat-services.component';

describe('BoatServicesComponent', () => {
  let component: BoatServicesComponent;
  let fixture: ComponentFixture<BoatServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
