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
import { TabViewModule } from 'primeng/tabview';
import { ShipDiscountComponent } from './forms/ship-discount/ship-discount.component';
import { OvertimeDiscountComponent } from './forms/overtime-discount/overtime-discount.component';
import { AddPortComponent } from './forms/add-port/add-port.component';
import { PortDetailsComponent } from './forms/port-details/port-details.component';
import { ShipServicesComponent } from './forms/ship-services/ship-services.component';
import { OvertimeServicesComponent } from './forms/overtime-services/overtime-services.component';
import { BoatServicesComponent } from './forms/boat-services/boat-services.component';
import { CraneServicesComponent } from './forms/crane-services/crane-services.component';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { AddHolidayComponent } from './forms/add-holiday/add-holiday.component';
import { HolidayDetailsComponent } from './forms/holiday-details/holiday-details.component';
import { PayShipComponent } from './forms/pay-ship/pay-ship.component';
import { DepartureComponent } from './forms/departure/departure.component';
import { CheckoutTripComponent } from './forms/checkout-trip/checkout-trip.component';
import { ArrivalComponent } from './forms/arrival/arrival.component';
import { SelectButtonModule } from 'primeng/selectbutton';
import { EditArrivalComponent } from './forms/edit-arrival/edit-arrival.component';
import { DeleteArrivalComponent } from './forms/delete-arrival/delete-arrival.component';
import { ShipInqueryFormComponent } from './ship-inquery-form/ship-inquery-form.component';
import { TelerikViewerComponent } from './telerik-viewer/telerik-viewer.component';
import { TelerikReportingModule } from '@progress/telerik-angular-report-viewer';
import { ShipMovementsFormComponent } from './ship-movements-form/ship-movements-form.component';
import { PayCraneComponent } from './forms/pay-crane/pay-crane.component';
import { CranePaymentsComponent } from './forms/crane-payments/crane-payments.component';
import { CraneDetailsComponent } from './forms/crane-details/crane-details.component';
import { AddCraneComponent } from './forms/add-crane/add-crane.component';
import { ListboxModule } from 'primeng/listbox';
import { AddManualPaymentComponent } from './forms/add-manual-payment/add-manual-payment.component';
import { ManualPaymentDetailsComponent } from './forms/manual-payment-details/manual-payment-details.component';

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
    ShipDiscountComponent,
    OvertimeDiscountComponent,
    AddPortComponent,
    PortDetailsComponent,
    ShipServicesComponent,
    OvertimeServicesComponent,
    BoatServicesComponent,
    CraneServicesComponent,
    AddHolidayComponent,
    HolidayDetailsComponent,
    PayShipComponent,
    DepartureComponent,
    CheckoutTripComponent,
    ArrivalComponent,
    EditArrivalComponent,
    DeleteArrivalComponent,
    ShipInqueryFormComponent,
    TelerikViewerComponent,
    ShipMovementsFormComponent,
    PayCraneComponent,
    CranePaymentsComponent,
    CraneDetailsComponent,
    AddCraneComponent,
    AddManualPaymentComponent,
    ManualPaymentDetailsComponent,
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
    TabViewModule,
    TableModule,
    ToggleButtonModule,
    SelectButtonModule,
    TelerikReportingModule,
    ListboxModule,
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
    ShipInqueryFormComponent,
    ConfirmDialogModule,
    InputTextModule,
    InputSwitchModule,
    AutoCompleteModule,
    TabViewModule,
    TableModule,
    ToggleButtonModule,
    SelectButtonModule,
    TelerikViewerComponent,
    ShipMovementsFormComponent,
    ListboxModule,
  ],
})
export class SharedModule {}
