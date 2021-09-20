import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManualPaymentComponent } from './manual-payment.component';

const routes: Routes = [
  { path: '', component: ManualPaymentComponent },
  { path: '', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManualPaymentRoutingModule { }
