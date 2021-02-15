
import { IRegisterUserModel } from './register-user.model';
import { RegisterUserActionTypes } from './register-user.actions';
import { ChangeStoreRequest } from 'src/app/shared/common/ChangeStoreRequest';
import { ObjectHelper } from '../../CustomObjectHelper';

export const initialState: IRegisterUserModel = {
  isLoading: false,
  email: '',
  username: '',
  password: '',
  isSaveError: false,
  saveError: '',
  firstName: 'Временные костыли',
  lastName: 'Временные костыли',
  location: 'Временные костыли'
};

export function securityUserRegisterReducer(state: IRegisterUserModel = initialState, action): IRegisterUserModel {
   let model = { ...state };
   switch (action.type) {

      case RegisterUserActionTypes.SecurityUserRegisterResponse:
         model.isSaveError = false;
         model.isLoading = true;
         model.saveError = '';
         return model;

      case RegisterUserActionTypes.SecurityUserRegisterResponseComplete:
         model.isLoading = false;
         return model;

      case RegisterUserActionTypes.SecurityUserRegisterChangeResponse:
        const changeset: ChangeStoreRequest = action.payload;
        model = { ...state };
       // const fullPath = changeset.blockPath + '.' + changeset.propPath; хз пока
        const fullPath =  changeset.propPath;
        const wasChanged = ObjectHelper.deepSet(model, fullPath, changeset.value);
        return model;

      case RegisterUserActionTypes.SecurityUserRegisterResponseFailed:
        const msg: string = action.payload;
        model.isLoading = false;
        model.isSaveError = true;
        model.saveError = msg;
        return model;

      default:
         return model;
   }
}
