import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { ProgressBarModule } from 'primeng/progressbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { SkeletonModule } from 'primeng/skeleton';
import { ButtonModule } from 'primeng/button';

import { SharedModule } from '../shared/shared.module';

import { TextMemorizationComponent } from './text-memorization/text-memorization.component';
import { MemorizationService } from './shared/services/memorization.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { EffectsModule } from '@ngrx/effects';
import {
  CreateMemorizeItemEffects,
  DeleteMemorizeItemEffects,
  LoadItemsEffects,
  UpdateMemorizeItemEffects,
} from './store';

@NgModule({
  declarations: [TextMemorizationComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    // PrimeNG
    CardModule,
    ButtonModule,
    InputTextModule,
    DataViewModule,
    ProgressBarModule,
    ConfirmDialogModule,
    ToastModule,
    SkeletonModule,
    EffectsModule.forFeature([
      LoadItemsEffects,
      CreateMemorizeItemEffects,
      UpdateMemorizeItemEffects,
      DeleteMemorizeItemEffects,
    ]),
  ],
  providers: [MemorizationService, ConfirmationService, MessageService],
  exports: [TextMemorizationComponent],
})
export class MemorizeModule {}
