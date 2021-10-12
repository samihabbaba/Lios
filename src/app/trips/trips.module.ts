import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips.component';
import { SharedModule } from '../shared/shared.module';
import { HistoryTripsComponent } from './history-trips/history-trips.component';
import { PendingTripsComponent } from './pending-trips/pending-trips.component';


@NgModule({
  declarations: [
    TripsComponent,
    HistoryTripsComponent,
    PendingTripsComponent
  ],
  imports: [
    CommonModule,
    TripsRoutingModule,
    SharedModule
  ]
})
export class TripsModule { }
