import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireAuthMock } from './core/mocks/firebase-auth.mock';
import { NavMenuComponent } from './core/nav-menu/nav-menu.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        NavMenuComponent
      ],
      providers: [
        { provide: AngularFireAuth, useClass: AngularFireAuthMock }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
