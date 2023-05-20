import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AppConfig } from "../models/config.model";
import { environment } from "src/environments/environment";
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AppConfigService {
  public settings!: AppConfig;

  constructor(private http: HttpClient) {}

  load(): Promise<AppConfig> {
    const jsonFile = `assets/config/config.${environment.name}.json`;
    return new Promise<AppConfig>((resolve, reject) => {
      lastValueFrom(this.http.get(jsonFile))
        .then((response: any) => {
          this.settings = response as AppConfig;
          resolve(this.settings);
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }
}
