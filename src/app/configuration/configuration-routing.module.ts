import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigurationComponent } from './configuration.component';
import { DiscountComponent } from './discount/discount.component';
import { HolidayComponent } from './holiday/holiday.component';
import { PortComponent } from './port/port.component';
import { ServicesComponent } from './services/services.component';

const routes: Routes = [
  { path: '', redirectTo: 'discount', pathMatch: 'full' },
  { path: 'discount', component: DiscountComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'port', component: PortComponent },
  { path: 'holiday', component: HolidayComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationRoutingModule {}
