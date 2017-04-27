import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ViagemPage } from '../viagem/viagem';

import { Passageiro  } from "../../domain/Passageiro/Passageiro";

@Component({
    selector: 'page-passageiros',
    templateUrl: 'passageiros.html'
})
export class PassageirosPage implements OnInit {

    private _passageiros: Passageiro[] = [];

    constructor(
        public navCtrl: NavController) 
    {}

    ngOnInit() {

        let passageiro1 = new Passageiro('Mario Bross', 'assets/img/mario.png');
        let passageiro2 = new Passageiro('Luigi Silva', 'assets/img/luigi.png');
        let passageiro3 = new Passageiro('Yoshi Dino', 'assets/img/Yoshi.png');
        
        this._passageiros.push(passageiro1, passageiro2, passageiro3);
    }

    get passageiros(){
        return this._passageiros;
    }

    iniciaViagem(){
        this.navCtrl.push(ViagemPage);
    }

}
