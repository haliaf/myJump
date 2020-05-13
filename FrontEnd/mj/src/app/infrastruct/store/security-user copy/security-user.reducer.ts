

import { SecurityUserActionTypes, SecurityUserLoadCompleteAction, SecurityUserAccessLoadCompleteAction } from './security-user.actions';
import { ISecurityUserModel } from './security-user.model';


export const initialState: ISecurityUserModel = null;

export function securityUserReducer(state: ISecurityUserModel = initialState, action): ISecurityUserModel {
   const model = { ...state };
   switch (action.type) {

      case SecurityUserActionTypes.Load:
         model.isLoading = true;
         return model;

      case SecurityUserActionTypes.LoadComplete:
         const response = action as SecurityUserLoadCompleteAction;
         model.isLoading = false;
         model.timezone = response.payload.timezone;
         model.userName = response.payload.userName;
         return model;

      case SecurityUserActionTypes.LoadSecurityUserAccessComplete:
         const accessResponse = action as SecurityUserAccessLoadCompleteAction;
         model.isAdmin = accessResponse.payload.isAdmin;
         model.accessError = accessResponse.payload.accessError;
         model.isCustomerRepresentative = accessResponse.payload.isCustomerRepresentative;
         model.organizationKeys = accessResponse.payload.organizationKeys;
         model.canEdit = accessResponse.payload.canEdit;
         return model;

      default:
         return model;
   }
}
