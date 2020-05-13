import { ofType, Actions, Effect } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SecurityUserActionTypes, SecurityUserLoadCompleteAction, SecurityUserAccessLoadCompleteAction, SecurityUserEndAction, SecurityUserLoadAction } from './security-user.actions';
import { ISecurityUserModel } from './security-user.model';
import { Injectable } from '@angular/core';
import { SecurityUserService } from './service/security-user.service';


@Injectable()
export class SecurityUserEffects {

   constructor(
      private actions$: Actions,
      private _srv: SecurityUserService,
  //    private _routeSrv: SiteRouteHelperService
   ) { }

   @Effect()
   loadSecurityUserInfo$ = this.actions$
      .pipe(
         ofType(SecurityUserActionTypes.Load),
         mergeMap((action: SecurityUserLoadAction) => this._srv.getUserInfoSimple()),
         map((response: ISecurityUserModel) => {
            return new SecurityUserLoadCompleteAction(response);
         }),
        // catchError(error => of(new ErrorOccurredAction(error)))
      );

   @Effect()
   loadSecurityUserAccess$ = this.actions$
      .pipe(
         ofType(SecurityUserActionTypes.LoadSecurityUserAccess),
      //   mergeMap((action: SecurityUserAccessLoadAction) => this._srv.getUserInfoAccess()),
         map((response: ISecurityUserModel) => {
            return new SecurityUserAccessLoadCompleteAction(response);
         }),
    //     catchError(error => of(new ErrorOccurredAction(error)))
      );

   @Effect()
   loadSecurityUserAccessComplete$ = this.actions$
      .pipe(
         ofType(SecurityUserActionTypes.LoadSecurityUserAccessComplete),
         map((response: SecurityUserAccessLoadCompleteAction) => {
            if (response.payload.accessError) {
           //    this._routeSrv.goErrorUnauth();
            }
            return new SecurityUserEndAction();
         }),
      //   catchError(error => of(new ErrorOccurredAction(error)))
      );
}
