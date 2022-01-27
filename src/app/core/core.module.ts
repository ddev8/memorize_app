import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from 'src/environments/environment';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { AuthService } from '../core/auth/auth.service';
import { SigninComponent } from './signin/signin.component';


@NgModule({
  declarations: [
    NavMenuComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    MenuModule,
    MenubarModule,
    AvatarModule,
    ButtonModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    { provide: FIRESTORE_EMULATOR, useValue: environment.production ? undefined : ['localhost', 8080]} // Use emulator for development mode and testing.
  ],
  exports: [
    NavMenuComponent,
    SigninComponent
  ]
})
export class CoreModule { }
