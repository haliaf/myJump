
import { ActionReducerMap } from '@ngrx/store';
import { ISecurityUserModel } from './security-user/security-user.model';
import { securityUserReducer } from './security-user/security-user.reducer';



export interface IAppStore {
  securityUserStore: ISecurityUserModel;
}

// tslint:disable-next-line: no-namespace
export namespace StoreMainModule {
   export const model: ActionReducerMap<IAppStore> = {
         securityUserStore: securityUserReducer
   };
}
