import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddShipRegistryComponent } from './add-ship-registry/add-ship-registry.component';
import { ShipRegistryDetailsComponent } from './ship-registry-details/ship-registry-details.component';
import { ShipRegistryComponent } from './ship-registry.component';

const routes: Routes = [
  { path: '', component: ShipRegistryComponent },
  { path: 'add-ship-registry', component: AddShipRegistryComponent },
  { path: ':id', component: ShipRegistryDetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipRegistryRoutingModule {}
