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
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-ship-registry',
  templateUrl: './ship-registry.component.html',
  styleUrls: ['./ship-registry.component.scss']
})
export class ShipRegistryComponent implements OnInit {

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

  selectedColumns: any[] = [];
  columns = [
    { value: 'id', name: 'Id' },
    { value: 'name', name: 'Name' },
    { value: 'agencyName', name: 'Agency Name' },
    { value: 'country', name: 'Country' },
    { value: 'grt', name: 'GRT' },
    { value: 'nrt', name: 'NRT' },
    { value: 'dwt', name: 'DWT' },
    { value: 'leangth', name: 'Length' },
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
        // {
        //   label: this.translate.instant('New Arrival'),
        //   icon: 'pi pi-sign-in',
        //   command: () => {
        //     this.initializeForm(
        //       'arrivalForm',
        //       this.translate.instant('Ship Arrival'),
        //       true
        //     );
        //   },
        // },
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

  // optionsMenuInPort: MenuItem[] = [
  //   {
  //     items: [
  //       {
  //         label: this.translate.instant('Details'),
  //         icon: 'pi pi-pencil',
  //         command: () => {
  //           this.goToShipDetails(this.objToSend.id);
  //         },
  //       },

  //       {
  //         label: this.translate.instant('Inquery'),
  //         icon: 'pi pi-book',
  //         command: () => {
  //           this.formService.sendObjectToForm(this.objToSend);
  //           this.displayInqueryDialog = true;
  //         },
  //       },

  //       {
  //         label: this.translate.instant('Edit Arrival'),
  //         icon: 'pi pi-paperclip',
  //         command: () => {
  //           this.initializeForm(
  //             'editArrivalForm',
  //             this.translate.instant('Edit Arrival'),
  //             true
  //           );
  //         },
  //       },

  //       {
  //         label: this.translate.instant('Delete Arrival'),
  //         icon: 'pi pi-exclamation-triangle',
  //         command: () => {
  //           this.initializeForm(
  //             'deleteArrivalForm',
  //             this.translate.instant('Delete Arrival'),
  //             true
  //           );
  //         },
  //       },

  //       {
  //         label: this.translate.instant('Departure'),
  //         icon: 'pi pi-sign-out',
  //         command: () => {
  //           this.initializeForm(
  //             'departureForm',
  //             this.translate.instant('Departure'),
  //             true
  //           );
  //         },
  //       },

  //       {
  //         label: this.translate.instant('Movements'),
  //         icon: 'pi pi-sitemap',
  //         command: () => {
  //           this.formService.sendObjectToForm(this.objToSend);
  //           this.displayMovementsDialog = true;
  //         },
  //       },
  //       {
  //         label: this.translate.instant('Delete'),
  //         icon: 'pi pi-trash',
  //         command: () => {
  //           this.objToSend.isDeleted = true;
  //           this.deleteService.openDeleteConfirmation(
  //             this.objToSend.name,
  //             this.dataService.updateShip(this.objToSend)
  //           );
  //         },
  //       },
  //     ],
  //   },
  // ];

  constructor(
    public translate: TranslateService,
    private dataService: DataService,
    private formService: FormService,
    private deleteService: DeleteService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.currentUser.role !== 'Admin') {
      this.optionsMenu[0].items?.pop();
    }
    this.loadSubscriptions();
    this.selectedColumns = [...this.columns];
    this.getData();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  selection() {}

  getData() {
    this.dataService
      .getAllShips(this.searchQuery, this.pageSize, this.pageNumber, true)
      .subscribe(
        (response) => {
          this.tableData = response.shipList;
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
    this.router.navigate(['ship-registry/add-ship-registry']);
  }

  goToShipDetails(id: string) {
    this.router.navigate(['ship-registry/' + id]);
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
