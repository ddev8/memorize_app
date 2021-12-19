import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrimeNgModule } from './shared/prime-ng-module/prime-ng.module';
import { TextMemorizationComponent } from './text-memorization/text-memorization.component';
import { NavMenuComponent } from './shared/nav-menu/nav-menu.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { FirestoreModule } from './shared/firestore-module/firestore.module';
import { MemorizationService } from './shared/memorization.service';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    TextMemorizationComponent,
    NavMenuComponent,
    IndexPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgModule,
    FormsModule,
    ReactiveFormsModule,
    FirestoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    MemorizationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
