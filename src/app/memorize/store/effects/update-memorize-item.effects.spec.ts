import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UpdateMemorizeItemEffects } from './update-memorize-item.effects';

describe('UpdateMemorizeItemEffects', () => {
  let actions$: Observable<any>;
  let effects: UpdateMemorizeItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateMemorizeItemEffects, provideMockActions(() => actions$)],
    });

    effects = TestBed.inject(UpdateMemorizeItemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
