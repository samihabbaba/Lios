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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { PaginatorModule } from 'primeng/paginator';
import { LabelConvertPipe } from '../pipes/label-convert/label-convert.pipe';
import { MainDialogComponent } from './main-dialog/main-dialog.component';
import { AddAgencyComponent } from './forms/add-agency/add-agency.component';
import { AgencyDetailsComponent } from './forms/agency-details/agency-details.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ExampleComponent } from 'src/THIS-IS-A-SAMPLE-FOR-TABLE/example.component';
import { InputTextModule } from 'primeng/inputtext';
import {InputSwitchModule} from 'primeng/inputswitch';
import { AddCaptainComponent } from './forms/add-captain/add-captain.component';
import { CaptainDetailsComponent } from './forms/captain-details/captain-details.component';

@NgModule({
  declarations: [
    ToolbarComponent,
    NavbarComponent,
    NavItemDirective,
    UpdateCurrencyComponent,
    LabelConvertPipe,
    MainDialogComponent,
    AddAgencyComponent,
    AgencyDetailsComponent,
    // Will delete example component later
    ExampleComponent,
    AddCaptainComponent,
    CaptainDetailsComponent,
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
    ReactiveFormsModule,
    ToastModule,
    TooltipModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    PaginatorModule,
    ConfirmDialogModule,
    InputTextModule,
    InputSwitchModule
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
    ReactiveFormsModule,
    ToastModule,
    TooltipModule,
    MultiSelectModule,
    DropdownModule,
    CalendarModule,
    PaginatorModule,
    LabelConvertPipe,
    MainDialogComponent,
    ConfirmDialogModule,
    InputTextModule,
    InputSwitchModule
  ],
})
export class SharedModule {}
