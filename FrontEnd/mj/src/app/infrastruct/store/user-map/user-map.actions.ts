import { Action } from '@ngrx/store';
import { ChangeStoreRequest } from 'src/app/shared/common/ChangeStoreRequest';


export enum UserMapActionTypes {
   Load = 'USER_MAP_LOAD',
   LoadComplete = 'USER_MAP_LOAD_COMPLETE',

   ChangeResponse = 'USER_MAP_CHANGE',
   ChangeResponseComplete = 'USER_MAP_CHANGE_COMPLETE'
}

export class UserMapLoadAction implements Action {
   readonly type = UserMapActionTypes.Load;
}

export class UserMapLoadCpmpleteAction implements Action {
  readonly type = UserMapActionTypes.LoadComplete;
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



