import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class SexCommonService {

constructor(private http: HttpClient){}

sex: string[] = [
  'Мужской',
  'Женский',
];


getSex(): string[] {
  return this.sex;
}


}
