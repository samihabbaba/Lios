import { HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { DataService } from 'src/app/services/data/data.service';
import { TranslationService } from 'src/app/services/translation/translation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() visibleSidebar: EventEmitter<any> = new EventEmitter();
  languages: MenuItem[];
  flag: string = '../../../assets/flags/226-united-states.svg';

  constructor(
    private translationService: TranslationService,
    public router: Router,
    private dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('language') === 'en') {
      this.flag = '../../../assets/flags/226-united-states.svg';
    }
    if (localStorage.getItem('language') === 'tr') {
      this.flag = '../../../assets/flags/006-turkey.svg';
    }

    this.languages = [
      {
        items: [
          {
            label: 'English',
            // icon: 'pi pi-slack',
            command: () => {
              this.changeLanguage('en');
              this.flag = '../../../assets/flags/226-united-states.svg';
            },
          },
          {
            label: 'Türkçe',
            // icon: 'pi pi-slack',
            command: () => {
              this.changeLanguage('tr');
              this.flag = '../../../assets/flags/006-turkey.svg';
            },
          },
        ],
      },
    ];
  }

  changeLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    // this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
  }

  breadcrumbConverter() {
    let url: string = this.router.url
      .substr(1)
      .replace(/\//g, '  /  ')
      .replace(/\-/g, ' ');
    return url;
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.decodedToken = null;
    this.dataService.currentUser = {};
    this.dataService.httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ',
      }),
    };
    this.authService.currentUser = null;
    location.reload();
    this.router.navigate(['/auth/login']);
  }
}
