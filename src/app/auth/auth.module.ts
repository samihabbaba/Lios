import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthService } from '../services/auth/auth.service';


@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,SharedModule
  ],
  providers: [AuthService]
})
export class AuthModule { }
