import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CraneDetailsComponent } from './crane-details.component';

describe('CraneDetailsComponent', () => {
  let component: CraneDetailsComponent;
  let fixture: ComponentFixture<CraneDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CraneDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CraneDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
