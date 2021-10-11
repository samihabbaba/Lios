import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCraneComponent } from './pay-crane.component';

describe('PayCraneComponent', () => {
  let component: PayCraneComponent;
  let fixture: ComponentFixture<PayCraneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayCraneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayCraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
