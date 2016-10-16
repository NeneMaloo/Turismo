import { Component, ViewChild,ElementRef} from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Page1 } from './pages/page1/page1';
import { Page2 } from './pages/page2/page2';
import { Licor } from './pages/licor/licor';
import { Restaurant } from './pages/restaurant/restaurant';

@Component({
  templateUrl: 'build/app.html'
})

class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = Page1;
   icons: string[];
   pages: Array<{title: string, component: any,icon: string }>;

  constructor(public platform: Platform) {
    this.initializeApp();
    this.icons = ['restaurant', 'home', 'beer', 'home'];
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Page1,icon:this.icons[3]},
      { title: 'Restaurant', component: Restaurant,icon:this.icons[0]},
      { title: 'Hotel', component: Page2,icon: this.icons[1] },
      { title: 'Licoreria', component: Licor,icon: this.icons[2] }
     
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
           StatusBar.styleDefault();
    });
  }
  
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(MyApp);
   