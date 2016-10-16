import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import {NavController,NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})

export class TabsPage {

  public tab1Root: any;
  public tab2Root: any;
  public tab3Root: any;
  public tab1Param:any;

    constructor(public navCtrl: NavController,  params: NavParams) {
      

       this.tab1Param = {
                     nombre: params.get("n")
       };

         this.tab1Root = HomePage;
         this.tab2Root = AboutPage;
         this.tab3Root = ContactPage;

      }

}
