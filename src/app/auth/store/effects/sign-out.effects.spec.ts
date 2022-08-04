import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SignOutEffects } from './sign-out.effects';

describe('SignOutEffects', () => {
  let actions$: Observable<any>;
  let effects: SignOutEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        RouterTestingModule,
      ],
      providers: [SignOutEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(SignOutEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
