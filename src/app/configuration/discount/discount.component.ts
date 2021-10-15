import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit {
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
  @ViewChild('paginator') paginator: Paginator;

  selectedColumns: any[] = [];
  columns = [
    { value: 'id', name: 'Id' },
    { value: 'serviceName', name: 'Service Name' },
    { value: 'condition', name: 'Condition' },
    { value: 'percent', name: 'Percent' },
    { value: 'explanation', name: 'Explanation' },
    { value: 'isFlag', name: 'Is Flag' },
    { value: 'isIdle', name: 'Is Idle' },
    { value: 'isShip', name: 'Is Ship' },
  ];

  constructor(
    public translate: TranslateService,
    private dataService: DataService,
    private formService: FormService,
    private deleteService: DeleteService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadSubscriptions();
    this.formService.tabPage.next(this.tabView);
    this.selectedColumns = [...this.columns];
    this.getShipData();
    this.getOvertimeData();
  }

  ngOnDestroy(): void {
    this.destroySubscriptions();
  }

  selection() {}

  getShipData() {
    this.dataService.getAllShipsDiscounts().subscribe(
      (response) => {
        this.tableData = response;
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
  getOvertimeData() {
    this.dataService.getAllOvertimeDiscounts().subscribe((response) => {
      this.tableData2 = response;
    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Bir hata oluştu.',
      });
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
        }
      });
  }

  destroySubscriptions() {
    this.refreshSubscriber$.unsubscribe();
  }

  optionsClicked(item: any) {
    this.objToSend = item;
    this.initializeForm(
      'shipDiscountForm',
      this.translate.instant('Ship Discount'),
      true
    );
  }

  optionsClicked2(item: any) {
    this.objToSend = item;
    this.initializeForm(
      'overtimeDiscountForm',
      this.translate.instant('Overtime Discount'),
      true
    );
  }

  selectedTab(tab1, tab2): any {
    if (tab1) {
      this.tabView = 'ship';
    }
    if (tab2) {
      this.tabView = 'overtime';
    }
    this.formService.tabPage.next(this.tabView);
  }
}
