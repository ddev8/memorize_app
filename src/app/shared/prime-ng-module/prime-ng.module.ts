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
import { MenuModule } from 'primeng/menu';
import { AvatarModule } from 'primeng/avatar';
import {BadgeModule} from 'primeng/badge';
import {SkeletonModule} from 'primeng/skeleton';


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
    MenuModule,
    AvatarModule,
    BadgeModule,
    SkeletonModule,
  ],
  exports: [
    TableModule,
    MenubarModule,
    MenuModule,
    ProgressBarModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    DataViewModule,
    ConfirmDialogModule,
    ToastModule,
    AvatarModule,
    BadgeModule,
    SkeletonModule,
  ],
  providers: [
    ConfirmationService,
    MessageService,
  ]
})
export class PrimeNgModule { }
