import { NgModule } from "@angular/core";
import { ConfirmService } from "src/app/shared/services/confirm-dialog.service";
import { DataGridComponent } from "./data-grid.component";
import { DxDataGridModule } from "devextreme-angular";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
  declarations: [DataGridComponent],
  imports: [DxDataGridModule, TranslateModule],
  entryComponents: [DataGridComponent],
  exports: [DataGridComponent],
  providers: [ConfirmService],
})
export class DataGridModule {}
