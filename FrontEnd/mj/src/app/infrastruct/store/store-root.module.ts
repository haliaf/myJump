
import { ActionReducerMap } from '@ngrx/store';
import { IRegisterUserModel } from './register-user/register-user.model';
import { securityUserRegisterReducer } from './register-user/register-user.reducer';
import { ISecurityUserModel } from './security-user/security-user.model';
import { securityUserReducer } from './security-user/security-user.reducer';
import { ISecurityUserAccountModel } from './account-user/account-user.model';
import { securityUserAccountReducer } from './account-user/account-user.reducer';



export interface IAppStore {
  securityUserStore: ISecurityUserModel;
  securityUserRegisteStore: IRegisterUserModel;
  securityUserAccountStore: ISecurityUserAccountModel;
}

// tslint:disable-next-line: no-namespace
export namespace StoreMainModule {
   export const model: ActionReducerMap<IAppStore> = {
         securityUserStore: securityUserReducer,
         securityUserAccountStore: securityUserAccountReducer,
         securityUserRegisteStore: securityUserRegisterReducer
   };
}
