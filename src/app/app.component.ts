import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadCheckAuth, selectAuthLoading, selectAuthUser } from './auth/store';
import { Observable } from 'rxjs';
import { User } from './auth/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public authLoading$: Observable<User | null>;
  constructor(private store: Store) {
    this.store.dispatch(loadCheckAuth());
    this.authLoading$ = this.store.select(selectAuthUser);
  }
}
