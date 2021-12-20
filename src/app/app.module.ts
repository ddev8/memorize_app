import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextMemorizationComponent } from './text-memorization/text-memorization.component';
import { IndexPageComponent } from './index-page/index-page.component';

import { environment } from '../environments/environment';
import { SigninComponent } from './signin/signin.component';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    TextMemorizationComponent,
    IndexPageComponent,
    SigninComponent,
  ],
  imports: [
    AngularFireAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    // AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
