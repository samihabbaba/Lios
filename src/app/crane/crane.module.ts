import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CraneRoutingModule } from './crane-routing.module';
import { CraneComponent } from './crane.component';
import { SharedModule } from '../shared/shared.module';
import { PendingCraneComponent } from './pending-crane/pending-crane.component';
import { HistoryCraneComponent } from './history-crane/history-crane.component';


@NgModule({
  declarations: [
    CraneComponent,
    PendingCraneComponent,
    HistoryCraneComponent
  ],
  imports: [
    CommonModule,
    CraneRoutingModule,
    SharedModule
  ]
})
export class CraneModule { }
