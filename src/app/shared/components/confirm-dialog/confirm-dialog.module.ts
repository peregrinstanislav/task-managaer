import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmService } from "src/app/shared/services/confirm-dialog.service";
import { ConfirmDialogComponent } from "./confirm-dialog.component";
import { DialogButtonsModule } from "../dialog-buttons/dialog-buttons.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    CommonModule,
    DialogButtonsModule,
    FormsModule,
  ],
  entryComponents: [ConfirmDialogComponent],
  exports: [ConfirmDialogComponent],
  providers: [ConfirmService],
})
export class ConfirmDialogModule {}
