import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reducers } from 'src/app/core/state';
import { environment } from 'src/environments/environment';

import { LoadItemsEffects } from './load-items.effects';

describe('LoadItemsEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadItemsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [LoadItemsEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(LoadItemsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
