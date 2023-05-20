import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { languages } from './common-models/language.model';
import { getLanguage, setLanguage } from './utils/webstorage.util';
import { AppConfigService } from './common-services/app-config.service';
import { loadMessages, locale } from 'devextreme/localization';
import { registerLocaleData } from '@angular/common';
import dxSkMessages from '../assets/i18n/dx/sk.json';
import localeSk from '@angular/common/locales/sk';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    languages = languages;
    private config = AppConfigService.settings;

    constructor(
        private translate: TranslateService
    ) {
        const langCodes = languages.map(l => l.code);
        this.translate.addLangs(langCodes);
        // check if language was selected
        let lang = getLanguage();
        if (lang === null) {
            // if not, set language according to browser
            lang = navigator?.language?.slice(0, 2);
        }
        // if language is not supported, then set default lang from config
        if (!langCodes.includes(lang)) {
            lang = this.config.defaultLanguage;
        }
        setLanguage(lang);
        this.translate.use(lang);
        this.translate.setDefaultLang(lang);
        registerLocaleData(localeSk, 'sk');
        loadMessages(dxSkMessages);
        locale(lang);
    }
}