import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProvidersUsersStorageUsersProvider } from '../../providers/providers-users-storage-users/providers-users-storage-users';
import { NativeStorage } from '@ionic-native/native-storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { PhotoLibrary } from '@ionic-native/photo-library';


@IonicPage()
@Component({
  selector: 'page-mymemes',
  templateUrl: 'mymemes.html',
  providers: [SocialSharing, PhotoLibrary]  
})
export class MymemesPage {

  logged_user = null;
  mymemes = [];
  hasgenerated = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userSto: ProvidersUsersStorageUsersProvider,
              private nativeSto: NativeStorage, private alertCtrl: AlertController, private socialMediaSharing: SocialSharing, private galleryCtrl: PhotoLibrary,) {
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
  
  pressEvent(e, img) {
    (this.alertCtrl.create({
      title: 'SAVE YOUR MEME',
      buttons: [
        'CANCEL',
        {
          text: 'SAVE',
          handler: () => this.saveImg(img)
        }        
      ]
    })).present();
  }

  saveImg(img) {
    this.galleryCtrl.requestAuthorization()
    .then(() => {
      this.galleryCtrl.saveImage(img, 'TrippyMe', null)
        .then(() => alert('Saved successfully'))
        .catch((err) => alert('Error while saving...' + err));        
    })
    .catch((err) => alert('Error while saving the picture :(' + err))
  }

  /*setStyle() {
    let styles = {
      'visibility': this.hasgenerated ? 'visible' : 'hidden',
      'margin-top': '2%'
    }
    return styles;
  }*/
  
}
