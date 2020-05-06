import { Action } from '@ngrx/store';

import { IUserAccountDto } from './model/IUserAccountDto';

export enum SecurityUserAccountActionTypes {
   Load = 'USER_ACCOUNT_LOAD',
   LoadComplete = 'USER_ACCOUNT_LOAD_COMPLETE',
}

export class SecurityUserAccountLoadAction implements Action {
   readonly type = SecurityUserAccountActionTypes.Load;
}

export class SecurityUserAccountLoadCompleteAction implements Action {
   readonly type = SecurityUserAccountActionTypes.LoadComplete;
   payload: IUserAccountDto;

   constructor(payload: IUserAccountDto) {
      this.payload = payload;
   }
}

