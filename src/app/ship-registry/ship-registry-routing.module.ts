import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipRegistryComponent } from './ship-registry.component';

const routes: Routes = [
  { path: '', component: ShipRegistryComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipRegistryRoutingModule {}
