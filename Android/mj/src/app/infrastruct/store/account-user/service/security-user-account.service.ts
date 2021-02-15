import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IUserAccountDto } from '../model/IUserAccountDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AccountUserService {

   constructor(
    private http: HttpClient
   ) { }

   getUserAccount(): Observable<IUserAccountDto> {
    const urlPath = environment.apiUrl + '/api/api/accounts';
    return this.http.get<IUserAccountDto>(urlPath);
  }
   //   const urlPath = environment.webApiUrl + '/user/infosimple?_t=' + environment.token;
    //  return this._http.get<ISystemUserSimpleInfoDto>(urlPath, { withCredentials: true }); // PortalHttpOptions.VALUE


}
