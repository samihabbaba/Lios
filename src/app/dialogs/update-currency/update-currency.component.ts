import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-currency',
  templateUrl: './update-currency.component.html',
  styleUrls: ['./update-currency.component.scss'],
})
export class UpdateCurrencyComponent implements OnInit {
  @Input() display: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  openDialog() {
    this.display = true;
  }
}
