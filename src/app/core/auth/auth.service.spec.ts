import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuthMock } from '../mocks/firebase-auth.mock';
import { AuthService } from './auth.service';


describe('AuthService', () => {
  let service: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AngularFireAuth, useClass: AngularFireAuthMock }
      ]
    });
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Methods', () => {
    it('Should sign in with google', (done) => {
      service.getUser().subscribe({
        next: (user) => {
          expect(user).not.toBeUndefined();
          done();
        }
      });
      service.googleAuth();
    })
    it('Should sign out', (done) => {
      service.getUser().subscribe({
        next: (user) => {
          expect(user).toBeUndefined();
          done();
        }
      });
      service.signOut();
    })
  })

  // describe('Navigation', () => {
  //   it('Should redirect after sign in', () => {
  //     service.googleAuth();
  //     spyOn(router, 'navigate');
  //     expect(router.navigate).toHaveBeenCalledWith(['/']);
  //   })
  //   it('Should redirect after sign out', () => {
  //     service.signOut();
  //     spyOn(router, 'navigate');
  //     expect(router.navigate).toHaveBeenCalledWith(['login']);
  //   })
  // })
});
