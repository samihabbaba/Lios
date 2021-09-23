import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agency-users',
  templateUrl: './agency-users.component.html',
  styleUrls: ['./agency-users.component.scss']
})
export class AgencyUsersComponent implements OnInit {
  selectedCities2: any[];
  cities = [
    {name: 'New York', code: 'NY'},
    {name: 'Rome', code: 'RM'},
    {name: 'London', code: 'LDN'},
    {name: 'Istanbul', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
];

  constructor() { }

  ngOnInit(): void {
  }

  selection() {
    console.log(this.selectedCities2)
  }
}
