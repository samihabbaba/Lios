import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  // Form Variables
  formName: string = '';
  dialogHeader: string = '';
  displayDialog: boolean = false;
  objToSend: any = null;
  refreshSubscriber$: Subscription;

  tabView: string = 'ship';

  pageSize = 50;
  pageNumber = 1;
  numberOfData: number;
  searchQuery: string = '';
  tableData: any[];
  tableData2: any[];
  tableData3: any[];
  tableData4: any[];

  @ViewChild('paginator') paginator: Paginator;

  selectedColumns: any[] = [];
  columns = [
    { value: 'category', name: 'Category Name' },
    { value: 'name', name: 'Name' },
    { value: 'code', name: 'Code' },
    { value: 'codePercent', name: 'Code Percent' },
    { value: 'isActive', name: 'Is Active' },
  ];

  selectedColumns2: any[] = [];
  columns2 = [
    { value: 'id', name: 'Id' },
    { value: 'category', name: 'Category Name' },
    { value: 'name', name: 'Name' },
    { value: 'code', name: 'Code' },
    { value: 'isActive', name: 'Is Active' },
  ];

  selectedColumns3: any[] = [];
  columns3 = [
    { value: 'category', name: 'Category Name' },
    { value: 'name', name: 'Name' },
    { value: 'code', name: 'Code' },
    { value: 'codePercent', name: 'Code Percent' },
    { value: 'isActive', name: 'Is Active' },
  ];

  selectedColumns4: any[] = [];
  columns4 = [
    { value: 'category', name: 'Category Name' },
    { value: 'name', name: 'Name' },
    { value: 'minimimCharge', name: 'Minimum Charge' },
    { value: 'code', name: 'Code' },
    { value: 'codePercent', name: 'Code Percent' },
    { value: 'isActive', name: 'Is Active' },
  ];

  constructor(
    public translate: TranslateService,
    private dataService: DataService,
    private formService: FormService,
    private deleteService: DeleteService
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
    this.formService.tabPage.next(this.tabView);
    this.selectedColumns = [...this.columns];
    this.selectedColumns2 = [...this.columns2];
    this.selectedColumns3 = [...this.columns3];
    this.selectedColumns4 = [...this.columns4];
    this.getShipData();
    this.getOvertimeData();
    this.getBoatData();
    this.getCraneData();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  getShipData() {
    this.dataService.getAllShipsServices().subscribe(
      (response) => {
        this.tableData = response;
      },
      (error) => {}
    );
  }
  getOvertimeData() {
    this.dataService.getAllOvertimeServices().subscribe((response) => {
      this.tableData2 = response;
    });
  }

  getBoatData() {
    this.dataService.getAllBoatServices().subscribe((response) => {
      this.tableData3 = response;
    });
  }

  getCraneData() {
    this.dataService.getAllCraneServices().subscribe((response) => {
      this.tableData4 = response;
    });
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
      .subscribe((x) => {
        if (x === 'refresh') {
          if (this.tabView === 'ship') {
            this.getShipData();
          }
          if (this.tabView === 'overtime') {
            this.getOvertimeData();
          }

          if (this.tabView === 'boat') {
            this.getBoatData();
          }

          if (this.tabView === 'crane') {
            this.getCraneData();
          }
        }
      });
  }

  destroySubscriptions() {
    this.refreshSubscriber$.unsubscribe();
  }

  optionsClicked(item: any) {
    this.objToSend = item;
    this.initializeForm(
      'shipServicesForm',
      this.translate.instant('Ship Services'),
      true
    );
  }

  optionsClicked2(item: any) {
    this.objToSend = item;
    this.initializeForm(
      'overtimeServicesForm',
      this.translate.instant('Overtime Services'),
      true
    );
  }

  optionsClicked3(item: any) {
    this.objToSend = item;
    this.initializeForm(
      'boatServicesForm',
      this.translate.instant('Boat Services'),
      true
    );
  }

  optionsClicked4(item: any) {
    this.objToSend = item;
    this.initializeForm(
      'craneServicesForm',
      this.translate.instant('Crane Services'),
      true
    );
  }

  selectedTab(tab1, tab2, tab3, tab4): any {
    if (tab1) {
      this.tabView = 'ship';
    }
    if (tab2) {
      this.tabView = 'overtime';
    }
    if (tab3) {
      this.tabView = 'boat';
    }
    if (tab4) {
      this.tabView = 'crane';
    }
    this.formService.tabPage.next(this.tabView);
  }
}
