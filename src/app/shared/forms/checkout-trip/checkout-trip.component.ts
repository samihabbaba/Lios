import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout-trip',
  templateUrl: './checkout-trip.component.html',
  styleUrls: ['./checkout-trip.component.scss']
})
export class CheckoutTripComponent implements OnInit {

  @Input() formName: any;

  constructor() { }

  ngOnInit(): void {
  }

}
