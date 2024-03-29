import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { AuthService } from '../services/auth/auth.service';
import { fadeInOut } from '../animations/animation';

@Component({
  selector: 'app-manual-payment',
  templateUrl: './manual-payment.component.html',
  styleUrls: ['./manual-payment.component.scss'],
  animations: [fadeInOut()]
})
export class ManualPaymentComponent implements OnInit {
  isLoading: boolean = false;

  // Form Variables
  formName: string = '';
  dialogHeader: string = '';
  displayDialog: boolean = false;
  objToSend: any = null;
  refreshSubscriber$: Subscription;

  pageSize = 50;
  pageNumber = 1;
  numberOfData: number;
  searchQuery: string = '';
  tableData: any[];
  @ViewChild('paginator') paginator: Paginator;

  selectedColumns: any[] = [];
  columns = [
    { value: 'id', name: 'Makbuz No' },
    { value: 'kasaNo', name: 'Kasa No' },
    { value: 'date', name: 'Date' },
    { value: 'agency', name: 'Agency' },
    { value: 'amount', name: 'Total' },
    { value: 'bank', name: 'Bank' },
    { value: 'chequeNo', name: 'Cheque No' },
    { value: 'description', name: 'Description' },
    { value: 'port', name: 'Port' },
  ];

  selectedDropdownOption: any = 'All';
  dateRanges: any = [new Date(2021, 0, 1), new Date()];

  agencyQuery: any = '';

  banksList: any;

  agencies: any[];
  filteredAgencies: any[] = [];

  optionsMenu: MenuItem[] = [
    {
      items: [
        {
          label: this.translate.instant('View'),
          icon: 'pi pi-file',
          command: () => {
            this.initializeForm(
              'manualPaymentDetailsForm',
              this.translate.instant('Payment Details'),
              true
            );
          },
        },
        {
          label: this.translate.instant('Delete'),
          icon: 'pi pi-trash',
          command: () => {
            this.objToSend.isDeleted = true;
            this.deleteService.openDeleteConfirmation(
              'payment',
              this.dataService.updateManualPayment(this.objToSend)
            );
          },
        },

        {
          label: this.translate.instant('Print'),
          icon: 'pi pi-file-pdf',
          command: () => {
            this.showTelerikReport('payment/manual',this.objToSend.id)
          },
        },
      ],
    },
  ];

  constructor(
    public translate: TranslateService,
    private dataService: DataService,
    private formService: FormService,
    private deleteService: DeleteService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (this.authService.currentUser.role !== 'Admin') {
      this.optionsMenu[0].items?.splice(1, 1);
    }
    this.loadSubscriptions();
    this.selectedColumns = [...this.columns];
    this.banksList = this.dataService.banksList;
    this.getAgencies();
    this.getData();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  dropdownChange() {
    this.getData();
  }

  dateSelection() {
    this.getData();
  }

  getData() {
    let bank = '';
    if (this.selectedDropdownOption === 'All') {
      bank = '';
    } else {
      bank = this.selectedDropdownOption;
    }

    this.dataService
      .getAllManualPayments(
        this.pageNumber,
        this.pageSize,
        this.dateRanges[0]
          ? this.dataService.convertDateTimeToIso(this.dateRanges[0]).split('T')[0]
          : '',
        this.dateRanges[1]
          ? this.dataService.convertDateTimeToIso(this.dateRanges[1]).split('T')[0]
          : '',

        bank,
        this.agencyQuery?.name ? this.agencyQuery.name : '',
        this.searchQuery
      )
      .subscribe(
        (response) => {
          this.tableData = response.manualPaymentList;
          // console.log(this.tableData);
          this.numberOfData = response.pagingInfo.totalCount;
          this.isLoading = false;
        },
        () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Bir hata oluştu.',
          });
        }
      );
  }

  pageChange(event: any) {
    this.pageNumber = event.page + 1;
    this.getData();
  }

  search(event?) {
    if (event) {
      if (event.keyCode === 13) {
        this.paginator.changePageToFirst(event);
        this.getData();
      }
    } else {
      this.paginator.changePageToFirst(event);
      this.getData();
    }
  }

  initializeForm(
    formName: string,
    dialogHeader: string,
    objectToSend: boolean = false
  ) {
    if (objectToSend) this.formService.sendObjectToForm(this.objToSend);
    this.formName = formName;

    this.dialogHeader = dialogHeader;
    this.displayDialog = true;
  }

  loadSubscriptions() {
    this.refreshSubscriber$ = this.formService
      .getRefreshSubject()
      .subscribe((value) => {
        if (value === 'refresh') {
          this.getData();
        }
      });
  }

  destroySubscriptions() {
    this.refreshSubscriber$.unsubscribe();
  }

  // AutoComplete
  getAgencies() {
    this.dataService.getAllAgencies('', '', 1, 10000).subscribe((resp) => {
      this.agencies = resp.agencyList;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
    });
  }

  filterAgencies(event) {
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.agencies.length; i++) {
      let item = this.agencies[i];
      if (item.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(item);
      }
    }
    this.filteredAgencies = filtered;
  }

  reportVar1
  reportVar2
  reportIsAlternative
  displayTelerikDialog
  telerik
  showTelerikReport(  var1 = '', var2 = '', isAlternative = false) {

    this.reportVar1 = var1;
    this.reportVar2 = var2;

    if (isAlternative) {
      this.reportIsAlternative = 'true';
    } else {
      this.reportIsAlternative = 'false';
    }

    this.displayTelerikDialog = true;
    this.telerik = true;
  }

}
