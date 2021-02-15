


import { ISecurityUserAccountModel } from './account-user.model';
import { SecurityUserAccountActionTypes, SecurityUserAccountLoadCompleteAction } from './account-user.actions';
import { ChangeStoreRequest } from 'src/app/shared/common/ChangeStoreRequest';
import { ObjectHelper } from '../../CustomObjectHelper';
import { environment } from 'src/environments/environment';


export const initialState: ISecurityUserAccountModel = null;

export function securityUserAccountReducer(state: ISecurityUserAccountModel = initialState, action): ISecurityUserAccountModel {
  let model = { ...state };
  switch (action.type) {

    case SecurityUserAccountActionTypes.Load:
      model.isLoading = true;
      return model;

    case SecurityUserAccountActionTypes.LoadComplete:
      const response = action as SecurityUserAccountLoadCompleteAction;
      model.isLoading = false;
      model.firstName = response.payload.firstName;
      model.lastName = response.payload.lastName;
      model.email = response.payload.email;
      model.userprofileimages = environment.apiUrl + '/upload/' + response.payload.userProfileImages;
      model.userprofileimagesresized = environment.apiUrl + '/upload/resized-' + response.payload.userProfileImages;
      return model;

    case SecurityUserAccountActionTypes.ChangeResponse:
      const changeset: ChangeStoreRequest = action.payload;
      model = { ...state };
      // const fullPath = changeset.blockPath + '.' + changeset.propPath; хз пока
      const fullPath = changeset.propPath;
      const wasChanged = ObjectHelper.deepSet(model, fullPath, changeset.value);
      return model;

    default:
      return model;
  }
}
