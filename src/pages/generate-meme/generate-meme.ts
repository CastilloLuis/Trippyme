import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { HttpProvidersHttpProvider } from '../../providers/http-providers-http/http-providers-http';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { NativeStorage } from '@ionic-native/native-storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoLibrary } from '@ionic-native/photo-library';

@IonicPage()
@Component({
  selector: 'page-generate-meme', 
  templateUrl: 'generate-meme.html',
  providers: [SocialSharing, PhotoLibrary]
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
              private userSto: ProvidersUsersStorageUsersProvider, private nativeSto: NativeStorage,
              private socialMediaSharing: SocialSharing, private galleryCtrl: PhotoLibrary) {
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
  
  socialSharing(socialnetwork: any) {
    switch (socialnetwork){
      case 'whatsapp':
        this.socialMediaSharing.shareViaWhatsApp(
          'Look the meme that I generate with Trippy-me app!!',
          this.responseMeme,
          null
        );
        break;

      case 'twitter':
        this.socialMediaSharing.shareViaTwitter(
          'Look the meme that I generate with Trippy-me app!!',
          this.responseMeme,
          null          
        )
        break;

      case 'instagram':
        this.socialMediaSharing.shareViaInstagram(
          'This meme was generated by Trippy-me app!!',
          this.responseMeme
        )
        break;

      case 'gallery':
      this.galleryCtrl.requestAuthorization()
        .then(() => {
          this.galleryCtrl.saveImage(this.responseMeme, 'TrippyMe', null)
            .then(() => alert('Saved successfully'))
            .catch((err) => alert('Error while saving...' + err));        
        })
        .catch((err) => alert('Error while saving the picture :(' + err))
        break;
    }
  }

  closeit() {
    this.viewCtrl.dismiss();
  }

}
