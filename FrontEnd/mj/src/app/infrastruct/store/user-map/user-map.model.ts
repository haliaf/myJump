import { ICoordinateDto } from '../common/ICoordinate';
import { IMapEvent } from '../common/IMapEvent';

export interface IUserMapModel extends IUserMapModelInfoDto {
  isLoading: boolean;
  istabselected?: string;
  activeMapEvents: IMapEvent[];
}

export interface IUserMapModelInfoDto {
  StartCoordinate: ICoordinateDto;
  EndCoordinate: ICoordinateDto;
}
