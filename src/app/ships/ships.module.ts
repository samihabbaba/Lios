import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipsRoutingModule } from './ships-routing.module';
import { ShipComponent } from './ship.component';
import { SharedModule } from '../shared/shared.module';
import { ShipDetailsComponent } from './ship-details/ship-details.component';
import { AddShipComponent } from './add-ship/add-ship.component';


@NgModule({
  declarations: [
    ShipComponent,
    ShipDetailsComponent,
    AddShipComponent
  ],
  imports: [
    CommonModule,
    ShipsRoutingModule,
    SharedModule
  ]
})
export class ShipsModule { }
