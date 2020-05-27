import { ICoordinateDto } from './ICoordinate';
export interface IMapEvent {
  UserId: number;
  StartMapEvent: any;
  EndMapEvent: any;
  StartCoordinate: ICoordinateDto;
  StopCoordinate: ICoordinateDto;
}



