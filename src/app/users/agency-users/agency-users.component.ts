import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/services/data/data.service';

@Component({
  selector: 'app-agency-users',
  templateUrl: './agency-users.component.html',
  styleUrls: ['./agency-users.component.scss'],
})
export class AgencyUsersComponent implements OnInit {
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
          command: () => {},
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
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.selectedColumns = [...this.columns];
    this.getData();
  }

  selection() {
    // console.log(this.selectedColumns.includes(this.columns[0]));
    // console.log(this.selectedColumns);
  }

  dropdownChange() {
    console.log(this.selectedDropdownOption);
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
          console.log(response);
          this.tableData = response.agencyList;
          // this.dataSource.data = response.agencyList;
          // this.isSearchLoading = false;
          this.numberOfData = response.pagingInfo.totalCount;
        },
        (error) => {
          // this.isSearchLoading = false;
        }
      );
  }

  pageChange(event: any) {
    this.pageNumber = event.page + 1;
    this.getData();
  }

}
