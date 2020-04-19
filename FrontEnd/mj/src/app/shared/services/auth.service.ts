import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {
  uri = 'http://localhost:8080/api';
  public token: string;
  loggedIn = true;

  constructor(private router: Router, private http: HttpClient) { }


  logIn(email: string, password: string) {
    this.http.post(this.uri + '/auth/login', { UserName: email, Password: password })
      .subscribe((resp: any) => {

        localStorage.setItem('auth_token', resp.auth_token);
        this.token = resp.auth_token;
        this.loggedIn = true;
        this.router.navigate(['profile']);
      });
      }

  logOut() {
    this.loggedIn = false;
    this.router.navigate(['/login-form']);
  }

  public get currentUserTokenValue(): string {
    return this.token;
}
  get isLoggedIn() {
    return this.loggedIn;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn;
    const isLoginForm = route.routeConfig.path === 'login-form';

    if (isLoggedIn && isLoginForm) {
      this.router.navigate(['/']);
      return false;
    }

    if (!isLoggedIn && !isLoginForm) {
      this.router.navigate(['/login-form']);
    }

    return isLoggedIn || isLoginForm;
  }
}
