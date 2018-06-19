import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
//import { NativeStorage } from '@ionic-native/native-storage';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',

})
export class RegisterPage {
  
  users = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private loadingCtrl: LoadingController, private userSto: ProvidersUsersStorageUsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerForm() {
    console.log(this.users);
    const loader = this.loadingCtrl.create({
      content: 'Loading...',
      duration: 2000
    });
    this.users['likes'] = [];
    this.users['generatedMemes'] = [];
    console.log(this.users)
    this.userSto.users.push(this.users); // save w the provider
    loader.present();
    console.log(this.userSto.users);
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
