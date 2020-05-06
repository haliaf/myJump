import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AccountUserService } from './service/security-user-account.service';
import { SecurityUserAccountActionTypes, SecurityUserAccountLoadAction, SecurityUserAccountLoadCompleteAction } from './account-user.actions';
import { IUserAccountDto } from './model/IUserAccountDto';
import { of } from 'rxjs';


@Injectable()
export class SecurityUserAccountEffects {

   constructor(
      private actions$: Actions,
      private _srv: AccountUserService,
  //    private _routeSrv: SiteRouteHelperService
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
             console.log(error)
            )),
          );
        })
        // catchError(error => of(new ErrorOccurredAction(error)))
      );


}
