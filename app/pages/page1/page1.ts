import {Component, ViewChild, ElementRef} from '@angular/core';
import { Geolocation} from 'ionic-native';
import { NavController } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/page1/page1.html'
})

export class Page1 {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  
  constructor(public navCtrl: NavController) {
  }
  
  ionViewLoaded(){
         this.loadMap();
  }      
  
  loadMap(){
     Geolocation.getCurrentPosition().then((position) => {
        //Puntos 
        let punto1 =new google.maps.LatLng(-7.245252,-79.476013);
        let punto2= new google.maps.LatLng(-7.30517 ,-79.480232);
        let punto3= new google.maps.LatLng(-7.2500074,-79.4819764);
        

        //OpcionesMaps
        let mapOptions = {
         center: punto1,
          zoom: 11,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        
       
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     
     var marker1 = new google.maps.Marker({ position: punto1, map: this.map, title: 'Hello World!'});
 marker1.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
    
     var marker2 = new google.maps.Marker({ position: punto2, map: this.map, title: 'Hello World!'});
         marker2.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
    

     var marker3 = new google.maps.Marker({ position: punto3, map: this.map, title: 'Hello World!'});
         marker3.setIcon('http://maps.google.com/mapfiles/ms/icons/yellow-dot.png');

    }, (err) => {
      console.log(err);
    });
    
  }

}
