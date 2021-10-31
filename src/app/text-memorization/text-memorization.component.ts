import { Component, OnInit } from '@angular/core';

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

  public columns: TableColumn[] = [
    { field: "id", header: "ID" },
    { field: "value", header: "Value" },
    { field: "description", header: "Description" },
    { field: "progress", header: "Progress" },
  ];
  public rows: TableRow[] = [
    { id: 1, value: "Mock text", description: "test", progress: 0 }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
