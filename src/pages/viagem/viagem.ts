import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { PassageirosPage } from '../passageiros/passageiros';
import { Motorista } from "../../domain/motorista/motorista";
import { Passageiro } from "../../domain/passageiro/passageiro";
import { PosicaoGlobalService } from "../../domain/posicaoglobal/posicaoglobal-service";

@Component({
    selector: 'page-viagem',
    templateUrl: 'viagem.html'
})
export class ViagemPage {

    private _passageirosDesembarcados: Passageiro[] = [];
    private _passageirosEmbarcados: Passageiro[] = [];
    private _motorista: Motorista;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _posicaoGlobalService: PosicaoGlobalService,
        private _alertCtrl: AlertController){

        this._passageirosDesembarcados = navParams.get('passageirosSelecionados');
        this._motorista = navParams.get('motorista');
    }

    get passageirosDesembarcados(){
        return this._passageirosDesembarcados;
    }

    get passageirosEmbarcados(){
        return this._passageirosEmbarcados;
    }

    embarca(passageiro: Passageiro){
     
        passageiro.posicao_latitude = this._posicaoGlobalService.posicaoGlobal.latitude;
        passageiro.posicao_longitude = this._posicaoGlobalService.posicaoGlobal.longitude;
        passageiro.embarcado = true;
        //**Consistir passageiro */
        // Emitir aviso mãe

        this._passageirosEmbarcados.push(passageiro);
        this._passageirosDesembarcados.splice(
            this._passageirosDesembarcados.indexOf(passageiro), 1
        );
    }
    
    desembarca(passageiro: Passageiro){

        passageiro.posicao_latitude = this._posicaoGlobalService.posicaoGlobal.latitude;
        passageiro.posicao_longitude = this._posicaoGlobalService.posicaoGlobal.longitude;
        passageiro.embarcado = false;
        //**Consistir passageiro */
        // Emitir aviso mãe
        
        this._passageirosDesembarcados.push(passageiro);
        this._passageirosEmbarcados.splice(
            this._passageirosEmbarcados.indexOf(passageiro), 1
        );
    }

    finaliza(){

        if (this._passageirosEmbarcados.length > 0){
            this._alertCtrl.create({
                title: 'Aviso Viagem',
                subTitle: "Ainda existem passageiros embarcados. Deseja encerrar mesmo assim?",
                buttons:[
                    { text: 'Cancelar'},
                    { text: 'Confirmar', handler: () => this._confirmaFinalizacao() }]
            }).present();
        }
        else
            this._confirmaFinalizacao();
    }

    private _confirmaFinalizacao(){
        //Atualiza a lista de passageiros embarcados, considerando posição atual do motorista
        this._passageirosEmbarcados.forEach(passageiro => {
            passageiro.posicao_latitude = this._posicaoGlobalService.posicaoGlobal.latitude;
            passageiro.posicao_longitude = this._posicaoGlobalService.posicaoGlobal.longitude;
            passageiro.emViagem = false;
            passageiro.embarcado = false;
        })
        this.navCtrl.setRoot(PassageirosPage);
    }
}
