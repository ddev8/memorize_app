import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { LoadItemsEffects } from './load-items.effects';

describe('LoadItemsEffects', () => {
  let actions$: Observable<any>;
  let effects: LoadItemsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadItemsEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(LoadItemsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
