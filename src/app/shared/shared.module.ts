import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { PrimeNgModule } from './prime-ng-module/prime-ng.module';
import { FirestoreModule } from './firestore-module/firestore.module';
import { MemorizationService } from './memorization.service';



@NgModule({
  declarations: [
    NavMenuComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    FirestoreModule,
  ],
  providers: [
    AngularFireAuth,
    AuthService,
    MemorizationService,
  ],
  exports: [
    NavMenuComponent,
    PrimeNgModule,
    FirestoreModule
    // AngularFireAuth,
    // AuthService,
    // MemorizationService,
  ]
})
export class SharedModule { }
