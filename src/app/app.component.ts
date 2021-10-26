import { Component } from '@angular/core';

// Language
import { locale as enLang } from './core/_config/i18n/en';
import { locale as trLang } from './core/_config/i18n/tr';

import { TranslationService } from './services/translation/translation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Lios-v3';

  constructor(private translationService: TranslationService) {
    this.translationService.loadTranslations(enLang, trLang);
    if (localStorage.getItem('language') === 'en') {
      this.translationService.setLanguage('en');
    }
    if (localStorage.getItem('language') === 'tr') {
      this.translationService.setLanguage('tr');
    }
    if (!localStorage.getItem('language')) {
      this.translationService.setLanguage('en');
    }
  }
}
