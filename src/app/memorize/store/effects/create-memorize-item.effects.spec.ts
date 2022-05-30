import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { CreateMemorizeItemEffects } from './create-memorize-item.effects';

describe('CreateMemorizeItemEffects', () => {
  let actions$: Observable<any>;
  let effects: CreateMemorizeItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CreateMemorizeItemEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(CreateMemorizeItemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
