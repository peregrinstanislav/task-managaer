import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import {
  Column,
  FocusedRowChangingEvent,
  RowClickEvent,
  ToolbarPreparingEvent,
} from "devextreme/ui/data_grid";
import { cloneDeep } from "lodash";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-data-grid",
  templateUrl: "./data-grid.component.html",
})
export class DataGridComponent implements OnInit {
  columnCaptions: (string | undefined)[] = [];
  rowDeselectionRaised = false;
  columns: Column[] = [
    {
      type: "buttons",
      buttons: [
        {
          name: "edit",
          icon: "edit",
          onClick: (event: any): void =>
            this.editClick.emit({ update: true, data: event.row.data }),
        },
        {
          name: "delete",
          icon: "trash",
          onClick: (event: any): void =>
            this.deleteClick.emit(event.row.data.id),
        },
      ],
    },
  ];

  @Input() dataSource: any;
  @Input() dataColumns: Column[] = [];

  @Output() refreshClick = new EventEmitter<void>();
  @Output() addNewClick = new EventEmitter<void>();
  @Output() editClick = new EventEmitter<any>();
  @Output() deleteClick = new EventEmitter<string>();

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.columns = [...this.dataColumns, ...this.columns];
    this.columnCaptions = cloneDeep(this.dataColumns.map((c) => c.caption));
    this.setTranslatedCaptions();
    this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe(() => {
      this.setTranslatedCaptions();
    });
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
        this.onAddNewItemClick();
      };
      // add refresh button into toolbar
      const refresh = cloneDeep(event.toolbarOptions.items[0]);
      refresh.name = "refreshButton";
      refresh.options.hint = "Refresh";
      refresh.options.icon = "refresh";
      refresh.options.text = "Refresh";
      refresh.options.onClick = (): void => {
        this.refreshClick.emit();
      };
      event.toolbarOptions.items.splice(1, 0, refresh);
    }
  }

  onAddNewItemClick(): void {
    this.addNewClick.emit();
  }

  private setTranslatedCaptions(): void {
    for (const [index, caption] of this.columnCaptions.entries()) {
      if (caption) {
        this.columns[index].caption = this.translate.instant(caption);
      }
    }
  }
}
