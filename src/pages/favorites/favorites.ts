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

  constructor(public navCtrl: NavController, public navParams: NavParams, private userSto: ProvidersUsersStorageUsersProvider,
              private nativeSto: NativeStorage) {
  }

  ionViewDidLoad() {
    this.nativeSto.getItem('loggeduser')
    .then(
      (data) => { 
        alert(data.username)
        this.logged_user = data.username;
        this.userSto.users.map((u) => {
          if(u.username === this.logged_user) {
            this.myfavorites = u.favorites
          }
        });         
      },
      (err) => alert(err)
    );      
  }

  unFavorite(memeData: any) {
    console.log(memeData);
  }

}
