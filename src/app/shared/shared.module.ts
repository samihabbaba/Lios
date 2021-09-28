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
import { InputSwitchModule } from 'primeng/inputswitch';
import { AddCaptainComponent } from './forms/add-captain/add-captain.component';
import { CaptainDetailsComponent } from './forms/captain-details/captain-details.component';
import { AddLocalComponent } from './forms/add-local/add-local.component';
import { LocalDetailsComponent } from './forms/local-details/local-details.component';
import { LocalPasswordComponent } from './forms/local-password/local-password.component';
import { AddGroupComponent } from './forms/add-group/add-group.component';
import { AddBrandComponent } from './forms/add-brand/add-brand.component';
import { AddCategoryComponent } from './forms/add-category/add-category.component';
import { GroupDetailsComponent } from './forms/group-details/group-details.component';
import { BrandDetailsComponent } from './forms/brand-details/brand-details.component';
import { CategoryDetailsComponent } from './forms/category-details/category-details.component';
import { AutoCompleteModule } from 'primeng/autocomplete';

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
    AddLocalComponent,
    LocalDetailsComponent,
    LocalPasswordComponent,
    AddGroupComponent,
    AddBrandComponent,
    AddCategoryComponent,
    GroupDetailsComponent,
    BrandDetailsComponent,
    CategoryDetailsComponent,
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
    InputSwitchModule,
    AutoCompleteModule,
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
    InputSwitchModule,
    AutoCompleteModule,
  ],
})
export class SharedModule {}
