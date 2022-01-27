import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  constructor(
    private readonly authService: AuthService
  ) { }

  public signInWithGoogle(): void {
    this.authService.googleAuth();
  }

}
