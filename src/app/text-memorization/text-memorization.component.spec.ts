import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { PrimeNgModule } from '../shared/prime-ng/prime-ng.module';

import { TextMemorizationComponent } from './text-memorization.component';

describe('TextMemorizationComponent', () => {
  let component: TextMemorizationComponent;
  let fixture: ComponentFixture<TextMemorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextMemorizationComponent ],
      imports: [TableModule, FormsModule, ReactiveFormsModule, PrimeNgModule]
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
      const tableEl: DebugElement = fixture.debugElement.query(By.css('#memorize-table'));
      const column: HTMLTableCellElement | null = (<HTMLElement>tableEl.nativeElement).querySelector('th');
      expect(column).not.toBeNull();
    })

    it('Should render rows', () => {
      const tableEl: DebugElement = fixture.debugElement.query(By.css('#memorize-table'));
      const cell: HTMLTableCellElement | null = (<HTMLElement>tableEl.nativeElement).querySelector('td');
      expect(cell).not.toBeNull();
    })
  })

  describe('Input', () => {
    it('Should render value', () => {
      const inputValue: DebugElement = fixture.debugElement.query(By.css('.new-item__value'));
      expect(inputValue).toBeTruthy();
    })
    it('Should render description', () => {
      const descriptionValue: DebugElement = fixture.debugElement.query(By.css('.new-item__description'));
      expect(descriptionValue).toBeTruthy();
    })
    it('Should render \'Memorize\' button', () => {
      const memorizeBtn: DebugElement = fixture.debugElement.query(By.css('.new-item__save'));
      expect(memorizeBtn.nativeElement.innerText).toContain("Memorize!");
      expect(memorizeBtn).toBeTruthy();
    })
    it('Should call saveItem method', fakeAsync(() => {
      spyOn(component, "saveItem");

      const inputValue: DebugElement = fixture.debugElement.query(By.css('.new-item__value'));
      inputValue.nativeElement.value = "Testing value";
      fixture.detectChanges();
      const form: DebugElement = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      tick();
      fixture.detectChanges();
      expect(component.saveItem).toHaveBeenCalled();
    }))

  })
});
