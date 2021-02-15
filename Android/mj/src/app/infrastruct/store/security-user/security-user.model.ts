

export interface ISecurityUserModel extends ISystemUserSimpleInfoDto, ISystemUserAccessInfoDto {
  isLoading: boolean;
}

export interface ISystemUserSimpleInfoDto {
  timezone: number;
  //individual: IIndividualSimpleUserDto;
//  reportServerUrl?: string;
 // authError: string;
  userName: string;
}

export interface ISystemUserAccessInfoDto {
   /** Признак того, что пользователю назначена хотя бы одна административная роль */
   isAdmin: boolean;

   /** Признак что пользователю назначена роль "Sng: Представитель заказчика".
    * '?' - чтобы можно было понять подгружались ли уже данные с сервака.*/
   isCustomerRepresentative?: boolean;

   /** ИД компаний, обращения по которым может просматривать пользователь. */
   organizationKeys: Array<string>;

   /** Признак что у пользователя есть разрешение на редактирование */
   canEdit?: boolean;

   accessError: string;
}
export interface ISecurityUserRegisterModel {
  isLoading: boolean;
}
