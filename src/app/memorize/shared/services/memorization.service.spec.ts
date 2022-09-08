// Main problem with testing the firestore is that I can't import data in a runtime.
// https://github.com/firebase/firebase-tools/issues/2297

import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFirestore,
  AngularFirestoreModule,
  USE_EMULATOR as FIRESTORE_EMULATOR,
} from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { MemorizationService } from './memorization.service';
import { MemorizeItem, MemorizePlainObject } from '../models/memorize.model';
import { AngularFireDatabaseMock, memorize_list, USER_UID } from '../mocks/firestore.mock';
import { first } from 'rxjs/operators';

let fs: AngularFirestore;

describe('MemorizationService', () => {
  let service: MemorizationService;
  let mockItem: MemorizeItem;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig), AngularFirestoreModule],
      providers: [
        // { provide: FIRESTORE_EMULATOR, useValue: environment.production ? undefined : ['localhost', 8080]} // Use emulator for development mode and testing.
        { provide: AngularFirestore, useClass: AngularFireDatabaseMock }, // Use emulator for development mode and testing.
      ],
    });
    service = TestBed.inject(MemorizationService);
    mockItem = new MemorizeItem(memorize_list[0]);
    fs = TestBed.inject(AngularFirestore);
  });

  afterEach(() => {
    (<any>fs).restore();
  });

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get items', () => {
    it('Should get items from db', async () => {
      service
        .getMemorizeItems(USER_UID)
        .pipe(first())
        .subscribe({
          next: (value) => {
            expect(value[0]).toEqual(mockItem.toPlainObj());
          },
        });
    });
  });

  describe('Create item', () => {
    it('Should create item', async () => {
      service
        .createItem(
          {
            description: 'Create description',
            text: 'Create text',
          },
          USER_UID
        )
        .subscribe((result) => {
          expect(result).toBeTruthy();
        });
    });
    it('Should return an error', async () => {
      service.createItem(<any>undefined, USER_UID).subscribe({
        error: (result) => {
          expect(result).toBeInstanceOf(Error);
        },
      });
    });
  });

  describe('Should update', () => {
    it('Should update item', async () => {
      mockItem.setText('Updated text');
      service.updateItem(mockItem).subscribe({
        next: (result) => {
          expect(result).toBeTruthy();
        },
      });
    });
    it('Should return an error', async () => {
      service.updateItem(<any>{}).subscribe({
        error: (result) => {
          expect(result).toBeInstanceOf(Error);
        },
      });
    });
  });

  describe('Should delete', () => {
    it('Should delete item', async () => {
      service.deleteItem(mockItem).subscribe((result) => {
        expect(result).toBeTruthy();
      });
    });
    it('Should return an error', async () => {
      service.deleteItem(<any>{}).subscribe({
        error: (result) => {
          expect(result).toBeInstanceOf(Error);
        },
      });
    });
  });
});
