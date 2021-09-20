import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgencyUsersComponent } from './agency-users/agency-users.component';
import { CaptainUsersComponent } from './captain-users/captain-users.component';
import { LocalUsersComponent } from './local-users/local-users.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: 'agency', component: AgencyUsersComponent },
  { path: 'captain', component: CaptainUsersComponent },
  { path: 'local', component: LocalUsersComponent },
  { path: '', pathMatch: 'full', redirectTo: 'agency' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
