import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-local-users',
  templateUrl: './local-users.component.html',
  styleUrls: ['./local-users.component.scss'],
})
export class LocalUsersComponent implements OnInit {
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
    { value: 'userName', name: 'Username' },
    { value: 'name', name: 'Name' },
    { value: 'systemId', name: 'System Id' },
    { value: 'email', name: 'Email' },
    { value: 'department', name: 'Department' },
    { value: 'country', name: 'Country' },
    { value: 'bloodType', name: 'Blood Type' },
    { value: 'staffType', name: 'Staff Type' },
    { value: 'isTransfer', name: 'Is Transfer' },
    { value: 'transferTime', name: 'Transfer Time' },
    { value: 'isLogin', name: 'Is Login' },
  ];

  dateRanges: any;

  optionsMenu: MenuItem[] = [
    {
      items: [
        {
          label: this.translate.instant('Details'),
          icon: 'pi pi-pencil',
          command: () => {
            this.initializeForm(
              'localDetailsForm',
              this.translate.instant('Local Details'),
              true
            );
          },
        },

        {
          label: this.translate.instant('Change Password'),
          icon: 'pi pi-lock',
          command: () => {
            this.initializeForm(
              'localPasswordForm',
              this.translate.instant('Local Password'),
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
              this.dataService.updateStaff(this.objToSend)
            );
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
      .getAllStaffs(this.searchQuery, this.pageNumber, this.pageSize)
      .subscribe(
        (response) => {
          this.tableData = response.staffList;
          this.numberOfData = response.pagingInfo.totalCount;
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
