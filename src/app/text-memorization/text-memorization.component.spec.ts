import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { PrimeNgModule } from '../shared/prime-ng-module/prime-ng.module';

import { TextMemorizationComponent } from './text-memorization.component';

describe('TextMemorizationComponent', () => {
  let component: TextMemorizationComponent;
  let fixture: ComponentFixture<TextMemorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextMemorizationComponent ],
      imports: [TableModule, FormsModule, ReactiveFormsModule, PrimeNgModule, BrowserAnimationsModule]
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
      expect(memorizeBtn).toBeTruthy();
    })
    it('Should call saveItem method', fakeAsync(() => {
      spyOn(component, "createItem");

      const inputValue: DebugElement = fixture.debugElement.query(By.css('.new-item__value'));
      inputValue.nativeElement.value = "Testing value";
      fixture.detectChanges();
      const form: DebugElement = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      tick();
      fixture.detectChanges();
      expect(component.createItem).toHaveBeenCalled();
    }))

  })

  describe('Methods', () => {
    it('Should save new item', () => {
      // component.memorizeItems = [];
      // component.itemForm.patchValue( { text: "TextMock", description: "DescrMock" });
      // component.createItem();
      // expect(component.memorizeItems.length).toBeGreaterThan(0);
      // expect(component.memorizeItems[0]).toEqual({
      //   id: 0,
      //   text: "TextMock",
      //   description: "DescrMock",
      //   progress: 0,
      // });
    })
  })
});
