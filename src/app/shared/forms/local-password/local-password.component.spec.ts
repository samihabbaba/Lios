import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalPasswordComponent } from './local-password.component';

describe('LocalPasswordComponent', () => {
  let component: LocalPasswordComponent;
  let fixture: ComponentFixture<LocalPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
