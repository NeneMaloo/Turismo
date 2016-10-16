import {Component,ViewChild, ElementRef} from '@angular/core';
import {Geolocation,GoogleMap, GoogleMapsEvent} from 'ionic-native';
import {Modal, Platform, NavController, NavParams, ViewController,ModalController} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';

declare  var google;

var lati;
var long;
var coordpos;
var nombreRestaurant;


 @Component({
  selector:'restaurant',
  templateUrl: './build/pages/restaurant/restaurant.html'
})

export class Restaurant {
   restaurants: Array<{nombre: string, ciudad: string,altitud:number,latitud:number,ranking:number}>;

   constructor(public nav: NavController,public modalCtrl: ModalController) {

    this.restaurants = [
      { nombre: 'Antonio', ciudad: 'Guadalupe',altitud:-7.243776,latitud:-79.468881,ranking:4},
      { nombre: 'Pepes', ciudad: 'Guadalupe',altitud:-7.243629903398919,latitud:-79.47058618068695,ranking:3},
      { nombre: 'Rest3', ciudad: 'Guadalupe',altitud:-7.242922129448611,latitud:-79.470168,ranking:2},
      { nombre: 'Rest4', ciudad: 'Guadalupe',altitud:-7.243028561692569,latitud:-79.46998000144958,ranking:5}
    ];

   }

   openModal(la,lo,restaurant) {
     lati=Number(la);
     long=Number(lo);
     nombreRestaurant=restaurant;
     let modal = this.modalCtrl.create(MapaverPage);
     modal.present();
   }




   navegar(rest:any){
      this.nav.push(TabsPage,{n:rest.nombre});
     }
}

@Component({
  templateUrl: './build/pages/mapaver/mapaver.html'
})
class MapaverPage {
      mapa:any;
      public  pos:any;
      infowindow:any;
      nombreR:string;
      dirR:string;
      dirC:string;

      constructor(public navCtrl: NavController,public viewCtrl: ViewController,public params: NavParams, public platform: Platform) {
                 this.initializeMap();
                 this.nombreR=nombreRestaurant;
                 this.getDireccionGeo();
                 this.getDireccionRestaurant();
                console.log(this.getDireccionGeo(),this.getDireccionRestaurant())
      }

     initializeMap() {
      this.platform.ready().then(() => {
         Geolocation.getCurrentPosition().then((resp) => {});
         let options = { zoom: 16,mapTypeId: google.maps.MapTypeId.ROADMAP,
		          setMyLocationEnabled: true}
         this.mapa = new google.maps.Map(document.getElementById('mapa'), options);

	     var geocoder = new google.maps.Geocoder;
	     var serviceGeoReverse = new google.maps.Geocoder;
         var directionsService = new google.maps.DirectionsService;
	     var directionsDisplay = new google.maps.DirectionsRenderer;



         navigator.geolocation.getCurrentPosition((position) => {

         	this.pos = {lat:position.coords.latitude,lng: position.coords.longitude};
         	serviceGeoReverse.geocode({'location':this.pos},(ciudad, estado) =>{
	            if (estado === google.maps.GeocoderStatus.OK) {
	               if (ciudad[1]){ this.setDireccionGeo(ciudad[1].formatted_address.toString());
	                   }else{ alert('No se encontrado resultado');console.log(status);}
	                }else {alert('Geocoder fallo en : ' + status);console.log(status);
	             }
             });

            geocoder.geocode({'location':{lat:lati, lng:long}},(results, status) =>{
              if (status === google.maps.GeocoderStatus.OK) {
                   if (results[1]) {
                        this.setDireccionRestaurant(results[0].formatted_address.toString());

                        directionsService.route({ origin:this.pos,
              	                                 destination:{lat:lati, lng:long},
              	                                 travelMode: google.maps.TravelMode.DRIVING},
              	                                 (reslt,est) =>{
                            if (est=== google.maps.DirectionsStatus.OK) {
                                  directionsDisplay.setDirections(reslt);
                                  directionsDisplay.setMap(this.mapa);

                                }else{
                               window.alert('Directions consultada fallida ' + status);
                            }
                        });
                   }else {
                       alert('Resultado no encontrado');
                        console.log(status);
                   }
                }else {
                  alert('Geocoder failed due to: ' + status);
                  console.log(status);
                }
             });
               console.log(this.pos);
           }, (error) => {console.log("Error")});
        });
   }

    setDireccionGeo(direccionCiudad:string){
       this.dirC=direccionCiudad;
    }

    getDireccionGeo(){
           return this.dirC;
    }


    setDireccionRestaurant(direccionRestaurant:string){
    	this.dirR=direccionRestaurant;
     }

    getDireccionRestaurant(){
    	return this.dirR;
    }

    dismiss() {
        this.viewCtrl.dismiss();
     }

}
