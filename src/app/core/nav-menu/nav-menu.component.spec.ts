import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { environment } from 'src/environments/environment';

import { AngularFireAuthMock } from '../mocks/firebase-auth.mock';
import { reducers } from '../state';

import { NavMenuComponent } from './nav-menu.component';

describe('NavMenuComponent', () => {
  let component: NavMenuComponent;
  let fixture: ComponentFixture<NavMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MenuModule,
        MenubarModule,
        AvatarModule,
        ButtonModule,
        RouterTestingModule.withRoutes([]),
        StoreModule.forRoot(reducers),
        // AngularFireModule.initializeApp(environment.firebaseConfig),
        // AngularFirestoreModule,
        // RouterTestingModule,
      ],
      declarations: [NavMenuComponent],
      providers: [{ provide: AngularFireAuth, useClass: AngularFireAuthMock }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
