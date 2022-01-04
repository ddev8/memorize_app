import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule, USE_EMULATOR as FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    { provide: FIRESTORE_EMULATOR, useValue: environment.production ? undefined : ['localhost', 8080]} // Use emulator for development mode and testing.
  ]
})
export class FirestoreModule { }
