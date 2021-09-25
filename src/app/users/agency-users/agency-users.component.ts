import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';
import { FormService } from 'src/app/services/form-service/form.service';

@Component({
  selector: 'app-agency-users',
  templateUrl: './agency-users.component.html',
  styleUrls: ['./agency-users.component.scss'],
})
export class AgencyUsersComponent implements OnInit {
  // Form Variables
  formName: string = '';
  dialogHeader: string = '';
  displayDialog: boolean = false;
  objToSend: any = null;

  pageSize = 50;
  pageNumber = 1;
  numberOfData: number;
  searchQuery: string = '';
  tableData: any[];

  selectedColumns: any[] = [];
  columns = [
    { value: 'name', name: 'Name' },
    { value: 'agencyType', name: 'Agency Type' },
    { value: 'telephone', name: 'Telephone' },
    { value: 'country', name: 'Country' },
    { value: 'webLink', name: 'Web Link' },
    { value: 'email', name: 'Email' },
    { value: 'isInsured', name: 'Is Insured' },
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
  dateRanges: any;

  optionsMenu: MenuItem[] = [
    {
      items: [
        {
          label: this.translate.instant('Details'),
          icon: 'pi pi-pencil',
          command: () => {
            this.initializeForm(
              'agencyDetailsForm',
              this.translate.instant('Agency Details'),
              true
            );
          },
        },
        {
          label: this.translate.instant('Delete'),
          icon: 'pi pi-trash',
          command: () => {},
        },
      ],
    },
  ];

  constructor(
    public translate: TranslateService,
    private dataService: DataService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    this.selectedColumns = [...this.columns];
    this.getData();
  }

  selection() {}

  dropdownChange() {
    this.getData();
  }

  dateSelection() {
    console.log(this.dateRanges);
  }

  getData() {
    this.dataService
      .getAllAgencies(
        this.searchQuery,
        this.selectedDropdownOption.value,
        this.pageNumber,
        this.pageSize
      )
      .subscribe(
        (response) => {
          this.tableData = response.agencyList;
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
      if (event.keyCode === 13) this.getData();
    } else {
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
}
