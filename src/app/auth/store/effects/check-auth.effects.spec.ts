import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { CheckAuthEffects } from './check-auth.effects';

describe('CheckAuthEffects', () => {
  let actions$: Observable<any>;
  let effects: CheckAuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule,
      ],
      providers: [CheckAuthEffects, provideMockActions(() => actions$), AngularFireAuth],
    });

    effects = TestBed.inject(CheckAuthEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
