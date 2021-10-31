import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ProgressBarModule,
    InputTextModule,
    CardModule,
    ButtonModule,
  ],
  exports: [
    TableModule,
    MenubarModule,
    ProgressBarModule,
    InputTextModule,
    CardModule,
    ButtonModule
  ]
})
export class PrimeNgModule { }
