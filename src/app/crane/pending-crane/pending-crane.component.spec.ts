import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingCraneComponent } from './pending-crane.component';

describe('PendingCraneComponent', () => {
  let component: PendingCraneComponent;
  let fixture: ComponentFixture<PendingCraneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingCraneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingCraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
