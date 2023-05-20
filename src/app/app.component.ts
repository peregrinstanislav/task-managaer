import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { languages } from "./shared/models/language.model";
import { getLanguage, setLanguage } from "./utils/webstorage.util";
import { AppConfigService } from "./shared/services/app-config.service";
import { locale } from "devextreme/localization";
import { registerLocaleData } from "@angular/common";
import localeSk from "@angular/common/locales/sk";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  constructor(
    private translate: TranslateService,
    appConfig: AppConfigService
  ) {
    const langCodes = languages.map((l) => l.code);
    this.translate.addLangs(langCodes);
    let lang = getLanguage();
    if (lang === null) {
      lang = navigator?.language?.slice(0, 2);
    }
    if (!langCodes.includes(lang)) {
      lang = appConfig.settings.defaultLanguage;
    }
    setLanguage(lang);
    this.translate.use(lang);
    this.translate.setDefaultLang(lang);
    registerLocaleData(localeSk, "sk");
    locale(lang);
  }
}
