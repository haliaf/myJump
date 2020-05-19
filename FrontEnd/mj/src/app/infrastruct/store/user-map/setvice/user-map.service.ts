import { ICoordinateDto } from './../../common/ICoordinate';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRegisterUserModel, IRegisterUserSimpleInfoDto } from '../register-user.model';
import { IUserMapModelInfoDto } from '../user-map.model';



@Injectable({ providedIn: 'root' })
export class UserMapService {

  constructor(private http: HttpClient){}

  sendResponsLoadCoordinate(request: IUserMapModelInfoDto): Observable<any> {
    const urlPath = environment.apiUrl + '/main/api/createMapEvent';
    return this.http.post<any>(urlPath, request);
  }

  }
  }

