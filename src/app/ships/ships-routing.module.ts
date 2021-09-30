import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddShipComponent } from './add-ship/add-ship.component';
import { ShipDetailsComponent } from './ship-details/ship-details.component';
import { ShipComponent } from './ship.component';

const routes: Routes = [
  { path: '', component: ShipComponent },
  { path: 'add-ship', component: AddShipComponent },
  { path: ':id', component: ShipDetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipsRoutingModule {}
