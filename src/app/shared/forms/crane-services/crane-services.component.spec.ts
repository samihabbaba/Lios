import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraneServicesComponent } from './crane-services.component';

describe('CraneServicesComponent', () => {
  let component: CraneServicesComponent;
  let fixture: ComponentFixture<CraneServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraneServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CraneServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
