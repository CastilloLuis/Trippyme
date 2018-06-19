import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvidersHttpProvider } from '../../providers/http-providers-http/http-providers-http';

/**
 * Generated class for the GenerateMemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-generate-meme', 
  templateUrl: 'generate-meme.html',
})
export class GenerateMemePage {

  text0: string;
  text1: string;
  selectedMeme: Object;
  responseMeme: string;
  generated = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private httpProvider: HttpProvidersHttpProvider, private loaderCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateMemePage');
    this.selectedMeme=(this.navParams.get('data'));
    console.log(this.selectedMeme)
  }

  generateMeme(memeID: any) {
    const loader = this.loadingModal();
    loader.present();
    console.log(this.text0)
    console.log(this.text1)
    console.log(memeID)
    this.httpProvider.fetch(null, 'GET', `https://api.imgflip.com/caption_image?username=lcastillo&password=26709417&template_id=${memeID}&text0=${this.text0}&text1=${this.text1}`)
      .subscribe((res) => {
        loader.dismiss();     
        this.generated = true;   
        this.responseMeme = res.data.url;
        console.log(JSON.stringify(res))
      })
  }

  setSlide() {
    let styles = {
      'visibility': this.generated ? 'visible' : 'hidden',
      'margin-top': '2%'
    }
    return styles;
  }

  loadingModal() {
    const loading = this.loaderCtrl.create({
      content: 'Generating...',
      spinner: 'dots'
    });
    return loading;
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
