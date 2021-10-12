import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { ConfigurationComponent } from './configuration.component';
import { SharedModule } from '../shared/shared.module';
import { DiscountComponent } from './discount/discount.component';
import { ServicesComponent } from './services/services.component';
import { PortComponent } from './port/port.component';
import { HolidayComponent } from './holiday/holiday.component';
import { UserLoggingsComponent } from './user-loggings/user-loggings.component';


@NgModule({
  declarations: [
    ConfigurationComponent,
    DiscountComponent,
    ServicesComponent,
    PortComponent,
    HolidayComponent,
    UserLoggingsComponent
  ],
  imports: [
    CommonModule,
    ConfigurationRoutingModule,SharedModule
  ]
})
export class ConfigurationModule { }
