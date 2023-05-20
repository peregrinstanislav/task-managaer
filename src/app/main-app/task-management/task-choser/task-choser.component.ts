import { Component, ElementRef } from '@angular/core';
import { TaskType } from '../models/task-management.model';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-task-choser',
    templateUrl: './task-choser.component.html',
    styleUrls: ['./task-choser.component.scss']
})
export class TaskChoserComponent {

    taskTypes: string[];

    form: FormGroup;

    constructor(private dialogRef: MatDialogRef<TaskChoserComponent>) {
        this.taskTypes = Object.values(TaskType);
        this.form = new FormGroup({
            taskType: new FormControl('', [Validators.required])
        });
    }

    selectionChanged(button: any): void {
        setTimeout(() => {
            button.focus();
        });
    }

    onChooseClick(): void {
        this.dialogRef.close({ selectedType: this.form.value.taskType });
    }

    onCancelClick(): void {
        this.dialogRef.close();
    }
}
