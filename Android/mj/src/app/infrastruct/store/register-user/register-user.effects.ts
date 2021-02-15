import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { IAppStore } from '../store-root.module';
import { RegisterUserActionTypes, RegisterUserResponseCompleteAction, RegisterUserResponseFailedAction } from './register-user.actions';
import { IRegisterUserSimpleInfoDto, IRegisterUserModel } from './register-user.model';
import { RegisterUserService } from './service/register-user.service';



@Injectable()
export class RegisterUserEffects {
  private _infoDto: IRegisterUserModel;
  constructor(
    private actions$: Actions,
    private _srv: RegisterUserService,
    private _ngRx: Store<IAppStore>,
    private router: Router
  ) {

    this._ngRx.select(m => m.securityUserRegisteStore).subscribe((data: IRegisterUserModel) => this._infoDto = data);
  }

  @Effect()
  registerUserResponse$ = this.actions$
    .pipe(
      ofType(RegisterUserActionTypes.SecurityUserRegisterResponse),
      switchMap(() => {
        return this._srv.sendResponseRegister(this._infoDto).pipe(
          map(() => {
              this.router.navigate(['profile']);
              return new RegisterUserResponseCompleteAction();
          }),
          catchError(error => of(
            new RegisterUserResponseFailedAction({message: error.error})
          )),
        );
      })

    );


  /* map((response: any) => {
    var res = response;
    this.router.navigate(['profile']);
    return new RegisterUserResponseCompleteAction();
  }),
  @Effect()
  change$ = this.actions$.pipe(
    ofType(RegisterUserActionTypes.SecurityUserRegisterChangeResponse),
    map(() => {
      return new RegisterUserResponseChangeCompleteAction();
    }),
   // catchE;rror(error => of(this._errorActions.errorOccurred(error)))
 );
/*   @Effect()
   registerUserResponseComplete$ = this.actions$
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
      );*/
}
