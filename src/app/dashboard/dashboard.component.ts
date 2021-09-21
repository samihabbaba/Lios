import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  data: any;
  chartOptions: any;


  constructor() {}

  ngOnInit() {
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ['#00D0DE', '#FC6161', '#0F8BFD'],
          hoverBackgroundColor: ['#00D0DE', '#FC6161', '#0F8BFD'],
        },
      ],
    };

    // this.config = this.configService.config;
    // this.updateChartOptions();
    // this.subscription = this.configService.configUpdate$.subscribe((config) => {
    //   this.config = config;
    //   this.updateChartOptions();
    // });
  }
}
