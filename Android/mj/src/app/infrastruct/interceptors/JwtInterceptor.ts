import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';



@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const currentUserToken = this.authService.currentUserTokenValue;
        if (!currentUserToken){
          request = request.clone();
          return next.handle(request);
        }
        if (this.isNeedRefreshToken()){
          this.authService.refreshToken();
          localStorage.removeItem('expiresGetDate');
        }
        if (currentUserToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUserToken}`
                }
            });
        }

        return next.handle(request);
    }
   isNeedRefreshToken(): boolean {
      const expires  =  this.authService.isExpiredUserToken;
      return expires;
    }
}
