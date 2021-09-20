import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { AgencyUsersComponent } from './agency-users/agency-users.component';
import { CaptainUsersComponent } from './captain-users/captain-users.component';
import { LocalUsersComponent } from './local-users/local-users.component';

@NgModule({
  declarations: [UsersComponent, AgencyUsersComponent, CaptainUsersComponent, LocalUsersComponent],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
})
export class UsersModule {}
