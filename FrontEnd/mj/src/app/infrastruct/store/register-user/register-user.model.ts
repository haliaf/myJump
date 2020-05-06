

export interface IRegisterUserModel extends IRegisterUserSimpleInfoDto {
  isLoading: boolean;
  isSaveError: boolean;
  saveError: string;
}

export interface IRegisterUserSimpleInfoDto {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  location: string;
}
