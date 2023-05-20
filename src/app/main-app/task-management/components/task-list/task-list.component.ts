import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Task } from "../../models/task-management.model";
import {
  FocusedRowChangingEvent,
  RowClickEvent,
  ToolbarPreparingEvent,
} from "devextreme/ui/data_grid";
import {
  calculateFilterExpression,
  calculateFilterExpressionOfTranslatedValue,
  calculateSortValue,
} from "src/app/utils/misc.util";
import { TasksService } from "../../services/tasks.service";
import { cloneDeep } from "lodash";
import { MatDialog } from "@angular/material/dialog";
import { TaskChoserComponent } from "../task-choser/task-choser.component";
import { ConfirmService } from "src/app/shared/services/confirm-dialog.service";
import { Observable, take } from "rxjs";
import { TaskDetailComponent } from "../task-detail/task-detail.component";
import { TaskManagementStore } from "../../store/task-management.store";

@Component({
  selector: "app-task-list",
  templateUrl: "./task-list.component.html",
  styleUrls: ["./task-list.component.scss"],
  providers: [TaskManagementStore],
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;
  rowDeselectionRaised = false;

  constructor(
    private translate: TranslateService,
    private tasksService: TasksService,
    public dialog: MatDialog,
    private confirmService: ConfirmService,
    private taskManagementStore: TaskManagementStore
  ) {
    this.tasks$ = this.taskManagementStore.tasks$;
  }

  ngOnInit(): void {
    this.taskManagementStore.fetch();
  }

  onFocusedRowChanging(event: FocusedRowChangingEvent): void {
    if (event.newRowIndex === event.prevRowIndex) {
      this.rowDeselectionRaised = true;
    }
  }

  onRowClick(event: RowClickEvent): void {
    if (this.rowDeselectionRaised) {
      event.component.instance().option("focusedRowIndex", -1);
    }
    this.rowDeselectionRaised = false;
  }

  onToolbarPreparing(event: ToolbarPreparingEvent): void {
    if (event.toolbarOptions.items) {
      event.toolbarOptions.items[0].options.onClick = (): void => {
        this.onAddNewTaskClick();
      };
      // add refresh button into toolbar
      const refresh = cloneDeep(event.toolbarOptions.items[0]);
      refresh.name = "refreshButton";
      refresh.options.hint = "Refresh";
      refresh.options.icon = "refresh";
      refresh.options.text = "Refresh";
      refresh.options.onClick = (): void => {
        this.taskManagementStore.fetch();
      };
      event.toolbarOptions.items.splice(1, 0, refresh);
    }
  }

  calculateFilterExprName = (
    filterValue: any,
    selectedFilterOperation: any
  ): any => {
    return calculateFilterExpression(
      filterValue,
      selectedFilterOperation,
      "name"
    );
  };

  calculateFilterExprType = (
    filterValue: any,
    selectedFilterOperation: any
  ): any => {
    return calculateFilterExpressionOfTranslatedValue(
      this.translate,
      "taskManagement.taskTypes.",
      filterValue,
      selectedFilterOperation,
      "type"
    );
  };

  calculateSortValueName = (data: any): any => {
    return calculateSortValue(data, "name");
  };

  calculateSortValueType = (data: any): any => {
    return calculateSortValue(data, "type");
  };

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

  onEditClick = (event: any): void => {
    this.openTaskDetail({ update: true, data: event.row.data });
  };

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

  onDeleteClick = (event: any): void => {
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
          const id = event.row.data.id;
          this.taskManagementStore.delete(id);
        }
      });
  };
}
