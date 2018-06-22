import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpProvidersHttpProvider } from '../../providers/http-providers-http/http-providers-http';
import { GenerateMemePage } from '../generate-meme/generate-meme';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  memes = [];
  memes_arr = [];
  logged_user = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpProviders: HttpProvidersHttpProvider,
              private modalCtrl: ModalController, private nativeSto: NativeStorage, private userSto: ProvidersUsersStorageUsersProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.nativeSto.getItem('loggeduser')
    .then(
      (data) => { 
        alert(data.username)
        this.logged_user = data.username;
        this.getMemes();
      },
      (err) => alert(err)
    );
  }

  getMemes() {
    this.httpProviders.fetch(null, 'GET', 'https://api.imgflip.com/get_memes')
      .subscribe((res) => {
        //console.log(res)
        this.memes_arr = res.data.memes;        
        for (let i = 0; i < 10; i++) {
          this.memes.push(this.memes_arr[this.memes.length]);
        }
        console.log(this.memes)
      });
  }

  generateMeme(data: any) {
   // console.log(data)
    let mymodal = this.modalCtrl.create(GenerateMemePage, {data: data});
    mymodal.present();
  }

  addToFavorites(memeData: any) {
    this.alreadyFavorited(memeData.id);
    /*if(this.alreadyFavorited(memeData.id)) {
      // the users has alerady favorited this meme
      alert('Ya haz agregado a favorites este meme');
    } else {*/
      // favorite the selected meme
      this.userSto.users.map((u) => {
        if(u.username === this.logged_user) {
          u.favorites.push(memeData);
        }
      });
    //}
  }

  getFavorites() {
    this.userSto.users.map((u) => {
      if(u.username === this.logged_user) {
        alert(JSON.stringify(u));
      }
    });
  }

  alreadyFavorited(memeID: any) {
    let fav;
    this.userSto.users.map((u) => {
      if(u.username === this.logged_user) {
        // este es el user q frao
        u.favorites.map((fav) => ((fav.id === memeID) ? fav = true : fav = false));
      }
    })
    return fav;
  }

  infiniteScroll(event) {
    setTimeout( ()=> {
      for (let i = 0; i < 10; i++) {
        this.memes.push(this.memes_arr[this.memes.length]);
      }    
      event.complete();
    }, 2000);
  }

}
