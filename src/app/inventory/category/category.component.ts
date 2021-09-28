import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';
import { DeleteService } from 'src/app/services/delete-service/delete.service';
import { Subscription } from 'rxjs';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
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
    { value: 'id', name: 'Id' },
    { value: 'name', name: 'Name' },
    { value: 'description', name: 'Description' },
    { value: 'orderNo', name: 'Order No' },
    { value: 'groupId', name: 'Group Id' },
    { value: 'groupName', name: 'Group Name' },
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
              'categoryDetailsForm',
              this.translate.instant('Category Details'),
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
              this.dataService.updateCategory(this.objToSend)
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

  getData() {
    this.dataService.getAllCategories(this.searchQuery).subscribe(
      (response) => {
        this.tableData = response;
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
        // this.paginator.changePageToFirst(event);
        this.getData();
      }
    } else {
      // this.paginator.changePageToFirst(event);
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
