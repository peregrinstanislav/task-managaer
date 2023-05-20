import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-dialog-buttons",
  templateUrl: "./dialog-buttons.component.html",
  styleUrls: ["./dialog-buttons.component.scss"],
})
export class DialogButtonsComponent {
  @Input() btnYesTitle = "Yes";
  @Input() btnNoTitle = "No";
  @Input() btnYesDisabled = false;

  @Output() btnClick$ = new EventEmitter<boolean>();

  closeDialog(result: boolean): void {
    this.btnClick$.emit(result);
  }
}
