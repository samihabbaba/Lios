import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptainUsersComponent } from './captain-users.component';

describe('CaptainUsersComponent', () => {
  let component: CaptainUsersComponent;
  let fixture: ComponentFixture<CaptainUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptainUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptainUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
