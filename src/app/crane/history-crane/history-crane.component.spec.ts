import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCraneComponent } from './history-crane.component';

describe('HistoryCraneComponent', () => {
  let component: HistoryCraneComponent;
  let fixture: ComponentFixture<HistoryCraneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCraneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryCraneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
