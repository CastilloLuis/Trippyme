import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  goTo(page) {
    console.log(page)
    let p = ((page === 'LoginPage' ? LoginPage : RegisterPage));
    let mymodal = this.modalCtrl.create(p);
    mymodal.present();
  }


}
