import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireAuth, AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DataViewModule } from 'primeng/dataview';
import { ProgressBarModule } from 'primeng/progressbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { environment } from '../../../environments/environment';

import { AngularFireAuthMock } from '../../core/mocks/firebase-auth.mock';

import { AngularFireDatabaseMock } from '../shared/mocks/firestore.mock';

import { TextMemorizationComponent } from './text-memorization.component';

describe('TextMemorizationComponent', () => {
  let component: TextMemorizationComponent;
  let fixture: ComponentFixture<TextMemorizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextMemorizationComponent],
      imports: [
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        AngularFireAuthModule,
        RouterTestingModule,
        // PrimeNG
        CardModule,
        DataViewModule,
        ProgressBarModule,
        ConfirmDialogModule,
        ToastModule,
        SkeletonModule,
      ],
      providers: [
        { provide: AngularFirestore, useClass: AngularFireDatabaseMock },
        { provide: USE_AUTH_EMULATOR, useValue: environment.emulator ? ['http://localhost:9099'] : undefined },
        { provide: AngularFireAuth, useClass: AngularFireAuthMock },
        ConfirmationService,
        MessageService,
      ],
    }).compileComponents();
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
      const inputValue: DebugElement = fixture.debugElement.query(By.css('.item-form__value'));
      expect(inputValue).toBeTruthy();
    });
    it('Should render description', () => {
      const descriptionValue: DebugElement = fixture.debugElement.query(By.css('.item-form__description'));
      expect(descriptionValue).toBeTruthy();
    });
    it("Should render 'Memorize' button", () => {
      const memorizeBtn: DebugElement = fixture.debugElement.query(By.css('.item-form__save'));
      expect(memorizeBtn).toBeTruthy();
    });
    it('Should call saveItem method', fakeAsync(() => {
      spyOn(component, 'createItem');

      const inputValue: DebugElement = fixture.debugElement.query(By.css('.item-form__value'));
      inputValue.nativeElement.value = 'Testing value';
      fixture.detectChanges();
      const form: DebugElement = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('submit', null);
      tick();
      fixture.detectChanges();
      expect(component.createItem).toHaveBeenCalled();
    }));
  });

  describe('Methods', () => {
    it('Should save new item', () => {
      component.memorizeItems = [];
      component.itemForm.patchValue({ text: 'TextMock', description: 'DescrMock' });
      component.createItem();
      fixture.detectChanges();
      expect(component.memorizeItems[1].getText()).toEqual('TextMock');
    });
  });
});
