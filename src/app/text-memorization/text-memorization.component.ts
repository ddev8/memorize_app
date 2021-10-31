import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type TableColumn = {
  field: string;
  header: string;
};

type TableRow = {
  id: number;
  value: string;
  description: string;
  progress: number;
};

@Component({
  selector: 'app-text-memorization',
  templateUrl: './text-memorization.component.html',
  styleUrls: ['./text-memorization.component.scss']
})
export class TextMemorizationComponent implements OnInit {
  public newItemForm: FormGroup;

  public columns: TableColumn[] = [
    { field: "id", header: "ID" },
    { field: "value", header: "Value" },
    { field: "description", header: "Description" },
    { field: "progress", header: "Progress" },
  ];
  public rows: TableRow[] = [
    { id: 1, value: "Mock text", description: "test", progress: 0 }
  ]
  constructor(
    private readonly fb: FormBuilder,
  ) {
    this.newItemForm = this.fb.group({
      value: this.fb.control({ value: "", disabled: false }, [ Validators.required ]),
      description: this.fb.control({ value: "", disabled: false }),
    })
  }

  ngOnInit(): void {
  }

  public saveItem(): void {
    console.log(this.newItemForm.value);
    const formValue: any = this.newItemForm.value;
    this.rows.push({ id: this.rows[this.rows.length - 1].id + 1, value: formValue.value, description: formValue.description, progress: 0 });
  }
}
