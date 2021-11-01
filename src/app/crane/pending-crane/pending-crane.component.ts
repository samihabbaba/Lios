import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { AuthService } from 'src/app/services/auth/auth.service';
import { fadeInOut } from 'src/app/animations/animation';

@Component({
  selector: 'app-pending-crane',
  templateUrl: './pending-crane.component.html',
  styleUrls: ['./pending-crane.component.scss'],
  animations: [fadeInOut()]
})
export class PendingCraneComponent implements OnInit {
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

  isPaid: boolean = false;

  selectedColumns: any[] = [];
  columns = [
    { value: 'date', name: 'Date' },
    { value: 'agencyName', name: 'Agency' },
    { value: 'craneAgencyName', name: 'Crane Agency' },
    { value: 'amount', name: 'Amount' },
    { value: 'paidAmount', name: 'Paid' },
    { value: 'remainingAmount', name: 'Remaining' },
    { value: 'inquiry', name: 'Total Inquery' },
  ];

  dropdownOptions = [
    {
      label: this.translate.instant('Agency Type'),
      items: [
        { name: this.translate.instant('All'), value: '' },
        { name: this.translate.instant('Company'), value: 'company' },
        { name: this.translate.instant('Personal'), value: 'personal' },
      ],
    },
  ];
  selectedDropdownOption: any = {
    name: this.translate.instant('All'),
    value: '',
  };
  dateRanges: any = [new Date(2021, 0, 1), new Date()];

  optionsMenu: MenuItem[] = [
    {
      items: [
        {
          label: this.translate.instant('Details'),
          icon: 'pi pi-pencil',
          command: () => {
            this.initializeForm(
              'craneDetailsForm',
              this.translate.instant('Details'),
              true
            );
          },
        },
        {
          label: this.translate.instant('Pay'),
          icon: 'pi pi-paypal',
          command: () => {
            this.initializeForm(
              'payCraneForm',
              this.translate.instant('Pay Invoice'),
              true
            );
          },
        },

        {
          label: this.translate.instant('Payments'),
          icon: 'pi pi-wallet',
          command: () => {
            this.initializeForm(
              'cranePaymentsForm',
              this.translate.instant('Payments'),
              true
            );
          },
        },

        // {
        //   label: this.translate.instant('Report'),
        //   icon: 'pi pi-file-pdf',
        //   command: () => {},
        // },
      ],
    },
  ];

  constructor(
    public translate: TranslateService,
    public dataService: DataService,
    private formService: FormService,
    private deleteService: DeleteService,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    if (
      this.authService.currentUser.role !== 'Collection' &&
      this.authService.currentUser.role !== 'Admin'
    ) {
      this.optionsMenu[0].items?.splice(1, 1);
    }
    this.loadSubscriptions();
    this.selectedColumns = [...this.columns];
    this.getData();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  selection() {}

  dropdownChange() {
    this.getData();
  }

  dateSelection() {
    this.getData();
  }

  getData() {

    this.dataService
      .getAllCranes(
        this.dateRanges[0]
          ? this.dataService.convertDateTimeToIso(this.dateRanges[0]).split('T')[0]
          : '',
        this.dateRanges[1]
          ? this.dataService.convertDateTimeToIso(this.dateRanges[1]).split('T')[0]
          : '',
        this.pageNumber,
        this.pageSize,
        this.searchQuery,
        this.isPaid
      )
      .subscribe(
        (response) => {
          this.tableData = response.craneInvoiceList;
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
}
