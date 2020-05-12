import { Action } from '@ngrx/store';

import { IUserAccountDto } from './model/IUserAccountDto';
import { ChangeStoreRequest } from 'src/app/shared/common/ChangeStoreRequest';

export enum SecurityUserAccountActionTypes {
   Load = 'USER_ACCOUNT_LOAD',
   LoadComplete = 'USER_ACCOUNT_LOAD_COMPLETE',

   ChangeResponse = 'USER_ACCOUNT_CHANGE',
   ChangeResponseComplete = 'USER_ACCOUNT_CHANGE_COMPLETE'
}

export class SecurityUserAccountLoadAction implements Action {
   readonly type = SecurityUserAccountActionTypes.Load;
}

export class SecurityUserAccountChangeAction implements Action {
  readonly type = SecurityUserAccountActionTypes.ChangeResponse;
  payload: ChangeStoreRequest;

  constructor(payload: ChangeStoreRequest) {
    this.payload = payload;
  }
}

export class SecurityUserAccountChangeCompleteAction implements Action {
  readonly type = SecurityUserAccountActionTypes.ChangeResponseComplete;
}

export class SecurityUserAccountLoadCompleteAction implements Action {
   readonly type = SecurityUserAccountActionTypes.LoadComplete;
   payload: IUserAccountDto;

   constructor(payload: IUserAccountDto) {
      this.payload = payload;
   }
}

