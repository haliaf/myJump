import { element } from 'protractor';
import { IMapEvent,  RaceEvent } from './../../../infrastruct/store/common/IMapEvent';
import { ICoordinateDto } from './../../../infrastruct/store/common/ICoordinate';
import { Component, OnInit, Renderer2, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';

@Component({
  selector: 'app-google-map-race',
  templateUrl: './google-map-race.component.html',
  styleUrls: ['./google-map-race.component.scss']
})

export class GoogleMapRaceComponent implements OnInit {
  @Input()
  userNavItemImg: string;

  @Input()
  startEventDotted?: IMapEvent[];

  @Input()
  receEvent?: RaceEvent;

  @Input()
  mainIdCardElement: string;

  constructor(@Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2) { }

  ngOnInit() {
    this.mainIdCardElement = this.mainIdCardElement + this.receEvent;
    const srcScript = this.renderer2.createElement('script');
    srcScript.type = 'text/javascript';
    srcScript.text = `
    {
      var icons = {
        userNav: {
         icon: '\mj\assets\img\' + 'navUsr.png'

        }
      };
      var prevLatLngVal = null;
      var startLatLngVal = null;
      var directionsService = null;
      var directionsDisplay;
      function updateUserPoint(mapPoint){
        navigator.geolocation.getCurrentPosition(function (position) {
          console.log('udate');
          var point = new google.maps.LatLng(position.coords.latitude,
            position.coords.longitude);
          mapPoint.setPosition(point);
        });
      }
      function initMaps` + this.mainIdCardElement + `() {
        if (navigator.geolocation) {
           console.log('Geolocation is supported!');
         }
         else {
           console.log('Geolocation is not supported for this Browser/OS version yet.');
         }
           navigator.geolocation.getCurrentPosition(initMap` + this.mainIdCardElement + `);
      }
     function initMap` + this.mainIdCardElement + `(startPos) {
       var myLatLng =  {lat: startPos.coords.latitude, lng: startPos.coords.longitude};
       // Styles a map in night mode.
       directionsService = new google.maps.DirectionsService();
       var directionsDisplay = new google.maps.DirectionsRenderer;

       var map_` + this.mainIdCardElement + ` = new google.maps.Map(document.getElementById('` + this.mainIdCardElement + `'), {
        zoom: 16,
        center: myLatLng,
         styles: [
           {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
           {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
           {
             featureType: 'administrative.locality',
             elementType: 'labels.text.fill',
             stylers: [{color: '#d59563'}]
           },
           {
             featureType: 'poi',
             elementType: 'labels.text.fill',
             stylers: [{color: '#d59563'}]
           },
           {
             featureType: 'poi.park',
             elementType: 'geometry',
             stylers: [{color: '#263c3f'}]
           },
           {
             featureType: 'poi.park',
             elementType: 'labels.text.fill',
             stylers: [{color: '#6b9a76'}]
           },
           {
             featureType: 'road',
             elementType: 'geometry',
             stylers: [{color: '#38414e'}]
           },
           {
             featureType: 'road',
             elementType: 'geometry.stroke',
             stylers: [{color: '#212a37'}]
           },
           {
             featureType: 'road',
             elementType: 'labels.text.fill',
             stylers: [{color: '#9ca5b3'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'geometry',
             stylers: [{color: '#746855'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'geometry.stroke',
             stylers: [{color: '#1f2835'}]
           },
           {
             featureType: 'road.highway',
             elementType: 'labels.text.fill',
             stylers: [{color: '#f3d19c'}]
           },
           {
             featureType: 'transit',
             elementType: 'geometry',
             stylers: [{color: '#2f3948'}]
           },
           {
             featureType: 'transit.station',
             elementType: 'labels.text.fill',
             stylers: [{color: '#d59563'}]
           },
           {
             featureType: 'water',
             elementType: 'geometry',
             stylers: [{color: '#17263c'}]
           },
           {
             featureType: 'water',
             elementType: 'labels.text.fill',
             stylers: [{color: '#515c6d'}]
           },
           {
             featureType: 'water',
             elementType: 'labels.text.stroke',
             stylers: [{color: '#17263c'}]
           }
         ]
       });

       ` + this.calculateStartDotted() + `
         var marker = new google.maps.Marker({
         position: myLatLng,
         map: map_` + this.mainIdCardElement + `,
       //  content: '<div class="richmarker-wrapper"><center><img class="marker-image" src="` + this.userNavItemImg + `"></img><p class="marker-nickname">' + markerData.story.user.nickName + '</p></center></div>',
         icon: '` + this.userNavItemImg + `',
         title: 'User'
       });
       setInterval(function () {
      //  updateUserPoint(marker); отключено дабы не сожрать mapy
    }, 5000);

       directionsDisplay.setMap(map_` + this.mainIdCardElement + `);


    function setMyPosition(userNavItemImg, mainIdCardElement) {
      var marker = new google.maps.Marker({
        position: myLatLng,
        map: map_ + mainIdCardElement,
       // content: '<div class="richmarker-wrapper"><center><img class="marker-image" src="userNavItemImg"></img><p class="marker-nickname">' + markerData.story.user.nickName + '</p></center></div>',
        icon: 'userNavItemImg',
        title: 'User'
      });
      };

    function Route(cord1, cord2) {
      var start = cord1;
      var end = cord2;
      var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.WALKING
      };
      directionsService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(result);
        } else {
          alert("couldn't get directions:" + status);
        }
      });
    }

    function placeMarkerRouteEvent(position, position2, map, labelText, eventId) {
      var marker = new google.maps.Marker({
          position: position,
          map: map,
          label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: labelText }
      });
      marker.addListener('click', function() {
//Route(position,position2);
    //    map.setCenter(marker.getPosition());
   //     window.localStorage.setItem('SelectStartPosition', eventId);
      });
      //map.panTo(position);
  }

    function placeMarker(position, map, labelText) {
      var marker = new google.maps.Marker({
          position: position,
          map: map,
          label: { color: '#00aaff', fontWeight: 'bold', fontSize: '14px', text: labelText }
      });
      marker.addListener('click', function() {
        map.setCenter(marker.getPosition());
      });
      //map.panTo(position);
  }
     }
  }`;

    this.renderer2.appendChild(this.document.body, srcScript);
    const textScript = this.renderer2.createElement('script');
    // tslint:disable-next-line: max-line-length
    textScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDXKQwnYtbILKa-SAK4IZypJivKWTBKw38&callback=initMaps' + this.mainIdCardElement;
    this.renderer2.appendChild(this.document.body, textScript);
  }
  calculateStartDotted(){
    let cretedDotted =  '';
    const text = "'гонко'";
    if(this.receEvent == RaceEvent.startRace){
      this.startEventDotted.forEach(element => {
        let latLng = element.startCoordinate;
        let latLng2 = element.stopCoordinate;
        cretedDotted = cretedDotted +  `Route({lat: `+latLng.latitude+`, lng: `+latLng.longitude+`}, {lat: `+latLng2.latitude+`, lng: `+latLng2.longitude+`});`;
      });
    }
    if(!!this.startEventDotted){
    this.startEventDotted.forEach(element => {
      let latLng = element.startCoordinate;
      let latLng2 = element.stopCoordinate;
      cretedDotted = cretedDotted +  `placeMarkerRouteEvent({lat: `+latLng.latitude+`, lng: `+latLng.longitude+`}, {lat: `+latLng2.latitude+`, lng: `+latLng2.longitude+`}, map_` + this.mainIdCardElement + `,` + text+`,`+element.id+`);`;
    });
  }
    return cretedDotted;
  }

}
