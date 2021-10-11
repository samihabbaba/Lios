import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { Router } from '@angular/router';
import { Menu } from 'primeng/menu';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
})
export class TripsComponent implements OnInit {
  // Menu Variables
  @ViewChild('menu') menu: Menu;
  @ViewChild('menuInPort') menuInPort: Menu;

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

  constructor(
    public translate: TranslateService,
    private dataService: DataService,
    private formService: FormService,
    private deleteService: DeleteService,
    private router: Router
  ) {}

  ngOnInit(): void {
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
          ? this.dateRanges[0].toISOString().split('T')[0]
          : '',
        this.dateRanges[1]
          ? this.dateRanges[1].toISOString().split('T')[0]
          : '',
          this.pageNumber,
          this.pageSize,
          this.searchQuery,
      )
      .subscribe(
        (response) => {
          this.tableData = response.trips;
          // console.log(this.tableData);
          this.numberOfData = response.pagingInfo.totalCount;
        },
        (error) => {}
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
}
