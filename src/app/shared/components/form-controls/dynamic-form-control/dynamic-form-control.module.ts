import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DynamicFormControlComponent } from "./dynamic-form-control.component";
import { InputFormControlModule } from "../input-form-control/input-form-control.module";
import { DatePickerFormControlModule } from "../date-picker-form-control/date-picker-form.module";

@NgModule({
  declarations: [DynamicFormControlComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputFormControlModule,
    DatePickerFormControlModule,
  ],
  entryComponents: [DynamicFormControlComponent],
  exports: [DynamicFormControlComponent],
})
export class DynamicFormControlModule {}
