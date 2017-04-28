import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ViagemPage } from '../viagem/viagem';

import { Passageiro } from "../../domain/Passageiro/Passageiro";

@Component({
    selector: 'page-passageiros',
    templateUrl: 'passageiros.html'
})
export class PassageirosPage implements OnInit {

    private _passageiros: Passageiro[] = [];
    private _passageirosSelecionados: Passageiro[] = [];

    constructor(
        public navCtrl: NavController)
    { }

    ngOnInit() {

        this._passageiros.push(new Passageiro('Mario Bross', 'assets/img/mario.png'));
        this._passageiros.push(new Passageiro('Luigi Silva', 'assets/img/luigi.png'));
        this._passageiros.push(new Passageiro('Yoshi Dino', 'assets/img/Yoshi.png'));
        this._passageiros.push(new Passageiro('Mario Bross', 'assets/img/mario.png'));
        this._passageiros.push(new Passageiro('Luigi Silva', 'assets/img/luigi.png'));
        this._passageiros.push(new Passageiro('Yoshi Dino', 'assets/img/Yoshi.png'));
        this._passageiros.push(new Passageiro('Mario Bross', 'assets/img/mario.png'));
        this._passageiros.push(new Passageiro('Luigi Silva', 'assets/img/luigi.png'));
        this._passageiros.push(new Passageiro('Yoshi Dino', 'assets/img/Yoshi.png'));
    }

    get passageiros() {
        return this._passageiros;
    }

    selecionaPassageiros(ligado: boolean, passageiro: Passageiro) {

        if (ligado) {
            this._passageirosSelecionados.push(passageiro);
        } else {
            let index = this._passageirosSelecionados.indexOf(passageiro);
            if (index>=0)
                this._passageirosSelecionados.splice(index, 1);
        }
    }

    iniciaViagem() {
        this.navCtrl.push(ViagemPage, {
            passageirosSelecionados: this._passageirosSelecionados
        });
    }

}
