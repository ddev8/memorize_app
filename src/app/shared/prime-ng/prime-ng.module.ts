import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';
import { MenubarModule } from 'primeng/menubar';
import {ProgressBarModule} from 'primeng/progressbar';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ProgressBarModule
  ],
  exports: [
    TableModule,
    MenubarModule,
    ProgressBarModule
  ]
})
export class PrimeNgModule { }
