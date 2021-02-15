import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISystemUserAccessInfoDto, ISystemUserSimpleInfoDto } from '../security-user.model';
import { SecurityUserMockService } from './security-user.mock.service';


@Injectable({ providedIn: 'root' })
export class SecurityUserService {

   constructor(
      private _mockSrv: SecurityUserMockService
   ) { }

   getUserInfoSimple(): Observable<ISystemUserSimpleInfoDto> {
     return this._mockSrv.getUserUserSimpleInfo();
  }
   //   const urlPath = environment.webApiUrl + '/user/infosimple?_t=' + environment.token;
    //  return this._http.get<ISystemUserSimpleInfoDto>(urlPath, { withCredentials: true }); // PortalHttpOptions.VALUE


   getUserInfoAccess(): Observable<ISystemUserAccessInfoDto> {
   //   const urlPath = environment.webApiUrl + '/user/infoaccess?_t=' + environment.token;
      return this._mockSrv.getUserInfoAccess()
      //   ? this._mockSrv.getUserInfoAccess()
      //   : this._http.get<ISystemUserAccessInfoDto>(urlPath, { withCredentials: true });
   }
}
