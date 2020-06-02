import { ICoordinateDto } from './ICoordinate';
export interface IMapEvent {
  userId: number;
  id: number;
  startMapEvent: any;
  endMapEvent: any;
  startCoordinate: ICoordinateDto;
  stopCoordinate: ICoordinateDto;
}

export interface IConnectToMapEventRequestDto{
  mapEventId: number;
}

export enum RaceEvent{
  goToStartRace = 1,
  endRace,
  startRace
}

