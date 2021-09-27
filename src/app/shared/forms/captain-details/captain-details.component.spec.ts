import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptainDetailsComponent } from './captain-details.component';

describe('CaptainDetailsComponent', () => {
  let component: CaptainDetailsComponent;
  let fixture: ComponentFixture<CaptainDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptainDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
