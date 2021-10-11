import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CranePaymentsComponent } from './crane-payments.component';

describe('CranePaymentsComponent', () => {
  let component: CranePaymentsComponent;
  let fixture: ComponentFixture<CranePaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CranePaymentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CranePaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
