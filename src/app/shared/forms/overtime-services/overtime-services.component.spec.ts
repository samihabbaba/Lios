import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OvertimeServicesComponent } from './overtime-services.component';

describe('OvertimeServicesComponent', () => {
  let component: OvertimeServicesComponent;
  let fixture: ComponentFixture<OvertimeServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OvertimeServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OvertimeServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
