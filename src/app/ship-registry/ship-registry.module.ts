import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShipRegistryRoutingModule } from './ship-registry-routing.module';
import { ShipRegistryComponent } from './ship-registry.component';


@NgModule({
  declarations: [
    ShipRegistryComponent
  ],
  imports: [
    CommonModule,
    ShipRegistryRoutingModule
  ]
})
export class ShipRegistryModule { }
