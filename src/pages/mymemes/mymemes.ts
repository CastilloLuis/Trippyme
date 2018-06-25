import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the MymemesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mymemes',
  templateUrl: 'mymemes.html',
})
export class MymemesPage {

  logged_user = null;
  mymemes = [];
  hasgenerated = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userSto: ProvidersUsersStorageUsersProvider,
              private nativeSto: NativeStorage) {
  }

  ionViewDidLoad() {
    this.nativeSto.getItem('loggeduser')
    .then(
      (data) => { 
        // alert(data.username)
        this.logged_user = data.username;
        this.userSto.users.map((u) => {
          if(u.username === this.logged_user) {
            this.mymemes = u.generatedMemes;
          }
        });          
      },
      (err) => alert(err)
    );      
    if(!(this.mymemes.length === 0)) {
      this.hasgenerated = true;
    }    
  }

  getMyMemes() {
    this.userSto.users.map((u) => {
      if(u.username === this.logged_user) {
        alert(JSON.stringify(u));
      }
    });
  }

  /*setStyle() {
    let styles = {
      'visibility': this.hasgenerated ? 'visible' : 'hidden',
      'margin-top': '2%'
    }
    return styles;
  }*/
  
}
