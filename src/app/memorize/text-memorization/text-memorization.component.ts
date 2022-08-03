import { ViewportScroller } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';

import { TForm } from '../../shared/forms/helper';
import { MemorizationService } from '../shared/services/memorization.service';
import { MemorizeItem } from '../shared/models/memorize.model';
import { ActionsSubject, Store } from '@ngrx/store';

// import { loadMemorizeItems, getMemorizeItems, addMemorizeItem } from '../state';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  createMemorizeItem,
  createMemorizeItemFailure,
  createMemorizeItemSuccess,
  deleteMemorizeItem,
  deleteMemorizeItemFailure,
  loadItems,
  selectMemorizeItems,
  updateMemorizeItem,
  updateMemorizeItemFailure,
  updateMemorizeItemSuccess,
} from '../store';
import { ofType } from '@ngrx/effects';
import { first } from 'rxjs/operators';

type FormModel = {
  text: string;
  description: string;
};

@Component({
  selector: 'app-text-memorization',
  templateUrl: './text-memorization.component.html',
  styleUrls: ['./text-memorization.component.scss'],
})
export class TextMemorizationComponent implements OnInit, OnDestroy {
  public itemForm: TForm<FormModel>;
  public editMode: boolean = false;

  public memorizeItems: MemorizeItem[] = [];
  public memorizeItems$: Observable<MemorizeItem[]>;
  private itemBeingEdited: MemorizeItem | undefined = undefined;

  private readonly subscriptions: Subscription = new Subscription();

  constructor(
    private readonly fb: FormBuilder,
    private readonly memorizeService: MemorizationService,
    private readonly confirmationService: ConfirmationService,
    private readonly messageService: MessageService,
    private readonly authService: AuthService,
    private readonly scroller: ViewportScroller,
    private store: Store,
    private actionsSubj: ActionsSubject
  ) {
    this.store.dispatch(loadItems());
    this.memorizeItems$ = this.store.select(selectMemorizeItems);
    this.itemForm = this.fb.group({
      text: this.fb.control({ value: '', disabled: false }, [Validators.required]),
      description: this.fb.control({ value: '', disabled: false }, [Validators.required]),
    }) as TForm<FormModel>;
  }

  public ngOnInit(): void {
    this.subscriptions.add(
      this.actionsSubj
        .pipe(ofType(deleteMemorizeItemFailure, createMemorizeItemFailure, updateMemorizeItemFailure))
        .subscribe((payload) => {
          this.showToastError(payload.error);
        })
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public createItem(): void {
    const formValue: FormModel = <FormModel>this.itemForm.value;

    this.store.dispatch(createMemorizeItem({ item: formValue }));
    this.subscriptions.add(
      this.actionsSubj.pipe(ofType(createMemorizeItemSuccess), first()).subscribe(() => this.itemForm.reset())
    );
  }

  public editItem(memorizeItem: MemorizeItem): void {
    this.scroller.scrollToAnchor('memorize-form');
    this.editMode = true;
    this.itemBeingEdited = new MemorizeItem(memorizeItem.toPlainObj());
    this.itemForm.patchValue({
      text: memorizeItem.getText(),
      description: memorizeItem.getDescription(),
    });
  }

  public updateItem(): void {
    if (this.itemBeingEdited === undefined) {
      throw Error('No item to update');
    }
    const formValue: FormModel = <FormModel>this.itemForm.value;
    this.itemBeingEdited.setDescription(formValue.description);
    this.itemBeingEdited.setText(formValue.text);

    this.store.dispatch(updateMemorizeItem({ item: this.itemBeingEdited }));
    this.subscriptions.add(
      this.actionsSubj.pipe(ofType(updateMemorizeItemSuccess), first()).subscribe(() => this.clearUpdatingForm())
    );
  }

  public removeItem(memorizeItem: MemorizeItem): void {
    this.confirm('Delete item?', () => {
      this.store.dispatch(deleteMemorizeItem({ item: memorizeItem }));
    });
  }

  public clearUpdatingForm(): void {
    this.editMode = false;
    this.itemBeingEdited = undefined;
    this.itemForm.reset();
  }

  public confirm(msg: string, cb: () => void): void {
    this.confirmationService.confirm({
      message: msg,
      accept: cb,
    });
  }

  private showToastError(error: string): void {
    this.messageService.add({ severity: 'error', summary: 'Submit error', detail: error });
  }
}
