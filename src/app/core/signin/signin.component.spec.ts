import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthMock } from '../mocks/firebase-auth.mock';

import { SigninComponent } from './signin.component';

describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ SigninComponent ],
      providers: [
        { provide: AngularFireAuth, useClass: AngularFireAuthMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
