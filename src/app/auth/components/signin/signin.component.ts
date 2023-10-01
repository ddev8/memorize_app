import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthState, loadCheckAuth, loadSignInWithGoogle, selectAuthLoading, selectAuthUser } from '../../store';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  public authLoading$: Observable<boolean>;

  constructor(private readonly store: Store) {
    this.authLoading$ = this.store.select(selectAuthLoading);
  }

  public ngOnInit(): void {
    this.store.dispatch(loadCheckAuth());
  }

  public signInWithGoogle(): void {
    this.store.dispatch(loadSignInWithGoogle());
  }
}
