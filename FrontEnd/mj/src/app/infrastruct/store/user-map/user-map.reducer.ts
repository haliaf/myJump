import { ICoordinateDto, CoordinateHelper } from './../common/ICoordinate';



import { ChangeStoreRequest } from 'src/app/shared/common/ChangeStoreRequest';
import { ObjectHelper } from '../../CustomObjectHelper';
import { UserMapLoadCpmpleteAction, UserMapActionTypes } from './user-map.actions';
import { IUserMapModel } from './user-map.model';


export const initialState: IUserMapModel = null;

export function userMapReducer(state: IUserMapModel = initialState, action): IUserMapModel {
  let model = { ...state };
  switch (action.type) {

    case UserMapActionTypes.Load:
      model.isLoading = true;
      return model;

    case UserMapActionTypes.LoadComplete:
      const response = action as UserMapLoadCpmpleteAction;
      model.isLoading = false;
      return model;

    case UserMapActionTypes.LoadCoordinate:
      model.isLoading = true;
      model.StartCoordinate = CoordinateHelper.createLocalStorageICoordinateDto(localStorage.getItem('StartCoordinate'));
      model.EndCoordinate = CoordinateHelper.createLocalStorageICoordinateDto(localStorage.getItem('StopCoordinate'));
      return model;

    case UserMapActionTypes.LoadCoordinateComplete:
      model.isLoading = false;
      return model;

    case UserMapActionTypes.ChangeResponseComplete:
      model.isLoading = false;
      return model;

    case UserMapActionTypes.ChangeResponse:
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

