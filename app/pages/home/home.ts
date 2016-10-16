import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Restaurant } from "../restaurant/restaurant";


@Component({
  templateUrl: 'build/pages/home/home.html'
})

export class HomePage {
  
  public parametro:any;

   constructor(public navCtrl: NavController,params: NavParams) {
        
        this.parametro=params.data.nombre;
        console.log("Passed params", params.data);
   }
}
