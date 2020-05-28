import { ICoordinateDto } from './ICoordinate';
export interface IMapEvent {
  userId: number;
  id: number;
  startMapEvent: any;
  endMapEvent: any;
  startCoordinate: ICoordinateDto;
  stopCoordinate: ICoordinateDto;
}



