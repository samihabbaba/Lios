import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipsRoutingModule } from './ships-routing.module';
import { ShipComponent } from './ship.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShipComponent
  ],
  imports: [
    CommonModule,
    ShipsRoutingModule,
    SharedModule
  ]
})
export class ShipsModule { }
