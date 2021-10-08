import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditArrivalComponent } from './edit-arrival.component';

describe('EditArrivalComponent', () => {
  let component: EditArrivalComponent;
  let fixture: ComponentFixture<EditArrivalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditArrivalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArrivalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
