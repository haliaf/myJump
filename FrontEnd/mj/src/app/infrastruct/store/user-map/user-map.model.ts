import { ICoordinateDto } from '../common/ICoordinate';

export interface IUserMapModel extends IUserMapModelInfoDto {
  isLoading: boolean;
  istabselected?: string;
}
export interface IUserMapModelInfoDto {
  StartCoordinate: ICoordinateDto;
  EndCoordinate: ICoordinateDto;
}
