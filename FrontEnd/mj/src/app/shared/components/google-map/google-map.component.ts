import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements OnInit {

  constructor(   @Inject(DOCUMENT) private document: Document,
                 private renderer2: Renderer2) { }

  ngOnInit() {


    const srcScript = this.renderer2.createElement('script');
    srcScript.type = 'text/javascript';
    srcScript.text = `
    function initMaps() {
      if (navigator.geolocation) {
         console.log('Geolocation is supported!');
       }
       else {
         console.log('Geolocation is not supported for this Browser/OS version yet.');
       }
         navigator.geolocation.getCurrentPosition(initMap);
    }
   function initMap(startPos) {
     var myLatLng =  {lat: startPos.coords.latitude, lng: startPos.coords.longitude};
     // Styles a map in night mode.
     var map = new google.maps.Map(document.getElementById('map'), {
       center: myLatLng,
       zoom: 16,
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
       map: map,
       title: 'Hello World!'
     });
   }
    `;
    this.renderer2.appendChild(this.document.body, srcScript);
    const textScript = this.renderer2.createElement('script');
    textScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDXKQwnYtbILKa-SAK4IZypJivKWTBKw38&callback=initMaps';
    this.renderer2.appendChild(this.document.body, textScript);
  }

}
