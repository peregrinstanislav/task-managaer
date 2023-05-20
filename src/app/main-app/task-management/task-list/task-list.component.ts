import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Task, TaskType } from '../models/task-management.model';
import { DxDataGridComponent } from 'devextreme-angular';
import { FocusedRowChangingEvent, RowClickEvent, ToolbarPreparingEvent } from 'devextreme/ui/data_grid';
import { calculateFilterExpression, calculateFilterExpressionOfTranslatedValue, calculateSortValue } from 'src/app/utils/misc.util';
import { TasksService } from '../services/tasks.service';
import { Worker } from '../classes/worker.class';
import { cloneDeep } from 'lodash';
import { MatDialog } from '@angular/material/dialog';
import { TaskChoserComponent } from '../task-choser/task-choser.component';
import { ConfirmService } from 'src/app/common-services/confirm-dialog.service';
import { take } from 'rxjs';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

    taskType = TaskType;
    worker: Worker<Task>;

    // devextreme konf
    focusedRowKey = -1;
    hoveredRowKey = -1;
    rowDeselectionRaised = false;

    @ViewChild('dxTable') dxTable!: DxDataGridComponent;

    constructor(
        private translate: TranslateService,
        private tasksService: TasksService,
        public dialog: MatDialog,
        private confirmService: ConfirmService
    ) {
        this.worker = new Worker<Task>();
    }

    ngOnInit(): void {
        this.worker.fetch(this.tasksService.getTasks());
    }

    // methods for configuring devextreme datagrid
    onFocusedRowChanging(event: FocusedRowChangingEvent): void {
        if (event.newRowIndex === event.prevRowIndex) {
            this.rowDeselectionRaised = true;
        }
    }

    onRowClick(event: RowClickEvent): void {
        if (this.rowDeselectionRaised) {
            event.component.instance().option('focusedRowIndex', -1);
        }
        this.rowDeselectionRaised = false;
    }

    onToolbarPreparing(event: ToolbarPreparingEvent): void {
        if (event.toolbarOptions.items) {
            event.toolbarOptions.items[0].options.onClick = (): void => {
                this.onAddNewTaskClick();
            };
            const refresh = cloneDeep(event.toolbarOptions.items[0]);
            refresh.name = 'refreshButton';
            refresh.options.hint = 'Refresh';
            refresh.options.icon = 'refresh';
            refresh.options.text = 'Refresh';
            refresh.options.onClick = (): void => {
                this.worker.fetch(this.tasksService.getTasks());
            };
            event.toolbarOptions.items.splice(1, 0, refresh);
        }
    }

    calculateFilterExprName = (filterValue: any, selectedFilterOperation: any): any => {
        return calculateFilterExpression(filterValue, selectedFilterOperation, 'name');
    };

    calculateFilterExprType = (filterValue: any, selectedFilterOperation: any): any => {
        return calculateFilterExpressionOfTranslatedValue(this.translate, 'taskManagement.taskTypes.', filterValue, selectedFilterOperation, 'type');
    };

    calculateSortValueName = (data: any): any => {
        return calculateSortValue(data, 'name');
    };

    calculateSortValueType = (data: any): any => {
        return calculateSortValue(data, 'type');
    };
    // end of methods for configuring devextreme datagrid

    onAddNewTaskClick(): void {
        this.dialog.open(TaskChoserComponent, {
            autoFocus: true,
            data: {},
            width: '300px'
        }).afterClosed().pipe(take(1)).subscribe(result => {
            if (result?.selectedType) {
                this.openTaskDetail({ update: false, data: result.selectedType });
            }
        });
    }

    onEditClick = (event: any): void => {
        this.openTaskDetail({ update: true, data: event.row.data });
    };

    private openTaskDetail(payload: any): void {
        this.dialog.open(TaskDetailComponent, {
            autoFocus: true,
            disableClose: true,
            data: payload,
            width: '300px'
        }).afterClosed().pipe(take(1)).subscribe(result => {
            if (result) {
                if (result.update) {
                    this.worker.update(this.tasksService.updateTask(result.task));
                } else {
                    this.worker.insert(this.tasksService.insertTask(result.task));
                }
            }
        });
    }

    onDeleteClick = (event: any): void => {
        this.confirmService.openConfirmDialog({
            title: this.translate.instant('taskManagement.dataGrid.deleteTitle'),
            message: this.translate.instant('taskManagement.dataGrid.deleteMessage'),
            btnYesTitle: this.translate.instant('buttons.yesButton'),
            btnNoTitle: this.translate.instant('buttons.noButton'),
            width: '300px'
        }).afterClosed().pipe(take(1)).subscribe((result: boolean) => {
            if (result) {
                const id = event.row.data._id;
                this.worker.delete(this.tasksService.deleteTask(id), id);
            }
        });
    };
}
