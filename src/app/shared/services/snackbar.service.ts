import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({ providedIn: "root" })
export class SnackbarService {
  constructor(
    private translate: TranslateService,
    private _snackBar: MatSnackBar
  ) {}

  showErrorSnackBar(message?: string): void {
    const text = message ?? this.translate.instant("unexpectedError");
    this._snackBar.open(text, "x");
  }

  showSuccessSnackBar(message?: string): void {
    const text = message ?? this.translate.instant("requestSucesfull");
    this._snackBar.open(text, "x", {
      panelClass: ["success-snackbar"],
    });
  }
}
