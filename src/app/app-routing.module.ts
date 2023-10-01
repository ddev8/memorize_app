import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './auth/components/signin/signin.component';
import { TextMemorizationComponent } from './memorize/text-memorization/text-memorization.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';
import { ReminderComponent } from './memorize/reminder/reminder.component';

const routes: Routes = [
  {
    path: '',
    component: TextMemorizationComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo('login') },
  },
  {
    path: 'reminder',
    component: ReminderComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: () => redirectUnauthorizedTo('login') },
  },
  {
    path: 'login',
    component: SigninComponent,
  },
  {
    path: '**',
    component: SigninComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
