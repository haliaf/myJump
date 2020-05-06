


import { ISecurityUserAccountModel } from './account-user.model';
import { SecurityUserAccountActionTypes, SecurityUserAccountLoadCompleteAction } from './account-user.actions';


export const initialState: ISecurityUserAccountModel = null;

export function securityUserAccountReducer(state: ISecurityUserAccountModel = initialState, action): ISecurityUserAccountModel {
   const model = { ...state };
   switch (action.type) {

      case SecurityUserAccountActionTypes.Load:
         model.isLoading = true;
         return model;

      case SecurityUserAccountActionTypes.LoadComplete:
         const response = action as SecurityUserAccountLoadCompleteAction;
         model.isLoading = false;
         model.fullName = response.payload.fullName;
         return model;

      default:
         return model;
   }
}
