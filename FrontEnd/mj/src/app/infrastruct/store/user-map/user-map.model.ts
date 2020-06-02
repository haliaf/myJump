import { ICoordinateDto } from '../common/ICoordinate';
import { IMapEvent } from '../common/IMapEvent';

export interface IUserMapModel extends IUserMapModelInfoDto {
  isLoading: boolean;
  istabselected?: string;
  isRace: boolean;
  activeMapEvents: IMapEvent[];
  selectedStartCoordinateMapEvents: number;
}

export interface IUserMapModelInfoDto {
  StartCoordinate: ICoordinateDto;
  EndCoordinate: ICoordinateDto;
}
