import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController, ModalCmp, ModalController } from 'ionic-angular';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { NativeStorage } from '@ionic-native/native-storage';
import { TabsPage } from '../tabs/tabs';
import { helpers } from '../../global';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [helpers]
})
export class LoginPage {

  user_login = {};
  user_exists = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private userSto: ProvidersUsersStorageUsersProvider, private nativeSto: NativeStorage, 
              private loading: LoadingController, private alertCtrl: AlertController, private helpers: helpers,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginForm() {
    console.log(this.user_login);
    console.log(this.userSto.users);
    let userData;
    let loading = this.loading.create({
      content: 'Loading...',
      duration: 2000
    });
    if(!this.helpers.validateJSON(this.user_login, 2)){
      const alert = this.alertCtrl.create({
        title: 'Error :(',
        subTitle: 'You have to fill all the fields...',
        buttons: ['OK']
      });
      alert.present();
    } else {
      (this.userSto.users).map((u) => {
        if((u.username === this.user_login['username'])&&(u.password === this.user_login['password'])) {
          this.user_exists = true;
          userData = u;
        }
      });
      if(this.user_exists) {
        this.nativeSto.setItem('loggeduser', userData)
          .then(() => {
            loading.dismiss();
            this.navCtrl.setRoot(TabsPage);
          })
          .catch((err) => {
            alert('error al guardar' + err.message);
          })
      } else {
        const alert = this.alertCtrl.create({
          title: 'Wait a minute...',
          subTitle: 'You are not registered!',
          buttons: ['OK', {
            text: 'SIGN UP',
            handler: () => {
              this.closeit();
              (this.modalCtrl.create(RegisterPage)).present();
            }
          }]
        })
        alert.present();
      }      
    }
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
