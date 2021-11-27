import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

import { TForm } from '../shared/forms/helper';
import { MemorizationService } from '../shared/memorization.service';
import { MemorizeItem } from '../shared/memorize/memorize.model';


type FormModel = {
  text: string;
  description: string;
};

@Component({
  selector: 'app-text-memorization',
  templateUrl: './text-memorization.component.html',
  styleUrls: ['./text-memorization.component.scss'],
})
export class TextMemorizationComponent implements OnInit {
  public itemForm: TForm<FormModel>;
  public editMode: boolean = false;

  public memorizeItems: MemorizeItem[] = [];
  private itemBeingEdited: MemorizeItem | undefined = undefined;

  constructor(
    private readonly fb: FormBuilder,
    private readonly memorizeService: MemorizationService,
    private readonly confirmationService: ConfirmationService,
  ) {
    this.itemForm = this.fb.group({
      text: this.fb.control({ value: "", disabled: false }, [Validators.required]),
      description: this.fb.control({ value: "", disabled: false }, [Validators.required]),
    }) as TForm<FormModel>;
  }

  ngOnInit(): void {
    this.memorizeService.getMemorizeItems().subscribe({
      next: (items: MemorizeItem[]) => {
        this.memorizeItems = items;
      }
    });
  }

  public createItem(): void {
    const formValue: FormModel = <FormModel>this.itemForm.value;
    this.memorizeService.createItem(formValue);
  }

  public editItem(memorizeItem: MemorizeItem): void {
    this.editMode = true;
    this.itemBeingEdited = memorizeItem;
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

    this.memorizeService.updateItem(this.itemBeingEdited);
    this.editMode = false;
    this.itemBeingEdited = undefined;
    this.itemForm.reset();
  }

  public removeItem(memorizeItem: MemorizeItem): void {
    this.confirm('Delete item?', () => {
      this.memorizeService.deleteItem(memorizeItem);
    })
  }

  public confirm(msg: string, cb: () => void): void {
    this.confirmationService.confirm({
      message: msg,
      accept: cb
    });
  }
}
