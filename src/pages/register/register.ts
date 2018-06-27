import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
//import { NativeStorage } from '@ionic-native/native-storage';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { helpers } from '../../global';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [helpers]

})
export class RegisterPage {
  
  users = {};
  emailRegex = /([A-Za-z0-9]+)(@)([A-Za-z0-9]+)\.(com|net|org)$/;
  invalid = /\s/;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private loadingCtrl: LoadingController, private userSto: ProvidersUsersStorageUsersProvider,
              private toastCtrl: ToastController, private helpers: helpers, private nativeSto: NativeStorage,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  registerForm() {
    const loader = this.loadingCtrl.create({
      content: 'Loading...',
      duration: 2000
    });
    const success = this.toastCtrl.create({
      message: 'SUCCESSFUL REGISTER !!',
      duration: 1500,
      cssClass: 'addedToast'
    });    
    if(this.validWhiteSpaces()) {
      this.createAlert('Error :(', 'You can not use white spaces...');
    } else {
      if(!this.helpers.validateJSON(this.users, 4)) {
        this.createAlert('Error :(', 'You have to fill all the fields...');
      } else {
        if((this.emailRegex.test(this.users['email']))){
          if((this.verifyUser(this.users['username'], this.users['email'])).status) {
            this.createAlert('Error :(', 'Username or email already exists...');
          } else {
            this.users['favorites'] = [];
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
        } else {
            this.createAlert('Error :(', 'Please, enter a valid email...');
        }
      }
    }
    console.log(this.users);
    /**/
  }

  verifyUser(username: string, email: string) {
    let exists = false;
    this.userSto.users.map((u) => (((u.username === username) || (u.email === email)) ? exists = true : exists));
    return {status: exists, msg: 'Username or email already exists...'};
  }

  validWhiteSpaces() {
    let invalid = false;
    let userdata = Object.assign({}, this.users);
    delete userdata['fullname'];
    console.log(userdata)
    for(let params in userdata) {
      if(this.invalid.test(userdata[params])) {
        invalid = true;
      }
    }
    return invalid;
  }

  createAlert(title: string, subtitle: string) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subtitle,
      buttons: ['OK']
    });
    alert.present();
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
