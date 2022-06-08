import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DeleteMemorizeItemEffects } from './delete-memorize-item.effects';

describe('DeleteMemorizeItemEffects', () => {
  let actions$: Observable<any>;
  let effects: DeleteMemorizeItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeleteMemorizeItemEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(DeleteMemorizeItemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
