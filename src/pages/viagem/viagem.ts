import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { Passageiro } from "../../domain/Passageiro/Passageiro";
import { PassageirosPage } from '../passageiros/passageiros';

@Component({
    selector: 'page-viagem',
    templateUrl: 'viagem.html'
})
export class ViagemPage {

    private _passageirosDesembarcados: Passageiro[] = [];
    private _passageirosEmbarcados: Passageiro[] = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams){

        this._passageirosDesembarcados = navParams.get('passageirosSelecionados');
    }

    get passageirosDesembarcados(){
        return this._passageirosDesembarcados;
    }

    get passageirosEmbarcados(){
        return this._passageirosEmbarcados;
    }

    embarca(passageiro){
        console.log(passageiro);
        console.log(this._passageirosEmbarcados);
        this._passageirosEmbarcados.push(passageiro);
        console.log(this._passageirosEmbarcados);
        console.log(this._passageirosDesembarcados);
        this._passageirosDesembarcados.splice(
            this._passageirosDesembarcados.indexOf(passageiro), 1
        );
        console.log(this._passageirosDesembarcados);
    }
    
    desembarca(passageiro){
        this._passageirosDesembarcados.push(passageiro);
        this._passageirosEmbarcados.splice(
            this._passageirosEmbarcados.indexOf(passageiro), 1
        );
    }

    finaliza(){
        this.navCtrl.setRoot(PassageirosPage);
    }
}
