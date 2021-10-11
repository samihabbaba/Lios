import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CraneComponent } from './crane.component';
import { HistoryCraneComponent } from './history-crane/history-crane.component';
import { PendingCraneComponent } from './pending-crane/pending-crane.component';

const routes: Routes = [
  { path: '', pathMatch: 'pending', redirectTo: '' },
  { path: 'pending', component: PendingCraneComponent },
  { path: 'history', component: HistoryCraneComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CraneRoutingModule {}
