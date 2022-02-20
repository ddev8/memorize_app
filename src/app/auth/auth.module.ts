import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SigninComponent } from './components/signin/signin.component';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { SignOutEffects } from './store/effects/sign-out.effects';
import { SignInWithGoogleEffects } from './store/effects/sign-in-with-google.effects';
import { CheckAuthEffects } from './store/effects/check-auth.effects';

@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([SignOutEffects, SignInWithGoogleEffects, CheckAuthEffects])
  ],
  providers: [
    AuthService,
  ],
  exports: [
    SigninComponent
  ]
})
export class AuthModule { }
