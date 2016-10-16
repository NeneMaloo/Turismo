import {Component, ViewChild, ElementRef} from '@angular/core';
import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng,Geolocation} from 'ionic-native';
import {NavController,Platform } from 'ionic-angular';


declare var google:any;
@Component({
  templateUrl: 'build/pages/page1/page1.html'
})
export class Page1 {

   map:any;
   constructor(public navCtrl: NavController, public platform: Platform) {
      this.initializeMapa();
      google.maps.event.addDomListener(window,"load", this.initializeMapa);
   }

   initializeMapa(){

     	this.platform.ready().then(() => {
        Geolocation.getCurrentPosition().then((resp) => {
        var minZoomLevel = 15;
          this.map = new google.maps.Map(document.getElementById('map'), {
             zoom: minZoomLevel,
             center: new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude),
             mapTypeId: google.maps.MapTypeId.ROADMAP
           });

        }).catch((error) => { console.log('Error getting location', error);});



		 });
    }
}
