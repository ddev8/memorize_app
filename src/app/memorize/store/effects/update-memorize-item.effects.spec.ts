import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideMockActions } from '@ngrx/effects/testing';
import { StoreModule } from '@ngrx/store';
import { Observable } from 'rxjs';
import { reducers } from 'src/app/core/state';
import { environment } from 'src/environments/environment';

import { UpdateMemorizeItemEffects } from './update-memorize-item.effects';

describe('UpdateMemorizeItemEffects', () => {
  let actions$: Observable<any>;
  let effects: UpdateMemorizeItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [UpdateMemorizeItemEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(UpdateMemorizeItemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
