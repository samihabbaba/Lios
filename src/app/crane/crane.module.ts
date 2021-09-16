import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CraneRoutingModule } from './crane-routing.module';
import { CraneComponent } from './crane.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CraneComponent
  ],
  imports: [
    CommonModule,
    CraneRoutingModule,
    SharedModule
  ]
})
export class CraneModule { }
