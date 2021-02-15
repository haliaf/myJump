import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AccountUserService } from './service/security-user-account.service';
import { SecurityUserAccountActionTypes, SecurityUserAccountLoadAction, SecurityUserAccountLoadCompleteAction } from './account-user.actions';
import { IUserAccountDto } from './model/IUserAccountDto';
import { of } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class SecurityUserAccountEffects {

   constructor(
      private actions$: Actions,
      private _srv: AccountUserService,
      private router: Router
   ) { }

   @Effect()
   loadSecurityUserInfo$ = this.actions$
      .pipe(
         ofType(SecurityUserAccountActionTypes.Load),
         mergeMap(() => {
          return this._srv.getUserAccount().pipe(
            map((a : IUserAccountDto) => {
                return new SecurityUserAccountLoadCompleteAction(a);
            }),
            catchError(error => of(
              this.router.navigate(['/login-form'])
            )),
          );
        })
        // catchError(error => of(new ErrorOccurredAction(error)))
      );


}
