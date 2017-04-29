import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViagemPage } from '../viagem/viagem';
import { Passageiro } from "../../domain/passageiro/passageiro";
import { PassageiroService } from "../../domain/passageiro/passageiro-service";
import { Motorista } from "../../domain/motorista/motorista";
import { PosicaoGlobalService } from "../../domain/posicaoglobal/posicaoglobal-service";

@Component({
    selector: 'page-passageiros',
    templateUrl: 'passageiros.html'
})
export class PassageirosPage implements OnInit {

    private _motorista: Motorista;
    private _passageiros: Passageiro[] = [];
    private _passageirosOriginal: Passageiro[] = []; //guarda lista original para o filtro
    private _passageirosSelecionados: Passageiro[] = [];


    constructor(
        public navCtrl: NavController,
        private _posicaoGlobalService: PosicaoGlobalService,
        private _passageiroService: PassageiroService)
    { }

    ngOnInit() {

        //obter dados motorista
        this._motorista = new Motorista(1, 11, 'Toninho da Van');

        this._passageiros = this._passageiroService.listaPassageiros();
        this._passageirosOriginal = this._passageiros;
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

    search(ev: any) {
        
        this._passageiros = this._passageirosOriginal;

        let val = ev.target.value;
        
        if (val && val.trim() != '') {
            this._passageiros = this._passageiros.filter((passageiro) => {
                return (passageiro.nome.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
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
