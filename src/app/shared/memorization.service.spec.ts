// Main problem with testing the firestore is that I can't import data in a runtime.
// https://github.com/firebase/firebase-tools/issues/2297

import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';

import { MemorizationService } from './memorization.service';
import { MemorizeItem } from './memorize/memorize.model';
import { AngularFireDatabaseMock, memorize_list, USER_UID } from '../mocks/firestore.mock';
import { first } from 'rxjs/operators';

let fs: AngularFirestore;

describe('MemorizationService', () => {
  let service: MemorizationService;
  let mockItem: MemorizeItem;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports:[
          AngularFireModule.initializeApp(environment.firebaseConfig),
          AngularFirestoreModule
      ],
      providers: [
        // { provide: FIRESTORE_EMULATOR, useValue: environment.production ? undefined : ['localhost', 8080]} // Use emulator for development mode and testing.
        { provide: AngularFirestore, useClass: AngularFireDatabaseMock}, // Use emulator for development mode and testing.
      ]
    });
    service = TestBed.inject(MemorizationService);
    mockItem = new MemorizeItem(memorize_list[0]);
    fs = TestBed.inject(AngularFirestore);
  });

  afterEach(() => {
    (<any>fs).restore();
  })

  it('Should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get items', () => {
    it('Should get items from db', (done) => {
      service.getMemorizeItems(USER_UID)
        .pipe(
          first()
        )
        .subscribe({
          next: (value) => {
            expect(value[0]).toEqual(mockItem);
            done();
          }
        })
    })
  })

  describe('Create item', () => {
    it('Should create item', () => {
      const result: true | Error = service.createItem({
        description: 'Create description',
        text: 'Create text',
      }, USER_UID);
      expect(result).toBeTruthy();
    })
    it('Should return an error', () => {
      const result: true | Error = service.createItem(<any>undefined, USER_UID);
      expect(result).toBeInstanceOf(Error);
    })
  })

  describe('Should update', () => {
    it('Should update item', () => {
      mockItem.setText("Updated text");
      const result: true | Error = service.updateItem(mockItem);
      expect(result).toBeTruthy();
    })
    it('Should return an error', () => {
      const result: true | Error = service.updateItem(<any>{});
      expect(result).toBeInstanceOf(Error);
    })
  })

  describe('Should delete', () => {
    it('Should delete item', () => {
      const result: true | Error = service.deleteItem(mockItem);
      expect(result).toBeTruthy();
    })
    it('Should return an error', () => {
      const result: true | Error = service.deleteItem(<any>{});
      expect(result).toBeInstanceOf(Error);
    })
  })
});
