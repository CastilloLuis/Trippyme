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

  // getting img id
  memegeneratorurl: string = 'https://api.imgflip.com/caption_image?template_id=112126428&username=lcastillo&password=26709417&text0=holaa&text1=quetal';
  memes = [];

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
        this.memes = res.data.memes;
        //console.log(this.memes)
      });
  }

  generateMeme(data: any) {
   // console.log(data)
    let mymodal = this.modalCtrl.create(GenerateMemePage, {data: data});
    mymodal.present();
  }

}
