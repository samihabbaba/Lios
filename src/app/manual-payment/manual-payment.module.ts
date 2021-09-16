import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManualPaymentRoutingModule } from './manual-payment-routing.module';
import { ManualPaymentComponent } from './manual-payment.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ManualPaymentComponent,
  ],
  imports: [
    CommonModule,
    ManualPaymentRoutingModule,
    SharedModule
  ]
})
export class ManualPaymentModule { }
