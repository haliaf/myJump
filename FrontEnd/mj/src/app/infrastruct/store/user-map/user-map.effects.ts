import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { UserMapActionTypes, UserMapLoadCoordinateAction, UserMapLoadCoordinateCompleteAction, UserMapLoadAction, UserMapLoadCpmpleteAction, UserMapConnectMapEventResponseAction, UserMapConnectMapEventResponseCompleteAction } from './user-map.actions';
import { UserMapService } from './setvice/user-map.service';
import { mergeMap, map } from 'rxjs/operators';
import { IUserMapModel } from './user-map.model';
import { Store } from '@ngrx/store';
import { IAppStore } from '../store-root.module';


@Injectable()
export class UserMapEffects {
   private _infoDto: IUserMapModel;
   constructor(
    private actions$: Actions,
    private _ngRx: Store<IAppStore>,
    private _srv: UserMapService,
  //    private _routeSrv: SiteRouteHelperService
   ) {
    this._ngRx.select(m => m.userMapStore).subscribe((data: IUserMapModel) => this._infoDto = data);
   }
   @Effect()
   loadUserCoordinate$ = this.actions$
      .pipe(
         ofType(UserMapActionTypes.LoadCoordinate),
         mergeMap((action: UserMapLoadCoordinateAction) => this._srv.sendResponsLoadCoordinate(this._infoDto)),
         map((response: any) => {
            return new UserMapLoadCoordinateCompleteAction();
         }),
        // catchError(error => of(new ErrorOccurredAction(error)))
      );

      @Effect()
      connectToUserMap$ = this.actions$
         .pipe(
            ofType(UserMapActionTypes.ConnectMapEventResponse),
            mergeMap((action: UserMapConnectMapEventResponseAction) => this._srv.connectToMapEvents(this._infoDto.selectedStartCoordinateMapEvents)),
            map((response: any) => {
               return new UserMapConnectMapEventResponseCompleteAction();
            }),
           // catchError(error => of(new ErrorOccurredAction(error)))
         );

      @Effect()
      loadUserMap$ = this.actions$
         .pipe(
            ofType(UserMapActionTypes.Load),
            mergeMap((action: UserMapLoadAction) => this._srv.getMapEvents()),
            map((response: any) => {
               return new UserMapLoadCpmpleteAction(response);
            }),
           // catchError(error => of(new ErrorOccurredAction(error)))
         );


}
