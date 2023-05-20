import { APP_INITIALIZER, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppConfigService } from "./shared/services/app-config.service";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { HttpInterceptorService } from "./shared/services/http-interceptor.service";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LayoutModule } from "./main-app/layout/layout.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { JsonFormService } from "./shared/services/json-form.service";

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, "./assets/i18n/");
}

export function initializeApp(
  appConfigService: AppConfigService,
  jsonFormService: JsonFormService
): any {
  return (): Promise<any> => {
    const appConfigPromise = appConfigService.load();
    const jsonFormPromise = jsonFormService.loadJsonForm();
    return Promise.all([appConfigPromise, jsonFormPromise]);
  };
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfigService, JsonFormService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
