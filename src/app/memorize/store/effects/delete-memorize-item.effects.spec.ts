import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reducers } from 'src/app/core/state';
import { environment } from 'src/environments/environment';

import { DeleteMemorizeItemEffects } from './delete-memorize-item.effects';

describe('DeleteMemorizeItemEffects', () => {
  let actions$: Observable<any>;
  let effects: DeleteMemorizeItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [DeleteMemorizeItemEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(DeleteMemorizeItemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
