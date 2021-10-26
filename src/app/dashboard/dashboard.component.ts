import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UpdateCurrencyComponent } from '../dialogs/update-currency/update-currency.component';
import { DataService } from '../services/data/data.service';
import { PrimeIcons } from 'primeng/api';

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
  displayDevelopers: boolean = false;

  invoices = [
    {
      status: this.translate.instant('Invoices Amount'),
      amount: '',
      icon: PrimeIcons.WALLET,
      color: 'rgb(15, 139, 253)',
    },
    {
      status: this.translate.instant('Invoice Paid Amount'),
      amount: '',
      icon: PrimeIcons.DOLLAR,
      color: 'rgb(11, 209, 138)',
    },
    {
      status: this.translate.instant('Invoices Due Amount'),
      amount: '',
      icon: PrimeIcons.CALENDAR_TIMES,
      color: 'rgb(252, 97, 97)',
    },
  ];

  constructor(
    public dataService: DataService,
    private translate: TranslateService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.checkCurrencyIfUpdated();
    this.initializeDashbaord();
  }

  checkCurrencyIfUpdated() {
    this.dataService.checkCurrency().subscribe(
      (resp) => {
        if (!resp) {
          this.displayCurrencyDialog = true;
          // document.getElementById('currencyBtn').click();
        }
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

  initializeDashbaord() {
    this.dataService.getDashboard().subscribe(
      (data) => {
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
              backgroundColor: ['#00D0DE', '#0F8BFD'],
              hoverBackgroundColor: ['#00D0DE', '#0F8BFD'],
            },
          ],
        };
        this.invoices[0].amount = this.dashboardData.invoicesAmount;
        this.invoices[1].amount = this.dashboardData.invoicesPaidAmount;
        this.invoices[2].amount = this.dashboardData.invoicesDueAmount;
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
}
