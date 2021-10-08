import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipInqueryFormComponent } from './ship-inquery-form.component';

describe('ShipInqueryFormComponent', () => {
  let component: ShipInqueryFormComponent;
  let fixture: ComponentFixture<ShipInqueryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipInqueryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipInqueryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
