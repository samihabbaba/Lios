import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CraneRoutingModule } from './crane-routing.module';
import { CraneComponent } from './crane.component';


@NgModule({
  declarations: [
    CraneComponent
  ],
  imports: [
    CommonModule,
    CraneRoutingModule
  ]
})
export class CraneModule { }
