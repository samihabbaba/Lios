import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualPaymentRoutingModule } from './manual-payment-routing.module';
import { ManualPaymentComponent } from './manual-payment.component';


@NgModule({
  declarations: [
    ManualPaymentComponent,
  ],
  imports: [
    CommonModule,
    ManualPaymentRoutingModule
  ]
})
export class ManualPaymentModule { }
