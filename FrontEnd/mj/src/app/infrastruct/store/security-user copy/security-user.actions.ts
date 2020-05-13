import { Action } from '@ngrx/store';
import { ISecurityUserModel, ISystemUserAccessInfoDto } from './security-user.model';

export enum SecurityUserActionTypes {
   Load = 'USER_LOAD',
   LoadComplete = 'USER_LOAD_COMPLETE',

   LoadSecurityUserAccess = 'LOAD_SECURITY_USER_ACCESS',
   LoadSecurityUserAccessComplete = 'LOAD_SECURITY_USER_ACCESS_COMPLETE',

   End = 'USER_LOAD_END'
}

export class SecurityUserLoadAction implements Action {
   readonly type = SecurityUserActionTypes.Load;
}

export class SecurityUserLoadCompleteAction implements Action {
   readonly type = SecurityUserActionTypes.LoadComplete;
   payload: ISecurityUserModel;

   constructor(payload: ISecurityUserModel) {
      this.payload = payload;
   }
}

export class SecurityUserAccessLoadAction implements Action {
   readonly type = SecurityUserActionTypes.LoadSecurityUserAccess;
}

export class SecurityUserAccessLoadCompleteAction implements Action {
   readonly type = SecurityUserActionTypes.LoadSecurityUserAccessComplete;
   payload: ISystemUserAccessInfoDto;

   constructor(payload: ISystemUserAccessInfoDto) {
      this.payload = payload;
   }
}

export class SecurityUserEndAction implements Action {
   readonly type = SecurityUserActionTypes.End;
}
