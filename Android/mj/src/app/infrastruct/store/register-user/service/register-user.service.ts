import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IRegisterUserModel, IRegisterUserSimpleInfoDto } from '../register-user.model';



@Injectable({ providedIn: 'root' })
export class RegisterUserService {

  constructor(private http: HttpClient){}

  sendResponseRegister(registerDto: IRegisterUserModel): Observable<any> {
    const mapDto: IRegisterUserSimpleInfoDto  = {
        email: registerDto.email,
        username: registerDto.username,
        password: registerDto.password,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        location: registerDto.location
    };
    const urlPath = environment.apiUrl + '/api/api/accounts';
    return this.http.post<any>(urlPath, mapDto);
  }

  }

