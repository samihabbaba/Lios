import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipRegistryRoutingModule } from './ship-registry-routing.module';
import { ShipRegistryComponent } from './ship-registry.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShipRegistryComponent
  ],
  imports: [
    CommonModule,
    ShipRegistryRoutingModule,
    SharedModule
  ]
})
export class ShipRegistryModule { }
