import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SignInWithGoogleEffects } from './sign-in-with-google.effects';

describe('SignInWithGoogleEffects', () => {
  let actions$: Observable<any>;
  let effects: SignInWithGoogleEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule,
      ],
      providers: [SignInWithGoogleEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SignInWithGoogleEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
