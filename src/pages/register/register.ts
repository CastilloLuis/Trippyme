import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
//import { NativeStorage } from '@ionic-native/native-storage';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { helpers } from '../../global';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',

})
export class RegisterPage {
  
  users = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private loadingCtrl: LoadingController, private userSto: ProvidersUsersStorageUsersProvider,
              private toastCtrl: ToastController, private helpers: helpers) {
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
    const success = this.toastCtrl.create({
      message: 'Succesfull register!!',
      duration: 1500,
      cssClass: 'addedToast'
    });
    if(this.helpers.validateJSON(this.users)) {
      alert('Please fill all the fields!');
    } else {
      this.users['likes'] = [];
      this.users['generatedMemes'] = [];
      console.log(this.users)
      this.userSto.users.push(this.users); // save w the provider
      loader.present();
      loader.onDidDismiss(() => {
        success.present();
        success.onDidDismiss(() => this.closeit())
      });
      console.log(this.userSto.users);      
    }

  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
