import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';
import { AuthService } from 'src/app/shared/services';

@Component({
  templateUrl: 'drag.component.html',
  styleUrls: [ './drag.component.scss' ]
})

export class DragComponent implements OnInit {
  speedValue = 10;
  currentPosition = null
  constructor( private _store: Store<IAppStore>, private authService: AuthService){
  ;

  }
  ngOnInit() {
    setInterval(() => {
      this.geolocationWrapper(); 
    }, 1000);
 }



 firstGeolocationSuccess(position1) {
  this.currentPosition = position1;
  navigator.geolocation.watchPosition(
    (function (position2) {
      this.speedValue = this.calculateSpeed(this.currentPosition.coords.latitude, this.currentPosition.coords.longitude, position2.coords.latitude, position2.coords.longitude);
      this.currentPosition = position2;
      console.log(this.speedValue);
    }).bind(this));
}


geolocationWrapper() {

  navigator.geolocation.getCurrentPosition(this.firstGeolocationSuccess.bind(this));
 
  
}

calculateSpeed(lat1, lng1, lat2, lng2) {
 
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
  var dLon = (lng2 - lng1) * Math.PI / 180;
  var a = 
     0.5 - Math.cos(dLat)/2 + 
     Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
     (1 - Math.cos(dLon))/2;

  return R * 2 * Math.asin(Math.sqrt(a));
}
}
