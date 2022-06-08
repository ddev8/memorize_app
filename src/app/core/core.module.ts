import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { AngularFireAuth, AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environment';
import { AuthModule } from '../auth/auth.module';

import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

import { reducers } from './state';

import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    NavMenuComponent
  ],
  imports: [
    AuthModule,
    CommonModule,
    MenuModule,
    MenubarModule,
    AvatarModule,
    ButtonModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    AngularFireAuth,
    { provide: FIRESTORE_EMULATOR, useValue: environment.emulator ? ['localhost', 8080] : undefined}, // Use emulator for development mode and testing.
    { provide: USE_AUTH_EMULATOR, useValue: environment.emulator ? ['http://localhost:9099'] : undefined} // Use emulator for development mode and testing.
  ],
  exports: [
    NavMenuComponent,
  ]
})
export class CoreModule { }
