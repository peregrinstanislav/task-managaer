import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Task } from "../../models/task-management.model";
import { JsonFormControls } from "src/app/shared/models/form-controls.model";
import { JsonFormService } from "src/app/shared/services/json-form.service";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
})
export class TaskDetailComponent implements OnInit {
  selectedTask!: Task;
  selectedType: string;

  jsonFormControls: JsonFormControls[] = [];
  formGroup!: FormGroup;

  isEditForm = false;

  constructor(
    private dialogRef: MatDialogRef<TaskDetailComponent>,
    @Inject(MAT_DIALOG_DATA) data: { update: boolean; data: any },
    private formBuilder: FormBuilder,
    private jsonFormService: JsonFormService
  ) {
    this.isEditForm = data.update;
    if (data.update) {
      this.selectedTask = data.data;
      this.selectedType = data.data.type;
    } else {
      this.selectedType = data.data;
    }
  }

  ngOnInit(): void {
    this.jsonFormControls = this.jsonFormService.getFormControls(
      this.selectedType
    );
    this.formGroup = this.jsonFormService.createForm(
      this.jsonFormControls,
      this.selectedTask,
      this.formBuilder
    );
  }

  onBtnClick(result: boolean): void {
    if (result) {
      this.onSaveClick();
    } else {
      this.dialogRef.close();
    }
  }

  private onSaveClick(): void {
    const task = this.jsonFormService.getFormData(
      this.jsonFormControls,
      this.formGroup,
      {
        id: this.selectedTask?.id ?? undefined,
        type: this.selectedType,
      }
    );
    this.dialogRef.close({ update: this.isEditForm, task });
  }
}
