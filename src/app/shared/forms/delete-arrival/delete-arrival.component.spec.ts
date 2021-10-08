import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArrivalComponent } from './delete-arrival.component';

describe('DeleteArrivalComponent', () => {
  let component: DeleteArrivalComponent;
  let fixture: ComponentFixture<DeleteArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteArrivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
