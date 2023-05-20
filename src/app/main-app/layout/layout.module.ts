import { NgModule } from "@angular/core";
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { CommonModule } from "@angular/common";
import { TranslateModule } from "@ngx-translate/core";
import { SpinnerComponent } from "./spinner/spinner.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";

@NgModule({
  imports: [
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  exports: [ToolbarComponent, SpinnerComponent],
  declarations: [ToolbarComponent, SpinnerComponent],
  providers: [],
})
export class LayoutModule {}
