import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JsonFormControls } from "src/app/shared/models/form-controls.model";

@Component({
  selector: "app-dynamic-form-control",
  templateUrl: "./dynamic-form-control.component.html",
  styleUrls: ["./dynamic-form-control.component.scss"],
})
export class DynamicFormControlComponent {
  @Input() control!: JsonFormControls;
  @Input() form!: FormGroup;
}
