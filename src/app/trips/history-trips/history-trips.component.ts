import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';
import { AuthService } from 'src/app/services/auth/auth.service';
import { fadeInOut } from 'src/app/animations/animation';

@Component({
  selector: 'app-history-trips',
  templateUrl: './history-trips.component.html',
  styleUrls: ['./history-trips.component.scss'],
  animations: [fadeInOut()],
})
export class HistoryTripsComponent implements OnInit {
  isLoading: boolean = false;

  // Menu Variables
  @ViewChild('menu') menu: Menu;
  @ViewChild('menuInPort') menuInPort: Menu;
  @ViewChild('report_menu') report_menu: Menu;

  // Form Variables
  formName: string = '';
  dialogHeader: string = '';
  displayDialog: boolean = false;
  displayInqueryDialog: boolean = false;
  displayMovementsDialog: boolean = false;
  objToSend: any = null;
  refreshSubscriber$: Subscription;

  pageSize = 50;
  pageNumber = 1;
  numberOfData: number;
  searchQuery: string = '';
  tableData: any[];
  @ViewChild('paginator') paginator: Paginator;

  dateRanges: any = [new Date(2021, 0, 1), new Date()];

  selectedColumns: any[] = [];

  columns = [
    { value: 'shipName', name: 'Ship Name' },
    { value: 'source', name: 'Source' },
    { value: 'port', name: 'Port' },
    { value: 'destination', name: 'Destination' },
    { value: 'accommodation', name: 'Accommodation' },
    { value: 'sequenceNumber', name: 'Sequence Number' },
    { value: 'arrivalDate', name: 'Arrival Date' },
    { value: 'departureDate', name: 'Departure Date' },
    { value: 'inPort', name: 'In Port' },
    { value: 'isPaid', name: 'Is Paid' },
  ];

  optionsMenu: MenuItem[] = [
    {
      items: [
        {
          label: this.translate.instant('Details'),
          icon: 'pi pi-pencil',
          command: () => {
            this.goToShipDetails(this.objToSend.id);
          },
        },
        {
          label: this.translate.instant('New Arrival'),
          icon: 'pi pi-sign-in',
          command: () => {
            this.initializeForm(
              'arrivalForm',
              this.translate.instant('Ship Arrival'),
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
              this.objToSend.name,
              this.dataService.updateShip(this.objToSend)
            );
          },
        },
      ],
    },
  ];

  optionsMenuInPort: MenuItem[] = [
    {
      items: [
        // {
        //   label: this.translate.instant('Details'),
        //   icon: 'pi pi-pencil',
        //   command: () => {
        //     this.goToShipDetails(this.objToSend.id);
        //   },
        // },

        {
          label: this.translate.instant('Inquery'),
          icon: 'pi pi-book',
          command: () => {
            this.formService.sendObjectToForm(this.objToSend);
            this.displayInqueryDialog = true;
          },
        },

        {
          label: this.translate.instant('Edit Arrival'),
          icon: 'pi pi-paperclip',
          command: () => {
            this.initializeForm(
              'editArrivalForm',
              this.translate.instant('Edit Arrival'),
              true
            );
          },
        },

        {
          label: this.translate.instant('Delete Arrival'),
          icon: 'pi pi-exclamation-triangle',
          command: () => {
            this.initializeForm(
              'deleteArrivalForm',
              this.translate.instant('Delete Arrival'),
              true
            );
          },
        },

        {
          label: this.translate.instant('Departure'),
          icon: 'pi pi-sign-out',
          command: () => {
            this.initializeForm(
              'departureForm',
              this.translate.instant('Departure'),
              true
            );
          },
        },

        {
          label: this.translate.instant('Movements'),
          icon: 'pi pi-sitemap',
          command: () => {
            this.formService.sendObjectToForm(this.objToSend);
            this.displayMovementsDialog = true;
          },
        },
        // {
        //   label: this.translate.instant('Delete'),
        //   icon: 'pi pi-trash',
        //   command: () => {
        //     this.objToSend.isDeleted = true;
        //     this.deleteService.openDeleteConfirmation(
        //       this.objToSend.name,
        //       this.dataService.updateShip(this.objToSend)
        //     );
        //   },
        // },
      ],
    },
  ];

  reportOptionsMenuFull = [
    {
      label: this.translate.instant('Ship Form'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'ship');
      },
    },
    {
      label: this.translate.instant('Ship Invoice'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'total');
      },
    },
    {
      label: this.translate.instant('Crane 1'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'crane/invoice');
      },
    },
    {
      label: this.translate.instant('Crane 2'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'crane/invoice', true);
      },
    },
    {
      label: this.translate.instant('Boat Invoice'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'boat/invoice');
      },
    },
    {
      label: this.translate.instant('Overtime Report'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'overtime');
      },
    },
    {
      label: this.translate.instant('Boat Report'),
      icon: 'pi pi-file',
      command: () => {
        this.showTelerikReport(this.objToSend.id, 'boat');
      },
    },
  ];

  reportOptionsMenu: MenuItem[] = [
    {
      items: [],
    },
  ];

  constructor(
    public translate: TranslateService,
    private dataService: DataService,
    private formService: FormService,
    private deleteService: DeleteService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.loadSubscriptions();
    this.selectedColumns = [...this.columns];
    this.getData();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  selection() {}

  dateSelection() {
    // console.log(this.dateRanges);
    this.getData();
  }

  getData() {
    this.dataService
      .getAllTrips(
        this.dateRanges[0]
          ? this.dataService
              .convertDateTimeToIso(this.dateRanges[0])
              .split('T')[0]
          : '',
        this.dateRanges[1]
          ? this.dataService
              .convertDateTimeToIso(this.dateRanges[1])
              .split('T')[0]
          : '',
        this.pageNumber,
        this.pageSize,
        this.searchQuery,
        0,
        true
      )
      .subscribe(
        (response) => {
          this.tableData = response.trips;
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

  goToAddShip() {
    this.router.navigate(['ships/add-ship']);
  }

  goToShipDetails(id: string) {
    this.router.navigate(['ships/' + id]);
  }

  toggleMenu(item, event) {
    this.objToSend = item;
    if (this.objToSend.inPort) {
      this.menuInPort.toggle(event);
    } else {
      this.menu.toggle(event);
    }
  }

  toggleMenuReports(item, event) {
    this.objToSend = item;

    this.reportOptionsMenu[0].items = [];
    if (item.shipInvoice) {
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[0]);
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[1]);
    }
    if (item.craneInvoice) {
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[2]);
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[3]);
    }
    if (item.boatInvoice) {
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[4]);
    }
    if (item.overTimeReport) {
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[5]);
    }
    if (item.boatReport) {
      this.reportOptionsMenu[0].items.push(this.reportOptionsMenuFull[6]);
    }

    this.report_menu.toggle(event);
  }

  reportVar1;
  reportVar2;
  reportIsAlternative;
  displayTelerikDialog;
  telerik;
  showTelerikReport(var2 = '', var1 = '', isAlternative = false) {
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
