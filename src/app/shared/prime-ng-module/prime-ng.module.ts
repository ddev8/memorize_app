import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    TableModule,
    ProgressBarModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    DataViewModule,
    ToastModule,
  ],
  exports: [
    TableModule,
    MenubarModule,
    ProgressBarModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    DataViewModule,
    ConfirmDialogModule,
    ToastModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ]
})
export class PrimeNgModule { }
