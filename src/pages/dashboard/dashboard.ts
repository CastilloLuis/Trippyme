import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HttpProvidersHttpProvider } from '../../providers/http-providers-http/http-providers-http';
import { GenerateMemePage } from '../generate-meme/generate-meme';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  memes = [];
  memes_arr = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpProviders: HttpProvidersHttpProvider,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
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

  infiniteScroll(event) {
    setTimeout( ()=> {
      for (let i = 0; i < 10; i++) {
        this.memes.push(this.memes_arr[this.memes.length]);
      }    
      event.complete();
    }, 2000);
  }

}
