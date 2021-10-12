import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-user-loggings',
  templateUrl: './user-loggings.component.html',
  styleUrls: ['./user-loggings.component.scss']
})
export class UserLoggingsComponent implements OnInit {

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
  searchQuery2: string = '';
  tableData: any[];
  @ViewChild('paginator') paginator: Paginator;
  
  selectedColumns: any[] = [];
  columns = [
    { value: 'level', name: 'Level' },
    { value: 'logged', name: 'Time' },
    { value: 'message', name: 'Message' },
    { value: 'type', name: 'Type' },
    { value: 'user', name: 'User' },
    { value: 'ip', name: 'IP' },
    { value: 'userAgent', name: 'User Agent' },
  ];
  
  dropdownOptions = [
    {
      label: this.translate.instant('Level'),
      items: [
        { name: this.translate.instant('All'), value: '' },
        { name: this.translate.instant('Warn'), value: 'Warn' },
        { name: this.translate.instant('Error'), value: 'Error' },
        { name: this.translate.instant('Info'), value: 'Info' },
      ],
    },
  ];
  selectedDropdownOption: any = {
    name: this.translate.instant('All'),
    value: '',
  };

  
  dropdownOptions2 = [
    {
      label: this.translate.instant('Type'),
      items: [
        { name: this.translate.instant('All'), value: '' },
        { name: this.translate.instant('Staff'), value: 'Staff' },
        { name: this.translate.instant('Currency'), value: 'Currency' },
        { name: this.translate.instant('Ship'), value: 'Ship' },
        { name: this.translate.instant('Crane'), value: 'Crane' },
        { name: this.translate.instant('Payments'), value: 'Payments' },
        { name: this.translate.instant('Inquiry'), value: 'Inquiry' },
        { name: this.translate.instant('Transaction'), value: 'Transaction' },
      ],
    },
  ];
  selectedDropdownOption2: any = {
    name: this.translate.instant('All'),
    value: '',
  };

  dateRanges: any = [new Date(2021, 0, 1), new Date()];
  
  optionsMenu: MenuItem[] = [
    // {
    //   items: [
    //     {
    //       label: this.translate.instant('Details'),
    //       icon: 'pi pi-pencil',
    //       command: () => {
    //         this.initializeForm(
    //           'agencyDetailsForm',
    //           this.translate.instant('Agency Details'),
    //           true
    //         );
    //       },
    //     },
    //     {
    //       label: this.translate.instant('Delete'),
    //       icon: 'pi pi-trash',
    //       command: () => {
    //         this.objToSend.isDeleted = true;
    //         this.deleteService.openDeleteConfirmation(
    //           this.objToSend.name,
    //           this.dataService.updateAgency(this.objToSend)
    //         );
    //       },
    //     },
    //   ],
    // },
  ];
  
  constructor(
    public translate: TranslateService,
    private dataService: DataService,
    private formService: FormService,
    private deleteService: DeleteService
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
  
  dropdownChange() {
    this.getData();
  }
  
  dateSelection() {
    // console.log(this.dateRanges);
    this.getData();
  }
  
  getData() {
    this.dataService
      .getLogging(
        this.dateRanges[0]
          ? this.dateRanges[0].toISOString().split('T')[0]
          : '',
        this.dateRanges[1]
          ? this.dateRanges[1].toISOString().split('T')[0]
          : '',
          this.searchQuery,
          this.selectedDropdownOption.value,
          this.selectedDropdownOption2.value,
          this.searchQuery2,
          this.pageNumber,
          this.pageSize

        // this.searchQuery,
        // this.selectedDropdownOption.value,
        // this.pageNumber,
        // this.pageSize
      )
      .subscribe(
        (response) => {
          this.tableData = response.logList;
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
  
  }
  