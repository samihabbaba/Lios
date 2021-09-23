import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
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
    public router: Router
  ) {}

  ngOnInit(): void {
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
            label: 'Turkish',
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
}
