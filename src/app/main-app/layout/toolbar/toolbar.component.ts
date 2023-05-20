import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { locale } from "devextreme/localization";
import { languages } from "src/app/shared/models/language.model";
import { getLanguage, setLanguage } from "src/app/utils/webstorage.util";

@Component({
  selector: "app-toolbar",
  templateUrl: "./toolbar.component.html",
})
export class ToolbarComponent {
  selectedLanguageCode: string | null = "";
  languages = languages;

  constructor(private translate: TranslateService) {
    this.selectedLanguageCode = getLanguage();
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    setLanguage(lang.code);
    this.translate.setDefaultLang(lang.code);
    this.selectedLanguageCode = lang.code;
    locale(lang.code);
  }
}
