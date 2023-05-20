import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonForm } from '../common-models/form-controls.model';
import { lastValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class JsonFormLoaderService {

    static settings: JsonForm;

    constructor(private httpClient: HttpClient) { }

    loadJsonForm(): Promise<JsonForm> {
        const jsonFile = `assets/form.json`;
        return new Promise<JsonForm>((resolve, reject) => {
            lastValueFrom(this.httpClient.get(jsonFile))
                .then((response: any) => {
                    JsonFormLoaderService.settings = (response as JsonForm);
                    resolve(JsonFormLoaderService.settings);
                })
                .catch((response: any) => {
                    reject(`Could not load form json '${jsonFile}': ${JSON.stringify(response)}`);
                });
        });
    }

}