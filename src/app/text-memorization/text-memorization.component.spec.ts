import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';

import { TextMemorizationComponent } from './text-memorization.component';

describe('TextMemorizationComponent', () => {
  let component: TextMemorizationComponent;
  let fixture: ComponentFixture<TextMemorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextMemorizationComponent ],
      imports: [TableModule, ProgressBarModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextMemorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Table', () => {
    it('Rows should\'t be empty', () => {
      const rows = component.rows;
      expect(rows.length).toBeGreaterThan(0);
    })

    it('Should render columns', () => {
      const table_el: DebugElement = fixture.debugElement.query(By.css('#memorize-table'));
      const column: HTMLTableCellElement | null = (<HTMLElement>table_el.nativeElement).querySelector('th');
      expect(column).not.toBeNull();
    })

    it('Should render rows', () => {
      const table_el: DebugElement = fixture.debugElement.query(By.css('#memorize-table'));
      const cell: HTMLTableCellElement | null = (<HTMLElement>table_el.nativeElement).querySelector('td');
      expect(cell).not.toBeNull();
    })
  })
});
