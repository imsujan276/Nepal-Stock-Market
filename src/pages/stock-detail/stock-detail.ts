import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

/**
 * Generated class for the StockDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-stock-detail',
  templateUrl: 'stock-detail.html',
})
export class StockDetailPage {

  stock;
  dot;

  constructor(public navCtrl: NavController, public navParams: NavParams,private admob: AdMobFree, private platform: Platform) {
    this.stock = this.navParams.get('data');
    this.showBanner()

    this.platform.registerBackButtonAction(() => {
      this.launchInterstitial();
      this.navCtrl.pop({}); // go to previous page
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockDetailPage');
  }

  showBanner() {
    let bannerConfig: AdMobFreeBannerConfig = {
        overlap: true,
        autoShow: true,
        id: 'ca-app-pub-9000154121468885/5191969705' // Your Ad Unit ID goes here
    };
    this.admob.banner.config(bannerConfig);
    this.admob.banner.prepare().then(() => {
        this.dot = '.';
    }).catch(e => {console.log(e); this.dot='..'});
  }

  launchInterstitial() {
    let interstitialConfig: AdMobFreeInterstitialConfig = {
        autoShow: true,
        id: 'ca-app-pub-9000154121468885/3056383348' //Your Ad Unit ID goes here
    };
    this.admob.interstitial.config(interstitialConfig);
    this.admob.interstitial.prepare().then(() => {
        // success
    });

  }

}
