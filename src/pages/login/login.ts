import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { NativeStorage } from '@ionic-native/native-storage';
import { DashboardPage } from '../dashboard/dashboard';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user_login = {};
  user_exists = false;

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
    (this.userSto.users).map((u) => {
      if((u.username === this.user_login['username'])&&(u.password === this.user_login['password'])) {
        this.user_exists = true;
        userData = u;
      }
    });
    alert(userData)
    if(this.user_exists) {
      this.nativeSto.setItem('loggeduser', userData)
        .then(() => {
          alert('la q frao la q frinchixdxd')
          this.navCtrl.setRoot(DashboardPage);
        })
        .catch((err) => {
          alert('error al guardar' + err.message);
        })
    }
  }

  closeit() {
    this.viewCtrl.dismiss();
  }
}
