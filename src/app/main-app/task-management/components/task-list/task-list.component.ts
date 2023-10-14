import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Task } from "../../models/task-management.model";
import { Column } from "devextreme/ui/data_grid";
import { MatDialog } from "@angular/material/dialog";
import { TaskChoserComponent } from "../task-choser/task-choser.component";
import { ConfirmService } from "src/app/shared/services/confirm-dialog.service";
import { Observable, take } from "rxjs";
import { TaskDetailComponent } from "../task-detail/task-detail.component";
import { TaskManagementStore } from "../../store/task-management.store";
import {
  calculateFilterExpression,
  calculateFilterExpressionOfTranslatedValue,
  calculateSortValue,
} from "src/app/utils/misc.util";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
  providers: [TaskManagementStore],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  taskColumns: Column[] = [
    {
      dataField: "name",
      caption: "taskManagement.dataGrid.name",
      calculateSortValue: (data: any): any => calculateSortValue(data, "name"),
      calculateFilterExpression: (
        filterValue: any,
        selectedFilterOperation: any
      ): any =>
        calculateFilterExpression(filterValue, selectedFilterOperation, "name"),
    },
    {
      dataField: "type",
      caption: "taskManagement.dataGrid.type",
      cellTemplate: "typeCell",
      calculateSortValue: (data: any): any => calculateSortValue(data, "type"),
      calculateFilterExpression: (
        filterValue: any,
        selectedFilterOperation: any
      ): any =>
        calculateFilterExpressionOfTranslatedValue(
          this.translate,
          "taskManagement.taskTypes.",
          filterValue,
          selectedFilterOperation,
          "type"
        ),
    },
  ];

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog,
    private confirmService: ConfirmService,
    private taskManagementStore: TaskManagementStore
  ) {
    this.tasks$ = this.taskManagementStore.tasks$;
  }

  ngOnInit(): void {
    this.taskManagementStore.fetch();
  }

  onRefreshClick(): void {
    this.taskManagementStore.fetch();
  }

  onAddNewTaskClick(): void {
    this.dialog
      .open(TaskChoserComponent, {
        autoFocus: true,
        width: "300px",
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result?.selectedType) {
          this.openTaskDetail({ update: false, data: result.selectedType });
        }
      });
  }

  onEditClick(event: any): void {
    this.openTaskDetail({ update: true, data: event.data });
  }

  onDeleteClick(event: any): void {
    this.confirmService
      .openConfirmDialog({
        title: this.translate.instant("taskManagement.dataGrid.deleteTitle"),
        message: this.translate.instant(
          "taskManagement.dataGrid.deleteMessage"
        ),
        btnYesTitle: this.translate.instant("buttons.yesButton"),
        btnNoTitle: this.translate.instant("buttons.noButton"),
        width: "300px",
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((result: boolean) => {
        if (result) {
          this.taskManagementStore.delete(event);
        }
      });
  }

  private openTaskDetail(payload: any): void {
    this.dialog
      .open(TaskDetailComponent, {
        autoFocus: true,
        disableClose: true,
        data: payload,
        width: "300px",
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((result) => {
        if (result) {
          if (result.update) {
            this.taskManagementStore.update(result.task);
          } else {
            this.taskManagementStore.insert(result.task);
          }
        }
      });
  }
}
