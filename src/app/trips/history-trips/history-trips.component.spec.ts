import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryTripsComponent } from './history-trips.component';

describe('HistoryTripsComponent', () => {
  let component: HistoryTripsComponent;
  let fixture: ComponentFixture<HistoryTripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryTripsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryTripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
