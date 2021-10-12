import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryTripsComponent } from './history-trips/history-trips.component';
import { PendingTripsComponent } from './pending-trips/pending-trips.component';

const routes: Routes = [
  { path: '', pathMatch: 'pending', redirectTo: '' },
  { path: 'pending', component: PendingTripsComponent },
  { path: 'history', component: HistoryTripsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TripsRoutingModule {}
