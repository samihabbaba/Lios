import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SharedModule } from '../shared/shared.module';
import { DataService } from '../services/data/data.service';
import { AuthService } from '../services/auth/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule],
  providers: [AuthService, AuthGuard]
})
export class LayoutModule {}
