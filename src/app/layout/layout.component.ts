import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from '../services/data/data.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  visibleSidebar: boolean;

  dollarRate = { name: 'd', rate: 0 };
  euroRate = { name: 'e', rate: 0 };
  poundRate = { name: 'p', rate: 0 };
  currencyIds: any[] = [];

  isLoading = false;
  fail = false;
  Success = false;

  constructor(
    private messageService: MessageService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.loadCurrency();
  }

  toggleSidebar() {
    this.visibleSidebar = !this.visibleSidebar;
  }

  loadCurrency() {
    this.dataService.getAllCurrencies().subscribe((response) => {
      this.currencyIds = [];
      for (let c of response) {
        if (c.symbol === '£') {
          this.poundRate.rate = c.rate;
          this.currencyIds.push({ name: 'p', id: c.id, rate: c.rate });
        } else if (c.symbol === '€') {
          this.euroRate.rate = c.rate;
          this.currencyIds.push({ name: 'e', id: c.id, rate: c.rate });
        } else if (c.symbol === '$') {
          this.dollarRate.rate = c.rate;
          this.currencyIds.push({ name: 'd', id: c.id, rate: c.rate });
        }
      }
    });
  }

  updateCurrency(currency) {
    const id = this.currencyIds.filter((x) => x.name === currency.name)[0].id;

    this.fail = false;
    this.Success = false;
    this.isLoading = true;

    this.dataService.updateCurrency(id, currency.rate).subscribe(
      (response) => {
        this.Success = true;
        this.loadCurrency();
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Kur başarı ile güncellendi',
        });
      },
      (error) => {
        this.fail = true;
        currency.rate = this.currencyIds.filter(
          (x) => x.name === currency.name
        )[0].rate;
        this.isLoading = false;
        this.messageService.add({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Bir hata oluştu',
        });
      }
    );
  }
}
