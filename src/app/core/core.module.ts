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


@NgModule({
  declarations: [
    NavMenuComponent
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
    { provide: FIRESTORE_EMULATOR, useValue: environment.production ? undefined : ['localhost', 8080]} // Use emulator for development mode and testing.
  ],
  exports: [
    NavMenuComponent,
  ]
})
export class CoreModule { }
