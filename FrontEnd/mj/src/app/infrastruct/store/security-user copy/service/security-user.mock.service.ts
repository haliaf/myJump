import { ISystemUserAccessInfoDto, ISystemUserSimpleInfoDto } from '../security-user.model';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SecurityUserMockService {

   constructor() { }

   getUserInfoAccess(): Observable<ISystemUserAccessInfoDto> {
      const res: ISystemUserAccessInfoDto = {
         isAdmin: false,
         isCustomerRepresentative: false,
         organizationKeys: null,
         canEdit: true,
         accessError: ''
      };
      return of(res).pipe(delay(1000));
   }
   getUserUserSimpleInfo(): Observable<ISystemUserSimpleInfoDto> {
    const res: ISystemUserSimpleInfoDto = {
       userName: 'test',
       timezone: 1
    };
    return of(res).pipe(delay(1000));
 }


}
