import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
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
              private userSto: ProvidersUsersStorageUsersProvider, private nativeSto: NativeStorage, private loading: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm() {
    console.log(this.user_login);
    console.log(this.userSto.users);
    let loading = this.loading.create({
      content: 'Loading...',
      duration: 2000
    });
    loading.present();
    let userData;
    (this.userSto.users).map((u) => {
      if((u.username === this.user_login['username'])&&(u.password === this.user_login['password'])) {
        this.user_exists = true;
        userData = u;
      }
    });
    // alert(userData)
    if(this.user_exists) {
      this.nativeSto.setItem('loggeduser', userData)
        .then(() => {
          // console.log('la q frao la q frinchixdxd')
          loading.dismiss();
          this.navCtrl.setRoot(DashboardPage);
        })
        .catch((err) => {
          alert('error al guardar' + err.message);
        })
    } else {
      alert('No estas registrado broo');
    }
  }

  closeit() {
    this.viewCtrl.dismiss();
  }
}
