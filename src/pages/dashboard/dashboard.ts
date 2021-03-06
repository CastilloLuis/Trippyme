import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpProvidersHttpProvider } from '../../providers/http-providers-http/http-providers-http';
import { GenerateMemePage } from '../generate-meme/generate-meme';
import { NativeStorage } from '@ionic-native/native-storage';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { HomePage } from '../home/home';

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
    // this.getMemes();
    this.nativeSto.getItem('loggeduser')
    .then(
      (data) => { 
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
    // alert(this.alreadyFavorited(memeData.id));
    if(this.alreadyFavorited(memeData.id)) {
      // the users has alerady favorited this meme
      alert('You already favorited this meme');
    } else {
      // favorite the selected meme
      this.userSto.users.map((u) => {
        if(u.username === this.logged_user) {
          u.favorites.push(memeData);
        }
      });
    }
  }

  alreadyFavorited(memeID: any) {
    let favorite = false;
    this.userSto.users.map((u) => {
      if(u.username === this.logged_user) {
        u.favorites.map((f) => {
          if(memeID === f.id) {
            favorite = true;
          }
        })
      }
    })
    return favorite;
  }

  logOut() {
    this.nativeSto.clear()
      .then(() => {
        alert('Logged out');
        // this.navCtrl.setRoot(HomePage);
        this.navCtrl.parent.parent.setRoot(HomePage)
      })
      .catch(() => alert('Error while logout action...'))
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
