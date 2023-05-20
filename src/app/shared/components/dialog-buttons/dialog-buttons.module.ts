import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { ConfirmService } from "src/app/shared/services/confirm-dialog.service";
import { DialogButtonsComponent } from "./dialog-buttons.component";

@NgModule({
  declarations: [DialogButtonsComponent],
  imports: [MatButtonModule, FlexLayoutModule, CommonModule],
  entryComponents: [DialogButtonsComponent],
  exports: [DialogButtonsComponent],
  providers: [ConfirmService],
})
export class DialogButtonsModule {}
