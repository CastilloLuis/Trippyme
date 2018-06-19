import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpProvidersHttpProvider } from '../../providers/http-providers-http/http-providers-http';

/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {

  // getting img id
  memegeneratorurl: string = 'http://version1.api.memegenerator.net//Instance_Create?languageCode=en&generatorID=45&imageID=20&text0=push a hipster down the stairs&text1=now look whos tumbling&apiKey=demo';
  constructor(public navCtrl: NavController, public navParams: NavParams, private httpProviders: HttpProvidersHttpProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }


  getMemes() {
    this.httpProviders.fetch(null, 'GET', 'http://version1.api.memegenerator.net//Generators_Select_ByTrending')
      .subscribe((res) => {
        console.log(res)
      })
  }
}
