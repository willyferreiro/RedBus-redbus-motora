import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViagemPage } from '../viagem/viagem';
import { Passageiro } from "../../domain/Passageiro/Passageiro";
import { Motorista } from "../../domain/Motorista/Motorista";
import { PosicaoGlobalService } from "../../domain/PosicaoGlobal/PosicaoGlobal-Service";

@Component({
    selector: 'page-passageiros',
    templateUrl: 'passageiros.html'
})
export class PassageirosPage implements OnInit {

    private _motorista: Motorista;
    private _passageiros: Passageiro[] = [];
    private _passageirosSelecionados: Passageiro[] = [];


    constructor(
        public navCtrl: NavController,
        private _posicaoGlobalService: PosicaoGlobalService)
    { }

    ngOnInit() {

        //obter dados motorista

        this._motorista = new Motorista(1, 11, 'Toninho da Van');

        //obter passageiros disponíveis para o motorista

        this._passageiros.push(new Passageiro(1, 1,'Mario Bross', 'assets/img/mario.png'));
        this._passageiros.push(new Passageiro(2, 2, 'Luigi Silva', 'assets/img/luigi.png'));
        this._passageiros.push(new Passageiro(3, 3, 'Yoshi Dino', 'assets/img/Yoshi.png'));
        this._passageiros.push(new Passageiro(4, 4, 'Mario Bross', 'assets/img/mario.png'));
        this._passageiros.push(new Passageiro(5, 5, 'Luigi Silva', 'assets/img/luigi.png'));
        this._passageiros.push(new Passageiro(6, 6, 'Yoshi Dino', 'assets/img/Yoshi.png'));
        this._passageiros.push(new Passageiro(7, 7, 'Mario Bross', 'assets/img/mario.png'));
        this._passageiros.push(new Passageiro(8, 8, 'Luigi Silva', 'assets/img/luigi.png'));
        this._passageiros.push(new Passageiro(9, 9, 'Yoshi Dino', 'assets/img/Yoshi.png'));
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

        this._motorista.emViagem = true;
        this._motorista.posicaoGlobal = this._posicaoGlobalService.posicaoGlobal;

        this._passageirosSelecionados.forEach(passageiro => {
            passageiro.emViagem = true;
            passageiro.embarcado = false;
        });

        //consistir motorista e passageiros

        //Consistir inicio de viagem

        //emitir alerta mae

        this.navCtrl.push(ViagemPage, {
            passageirosSelecionados: this._passageirosSelecionados,
            motorista: this._motorista
        });
    }

}
