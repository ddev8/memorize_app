import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TForm } from '../shared/forms/helper';


type MemorizeItem = {
  id: number;
  text: string;
  description: string;
  progress: number;
};

type FormModel = {
  text: string;
  description: string;
};

@Component({
  selector: 'app-text-memorization',
  templateUrl: './text-memorization.component.html',
  styleUrls: ['./text-memorization.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class TextMemorizationComponent implements OnInit {
  public newItemForm: TForm<FormModel>;

  public memorizeItems: MemorizeItem[] = [
    { id: 1, text: "take a nap", description: "короткий сон", progress: 35 },
    { id: 2, text: "Mock text", description: "test", progress: 35 },
    { id: 3, text: "Mock text", description: "test", progress: 35 },
    { id: 4, text: "Mock text", description: "test", progress: 35 },
    { id: 4, text: "Mock text", description: "test", progress: 35 },
    { id: 4, text: "Mock text", description: "test", progress: 35 },
    { id: 4, text: "Mock text", description: "test", progress: 35 },
    { id: 4, text: "Mock text", description: "", progress: 35 },
    { id: 4, text: "Mock text", description: "", progress: 35 },
    { id: 4, text: "Mock text", description: "", progress: 35 },
    { id: 4, text: "Mock text", description: "", progress: 35 },
  ]
  constructor(
    private readonly fb: FormBuilder,
  ) {
    this.newItemForm = this.fb.group({
      text: this.fb.control({ value: "", disabled: false }, [Validators.required]),
      description: this.fb.control({ value: "", disabled: false }),
    }) as TForm<FormModel>;
  }

  ngOnInit(): void {
  }

  public saveItem(): void {
    this.newItemForm.value
    const formValue: FormModel = <FormModel>this.newItemForm.value
    // this.rows.push({
    //   id: this.rows[this.rows.length - 1].id + 1,
    //   value: formValue.value,
    //   description: formValue.description,
    //   progress: 0
    // });
  }
}
