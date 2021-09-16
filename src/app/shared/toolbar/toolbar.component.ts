import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Output() visibleSidebar: EventEmitter<any> =  new EventEmitter();

  languages: MenuItem[];

  constructor() {}

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
    // this.messageService.add({severity:'success', summary:'Success', detail:'Data Updated'});
  }
}
