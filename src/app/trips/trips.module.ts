import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripsRoutingModule } from './trips-routing.module';
import { TripsComponent } from './trips.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    TripsComponent
  ],
  imports: [
    CommonModule,
    TripsRoutingModule,
    SharedModule
  ]
})
export class TripsModule { }
