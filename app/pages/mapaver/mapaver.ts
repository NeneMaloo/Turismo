import {Component, ViewChild, ElementRef} from '@angular/core';
import {Geolocation,GoogleMap, GoogleMapsEvent} from 'ionic-native';
import {NavController,ViewController } from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/mapaver/mapaver.html'
})
export class Mapaver {
   
    constructor(public navCtrl: NavController,public viewCtrl: ViewController) {
   
    }

    dismiss() {
        this.viewCtrl.dismiss();
     }

}
