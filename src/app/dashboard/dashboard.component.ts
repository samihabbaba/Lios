import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { UpdateCurrencyComponent } from '../dialogs/update-currency/update-currency.component';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('currencyDialog') currencyDiaglog: UpdateCurrencyComponent;
  data: any;
  data2: any;
  dashboardData: any;
  chartOptions: any;
  displayCurrencyDialog: boolean = false;

  constructor(
    public dataService: DataService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.checkCurrencyIfUpdated();
    this.initializeDashbaord();
  }

  checkCurrencyIfUpdated() {
    this.dataService.checkCurrency().subscribe((resp) => {
      if (!resp) {
        this.displayCurrencyDialog = true;
        // document.getElementById('currencyBtn').click();
      }
    });
  }

  initializeDashbaord() {
    this.dataService.getDashboard().subscribe((data) => {
      this.dashboardData = data;
      this.data = {
        labels: [
          this.translate.instant('Departure Ships'),
          this.translate.instant('Arrival Ships'),
          this.translate.instant('Local Ships'),
        ],
        datasets: [
          {
            data: [
              this.dashboardData.departureShips,
              this.dashboardData.arrivalShips,
              this.dashboardData.localShips,
            ],
            backgroundColor: ['#00D0DE', '#FC6161', '#0F8BFD'],
            hoverBackgroundColor: ['#00D0DE', '#FC6161', '#0F8BFD'],
          },
        ],
      };

      this.data2 = {
        labels: [
          this.translate.instant('Magusa Port Ships'),
          this.translate.instant('Girne Port Ships'),
        ],
        datasets: [
          {
            data: [
              this.dashboardData.magusaPortShip,
              this.dashboardData.girnePortShip,
            ],
            backgroundColor: ['#00D0DE', '#FC6161'],
            hoverBackgroundColor: ['#00D0DE', '#FC6161'],
          },
        ],
      };
    });
  }
}
