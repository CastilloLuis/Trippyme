import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  logged_user  = null;
  myfavorites = [];
  hasfavorite = false;

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
            this.myfavorites = u.favorites
          }
        });         
      },
      (err) => alert('No haz iniciado sesión')
    );      
    if(this.myfavorites.length > 0 ) {
      this.hasfavorite = true;
    }
  }

  unFavorite(memeData: any) {
    this.userSto.users.map((u) => {
      if(this.logged_user === u.username) {
        u.favorites.map((f) => {
          if(f.id === memeData.id) {
            u.favorites.splice((u.favorites.indexOf(f)), 1);
          }
        })
      }
    })
  }

  /*setStyle() {
    let styles = {
      'visibility': this.hasfavorite ? 'visible' : 'hidden',
      'margin-top': '2%'
    }
    return styles;
  }*/

}
