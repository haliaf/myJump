import { Component, OnInit, Renderer2, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Store } from '@ngrx/store';
import { IAppStore } from 'src/app/infrastruct/store/store-root.module';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})

export class GoogleMapComponent implements OnInit {
  @Input()
  userNavItemImg: string;

  @Input()
  mainIdCardElement: string;

  constructor(@Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2) { }

  ngOnInit() {
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
         var marker = new google.maps.Marker({
         position: myLatLng,
         map: map_` + this.mainIdCardElement + `,
        // content: '<div class="richmarker-wrapper"><center><img class="marker-image" src="` + this.userNavItemImg + `"></img><p class="marker-nickname">' + markerData.story.user.nickName + '</p></center></div>',
         icon: '` + this.userNavItemImg + `',
         title: 'User'
       });
       directionsDisplay.setMap(map_` + this.mainIdCardElement + `);
       //Здесь будем проверять директивой сверху
       map_` + this.mainIdCardElement + `.addListener('click', function(e) {
         if(startLatLngVal == null){
            window.localStorage.setItem('StartCoordinate', e.latLng);
          }
        startLatLngVal = e.latLng;
        placeMarker(e.latLng, map_` + this.mainIdCardElement + `);
        if(prevLatLngVal != null){
          window.localStorage.setItem('StopCoordinate', e.latLng);
          Route(prevLatLngVal, e.latLng);
        }
        prevLatLngVal = e.latLng;
    });

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

    function placeMarker(position, map) {
      var marker = new google.maps.Marker({
          position: position,
          map: map
      });
      map.panTo(position);
  }
     }
  }`;
    this.renderer2.appendChild(this.document.body, srcScript);
    const textScript = this.renderer2.createElement('script');
    // tslint:disable-next-line: max-line-length
    textScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDXKQwnYtbILKa-SAK4IZypJivKWTBKw38&callback=initMaps' + this.mainIdCardElement;
    this.renderer2.appendChild(this.document.body, textScript);
  }

}
