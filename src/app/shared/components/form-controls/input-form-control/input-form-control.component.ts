import { Component, Input } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { JsonFormControls } from "src/app/shared/models/form-controls.model";

@Component({
  selector: "app-input-form-control",
  templateUrl: "./input-form-control.component.html",
  styleUrls: ["./input-form-control.component.scss"],
})
export class InputFormControlComponent {
  @Input() control!: JsonFormControls;
  @Input() form!: FormGroup;
}
