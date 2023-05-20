import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

export interface IConfirmOptions {
  title: string;
  message: string;
  btnYesTitle: string;
  btnNoTitle: string;
  width?: string;
}

@Component({
  selector: "app-confirm-dialog",
  templateUrl: "./confirm-dialog.component.html",
  styleUrls: ["./confirm-dialog.component.scss"],
})
export class ConfirmDialogComponent {
  public dialogData: IConfirmOptions = {
    title: "Confirm",
    message: "Click Yes or No",
    btnYesTitle: "Yes",
    btnNoTitle: "No",
  };

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IConfirmOptions
  ) {
    if (data) {
      this.dialogData.title = data.title;
      this.dialogData.message = data.message;
      this.dialogData.btnYesTitle = data.btnYesTitle;
      this.dialogData.btnNoTitle = data.btnNoTitle;
    }
  }

  closeDialog(result: boolean): void {
    this.dialogRef.close(result);
  }
}
