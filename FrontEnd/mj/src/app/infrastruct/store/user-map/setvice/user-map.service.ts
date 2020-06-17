import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserMapModelInfoDto, IUserMapModel } from '../user-map.model';
import { IConnectToMapEventRequestDto } from '../../common/IMapEvent';



@Injectable({ providedIn: 'root' })
export class UserMapService {

  constructor(private http: HttpClient){}

  sendResponsLoadCoordinate(request: IUserMapModel ): Observable<any> {
    const dto : IUserMapModelInfoDto =   {
      StartCoordinate: request.StartCoordinate,
      EndCoordinate: request.EndCoordinate
    };
    const urlPath = environment.apiUrl + '/main/api/Map/createMapEvent';
    return this.http.post<any>(urlPath, dto);
  }
  getMapEvents(): Observable<any> {
    const urlPath = environment.apiUrl + '/main/api/Map/getMapEvent';
    return this.http.get<any>(urlPath);
  }
  startMapEvents(): Observable<any> {
    const urlPath = environment.apiUrl + '/main/api/Map/startMapEvent';
    return this.http.put<any>(urlPath, 1);
  }
  connectToMapEvents(startCoordinate): Observable<any> {
    const urlPath = environment.apiUrl + '/main/api/Map/connectToMapEvent';
    const dto: IConnectToMapEventRequestDto = {
      mapEventId: startCoordinate
    };
    return this.http.put<any>(urlPath, dto);
  }
  }


