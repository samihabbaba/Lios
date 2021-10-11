import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipRegistryRoutingModule } from './ship-registry-routing.module';
import { ShipRegistryComponent } from './ship-registry.component';
import { SharedModule } from '../shared/shared.module';
import { AddShipRegistryComponent } from './add-ship-registry/add-ship-registry.component';
import { ShipRegistryDetailsComponent } from './ship-registry-details/ship-registry-details.component';


@NgModule({
  declarations: [
    ShipRegistryComponent,
    AddShipRegistryComponent,
    ShipRegistryDetailsComponent
  ],
  imports: [
    CommonModule,
    ShipRegistryRoutingModule,
    SharedModule
  ]
})
export class ShipRegistryModule { }
