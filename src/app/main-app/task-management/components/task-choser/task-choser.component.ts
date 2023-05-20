import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { JsonFormService } from "src/app/shared/services/json-form.service";

@Component({
  selector: "app-task-choser",
  templateUrl: "./task-choser.component.html",
  styleUrls: ["./task-choser.component.scss"],
})
export class TaskChoserComponent {
  taskTypes: string[];

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<TaskChoserComponent>,
    jsonFormService: JsonFormService
  ) {
    this.taskTypes = jsonFormService.getFormTypes();
    this.form = new FormGroup({
      taskType: new FormControl("", [Validators.required]),
    });
  }

  selectionChanged(button: any): void {
    setTimeout(() => {
      button.focus();
    });
  }

  onBtnClick(result: boolean): void {
    if (result) {
      this.dialogRef.close({ selectedType: this.form.value.taskType });
    } else {
      this.dialogRef.close();
    }
  }
}
