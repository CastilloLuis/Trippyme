import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loginPage: LoginPage;
  registerPage: RegisterPage;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  goTo(page: any) {
    let mymodal = this.modalCtrl.create(page);
    mymodal.present();
  }


}
