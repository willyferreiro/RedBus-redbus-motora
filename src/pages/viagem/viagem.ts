import { Component } from '@angular/core';
import { NavController, NavParams, AlertController} from 'ionic-angular';
import { PassageirosPage } from '../passageiros/passageiros';
import { Motorista } from "../../domain/motorista/motorista";
import { Filho } from "../../domain/filho/filho";
import { PosicaoGlobalService } from "../../domain/posicaoglobal/posicaoglobal-service";

@Component({
    selector: 'page-viagem',
    templateUrl: 'viagem.html'
})
export class ViagemPage {

    private _passageiroDesembarcados: Filho[] = [];
    private _passageiroEmbarcados: Filho[] = [];
    private _motorista: Motorista;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private _posicaoGlobalService: PosicaoGlobalService,
        private _alertCtrl: AlertController){

        this._passageiroDesembarcados = navParams.get('passageirosSelecionados');
        this._motorista = navParams.get('motorista');
    }

    get passageirosDesembarcados(){
        return this._passageiroDesembarcados;
    }

    get passageirosEmbarcados(){
        return this._passageiroEmbarcados;
    }

    embarca(passageiro: Filho){
     
        passageiro.posicao_latitude = this._posicaoGlobalService.posicaoGlobal.latitude;
        passageiro.posicao_longitude = this._posicaoGlobalService.posicaoGlobal.longitude;
        passageiro.embarcado = true;
        //**Consistir passageiro */
        // Emitir aviso mãe

        this._passageiroEmbarcados.push(passageiro);
        this._passageiroDesembarcados.splice(
            this._passageiroDesembarcados.indexOf(passageiro), 1
        );
    }
    
    desembarca(passageiro: Filho){

        passageiro.posicao_latitude = this._posicaoGlobalService.posicaoGlobal.latitude;
        passageiro.posicao_longitude = this._posicaoGlobalService.posicaoGlobal.longitude;
        passageiro.embarcado = false;
        //**Consistir passageiro */
        // Emitir aviso mãe
        
        this._passageiroDesembarcados.push(passageiro);
        this._passageiroEmbarcados.splice(
            this._passageiroEmbarcados.indexOf(passageiro), 1
        );
    }

    finaliza(){

        if (this._passageiroEmbarcados.length > 0){
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
        //Atualiza a lista de filhos embarcados, considerando posição atual do motorista
        this._passageiroEmbarcados.forEach(filho => {
            filho.posicao_latitude = this._posicaoGlobalService.posicaoGlobal.latitude;
            filho.posicao_longitude = this._posicaoGlobalService.posicaoGlobal.longitude;
            filho.emViagem = false;
            filho.embarcado = false;
        })
        this.navCtrl.setRoot(PassageirosPage);
    }
}
