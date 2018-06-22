import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvidersHttpProvider } from '../../providers/http-providers-http/http-providers-http';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { NativeStorage } from '@ionic-native/native-storage';

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
  logged_user = null;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private httpProvider: HttpProvidersHttpProvider, private loaderCtrl: LoadingController, 
              private userSto: ProvidersUsersStorageUsersProvider, private nativeSto: NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GenerateMemePage');
    this.selectedMeme=(this.navParams.get('data'));
    console.log(this.selectedMeme)

    this.nativeSto.getItem('loggeduser')
    .then(
      (data) => { 
        alert(data.username)
        this.logged_user = data.username;
      },
      (err) => alert(err)
    );    
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
        this.userSto.users.map((u) => {
          if(u.username === this.logged_user) {
            u.generatedMemes.push(this.responseMeme);
          }
        });
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
