import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { TranslateModule } from "@ngx-translate/core";
import { MatInputModule } from "@angular/material/input";
import { DatePickerFormControlComponent } from "./date-picker-form-control.component";

@NgModule({
  declarations: [DatePickerFormControlComponent],
  imports: [
    MatDialogModule,
    TranslateModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatIconModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  entryComponents: [DatePickerFormControlComponent],
  exports: [DatePickerFormControlComponent],
})
export class DatePickerFormControlModule {}
