import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmService } from 'src/app/common-services/confirm-dialog.service';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@NgModule({
    declarations: [
        ConfirmDialogComponent
    ],
    imports: [
        MatDialogModule,
        MatButtonModule,
        FlexLayoutModule,
        CommonModule
    ],
    entryComponents: [
        ConfirmDialogComponent
    ],
    exports: [
        ConfirmDialogComponent
    ],
    providers: [
        ConfirmService
    ]
})
export class ConfirmDialogModule
{
}
