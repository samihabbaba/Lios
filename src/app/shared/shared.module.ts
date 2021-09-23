import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { MenuModule } from 'primeng/menu';
import { SidebarModule } from 'primeng/sidebar';
import { MegaMenuModule } from 'primeng/megamenu';
import { NavbarComponent } from './navbar/navbar.component';
import { CardModule } from 'primeng/card';
import { NavItemDirective } from '../directives/nav-item/nav-item.directive';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { UpdateCurrencyComponent } from '../dialogs/update-currency/update-currency.component';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import {TooltipModule} from 'primeng/tooltip';

@NgModule({
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    NavItemDirective,
    UpdateCurrencyComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    MenuModule,
    SidebarModule,
    MegaMenuModule,
    CardModule,
    TranslateModule,
    DialogModule,
    BreadcrumbModule,
    InputNumberModule,
    FormsModule,
    ToastModule,
    TooltipModule
  ],
  exports: [
    ToolbarModule,
    ToolbarComponent,
    ButtonModule,
    MenuModule,
    SidebarModule,
    MegaMenuModule,
    NavbarComponent,
    CardModule,
    TranslateModule,
    DialogModule,
    UpdateCurrencyComponent,
    InputNumberModule,
    FormsModule,
    ToastModule,
    TooltipModule
  ],
})
export class SharedModule {}
