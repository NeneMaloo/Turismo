import {Component} from '@angular/core';
import {Modal, Platform, NavController, NavParams, ViewController,ModalController} from 'ionic-angular';


@Component({
  templateUrl: './build/pages/modals/modals.html'
})
export class Modals {
   constructor(public nav: NavController,public modalCtrl: ModalController) { 
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(ModalsContentPage);
    modal.present();
   }
}

@Component({
  templateUrl: './build/pages/modals/modal-content.html'
})
class ModalsContentPage {
 
  constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
  ) {}
    

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
