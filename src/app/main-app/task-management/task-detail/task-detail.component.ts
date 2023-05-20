import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskType } from '../models/task-management.model';
import { JsonForm, JsonFormControls } from 'src/app/common-models/form-controls.model';
import { JsonFormLoaderService } from 'src/app/common-services/form-json.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

    selectedTask!: Task;
    selectedType: TaskType;
    jsonForm: JsonForm = JsonFormLoaderService.settings;
    jsonFormControls: JsonFormControls[] = [];
    formGroup: FormGroup;
    isEditForm = false;

    constructor(
        private dialogRef: MatDialogRef<TaskDetailComponent>,
        @Inject(MAT_DIALOG_DATA) private data: { update: boolean, data: any },
        private formBuilder: FormBuilder
    ) {
        this.formGroup = formBuilder.group({});
        this.isEditForm = data.update;
        if (data.update) {
            this.selectedTask = data.data;
            this.selectedType = data.data.type;
        } else {
            this.selectedType = data.data;
        }
    }

    ngOnInit(): void {
        this.createForm();
    }

    private createForm(): void {
        const formType = this.jsonForm.forms.find(f => f.key === this.selectedType);
        if (formType) {
            for (const formControlName of formType.values) {
                const control = this.jsonForm.formControls.find(control => control.name === formControlName);
                if (control) {
                    this.jsonFormControls.push(control);
                    const validators = this.createValidators(control);
                    let value = this.selectedTask ? (this.selectedTask as any)[formControlName] : '';
                    if (!value && this.selectedTask) {
                        value = this.selectedTask.fields[formControlName];
                    }
                    this.formGroup.addControl(control.name, this.formBuilder.control(value, validators));
                }
            }
        }
    }

    private createValidators(control: JsonFormControls): any {
        const validatorsToAdd = [];
        for (const [key, value] of Object.entries(control.validators)) {
            switch (key) {
                case 'min':
                    validatorsToAdd.push(Validators.min(value));
                    break;
                case 'max':
                    validatorsToAdd.push(Validators.max(value));
                    break;
                case 'required':
                    if (value) {
                        validatorsToAdd.push(Validators.required);
                    }
                    break;
                case 'requiredTrue':
                    if (value) {
                        validatorsToAdd.push(Validators.requiredTrue);
                    }
                    break;
                case 'email':
                    if (value) {
                        validatorsToAdd.push(Validators.email);
                    }
                    break;
                case 'minLength':
                    validatorsToAdd.push(Validators.minLength(value));
                    break;
                case 'maxLength':
                    validatorsToAdd.push(Validators.maxLength(value));
                    break;
                case 'pattern':
                    validatorsToAdd.push(Validators.pattern(value));
                    break;
                case 'nullValidator':
                    if (value) {
                        validatorsToAdd.push(Validators.nullValidator);
                    }
                    break;
                default:
                    break;
            }
        }
        return validatorsToAdd;
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }

    onSaveClick(): void {
        const task = {
            _id: this.selectedTask?._id ?? undefined,
            type: this.selectedType,
            name: this.formGroup.value.name,
            fields: {}
        };
        for (const value of this.jsonFormControls) {
            if (value.name !== 'name') {
                const control = this.jsonForm.formControls.find(c => c.name === value.name);
                if (control && control.type === 'number') {
                    (task.fields as any)[value.name] = Number(this.formGroup.value[value.name]);
                } else {
                    (task.fields as any)[value.name] = this.formGroup.value[value.name];
                }
            }
        }
        this.dialogRef.close({ update: this.isEditForm, task });
    }
}
