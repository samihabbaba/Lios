import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CraneComponent } from './crane.component';

const routes: Routes = [
  { path: '', component: CraneComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CraneRoutingModule {}
