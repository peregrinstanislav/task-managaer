import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { JsonFormControls } from 'src/app/shared/models/form-controls.model';

@Component({
  selector: 'app-date-picker-form-control',
  templateUrl: './date-picker-form-control.component.html',
  styleUrls: ['./date-picker-form-control.component.scss']
})
export class DatePickerFormControlComponent {

  @Input() control!: JsonFormControls;
  @Input() form!: FormGroup;

}
