import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { NativeStorage } from '@ionic-native/native-storage';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user_login = {};
  user_exists: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private userSto: ProvidersUsersStorageUsersProvider, private nativeSto: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm() {
    console.log(this.user_login);
    console.log(this.userSto.users);
    let userData;
    this.navCtrl.setRoot(DashboardPage);
    (this.userSto.users).map((u) => {
      if((u.username === this.user_login['username'])&&(u.password === this.user_login['password'])) {
        this.user_exists = true;
        userData = u;
      }
    });
    if(this.user_exists) {
      /*this.nativeSto.setItem('loggeduser', userData)
        .then(() => {
          alert('perfect bitch')
          this.navCtrl.setRoot(DashboardPage);
        })
        .catch((err) => {
          alert('error al guardar' + err.message);
        })*/
    } else {
      alert('no estas registrado bro');
    }
    this.user_exists = false;
  }

  closeit() {
    this.viewCtrl.dismiss();
  }
}
