import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    constructor(
        public navCtrl: NavController,
        private _loadingCtrl: LoadingController) {

    }

    ngOnInit() {

        // let loader = this._loadingCtrl.create({
        //     content: 'Carregando... Aguarde ...'
        // });
        // loader.present();

        // loader.dismiss();
    }
}
