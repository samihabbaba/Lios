import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslationService } from 'src/app/services/translation/translation.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() visibleSidebar: EventEmitter<any> =  new EventEmitter();

  languages: MenuItem[];

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.languages = [
      {
        items: [
          {
            label: 'English',
            icon: 'pi pi-slack',
            command: () => {
              this.changeLanguage();
            },
          },
          {
            label: 'Turkish',
            icon: 'pi pi-slack',
            command: () => {
              this.changeLanguage();
            },
          },
        ],
      },
    ];
  }

  changeLanguage() {

    this.translationService.setLanguage('tr')
    // this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
  }
}
