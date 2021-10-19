import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pay-ship',
  templateUrl: './pay-ship.component.html',
  styleUrls: ['./pay-ship.component.scss']
})
export class PayShipComponent implements OnInit {

  @Input() formName: any;

  constructor() { }

  ngOnInit(): void {
  }

}
