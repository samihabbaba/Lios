import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoggingsComponent } from './user-loggings.component';

describe('UserLoggingsComponent', () => {
  let component: UserLoggingsComponent;
  let fixture: ComponentFixture<UserLoggingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLoggingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoggingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
