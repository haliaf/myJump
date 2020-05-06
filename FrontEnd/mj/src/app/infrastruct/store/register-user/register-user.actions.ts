import { Action } from '@ngrx/store';
import { ChangeStoreRequest } from 'src/app/shared/common/ChangeStoreRequest';
import { IValidateErrorMessageItemDto } from 'src/app/shared/common/IApiResponseCommonDto';

export enum RegisterUserActionTypes {
  SecurityUserRegisterResponse = 'SECURITY_USER_REGISTER_RESPONSE',
  SecurityUserRegisterResponseComplete = 'SECURITY_USER_REGISTER_RESPONSE_COMPLETE',
  SecurityUserRegisterResponseFailed = 'SECURITY_USER_REGISTER_RESPONSE_FAILED',

  SecurityUserRegisterChangeResponse = 'SECURITY_USER_REGISTER_CHANGE',
  SecurityUserRegisterChangeResponseComplete = 'SECURITY_USER_REGISTER_CHANGE_COMPLETE'
}

export class RegisterUserResponseAction implements Action {
  readonly type = RegisterUserActionTypes.SecurityUserRegisterResponse;
}

export class RegisterUserResponseCompleteAction implements Action {
  readonly type = RegisterUserActionTypes.SecurityUserRegisterResponseComplete;
}

export class RegisterUserResponseFailedAction implements Action {
  readonly type = RegisterUserActionTypes.SecurityUserRegisterResponseFailed;
  payload: IValidateErrorMessageItemDto;
  constructor(payload: IValidateErrorMessageItemDto) {
    this.payload = payload;
  }
}

export class RegisterUserResponseChangeAction implements Action {
  readonly type = RegisterUserActionTypes.SecurityUserRegisterChangeResponse;
  payload: ChangeStoreRequest;

  constructor(payload: ChangeStoreRequest) {
    this.payload = payload;
  }
}

export class RegisterUserResponseChangeCompleteAction implements Action {
  readonly type = RegisterUserActionTypes.SecurityUserRegisterChangeResponseComplete;
}


