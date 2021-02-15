import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { error } from 'protractor';
import { environment } from 'src/environments/environment';

type ICallback = (err: any) => void;

@Injectable()
export class AuthService {
  uri = environment.apiUrl + '/api/api';
  baseUrl = environment.apiUrl + '/api';
  public token: string;
  loggedIn = false;

  constructor(private router: Router, private http: HttpClient) { }

  refreshToken() {
    this.http.post(this.uri + '/auth/refreshtoken', { AccessToken: localStorage.getItem('auth_token'), RefreshToken: localStorage.getItem('refreshToken') })
      .subscribe((resp: any) => {
        localStorage.setItem('auth_token', resp.accessToken.token);
        localStorage.setItem('expiresIn', resp.accessToken.expiresIn);
        localStorage.setItem('refreshToken', resp.refreshToken);
        localStorage.setItem('expiresGetDate', new Date().toString());
        this.token = resp.auth_token;
      }, err => this.logOut());
  }

  logIn(email: string, password: string, errCallback: ICallback) {
    this.http.post(this.uri + '/auth/login', { UserName: email, Password: password })
      .subscribe((resp: any) => {
        localStorage.setItem('auth_token', resp.accessToken.token);
        localStorage.setItem('expiresIn', resp.accessToken.expiresIn);
        localStorage.setItem('refreshToken', resp.refreshToken);
        localStorage.setItem('expiresGetDate', new Date().toString());

        this.token = resp.auth_token;

        this.router.navigate(['/profile']);
      },
        err => {
          errCallback(err);
        });
  }

  logOut() {
    this.token = null;
    this.loggedIn = false;
    localStorage.clear();
    this.router.navigate(['/login-form']);
  }

  facebookLogin(accessToken: string) {
  //  const headers = new Headers();
   // headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({ accessToken });
    return this.http
      .post(
        this.uri + '/ExternalAuth/Facebook', { AccessToken: accessToken })
        .subscribe( m =>
          console.log(m));
   //   .map(res => res.json())
   //   .map(res => {
   //     localStorage.setItem('auth_token', res.auth_token);
   //     this.loggedIn = true;
       /// this._authNavStatusSource.next(true);
    //    return true;
      //.catch(this.handleError);
  }

  public get currentUserTokenValue(): string {
    return localStorage.getItem('auth_token');
  }

  public get isExpiredUserToken(): boolean {
    const expiresGetDate = new Date(localStorage.getItem('expiresGetDate'));
    if (!expiresGetDate) {
      return false;
    }
    const expiresIn = +localStorage.getItem('expiresIn');
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() - expiresIn + 120);
    if (currentDate >= expiresGetDate && expiresIn > 0) {
      return true;
    }
    return false;
  }

  get isLoggedIn() {
    return localStorage.getItem('auth_token')?.length > 1;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // return true;
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
