import { Injectable } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {
  ConfirmDialogComponent,
  IConfirmOptions,
} from "../components/confirm-dialog/confirm-dialog.component";

@Injectable({
  providedIn: "root",
})
export class ConfirmService {
  constructor(private dialog: MatDialog) {}

  openConfirmDialog(
    options: IConfirmOptions
  ): MatDialogRef<ConfirmDialogComponent> {
    return this.dialog.open(ConfirmDialogComponent, {
      autoFocus: true,
      data: options,
      width: options.width ? options.width : "500px",
    });
  }
}
