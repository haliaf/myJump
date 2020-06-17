import { Action } from '@ngrx/store';
import { ChangeStoreRequest } from 'src/app/shared/common/ChangeStoreRequest';
import { IMapEvent } from '../common/IMapEvent';


export enum UserMapActionTypes {
   Load = 'USER_MAP_LOAD',
   LoadComplete = 'USER_MAP_LOAD_COMPLETE',

   ConnectMapEventResponse = 'CONNECT_MAP_EVENT_RESPONSE',
   ConnectMapEventResponseComplete = 'CONNECT_MAP_EVENT_RESPONSE_COMPLETE',
   DisconnectMapEventResponseComplete = 'DISCONNECT_MAP_EVENT_RESPONSE_COMPLETE',

   ChangeResponse = 'USER_MAP_CHANGE',
   ChangeResponseComplete = 'USER_MAP_CHANGE_COMPLETE',

   LoadCoordinate = 'USER_MAP_LOAD_COOARDINATE',
   LoadCoordinateComplete = 'USER_MAP_LOAD_COOARDINATE_COMPLETE',

   StartMapEventResponse = 'START_MAP_EVENT_RESPONSE',
}
export class UserMapConnectMapEventResponseCompleteAction implements Action {
  readonly type = UserMapActionTypes.ConnectMapEventResponseComplete;
}

export class UserMapDisconnectMapEventResponseCompleteAction implements Action {
  readonly type = UserMapActionTypes.DisconnectMapEventResponseComplete;
}

export class UserMapConnectMapEventResponseAction implements Action {
  readonly type = UserMapActionTypes.ConnectMapEventResponse;
}
export class UserMapLoadCoordinateAction implements Action {
  readonly type = UserMapActionTypes.LoadCoordinate;
}

export class UserMapLoadCoordinateCompleteAction implements Action {
  readonly type = UserMapActionTypes.LoadCoordinateComplete;
}

export class UserMapLoadAction implements Action {
   readonly type = UserMapActionTypes.Load;
}
export class UserMapStartEventAction implements Action {
  readonly type = UserMapActionTypes.StartMapEventResponse;
}
export class UserMapLoadCpmpleteAction implements Action {
  readonly type = UserMapActionTypes.LoadComplete;
  payload: any;
  constructor(payload: any) {
    this.payload = payload;
  }
}

export class UserMapChangeAction implements Action {
  readonly type = UserMapActionTypes.ChangeResponse;
  payload: ChangeStoreRequest;

  constructor(payload: ChangeStoreRequest) {
    this.payload = payload;
  }
}

export class UserMapChangeCompleteAction implements Action {
  readonly type = UserMapActionTypes.ChangeResponseComplete;
}



