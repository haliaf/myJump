import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class CountryCommonService {

constructor(private http: HttpClient){}

country: string[] = [
  'Россия',
  'Украина',
  'Белоруссия',
];

city: string[] = [
  'Москва',
  'Минск',
  'Киев',
];

getCountry(): string[] {
  return this.country;
}

getCity(): string[] {
  return this.city;
}

}
