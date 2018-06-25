import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
  }

  goTo(page) {
    console.log(page)
    let p = ((page === 'LoginPage' ? LoginPage : RegisterPage));
    let mymodal = this.modalCtrl.create(p);
    mymodal.present();
  }


}
